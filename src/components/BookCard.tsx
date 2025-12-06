import { Link } from "react-router-dom";

interface BookingCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  onaddToCart:()=>void;
}
const BookCard: React.FC<BookingCardProps> = ({ id, image, title, price,onaddToCart }) => {

  return (
    <div className="border p-4 rounded">
      <img src={image} alt={title} className="w-full h-32 object-cover mb-2" />
      <h2 className="font-bold">{title}</h2>
      <p>${price}</p>
      <div className="flex justify-between items-center mt-4">
        <Link
          to={`/product/${id}`}
          className="px-4 py-1 border rounded-xl bg-black text-white"
        >
           Details
        </Link>
        <button onClick={onaddToCart} className="px-4 py-1 border rounded-xl bg-black text-white">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
