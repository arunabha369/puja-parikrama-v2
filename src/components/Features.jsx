import { Map, Clock, Search, Image } from 'lucide-react';

const features = [
    {
        icon: <Map className="w-6 h-6 text-white" />,
        title: "Smart Itinerary Planning",
        description: "Create the perfect route based on your starting point and available time. We optimize your path to minimize travel time."
    },
    {
        icon: <Image className="w-6 h-6 text-white" />,
        title: "Visual Pandal Gallery",
        description: "Explore puja pandals visually before you visit. Browse through our curated gallery to decide your must-visit destinations."
    },
    {
        icon: <Search className="w-6 h-6 text-white" />,
        title: "Search & Discover",
        description: "Find specific pandals by name, location, or district. Our powerful search helps you locate your favorite pujas instantly."
    },
    {
        icon: <Clock className="w-6 h-6 text-white" />,
        title: "Real-time Optimization",
        description: "Our algorithms account for walking distances and estimated visit times to ensure you cover the maximum pandals."
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
