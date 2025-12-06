import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "@/redux/ProductSlice";
import type { AppDispatch, RootState } from "../redux/store";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { data: product, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id)); 
    }
  }, [dispatch, id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  if (!product) return null;

  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded"
      >
        Back
      </button>

      <img
        src={product.images[0]}
        alt={product.title}
        className="w-[50%] h-auto mb-5"
      />

      <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
      <p className="w-[70%]">{product.description}</p>

      <div className="flex gap-4">
        <p>${product.price}</p>
        <p>{product.rating}</p>
      </div>
    </div>
  );
};
