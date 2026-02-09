import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStudioById, getServices } from '../services/api';

const StudioDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [studio, setStudio] = useState<any>(null);
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudioData = async () => {
            if (!id) return;
            try {
                const [studioData, studioServices] = await Promise.all([
                    getStudioById(+id),
                    getServices(undefined, +id)
                ]);
                setStudio(studioData);
                setServices(studioServices);
            } catch (error) {
                console.error("Stüdyo detay hatası:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudioData();
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '40px' }}>Yükleniyor...</div>;
    if (!studio) return <div className="container" style={{ padding: '40px' }}>Stüdyo bulunamadı.</div>;

    return (
        <div style={{ minHeight: '80vh' }}>
            <div className="studio-header" style={{ marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px', paddingTop: '20px' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'start', gap: '30px' }}>
                        <div
                            style={{ width: '120px', height: '120px', background: '#eee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
                            🏢
                        </div>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>{studio.business_name}</h1>
                            <p style={{ color: '#666', marginBottom: '15px' }}>{studio.address || "Adres bilgisi girilmemiş."}</p>
                            <div style={{ marginBottom: '15px' }}>
                                <span style={{ color: '#f1c40f', fontWeight: 'bold' }}>⭐ 4.8</span>
                                <span style={{ color: '#999' }}> (124 Değerlendirme)</span>
                            </div>
                            <p>{studio.description || "Bu matbaa için henüz açıklama girilmemiş."}</p>
                        </div>
                        <div>
                            <button className="btn btn-outline">İletişime Geç</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <h2 className="section-title">Hizmetler</h2>
                <div className="grid-4" style={{ marginBottom: '60px' }}>
                    {services.length > 0 ? services.map((service, index) => (
                        <div key={service.id} className="card">
                            <div className="card-img"
                                style={{ backgroundImage: `url('https://picsum.photos/seed/${service.id}/400/300')` }}>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">{service.name}</h3>
                                <p className="card-subtitle" style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
                                    {(service.description || "").substring(0, 60)}...
                                </p>
                                <div className="card-price">{service.price} TL'den başlayan fiyatlarla</div>
                                <div style={{ marginTop: '5px', fontSize: '13px', color: '#666' }}>⏱️ {service.duration_minutes} dk. süre</div>
                                <Link to={`/products/${service.id}`} className="btn btn-primary"
                                    style={{ width: '100%', marginTop: '12px', display: 'block', textAlign: 'center', textDecoration: 'none' }}>Sipariş Ver</Link>
                            </div>
                        </div>
                    )) : (
                        <p>Bu matbaa henüz hizmet listelemiyor.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudioDetail;
