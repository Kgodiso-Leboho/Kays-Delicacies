import { useState } from 'react';
import { useStore } from '../lib/store';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { CartDrawer } from '../components/CartDrawer';
import { CheckCircle, User, Phone, MapPin, X, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';

export default function Checkout() {
  const { cart, removeFromCart, updateCartQty, placeOrder, kotas, bakery } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preference, setPreference] = useState<'collection' | 'delivery'>('collection');
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((s, c) => s + c.total, 0);

  const getImage = (item: typeof cart[number]) => {
    if (item.type === 'kota') {
      return kotas.find(k => k.id === item.kotaId)?.image;
    }
    return bakery.find(b => b.id === item.itemId)?.image;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    placeOrder(name.trim(), phone.trim(), preference);
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <>
        <div className="mesh-bg" />
        <Header />
        <div className="flex min-h-[70vh] items-center justify-center p-4">
          <div className="glass-strong max-w-sm rounded-3xl p-8 text-center animate-scale-in">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-2 text-2xl font-black">Order Placed!</h1>
            <p className="mb-6 text-muted-foreground">
              Thank you! We'll prepare your order and contact you soon.
            </p>
            <button onClick={() => navigate('/')} className="btn-primary w-full">
              Back to Menu
            </button>
          </div>
        </div>
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <div className="mesh-bg" />
        <Header />
        <div className="flex min-h-[70vh] items-center justify-center p-4">
          <div className="glass-strong max-w-sm rounded-3xl p-8 text-center">
            <ShoppingCart className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
            <h1 className="mb-2 text-xl font-black">Your cart is empty</h1>
            <p className="mb-6 text-sm text-muted-foreground">Add some items from the menu first.</p>
            <button onClick={() => navigate('/menu')} className="btn-primary w-full">
              Browse Menu
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      {/* Steps indicator */}
      <div className="max-w-4xl mx-auto px-4 pt-16 pb-4">
        <div className="flex items-center justify-center gap-0">
          <div className="flex flex-col items-center">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>1</div>
            <span className="mt-1 text-xs font-semibold">Cart</span>
          </div>
          <div className={`mx-2 h-0.5 w-16 sm:w-24 ${step >= 2 ? 'bg-primary' : 'bg-border'}`} />
          <div className="flex flex-col items-center">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>2</div>
            <span className="mt-1 text-xs font-semibold">Details</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-8">
        {step === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <p className="text-sm text-muted-foreground mb-4">{cart.length} item{cart.length > 1 ? 's' : ''} in cart</p>
              <div className="space-y-3">
                {cart.map((item, i) => (
                  <div key={item.id} className="glass-strong rounded-2xl p-4 animate-fade-in" style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}>
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="h-20 w-20 flex-shrink-0 rounded-xl bg-muted/20 overflow-hidden">
                        <img src={getImage(item)} alt={item.name} className="h-full w-full object-contain p-1" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-foreground">{item.name}</h3>
                            {item.type === 'kota' && item.selectedAddons.length > 0 && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                + {item.selectedAddons.map(a => a.name).join(', ')}
                              </p>
                            )}
                            {item.type === 'bakery' && (
                              <p className="text-xs text-muted-foreground mt-0.5">{item.size}</p>
                            )}
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-lg font-black text-primary">R{item.total}</span>
                          {item.type === 'bakery' && (
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateCartQty(item.id, -1)}
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/50 text-foreground hover:bg-muted transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                              <button
                                onClick={() => updateCartQty(item.id, 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/50 text-foreground hover:bg-muted transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price details sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-strong rounded-2xl p-5 sticky top-20">
                <h3 className="font-bold text-foreground mb-4">Price Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{cart.length} item{cart.length > 1 ? 's' : ''}</span>
                    <span>R{total}</span>
                  </div>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-muted-foreground">
                      <span className="truncate mr-2">
                        {item.type === 'bakery' ? `${item.qty}x ` : ''}{item.name}
                      </span>
                      <span className="flex-shrink-0">R{item.total}</span>
                    </div>
                  ))}
                </div>
                <div className="my-4 h-px bg-border" />
                <div className="flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span className="text-xl text-primary">R{total}</span>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="btn-primary w-full mt-5 flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <button onClick={() => setStep(1)} className="mb-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to cart
            </button>
            <div className="glass-strong rounded-2xl p-5 mb-6">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Order Summary</h2>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between py-2 text-sm" style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <span>
                    {item.name}
                    {item.type === 'bakery' && <span className="text-muted-foreground"> × {item.qty}</span>}
                  </span>
                  <span className="font-bold">R{item.total}</span>
                </div>
              ))}
              <div className="mt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-black text-primary">R{total}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-bold">
                  <User className="h-4 w-4 text-muted-foreground" /> Name
                </label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required
                  className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none transition-all focus:shadow-[0_0_0_2px_rgba(255,208,0,0.4)]"
                  placeholder="Your full name" />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-bold">
                  <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number
                </label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required
                  className="glass-input w-full rounded-xl px-4 py-3 text-sm outline-none transition-all focus:shadow-[0_0_0_2px_rgba(255,208,0,0.4)]"
                  placeholder="07X XXX XXXX" />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-bold">
                  <MapPin className="h-4 w-4 text-muted-foreground" /> Preference
                </label>
                <div className="flex gap-3">
                  {(['collection', 'delivery'] as const).map(opt => (
                    <button key={opt} type="button" onClick={() => setPreference(opt)}
                      className={`flex-1 rounded-xl py-3 text-sm font-bold capitalize transition-all duration-200 hover:scale-[1.03] ${
                        preference === opt ? 'bg-primary/20 text-foreground shadow-[0_0_12px_rgba(255,208,0,0.2)]' : 'glass text-muted-foreground'
                      }`}
                      style={preference === opt ? { border: '1px solid rgba(255,208,0,0.5)' } : { border: '1px solid var(--glass-border)' }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                Place Order — R{total} <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
