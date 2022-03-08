import MeetupList from "../components/meetups/MeetupList";
import bodyParser from "body-parser";
import util from "util";
const getBody = util.promisify(bodyParser.urlencoded());

// IP address
// import NetInfo from "@react-native-community/netinfo";
// import { useEffect } from "react";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://www.thefarmersdog.com/digest/wp-content/uploads/2021/12/corgi-top.jpg",
    address: "some address 1",
    description: "This is our first meetup",
  },
  {
    id: "m2",
    title: "A First Meetup",
    image:
      "https://d.newsweek.com/en/full/1880525/corgi-dog.webp?w=1600&h=900&q=88&f=0dad56c0e651fd2a2ea356c09a564bf1",
    address: "some address 2",
    description: "This is our first meetup",
  },
];

function HomePage(props) {
  //   useEffect(() => {
  //     NetInfo.fetch().then((state) => {
  //       console.log("Connection type", state.type);
  //       console.log("Is connected?", state.isConnected);
  //     });
  //   }, []);
  console.log(props);
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

  // will always run on server
  // can use credentials that u don't want to expose to clients
  return {
    props: { meetups: DUMMY_MEETUPS, ip: ip },
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
