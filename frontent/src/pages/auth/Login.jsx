import { useState } from "react";
import { Star, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useLogin } from "../../hooks/mutations/useLogin";

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    login(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: (data) => {
          console.log("Login success:", data);
          // later:
          // save auth
          // redirect based on role
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#f3f4f6]">
      
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200/50 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200/50 rounded-full blur-[100px]" />
      <div className="absolute top-[40%] left-[40%] w-72 h-72 bg-[#D4F34A]/20 rounded-full blur-[80px]" />

      <div className="relative z-10 w-full max-w-md p-8 m-4">
        <div className="bg-white/60 backdrop-blur-2xl border border-white/60 shadow-xl rounded-3xl p-8 md:p-10">
          
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-8 h-8 fill-gray-900 text-gray-900" />
              <span className="text-2xl font-bold text-gray-900 tracking-wide">
                Starline
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome back!
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-gray-800 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4F34A]"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <span className="text-xs text-gray-500 cursor-pointer hover:text-gray-800">
                  Forgot Password?
                </span>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gray-800 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4F34A]"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-[#D4F34A] hover:bg-[#cbe846] text-gray-900 font-bold py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-60"
            >
              {isPending ? "Signing in..." : "Sign In"}
              {!isPending && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <span className="font-semibold text-gray-800">
                Contact Admin
              </span>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 Starline POS System. All rights reserved.
        </p>
      </div>
    </div>
  );
}
