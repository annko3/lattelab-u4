// src/pages/login/Login.jsx
import { useState, useContext } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser({ email: res.user.email });
      navigate("/testimonios");
    } catch (err) {
      console.log(err);
      setError(err.message);
      
    }
  }

  async function handleGoogleLogin() {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser({ email: res.user.email });
      navigate("/testimonios");
    } catch (err) {

      console.log(err);
      setError("Error al iniciar sesión con Google");
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
      <div className="bg-brown-pink p-6 rounded-2xl text-white w-[350px]">
        <h2 className="text-3xl mb-4 font-bold text-center">Iniciar Sesión</h2>

        {/* Tarjeta de demo */}
        <div className="bg-white text-brown-dark p-4 rounded-xl shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-3 border-b pb-2">
            Credenciales de Demostración
          </h3>

          <div className="mb-3">
            <p className="font-bold">Administradora</p>
            <p className="text-sm">📧 admin@lattelab.org</p>
            <p className="text-sm">🔑 admin123</p>
          </div>

          <div>
            <p className="font-bold">Usuario</p>
            <p className="text-sm">📧 user@gmail.com</p>
            <p className="text-sm">🔑 user123</p>
          </div>
        </div>

        {/* Botón de Google */}
        <div className="flex flex-col gap-2 mb-4">
          <button
            onClick={handleGoogleLogin}
            className="bg-white text-brown-pink rounded px-4 py-2 hover:bg-gray-200"
          >
            Ingresar con Google
          </button>
        </div>

        {/* Formulario normal */}
        <form className="flex flex-col gap-3" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded text-black"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 rounded text-black"
            required
          />
          <button className="bg-brown-dark py-2 px-4 rounded hover:bg-brown">
            Entrar
          </button>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <p className="mt-4 text-center">¿No tienes cuenta?</p>
        <Link
          to="/register"
          className="text-blue-500 block text-center mt-1 hover:underline"
        >
          Crear una Cuenta
        </Link>
      </div>
    </section>
  );
}

export default Login;
