import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; // React Router uchun
import {
  FaDollarSign,
  FaTag,
  FaCartPlus,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../app/userslice";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [productAmount, setProductAmount] = useState(1);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  const setAmount = (type) => {
    if (type == "decrease" && productAmount > 1) {
      setProductAmount((prev) => prev - 1);
    } else if (type == "increase") {
      setProductAmount((prev) => prev + 1);
    }
  };
  const addToBag = () => {
    const newProdact = {
      ...product,
      amount: productAmount,
    };

    dispatch(addProduct(newProdact));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      {product && (
        <div className="max-w-4xl  mx-auto h-auto bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300 flex flex-col lg:flex-row">
          <div className="relative lg:w-1/2">
            <img
              className="w-full h-96 object-cover rounded-t-lg lg:rounded-l-lg"
              src={product.image}
              alt={product.title}
            />
            <span className="absolute top-4 left-4 bg-red-500  text-white text-sm font-bold px-2 py-1 rounded-lg shadow-lg">
              New
            </span>
          </div>
          <div className="p-6 lg:w-1/2 flex flex-col justify-between relative">
            <div>
              <h2 className="text-4xl font-extrabold mb-4 text-gray-800">
                {product.title}
              </h2>
              <p className="text-gray-700 text-base mb-4 leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-6">
                <p className="text-3xl font-bold block text-gray-800">
                  <FaDollarSign className="inline text-yellow-600  mr-2" />
                  {product.price}
                  <span className="block mt-2"> ⭐️⭐️⭐️⭐️⭐️</span>
                </p>
                <p className="text-black ">
                  Category:
                <span className="font-bold text-purple-600 flex ">
                {product.category}
                </span>
                </p>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={() => setAmount("decrease")}
                  disabled={productAmount == 1 ? true : false}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <FaMinus />
                </button>
                <span className="text-lg text-gray-800">{productAmount}</span>
                {/* Placeholder for quantity */}
                <button
                  onClick={() => setAmount("increase")}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <button  onClick={addToBag} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center">
              <FaCartPlus className="inline mr-2" /> Add to Cart
            </button>
          </div>
        </div>
      )}
      <Link
                  to="/"
                  className="inline-flex btn-primary btn font-bold text-white rounded-lg text-sm px-5 py-2.5 text-center my-4"
                >
                  Home
                </Link>
    </div>
  );
}

export default SingleProduct;
