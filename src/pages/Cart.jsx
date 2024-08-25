import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { changeAmount, removeAll, removeProduct } from "../app/userslice";

function Cart() {
  const { calculator } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [prices, setPrices] = useState(0);

  if (calculator.products.length <= 0) {
    return (
      <div className="m-auto flex justify-center items-center h-[500px] max-w-[1220px] bg-black">
        <div className="flex flex-col text-center justify-center items-center">
          <h1 className="font-semibold text-4xl text-white">
            Your cart is empty
          </h1>
          <Link to="/" className=" font-bold w-64 h-14 text-white rounded-lg">
            <button className="mt-10 transition ease-in-out delay-150 btn text-xl btn-md font-bold hover:bg-green-800 bg-green-600">
              ADD +
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-black text-white py-10">
        <div className="md:mx-48 mx-10">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-gray-800 shadow-lg rounded-lg text-white">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="py-3 px-6">Product</th>
                    <th className="py-3 px-6">Details</th>
                    <th className="py-3 px-6">Quantity</th>
                    <th className="py-3 px-6">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {calculator?.products?.map((product) => {
                    return (
                      <tr
                        key={product?.id}
                        className="border-b border-gray-700"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img src={product?.image} alt={product.title} />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-xl font-medium">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-400">
                            {product.price}.000 so'm
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              className="px-2 py-1 bg-blue-600 text-white rounded-full"
                              onClick={() =>
                                dispatch(
                                  changeAmount({
                                    id: product.id,
                                    type: "increase",
                                  })
                                )
                              }
                            >
                              +
                            </button>
                            <h1 className="px-2 py-1 bg-gray-700 text-white rounded-md">
                              {product.amount}
                            </h1>
                            <button
                              className="px-2 py-1 bg-blue-600 text-white rounded-full"
                              onClick={() =>
                                dispatch(
                                  changeAmount({
                                    id: product.id,
                                    type: "decrease",
                                  })
                                )
                              }
                              disabled={product.amount === 1}
                            >
                              -
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => dispatch(removeProduct(product.id))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrashAlt className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="md:w-96 w-full bg-gray-800 shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
              <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                <input
                  type="text"
                  className="bg-transparent outline-none text-white placeholder-gray-400"
                  placeholder="Enter promo code..."
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Apply
                </button>
              </div>
              <div className="mt-6 border-t border-gray-600 pt-4">
                <div className="flex justify-between">
                  <h4 className="text-lg font-medium">Items:</h4>
                  <span className="text-lg">{calculator.products.length}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <h4 className="text-lg font-medium">Subtotal:</h4>
                  <span className="text-lg">{calculator.price}.000 so'm</span>
                </div>
                <div className="flex justify-between mt-4 border-t border-gray-600 pt-4">
                  <h2 className="text-xl font-bold">Total:</h2>
                  <span className="text-xl font-bold">
                    {calculator.price}.000 so'm
                  </span>
                </div>
                <button
                  className="bg-yellow-600 text-black font-bold w-full py-3 rounded-lg mt-6 hover:bg-yellow-700 transition duration-300"
                  onClick={() => dispatch(removeAll())}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
