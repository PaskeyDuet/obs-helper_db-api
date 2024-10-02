import Article from "src/dbSetup/models/Article";
import {
  ArticleBaseAttributes,
  DbManagerCreatedRes,
  DbManagerDeletedRes,
  DbManagerUpdatedRes,
} from "src/types/types";

export async function findAllTags(): Promise<string[]> {
  const res = await Article.findAll({
    attributes: ["tags"],
    raw: true,
  });
  let tagsArr: string[] = [];
  for (const obj of res) {
    tagsArr.push(...obj.tags);
  }
  return [...new Set(tagsArr)];
}

function dbUpdateFunctions() {
  return {
    delete: (articles: string[]) => {
      const promises = articles.map(async (articleName) => {
        return Article.destroy({
          where: {
            name: articleName,
          },
        });
      });
      return Promise.allSettled(promises);
    },
    create: (articles: ArticleBaseAttributes[]) => {
      const promises = articles.map(async (article) => {
        return Article.create(article);
      });
      return Promise.allSettled(promises);
    },
    update: (articles: ArticleBaseAttributes[]) => {
      const promises = articles.map(async (article) => {
        const articleName = article.name;
        const newContent = article.content;
        return Article.update(
          { content: newContent },
          {
            where: {
              name: articleName,
            },
          }
        );
      });
      return Promise.allSettled(promises);
    },
  };
}

export async function createArticlesFromUpdate(
  articles: ArticleBaseAttributes[]
): Promise<DbManagerCreatedRes> {
  const createRes: DbManagerCreatedRes = {
    status: "success",
    requests: articles.length,
    created: 0,
    fulfilled: 0,
    rejected: 0,
  };

  if (articles.length === 0) {
    return createRes;
  }

  try {
    const d = dbUpdateFunctions();
    const dbActionsRes = await d.create(articles);

    for (const obj of dbActionsRes) {
      if (obj.status === "fulfilled") {
        createRes.fulfilled += 1;
        createRes.created += 1;
      } else {
        createRes.rejected += 1;
      }
    }
    return createRes;
  } catch (error) {
    const errMess = error instanceof Error ? error.message : "Unknown Errror";
    createRes.status = "error";
    createRes.error = errMess;

    return createRes;
  }
}

export async function deleteArticlesFromUpdate(
  articles: string[]
): Promise<DbManagerDeletedRes> {
  const deleteRes: DbManagerDeletedRes = {
    status: "success",
    requests: articles.length,
    deleted: 0,
    fulfilled: 0,
    rejected: 0,
  };

  if (articles.length === 0) {
    return deleteRes;
  }
  try {
    const d = dbUpdateFunctions();
    const dbActionsRes = await d.delete(articles);

    for (const obj of dbActionsRes) {
      if (obj.status === "fulfilled") {
        deleteRes.fulfilled += 1;
        deleteRes.deleted += obj.value;
      } else {
        deleteRes.rejected += 1;
      }
    }
    return deleteRes;
  } catch (error) {
    const errMess = error instanceof Error ? error.message : "Unknown Errror";
    deleteRes.status = "error";
    deleteRes.error = errMess;

    return deleteRes;
  }
}

export async function updateArticlesFromUpdate(
  articles: ArticleBaseAttributes[]
): Promise<DbManagerUpdatedRes> {
  const updateRes: DbManagerUpdatedRes = {
    status: "success",
    requests: articles.length,
    fulfilled: 0,
    rejected: 0,
    updated: 0,
  };

  if (articles.length === 0) {
    return updateRes;
  }

  try {
    const d = dbUpdateFunctions();
    const dbActionsRes: PromiseSettledResult<[number]>[] =
      await d.update(articles);

    for (const obj of dbActionsRes) {
      if (obj.status === "fulfilled") {
        updateRes.fulfilled += 1;
        updateRes.updated += obj.value[0];
      } else {
        updateRes.rejected += 1;
      }
    }
    return updateRes;
  } catch (error) {
    const errMess = error instanceof Error ? error.message : "Unknown Errror";
    updateRes.status = "error";
    updateRes.error = errMess;

    return updateRes;
  }
}

// async function updatesManager(
//   arr: ArticleBaseAttributes[],
//   mode: UpdateManagerModes
// ) {
//   const db = dbUpdateFunctions();
//   const receivedDbResults = [];
//   if (mode === "create") {
//     const dbPromises = await db.create(arr);
//     receivedDbResults.push(...dbPromises);
//   } else if (mode === "update") {
//     const dbPromises = await db.update(arr);
//     receivedDbResults.push(...dbPromises);
//   } else {
//     const dbPromises = await db.delete(arr);
//     receivedDbResults.push(...dbPromises);
//   }

//   try {
//     const createRes: DbActionsRes = {
//       status: "success",
//       fulfilled: 0,
//       rejected: 0,
//     };
//     for (const obj of dbActionsRes) {
//       if (obj.status === "fulfilled") {
//         createRes.fulfilled += 1;
//       } else {
//         createRes.rejected += 1;
//       }
//     }
//     return createRes;
//   } catch (error) {
//     const errMess = error instanceof Error ? error.message : "Unknown Errror";
//     return {
//       status: "error",
//       fulfilled: 0,
//       rejected: 0,
//       error: errMess,
//     };
//   }
// }
