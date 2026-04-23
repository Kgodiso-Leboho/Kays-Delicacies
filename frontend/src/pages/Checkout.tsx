import { useState } from 'react';
import { useStore } from '../lib/store';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { CartDrawer } from '../components/CartDrawer';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

export default function Checkout() {
  const { cart, removeFromCart, updateCartQty, placeOrder, kotas, bakery } = useStore();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preference, setPreference] = useState<'collection' | 'delivery'>('collection');
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((s, c) => s + c.total, 0);

  const getImage = (item) => {
    if (item.type === 'kota') {
      return kotas.find(k => k.id === item.kotaId)?.image;
    }
    return bakery.find(b => b.id === item.itemId)?.image;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);
    await new Promise(res => setTimeout(res, 800));
    placeOrder(name.trim(), phone.trim(), preference);
    navigate('/success');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2 text-black">Your cart is empty</h1>
          <button onClick={() => navigate('/menu')} className="btn-primary">
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <CartDrawer />

      <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10">

        {/* LEFT: CART */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Order</h2>

          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="rounded-2xl p-4 bg-white border border-gray-200 flex gap-4 shadow-sm hover:shadow-md transition">

                <img
                  src={getImage(item)}
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded-xl bg-gray-100"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-xs text-gray-500">
                        {item.type === 'bakery' ? item.size : item.selectedAddons?.map(a => a.name).join(', ')}
                      </p>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-primary">R{item.total}</span>

                    {item.type === 'bakery' && (
                      <div className="flex items-center border border-gray-300 rounded-lg px-2">
                        <button onClick={() => updateCartQty(item.id, -1)} className="p-1">
                          <Minus size={14} />
                        </button>
                        <span className="px-2">{item.qty}</span>
                        <button onClick={() => updateCartQty(item.id, 1)} className="p-1">
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: SUMMARY + FORM */}
        <div className="sticky top-20 h-fit rounded-3xl p-6 bg-white border border-gray-200 shadow-lg">

          <h2 className="text-lg font-bold mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between">
                <span className="truncate">{item.name}</span>
                <span>R{item.total}</span>
              </div>
            ))}
          </div>

          <div className="my-4 border-t border-gray-200" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">R{total}</span>
          </div>

          {/* FORM */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                required
              />

              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                required
              />

              <div className="flex gap-2">
                {['collection', 'delivery'].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPreference(opt as any)}
                    className={`flex-1 py-2 rounded-xl capitalize border ${preference === opt ? 'bg-primary text-white border-primary' : 'bg-white border-gray-300'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition"
              >
                {loading ? 'Processing...' : `Place Order`}
              </button>
            </form>
          )}

          {step === 1 && (
            <button
              onClick={() => setStep(2)}
              className="mt-6 w-full py-4 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          )}

          <p className="text-xs text-gray-500 text-center mt-3">
            Secure checkout • We’ll contact you shortly
          </p>
        </div>
      </div>
    </div>
  );
}
