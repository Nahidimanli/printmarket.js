import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MapComponent from '../components/Map/MapComponent';
import { getCategories, getServices, getStudios } from '../services/api';

const Home = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [studios, setStudios] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cats, prods, stds] = await Promise.all([
                    getCategories(),
                    getServices(),
                    getStudios()
                ]);
                setCategories(cats);
                setProducts(prods);
                setStudios(stds);
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getCategoryIcon = (name: string) => {
        if (name.includes("Kartvizit")) return "📇";
        if (name.includes("Poster")) return "🖼️";
        if (name.includes("Tekstil")) return "👕";
        if (name.includes("Etiket") || name.includes("Sticker")) return "🏷️";
        if (name.includes("Kutu") || name.includes("Ambalaj")) return "📦";
        if (name.includes("Tabela")) return "🏙️";
        if (name.includes("Broşür")) return "📄";
        if (name.includes("Promosyon")) return "🎁";
        if (name.includes("Hediye")) return "💝";
        if (name.includes("Logo")) return "🎨";
        return "📁";
    };

    return (
        <div style={{ minHeight: '60vh' }}>
            {/* 2️⃣ MAP & NEARBY STUDIOS SECTION */}
            <div className="container" style={{ marginTop: '20px' }}>
                <div className="map-studios-wrapper">
                    <div className="map-container" id="map">
                        <MapComponent />
                    </div>

                    <div className="nearby-studios-sidebar">
                        <div className="sidebar-header">
                            <h3>Yakınızdaki Matbaalar</h3>
                            <a href="#" id="find-near-btn" className="view-all-link">📍 Yakındakileri Bul</a>
                        </div>
                        <div className="studio-list-scroll">
                            {studios.length > 0 ? studios.map(studio => (
                                <div key={studio.id} className="studio-mini-card">
                                    <div className="studio-mini-info">
                                        <h4 className="studio-name">{studio.business_name}</h4>
                                        <div className="studio-meta">
                                            <span className="rating">⭐ 5.0 <span className="review-count">(24)</span></span>
                                        </div>
                                        <p className="studio-address">{studio.address || "Antalya"}</p>
                                    </div>
                                    <Link to={`/studios/${studio.id}`} className="btn-mini-go">Git</Link>
                                </div>
                            )) : (
                                <p style={{ color: '#888', padding: '10px' }}>Yakınınızda stüdyo bulunamadı.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3️⃣ “EXPLORE ALL CATEGORY” SECTION */}
            <section className="categories-section">
                <div className="container">
                    <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '10px' }}>Tüm Kategorileri Keşfet</h2>
                    <div className="category-scroll-container">
                        {categories.map((cat) => (
                            <Link key={cat.id} to={`/products?categoryId=${cat.id}`} className="category-circle">
                                <span style={{ fontSize: '24px' }}>{getCategoryIcon(cat.name)}</span>
                                <span>{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4️⃣ NEW ARRIVALS */}
            <section className="new-arrivals-section" style={{ padding: '40px 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px' }}>Yeni Eklenen Ürünler</h2>
                    <div className="grid-4">
                        {products.filter(p => !p.discount_price).slice(0, 8).map((product) => (
                            <div key={product.id} className="card" style={{ position: 'relative' }}>
                                <div className="card-heart">❤️</div>
                                <div className="card-img" style={{ backgroundImage: `url(${product.image || 'https://picsum.photos/seed/' + product.id + '/400/300'})` }}></div>
                                <div className="card-body">
                                    <h3 className="card-title">{product.name}</h3>
                                    <div className="card-price">{product.price} TL</div>
                                    <Link to={`/products/${product.id}`} style={{ position: 'absolute', inset: 0 }}></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5️⃣ DISCOUNTED PRODUCTS SECTION */}
            <section className="discount-section" style={{ padding: '40px 0', backgroundColor: '#fff0f0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px', color: '#d9534f' }}>🔥 İndirimli Ürünler</h2>
                    <div className="grid-4">
                        {products.filter(p => p.discount_price).slice(0, 4).map((product) => (
                            <div key={product.id} className="card" style={{ position: 'relative' }}>
                                <div className="card-img" style={{ backgroundImage: `url(${product.image || 'https://picsum.photos/seed/' + product.id + '/400/300'})` }}></div>
                                <div className="card-body">
                                    <h3 className="card-title">{product.name}</h3>
                                    <p className="card-text" style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{product.studio?.business_name}</p>
                                    <div className="card-price">
                                        <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '14px', marginRight: '5px' }}>{product.price} TL</span>
                                        <span style={{ fontSize: '20px', color: '#d9534f', fontWeight: 'bold' }}>{product.discount_price} TL</span>
                                    </div>
                                    <Link to={`/products/${product.id}`} style={{ position: 'absolute', inset: 0 }}></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
