import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('🚪 Header: User logging out');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    useEffect(() => {
        // Function to load user from localStorage
        const loadUser = () => {
            const userData = localStorage.getItem('user');
            console.log('🔄 Header: Loading user from localStorage:', userData ? 'Found' : 'Not found');
            if (userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    console.log('👤 Header: User loaded:', parsedUser);
                    setUser(parsedUser);
                } catch (e) {
                    console.error('❌ Header: Error parsing user data:', e);
                    setUser(null);
                }
            } else {
                console.log('👤 Header: No user found, setting to null');
                setUser(null);
            }
        };

        // Load user on mount
        loadUser();

        // Listen for custom login event
        const handleUserLoggedIn = () => {
            console.log('🎉 Header: Received userLoggedIn event');
            loadUser();
        };

        // Listen for storage changes (for logout in other tabs)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'user' || e.key === null) {
                console.log('💾 Header: Storage changed, reloading user');
                loadUser();
            }
        };

        window.addEventListener('userLoggedIn', handleUserLoggedIn);
        window.addEventListener('storage', handleStorageChange);

        const handleClickOutside = (event: MouseEvent) => {
            const dropdown = document.getElementById('account-dropdown-content');
            const button = document.getElementById('account-dropdown-btn');
            if (dropdown && button && !dropdown.contains(event.target as Node) && !button.contains(event.target as Node)) {
                setShowAccountDropdown(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('userLoggedIn', handleUserLoggedIn);
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <header className="main-header">
            <div className="container is-flex-column">
                {/* Top Row: Logo, Search, Icons */}
                <div className="header-top">
                    {/* Top Left: Logo */}
                    <div className="header-logo">
                        <Link to="/" className="logo">Baskı Pazarı</Link>
                    </div>

                    {/* Center: Search */}
                    <div className="header-search">
                        <div className="search-bar-large">
                            <input type="text" placeholder="Ne arıyorsunuz?" />
                            <button className="search-btn">🔍</button>
                        </div>
                    </div>

                    {/* Right side icons / buttons */}
                    <div className="header-right">
                        <div className="dropdown">
                            <button
                                className="icon-btn-pill account-trigger"
                                id="account-dropdown-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowAccountDropdown(!showAccountDropdown);
                                }}
                            >
                                <span>👤 Hesabım</span>
                            </button>
                            <div className={`dropdown-content ${showAccountDropdown ? 'show' : ''}`} id="account-dropdown-content">
                                <div className="dropdown-header">
                                    <strong>Merhaba, {user ? user.username : 'Misafir'}</strong>
                                </div>
                                <hr className="dropdown-divider" />
                                <Link to="/orders" className="dropdown-item">📦 Siparişlerim</Link>
                                <Link to="/orders/new" className="dropdown-item">✨ Yeni Sipariş Ver</Link>
                                <hr className="dropdown-divider" />
                                {user ? (
                                    <button onClick={handleLogout} className="dropdown-item text-danger" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>🚪 Çıkış Yap</button>
                                ) : (
                                    <Link to="/login" className="dropdown-item text-danger">🚪 Giriş Yap</Link>
                                )}
                            </div>
                        </div>

                        <Link to="#" className="icon-btn-pill">
                            <span>❤️ Favorilerim</span>
                        </Link>

                        <Link to="/cart" className="icon-btn-pill relative">
                            <span>🛒 Sepetim</span>
                            <span className="badge">0</span>
                        </Link>
                    </div>
                </div>

                {/* Bottom Row: Categories */}
                <nav className="category-shortcut-links full-width">
                    <div className="category-dropdown-wrapper">
                        <Link to="/products?category=kartvizit-and-kurumsal">Kartvizit & Kurumsal</Link>
                        <div className="category-hover-menu">
                            <Link to="/products?category=kartvizit" className="category-hover-item">Kartvizit</Link>
                            <Link to="/products?category=antetli-kagit" className="category-hover-item">Antetli Kağıt</Link>
                            <Link to="/products?category=zarf" className="category-hover-item">Zarf</Link>
                            <Link to="/products?category=kase" className="category-hover-item">Kaşe</Link>
                        </div>
                    </div>

                    <div className="category-dropdown-wrapper">
                        <Link to="/products?category=brosur-and-reklam">Broşür & Reklam</Link>
                        <div className="category-hover-menu">
                            <Link to="/products?category=el-ilani-flyer" className="category-hover-item">El İlanı (Flyer)</Link>
                            <Link to="/products?category=brosur" className="category-hover-item">Broşür</Link>
                            <Link to="/products?category=menu" className="category-hover-item">Menü</Link>
                        </div>
                    </div>

                    <div className="category-dropdown-wrapper">
                        <Link to="/products?category=tabela-and-afis">Tabela & Afiş</Link>
                        <div className="category-hover-menu">
                            <Link to="/products?category=poster" className="category-hover-item">Poster</Link>
                            <Link to="/products?category=afis" className="category-hover-item">Afiş</Link>
                            <Link to="/products?category=roll-up" className="category-hover-item">Roll-up</Link>
                        </div>
                    </div>

                    <div className="category-dropdown-wrapper">
                        <Link to="/products?category=sticker-and-etiket">Sticker & Etiket</Link>
                        <div className="category-hover-menu">
                            <Link to="/products?category=sticker" className="category-hover-item">Sticker</Link>
                            <Link to="/products?category=urun-etiketi" className="category-hover-item">Ürün Etiketi</Link>
                        </div>
                    </div>

                    <div className="category-dropdown-wrapper">
                        <Link to="/products?category=tekstil-and-canta">Tekstil & Çanta</Link>
                        <div className="category-hover-menu">
                            <Link to="/products?category=t-shirt" className="category-hover-item">T-shirt</Link>
                            <Link to="/products?category=bez-canta" className="category-hover-item">Bez Çanta</Link>
                        </div>
                    </div>

                    <div className="category-dropdown-wrapper">
                        <Link to="/products?category=promosyon">Promosyon</Link>
                        <div className="category-hover-menu">
                            <Link to="/products?category=kupa" className="category-hover-item">Kupa</Link>
                            <Link to="/products?category=kalem" className="category-hover-item">Kalem</Link>
                        </div>
                    </div>

                    <div className="category-dropdown-wrapper">
                        <Link to="/products?category=ambalaj">Ambalaj</Link>
                        <div className="category-hover-menu">
                            <Link to="/products?category=urun-kutusu" className="category-hover-item">Ürün Kutusu</Link>
                        </div>
                    </div>

                    <div className="category-dropdown-wrapper">
                        <Link to="/products?category=davetiye-and-hediye">Davetiye & Hediye</Link>
                    </div>

                    <div className="category-dropdown-wrapper">
                        <Link to="/products?category=logo-and-tasarim">Logo & Tasarım</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};
