import connectToMongoDB from "../../utils/backend/connectDb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await connectToMongoDB();
    const db = client.db();

    const preferencesCollection = db.collection("preferences-test");
    const result = await preferencesCollection.insertOne(data);
    console.log("Result id: ", result);

    client.close();

    res.status(201).json({ message: "Preference inserted" });
  }
}
