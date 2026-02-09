import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { getStudios } from '../../services/api';

// Leaflet ikon hatasını düzeltmek için
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
    const [studios, setStudios] = useState<any[]>([]);
    const defaultCenter: [number, number] = [36.8841, 30.7056]; // Antalya Center

    useEffect(() => {
        getStudios().then(data => setStudios(data)).catch(err => console.error("Stüdyo çekme hatası:", err));
    }, []);

    return (
        <MapContainer center={defaultCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {studios.map(studio => (
                <Marker key={studio.id} position={[studio.latitude || 36.88, studio.longitude || 30.70]}>
                    <Popup>
                        <strong>{studio.name}</strong><br />
                        {studio.address}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
