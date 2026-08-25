import { Link } from "react-router-dom";

const CATEGORY_BLURBS = {
  Everyday: "Light, easy pieces for daily wear",
  Party: "Statement pieces that catch the light",
  Bridal: "Heavier, ornate sets for the big day",
  Eid: "Festive picks for the season",
};

const CategoryTile = ({ name, previewImage, count }) => {
  return (
    <Link
      to={`/category/${name.toLowerCase()}`}
      className="group relative block overflow-hidden rounded-lg aspect-[4/5] bg-gray-100"
    >
      {previewImage && (
        <img
          src={previewImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="text-2xl font-medium tracking-wide">{name}</h3>
        <p className="text-sm text-white/80 mt-1">{CATEGORY_BLURBS[name]}</p>
        <p className="text-xs text-white/60 mt-2">{count} pieces</p>
      </div>
    </Link>
  );
};

export default CategoryTile;
