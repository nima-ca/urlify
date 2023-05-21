import { db } from "@/lib/db/db";
import {
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@src/lib/api/constants";
import { apiErrorHandler } from "@src/lib/api/apiErrorHandler";
import { ICoreResponse } from "@src/types/api/api";
import * as bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

export interface ISignUpResponse extends ICoreResponse {}

const signUpSchema = yup.object({
  name: yup
    .string()
    .min(
      NAME_MIN_LENGTH,
      `Your name must be at least ${NAME_MIN_LENGTH} characters`
    )
    .required("Please enter your name"),
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
  confirmPassword: yup
    .string()
    .max(
      PASSWORD_MAX_LENGTH,
      `Your confirm password must be less than ${PASSWORD_MAX_LENGTH} characters`
    )
    .min(
      PASSWORD_MIN_LENGTH,
      `Your confirm password must be at least ${PASSWORD_MIN_LENGTH} characters`
    )
    .required("Please enter your confirm password"),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ISignUpResponse>
) => {
  try {
    const credentials = await signUpSchema.validate(req.body, {
      stripUnknown: true,
      strict: true,
    });

    if (credentials.password !== credentials.confirmPassword) {
      return res.status(401).json({
        error: { message: "Password is not the same as Confirm Password" },
        success: false,
      });
    }

    const user = await db.user.findFirst({
      where: { email: credentials.email },
    });

    if (user) {
      return res.status(401).json({
        error: { message: "A User already Exist with the provided email" },
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(
      credentials.password as string,
      10
    );

    await db.user.create({
      data: {
        password: hashedPassword,
        email: credentials.email,
        name: credentials.name,
      },
    });

    return res.status(200).json({
      error: null,
      success: true,
    });
  } catch (error) {
    apiErrorHandler(error as Error, res);
  }
};

export default handler;
