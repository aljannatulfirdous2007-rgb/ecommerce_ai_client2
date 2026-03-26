import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useStore();

  const product = useMemo(() => PRODUCTS.find((item) => item.id === Number(id)), [id]);
  if (!product) return <div className="pt-24 px-4">Product not found</div>;

  return (
    <div className="pt-24 px-4 sm:px-8 lg:px-16">
      <div className="grid gap-8 lg:grid-cols-2">
        <img src={product.img} alt={product.name} className="rounded-2xl border object-cover h-[420px] w-full" />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-indigo-600">${product.price}</p>
          <p className="text-gray-700">Rating: {product.rating} ★ ({product.reviews} reviews)</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <div className="mt-4 flex gap-2">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white" onClick={() => addToCart(product)}>Add to Cart</button>
            <button className="rounded-lg border px-4 py-2 text-gray-700">Buy Now</button>
          </div>
          <p className="mt-6 text-gray-600">Fast delivery & easy returns. 100% authentic product guarantee.</p>
        </div>
      </div>
    </div>
  );
}