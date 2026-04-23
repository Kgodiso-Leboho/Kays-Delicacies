import { Plus } from 'lucide-react';
import { useStore, type KotaItem } from '../lib/store';
import { toast } from 'sonner';

export function KotaCard({ kota }: { kota: KotaItem }) {
  const addKotaToCart = useStore(s => s.addKotaToCart);

  const handleAdd = () => {
    if (kota.outOfStock) return;
    addKotaToCart(kota.id, []);
    toast.success(`${kota.name} added to cart!`);
  };

  return (
    <div
      className={`group relative rounded-2xl bg-card/80 backdrop-blur-sm p-3 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${
        kota.outOfStock ? 'opacity-40 pointer-events-none' : ''
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/20 mb-3">
        <img
          src={kota.image}
          alt={kota.name}
          loading="lazy"
          className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
        />
        {kota.outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl">
            <span className="rounded-lg bg-destructive/20 px-3 py-1 text-xs font-bold text-destructive">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-bold text-foreground truncate">{kota.name}</h3>
      <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2 leading-tight">{kota.description}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-base font-black text-primary">R{kota.basePrice}.00</span>
        {!kota.outOfStock && (
          <button
            onClick={handleAdd}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
