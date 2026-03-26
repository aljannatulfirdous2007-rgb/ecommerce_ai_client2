import { CATEGORIES } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function FilterSidebar() {
  const { filters, setFilters } = useStore();

  const update = (patch) => setFilters((f) => ({ ...f, ...patch }));

  return (
    <aside className="w-full max-w-[240px] rounded-xl border bg-white p-3 shadow-sm">
      <h4 className="mb-3 font-semibold">Filters</h4>
      <div className="mb-4">
        <p className="font-medium">Category</p>
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => update({ category: cat })} className={`mt-2 block w-full text-left rounded px-2 py-1 ${filters.category === cat ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <p className="font-medium">Sort</p>
        <select value={filters.sort} onChange={(e) => update({ sort: e.target.value })} className="mt-2 w-full rounded border p-2">
          <option value="popularity">Popularity</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div>
        <p className="font-medium">Search</p>
        <input value={filters.search} onChange={(e) => update({ search: e.target.value })} placeholder="Search products" className="mt-2 w-full rounded border p-2" />
      </div>
    </aside>
  );
}