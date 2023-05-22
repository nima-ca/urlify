import { db } from "@/lib/db/db";
import { apiErrorHandler } from "@src/lib/api/apiErrorHandler";
import { signUpSchema } from "@src/lib/utils/validationSchema";
import { IRegisterResponse } from "@src/types/api/auth/register";
import * as bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IRegisterResponse>
) => {
  try {
    const credentials = await signUpSchema.validate(req.body, {
      stripUnknown: true,
      strict: true,
    });

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
