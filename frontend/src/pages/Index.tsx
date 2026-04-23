import { useState } from 'react';
import { useStore, type KotaItem, type BakeryItem } from '../lib/store';
import { Header } from '../components/Header';
import { CartDrawer } from '../components/CartDrawer';
import { ProductDetailDrawer } from '../components/ProductDetailDrawer';
import { Flame, CakeSlice, Sparkles, Sandwich, Cookie, Salad } from 'lucide-react';

const categories = [
  { id: 'kotas', label: 'Kotas', icon: Flame },
  { id: 'chips', label: 'Chips', icon: Salad },
  { id: 'dagwoods', label: 'Dagwoods', icon: Sandwich },
  { id: 'scones', label: 'Scones', icon: CakeSlice },
  { id: 'biscuits', label: 'Biscuits', icon: Cookie },
] as const;

type CategoryId = typeof categories[number]['id'];

export default function Index() {
  const { kotas, bakery } = useStore();
  const [active, setActive] = useState<CategoryId>('kotas');
  const [selectedProduct, setSelectedProduct] = useState<KotaItem | BakeryItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openProduct = (product: KotaItem | BakeryItem) => {
    if ('outOfStock' in product && product.outOfStock) return;
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const categoryData: Record<CategoryId, React.ReactNode> = {
    kotas: (
      <div className="grid grid-cols-2 gap-4">
        {kotas.filter(k => k.category === 'kota').map((kota, i) => (
          <div key={kota.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
            <ProductCard product={kota} onClick={() => openProduct(kota)} />
          </div>
        ))}
      </div>
    ),
    chips: (
      <div className="grid grid-cols-2 gap-4">
        {kotas.filter(k => k.category === 'chips').map((kota, i) => (
          <div key={kota.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
            <ProductCard product={kota} onClick={() => openProduct(kota)} />
          </div>
        ))}
      </div>
    ),
    dagwoods: (
      <div className="grid grid-cols-2 gap-4">
        {kotas.filter(k => k.category === 'dagwood').map((kota, i) => (
          <div key={kota.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
            <ProductCard product={kota} onClick={() => openProduct(kota)} />
          </div>
        ))}
      </div>
    ),
    scones: (
      <div className="grid grid-cols-2 gap-4">
        {bakery.filter(b => b.category === 'scones').map((item, i) => (
          <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
            <ProductCard product={item} onClick={() => openProduct(item)} isBakery />
          </div>
        ))}
      </div>
    ),
    biscuits: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {bakery.filter(b => b.category === 'biscuits').map((item, i) => (
            <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
              <ProductCard product={item} onClick={() => openProduct(item)} isBakery />
            </div>
          ))}
        </div>
        <div className="glass rounded-2xl p-4 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">📋 Please Note</p>
          <p>50% deposit required. Bring your own bucket. Delivery is charged by distance. Pickup available.</p>
        </div>
      </div>
    ),
  };

  const activeCategory = categories.find(c => c.id === active)!;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <ProductDetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={selectedProduct}
      />

      {/* Hero */}
      <div className="px-4 pt-14 pb-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Kay's Delicacies</span>
        </div>
        <h1 className="text-3xl font-black text-foreground leading-tight">
          Every Bite a<br />
          <span className="text-primary">Better</span> experience!
        </h1>
      </div>

      {/* Category Nav */}
      <div className="sticky top-12 z-30 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="max-w-3xl mx-auto px-4 py-2 grid grid-cols-5 gap-1">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] sm:text-xs font-bold transition-all duration-200 ${
                active === id
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 pb-8 pt-4">
        <div className="mb-4 flex items-center gap-2">
          <activeCategory.icon className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-black text-foreground">{activeCategory.label}</h2>
        </div>
        {categoryData[active]}
      </main>
    </div>
  );
}

function ProductCard({ product, onClick, isBakery }: { product: KotaItem | BakeryItem; onClick: () => void; isBakery?: boolean }) {
  const isKota = 'basePrice' in product;
  const price = isKota ? (product as KotaItem).basePrice : Math.min(...(product as BakeryItem).sizes.map(s => s.price));

  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl bg-card/80 backdrop-blur-sm p-3 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${
        product.outOfStock ? 'opacity-40 pointer-events-none' : ''
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/20 mb-3">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
        />
        {product.outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl">
            <span className="rounded-lg bg-destructive/20 px-3 py-1 text-xs font-bold text-destructive">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-bold text-foreground truncate">{product.name}</h3>
      {isKota && (
        <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2 leading-tight">
          {(product as KotaItem).description}
        </p>
      )}
      {isBakery && (
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {(product as BakeryItem).sizes.map(s => s.label).join(' · ')}
        </p>
      )}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-base font-black text-primary">
          {isBakery ? 'From ' : ''}R{price}.00
        </span>
      </div>
    </div>
  );
}
