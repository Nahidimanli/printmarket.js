import { Link } from 'react-router-dom';

const Cart = () => {
    // Sepet verisi normalde global state veya API'den gelir, şimdilik statik bir kontrol yapıyoruz
    const cartItems: any[] = []; // Şimdilik boş varsayıyoruz

    return (
        <div className="container" style={{ marginTop: '40px', marginBottom: '60px' }}>
            <h1 className="section-title">Sepetim</h1>

            {cartItems.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                    {/* Cart Items */}
                    <div>
                        {cartItems.map((item, index) => (
                            <div
                                key={index}
                                style={{ display: 'flex', gap: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px', alignItems: 'center' }}
                            >
                                <div
                                    style={{ width: '80px', height: '80px', background: '#eee', borderRadius: '4px', backgroundImage: "url('https://picsum.photos/100/100')", backgroundSize: 'cover' }}
                                >
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{item.name}</h3>
                                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>{item.studio}</p>
                                    <div style={{ color: 'var(--primary-color)', fontWeight: 700 }}>{item.price} TL</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ marginBottom: '10px' }}>x {item.quantity}</div>
                                    <div style={{ fontWeight: 700 }}>{item.total_price} TL</div>
                                    <button
                                        style={{ fontSize: '12px', color: '#dc3545', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                                    >Kaldır</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div>
                        <div style={{ background: '#f8f9fa', padding: '24px', border: '1px solid #eee', borderRadius: '8px' }}>
                            <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Sipariş Özeti</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <span>Ara Toplam</span>
                                <span>0 TL</span>
                            </div>
                            <div
                                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontWeight: 600, fontSize: '18px' }}
                            >
                                <span>Toplam</span>
                                <span>0 TL</span>
                            </div>

                            <button className="btn btn-primary"
                                style={{ width: '100%', textAlign: 'center', display: 'block', padding: '12px', marginTop: '20px' }}>
                                Ödemeye Geç
                            </button>
                            <Link to="/products"
                                style={{ display: 'block', textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#666' }}>Alışverişe Devam Et</Link>
                        </div>
                    </div>
                </div >
            ) : (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <p style={{ fontSize: '20px', color: '#666', marginBottom: '20px' }}>Sepetiniz boş.</p>
                    <Link to="/products" className="btn btn-primary">Hizmetleri Keşfet</Link>
                </div>
            )}
        </div >
    );
};

export default Cart;
