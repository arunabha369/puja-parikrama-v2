import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Flower, ArrowRight, ArrowLeft } from 'lucide-react';
import { usePuja } from '../context/PujaContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { selectedPuja } = usePuja();
    const location = useLocation();
    const navigate = useNavigate();

    // Determine return path based on current location
    const getSelectorLink = () => {
        if (location.pathname === '/temples') {
            return '/select-puja?mode=view';
        }
        return '/select-puja?mode=plan';
    };

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: sectionId } });
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(sectionId);
            } else if (sectionId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('home');
            }
        }
    };

    const handleNavClick = (e, sectionId) => {
        e.preventDefault();
        scrollToSection(sectionId);
    };

    // Handle scroll from other pages
    useEffect(() => {
        if (location.state?.scrollTo) {
            const sectionId = location.state.scrollTo;
            const element = document.getElementById(sectionId);
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
                setActiveSection(sectionId);
            }
            // Clear state to prevent scroll on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Scroll spy logic
            if (location.pathname === '/') {
                const scrollPosition = window.scrollY + 100; // Offset
                const sections = ['roadmaps', 'features'];
                let current = 'home';

                for (const section of sections) {
                    const element = document.getElementById(section);
                    if (element && element.offsetTop <= scrollPosition) {
                        current = section;
                    }
                }
                setActiveSection(current);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Update active section based on path if not on home
    useEffect(() => {
        if (location.pathname !== '/') {
            setActiveSection('');
        } else {
            // Re-check scroll position on home mount
            const handleScroll = () => {
                // duplicate simple check logic or just let the scroll listener handle it
            };
            handleScroll();
        }
    }, [location.pathname]);


    const navItems = [
        { id: 'home', label: 'Home', action: (e) => handleNavClick(e, 'home'), link: '/' },
        { id: 'roadmaps', label: 'Roadmaps', action: (e) => handleNavClick(e, 'roadmaps'), link: '/#roadmaps' },
        { id: 'features', label: 'Features', action: (e) => handleNavClick(e, 'features'), link: '/#features' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/20 backdrop-blur-xl border-b border-white/10' : 'bg-transparent border-b border-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center relative">
                    {/* Logo Section */}
                    <div className="flex items-center shrink-0">
                        <Link to="/" className="flex items-center gap-2 group" onClick={() => setActiveSection('home')}>
                            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                                <Flower className="h-6 w-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                            </div>
                            <span className="font-cinzel font-bold text-xl md:text-2xl text-white tracking-wide text-glow hidden sm:block">
                                Puja Parikrama
                            </span>
                        </Link>
                    </div>

                    {/* Center Pill Navigation (Desktop) */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
                        <div className="flex items-center p-1.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full shadow-lg">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.link}
                                    onClick={item.action}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === item.id
                                        ? 'bg-white/10 text-yellow-400 shadow-[0_0_10px_rgba(255,255,255,0.05)]'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Buttons Section (Desktop) */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Select Puja (Outlined) */}
                        <Link
                            to={getSelectorLink()}
                            className="px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center gap-2 group"
                        >
                            {!selectedPuja ? (
                                <>Select Puja</>
                            ) : (
                                <>Change Puja</>
                            )}
                        </Link>

                        {/* Start Planning (Filled) */}
                        <Link
                            to="/planner"
                            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-sm font-bold text-white shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                        >
                            Start Planning
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-white hover:text-yellow-400 transition-colors focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden glass-panel mx-4 mt-2 rounded-2xl overflow-hidden animate-fade-in-down border border-white/10 bg-[#2e0202]/90 backdrop-blur-xl">
                    <div className="p-4 space-y-3">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.link}
                                onClick={(e) => {
                                    item.action(e);
                                    setIsOpen(false);
                                }}
                                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${activeSection === item.id
                                    ? 'bg-white/10 text-yellow-400'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </a>
                        ))}

                        <div className="h-px bg-white/10 my-4" />

                        <Link
                            to={getSelectorLink()}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all"
                        >
                            {!selectedPuja ? 'Select Puja' : 'Change Puja'}
                        </Link>

                        <Link
                            to="/planner"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold shadow-lg mt-2"
                        >
                            Start Planning <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
