import { useEffect, useMemo } from "react";
import { useStore } from "../context/StoreContext";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";

export default function ShopPage() {
  const { filteredProducts, setFilters } = useStore();

  useEffect(() => {
    setFilters((f) => ({ ...f, category: "All" }));
  }, [setFilters]);

  const visibleProducts = useMemo(() => filteredProducts.slice(0, 18), [filteredProducts]);

  return (
    <div className="pt-24 px-4 sm:px-8 lg:px-16">
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="text-3xl font-bold">Shop by Category</h1>
        <p className="text-sm text-gray-500">Scroll to load more</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr]">
        <FilterSidebar />
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <button className="w-full rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" onClick={() => setFilters((f) => ({ ...f, limit: (f.limit || 18) + 6 }))}>Load more</button>
        </div>
      </div>
    </div>
  );
}