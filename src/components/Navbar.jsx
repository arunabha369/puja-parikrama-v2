import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Flower, ArrowRight, ArrowLeft } from 'lucide-react';
import { usePuja } from '../context/PujaContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { selectedPuja, currentTheme } = usePuja();
    const location = useLocation();
    const navigate = useNavigate();

    // Sliding Pill Logic
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const navRefs = useRef({});

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
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);

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
        }
    }, [location.pathname]);

    useEffect(() => {
        const activeElement = navRefs.current[activeSection];
        if (activeElement) {
            setPillStyle({
                left: activeElement.offsetLeft,
                width: activeElement.offsetWidth,
                opacity: 1
            });
        } else {
            setPillStyle({ left: 0, width: 0, opacity: 0 }); // Hide if no active section
        }
    }, [activeSection]);


    const navItems = [
        { id: 'home', label: 'Home', action: (e) => handleNavClick(e, 'home'), link: '/' },
        { id: 'roadmaps', label: 'Roadmaps', action: (e) => handleNavClick(e, 'roadmaps'), link: '/#roadmaps' },
        { id: 'features', label: 'Features', action: (e) => handleNavClick(e, 'features'), link: '/#features' },
    ];

    // Dynamic Colors based on Theme
    const bgColor = currentTheme.colors.background + (scrolled ? 'CC' : '99'); // Hex + Alpha (80% / 60%)
    const mobileBgColor = currentTheme.colors.background + 'F2'; // 95% opacity
    const primaryColor = currentTheme.colors.primary;
    const secondaryColor = currentTheme.colors.secondary;
    const gradientStyle = { backgroundImage: `linear-gradient(to right, ${secondaryColor}, ${primaryColor})` };

    return (
        <nav className={`fixed top-4 md:top-6 left-0 right-0 z-50 transition-all duration-300 pointer-events-none flex justify-center`}>
            {/* 
                Main Floating Pill Container 
            */}
            <div
                className={`
                    mx-2 md:mx-4 w-full max-w-5xl flex items-center justify-between pointer-events-auto transition-all duration-500
                    rounded-full border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl
                    ${scrolled ? 'py-2 px-4 shadow-black/60' : 'py-3 px-5'}
                `}
                style={{ backgroundColor: bgColor }}
            >

                {/* Logo Section */}
                <div className="flex items-center shrink-0">
                    <Link to="/" className="flex items-center gap-2 group" onClick={() => setActiveSection('home')}>
                        <div className="p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                            <Flower className="h-5 w-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                        </div>
                        <span className="font-cinzel font-bold text-lg md:text-xl text-white tracking-wide text-glow block">
                            Puja Parikrama
                        </span>
                    </Link>
                </div>

                {/* Center Pill Navigation (Desktop) - Sliding Animation */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
                    <div className="relative flex items-center p-1 bg-black/20 backdrop-blur-xl border border-white/5 rounded-full shadow-inner">

                        {/* The Sliding Pill Background */}
                        <div
                            className="absolute top-1 bottom-1 rounded-full shadow-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                            style={{
                                left: pillStyle.left,
                                width: pillStyle.width,
                                opacity: pillStyle.opacity,
                                ...gradientStyle,
                                boxShadow: `0 4px 15px -3px ${primaryColor}66` // Colored shadow
                            }}
                        />

                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                ref={el => navRefs.current[item.id] = el}
                                href={item.link}
                                onClick={item.action}
                                className={`relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${activeSection === item.id
                                    ? 'text-white'
                                    : 'text-white/70 hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Buttons Section (Desktop) */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        to={getSelectorLink()}
                        className="px-4 py-2 rounded-full text-xs font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 group ring-1 ring-white/10 hover:ring-white/30"
                    >
                        {!selectedPuja ? 'Select Puja' : 'Change Puja'}
                    </Link>

                    <Link
                        to="/planner"
                        className="px-5 py-2 rounded-full text-xs font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                        style={{ ...gradientStyle, boxShadow: `0 4px 15px -3px ${primaryColor}66` }}
                    >
                        Start Planning
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>

                {/* Mobile Menu Button - Optimized Position */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-white hover:text-yellow-400 transition-colors focus:outline-none bg-white/5 rounded-full"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown - Floating Card Style */}
            {isOpen && (
                <div className="absolute top-[calc(100%+1rem)] left-0 right-0 px-4 md:hidden pointer-events-auto">
                    <div
                        className="glass-panel rounded-2xl overflow-hidden animate-fade-in-down border border-white/10 backdrop-blur-xl shadow-2xl p-4 space-y-3"
                        style={{ backgroundColor: mobileBgColor }}
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.link}
                                onClick={(e) => {
                                    item.action(e);
                                    setIsOpen(false);
                                }}
                                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${activeSection === item.id
                                    ? 'text-white shadow-lg'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                                    }`}
                                style={activeSection === item.id ? { ...gradientStyle, boxShadow: `0 4px 15px -3px ${primaryColor}66` } : {}}
                            >
                                {item.label}
                            </a>
                        ))}

                        <div className="h-px bg-white/10 my-3" />

                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                to={getSelectorLink()}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all text-sm"
                            >
                                {!selectedPuja ? 'Select' : 'Change'}
                            </Link>

                            <Link
                                to="/planner"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-white font-bold shadow-lg text-sm"
                                style={{ ...gradientStyle, boxShadow: `0 4px 15px -3px ${primaryColor}66` }}
                            >
                                Plan <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
