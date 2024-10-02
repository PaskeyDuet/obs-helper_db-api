import { Request, Response } from "express";
import {
  createArticlesFromUpdate,
  deleteArticlesFromUpdate,
  updateArticlesFromUpdate,
} from "src/dbSetup/dbControllers/dbWorkers";
import { DbManagerPromisesArr, listsOfUpdatedArticles } from "src/types/types";

export default async (
  req: Request<object, object, listsOfUpdatedArticles>,
  res: Response
) => {
  //TODO: Добавить подтверждение того что статьи добавлены в базу
  if (req.body.created && req.body.deleted && req.body.updated) {
    const data = req.body;
    const promises: DbManagerPromisesArr = [];
    for (const key in data) {
      if (key === "updated") {
        const obj = data.updated;
        if (obj) {
          promises.push(updateArticlesFromUpdate(obj));
        }
      } else if (key === "deleted") {
        const obj = data.deleted;
        if (obj) {
          promises.push(deleteArticlesFromUpdate(obj));
        }
      } else {
        const obj = data.created;
        if (obj) {
          promises.push(createArticlesFromUpdate(obj));
        }
      }
    }
    const promisesRes = await Promise.allSettled(promises);
    res.status(200).json(promisesRes).end();
  } else {
    res.status(404).end();
  }
};
