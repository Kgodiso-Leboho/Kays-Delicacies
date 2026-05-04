import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Clock, MapPin, Star} from 'lucide-react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
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
        <div className="container flex items-center justify-between py-4 px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={kdLogo} alt="KD" className="h-10 w-10 rounded-xl" />
            <span className="text-xl font-black tracking-tight text-foreground">Kays Delicacies</span>
          </Link>

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
        <div className="container pt-16 pb-8 md:pt-24 md:pb-12 px-4 md:px-8">
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

      {/* ── NEW: How It Works ── */}
      <section className="py-20 md:py-28 bg-card/20">
        <div className="container px-4 md:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="inline-block rounded-full border border-border/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-4">
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
              Order in 3 easy steps.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 relative">
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-border/50" />
            {[
              { step: '01', title: 'Browse the Menu', desc: 'Explore our full range of kotas, dagwoods, scones, and bakery buckets.' },
              { step: '02', title: 'Customise Your Order', desc: 'Pick your fillings, add-ons, and quantity — exactly the way you like it.' },
              { step: '03', title: 'Collect or Get Delivered', desc: 'Choose a pickup time or delivery, pay securely, and enjoy!' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20">
                  <span className="text-3xl font-black text-primary">{s.step}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-8">
          <div className="max-w-xl">
            <span className="inline-block rounded-full border border-border/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-4">
              Why Choose Us?
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
              Elevate your food experience.
            </h2>
          </div>

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

      {/* ── NEW: Featured Menu Items ── */}
      <section className="py-20 md:py-28 bg-card/20">
        <div className="container px-4 md:px-8">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <span className="inline-block rounded-full border border-border/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-4">
                Featured Items
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
                Customer favourites.
              </h2>
            </div>
            <Link to="/menu" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
              View Full Menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Classic Kota', desc: 'Quarter loaf, polony, chips & atchar', price: 'R25', tag: 'Best Seller', img: kotaHero },
              { name: 'Loaded Dagwood', desc: 'Egg, cheese, lettuce, tomato & meat', price: 'R55', tag: 'Popular', img: dagwoodHero },
              { name: 'Scone Bucket (12)', desc: 'Fresh plain or raisin scones', price: 'R80', tag: 'Bulk Deal', img: sconesHero },
              { name: 'Biscuit Bucket (24)', desc: 'Assorted homemade biscuits', price: 'R100', tag: 'Great Value', img: biscuitsHero },
            ].map((item) => (
              <Link
                key={item.name}
                to="/auth?tab=signup"
                className="group rounded-2xl border border-border/30 bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative bg-muted/30 flex items-center justify-center h-44">
                  <img src={item.img} alt={item.name} className="h-36 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    {item.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground">{item.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-black text-primary">{item.price}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground bg-primary/10 rounded-full px-3 py-1">
                      Order <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Strip */}
      <section className="border-y border-border/30 bg-card/30">
        <div className="container py-12 px-4 md:px-8 grid gap-8 md:grid-cols-3">
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

      {/* ── NEW: Testimonials ── */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="inline-block rounded-full border border-border/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-4">
              Reviews
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
              What our customers say.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: 'Thabo M.', review: 'The kota is absolutely fire! Best I have had in the whole township. Always fresh and loaded generously.', rating: 5 },
              { name: 'Lerato K.', review: 'Ordered scone buckets for our office and everyone was raving. Will definitely be a regular order from now on!', rating: 5 },
              { name: 'Sipho D.', review: 'The dagwood sandwich is huge and worth every cent. Delivery was on time and everything was still warm.', rating: 4 },
            ].map((t) => (
              <div key={t.name} className="rounded-3xl border border-border/30 bg-card p-6 flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">"{t.review}"</p>
                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-border/30">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-black text-primary">
                    {t.name[0]}
                  </div>
                  <span className="text-sm font-bold text-foreground">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-8">
          <div className="rounded-3xl bg-foreground p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-background">Ready to Dig In?</h2>
            <p className="mt-4 text-background/60 text-lg">Create an account and place your first order in minutes.</p>
            <Link to="/auth?tab=signup" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground text-base transition-all hover:scale-105 shadow-lg">
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── UPDATED: Footer with social links ── */}
      <footer className="border-t border-border/30 py-10">
        <div className="container px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={kdLogo} alt="KD" className="h-8 w-8 rounded-lg" />
            <span className="text-sm font-black tracking-tight text-foreground">Kays Delicacies</span>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kays Delicacies. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-card/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors">
              <FaInstagram className="h-4 w-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-card/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors">
              <FaFacebookF className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-card/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors">
              <FaTwitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}