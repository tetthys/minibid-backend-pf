import useRequestValue from "../../../src/helper/useRequestValue/useRequestValue";

describe("useRequestValue", () => {
  it("query : page", async () => {
    const mockReq: any = {
      query: {
        page: 1,
      },
    };
    const { page } = useRequestValue(mockReq);
    expect(typeof page).toBe("number");
  });
  it("query : page other1 other2 other3", async () => {
    const mockReq: any = {
      query: {
        page: 1,
        other1: "test",
        other2: "test",
        other3: "test",
      },
    };
    const { page, other1, other2, other3 } = useRequestValue(mockReq);
    expect(typeof page).toBe("number");
    expect(typeof other1).toBe("string");
    expect(typeof other2).toBe("string");
    expect(typeof other3).toBe("string");
  });

  it("params : ~Id ", async () => {
    const mockReq: any = {
      params: {
        userId: 1,
        productId: 1,
      },
    };
    const { userId, productId } = useRequestValue(mockReq);
    expect(typeof userId).toBe("bigint");
    expect(typeof productId).toBe("bigint");
  });
  it("params : ~Id other1 other2 other3", async () => {
    const mockReq: any = {
      params: {
        userId: 1,
        productId: 1,
        other1: "test",
        other2: "test",
        other3: "test",
      },
    };
    const { userId, productId, other1, other2, other3 } =
      useRequestValue(mockReq);
    expect(typeof userId).toBe("bigint");
    expect(typeof productId).toBe("bigint");
    expect(typeof other1).toBe("string");
    expect(typeof other2).toBe("string");
    expect(typeof other3).toBe("string");
  });

  it("token in header", async () => {
    const mockReq: any = {
      headers: {
        authorization: "test",
      },
    };
    const { token } = useRequestValue(mockReq);
    expect(typeof token).toBe("string");
  });

  it("body return body", async () => {
    const mockReq: any = {
      body: {
        email: "test@hotmail.com",
        password: "password",
      },
    };

    const { body } = useRequestValue(mockReq);
    expect(body.email).toBe(mockReq.body.email);
    expect(body.password).toBe(mockReq.body.password);
  });

  it("convert body property to camel", async () => {
    const mockReq: any = {
      body: {
        user_id: 1,
        product_id: 1,
      },
    };

    const { cbody } = useRequestValue(mockReq);
    expect(cbody.userId).toBe(mockReq.body.user_id);
    expect(cbody.productId).toBe(mockReq.body.product_id);
  });

  it("body property with object to camel", async () => {
    const mockReq: any = {
      body: {
        user_id: 1,
        product_id: 1,
        user: {
          profile_image: "test",
        },
      },
    };

    const { cbody } = useRequestValue(mockReq);
    expect(cbody.userId).toBe(mockReq.body.user_id);
    expect(cbody.productId).toBe(mockReq.body.product_id);
    expect(cbody.user.profileImage).toBe(mockReq.body.user.profile_image);
  });

  it("body property with array to camel", async () => {
    const mockReq: any = {
      body: {
        user_id: 1,
        product_id: 1,
        selected_categories: [1, 2, 3, 4, 5],
      },
    };

    const { cbody } = useRequestValue(mockReq);
    expect(cbody.userId).toBe(mockReq.body.user_id);
    expect(cbody.productId).toBe(mockReq.body.product_id);
    expect(cbody.selectedCategories).toEqual(mockReq.body.selected_categories);
  });

  it("body property with object and array to camel", async () => {
    const mockReq: any = {
      body: {
        user_id: 1,
        product_id: 1,
        user: {
          profile_image: "test",
        },
        selected_categories: [1, 2, 3, 4, 5],
      },
    };

    const { cbody } = useRequestValue(mockReq);
    expect(cbody.userId).toBe(mockReq.body.user_id);
    expect(cbody.productId).toBe(mockReq.body.product_id);
    expect(cbody.user.profileImage).toBe(mockReq.body.user.profile_image);
    expect(cbody.selectedCategories).toEqual(mockReq.body.selected_categories);
  });

  it("file return file", async () => {
    const mockReq: any = {
      file: {
        path: "test",
      },
    };

    const { file } = useRequestValue(mockReq);
    expect(file.path).toBe(mockReq.file.path);
  });

  it("files return files", async () => {
    const mockReq: any = {
      files: [
        {
          path: "test",
        },
        {
          path: "test",
        },
      ],
    };

    const { files } = useRequestValue(mockReq);
    expect(files[0].path).toBe(mockReq.files[0].path);
  });
});
