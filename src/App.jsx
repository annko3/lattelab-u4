import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import ProductDetail from './pages/menu/ProductDetail';
import Contact from './pages/contact/Contact.jsx';
import AboutUs from "./pages/aboutUs/AboutUs.jsx";
import Login from './pages/login/Login.jsx';
import Register from './pages/login/Register.jsx';
import Books from './pages/books/Books.jsx';
import Talleres from "./pages/talleres/Talleres.jsx";
import Dashboard from './pages/Dashboard.jsx';
import Header from './components/common/header/Header.jsx';
import Footer from './components/common/footer/Footer.jsx';
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/books" element={<Books />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/talleres" element={<Talleres />} />

            {/* LOGIN & REGISTER */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PROTEGIDO */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App;