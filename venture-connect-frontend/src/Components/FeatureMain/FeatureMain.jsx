import FeatureCard from './FeatureCard'

function FeatureMain() {
    return (
        <>
            <div className="flex justify-center flex-col items-center text-center px-10 py-4">
                <div className="px-5 py-1 text-sm inline-block mx-auto font-normal md:text-xl border border-black rounded-full">
                    Why Choose Venture Connect
                </div>
                <p className="text-3xl md:text-5xl lg:text-6xl font-bold mt-8 leading-tight">
                    Key <span className="text-blue-500">Benefits</span> of Joining Us
                </p>
                <p className="md:mt-6 mt-4 text-neutral-400 font-normal text-lg md:text-xl">
                    Venture Connect bridges startups and investors,
                    <br /> making growth and collaboration simple and impactful
                </p>
            </div>
            <div className="container mx-auto p-4 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard />
                </div>
            </div>
        </>
    )
}

export default FeatureMain
