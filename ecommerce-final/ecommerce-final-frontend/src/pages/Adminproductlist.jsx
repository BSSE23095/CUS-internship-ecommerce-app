import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { occasionCategories } from "../assets/assets";
import { API_URL } from "../config";

const PRODUCT_TYPES = ["Earrings", "Necklace", "Bangles", "Bundle"];

const AdminProductList = () => {
  const { adminToken, currency } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const response = await axios.post(
        `${API_URL}/api/product/remove`,
        { _id: id },
        { headers: { token: adminToken } },
      );
      if (response.data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete product.");
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditData({
      name: product.name,
      description: product.description,
      price: product.price,
      type: product.type,
      category: product.category,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const onEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/product/update`,
        { _id: id, ...editData },
        { headers: { token: adminToken } },
      );
      if (response.data.success) {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === id
              ? { ...p, ...editData, price: Number(editData.price) }
              : p,
          ),
        );
        cancelEdit();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pt-10">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl">Manage Products ({products.length})</p>
        <Link
          to="/admin/add"
          className="bg-black text-white text-sm px-5 py-2 hover:bg-gray-800 transition"
        >
          + Add Product
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {products.map((p) => (
            <div key={p._id} className="border-b py-3 px-3">
              {editingId === p._id ? (
                <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded">
                  <input
                    name="name"
                    value={editData.name}
                    onChange={onEditChange}
                    className="border border-gray-300 rounded py-2 px-3 text-sm"
                    placeholder="Name"
                  />
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={onEditChange}
                    rows={3}
                    className="border border-gray-300 rounded py-2 px-3 text-sm"
                    placeholder="Description"
                  />
                  <div className="flex gap-2">
                    <input
                      name="price"
                      type="number"
                      value={editData.price}
                      onChange={onEditChange}
                      className="border border-gray-300 rounded py-2 px-3 text-sm w-full"
                      placeholder="Price"
                    />
                    <select
                      name="type"
                      value={editData.type}
                      onChange={onEditChange}
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
                      value={editData.category}
                      onChange={onEditChange}
                      className="border border-gray-300 rounded py-2 px-3 text-sm w-full"
                    >
                      {occasionCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => saveEdit(p._id)}
                      className="bg-black text-white text-sm px-4 py-2 hover:bg-gray-800"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="border border-gray-300 text-sm px-4 py-2 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-[1fr_3fr_1fr_1fr_auto] items-center gap-2 text-sm">
                  <img
                    src={p.images?.[0]}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <p className="line-clamp-1">{p.name}</p>
                  <p>{p.type}</p>
                  <p>
                    {currency}
                    {p.price}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(p)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeProduct(p._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProductList;
