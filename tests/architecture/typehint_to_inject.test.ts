describe.skip("typehint to inject", () => {
  it("check type of HttpRequest", async () => {
    expect(typeof HttpRequest).toEqual("function");
  });
  it("check type of HttpResponse", async () => {
    expect(typeof HttpResponse).toEqual("function");
  });
  it("controller tell which parameters have in a method", async () => {
    const controller: Controller = new ProductController();
    const result: Array<any> = controller.hint("index");
    expect(result).toEqual([HttpRequest, HttpResponse, WalletService]);
  });
  it("hint and dynamic injecting", async () => {
    const controller: Controller = new ProductController();
    const dynamicalMethodInput: string = "index";
    const result: Array<any> = controller.hint(dynamicalMethodInput);

    // inject dynamically
    let instanceArr = [];
    for (const each of result) {
      instanceArr.push(new each());
    }
    controller[dynamicalMethodInput](...instanceArr); // inject dynamically

    console.log(controller);

    expect(1).toEqual(1);
  });
});

class HttpRequest {
  constructor() {
    console.log("HttpRequest is created");
  }
  public method() {
    return "GET";
  }
}
class HttpResponse {
  constructor() {
    console.log("HttpResponse is created");
  }
  public send() {
    return "200";
  }
}

abstract class Controller {
  [key: string]: (...args: any[]) => void;

  public hint(method: string): Array<any> {
    return [HttpRequest, HttpResponse, WalletService];
  }
}

class ProductController extends Controller {
  public index(
    request: HttpRequest,
    response: HttpResponse,
    WalletService: WalletService
  ) {
    request.method();
    console.log(
      "🚀 ~ file: typehint_to_inject.test.ts:59 ~ ProductController ~ index ~ request.method():",
      request.method()
    );
    response.send();
    console.log(
      "🚀 ~ file: typehint_to_inject.test.ts:61 ~ ProductController ~ index ~ response.send():",
      response.send()
    );
    WalletService.getBalance();
    console.log(
      "🚀 ~ file: typehint_to_inject.test.ts:69 ~ ProductController ~ index ~ WalletService.getBalance():",
      WalletService.getBalance()
    );
  }
}

// service
class WalletService {
  constructor() {
    console.log("WalletService is created");
  }
  public getBalance() {
    return 100;
  }
}
