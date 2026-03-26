import { useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

const DEALS = PRODUCTS.map((p, i) => ({ ...p, remaining: 8 - i, until: new Date(Date.now() + (i + 1) * 3600 * 1000) }));

function formatCountdown(dt) {
  const diff = Math.max(0, Math.floor((dt - new Date()) / 1000));
  const h = String(Math.floor(diff / 3600)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
  const s = String(diff % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function DealsPage() {
  const [now, setNow] = useState(Date.now());
  const activeDeals = useMemo(() => DEALS.filter((d) => d.until.getTime() > now), [now]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-24 px-4 sm:px-8 lg:px-16 min-h-screen" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop&crop=center)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 min-h-[80vh]">
        <h1 className="text-3xl font-bold mb-4 text-center">Limited Time Deals</h1>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {activeDeals.map((deal) => (
            <div key={deal.id} className="rounded-xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-amber-600">Only {deal.remaining} left</span>
                <span className="text-sm text-gray-500">{formatCountdown(deal.until)}</span>
              </div>
              <ProductCard product={deal} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}