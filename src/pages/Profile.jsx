import React from 'react';
import { usePuja } from '../context/PujaContext';
import { User, LogOut, Github, Linkedin, Instagram, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, currentTheme } = usePuja();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 relative z-10">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">

                {/* My Profile Section */}
                <section className="glass-panel p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 p-1 shadow-lg shadow-orange-500/30">
                            <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center overflow-hidden">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-3xl font-bold text-white">{user.name?.charAt(0) || 'U'}</span>
                                )}
                            </div>
                        </div>
                        <div className="text-center md:text-left flex-grow">
                            <h2 className="text-3xl font-cinzel font-bold text-white mb-2">{user.name || 'Puja Parikrama User'}</h2>
                            <p className="text-white/60 flex items-center justify-center md:justify-start gap-2">
                                <Mail className="w-4 h-4" /> {user.email || 'user@example.com'}
                            </p>
                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-yellow-300 font-medium">
                                    Premium Member
                                </span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                                    Joined {new Date().getFullYear()}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-200 transition-all duration-300 group"
                        >
                            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Sign Out
                        </button>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* About Us (Developer) Section */}
                    <section className="glass-panel p-8 rounded-2xl relative group hover:bg-white/5 transition-colors duration-300">
                        <h3 className="text-xl font-cinzel font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <User className="w-5 h-5" />
                            </span>
                            About the Developer
                        </h3>

                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-16 h-16 rounded-xl bg-gray-800 overflow-hidden shrink-0 border border-white/10">
                                {/* Placeholder for Developer Image */}
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900 text-white font-bold text-xl">
                                    AB
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Arunabha Banerjee</h4>
                                <p className="text-white/60 text-sm mb-2">Full Stack Developer & UI/UX Designer</p>
                                <p className="text-white/50 text-xs leading-relaxed">
                                    Passionate about creating immersive digital experiences that blend culture with technology.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <a href="https://github.com/arunabha369" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group/link">
                                <Github className="w-5 h-5 text-white/70 group-hover/link:text-white" />
                                <span className="text-sm text-white/70 group-hover/link:text-white">GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/arunabha369" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group/link">
                                <Linkedin className="w-5 h-5 text-blue-400/70 group-hover/link:text-blue-400" />
                                <span className="text-sm text-white/70 group-hover/link:text-white">LinkedIn</span>
                            </a>
                            <a href="https://www.instagram.com/arunabha_369" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group/link">
                                <Instagram className="w-5 h-5 text-pink-400/70 group-hover/link:text-pink-400" />
                                <span className="text-sm text-white/70 group-hover/link:text-white">Instagram</span>
                            </a>
                            <a href="https://www.arunabha.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group/link">
                                <Globe className="w-5 h-5 text-emerald-400/70 group-hover/link:text-emerald-400" />
                                <span className="text-sm text-white/70 group-hover/link:text-white">Portfolio</span>
                            </a>
                        </div>
                    </section>

                    {/* Contact Us Section */}
                    <section className="glass-panel p-8 rounded-2xl relative group hover:bg-white/5 transition-colors duration-300">
                        <h3 className="text-xl font-cinzel font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                                <Mail className="w-5 h-5" />
                            </span>
                            Contact Us
                        </h3>

                        <div className="space-y-6">
                            <p className="text-white/60 text-sm">
                                Have questions or suggestions? We'd love to hear from you. Reach out to us for collaborations or support.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/40 uppercase tracking-wider">Email Support</p>
                                        <p className="text-white font-medium">growwithhustler@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/40 uppercase tracking-wider">Location</p>
                                        <p className="text-white font-medium">Kolkata, West Bengal, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
