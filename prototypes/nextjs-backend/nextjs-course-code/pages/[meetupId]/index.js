import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  console.log("Details props:", props);

  return (
    <MeetupDetail image="" title="blah" address="address" description="des" />
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    // would fetch ids from API
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  return {
    props: {
      meetupData: {},
    },
  };
}

export default MeetupDetails;
