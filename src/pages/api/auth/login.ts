import { db } from "@/lib/db/db";
import { apiErrorHandler } from "@src/lib/api/apiErrorHandler";
import { withMethods } from "@src/lib/api/withMethods";
import { METHODS } from "@src/lib/enum";
import { loginSchema } from "@src/lib/utils/validationSchema";
import { IAuthTokenPayload } from "@src/types/api/api";
import { ILoginResponse } from "@src/types/api/auth/login";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

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
      user.password ?? ""
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

export default withMethods([METHODS.POST], handler);
