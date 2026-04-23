import { ShoppingCart, User } from 'lucide-react';
import { useStore } from '../lib/store';
import { Link, useLocation } from 'react-router-dom';
import kdLogo from '../assets/kd-logo.png';

export function Header() {
  const { cart, toggleCart } = useStore();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const itemCount = cart.length;
  const total = cart.reduce((s, c) => s + c.total, 0);

  return (
    <header className="sticky top-0 z-40 glass-strong">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={kdLogo} alt="KD" className="h-9 w-9 rounded-xl transition-transform duration-200 group-hover:scale-110" />
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            Kay's Delicacies
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          {isAdmin ? (
            <Link
              to="/"
              className="glass rounded-xl px-4 py-2 text-sm font-semibold text-foreground transition-all duration-200 hover:scale-105"
            >
              Back to Menu
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                className="flex items-center justify-center glass rounded-xl p-2.5 transition-all duration-200 hover:scale-105"
              >
                <User className="h-5 w-5 text-foreground" />
              </Link>
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 glass rounded-xl px-4 py-2.5 transition-all duration-200 hover:scale-105"
              >
                <ShoppingCart className="h-5 w-5 text-foreground" />
                {itemCount > 0 && (
                  <>
                    <span className="text-sm font-bold text-primary">R{total}</span>
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {itemCount}
                    </span>
                  </>
                )}
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
