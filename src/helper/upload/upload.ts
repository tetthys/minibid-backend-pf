import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import generateRandomString from "../generateRandomString/generateRandomString";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const ext = path.extname(file.originalname).toLocaleLowerCase();
  if (
    ext !== ".jpg" &&
    ext !== ".png" &&
    ext !== ".jpeg" &&
    ext !== ".gif" &&
    ext !== ".webp"
  ) {
    return cb(new Error("Only images are allowed"));
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLocaleLowerCase();
    const randomName = generateRandomString(200);
    cb(null, randomName + ext);
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
