import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceById } from '../services/api';

const ServiceDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            if (!id) return;
            try {
                const data = await getServiceById(+id);
                setService(data);
            } catch (error) {
                console.error("Servis detay hatası:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '40px' }}>Yükleniyor...</div>;
    if (!service) return <div className="container" style={{ padding: '40px' }}>Ürün bulunamadı.</div>;

    return (
        <div className="container" style={{ marginTop: '40px', marginBottom: '60px' }}>
            <div className="product-detail-hero">
                {/* Left: Image */}
                <div className="product-image-container">
                    <img src={service.image || "https://picsum.photos/800/600"}
                        alt={service.name} style={{ width: '100%', borderRadius: '16px' }} />
                </div>

                {/* Right: Details */}
                <div className="product-info-box">
                    <h1>{service.name}</h1>
                    <div style={{ marginBottom: '20px' }}>
                        <Link to={`/studios/${service.studio?.id}`}
                            style={{ textDecoration: 'underline', color: '#666', fontWeight: 500 }}>
                            {service.studio?.business_name || "Baskı Merkezi"}
                        </Link>
                    </div>

                    <p style={{ lineHeight: '1.6', color: '#444', marginBottom: '20px', fontSize: '16px' }}>
                        {service.description || "Profesyonel kalitede baskı hizmeti. Dosyanızı yükleyin ve en yakın stüdyodan teslim alın."}
                    </p>

                    <div className="features-list">
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '10px' }}>✅ <strong>Ölçü:</strong> Standart</li>
                            <li style={{ marginBottom: '10px' }}>✅ <strong>Renk:</strong> Full Renkli / Siyah Beyaz</li>
                            <li style={{ marginBottom: '10px' }}>✅ <strong>Adet:</strong> İstediğiniz miktarda</li>
                            <li style={{ marginBottom: '10px' }}>✅ <strong>Tahmini Süre:</strong> {service.duration_minutes} Dakika</li>
                        </ul>
                    </div>

                    <div className="product-price-tag" style={{ margin: '25px 0' }}>
                        <span style={{ fontSize: '14px', color: '#666', fontWeight: 'normal', display: 'block' }}>Başlangıç Fiyatı</span>
                        <span style={{ fontSize: '32px', fontWeight: 800 }}>{service.price} TL</span>
                    </div>

                    <Link to={`/order/step-1?serviceId=${service.id}`} className="btn btn-primary"
                        style={{ width: '100%', padding: '18px', fontSize: '20px', textDecoration: 'none', display: 'block', background: '#28a745', borderRadius: '12px', color: 'white', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
                        🟢 Sipariş Ver
                    </Link>

                    <p style={{ marginTop: '15px', fontSize: '14px', color: '#888', textAlign: 'center' }}>
                        Siparişi başlattığınızda dosya yükleme ve stüdyo seçimi adımlarına geçeceksiniz.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
