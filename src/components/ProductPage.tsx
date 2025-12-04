import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((error) => {
          console.log("error featching product data", error);
        });
    }
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded"
      >
        Back
      </button>

      <img src={product.images[0]} alt={product.title}  className="w-[50%] h-auto mb-5"/>

      <h1 className="text-2xl mb-4 font-bold"> {product.title}</h1>
      <p className="w-[70%]">{product.description}</p>

      <div className="flex gap-4">
        <p>${product.price}</p>
        <p>{product.rating}</p>
      </div>
    </div>
  );
};
