import { sequelize } from "../../src/dbSetup/dbClient";
import { getTags } from "../../src/dbSetup/dbControllers/dbWorkers";

test("Tags are get from DB", async () => {
  await sequelize.sync();
  const res = await getTags();

  expect(Array.isArray(res)).toBe(true);
  res.forEach((el) => {
    expect(typeof el).toBe("string");
  });
});
