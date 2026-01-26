import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlannerForm from '../components/PlannerForm';
import ResultCard from '../components/ResultCard';
import MapComponent from '../components/MapComponent';
import { generateSortedList, applyTimings, STARTING_POINTS, generateGoogleMapsUrl } from '../utils/plannerLogic';
import { Download, Share2, Map as MapIcon, RotateCcw } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Planner = () => {
    const [itinerary, setItinerary] = useState([]);
    const [generated, setGenerated] = useState(false);
    const [startCoords, setStartCoords] = useState(null);
    const [startPointKey, setStartPointKey] = useState('');
    const resultsRef = useRef(null);

    const handleGenerate = ({ area, startPoint, startTime, endTime }) => {
        console.log("Generatiing plan...", { area, startPoint, startTime, endTime });

        // 1. Get Sorted List
        const sortedList = generateSortedList(startPoint, area);

        // 2. Apply Timings
        const plannedItinerary = applyTimings(sortedList, startTime, endTime, startPoint);

        setItinerary(plannedItinerary);
        setStartPointKey(startPoint);
        setStartCoords(STARTING_POINTS[startPoint]);
        setGenerated(true);

        // Scroll to results
        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleReset = () => {
        setGenerated(false);
        setItinerary([]);
        setStartCoords(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDownloadPDF = async () => {
        if (!itinerary.length) return;
        try {
            const input = document.getElementById('itinerary-container');
            const canvas = await html2canvas(input, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * ratio, imgHeight * ratio);
            pdf.save('Puja-Parikrama-Plan.pdf');
        } catch (err) {
            console.error("PDF Fail", err);
            alert("Could not generate PDF");
        }
    };

    const gmapsUrl = generateGoogleMapsUrl(itinerary, startPointKey);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Helmet>
                <title>Planner | Puja Parikrama</title>
                <meta name="description" content="Generate your custom Durga Puja hopping itinerary with travel times and distances." />
            </Helmet>
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">

                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">Plan Your Divine Route</h1>
                        <p className="text-gray-600">Enter your preferences and let us guide you to the Goddess.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Form Section */}
                        <div className="lg:col-span-1">
                            <PlannerForm onGenerate={handleGenerate} />

                            {generated && (
                                <div className="mt-6 text-center">
                                    <button
                                        onClick={handleReset}
                                        className="text-orange-600 hover:text-orange-700 font-medium flex items-center justify-center gap-2 mx-auto"
                                    >
                                        <RotateCcw className="w-4 h-4" /> Start Over
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Results Section */}
                        <div className="lg:col-span-2">
                            {!generated ? (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                                        <MapIcon className="w-8 h-8 text-orange-300" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-400 mb-2">Your Itinerary Awaits</h3>
                                    <p className="text-gray-400 max-w-sm">Complete the form to generate a customized pandal hopping schedule.</p>
                                </div>
                            ) : (
                                <div ref={resultsRef} className="space-y-6 animate-fade-in-up">

                                    {/* Map Preview */}
                                    <div className="h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-md border border-gray-200 relative z-0">
                                        <MapComponent itinerary={itinerary} startPointCoords={startCoords} />
                                    </div>

                                    {/* Stats & Actions */}
                                    <div className="bg-orange-600 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="text-center md:text-left">
                                            <div className="text-sm opacity-90">Total Pandals</div>
                                            <div className="text-3xl font-bold">{itinerary.length}</div>
                                        </div>
                                        <div className="h-8 w-px bg-white/20 hidden md:block"></div>
                                        <div className="text-center md:text-left">
                                            <div className="text-sm opacity-90">Walking Distance</div>
                                            <div className="text-3xl font-bold">{itinerary.reduce((acc, curr) => acc + curr.distance, 0).toFixed(1)} <span className="text-base font-normal">km</span></div>
                                        </div>

                                        <div className="flex gap-3">
                                            <a
                                                href={gmapsUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-white text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                                            >
                                                <MapIcon className="w-4 h-4" /> Route
                                            </a>
                                            <button
                                                onClick={handleDownloadPDF}
                                                className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                                            >
                                                <Download className="w-4 h-4" /> PDF
                                            </button>
                                        </div>
                                    </div>

                                    {/* List */}
                                    <div id="itinerary-container" className="pt-2 bg-gray-50">
                                        {itinerary.length === 0 ? (
                                            <div className="text-center py-10 text-gray-500">
                                                No pandals found fitting your time constraints. Try extending your time!
                                            </div>
                                        ) : (
                                            itinerary.map((pandal, idx) => (
                                                <ResultCard key={idx} pandal={pandal} index={idx} isFirst={idx === 0} />
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Planner;
