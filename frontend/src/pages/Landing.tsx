import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Clock, MapPin } from 'lucide-react';
import kdLogo from '../assets/kd-logo.png';
import kotaHero from '../assets/biscuits-hero.png';
import sconesHero from '../assets/scones-hero.png';
import biscuitsHero from '../assets/biscuits-hero.png';
import dagwoodHero from '../assets/dagwood-hero.png';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={kdLogo} alt="KD" className="h-10 w-10 rounded-xl" />
            <span className="text-xl font-black tracking-tight text-foreground">Kays Delicacies</span>
          </Link>

          {/* Centered pill nav */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/50 bg-card/50 px-2 py-1.5">
            <Link to="/" className="rounded-full px-4 py-1.5 text-sm font-semibold text-foreground bg-primary/10">Home</Link>
            <Link to="/menu" className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Menu</Link>
            <Link to="/auth" className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Login</Link>
          </nav>

          <Link to="/auth?tab=signup" className="btn-primary !py-2.5 !px-6 text-sm">
            Order Now
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container pt-16 pb-8 md:pt-24 md:pb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-foreground">
              Delicious Homemade <span className="text-primary">Kotas & Bakes</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md mx-auto">
              Experience the best local street food and freshly baked treats. Your perfect meal is just a click away!
            </p>
            <div className="mt-8">
              <Link to="/auth?tab=signup" className="btn-primary inline-flex items-center gap-2 text-base">
                Discover More <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product showcase - floating images */}
          <div className="mt-12 flex items-end justify-center gap-4 md:gap-8">
            <div className="w-36 md:w-52 animate-float" style={{ animationDelay: '0.5s' }}>
              <img src={sconesHero} alt="Fresh Scones" className="w-full drop-shadow-2xl" />
            </div>
            <div className="w-44 md:w-64 -mb-2">
              <img src={kotaHero} alt="Loaded Kota" className="w-full drop-shadow-2xl" />
            </div>
            <div className="w-40 md:w-56 animate-float" style={{ animationDelay: '1s' }}>
              <img src={dagwoodHero} alt="Dagwood Sandwich" className="w-full drop-shadow-2xl" />
            </div>
            <div className="hidden md:block w-44 animate-float" style={{ animationDelay: '1.5s' }}>
              <img src={biscuitsHero} alt="Biscuits" className="w-full drop-shadow-2xl" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-xl">
            <span className="inline-block rounded-full border border-border/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-4">
              Why Choose Us?
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
              Elevate your food experience.
            </h2>
          </div>

          {/* Category Cards */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { img: kotaHero, title: 'Kotas & Chips', desc: 'Loaded with fresh ingredients and gourmet add-ons', color: 'from-amber-100 to-orange-50' },
              { img: dagwoodHero, title: 'Dagwood Sandwiches', desc: 'Stacked high with premium meats, cheese and more', color: 'from-green-50 to-emerald-50' },
              { img: biscuitsHero, title: 'Bakery Treats', desc: 'Freshly baked scones and biscuits in bulk buckets', color: 'from-rose-50 to-pink-50' },
            ].map((cat) => (
              <Link
                key={cat.title}
                to="/auth?tab=signup"
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br border border-border/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-60`} />
                <div className="relative p-6">
                  <span className="inline-block rounded-full bg-background/80 backdrop-blur-sm px-4 py-1.5 text-sm font-bold text-foreground border border-border/30">
                    {cat.title}
                  </span>
                  <div className="mt-4 flex justify-center">
                    <img src={cat.img} alt={cat.title} className="h-48 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{cat.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-foreground">
                    Discover More <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Strip */}
      <section className="border-y border-border/30 bg-card/30">
        <div className="container py-12 grid gap-8 md:grid-cols-3">
          {[
            { icon: ShoppingBag, title: 'Easy Ordering', desc: 'Browse, customize, and order in minutes' },
            { icon: Clock, title: 'Fresh Daily', desc: 'Everything made fresh to order, every single day' },
            { icon: MapPin, title: 'Delivery or Collection', desc: 'Choose what works best for you' },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="rounded-3xl bg-foreground p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-background">Ready to Dig In?</h2>
            <p className="mt-4 text-background/60 text-lg">Create an account and place your first order in minutes.</p>
            <Link to="/auth?tab=signup" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground text-base transition-all hover:scale-105 shadow-lg">
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Kays Delicacies. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
