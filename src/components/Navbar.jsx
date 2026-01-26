import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Flower } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-orange-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <Flower className="h-8 w-8 text-orange-600" />
                            <span className="font-bold text-xl text-gray-900 tracking-tight">Puja Parikrama</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Home</Link>
                        <Link to="/planner" className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
                            Start Planning
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-orange-600 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-orange-100 animate-fade-in-down">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/planner"
                            className="block px-3 py-2 rounded-md text-base font-medium text-orange-600 font-semibold hover:bg-orange-50"
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
