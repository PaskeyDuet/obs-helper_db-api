import Express from "express";
import { createArticle, getTags } from "src/controllers/dbReqsHandlers";

export const dbRouter = Express.Router();

dbRouter.get("/tags", getTags);
