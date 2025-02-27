import express from "express";
import cors from "cors";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.options("*", cors(corsOptions)); // Handle preflight requests for all routes
app.use(cors(corsOptions));
// app.use(cors());

app.all("/api/auth/*", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.get("/tryUser", async (req, res) => {
  console.log("Got here");
  // const user = await auth.api;
  // console.log(user);
  // console.log(req.headers);
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  console.log("Session", session);
  console.log("Headers", req.headers);

  // return { message: "Hello" };
  return res.json(session);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
