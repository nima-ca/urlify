import { apiErrorHandler } from "@src/lib/api/apiErrorHandler";
import { withMethods } from "@src/lib/api/withMethods";
import { METHODS } from "@src/lib/enum";
import { ICreateUrlResponse } from "@src/types/api/v1/url/createUrl";
import { NextApiRequest, NextApiResponse } from "next";
import * as jwt from "jsonwebtoken";
import { IAuthTokenPayload } from "@src/types/api/api";
import { db } from "@src/lib/db/db";
import * as yup from "yup";
import { customAlphabet } from "nanoid";

const createUrlSchema = yup.object({
  userUrl: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("Please enter url"),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ICreateUrlResponse>
) => {
  try {
    const token = req.headers.token as string | undefined;

    if (!token) {
      res
        .status(401)
        .json({ error: { message: "Invalid token" }, success: false });
    }

    let tokenPayload: IAuthTokenPayload | undefined = undefined;
    try {
      tokenPayload = jwt.verify(
        token as string,
        process.env.NEXTAUTH_SECRET as string
      ) as IAuthTokenPayload;
    } catch (error) {
      return res
        .status(401)
        .json({ error: { message: "Invalid token" }, success: false });
    }

    const user = await db.user.findFirst({ where: { id: tokenPayload.id } });
    if (!user) {
      return res
        .status(401)
        .json({ error: { message: "Unauthorized user" }, success: false });
    }

    const { userUrl } = await createUrlSchema.validate(req.body);

    const nanoid = customAlphabet("1234567890abcdefghigkl", 7);
    const createdUrl = await db.url.create({
      data: {
        link: nanoid(),
        userUrl,
        userId: user.id,
      },
    });

    return res.json({
      error: null,
      success: true,
      link: createdUrl.link,
    });
  } catch (error) {
    apiErrorHandler(error as Error, res);
  }
};

export default withMethods([METHODS.POST], handler);
