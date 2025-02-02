import EventCard from "../EventMain/EventCard"

function EventMain() {
    return (
        <>
            <div className="flex justify-center flex-col items-center text-center px-10 py-4">
                <div className="px-5 py-2 text-sm inline-block mx-auto font-normal md:text-lg border border-black rounded-full">
                    Upcoming Networking Events
                </div>
                <p className="text-3xl md:text-5xl lg:text-6xl font-bold mt-8 leading-tight">
                    Join Our Exclusive <span className="text-blue-500">Events</span>
                </p>
                <p className="md:mt-6 mt-4 text-neutral-400 font-medium text-lg md:text-2xl">
                    Join exclusive events to connect with investors, pitch
                    <br /> ideas, and network with industry leaders.
                </p>
            </div>
            <div className="container mx-auto p-4 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <EventCard />
                </div>
            </div>
        </>
    )
}

export default EventMain
