import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getServices, getCategories } from '../services/api';

const ProductList = () => {
    const [searchParams] = useSearchParams();
    const categoryIdParam = searchParams.get('categoryId');
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [prods, cats] = await Promise.all([
                    getServices(categoryIdParam ? +categoryIdParam : undefined),
                    getCategories()
                ]);
                setProducts(prods);
                setCategories(cats);
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [categoryIdParam]);

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>

                {/* Sidebar Filters */}
                <aside>
                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Filtrele</h3>

                        <form>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Arama</label>
                                <input type="text" placeholder="Ürün ara..."
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Kategoriler</label>
                                <ul style={{ listStyle: 'none' }}>
                                    {categories.map((category) => (
                                        <li key={category.id} style={{ marginBottom: '5px' }}>
                                            <Link
                                                to={`/products?categoryId=${category.id}`}
                                                style={+categoryIdParam! === category.id ? { fontWeight: 'bold', color: 'var(--primary-color)' } : {}}
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Fiyat Aralığı</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input type="number" placeholder="Min"
                                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                                    <input type="number" placeholder="Max"
                                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Filtrele</button>
                            <Link to="/products"
                                style={{ display: 'block', textAlign: 'center', marginTop: '10px', fontSize: '13px' }}>Temizle</Link>
                        </form>
                    </div>
                </aside>

                {/* Product Grid */}
                <main>
                    <h1 className="section-title" style={{ marginTop: 0 }}>Tüm Hizmetler</h1>
                    <p style={{ marginBottom: '20px', color: '#666' }}>{products.length} sonuç bulundu.</p>

                    <div className="grid-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                        {loading ? (
                            <p>Yükleniyor...</p>
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="card">
                                    <div className="card-img"
                                        style={{ backgroundImage: `url(${product.image || 'https://picsum.photos/seed/' + product.id + '/400/300'})` }}>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">{product.name}</h3>
                                        <div className="card-subtitle">{product.studio?.business_name || "Baskı Merkezi"}</div>
                                        <div className="card-price">{product.price} TL</div>
                                        <Link to={`/products/${product.id}`} className="btn btn-outline"
                                            style={{ width: '100%', marginTop: '10px', textAlign: 'center' }}>Detaylar</Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Aradığınız kriterlere uygun hizmet bulunamadı.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductList;
