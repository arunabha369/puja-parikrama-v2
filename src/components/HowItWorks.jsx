const steps = [
    {
        id: 1,
        title: "Select Details",
        description: "Choose your date, start time, and preferred general location in Kolkata."
    },
    {
        id: 2,
        title: "Explore Pandas",
        description: "We list the best pandals optimized for your route and walking speed."
    },
    {
        id: 3,
        title: "Get Your Plan",
        description: "Receive a complete, timed itinerary ready for your spiritual journey."
    }
];

const HowItWorks = () => {
    return (
        <section className="py-20 bg-orange-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <p className="text-gray-600">3 simple steps to your perfect puja schedule.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-orange-200 -z-10 transform translate-y-4"></div>

                    {steps.map((step) => (
                        <div key={step.id} className="relative">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 h-full flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-md z-10">
                                    {step.id}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
