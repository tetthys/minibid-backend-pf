import express, { Express, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import createWebSocketServer from "./websocket/createWebSocketServer";
import env from "./helper/env/env";
import handle from "./validate/handle";
import { users } from "./routes/users";
import { usersCheckouts } from "./routes/usersCheckouts";
import { usersProducts } from "./routes/usersProducts";
import { products } from "./routes/products";
import { productsBids } from "./routes/productsBids";
import { randomProducts } from "./routes/randomProducts";
import { auth } from "./routes/auth";
import { search } from "./routes/search";
import { testMiddleware } from "./routes/testMiddleware";
import Haven from "./tool/Haven/Haven";
import { usersBids } from "./routes/usersBids";
import { usersWithdrawals } from "./routes/usersWithdrawals";
import { uploadFile } from "./routes/uploadFile";
import { userCard } from "./routes/userCard";
import { userBankAccount } from "./routes/userBankAccount";
import useRequestValue from "./helper/useRequestValue/useRequestValue";

const PORT = env("PORT");
const WEBSOCKET_PORT = env("WEBSOCKET_PORT");
const NODE_ENV = env("NODE_ENV");
const FRONTEND_URL = env("FRONTEND_URL");

const app: Express = express();

// middleware
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req: Request, res: Response, next: NextFunction) => {
  Haven.Log().info({
    req: {
      ip: req.ip,
      method: req.method,
      url: req.url,
    },
  });
  console.log(`${req.method}:${req.url}`);
  next();
});
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = useRequestValue(req);
    if (token) {
      const user = await Haven.AccessToken().findUserByToken(token);
      await Haven.Cache().set("last_seen_" + user.id, new Date().toISOString());
    }
    return next();
  } catch (e) {
    next(e);
  }
});

// register routes
app.use("/", users);
app.use("/", usersCheckouts);
app.use("/", usersProducts);
app.use("/", products);
app.use("/", productsBids);
app.use("/", randomProducts);
app.use("/", auth);
app.use("/", search);
app.use("/", userCard);
app.use("/", userBankAccount);
app.use("/", usersBids);
app.use("/", usersWithdrawals);
app.use("/", uploadFile);
app.use("/uploads", express.static("uploads"));
if (NODE_ENV === "test") {
  app.use("/", testMiddleware);
}

app.use((e: any, req: Request, res: Response, next: NextFunction) => {
  handle(e)(req, res);
});

if (NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  createWebSocketServer(WEBSOCKET_PORT);
}

export default app;
