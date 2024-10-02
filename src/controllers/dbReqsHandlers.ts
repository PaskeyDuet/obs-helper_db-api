import { Request, Response } from "express";
import {
  // createArticleDb,
  findAllTags,
} from "src/dbSetup/dbControllers/dbWorkers";
// import { ArticleCreationAttributes, RequestWithArticle } from "src/types/types";

export async function getTags(req: Request, res: Response): Promise<void> {
  const tags = await findAllTags();
  // console.log(tags);

  res.status(200).json({ tags: tags });
}

// export async function createArticle(
//   req: RequestWithArticle,
//   res: Response
// ): Promise<void> {
//   const article: ArticleCreationAttributes = req.body;

//   try {
//     await createArticleDb(article);
//     res.status(500).json({ status: article });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: error });
//   }
// }
