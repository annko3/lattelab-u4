import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("./data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = [...data.beverages, ...data.desserts];
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      })
      .catch((error) => console.log("Error al cargar los productos: ", error));
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  return (
    <>
      <div className="mb-5 flex justify-center">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-background border-2 border-brown-dark outset-border rounded-lg px-3 py-2 w-80"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white border-1 border-brown-dark outset-border w-60 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red rounded-2xl overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-cover rounded-t-lg"
              />

              <div className="flex flex-col p-2">
                <h3 className="font-bold text-2xl mb-2 text-brown-dark">
                  {product.name}
                </h3>
                <p>{product.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-red text-xl mt-5">No se encontraron productos.</p>
        )}
      </div>
    </>
  );
}

export default Products;
