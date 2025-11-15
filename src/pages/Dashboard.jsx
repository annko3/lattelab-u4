import { useState, useEffect } from "react";

export default function Dashboard() {
  const [testimonios, setTestimonios] = useState(() => {
    const guardados = localStorage.getItem("testimonios");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [nuevo, setNuevo] = useState({
    nombre: "",
    mensaje: "",
    imagen: "",
    estrellas: 0,
  });

  useEffect(() => {
    localStorage.setItem("testimonios", JSON.stringify(testimonios));
  }, [testimonios]);

  const agregar = () => {
    if (!nuevo.nombre.trim() || !nuevo.mensaje.trim()) return;
    setTestimonios([...testimonios, { id: Date.now(), ...nuevo }]);
    setNuevo({ nombre: "", mensaje: "", imagen: "", estrellas: 0 });
  };

  const eliminar = (id) => {
    setTestimonios(testimonios.filter((t) => t.id !== id));
  };

  const seleccionarEstrellas = (num) => {
    setNuevo({ ...nuevo, estrellas: num });
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f9f4ef",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#5e3b2e", marginBottom: "1.5rem" }}>
        Panel de Testimonios ☕
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
          maxWidth: "500px",
          margin: "0 auto 2rem",
          backgroundColor: "#e7d6c4",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Nombre"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          style={{
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          value={nuevo.imagen}
          onChange={(e) => setNuevo({ ...nuevo, imagen: e.target.value })}
          style={{
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          placeholder="Mensaje del testimonio"
          value={nuevo.mensaje}
          onChange={(e) => setNuevo({ ...nuevo, mensaje: e.target.value })}
          style={{
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "none",
          }}
        />

        {/* Estrellas */}
        <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => seleccionarEstrellas(num)}
              style={{
                fontSize: "1.8rem",
                cursor: "pointer",
                color: num <= nuevo.estrellas ? "#ffb400" : "#ccc",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <button
          onClick={agregar}
          style={{
            padding: "0.7rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#8b5e3c",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "0.5rem",
          }}
        >
          Agregar Testimonio
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1.5rem",
        }}
      >
        {testimonios.map((t) => (
          <div
            key={t.id}
            style={{
              backgroundColor: "#e7d6c4",
              borderRadius: "12px",
              padding: "1.5rem",
              width: "250px",
              textAlign: "center",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {t.imagen && (
              <img
                src={t.imagen}
                alt={t.nombre}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "0 auto 0.8rem",
                  border: "3px solid #8b5e3c",
                }}
              />
            )}
            <h3 style={{ fontWeight: "bold", color: "#5e3b2e" }}>{t.nombre}</h3>
            <p style={{ fontStyle: "italic", color: "#4b3a2a", margin: "0.5rem 0" }}>
              “{t.mensaje}”
            </p>
            <div>
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  style={{
                    color: num <= t.estrellas ? "#ffb400" : "#ccc",
                    fontSize: "1.3rem",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <button
              onClick={() => eliminar(t.id)}
              style={{
                marginTop: "0.8rem",
                padding: "0.4rem 0.8rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#b85c5c",
                color: "white",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}