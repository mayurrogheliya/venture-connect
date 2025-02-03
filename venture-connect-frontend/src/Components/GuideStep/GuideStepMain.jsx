import StepCard from "./StepCard"
import step1 from '../../assets/images/profile-grid.png';
import step2 from '../../assets/images/Rocket.png';
import step3 from '../../assets/images/chart-up.png';

function GuideStepMain() {
    const steps = [
        {
            stepNumber: 1,
            title: "Create Your Profile",
            description: "Startups can showcase their vision, while investors can highlight their interests and funding preferences.",
            imageSrc: step1,
            reverseLayout: false,
        },
        {
            stepNumber: 2,
            title: "Discover Opportunities",
            description: "Startups can explore investors, pitch events, and mentorship plans, while investors can find promising startups and impactful projects",
            imageSrc: step2,
            reverseLayout: true,
        },
        {
            stepNumber: 3,
            title: "Connect & Collaborate",
            description: "Build meaningful connections through pitches, mentorship, and seamless communication to grow and succeed together",
            imageSrc: step3,
            reverseLayout: false,
        }
    ]
    return (
        <>
            <div className="flex justify-center flex-col items-center text-center px-10 py-4 mt-24" id="features">
                <div className="px-5 py-1 text-sm inline-block mx-auto font-normal md:text-xl border border-black rounded-full">
                    Simple. Fast. Effective
                </div>
                <p className="text-3xl md:text-5xl lg:text-6xl font-bold mt-8 leading-relaxed">
                    Getting Started with <br />
                    <span className="text-blue-500">Venture Connect</span>
                </p>
                <p className="md:mt-6 mt-4 text-neutral-400 font-normal text-lg md:text-xl">
                    A simple 3-step process to help startups and investors <br /> connect, collaborate, and succeed together
                </p>
            </div>
            <div>
                {steps.map((step, index) => (
                    <StepCard
                        key={index}
                        stepNumber={step.stepNumber}
                        title={step.title}
                        description={step.description}
                        imageSrc={step.imageSrc}
                        reverseLayout={step.reverseLayout}
                    />
                ))}
            </div>
        </>
    )
}

export default GuideStepMain
