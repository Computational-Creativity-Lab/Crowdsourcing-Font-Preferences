import Layout from "../../components/layout/Layout";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  function addMeetupHandler(enteredMeetupContent) {
    console.log(enteredMeetupContent);
  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;
