import { apiErrorHandler } from "@src/lib/api/apiErrorHandler";
import { authOptions } from "@src/lib/api/authOptions";
import { authenticateUser } from "@src/lib/api/authenticateUser";
import { withMethods } from "@src/lib/api/withMethods";
import { db } from "@src/lib/db/db";
import { METHODS } from "@src/lib/enum";
import { createUrlSchema } from "@src/lib/utils/validationSchema";
import { ICreateUrlResponse } from "@src/types/api/v1/url/createUrl";
import { customAlphabet } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const NANO_CUSTOM_ID_CHARS = "1234567890abcdefghigkl";
const URL_MAX_LENGTH = 7;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ICreateUrlResponse>
) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({
        error: { message: "Unauthorized session" },
        success: false,
      });
    }

    const userStatus = await authenticateUser(session.user.token);
    if (userStatus.isAuthenticated === false) {
      return res.status(401).json({
        error: { message: userStatus.error ?? "" },
        success: false,
      });
    }

    const { userUrl } = await createUrlSchema.validate(req.body);

    const nanoid = customAlphabet(NANO_CUSTOM_ID_CHARS, URL_MAX_LENGTH);
    const createdUrl = await db.url.create({
      data: {
        link: nanoid(),
        userUrl,
        userId: session?.user.id,
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
