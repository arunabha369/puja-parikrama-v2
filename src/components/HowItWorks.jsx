const steps = [
    {
        id: 1,
        title: "Select Details",
        description: "Choose your date, start time, and preferred general location in Kolkata."
    },
    {
        id: 2,
        title: "Explore Pandals",
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
        <section className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-cinzel text-glow">How It Works</h2>
                    <p className="text-white/80">3 simple steps to your perfect puja schedule.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-white/20 -z-10 transform translate-y-4"></div>

                    {steps.map((step) => (
                        <div key={step.id} className="relative group">
                            <div className="glass-panel p-8 rounded-2xl h-full flex flex-col items-center text-center hover:bg-white/10 transition-colors duration-300">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-orange-500/30 z-10 relative group-hover:scale-110 transition-transform duration-300">
                                    {step.id}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 font-cinzel">{step.title}</h3>
                                <p className="text-white/70 font-light">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
