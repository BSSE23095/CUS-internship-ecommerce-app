import Title from "../components/Title";

const Policy = () => {
  return (
    <div className="border-t pt-10 pb-20 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <Title text1="RETURNS &" text2="EXCHANGES" />
      </div>

      <div className="flex flex-col gap-8 text-sm text-gray-600">
        <div>
          <h3 className="text-gray-800 font-medium mb-2">Returns</h3>
          <p>
            Since every piece is handmade, we accept returns within 3 days
            of delivery if the item arrives damaged or isn't as described.
            Reach out through the Contact page with your order details and
            a photo of the piece, and we'll sort it out.
          </p>
        </div>

        <div>
          <h3 className="text-gray-800 font-medium mb-2">Exchanges</h3>
          <p>
            Want a different piece instead? Exchanges are accepted within 5
            days of delivery, as long as the item hasn't been worn. Message
            us and we'll arrange the swap.
          </p>
        </div>

        <div>
          <h3 className="text-gray-800 font-medium mb-2">What's not covered</h3>
          <p>
            Custom or personalized pieces can't be returned or exchanged
            unless they arrive damaged. Normal wear and tear on handmade
            materials (clay, thread, beads) isn't eligible either, that's
            part of what makes each piece one of a kind.
          </p>
        </div>

        <div>
          <h3 className="text-gray-800 font-medium mb-2">How refunds work</h3>
          <p>
            Approved returns are refunded to the original payment method,
            or store credit if you'd prefer, within a few business days of
            us receiving the item back.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
