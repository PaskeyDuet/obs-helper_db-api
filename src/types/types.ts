import { Optional } from "sequelize";
import { Request } from "express";
import Article from "src/dbSetup/models/Article";

export type ArticleBaseAttributes = {
  name: string;
  content: string;
  tags: string[];
};

export type ArticleDbAttributes = ArticleBaseAttributes & {
  article_id: number;
};

export type ArticleCreationAttributes = Optional<
  ArticleDbAttributes,
  "article_id" | "tags"
>;

export type RequestWithArticle = Request & {
  body: ArticleCreationAttributes;
};

export type listsOfUpdatedArticles = {
  updated?: ArticleBaseAttributes[];
  deleted?: string[];
  created?: ArticleBaseAttributes[];
};

export type DbManagerBaseRes = {
  status: "success" | "error";
  requests: number;
  fulfilled: number;
  rejected: number;
  error?: string;
};

export type DbManagerCreatedRes = DbManagerBaseRes & {
  created: number;
};
export type DbManagerUpdatedRes = DbManagerBaseRes & {
  updated: number;
};
export type DbManagerDeletedRes = DbManagerBaseRes & {
  deleted: number;
};
export type DbManagerResAlias =
  | Promise<DbManagerCreatedRes>
  | Promise<DbManagerUpdatedRes>
  | Promise<DbManagerDeletedRes>;
export type DbManagerPromisesArr = DbManagerResAlias[];

export type UpdateManagerModes = "create" | "update" | "delete";
export type dbManagerPromisesTypes =
  | PromiseSettledResult<Article>[]
  | PromiseSettledResult<[affectedCount: number]>[]
  | PromiseSettledResult<number>[];
