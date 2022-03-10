import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  console.log("Details props:", props);

  return (
    <MeetupDetail
      image={props.image}
      title={props.title}
      address={props.address}
      description="des"
    />
  );
}

export async function getStaticPaths() {
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

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    // would fetch ids from API
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meet up

  const meetupId = context.params.meetupId;
  console.log("MeetupId: ", meetupId);

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
  const o_id = new ObjectId(meetupId);
  const selectedMeetup = await meetupsCollection.findOne({ _id: o_id });

  client.close();

  console.log("selectedMeetup: ", selectedMeetup);

  return {
    props: {
      title: selectedMeetup.title,
      address: selectedMeetup.address,
      image: selectedMeetup.image,
      id: selectedMeetup._id.toString(),
    },
  };
}

export default MeetupDetails;
