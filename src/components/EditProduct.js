import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams(); // Extract the product ID from the URL
  const navigate = useNavigate();
  // const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch the product data based on the ID
    axios
      .get(`https://hylophagous-halls.000webhostapp.com/php-api/product/${id}`)
      .then((response) => {
        console.log(`response: ${JSON.stringify(response.data.data)}`);
        // setProduct(response.data.data); // Set the product data
        setFormData({
          rfidNumber: response.data.data.rfid_num,
          name: response.data.data.name,
          category: response.data.data.category,
          expDate: response.data.data.expiry_date,
        });
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        `https://hylophagous-halls.000webhostapp.com/php-api/product/${id}/edit`,
        formData
      ) // Send a PUT request with the updated data
      .then((res) => {
        console.log(res);
        navigate(`/`); // Redirect to the product details page
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-300 to-indigo-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4">Edit Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Name:</label>
            <input
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="name"
              value={formData.name}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">
              Category:
            </label>
            <input
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="category"
              value={formData.category}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">
              Expiry Date:
            </label>
            <input
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="expDate"
              value={formData.expDate}
            />
          </div>
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
