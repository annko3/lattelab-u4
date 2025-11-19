import { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function Register() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser({ email: res.user.email });
      navigate("/testimonios");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  return (
    <section className="bg-background text-center flex flex-col items-center p-10">
      <div className="bg-brown-pink text-white p-6 rounded-2xl md:w-1/2">
        <h2 className="text-3xl font-bold mb-5">Crear Cuenta</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded text-black"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 rounded text-black"
            required
          />

          <button className="bg-brown-dark text-white px-4 py-2 rounded-lg hover:bg-brown">
            Registrarse
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
