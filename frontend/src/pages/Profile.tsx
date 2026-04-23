import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';
import { CartDrawer } from '../components/CartDrawer';
import { User, Clock, Package, RefreshCw, LogOut } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { orders, addKotaToCart, addBakeryToCart } = useStore();
  const [tab, setTab] = useState<'profile' | 'orders'>('profile');
  const [phone, setPhone] = useState(() => localStorage.getItem('kd-profile-phone') || '');
  const [editing, setEditing] = useState(false);
  const [editPhone, setEditPhone] = useState(phone);

  const handleSave = () => {
    localStorage.setItem('kd-profile-phone', editPhone.trim());
    setPhone(editPhone.trim());
    setEditing(false);
  };

  const handleReorder = (order: typeof orders[number]) => {
    order.items.forEach(item => {
      if (item.type === 'kota') {
        addKotaToCart(item.kotaId, item.selectedAddons.map(a => a.id));
      } else {
        addBakeryToCart(item.itemId, item.size, item.qty);
      }
    });
    import('sonner').then(m => m.toast.success('Items added to cart!'));
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500/20 text-blue-600';
      case 'ready': return 'bg-green-500/20 text-green-600';
      default: return 'bg-yellow-500/20 text-yellow-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <div className="max-w-2xl mx-auto px-4 pt-16 pb-8">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mb-3">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-xl font-black text-foreground">{user?.full_name || 'Guest'}</h1>
          <p className="text-sm text-muted-foreground">{user?.email || ''}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'profile' as const, label: 'Profile', icon: User },
            { id: 'orders' as const, label: 'Order History', icon: Clock },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
                tab === t.id
                  ? 'bg-primary/20 text-primary'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'profile' ? (
          <div className="space-y-4">
            <div className="glass-strong rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Personal Info</h2>
                {!editing ? (
                  <button
                    onClick={() => { setEditPhone(phone); setEditing(true); }}
                    className="text-xs text-primary font-bold"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={() => setEditing(false)} className="text-xs text-muted-foreground font-bold">Cancel</button>
                    <button onClick={handleSave} className="text-xs text-primary font-bold">Save</button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                  <p className="text-sm font-semibold text-foreground">{user?.full_name || '—'}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="text-sm font-semibold text-foreground">{user?.email || '—'}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Phone</p>
                  {editing ? (
                    <input
                      value={editPhone}
                      onChange={e => setEditPhone(e.target.value)}
                      className="glass-input w-full rounded-lg px-3 py-2 text-sm outline-none focus:shadow-[0_0_0_2px_rgba(255,208,0,0.4)]"
                      placeholder="07X XXX XXXX"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-foreground">{phone || '—'}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={async () => { await logout(); navigate('/auth'); }}
              className="w-full glass rounded-2xl py-3 text-sm font-bold text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.length === 0 ? (
              <div className="glass-strong rounded-2xl p-8 text-center">
                <Package className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
                <h3 className="font-bold text-foreground mb-1">No orders yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Your order history will appear here.</p>
                <button onClick={() => navigate('/menu')} className="btn-primary px-6">
                  Browse Menu
                </button>
              </div>
            ) : (
              orders.map((order, i) => (
                <div
                  key={order.id}
                  className="glass-strong rounded-2xl p-4 animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-bold text-foreground">Order #{order.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString('en-ZA', {
                          day: 'numeric', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.type === 'bakery' ? `${item.qty}× ` : ''}{item.name}
                          {item.type === 'bakery' ? ` (${item.size})` : ''}
                        </span>
                        <span className="font-semibold">R{item.total}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="flex items-center justify-between pt-2"
                    style={{ borderTop: '1px solid var(--glass-border)' }}
                  >
                    <span className="font-black text-primary text-lg">R{order.total}</span>
                    <button
                      onClick={() => handleReorder(order)}
                      className="flex items-center gap-1.5 rounded-xl bg-primary/20 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/30 transition-colors"
                    >
                      <RefreshCw className="h-3 w-3" /> Re-order
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}