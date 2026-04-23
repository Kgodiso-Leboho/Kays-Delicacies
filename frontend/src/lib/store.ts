import { create } from 'zustand';
import foodKota from '../assets/food-kota.png';
import foodChips from '../assets/food-chips.png';
import foodDagwood from '../assets/food-dagwood.png';
import foodScones from '../assets/food-scones.png';
import foodBiscuits from '../assets/food-biscuits.png';

export interface Addon { id: string; name: string; price: number; }

export interface KotaItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  addons: Addon[];
  outOfStock: boolean;
  image: string;
  category: 'kota' | 'dagwood' | 'chips';
}

export interface BakerySize {
  label: string;
  price: number;
}

export interface BakeryItem {
  id: string;
  name: string;
  sizes: BakerySize[];
  outOfStock: boolean;
  image: string;
  category: 'scones' | 'biscuits';
}

export interface CartKotaItem {
  type: 'kota';
  id: string;
  kotaId: string;
  name: string;
  basePrice: number;
  selectedAddons: Addon[];
  total: number;
}

export interface CartBakeryItem {
  type: 'bakery';
  id: string;
  itemId: string;
  name: string;
  size: string;
  price: number;
  qty: number;
  total: number;
}

export type CartItem = CartKotaItem | CartBakeryItem;

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  phone: string;
  preference: 'collection' | 'delivery';
  status: 'pending' | 'confirmed' | 'ready';
  createdAt: string;
}

const defaultKotas: KotaItem[] = [
  { id: 'k1', name: 'Young Stunna', description: 'Atchaar, Polony, Chips, Cheese, Egg, Vienna, Special & Burger Patty, Russian', basePrice: 50, outOfStock: false, category: 'kota', addons: [], image: foodKota },
  { id: 'k2', name: 'Daliwonga', description: 'Atchaar, Polony, Chips, Cheese, Egg, Vienna, Special & Burger Patty', basePrice: 45, outOfStock: false, category: 'kota', addons: [], image: foodKota },
  { id: 'k3', name: 'Sir Trill', description: 'Atchaar, Polony, Chips, Cheese, Egg, Vienna, Special & Russian', basePrice: 35, outOfStock: false, category: 'kota', addons: [], image: foodKota },
  { id: 'k4', name: 'Shebeshxt', description: 'Atchaar, Polony, Chips, Cheese, Vienna, Special & Half Russian', basePrice: 30, outOfStock: false, category: 'kota', addons: [], image: foodKota },
  { id: 'k5', name: 'Scotts Maphuma', description: 'Atchaar, Polony, Chips, Vienna, Special & Half Russian', basePrice: 25, outOfStock: false, category: 'kota', addons: [], image: foodKota },
  { id: 'k6', name: 'LeeMcKrazy', description: 'Atchaar, Polony, Chips, Special, Vienna', basePrice: 20, outOfStock: false, category: 'kota', addons: [], image: foodKota },
  { id: 'k7', name: 'Msongi', description: 'Atchaar, Polony, Chips', basePrice: 15, outOfStock: false, category: 'kota', addons: [], image: foodKota },
  { id: 'c1', name: 'Small Chips', description: 'Golden crispy chips', basePrice: 20, outOfStock: false, category: 'chips', addons: [], image: foodChips },
  { id: 'c2', name: 'Large Chips', description: 'Golden crispy chips, large portion', basePrice: 30, outOfStock: false, category: 'chips', addons: [], image: foodChips },
  { id: 'd1', name: 'Kharishma', description: 'Four toasted slices, Beef burger, Cheese, Tomato, Lettuce, Egg & Chips, Russian, Vienna', basePrice: 45, outOfStock: false, category: 'dagwood', addons: [], image: foodDagwood },
  { id: 'd2', name: 'Shandesh', description: 'Four toasted slices, Beef burger, Cheese, Tomato, Lettuce, Egg & Chips', basePrice: 35, outOfStock: false, category: 'dagwood', addons: [], image: foodDagwood },
  { id: 'd3', name: 'Janesh', description: 'Three toasted slices, Beef burger, Cheese, Tomato, Lettuce & Chips', basePrice: 28, outOfStock: false, category: 'dagwood', addons: [], image: foodDagwood },
];

const defaultBakery: BakeryItem[] = [
  { id: 'bs1', name: 'Scones', outOfStock: false, category: 'scones', image: foodScones, sizes: [{ label: '2 Litre', price: 150 }, { label: '5 Litre', price: 250 }, { label: '10 Litre', price: 400 }, { label: '20 Litre', price: 650 }] },
  { id: 'bs2', name: 'Melting Moments', outOfStock: false, category: 'scones', image: foodScones, sizes: [{ label: '2 Litre', price: 250 }, { label: '5 Litre', price: 350 }, { label: '10 Litre', price: 600 }, { label: '20 Litre', price: 900 }] },
  { id: 'bs3', name: 'Blueberry Scones', outOfStock: false, category: 'scones', image: foodScones, sizes: [{ label: '2 Litre', price: 200 }, { label: '5 Litre', price: 300 }, { label: '10 Litre', price: 480 }, { label: '20 Litre', price: 750 }] },
  { id: 'bb1', name: 'Biscuits', outOfStock: false, category: 'biscuits', image: foodBiscuits, sizes: [{ label: '2 Litre', price: 200 }, { label: '5 Litre', price: 350 }, { label: '10 Litre', price: 550 }, { label: '20 Litre', price: 850 }] },
  { id: 'bb2', name: 'Jam Tarts', outOfStock: false, category: 'biscuits', image: foodBiscuits, sizes: [{ label: '2 Litre', price: 200 }, { label: '5 Litre', price: 350 }, { label: '10 Litre', price: 550 }, { label: '20 Litre', price: 850 }] },
];

interface AppState {
  kotas: KotaItem[];
  bakery: BakeryItem[];
  cart: CartItem[];
  orders: Order[];
  cartOpen: boolean;
  adminAuth: boolean;
  
  toggleCart: () => void;
  addKotaToCart: (kotaId: string, selectedAddonIds: string[]) => void;
  addBakeryToCart: (itemId: string, sizeLabel: string, qty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQty: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  placeOrder: (name: string, phone: string, preference: 'collection' | 'delivery') => void;
  
  // Admin
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  toggleStock: (type: 'kota' | 'bakery', itemId: string) => void;
  updateKotaPrice: (kotaId: string, newPrice: number) => void;
  updateBakeryPrice: (itemId: string, newPrice: number) => void;
  updateAddonPrice: (kotaId: string, addonId: string, newPrice: number) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const ADMIN_PASSWORD = 'kays2024';

const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch { return fallback; }
};

export const useStore = create<AppState>((set, get) => ({
  kotas: loadFromStorage('kd-kotas', defaultKotas),
  bakery: loadFromStorage('kd-bakery', defaultBakery),
  cart: loadFromStorage('kd-cart', []),
  orders: loadFromStorage('kd-orders', []),
  cartOpen: false,
  adminAuth: false,

  toggleCart: () => set(s => ({ cartOpen: !s.cartOpen })),

  addKotaToCart: (kotaId, selectedAddonIds) => {
    const kota = get().kotas.find(k => k.id === kotaId);
    if (!kota) return;
    const addons = kota.addons.filter(a => selectedAddonIds.includes(a.id));
    const total = kota.basePrice + addons.reduce((s, a) => s + a.price, 0);
    const item: CartKotaItem = {
      type: 'kota', id: crypto.randomUUID(), kotaId, name: kota.name,
      basePrice: kota.basePrice, selectedAddons: addons, total,
    };
    const cart = [...get().cart, item];
    localStorage.setItem('kd-cart', JSON.stringify(cart));
    set({ cart, cartOpen: true });
  },

  addBakeryToCart: (itemId, sizeLabel, qty) => {
    const item = get().bakery.find(b => b.id === itemId);
    if (!item) return;
    const size = item.sizes.find(s => s.label === sizeLabel);
    if (!size) return;
    const cartItem: CartBakeryItem = {
      type: 'bakery', id: crypto.randomUUID(), itemId, name: item.name,
      size: sizeLabel, price: size.price, qty, total: size.price * qty,
    };
    const cart = [...get().cart, cartItem];
    localStorage.setItem('kd-cart', JSON.stringify(cart));
    set({ cart, cartOpen: true });
  },

  removeFromCart: (cartItemId) => {
    const cart = get().cart.filter(c => c.id !== cartItemId);
    localStorage.setItem('kd-cart', JSON.stringify(cart));
    set({ cart });
  },

  updateCartQty: (cartItemId, delta) => {
    const cart = get().cart.map(c => {
      if (c.id !== cartItemId) return c;
      if (c.type === 'bakery') {
        const newQty = Math.max(1, c.qty + delta);
        return { ...c, qty: newQty, total: c.price * newQty };
      }
      return c;
    });
    localStorage.setItem('kd-cart', JSON.stringify(cart));
    set({ cart });
  },

  clearCart: () => {
    localStorage.setItem('kd-cart', JSON.stringify([]));
    set({ cart: [] });
  },

  placeOrder: (customerName, phone, preference) => {
    const { cart, orders } = get();
    const order: Order = {
      id: crypto.randomUUID().slice(0, 8).toUpperCase(),
      items: cart,
      total: cart.reduce((s, c) => s + c.total, 0),
      customerName, phone, preference,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const newOrders = [order, ...orders];
    localStorage.setItem('kd-orders', JSON.stringify(newOrders));
    localStorage.setItem('kd-cart', JSON.stringify([]));
    set({ orders: newOrders, cart: [], cartOpen: false });
  },

  loginAdmin: (password) => {
    if (password === ADMIN_PASSWORD) {
      set({ adminAuth: true });
      return true;
    }
    return false;
  },

  logoutAdmin: () => set({ adminAuth: false }),

  toggleStock: (type, itemId) => {
    if (type === 'kota') {
      const kotas = get().kotas.map(k => k.id === itemId ? { ...k, outOfStock: !k.outOfStock } : k);
      localStorage.setItem('kd-kotas', JSON.stringify(kotas));
      set({ kotas });
    } else {
      const bakery = get().bakery.map(b => b.id === itemId ? { ...b, outOfStock: !b.outOfStock } : b);
      localStorage.setItem('kd-bakery', JSON.stringify(bakery));
      set({ bakery });
    }
  },

  updateKotaPrice: (kotaId, newPrice) => {
    const kotas = get().kotas.map(k => k.id === kotaId ? { ...k, basePrice: newPrice } : k);
    localStorage.setItem('kd-kotas', JSON.stringify(kotas));
    set({ kotas });
  },

  updateBakeryPrice: (itemId, newPrice) => {
    const bakery = get().bakery.map(b => b.id === itemId ? { ...b, pricePerUnit: newPrice } : b);
    localStorage.setItem('kd-bakery', JSON.stringify(bakery));
    set({ bakery });
  },

  updateAddonPrice: (kotaId, addonId, newPrice) => {
    const kotas = get().kotas.map(k => k.id === kotaId ? {
      ...k, addons: k.addons.map(a => a.id === addonId ? { ...a, price: newPrice } : a)
    } : k);
    localStorage.setItem('kd-kotas', JSON.stringify(kotas));
    set({ kotas });
  },

  updateOrderStatus: (orderId, status) => {
    const orders = get().orders.map(o => o.id === orderId ? { ...o, status } : o);
    localStorage.setItem('kd-orders', JSON.stringify(orders));
    set({ orders });
  },
}));
