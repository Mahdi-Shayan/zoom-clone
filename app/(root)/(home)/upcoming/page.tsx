import CallsList from "@/components/CallsList"
import PageTitle from "@/components/PageTitle"

function Upcoming() {

  return (
    <div className="h-full flex flex-col">
      <PageTitle title='Upcoming Meetings'/>
      <section className="h-full">
        <CallsList type="upcoming" isPage={true} />
      </section>
    </div>
  )
}
export default Upcoming