import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      alert("Inicio de sesión exitoso");
    } catch (err) {
      setError("Correo o contraseña incorrectos");
      console.log(err);
    }
  }

  return (
    <section className="bg-background text-brown-dark items-center text-center flex flex-col gap-9">
      <div className="md:w-1/2 bg-brown-pink text-white p-6 rounded-2xl">
        <h2 className="text-3xl font-bold mb-5">Iniciar Sesión</h2>

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

        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-3"
        >
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded "
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-brown-dark text-white px-4 py-2 rounded-lg hover:bg-brown"
          >
            Entrar
          </button>
        </form>

        {error && <p className="text-red-600 mt-3">{error}</p>}

        <p className="mt-5 border-t-1">¿No tienes cuenta?</p>
        <Link to="/register" className="text-blue-500 mt-5 block">
          Crear una Cuenta
        </Link>
      </div>
    </section>
  );
}

export default Login;
