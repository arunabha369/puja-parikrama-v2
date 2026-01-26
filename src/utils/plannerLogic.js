
import pandalDataRaw from './data.json';

// Constants
const KOLKATA_DIVIDING_LATITUDE = 22.56;
const PANDAL_VISIT_DURATION_MINS = 20;
const AVG_WALKING_SPEED_KMPH = 4.5;

// Preprocess data once
export const PANDAL_DATA = pandalDataRaw.corePandals.map(p => ({
    ...p,
    id: `${p.lat}-${p.lon}`,
    area: p.lat < KOLKATA_DIVIDING_LATITUDE ? 'South' : 'North'
}));

export const STARTING_POINTS = pandalDataRaw.startingPoints;

/**
 * Calculates distance between two coordinates in km
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Generates a sorted list of pandals based on nearest neighbor algorithm
 * @param {string} startPointKey - Key from STARTING_POINTS
 * @param {string} selectedArea - 'North', 'South', or 'All'
 */
export function generateSortedList(startPointKey, selectedArea) {
    // Filter pandals
    const filteredPandals = (selectedArea === 'All') 
        ? PANDAL_DATA 
        : PANDAL_DATA.filter(p => p.area === selectedArea);

    let remainingPandals = [...filteredPandals];
    let sortedPandals = [];
    let currentPoint = STARTING_POINTS[startPointKey];

    if (!currentPoint) {
        console.error("Invalid start point key:", startPointKey);
        return [];
    }

    while (remainingPandals.length > 0) {
        // Sort remaining by distance to current point
        remainingPandals.sort((a, b) => 
            calculateDistance(currentPoint.lat, currentPoint.lon, a.lat, a.lon) - 
            calculateDistance(currentPoint.lat, currentPoint.lon, b.lat, b.lon)
        );

        const nextPandal = remainingPandals.shift();
        sortedPandals.push(nextPandal);
        currentPoint = nextPandal;
    }
    return sortedPandals;
}

/**
 * Applies timing constraints to the sorted list
 * @param {Array} pandalList - Result from generateSortedList
 * @param {string} startTimeStr - "HH:MM" format
 * @param {string} endTimeStr - "HH:MM" format
 * @param {string} startPointKey - Key from STARTING_POINTS to calculate first leg
 */
export function applyTimings(pandalList, startTimeStr, endTimeStr, startPointKey) {
    // Parse times
    const [startHour, startMinute] = startTimeStr.split(':').map(Number);
    const [endHour, endMinute] = endTimeStr.split(':').map(Number);
    
    let currentTime = new Date();
    currentTime.setHours(startHour, startMinute, 0, 0);
    
    let endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);
    
    // Handle overnight (if end time is earlier than start time, assume next day)
    if (endTime <= currentTime) {
        endTime.setDate(endTime.getDate() + 1);
    }

    let lastCoords = STARTING_POINTS[startPointKey];
    const finalItinerary = [];

    for (const pandal of pandalList) {
        const distanceBetween = calculateDistance(lastCoords.lat, lastCoords.lon, pandal.lat, pandal.lon);
        const travelMinutes = Math.round((distanceBetween / AVG_WALKING_SPEED_KMPH) * 60);
        
        // Proposed arrival
        let proposedArrivalTime = new Date(currentTime);
        proposedArrivalTime.setMinutes(currentTime.getMinutes() + travelMinutes);
        
        // Proposed departure
        let proposedDepartureTime = new Date(proposedArrivalTime);
        proposedDepartureTime.setMinutes(proposedArrivalTime.getMinutes() + PANDAL_VISIT_DURATION_MINS);

        if (proposedDepartureTime <= endTime) {
            // Accept this pandal
            currentTime = new Date(proposedDepartureTime);
            lastCoords = { lat: pandal.lat, lon: pandal.lon };
            
            finalItinerary.push({
                ...pandal,
                arrivalTime: new Date(proposedArrivalTime), // Clone to avoid ref issues
                departureTime: new Date(proposedDepartureTime),
                travelMinutes,
                distance: distanceBetween
            });
        } else {
            // Stop if we exceed time
            break;
        }
    }
    return finalItinerary;
}

export function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function generateGoogleMapsUrl(itinerary, startPointKey) {
    if (!itinerary || itinerary.length === 0) return "#";
    
    const startCoords = STARTING_POINTS[startPointKey];
    const origin = `${startCoords.lat},${startCoords.lon}`;
    const destination = `${itinerary[itinerary.length - 1].lat},${itinerary[itinerary.length - 1].lon}`;
    
    // Google Maps supports a max of 9 waypoints for walking directions via URL properly
    const waypoints = itinerary.slice(0, -1).slice(0, 9).map(p => `${p.lat},${p.lon}`).join('|');

    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    if (waypoints) {
        url += `&waypoints=${waypoints}`;
    }
    url += `&travelmode=walking`;
    return url;
}
