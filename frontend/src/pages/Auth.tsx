import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

function FloatingInput({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        required
        placeholder=" "
        className="peer w-full px-4 pt-5 pb-2 rounded-xl 
        bg-white/5 border border-white/10 
        text-white outline-none 
        focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30
        transition"
      />
      <label
        className="absolute left-4 top-2 text-gray-400 text-xs 
        transition-all peer-placeholder-shown:top-3.5 
        peer-placeholder-shown:text-sm 
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-yellow-400"
      >
        {label}
      </label>
    </div>
  );
}

export default function Auth() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success(tab === "login" ? "Welcome back!" : "Account created!");
      if (tab === "login") navigate("/menu");
      else setTab("login");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#FFFFFF] overflow-hidden">

      {/* 🌌 Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 w-[600px] h-[600px] bg-yellow-400/20 blur-[120px] rounded-full -translate-x-1/2" />
        <div className="absolute bottom-[-20%] right-1/3 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      {/* 🪞 Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl 
        bg-white/10 backdrop-blur-xl 
        border border-white/20 
        shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
      >

        {/* 🔰 Branding */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/40" />
          <h1 className="text-yellow-400 text-2xl font-bold mt-4">
            Kays Delicacies
          </h1>
          <p className="text-gray-400 text-sm">
            {tab === "login"
              ? "Welcome back, sign in to continue"
              : "Create your account"}
          </p>
        </div>

        {/* 🔄 Tabs */}
        <div className="flex bg-white/5 p-1 rounded-xl mb-6">
          {["login", "signup"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${
                tab === t
                  ? "bg-yellow-400 text-black shadow-md"
                  : "text-gray-400"
              }`}
            >
              {t === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* 🧾 Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {tab === "signup" && (
            <FloatingInput label="Full Name" />
          )}

          <FloatingInput label="Email Address" type="email" />

          <div className="relative">
            <FloatingInput
              label="Password"
              type={showPw ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* 🔘 Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold 
            bg-yellow-400 text-black 
            shadow-lg shadow-yellow-400/40
            hover:brightness-110 transition"
          >
            {loading ? "Processing..." : tab === "login" ? "Sign In" : "Create Account"}
          </motion.button>
        </form>

        {/* 🔁 Switch */}
        <p className="text-center text-sm text-gray-400 mt-6">
          {tab === "login" ? (
            <>
              No account?{" "}
              <button
                onClick={() => setTab("signup")}
                className="text-yellow-400 font-medium"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have one?{" "}
              <button
                onClick={() => setTab("login")}
                className="text-yellow-400 font-medium"
              >
                Login
              </button>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}