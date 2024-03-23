import RequestCannotBeDestructedError from "../../../../src/helper/useRequestValue/error/RequestCannotBeDestructedError";
import useRequestValue from "../../../../src/helper/useRequestValue/useRequestValue";

describe("error", () => {
  it("throw RequestCannotBeDestructedError when query and params collide", async () => {
    const mockReq: any = {
      query: {
        userId: 1,
      },
      params: {
        userId: 1,
      },
    };
    expect(() => useRequestValue(mockReq)).toThrow(
      RequestCannotBeDestructedError
    );
  });

  it("throw RequestCannotBeDestructedError when query and token collide", async () => {
    const mockReq: any = {
      query: {
        token: "test",
      },
      headers: {
        authorization: "token",
      },
    };
    expect(() => useRequestValue(mockReq)).toThrow(
      RequestCannotBeDestructedError
    );
  });

  it("throw RequestCannotBeDestructedError when query and body collide", async () => {
    const mockReq: any = {
      query: {
        body: "test",
      },
      body: {
        body: "test",
      },
    };
    expect(() => useRequestValue(mockReq)).toThrow(
      RequestCannotBeDestructedError
    );
  });

  it("throw RequestCannotBeDestructedError when query and cbody collide", async () => {
    const mockReq: any = {
      query: {
        cbody: "test",
      },
      body: {
        cbody: "test",
      },
    };
    expect(() => useRequestValue(mockReq)).toThrow(
      RequestCannotBeDestructedError
    );
  });

  it("throw RequestCannotBeDestructedError when query and file collide", async () => {
    const mockReq: any = {
      query: {
        file: "test",
      },
      file: {
        path: "test",
      },
    };
    expect(() => useRequestValue(mockReq)).toThrow(
      RequestCannotBeDestructedError
    );
  });

  it("throw RequestCannotBeDestructedError when query and files collide", async () => {
    const mockReq: any = {
      query: {
        files: "test",
      },
      files: [
        {
          path: "test",
        },
        {
          path: "test",
        },
      ],
    };
    expect(() => useRequestValue(mockReq)).toThrow(
      RequestCannotBeDestructedError
    );
  });
});
