import connectToMongoDB from "../../utils/backend/connectDb";
import { DB_COLLECTION_NAME } from "../../utils/settings";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await connectToMongoDB();
    const db = client.db();

    const preferencesCollection = db.collection(DB_COLLECTION_NAME);
    const result = await preferencesCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Preference inserted" });
  }
}
