import { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config"; // <--- agregamos db
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { doc, setDoc } from "firebase/firestore"; // <--- para guardar en Firestore

function Register() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState(""); // nuevo input para nombre de usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      // Guardar en Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        role: "user",
        createdAt: new Date(),
      });

      setUser({ email: res.user.email, username: username });
      navigate("/dashboard");
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
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border px-3 py-2 rounded text-white"
            required
          />

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded text-white"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 rounded text-white"
            required
          />

          <button className="bg-brown-dark text-white px-4 py-2 rounded-lg cursor-pointer">
            Registrarse
          </button>
        </form>

        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </section>
  );
}

export default Register;