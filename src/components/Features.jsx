import { Calendar, Map, Bell, Smartphone } from 'lucide-react';

const features = [
    {
        icon: <Calendar className="h-6 w-6 text-orange-600" />,
        title: "Smart Puja Planner",
        description: "Automatically schedules pandal visits based on your start time and location."
    },
    {
        icon: <Map className="h-6 w-6 text-orange-600" />,
        title: "Temple-wise Planning",
        description: "Select from North, South, or convert your location to find nearby pujas."
    },
    {
        icon: <Bell className="h-6 w-6 text-orange-600" />,
        title: "Auspicious Timings",
        description: "Our algorithm respects optimal viewing hour estimations for a divine experience."
    },
    {
        icon: <Smartphone className="h-6 w-6 text-orange-600" />,
        title: "Mobile Friendly",
        description: "Plan your parikrama on the go. Optimized for all devices and screen sizes."
    }
];

const Features = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Use Puja Parikrama?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Experience the joy of Durga Puja without the chaos of planning. We handle the logistics so you can focus on devotion.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-orange-50/30 p-8 rounded-2xl hover:bg-orange-50 transition-colors duration-300 border border-transparent hover:border-orange-100">
                            <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
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
