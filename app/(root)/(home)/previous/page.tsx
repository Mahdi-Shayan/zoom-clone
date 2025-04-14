import CallsList from "@/components/CallsList";
import PageTitle from "@/components/PageTitle";

function Previous() {
  return (
    <div className="h-full flex flex-col">
      <PageTitle title="Previous Meetings" />
      <section className="h-full">
        <CallsList type="previous" isPage={true} />
      </section>
    </div>
  );
}
export default Previous;
