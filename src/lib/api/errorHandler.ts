import { NextApiResponse } from "next";
import * as yup from "yup";

export const errorHandler = (error: Error, res: NextApiResponse) => {
  if (error instanceof yup.ValidationError) {
    return res.status(400).json({
      error: {
        message: error.errors,
      },
      success: false,
    });
  }

  return res.status(500).json({
    error: { message: "Internal Server Error" },
    success: false,
  });
};
