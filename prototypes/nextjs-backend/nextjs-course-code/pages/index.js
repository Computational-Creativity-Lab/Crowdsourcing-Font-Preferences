import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import bodyParser from "body-parser";
import util from "util";
const getBody = util.promisify(bodyParser.urlencoded());

function HomePage(props) {
  console.log("Homepage props:", props);
  return <MeetupList meetups={props.meetups} />;
}

// guaranteed to run for every request
// also have access to context request
export async function getServerSideProps({ req, res }) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;

  // similar to nodejs backend
  //   const req = context.req.headers;
  await getBody(req, res);
  console.log(req.method, req.body);

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

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // will always run on server
  // can use credentials that u don't want to expose to clients
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
      ip: ip,
    },
  };
}

// if data doesn't change multiple times every second, this is better
// because it is faster, and we can cache it
// export async function getStaticProps() {
//   // this code will never be on client, this is executed on build
//   return {
//     props: { meetups: DUMMY_MEETUPS },
//     revalidate: 10, // regenerate data every 10 sec, so we don't have to rebuild and redeploy when data changes
//   };
// }

export default HomePage;
