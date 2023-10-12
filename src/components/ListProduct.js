import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://hylophagous-halls.000webhostapp.com/php-api/product/list")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDelete = (productId) => {
    // Send a DELETE request to delete the product with the specified ID
    axios
      .delete(
        `https://hylophagous-halls.000webhostapp.com/php-api/product/${productId}/delete`
      )
      .then((response) => {
        console.log(response);
        fetchData();
      })

      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const isExpired = (expiryDate) => {
    // Check if the expiry date is in the past
    const today = new Date();
    const expDate = new Date(expiryDate);
    return today > expDate;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-300 to-indigo-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          List of Products
        </h1>
        <ul className=" flex flex-col">
          {products.map((product) => (
            <li
              key={product.rfid_num}
              className="border-b border-gray-300 py-2 flex justify-between items-center mx-auto"
            >
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-gray-600">RFID Number: {product.rfid_num}</p>
                <p className="text-gray-600">
                  Expiry Date: {product.expiry_date}
                </p>
                {isExpired(product.expiry_date) && (
                  <p className="text-red-600 font-bold">Expired</p>
                )}
                <p className=" space-x-5">
                  <Link
                    className="  text-sm bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                    to={`product/${product.rfid_num}/edit`}
                  >
                    Edit
                  </Link>
                  <button
                    className=" text-sm bg-transparent hover:bg-red-400 text-red-500 font-semibold hover:text-white py-1 px-2 border border-red-400 hover:border-transparent rounded"
                    onClick={() => handleDelete(product.rfid_num)}
                  >
                    Delete
                  </button>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListProduct;
