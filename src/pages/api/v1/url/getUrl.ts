import { apiErrorHandler } from "@src/lib/api/apiErrorHandler";
import { withMethods } from "@src/lib/api/withMethods";
import { db } from "@src/lib/db/db";
import { METHODS } from "@src/lib/enum";
import { IGetUrlResponse } from "@src/types/api/v1/url/getUrl";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IGetUrlResponse>
) => {
  try {
    const { link } = req.query;

    if (!link) {
      return res.status(400).json({
        error: { message: "parameter link is missing" },
        success: false,
      });
    }

    const url = await db.url.findFirst({ where: { link: link as string } });

    if (!url) {
      return res
        .status(400)
        .json({ error: { message: "Link not found" }, success: false });
    }

    return res.status(200).json({
      error: null,
      success: true,
      userUrl: url.userUrl,
    });
  } catch (error) {
    apiErrorHandler(error as Error, res);
  }
};

export default withMethods([METHODS.GET], handler);
