import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase/config";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // PRODUCTO
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = [...data.beverages, ...data.desserts];
        const found = allProducts.find((item) => item.id === parseInt(id));
        setProduct(found);
      });
  }, [id]);

  // AUTENCTIFICACION
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setRole(snap.data().role);
        } else {
          setRole("user");
        }
      } else {
        setUser(null);
        setRole("guest");
      }
    });

    return () => unsub();
  }, []);

  // COMENTARIOS
  useEffect(() => {
    const q = query(
      collection(db, "products", id, "comments"),
      orderBy("date", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(arr);
    });

    return () => unsub();
  }, [id]);

  if (!product) {
    return <h2>Cargando producto...</h2>;
  }

  const canAddComment = role === "admin" || role === "user";


  //si el comentario esta vacio
  async function handleCommentSubmit(e) {
    e.preventDefault();

    if (!user) return;

    if (!text.trim()) {
      alert("El comentario no puede estar vacío."); 
      return;
    }

    await addDoc(collection(db, "products", id, "comments"), {
      text,
      userId: user.uid,
      userName: user.displayName || "Usuario",
      date: new Date(),
    });

    setText("");
  }

  return (
    <>
      <section className="bg-background text-brown-dark items-center text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-25 border-5 border-brown-dark outset-border rounded-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-70 h-80 object-cover rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red"
          />
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-brown-dark mb-3">
              {product.name}
            </h1>
            <p className="mb-4 text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold">
              Precio: S/. {product.price.toFixed(2)}
            </p>
            <button className="mt-5 bg-brown-dark text-white px-4 py-2 rounded-lg hover:bg-brown-medium transition cursor-pointer">
              Agregar al carrito
            </button>
          </div>
        </div>
      </section>

      <section className="bg-background-alt text-brown-dark items-center">
        <h2 className="text-3xl font-bold text-brown-dark mb-3">Reseñas</h2>

        {canAddComment ? (
          <form
            onSubmit={handleCommentSubmit}
            className="flex flex-col gap-5 p-6"
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe tu comentario..."
              className="bg-[#f7f6f6] w-full p-6 rounded-4xl border-black border-1"
            />

            <button
              type="submit"
              className="bg-[#824c2a] text-white p-[12px] font-bold rounded-xl hover:bg-brown-dark cursor-pointer"
            >
              Enviar
            </button>
          </form>
        ) : (
          <p>Debes iniciar sesión para comentar.</p>
        )}

        {comments.map((c) => {
          const date = c.date?.toDate ? c.date.toDate() : new Date(c.date);

          return (
            <div
              key={c.id}
              className="m-5 p-6 bg-background rounded-4xl border-2 border-brown-dark outset-border"
            >
              <div className="flex justify-between">
                <strong>{c.userName}</strong>
                {/* FECHA */}
                <span className="text-sm text-gray-500">
                  {date.toLocaleString()}
                </span>
              </div>

              <p>{c.text}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default ProductDetail;
