import { useState } from 'react';
import { Minus, Plus, ShoppingCart, X, Check } from 'lucide-react';
import { useStore, type BakeryItem } from '../lib/store';
import { toast } from 'sonner';

function BakeryDrawer({ item, onClose }: { item: BakeryItem; onClose: () => void }) {
  const [selectedSize, setSelectedSize] = useState(item.sizes[0]?.label || '');
  const [qty, setQty] = useState(1);
  const addBakeryToCart = useStore(s => s.addBakeryToCart);

  const currentSize = item.sizes.find(s => s.label === selectedSize);
  const total = (currentSize?.price || 0) * qty;

  const handleAdd = () => {
    addBakeryToCart(item.id, selectedSize, qty);
    toast.success(`${item.name} (${selectedSize}) added to cart!`);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg" style={{ animation: 'slide-up 0.35s ease-out' }}>
        <div className="glass-strong rounded-t-3xl p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="h-16 w-16 object-contain rounded-xl" />
              <div>
                <h3 className="text-xl font-extrabold text-foreground">{item.name}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">Select bucket size</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-xl glass p-2 transition-transform hover:scale-110">
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Bucket Size</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {item.sizes.map(size => {
              const active = selectedSize === size.label;
              return (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(size.label)}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                    active ? 'bg-primary/20 text-foreground shadow-[0_0_12px_rgba(255,208,0,0.3)]' : 'glass text-foreground'
                  }`}
                  style={active ? { border: '1px solid rgba(255,208,0,0.5)' } : { border: '1px solid var(--glass-border)' }}
                >
                  {active && <Check className="h-3.5 w-3.5 text-primary" />}
                  {size.label}
                  <span className="text-muted-foreground">R{size.price}</span>
                </button>
              );
            })}
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Quantity</p>
          <div className="mb-6 flex items-center gap-4">
            <div className="glass flex items-center gap-2 rounded-xl">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-3 text-muted-foreground transition-colors hover:text-foreground">
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-10 text-center text-lg font-black">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="p-3 text-muted-foreground transition-colors hover:text-foreground">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <span className="text-sm text-muted-foreground">bucket(s)</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-3xl font-black text-primary" style={{ textShadow: '0 0 20px rgba(255,208,0,0.3)' }}>R{total}</p>
            </div>
            <button onClick={handleAdd} className="btn-primary flex items-center gap-2 text-sm">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function BakeryCard({ item }: { item: BakeryItem }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const lowestPrice = item.sizes.length > 0 ? Math.min(...item.sizes.map(s => s.price)) : 0;

  return (
    <>
      <div
        onClick={() => !item.outOfStock && setDrawerOpen(true)}
        className={`group relative rounded-2xl bg-card/80 backdrop-blur-sm p-3 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] cursor-pointer ${
          item.outOfStock ? 'opacity-40 pointer-events-none' : ''
        }`}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/20 mb-3">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
          />
          {item.outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl">
              <span className="rounded-lg bg-destructive/20 px-3 py-1 text-xs font-bold text-destructive">Out of Stock</span>
            </div>
          )}
        </div>
        <h3 className="text-sm font-bold text-foreground truncate">{item.name}</h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {item.sizes.map(s => s.label).join(' · ')}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-base font-black text-primary">from R{lowestPrice}</span>
          {!item.outOfStock && (
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110">
              <Plus className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      {drawerOpen && <BakeryDrawer item={item} onClose={() => setDrawerOpen(false)} />}
    </>
  );
}
