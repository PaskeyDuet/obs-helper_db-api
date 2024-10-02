import express, { json, urlencoded } from "express";
import { dbRouter } from "./routers/dbroutes";
import { sequelize } from "./dbSetup/dbClient";
import { readerRouter } from "./routers/updatedArticlesRoute";
import cors from "cors";
import Article from "./dbSetup/models/Article";

const app = express();

const port = process.env.PORT || 3001;

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

app.use("/obs", dbRouter);
app.use("/updates_handler", readerRouter);

(async () => {
  await sequelize.sync();
})();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
