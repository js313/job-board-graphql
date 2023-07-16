import DataLoader from "dataloader";
import knex from "knex";

export const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./data/db.sqlite3",
  },
  useNullAsDefault: true,
});

export const createCompanyLoader = () => {
  //did this to prevent permanent caching so we create new DataLoader instance on every request, which is deleted after request lifecycle ends
  const companyLoader = new DataLoader(async (companyIds) => {
    const companies = await db
      .select()
      .from("companies")
      .whereIn("id", companyIds);
    //Need to order the data as it came in through companyIds
    return companyIds.map((companyId) => {
      return companies.find((company) => {
        return companyId === company.id;
      });
    });
  });
  return companyLoader;
};
