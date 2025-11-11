import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = [...data.beverages, ...data.desserts];
        const found = allProducts.find((item) => item.id === parseInt(id));
        setProduct(found);
      })
      .catch((error) => console.log("Error al cargar producto:", error));
  }, [id]);

  if (!product) {
    return <h2 className="text-center mt-10">Cargando producto...</h2>;
  }

  return (
    <section className="bg-background text-brown-dark items-center text-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-25 border-5 border-brown-dark outset-border rounded-2xl">

      <img
        src={product.image}
        alt={product.name}
        className="w-70 h-80 object-cover rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red"
      />
      <div className="max-w-md">
        <h1 className="text-3xl font-bold text-brown-dark mb-3">
          {product.name}
        </h1>
        <p className="mb-4 text-gray-600">{product.description}</p>
        <p className="text-lg font-semibold">Precio: S/. {product.price.toFixed(2)}</p>
        <button className="mt-5 bg-brown-dark text-white px-4 py-2 rounded-lg hover:bg-brown transition">
          Agregar al carrito
        </button>
      </div>
    </div>
    </section>
    
  );
}

export default ProductDetail;
