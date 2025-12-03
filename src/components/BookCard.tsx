import { Link } from 'react-router-dom';

interface BookingCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
}
const BookCard: React.FC<BookingCardProps> = ({ id, image, title, price }) => {
  return (
    <div className="border p-4 rounded">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-32 object-cover mb-2"
        />
        <h2 className="font-bold">{title}</h2>
        <p>${price}</p>
      </Link>
    </div>
  );
};

export default BookCard;
