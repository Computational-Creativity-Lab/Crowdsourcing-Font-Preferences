import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react/cjs/react.production.min";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupContent) {
    console.log(enteredMeetupContent);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupContent),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Data: ", data);

    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>{" "}
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />{" "}
    </Fragment>
  );
}

export default NewMeetupPage;
