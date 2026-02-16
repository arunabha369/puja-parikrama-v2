import { Flower } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-black/40 backdrop-blur-xl border-t border-white/10 pt-16 pb-8 mt-auto z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-12">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Flower className="h-6 w-6 text-yellow-400" />
                            <span className="font-cinzel font-bold text-xl text-white">Puja Parikrama</span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Your spiritual companion for a seamless and divine Durga Puja experience. Plan your parikrama with precision and devotion.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-cinzel font-bold text-lg text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li><a href="/" className="hover:text-yellow-400 transition-colors">Home</a></li>
                            <li><a href="/planner" className="hover:text-yellow-400 transition-colors">Plan Itinerary</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-cinzel font-bold text-lg text-white mb-6">Devotion</h3>
                        <p className="text-sm text-white/60 italic font-playfair">
                            "Ya Devi Sarvabhuteshu Shakti-Rupena Samsthita..."
                        </p>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-white/40">
                    © {new Date().getFullYear()} Puja Parikrama. All rights reserved. Made with devotion.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
