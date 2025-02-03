import conference from "../../assets/images/Conference.png";
import handshake from "../../assets/images/Handshake.png";
import training from "../../assets/images/Training.png";

function FeatureCard() {
    return (
        <>
            <div className="max-w-sm md:max-w-md w-full p-1 rounded-4xl shadow-lg mx-auto">

                <div className="w-full h-60 flex justify-center items-center overflow-hidden bg-slate-200/40 shadow-white rounded-t-4xl">
                    <div className="w-36 h-36 object-fill rounded-4xl bg-white flex justify-center items-center">
                        <img
                            src={conference}
                            className="w-20 h-20 object-fill"
                        />
                    </div>
                </div>

                <div className="p-5">
                    <p className="text-2xl font-semibold">Public Profiles</p>
                    <p className="font-normal text-neutral-400 py-2">Showcase your mission and connect with the right people for your growth journey.</p>
                </div>

            </div>

            <div className="max-w-sm md:max-w-md w-full p-1 rounded-4xl shadow-lg mx-auto">

                <div className="w-full h-60 flex justify-center items-center overflow-hidden bg-slate-200/40 shadow-white rounded-t-4xl">
                    <div className="w-36 h-36 object-fill rounded-4xl bg-white flex justify-center items-center">
                        <img
                            src={handshake}
                            className="w-20 h-20 object-fill"
                        />
                    </div>
                </div>

                <div className="p-5">
                    <p className="text-2xl font-semibold">Mentorship Plans</p>
                    <p className="font-normal text-neutral-400 py-2">Let investors guide you with personalized mentorship to scale smarter</p>
                </div>

            </div>

            <div className="max-w-sm md:max-w-md w-full p-1 rounded-4xl shadow-lg mx-auto">

                <div className="w-full h-60 flex justify-center items-center overflow-hidden bg-slate-200/40 shadow-white rounded-t-4xl">
                    <div className="w-36 h-36 object-fill rounded-4xl bg-white flex justify-center items-center">
                        <img
                            src={training}
                            className="w-20 h-20 object-fill"
                        />
                    </div>
                </div>

                <div className="p-5">
                    <p className="text-2xl font-semibold">Open Pitch Opportunities</p>
                    <p className="font-normal text-neutral-400 py-2">Apply for exclusive opportunities to present your ideas directly to investors</p>
                </div>

            </div>
        </>
    )
}

export default FeatureCard
