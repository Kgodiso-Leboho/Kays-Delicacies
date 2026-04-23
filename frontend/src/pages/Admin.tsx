import { useState } from 'react';
import { useStore, type Order } from '../lib/store';
import { Header } from '../components/Header';
import { Lock, LogOut, Package, Eye, EyeOff, ClipboardList, Settings } from 'lucide-react';

function AdminLogin({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(pw)) setError(true);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="glass-strong w-full max-w-sm space-y-4 rounded-3xl p-8 text-center animate-scale-in">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
          <Lock className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-2xl font-black">Admin Login</h1>
        <div className="relative">
          <input
            type={showPw ? 'text' : 'password'}
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false); }}
            className="glass-input w-full rounded-xl px-4 py-3 pr-10 text-sm outline-none focus:shadow-[0_0_0_2px_rgba(255,208,0,0.4)]"
            placeholder="Enter password"
          />
          <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3 text-muted-foreground">
            {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {error && <p className="text-sm font-semibold text-destructive">Incorrect password</p>}
        <button type="submit" className="btn-primary w-full">Login</button>
      </form>
    </div>
  );
}

function OrderCard({ order, onStatusChange }: { order: Order; onStatusChange: (id: string, status: Order['status']) => void }) {
  const statusStyles: Record<Order['status'], string> = {
    pending: 'bg-amber-100/60 text-amber-700',
    confirmed: 'bg-primary/15 text-primary-foreground',
    ready: 'bg-emerald-100/60 text-emerald-700',
  };

  return (
    <div className="glass rounded-2xl p-4 animate-fade-in">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-sm font-black">#{order.id}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[order.status]}`}>
          {order.status}
        </span>
      </div>
      <p className="font-bold">{order.customerName}</p>
      <p className="text-xs text-muted-foreground">{order.phone} · {order.preference}</p>
      <div className="mt-2 space-y-0.5">
        {order.items.map(item => (
          <p key={item.id} className="text-xs text-muted-foreground">
            {item.name}
            {item.type === 'kota' && item.selectedAddons.length > 0 && ` + ${item.selectedAddons.map(a => a.name).join(', ')}`}
            {item.type === 'bakery' && ` × ${item.qty}`}
            {' '}— R{item.total}
          </p>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-black text-primary">R{order.total}</span>
        <select
          value={order.status}
          onChange={e => onStatusChange(order.id, e.target.value as Order['status'])}
          className="glass-input rounded-xl px-3 py-1.5 text-xs font-bold outline-none focus:shadow-[0_0_0_2px_rgba(255,208,0,0.4)]"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="ready">Ready</option>
        </select>
      </div>
    </div>
  );
}

export default function Admin() {
  const store = useStore();
  const [tab, setTab] = useState<'orders' | 'products'>('orders');

  if (!store.adminAuth) {
    return (
      <>
        <div className="mesh-bg" />
        <Header />
        <AdminLogin onLogin={store.loginAdmin} />
      </>
    );
  }

  const sidebarItems = [
    { key: 'orders' as const, icon: ClipboardList, label: 'Orders' },
    { key: 'products' as const, icon: Settings, label: 'Products' },
  ];

  return (
    <>
      <div className="mesh-bg" />
      <Header />
      <div className="container flex gap-6 py-6">
        {/* Glass Sidebar */}
        <aside className="glass-strong hidden w-56 shrink-0 rounded-2xl p-4 md:block" style={{ height: 'fit-content', position: 'sticky', top: '5rem' }}>
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Dashboard</p>
          <nav className="space-y-1">
            {sidebarItems.map(item => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-200 ${
                  tab === item.key
                    ? 'bg-primary/15 text-foreground shadow-[0_0_12px_rgba(255,208,0,0.15)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--glass-border)' }}>
            <button
              onClick={store.logoutAdmin}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-destructive"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </aside>

        {/* Mobile tabs */}
        <div className="flex w-full flex-col">
          <div className="mb-4 flex items-center justify-between md:hidden">
            <div className="flex gap-2">
              {sidebarItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                    tab === item.key ? 'btn-primary !py-2' : 'glass text-muted-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </button>
              ))}
            </div>
            <button onClick={store.logoutAdmin} className="glass rounded-xl p-2 text-muted-foreground hover:text-destructive">
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <h1 className="mb-4 text-2xl font-black capitalize">{tab}</h1>

          {tab === 'orders' && (
            <div className="space-y-3">
              {store.orders.length === 0 ? (
                <div className="glass rounded-2xl py-16 text-center">
                  <Package className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
                  <p className="text-muted-foreground">No orders yet</p>
                </div>
              ) : (
                store.orders.map(order => (
                  <OrderCard key={order.id} order={order} onStatusChange={store.updateOrderStatus} />
                ))
              )}
            </div>
          )}

          {tab === 'products' && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-3 text-lg font-black">Kotas</h2>
                <div className="space-y-3">
                  {store.kotas.map(kota => (
                    <div key={kota.id} className="glass rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="font-bold">{kota.name}</span>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="text-xs font-semibold text-muted-foreground">Base: R</span>
                            <input
                              type="number"
                              value={kota.basePrice}
                              onChange={e => store.updateKotaPrice(kota.id, Number(e.target.value))}
                              className="glass-input w-16 rounded-lg px-2 py-1 text-sm font-bold outline-none focus:shadow-[0_0_0_2px_rgba(255,208,0,0.4)]"
                            />
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {kota.addons.map(addon => (
                              <div key={addon.id} className="flex items-center gap-1 text-xs">
                                <span className="text-muted-foreground">{addon.name}: R</span>
                                <input
                                  type="number"
                                  value={addon.price}
                                  onChange={e => store.updateAddonPrice(kota.id, addon.id, Number(e.target.value))}
                                  className="glass-input w-12 rounded-lg px-1 py-0.5 text-xs font-bold outline-none focus:shadow-[0_0_0_2px_rgba(255,208,0,0.4)]"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => store.toggleStock('kota', kota.id)}
                          className={`ml-4 rounded-full px-3 py-1.5 text-xs font-bold transition-all hover:scale-105 ${
                            kota.outOfStock ? 'bg-destructive/10 text-destructive' : 'bg-emerald-100/60 text-emerald-700'
                          }`}
                        >
                          {kota.outOfStock ? 'Out of Stock' : 'In Stock'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-3 text-lg font-black">Bakery</h2>
                <div className="space-y-3">
                  {store.bakery.map(item => (
                    <div key={item.id} className="glass flex items-center justify-between rounded-2xl p-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold">{item.name}</span>
                        <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                          {item.sizes.map(s => (
                            <span key={s.label} className="glass rounded-lg px-2 py-0.5">{s.label}: R{s.price}</span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => store.toggleStock('bakery', item.id)}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all hover:scale-105 ${
                          item.outOfStock ? 'bg-destructive/10 text-destructive' : 'bg-emerald-100/60 text-emerald-700'
                        }`}
                      >
                        {item.outOfStock ? 'Out of Stock' : 'In Stock'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
