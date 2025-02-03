import step1 from "../../assets/images/profile-grid.png";
function StepCard({ stepNumber, title, description, reverseLayout, imageSrc }) {
    return (
        <>
            <div className="container mx-auto p-4 md:p-10">
                <div className={`flex flex-col ${reverseLayout ? "md:flex-row-reverse" : "md:flex-row"} items-center`}>
                    <div className={`w-full md:w-1/2 h-96 bg-slate-400/20 flex ${stepNumber == 1 ? "justify-end" : "justify-center"}  items-center rounded-4xl`}>
                        <img
                            src={imageSrc || step1}
                            alt={`stepImage-${stepNumber}`}
                            className="rounded-lg size-60 md:size-64 lg:size-80 xl:size-auto"
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
                        <div className="inline-block w-fit bg-blue-500 text-white text-sm md:text-base px-4 py-2 rounded-full mb-4">
                            Step {stepNumber}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-semibold">{title}</h2>
                        <p className="font-normal text-neutral-400 py-2 mt-2 md:mt-4">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StepCard
