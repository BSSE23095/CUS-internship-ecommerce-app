import { useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
    // No backend route for this yet — just confirm locally.
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="" />

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 w-full md:w-[400px]">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3 text-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3 text-sm"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            value={formData.message}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-2 px-3 text-sm"
          />
          <button
            type="submit"
            className="bg-black text-white text-sm px-8 py-3 hover:bg-gray-800 transition"
          >
            SEND MESSAGE
          </button>
          {submitted && (
            <p className="text-green-600 text-sm">
              Message sent. We'll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
