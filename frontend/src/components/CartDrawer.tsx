import { X, Trash2, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useStore } from '../lib/store';
import { useNavigate } from 'react-router-dom';

const DELIVERY_FEE = 15;

export function CartDrawer() {
  const { cart, cartOpen, toggleCart, removeFromCart, updateCartQty } = useStore();
  const navigate = useNavigate();
  const subtotal = cart.reduce((s, c) => s + c.total, 0);
  const total = subtotal > 0 ? subtotal + DELIVERY_FEE : 0;

  if (!cartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/25 backdrop-blur-sm animate-fade-in" onClick={toggleCart} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background border-l border-border shadow-xl animate-slide-in-right">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="flex items-center gap-2 text-lg font-extrabold">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Your Cart
          </h2>
          <button onClick={toggleCart} className="glass rounded-xl p-2 transition-transform hover:scale-110">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingCart className="mb-3 h-12 w-12 text-muted-foreground/30" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="rounded-xl border border-border bg-card p-4 animate-scale-in">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-foreground">{item.name}</p>
                      {item.type === 'kota' && item.selectedAddons.length > 0 && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          + {item.selectedAddons.map(a => a.name).join(', ')}
                        </p>
                      )}
                      {item.type === 'bakery' && (
                        <>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Size: {item.size}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateCartQty(item.id, -1)}
                              className="h-7 w-7 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                            <button
                              onClick={() => updateCartQty(item.id, 1)}
                              className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center hover:bg-primary/30 text-primary"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">R{item.total}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 space-y-3 border-t border-border">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>R{subtotal}.00</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Delivery</span>
                <span>R{DELIVERY_FEE}.00</span>
              </div>
              <div className="border-t border-border/30 pt-2 flex items-center justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-2xl font-black text-primary" style={{ textShadow: '0 0 20px rgba(255,208,0,0.3)' }}>
                  R{total}.00
                </span>
              </div>
            </div>
            <button
              onClick={() => { toggleCart(); navigate('/checkout'); }}
              className="btn-primary w-full text-center"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
