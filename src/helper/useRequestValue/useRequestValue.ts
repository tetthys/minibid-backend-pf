import RequestCannotBeDestructedError from "./error/RequestCannotBeDestructedError";

const useRequestValue = (req: any): any => {
  let returnObject: any = {};

  if (req.query) {
    for (const query in req.query) {
      isDuplicate(returnObject, query);
      //
      //
      if (query === "page") {
        returnObject[query] = Number(req.query[query]);
      } else {
        returnObject[query] = String(req.query[query]);
      }
      //
      //
    }
  }

  if (req.params) {
    for (const param in req.params) {
      isDuplicate(returnObject, param);
      //
      //
      if (param.endsWith("Id")) {
        returnObject[param] = BigInt(req.params[param]);
      } else {
        returnObject[param] = String(req.params[param]);
      }
      //
      //
    }
  }

  if (req.headers) {
    if (req.headers.authorization) {
      isDuplicate(returnObject, "token");
      //
      //
      returnObject.token = String(req.headers.authorization);
    }
  }

  if (req.body) {
    isDuplicate(returnObject, "body");
    //
    //
    returnObject["body"] = req.body;
  }

  if (req.body) {
    isDuplicate(returnObject, "cbody");
    //
    //
    returnObject["cbody"] = convertObjectKeysToCamelCase(req.body);
  }

  if (req.file) {
    isDuplicate(returnObject, "file");
    returnObject["file"] = req.file;
  }

  if (req.files) {
    isDuplicate(returnObject, "files");
    returnObject["files"] = req.files;
  }

  return returnObject;
};

export default useRequestValue;

function convertObjectKeysToCamelCase(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertObjectKeysToCamelCase(item));
  }

  const camelCaseObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) =>
        letter.toUpperCase()
      );
      camelCaseObj[camelCaseKey] = convertObjectKeysToCamelCase(obj[key]);
    }
  }

  return camelCaseObj;
}

const isDuplicate = (returnObject: any, key: any) => {
  if (returnObject[key]) {
    throw new RequestCannotBeDestructedError(
      "There is a duplicate key",
      "",
      ""
    );
  }
};
