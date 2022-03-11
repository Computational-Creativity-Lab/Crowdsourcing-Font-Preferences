import { MongoClient } from "mongodb";

export default async function connectToMongoDB() {
  const userName = "miatang13";
  const pwd = "thisisatestpwd";
  const client = await MongoClient.connect(
    "mongodb+srv://" +
      userName +
      ":" +
      pwd +
      "@cluster0.winbw.mongodb.net/fontpreferences?retryWrites=true&w=majority"
  );
  return client;
}
