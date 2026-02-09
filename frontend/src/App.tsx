import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import ServiceDetail from './pages/ServiceDetail';
import StudioDetail from './pages/StudioDetail';

function App() {
    return (
        <Router>
            <div className="app-wrapper">
                <Header />

                {/* Main section handles its own internal containers for spacing consistency with Django */}
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/products/:id" element={<ServiceDetail />} />
                        <Route path="/studios/:id" element={<StudioDetail />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
