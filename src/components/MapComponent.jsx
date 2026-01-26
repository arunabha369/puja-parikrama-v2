import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper to update map view bounds
const ChangeView = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds && bounds.length > 0) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [bounds, map]);
    return null;
};

const MapComponent = ({ itinerary, startPointCoords }) => {
    const center = [22.5726, 88.3639]; // Default Kolkata center

    // Calculate bounds
    let markers = [];
    if (itinerary.length > 0) {
        if (startPointCoords) markers.push([startPointCoords.lat, startPointCoords.lon]);
        itinerary.forEach(p => markers.push([p.lat, p.lon]));
    }

    // Create custom numbered icons
    const createNumberedIcon = (number) => {
        return L.divIcon({
            className: 'custom-icon',
            html: `<div style="background-color: #D32F2F; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); font-size: 12px;">${number}</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
    };

    const startIcon = L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: #1a73e8; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); font-size: 10px;">S</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });

    return (
        <MapContainer center={center} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%', borderRadius: '1rem' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {startPointCoords && (
                <Marker position={[startPointCoords.lat, startPointCoords.lon]} icon={startIcon}>
                    <Popup>Starting Point</Popup>
                </Marker>
            )}

            {itinerary.map((pandal, index) => (
                <Marker
                    key={pandal.id}
                    position={[pandal.lat, pandal.lon]}
                    icon={createNumberedIcon(index + 1)}
                >
                    <Popup>
                        <div className="text-sm font-bold">{pandal.name}</div>
                        <div className="text-xs">{pandal.description}</div>
                    </Popup>
                </Marker>
            ))}

            {markers.length > 0 && <ChangeView bounds={markers} />}
        </MapContainer>
    );
};

export default MapComponent;
