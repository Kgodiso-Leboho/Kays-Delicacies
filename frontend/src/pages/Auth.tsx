import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { UtensilsCrossed, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [tab, setTab] = useState<'login' | 'signup'>(
    searchParams.get('tab') === 'signup' ? 'signup' : 'login'
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (email && password) {
        toast.success('Logged in successfully!');
        navigate('/menu');
      } else {
        toast.error('Invalid credentials');
      }
    }, 1000);
  };

  // Mock signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (email && password && fullName) {
        toast.success('Account created successfully!');
        setTab('login');
      } else {
        toast.error('Please fill in all fields');
      }
    }, 1000);
  };

  return (
    <>
      <div className="mesh-bg" />
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md animate-scale-in">

          {/* Back */}
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="glass-strong rounded-3xl p-8">

            {/* Logo */}
            <div className="mb-6 flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
                <UtensilsCrossed className="h-7 w-7 text-primary" />
              </div>

              <h1 className="text-2xl font-black">
                {tab === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>

              <p className="text-sm text-muted-foreground">
                {tab === 'login'
                  ? 'Sign in to your account'
                  : 'Join Kays Delicacies today'}
              </p>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex rounded-xl glass p-1">
              {(['login', 'signup'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 rounded-lg py-2 text-sm font-bold capitalize transition-all ${
                    tab === t
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground'
                  }`}
                >
                  {t === 'login' ? 'Login' : 'Sign Up'}
                </button>
              ))}
            </div>

            <form
              onSubmit={tab === 'login' ? handleLogin : handleSignup}
              className="space-y-4"
            >
              {tab === 'signup' && (
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name"
                    required
                    className="glass-input w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="glass-input w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  minLength={6}
                  className="glass-input w-full rounded-xl py-3 pl-10 pr-10 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-3.5 text-muted-foreground"
                >
                  {showPw ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading
                  ? 'Please wait...'
                  : tab === 'login'
                  ? 'Sign In'
                  : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}