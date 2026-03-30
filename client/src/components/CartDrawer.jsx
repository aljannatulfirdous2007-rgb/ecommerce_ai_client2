import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { ShoppingBag, X } from "lucide-react";

export default function CartDrawer({ open, onClose }) {
  const { cart, cartTotal, removeFromCart, updateQty } = useStore();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm ${open ? '' : 'pointer-events-none'}`} onClick={onClose}>
      <div 
        className={`ml-auto h-full w-full max-w-md overflow-y-auto bg-white p-6 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Your Cart
          </h2>
          <button className="text-gray-600 hover:text-black transition" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="py-20 text-center text-gray-500">Your cart is empty.</div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-xs text-gray-500">${item.price} × {item.qty}</p>
                  </div>
                  <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="rounded border px-2" onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}>-</button>
                  <span>{item.qty}</span>
                  <button className="rounded border px-2" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  <button className="ml-auto text-sm text-red-600" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="rounded-lg border p-4">
              <strong>Total:</strong> ${cartTotal.toFixed(2)}
            </div>
              <button 
                className="w-full rounded-lg bg-red-600 px-4 py-3 text-white font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
              >
                Proceed to Checkout
              </button>
          </div>
        )}
      </div>
    </div>
  );
}
