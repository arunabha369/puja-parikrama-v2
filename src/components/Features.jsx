import { Calendar, Map, Bell, Smartphone } from 'lucide-react';

const features = [
    {
        icon: <Calendar className="h-6 w-6 text-yellow-400" />,
        title: "Smart Puja Planner",
        description: "Automatically schedules pandal visits based on your start time and location."
    },
    {
        icon: <Map className="h-6 w-6 text-yellow-400" />,
        title: "Temple-wise Planning",
        description: "Select from North, South, or convert your location to find nearby pujas."
    },
    {
        icon: <Bell className="h-6 w-6 text-yellow-400" />,
        title: "Auspicious Timings",
        description: "Our algorithm respects optimal viewing hour estimations for a divine experience."
    },
    {
        icon: <Smartphone className="h-6 w-6 text-yellow-400" />,
        title: "Mobile Friendly",
        description: "Plan your parikrama on the go. Optimized for all devices and screen sizes."
    }
];

const Features = () => {
    return (
        <section className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-cinzel text-glow">Why Use Puja Parikrama?</h2>
                    <p className="text-white/80 max-w-2xl mx-auto font-light">
                        Experience the joy of Durga Puja without the chaos of planning. We handle the logistics so you can focus on devotion.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="glass-card group">
                            <div className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-cinzel">{feature.title}</h3>
                            <p className="text-white/70 leading-relaxed font-light">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
