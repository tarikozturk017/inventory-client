import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://hylophagous-halls.000webhostapp.com/php-api/product/new",
        inputs
      )
      .then((res) => {
        console.log(res);
        navigate("/");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-300 to-indigo-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4">
          Create a New Product
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">
              RFID Number:
            </label>
            <input
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="rfidNumber"
              placeholder="Enter RFID number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Name:</label>
            <input
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="name"
              placeholder="Enter name"
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
              placeholder="Enter category"
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
              placeholder="(YYYY-MM-DD)"
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

export default CreateProduct;
