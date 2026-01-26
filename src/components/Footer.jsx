import { Flower } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-orange-900 text-orange-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Flower className="h-6 w-6 text-orange-400" />
                            <span className="font-bold text-xl text-white">Puja Parikrama</span>
                        </div>
                        <p className="text-orange-200/80 text-sm">
                            Your spiritual companion for a seamless and divine Durga Puja experience. Plan your parikrama with precision and devotion.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-orange-200/80">
                            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="/planner" className="hover:text-white transition-colors">Plan Itinerary</a></li>
                            {/* Add more links if needed */}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Devotion</h3>
                        <p className="text-sm text-orange-200/80 italic">
                            "Ya Devi Sarvabhuteshu Shakti-Rupena Samsthita..."
                        </p>
                    </div>
                </div>

                <div className="border-t border-orange-800 mt-12 pt-8 text-center text-xs text-orange-300/60">
                    © {new Date().getFullYear()} Puja Parikrama. All rights reserved. Made with devotion.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
