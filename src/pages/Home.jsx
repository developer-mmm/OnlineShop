import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    category: "",
    price: "all",
  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initial filtered products
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filter, products]);

  const filterProducts = () => {
    let filtered = products;

    if (filter.category) {
      filtered = filtered.filter(
        (product) => product.category === filter.category
      );
    }

    if (filter.price !== "all") {
      const priceRange = filter.price === "low" ? [0, 50] : [51, 100];
      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (e) => {
    setFilter({ ...filter, category: e.target.value });
  };

  const handlePriceChange = (e) => {
    setFilter({ ...filter, price: e.target.value });
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between mt-12 mb-8 gap-4">
          <div className="flex items-center gap-4  ">
            <label
              htmlFor="category"
              className="text-lg font-bold text-purple-800"
            >
              Category:
            </label>
            <select
              id="category"
              value={filter.category}
              onChange={handleCategoryChange}
              className="p-3 bg-white text-gray-800 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-200 ease-in-out hover:bg-blue-50 border border-gray-300"
            >
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="price" className="text-lg font-bold text-green-600">
              Price:
            </label>
            <select
              id="price"
              value={filter.price}
              onChange={handlePriceChange}
              className="p-3 bg-white text-gray-800 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-green-500 transition-all duration-200 ease-in-out hover:bg-green-50 border border-gray-300"
            >
              <option value="all">All</option>
              <option value="low">Under $50</option>
              <option value="high">$50 and above</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div className="relative max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-transform transform hover:scale-x-90 h-full duration-300 ease-in-out">
              <img
                className="w-full h-48 object-cover filter hover:brightness-110 transition duration-200"
                src={product.image}
                alt={product.title}
              />
              <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
                <p className="text-gray-700 text-base truncate ">
                  {product.description}
                </p>
              </div>
              <div className="px-6 py-4 border-t border-gray-200">
                <span className="block font-semibold text-gray-800">
                  Price:
                  <span className="text-green-500 ml-2">${product.price}</span>
                </span>
                <span className="block text-sm text-black font-bold">
                  Category:
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-white ${
                      product.category === "electronics"
                        ? "bg-gradient-to-r from-blue-500 to-blue-700"
                        : product.category === "jewelery"
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-700"
                        : product.category === "men's clothing"
                        ? "bg-gradient-to-r from-red-500 to-red-700"
                        : "bg-gradient-to-r from-pink-500 to-pink-700"
                    }`}
                  >
                    {product.category}
                  </span>
                </span>
              </div>
              <div className="absolute top-0 right-0 m-2 flex items-center">
                <div className="p-1 rounded-full bg-yellow-500 text-white text-xs font-bold mr-2">
                  New
                </div>
                <div className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white transition-all duration-200 ease-in-out cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 12h8m-8 4h16"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-blue-500">
                {" "}
                <Link
                  key={product.id}
                  to={`/SingleProduct/${product.id}`}
                  className="block text-center font-bold text-xl text-blue-800"
                >
                  Read More{" "}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
