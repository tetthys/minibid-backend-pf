import request from "supertest";
import app from "../../src";
import createFakeFile from "../utils/createFakeFile";

const postUrl = "/upload-file/product/image";
const putUrl = "/upload-file/product/image/1";

describe("uploadFile", () => {
  it(`POST ${postUrl} : return url`, async () => {
    const fakeJpgFile = createFakeFile();
    const res = await request(app)
      .post(postUrl)
      .set("Content-Type", "multipart/form-data")
      .attach("image", fakeJpgFile, "test.jpg");

    expect(res.status).toBe(200);

    expect(res.body.url).toContain("/uploads/");
  });

  it(`PUT ${putUrl} : return url`, async () => {
    const fakeJpgFile = createFakeFile();
    const res = await request(app)
      .put(putUrl)
      .set("Content-Type", "multipart/form-data")
      .attach("image", fakeJpgFile, "test.jpg");

    expect(res.status).toBe(200);

    expect(res.body.url).toContain("/uploads/");
  });
});
