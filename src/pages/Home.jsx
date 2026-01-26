import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import CTASection from '../components/CTASection';

const Home = () => {
    return (
        <div className="min-h-screen bg-orange-50/50">
            <Helmet>
                <title>Puja Parikrama - Plan Your Divine Route</title>
                <meta name="description" content="Plan your Durga Puja parikrama with precision. Create optimized schedules based on date, location & temples." />
            </Helmet>
            <Navbar />
            <HeroSection />
            <Features />
            <HowItWorks />
            <CTASection />
            <Footer />
        </div>
    );
};

export default Home;
