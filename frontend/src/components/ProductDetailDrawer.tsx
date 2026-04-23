import { useState } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useStore, type KotaItem, type BakeryItem } from '../lib/store';
import { toast } from 'sonner';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '../components/ui/drawer';

interface ProductDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  product: KotaItem | BakeryItem | null;
}

export function ProductDetailDrawer({ open, onClose, product }: ProductDetailDrawerProps) {
  if (!product) return null;

  const isKota = 'basePrice' in product;

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="max-h-[85vh] bg-background border-border">
        <DrawerHeader className="sr-only">
          <DrawerTitle>{product.name}</DrawerTitle>
          <DrawerDescription>Product details for {product.name}</DrawerDescription>
        </DrawerHeader>
        {isKota ? (
          <KotaDetail product={product as KotaItem} onClose={onClose} />
        ) : (
          <BakeryDetail product={product as BakeryItem} onClose={onClose} />
        )}
      </DrawerContent>
    </Drawer>
  );
}

function KotaDetail({ product, onClose }: { product: KotaItem; onClose: () => void }) {
  const addKotaToCart = useStore(s => s.addKotaToCart);
  const [qty, setQty] = useState(1);

  const total = product.basePrice * qty;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addKotaToCart(product.id, []);
    }
    toast.success(`${product.name} added to cart!`);
    onClose();
  };

  return (
    <div className="px-6 pb-8 pt-2 space-y-6">
      {/* Product Image */}
      <div className="flex justify-center">
        <div className="relative w-48 h-48 rounded-3xl bg-muted/20 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
        </div>
      </div>

      {/* Name & Description */}
      <div className="text-center space-y-1">
        <h3 className="text-xl font-black text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      {/* Price & Qty */}
      <div className="flex items-center justify-between bg-card/80 rounded-2xl p-4 border border-border/30">
        <div>
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="text-2xl font-black text-primary">R{product.basePrice}.00</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="h-9 w-9 rounded-full bg-muted/50 flex items-center justify-center transition-all hover:bg-muted"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-lg font-bold w-6 text-center">{qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center transition-all hover:bg-primary/30 text-primary"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Total & Add to Cart */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total</span>
          <span className="text-lg font-black text-foreground">R{total}.00</span>
        </div>
        <button
          onClick={handleAdd}
          disabled={product.outOfStock}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function BakeryDetail({ product, onClose }: { product: BakeryItem; onClose: () => void }) {
  const addBakeryToCart = useStore(s => s.addBakeryToCart);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.label || '');
  const [qty, setQty] = useState(1);

  const sizeObj = product.sizes.find(s => s.label === selectedSize);
  const price = sizeObj?.price || 0;
  const total = price * qty;

  const handleAdd = () => {
    addBakeryToCart(product.id, selectedSize, qty);
    toast.success(`${product.name} (${selectedSize}) added to cart!`);
    onClose();
  };

  return (
    <div className="px-6 pb-8 pt-2 space-y-6">
      {/* Product Image */}
      <div className="flex justify-center">
        <div className="relative w-48 h-48 rounded-3xl bg-muted/20 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
        </div>
      </div>

      {/* Name */}
      <div className="text-center space-y-1">
        <h3 className="text-xl font-black text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">Select your preferred size</p>
      </div>

      {/* Size Selection */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Size</p>
        <div className="flex flex-wrap gap-2">
            {product.sizes.map(size => (
                <button
                key={size.label}
                onClick={() => setSelectedSize(size.label)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
                    selectedSize === size.label
                    ? 'border-amber-500 bg-amber-50 text-amber-800 font-medium'
                    : 'border-border/40 text-muted-foreground hover:border-amber-400'
                }`}
                >
                {size.label} · R{size.price}
                </button>
            ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center justify-between bg-card/80 rounded-2xl p-4 border border-border/30">
        <p className="text-sm font-semibold text-foreground">Quantity</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="h-9 w-9 rounded-full bg-muted/50 flex items-center justify-center transition-all hover:bg-muted"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-lg font-bold w-6 text-center">{qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center transition-all hover:bg-primary/30 text-primary"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Total & Add to Cart */}
      <div className="flex items-center gap-3 pt-2 border-t border-border/20">
        <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-xl font-black text-foreground">R{total}.00</p>
        </div>
        <button
            onClick={handleAdd}
            disabled={product.outOfStock}
            className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-40"
        >
            <ShoppingCart className="h-4 w-4" />
            Add to cart
        </button>
        </div>
    </div>
  );
}
