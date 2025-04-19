import PageTitle from "@/components/PageTitle";
import RecordingsList from "@/components/RecordingsList";

function Recordings() {

  return (
    <div className="h-full flex flex-col">
      <PageTitle title="meeting recordings" />
      <section className="h-full">
        <RecordingsList />
      </section>
    </div>
  );
}
export default Recordings;
