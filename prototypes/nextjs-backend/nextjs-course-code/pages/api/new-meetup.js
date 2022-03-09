import { MongoClient } from "mongodb";

// const { MongoClient } = require("mongodb");
const pwd = "V7Ws3qc-kGG8Wmi";
// /api/new-meetup
// POST / api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;
    const userName = "miatang13";
    const pwd = "testtesttest";
    const client = await MongoClient.connect(
      "mongodb+srv://" +
        userName +
        ":" +
        pwd +
        "@cluster0.u1gjq.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log("Result id: ", result);

    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
