import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="login-page-wrapper">
            <div className="login-card">
                <h1>Kayıt Ol</h1>
                <p className="login-subtitle">Aramıza katılın!</p>

                <form>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Kullanıcı Adı</label>
                        <input type="text" id="username" name="username" className="form-control" placeholder="Kullanıcı adınız" required />
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>E-posta</label>
                        <input type="email" id="email" name="email" className="form-control" placeholder="example@mail.com" required />
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Şifre</label>
                        <input type="password" id="password" name="password" className="form-control" placeholder="••••••••" required />
                    </div>

                    <button type="submit" className="btn-login-main">Kayıt Ol</button>
                </form>

                <div className="login-footer-links" style={{ marginTop: '25px', textAlign: 'center', fontSize: '13px', color: '#666' }}>
                    Zaten hesabın var mı? <Link to="/login" style={{ color: '#0076D7', fontWeight: 700 }}>Giriş Yap</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
