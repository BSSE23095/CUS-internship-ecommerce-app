import { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { occasionCategories } from "../assets/assets";
import { API_URL } from "../config";

const PRODUCT_TYPES = ["Earrings", "Necklace", "Bangles", "Bundle"];

const AdminAddProduct = () => {
  const { adminToken, navigate } = useContext(ShopContext);
  const [images, setImages] = useState([null, null, null, null, null]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    type: PRODUCT_TYPES[0],
    category: occasionCategories[0],
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (index, file) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price) {
      alert("Please fill in all fields.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("type", formData.type);
    data.append("category", formData.category);
    images.forEach((file, idx) => {
      if (file) data.append(`image${idx + 1}`, file);
    });

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/product/add`, data, {
        headers: { token: adminToken },
      });

      if (response.data.success) {
        navigate("/admin/products");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="pt-10 max-w-2xl flex flex-col gap-4"
    >
      <p className="text-2xl mb-2">Add New Product</p>

      <div>
        <p className="text-sm mb-2">Images (up to 5)</p>
        <div className="flex gap-2 flex-wrap">
          {[0, 1, 2, 3, 4].map((idx) => (
            <label
              key={idx}
              className="w-20 h-20 border border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer text-xs text-gray-400 overflow-hidden"
            >
              {images[idx] ? (
                <img
                  src={URL.createObjectURL(images[idx])}
                  className="w-full h-full object-cover"
                  alt=""
                />
              ) : (
                "+ Add"
              )}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => onImageChange(idx, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      <input
        name="name"
        value={formData.name}
        onChange={onChangeHandler}
        placeholder="Product name"
        className="border border-gray-300 rounded py-2 px-3 text-sm"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={onChangeHandler}
        placeholder="Description"
        rows={4}
        className="border border-gray-300 rounded py-2 px-3 text-sm"
      />

      <div className="flex gap-3">
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={onChangeHandler}
          placeholder="Price"
          className="border border-gray-300 rounded py-2 px-3 text-sm w-full"
        />
        <select
          name="type"
          value={formData.type}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-2 px-3 text-sm w-full"
        >
          {PRODUCT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          name="category"
          value={formData.category}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-2 px-3 text-sm w-full"
        >
          {occasionCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <button
        disabled={loading}
        className="bg-black text-white text-sm px-8 py-3 w-fit hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "ADD PRODUCT"}
      </button>
    </form>
  );
};

export default AdminAddProduct;
