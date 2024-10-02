import { Table, Column, Model, DataType, Unique } from "sequelize-typescript";
import {
  ArticleCreationAttributes,
  ArticleDbAttributes,
} from "src/types/types";

@Table({
  timestamps: true,
  tableName: "obsidian_articles",
  modelName: "Articles",
})
export default class Article extends Model<
  ArticleDbAttributes,
  ArticleCreationAttributes
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare article_id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
  })
  declare content: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  declare tags: string[];
}
