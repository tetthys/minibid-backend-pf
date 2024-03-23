import { Router, Request, Response, NextFunction } from "express";
import upload from "../helper/upload/upload";
import useRequestValue from "../helper/useRequestValue/useRequestValue";
import json from "../helper/json/json";

const router = Router();

/**
 * POST /upload-file/product/image
 * PUT /upload-file/product/image/:path
 */

router.post(
  "/upload-file/product/image",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { file } = useRequestValue(req);
      console.log(file);
      return res
        .status(200)
        .type("json")
        .send(
          json({
            url: `/uploads/${file.filename}`,
          })
        );
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/upload-file/product/image/:path",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { file } = useRequestValue(req);
      console.log(file);
      return res
        .status(200)
        .type("json")
        .send(
          json({
            url: `/uploads/${file.filename}`,
          })
        );
    } catch (e) {
      next(e);
    }
  }
);

export { router as uploadFile };
