import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Flower, ArrowLeft, ArrowRight } from 'lucide-react';
import { usePuja } from '../context/PujaContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { selectedPuja, setSelectedPuja } = usePuja();
    const location = useLocation();
    const navigate = useNavigate();

    // Determine return path based on current location
    const getSelectorLink = () => {
        if (location.pathname === '/temples') {
            return '/select-puja?mode=view';
        }
        return '/select-puja?mode=plan';
    };

    const scrollToRoadmaps = (e) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: 'roadmaps' } });
        } else {
            const element = document.getElementById('roadmaps');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Handle scroll from other pages
    useEffect(() => {
        if (location.state?.scrollTo === 'roadmaps') {
            const element = document.getElementById('roadmaps');
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
            }
            // Clear state to prevent scroll on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/20 backdrop-blur-xl border-b border-white/10' : 'bg-transparent border-b border-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                                <Flower className="h-6 w-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                            </div>
                            <span className="font-cinzel font-bold text-2xl text-white tracking-wide text-glow hidden sm:block">
                                Puja Parikrama
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-white/80 hover:text-white font-medium transition-colors relative group text-sm">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>
                        </Link>

                        <a href="#roadmaps" onClick={scrollToRoadmaps} className="text-white/80 hover:text-white font-medium transition-colors relative group text-sm">
                            Roadmaps
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>
                        </a>

                        {selectedPuja && (
                            <Link to="/temples" className="text-white/80 hover:text-white font-medium transition-colors relative group text-sm">
                                Temples
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>
                            </Link>
                        )}

                        {/* Puja Selection / Change Button */}
                        <Link
                            to={getSelectorLink()}
                            className="bg-white/5 border border-white/10 hover:border-yellow-400/50 hover:bg-white/10 text-white/80 hover:text-yellow-400 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 backdrop-blur-md group"
                        >
                            {!selectedPuja ? (
                                <><span>Select Puja</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                            ) : (
                                <><ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> <span>Change Puja</span></>
                            )}
                        </Link>

                        <Link to="/planner" className="btn-liquid text-sm px-6 py-2">
                            Start Planning
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-yellow-400 transition-colors focus:outline-none"
                        >
                            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Glass Mobile menu */}
            {isOpen && (
                <div className="md:hidden glass-panel mx-4 mt-2 rounded-xl overflow-hidden animate-fade-in-down">
                    <div className="px-4 pt-4 pb-6 space-y-4">
                        <Link
                            to={getSelectorLink()}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-base font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                        >
                            {!selectedPuja ? (
                                <><span>Select Puja</span> <ArrowRight className="w-4 h-4" /></>
                            ) : (
                                <><ArrowLeft className="w-4 h-4" /> <span>Change Puja</span></>
                            )}
                        </Link>

                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10 hover:text-yellow-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>

                        <a
                            href="#roadmaps"
                            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10 hover:text-yellow-400 transition-colors"
                            onClick={(e) => {
                                setIsOpen(false);
                                scrollToRoadmaps(e);
                            }}
                        >
                            Roadmaps
                        </a>

                        {selectedPuja && (
                            <Link
                                to="/temples"
                                className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10 hover:text-yellow-400 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Temples
                            </Link>
                        )}

                        <Link
                            to="/planner"
                            className="block w-full text-center bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-lg shadow-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Start Planning
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
