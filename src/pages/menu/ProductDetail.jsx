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
import { doc, getDoc, deleteDoc } from "firebase/firestore";
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

    // Obtener username desde Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const username = userSnap.exists() ? userSnap.data().username : "Usuario";

    await addDoc(collection(db, "products", id, "comments"), {
      text,
      userId: user.uid,
      userName: username || "Usuario",
      date: new Date(),
    });


    setText("");
  }

  // eliminar comentarios

  async function handleDeleteComment(commentId) {
    if (!confirm("¿Eliminar este comentario?")) return;

    try {
      await deleteDoc(doc(db, "products", id, "comments", commentId));
    } catch (error) {
      console.error("Error eliminando comentario:", error);
      alert("No se pudo eliminar el comentario.");
    }
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

        <div className="flex flex-col md:flex-row gap-10">
          {canAddComment ? (
            <form
              onSubmit={handleCommentSubmit}
              className="flex flex-col gap-5 md:w-1/1"
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

          <div className="md:w-1/1 flex flex-col gap-7">
            {comments.length === 0 ? (
              <p className="text-gray-500 italic text-center">
                No hay comentarios aún. ¡Sé el primero en comentar!
              </p>
            ) : (
              comments.map((c) => {
                const date = c.date?.toDate
                  ? c.date.toDate()
                  : new Date(c.date);
                const canDeleteComment =
                  role === "admin" || c.userId === user?.uid;

                return (
                  <div
                    key={c.id}
                    className="p-6 bg-background rounded-4xl border-2 border-brown-dark outset-border"
                  >
                    <div className="flex justify-between">
                      <strong className="text-xl text-brown-dark mb-3">
                        {c.userName}
                      </strong>

                      <div className="flex items-center gap-3">
                        {/* FECHA */}
                        <span className="text-sm text-gray-500">
                          {date.toLocaleString()}
                        </span>

                        {canDeleteComment && (
                          <button
                            onClick={() => handleDeleteComment(c.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-semibold cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="size-6"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    <p>{c.text}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
