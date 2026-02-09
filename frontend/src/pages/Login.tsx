import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // Check if we have a token from Google OAuth callback
        const token = searchParams.get('token');
        console.log('🔍 Login page loaded, checking for token:', token ? 'Found' : 'Not found');

        if (token) {
            console.log('✅ Token found in URL, storing and fetching user data...');
            // Store the token in localStorage
            localStorage.setItem('access_token', token);

            // Fetch user data using the token
            fetch('http://localhost:3000/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log('📡 /users/me response status:', res.status);
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(userData => {
                    console.log('👤 User data received:', userData);
                    // Store user data
                    localStorage.setItem('user', JSON.stringify(userData));

                    // Dispatch custom event to notify Header component
                    window.dispatchEvent(new Event('userLoggedIn'));

                    console.log('🏠 Redirecting to home page...');
                    // Redirect to home page
                    navigate('/');
                })
                .catch(err => {
                    console.error('❌ Error fetching user data:', err);
                    // Even if user fetch fails, try to redirect to home with token
                    alert('Giriş yapıldı ancak kullanıcı bilgileri alınamadı. Lütfen sayfayı yenileyin.');
                    navigate('/');
                });
        }
    }, [searchParams, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            } else {
                alert('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-card">
                <h1>Baskı Pazarı</h1>
                <p className="login-subtitle">Hoş geldiniz! Lütfen giriş yapın.</p>

                <div className="social-login-group">
                    <a href="http://localhost:3000/auth/google" className="btn-social" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Color_Icon.svg" alt="Google" width="18" />
                        Google ile Giriş Yap
                    </a>
                    <button className="btn-social">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" width="18" />
                        Apple ile Giriş Yap
                    </button>
                </div>

                <div className="login-divider">veya</div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>E-posta veya Telefon</label>
                        <input type="text" id="username" name="username" className="form-control" placeholder="example@mail.com veya 05..." required />
                    </div>

                    <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Şifre</label>
                        <input type="password" id="password" name="password" className="form-control" placeholder="••••••••" required />
                        <Link to="#" className="forgot-password">Şifremi Unuttum?</Link>
                    </div>

                    <button type="submit" className="btn-login-main">Giriş Yap</button>
                </form>

                <div className="login-footer-links">
                    Henüz bir hesabın yok mu? <Link to="/register">Hemen Kaydol</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
