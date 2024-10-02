import Express from "express";
import updatedArticlesHandler from "src/controllers/updatedArticlesHandler";

export const readerRouter = Express.Router();

readerRouter.post("/create_update", updatedArticlesHandler);
