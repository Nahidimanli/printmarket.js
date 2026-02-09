import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <h4>Bizi Tanıyın</h4>
                        <ul>
                            <li><Link to="#">Hakkımızda</Link></li>
                            <li><Link to="#">Kariyer</Link></li>
                            <li><Link to="#">Basın</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Yardım & Destek</h4>
                        <ul>
                            <li><Link to="#">Sipariş Takibi</Link></li>
                            <li><Link to="#">İade ve Değişim</Link></li>
                            <li><Link to="#">Sıkça Sorulan Sorular</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Ürünler</h4>
                        <ul>
                            <li><Link to="/products">Tüm Kategoriler</Link></li>
                            <li><Link to="#">Kampanyalar</Link></li>
                            <li><Link to="#">Yeni Ürünler</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Satıcılar İçin</h4>
                        <ul>
                            <li><Link to="/register?role=STUDIO">Satıcı Olun</Link></li>
                            <li><Link to="#">Satıcı Paneli</Link></li>
                            <li><Link to="#">Başarı Hikayeleri</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Baskı Pazarı. Tüm hakları saklıdır. | Gizlilik Politikası | Kullanım Koşulları</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
