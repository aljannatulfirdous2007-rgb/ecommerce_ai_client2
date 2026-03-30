import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ShoppingBag, CreditCard, Lock, Truck, ChevronLeft } from "lucide-react";
import { useStore } from "../context/StoreContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

const CheckoutForm = ({ total, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;
    
    setProcessing(true);
    setError(null);

    try {
      // Create payment intent on backend
      const response = await axios.post(`${API_URL}/payment/create-payment-intent`, {
        amount: total,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const { clientSecret, paymentIntentId } = response.data.data;

      // Confirm card payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          onPaymentSuccess(paymentIntentId);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-300 rounded-lg bg-white">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? (
          <>Processing...</>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Pay ${total.toFixed(2)}
          </>
        )}
      </button>
    </form>
  );
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, user } = useStore();
  const [shippingInfo, setShippingInfo] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    phone: '',
  });
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const shippingCost = cartTotal >= 200 ? 0 : 15;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/shop');
    }
  }, [cart, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      // Create order in backend
      const orderData = {
        items: cart.map(item => ({
          product: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.qty,
        })),
        shippingAddress: shippingInfo,
        billingAddress: billingSameAsShipping ? shippingInfo : shippingInfo,
        paymentInfo: {
          method: 'stripe',
          transactionId: paymentIntentId,
          status: 'completed',
          amount: total,
        },
        prices: {
          itemsTotal: cartTotal,
          shipping: shippingCost,
          tax: tax,
          total: total,
        },
      };

      const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setOrderId(response.data.data._id);
      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-light">Order Confirmed!</h1>
          <p className="text-gray-400">Thank you for your purchase. Your order has been placed successfully.</p>
          <p className="text-sm text-gray-500">Order ID: {orderId}</p>
          <Link
            to="/shop"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-zinc-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/cart" className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-4">
              <ChevronLeft className="w-5 h-5" />
              Back to Cart
            </Link>
            <h1 className="text-4xl font-light">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-black p-6 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-medium">Shipping Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={shippingInfo.street}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-white/20 rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none"
                      placeholder="123 Main St"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-white/20 rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none"
                        placeholder="New York"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-white/20 rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none"
                        placeholder="NY"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-white/20 rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none"
                        placeholder="10001"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-white/20 rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none"
                        placeholder="USA"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-white/20 rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-black p-6 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-medium">Payment Details</h2>
                </div>
                
                <CheckoutForm total={total} onPaymentSuccess={handlePaymentSuccess} />
                
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  Your payment information is encrypted and secure
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-black p-6 rounded-lg border border-white/10">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                        <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {item.qty}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-gray-400 text-sm mt-1">${item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span className="text-red-600">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {shippingCost === 0 && (
                  <div className="mt-4 bg-green-900/20 border border-green-600/30 text-green-400 text-sm p-3 rounded">
                    ✓ You've qualified for FREE shipping!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
}
