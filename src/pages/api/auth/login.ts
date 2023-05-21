import { db } from "@/lib/db/db";
import { apiErrorHandler } from "@src/lib/api/apiErrorHandler";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@src/lib/api/constants";
import { IAuthTokenPayload } from "@src/types/api/api";
import { ILoginResponse } from "@src/types/api/auth/login";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("please enter your email in correct format.")
    .required("Please enter your email"),
  password: yup
    .string()
    .max(
      PASSWORD_MAX_LENGTH,
      `Your password must be less than ${PASSWORD_MAX_LENGTH} characters`
    )
    .min(
      PASSWORD_MIN_LENGTH,
      `Your password must be at least ${PASSWORD_MIN_LENGTH} characters`
    )
    .required("Please enter your password"),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ILoginResponse>
) => {
  try {
    const credentials = await loginSchema.validate(req.body, {
      stripUnknown: true,
      strict: true,
    });

    const user = await db.user.findFirst({
      where: { email: credentials.email },
    });

    if (!user) {
      return res.status(401).json({
        error: { message: "Email or Password is incorrect" },
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (isPasswordValid === false) {
      return res.status(401).json({
        error: { message: "Email or Password is incorrect" },
        success: false,
      });
    }

    const tokenPayload: IAuthTokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.NEXTAUTH_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      error: null,
      success: true,
      token,
      user: tokenPayload,
    });
  } catch (error) {
    apiErrorHandler(error as Error, res);
  }
};

export default handler;
