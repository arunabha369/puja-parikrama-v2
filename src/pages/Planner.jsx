import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { usePuja } from '../context/PujaContext';
import PlannerForm from '../components/PlannerForm';
import ResultCard from '../components/ResultCard';
import MapComponent from '../components/MapComponent';
import { generateSortedList, applyTimings, STARTING_POINTS, generateGoogleMapsUrl } from '../utils/plannerLogic';
import { Download, Map as MapIcon, RotateCcw } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Planner = () => {
    const { selectedPuja } = usePuja();
    const [itinerary, setItinerary] = useState([]);
    const [generated, setGenerated] = useState(false);
    const [startCoords, setStartCoords] = useState(null);
    const [startPointKey, setStartPointKey] = useState('');
    const resultsRef = useRef(null);

    // Redirect if no puja selected
    if (!selectedPuja) {
        return <Navigate to="/select-puja?mode=plan" replace />;
    }

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
            // Create a dedicated off-screen container for the PDF content
            const printContainer = document.createElement('div');
            printContainer.style.position = 'fixed';
            printContainer.style.top = '-9999px';
            printContainer.style.left = '0';
            printContainer.style.width = '800px'; // Fixed width for consistent high-res output
            printContainer.style.zIndex = '10000';
            printContainer.style.backgroundColor = '#ffffff';

            // Calculate summaries
            const totalDistance = itinerary.reduce((acc, curr) => acc + curr.distance, 0).toFixed(1);
            const startPointLabel = STARTING_POINTS[startPointKey]?.label || startPointKey;
            const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            // Helper to format time
            const fmt = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

            // Build the HTML content (Tailwind classes will work if we append to body)
            // We use inline styles for critical layout safety, but tailwind classes for styling
            printContainer.className = "font-sans text-gray-900 bg-white";

            printContainer.innerHTML = `
                <div class="p-12 bg-white min-h-[1100px] relative">
                    <!-- Decor -->
                    <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-600"></div>
                    
                    <!-- Header -->
                    <div class="border-b border-orange-100 pb-8 mb-8 flex justify-between items-start">
                        <div>
                            <h1 class="text-4xl font-serif font-bold text-gray-900 flex items-center gap-3">
                                <span class="text-orange-600 text-3xl">🕉</span> Puja Parikrama
                            </h1>
                            <p class="text-gray-500 mt-2 text-sm font-medium tracking-wide uppercase">Divine Itinerary • ${dateStr}</p>
                        </div>
                        <div class="text-right bg-orange-50 px-6 py-3 rounded-xl border border-orange-100">
                             <div class="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">Starting Point</div>
                             <div class="text-lg font-bold text-gray-800">${startPointLabel}</div>
                             <div class="text-xs text-gray-500 mt-1">${itinerary.length} Pandals • ${totalDistance} km Walk</div>
                        </div>
                    </div>

                    <!-- Timeline -->
                    <div class="space-y-0 relative">
                        <!-- Vertical Line -->
                        <div class="absolute left-[92px] top-4 bottom-4 w-0.5 bg-gray-100" style="z-index: 0;"></div>

                        ${itinerary.map((item, i) => `
                            <div class="flex relative z-10 group" style="page-break-inside: avoid;">
                                <!-- Time Column -->
                                <div class="w-20 flex-shrink-0 text-right pt-1 pr-6 flex flex-col items-end">
                                    <div class="text-sm font-bold text-gray-900 leading-none">${fmt(item.arrivalTime)}</div>
                                    <div class="text-[10px] text-gray-400 mt-1">${fmt(item.departureTime)}</div>
                                </div>
                                
                                <!-- Dot -->
                                <div class="w-24 flex-shrink-0 flex justify-center pt-1.5 absolute left-14">
                                   <div class="w-3 h-3 rounded-full bg-orange-500 ring-4 ring-white shadow-sm z-20"></div>
                                </div>

                                <!-- Content -->
                                <div class="pb-10 pl-6 flex-grow ">
                                    <div class="bg-white rounded-lg ">
                                        <div class="flex justify-between items-baseline mb-1">
                                            <h3 class="text-lg font-bold text-gray-900">${i + 1}. ${item.name}</h3>
                                            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100 uppercase tracking-wider">${item.area}</span>
                                        </div>
                                        
                                        <div class="flex items-center gap-3 mb-2 text-xs text-gray-500">
                                            <span class="flex items-center gap-1">
                                               🚶 ${(item.distance).toFixed(1)} km 
                                            </span>
                                            <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span>${item.travelMinutes} min walk</span>
                                        </div>

                                        <p class="text-sm text-gray-600 leading-relaxed text-justify">${item.description}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Footer -->
                    <div class="mt-8 pt-8 border-t border-gray-100 text-center">
                         <div class="inline-flex items-center justify-center gap-2 text-xs text-gray-400 font-medium bg-gray-50 px-4 py-2 rounded-full">
                            <span>Generated by Puja Parikrama Planner</span>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(printContainer);

            // Wait for images or fonts if necessary (usually robust enough with timeout or check)
            // Using a small timeout to ensure DOM render cycle completes
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(printContainer, {
                scale: 2, // High resolution
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: 800
            });

            document.body.removeChild(printContainer);

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm
            const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const imgWidthMm = pdfWidth;
            const imgHeightMm = (imgHeight * pdfWidth) / imgWidth;

            let heightLeft = imgHeightMm;
            let position = 0;

            // First Page
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidthMm, imgHeightMm);
            heightLeft -= pdfHeight;

            // Multi-page
            while (heightLeft > 0) {
                position = heightLeft - imgHeightMm;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, position, imgWidthMm, imgHeightMm);
                heightLeft -= pdfHeight;
            }

            pdf.save('Puja-Parikrama-Plan.pdf');
        } catch (err) {
            console.error("PDF Fail", err);
            alert("Could not generate PDF. Please try again.");
        }
    };

    const gmapsUrl = generateGoogleMapsUrl(itinerary, startPointKey);

    return (
        <div className="relative z-10 flex flex-col font-sans pt-24 pb-12">
            <Helmet>
                <title>Planner | Puja Parikrama</title>
                <meta name="description" content="Generate your custom Durga Puja hopping itinerary with travel times and distances." />
            </Helmet>

            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">

                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-cinzel text-glow">Plan Your Divine Route</h1>
                        <p className="text-white/80 font-light">Enter your preferences and let us guide you to the Goddess.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Form Section */}
                        <div className="lg:col-span-1">
                            <PlannerForm onGenerate={handleGenerate} />

                            {generated && (
                                <div className="mt-6 text-center">
                                    <button
                                        onClick={handleReset}
                                        className="text-white hover:text-yellow-400 font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
                                    >
                                        <RotateCcw className="w-4 h-4" /> Start Over
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Results Section */}
                        <div className="lg:col-span-2">
                            {!generated ? (
                                <div className="glass-panel rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/10">
                                        <MapIcon className="w-8 h-8 text-white/60" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white/60 mb-2">Your Itinerary Awaits</h3>
                                    <p className="text-white/40 max-w-sm">Complete the form to generate a customized pandal hopping schedule.</p>
                                </div>
                            ) : (
                                <div ref={resultsRef} className="space-y-6 animate-fade-in-up">

                                    {/* Map Preview */}
                                    <div className="h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-lg border border-white/20 relative z-0">
                                        <MapComponent itinerary={itinerary} startPointCoords={startCoords} />
                                    </div>

                                    {/* Stats & Actions */}
                                    <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-orange-600/80 to-red-600/80 border-none">
                                        <div className="text-center md:text-left">
                                            <div className="text-sm text-yellow-100 opacity-90">Total Pandals</div>
                                            <div className="text-3xl font-bold text-white">{itinerary.length}</div>
                                        </div>
                                        <div className="h-8 w-px bg-white/20 hidden md:block"></div>
                                        <div className="text-center md:text-left">
                                            <div className="text-sm text-yellow-100 opacity-90">Walking Distance</div>
                                            <div className="text-3xl font-bold text-white">{itinerary.reduce((acc, curr) => acc + curr.distance, 0).toFixed(1)} <span className="text-base font-normal">km</span></div>
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
                                                className="bg-black/20 hover:bg-black/30 text-white border border-white/20 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                                            >
                                                <Download className="w-4 h-4" /> PDF
                                            </button>
                                        </div>
                                    </div>

                                    {/* List */}
                                    <div id="itinerary-container" className="pt-2">
                                        {itinerary.length === 0 ? (
                                            <div className="text-center py-10 text-white/60">
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
        </div>
    );
};

export default Planner;
