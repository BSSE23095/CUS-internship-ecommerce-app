import { assets } from "../assets/assets";
import Title from "../components/Title";
 
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>
 
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[420px] rounded-lg shadow-sm object-cover md:h-[500px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Areesha & Co. started with a pair of earrings I couldn't stop
            looking at. Handmade, a little imperfect in the best way, the
            kind of piece where you can tell someone actually sat down and
            made it, not a factory somewhere. That's the whole reason this
            store exists: I wanted a place to put together the pieces I'd
            genuinely wear myself, not a generic catalog of whatever's
            trending.
          </p>
          <p>
            Every piece here is handpicked, not mass-sourced. If it's in the
            collection, it's because I'd wear it, gift it, or wish I'd found
            it sooner. That's the filter, not "will this sell," but "is this
            actually beautiful."
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            To make it easy to find jewelry that feels personal, whether
            that's something small for an everyday outfit or a full set for
            a big event, without sifting through pages of things that don't
            feel like <em>you</em>. Curated over crowded, always.
          </p>
        </div>
      </div>
 
      <div className="text-xl py-4">
        <Title text1="WHY" text2="AREESHA & CO." />
      </div>
 
      <div className="flex flex-col md:flex-row text-sm mb-10 gap-6">
        <div className="border rounded-lg px-8 md:px-10 py-8 flex flex-col gap-4">
          <b>Handpicked, Not Mass-Produced</b>
          <p className="text-gray-600">
            Every piece is chosen individually. No filler products just to
            pad out a catalog.
          </p>
        </div>
        <div className="border rounded-lg px-8 md:px-10 py-8 flex flex-col gap-4">
          <b>Built for Gifting</b>
          <p className="text-gray-600">
            Build a gift box for someone, or let them build their own. This
            store is designed around jewelry as a gift, not just a
            purchase.
          </p>
        </div>
        <div className="border rounded-lg px-8 md:px-10 py-8 flex flex-col gap-4">
          <b>Shop by Occasion</b>
          <p className="text-gray-600">
            Everyday, Party, Bridal, or Eid, find what fits the moment
            instead of scrolling through everything at once.
          </p>
        </div>
      </div>
 
      <div className="border-t pt-6 pb-20 text-sm text-gray-500 max-w-2xl">
        <b className="text-gray-700 block mb-2">A note on the pieces</b>
        <p>
          The jewelry featured here is handcrafted by{" "}
          <a
            href="https://www.sanateseriatelier.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-800"
          >
            Sanat Eseri Atelier
          </a>
          , used with their permission. All credit for the design and
          craftsmanship of each piece belongs to them, this site is a
          curated storefront concept, not a claim of authorship over the
          pieces themselves.
        </p>
      </div>
    </div>
  );
};
 
export default About;
 