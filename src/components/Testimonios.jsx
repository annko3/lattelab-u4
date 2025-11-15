import React, { useEffect, useState } from "react";

const Testimonios = () => {
  const [testimonios, setTestimonios] = useState([]);

  useEffect(() => {
    // 1️⃣ Cargar los testimonios originales del JSON
    fetch("/data/testimonios.json")
      .then((res) => res.json())
      .then((data) => {
        // 2️⃣ Asignar 5 estrellas por defecto a TODOS los testimonios del JSON
        const dataConEstrellas = data.map((t) => ({
          ...t,
          estrellas: 5, // ⭐⭐⭐⭐⭐ fijo para que se vean parejitos
        }));

        // 3️⃣ Obtener los testimonios del localStorage (los nuevos que agregas)
        const guardados = localStorage.getItem("testimonios");
        const testimoniosLocales = guardados ? JSON.parse(guardados) : [];

        // 4️⃣ Unir ambos arrays
        const combinados = [...dataConEstrellas, ...testimoniosLocales];

        // 5️⃣ Guardar todo junto en el estado
        setTestimonios(combinados);
      })
      .catch((error) =>
        console.error("Error al cargar los testimonios:", error)
      );
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {testimonios.map((testimonio) => (
        <div
          key={testimonio.id || testimonio.nombre}
          className="bg-[#e7d6c4] rounded-2xl shadow-md p-6 w-80 text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red"
        >
          {testimonio.imagen && (
            <img
              src={testimonio.imagen}
              alt={testimonio.nombre}
              className="w-28 h-28 mx-auto rounded-full border-4 border-[#8b5e3c] object-cover mb-4 hover:scale-105 transition-transform duration-300"
            />
          )}

          <h3 className="font-bold text-[#5e3b2e] mb-2">
            {testimonio.nombre || "Cliente anónimo"}
          </h3>

          {/* ⭐ Estrellas con brillo */}
          <div className="flex justify-center mb-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`text-xl transition duration-300 ${
                  num <= (testimonio.estrellas || 0)
                    ? "text-yellow-400 hover:text-yellow-300"
                    : "text-gray-300 hover:text-yellow-200"
                }`}
                style={{
                  textShadow:
                    num <= (testimonio.estrellas || 0)
                      ? "0 0 6px rgba(255, 215, 0, 0.6)"
                      : "none",
                }}
              >
                ★
              </span>
            ))}
          </div>

          <p className="italic text-gray-700 mb-4">
            “{testimonio.mensaje || testimonio.texto}”
          </p>

          <p className="text-gray-500">{testimonio.rol || ""}</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonios;
