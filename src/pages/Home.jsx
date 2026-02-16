import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import CTASection from '../components/CTASection';
import Roadmaps from '../components/Roadmaps';

const Home = () => {
    return (
        <div className="relative z-10">
            <Helmet>
                <title>Puja Parikrama - Plan Your Divine Route</title>
                <meta name="description" content="Plan your Durga Puja parikrama with precision. Create optimized schedules based on date, location & temples." />
            </Helmet>
            <HeroSection />
            <Roadmaps />
            <Features />
            <HowItWorks />
            <CTASection />
        </div>
    );
};

export default Home;
