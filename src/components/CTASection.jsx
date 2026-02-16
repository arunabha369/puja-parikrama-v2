import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="py-24 relative z-10 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                <div className="glass-panel p-12 rounded-3xl border border-white/20 relative overflow-hidden">
                    {/* Glow behind */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/20 blur-3xl rounded-full -z-10"></div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-cinzel text-glow">
                        Begin your spiritual journey today
                    </h2>
                    <p className="text-xl text-white/80 mb-10 font-light">
                        Join thousands of devotees planning their perfect Durga Puja parikrama.
                    </p>
                    <Link
                        to="/planner"
                        className="btn-liquid inline-block text-lg"
                    >
                        Start Planning Now
                    </Link>
                </div>
            </div>

            {/* Background decoration - subtle mandala or similar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-full opacity-10 pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white fill-current animate-spin-slow">
                    <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.2,22.9,71.2,33.7C60.2,44.5,49.5,52.4,38.2,59.3C26.9,66.2,15,72.1,1.9,68.8C-11.2,65.5,-25.5,53,-38.3,41.2C-51.1,29.4,-62.4,18.3,-67.2,4.2C-72,-9.9,-70.3,-27,-61.1,-39.9C-51.9,-52.8,-35.1,-61.5,-19.6,-67.6C-4.1,-73.7,10.2,-77.2,25.2,-78.9" transform="translate(100 100)" />
                </svg>
            </div>
        </section>
    );
};

export default CTASection;
