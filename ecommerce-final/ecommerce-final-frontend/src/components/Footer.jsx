import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-40">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        <div>
          <img src={assets.logo} className="w-32 mb-5" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            A curated edit of handmade jewelry, picked piece by piece for
            everyday wear, parties, and everything in between.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li><Link to="/" className="hover:text-black">Home</Link></li>
            <li><Link to="/about" className="hover:text-black">About us</Link></li>
            <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
            <li><Link to="/policy" className="hover:text-black">Returns & Exchanges</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+92-332-7263333</li>
            <li>areeshahameed26@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="pt-5 pb-2 text-xs text-center text-gray-500">
          Jewelry handcrafted by{" "}
          <a
            href="https://www.sanateseriatelier.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-700"
          >
            Sanat Eseri Atelier
          </a>
          , used with permission.
        </p>
        <p className="pb-5 text-sm text-center">
          Copyright {new Date().getFullYear()} Areesha & Co. — All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
