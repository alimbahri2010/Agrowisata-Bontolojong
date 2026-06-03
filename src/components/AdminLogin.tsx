import React, { useState } from "react";
import { KeyRound, Mail, AlertCircle, ShieldCheck, CornerDownLeft, Lock } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: (role: string, email: string) => void;
  setView: (view: "landing" | "booking" | "login" | "dashboard") => void;
  settings?: any;
}

export default function AdminLogin({ onLoginSuccess, setView, settings }: AdminLoginProps) {
  const targetUsername = settings?.adminUsername || "admin";
  const targetPassword = settings?.adminPassword || "bontolojong";

  const [email, setEmail] = useState(targetUsername);
  const [password, setPassword] = useState(targetPassword);
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [isForgot, setIsForgot] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [recoverySent, setRecoverySent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple authentication
    if (email === targetUsername && password === targetPassword) {
      onLoginSuccess(selectedRole, email);
    } else {
      setErrorMsg(`Kredensial tidak valid. Silakan gunakan: ${targetUsername} / password: ${targetPassword}`);
    }
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoverySent(true);
    setTimeout(() => {
      setRecoverySent(false);
      setIsForgot(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream/15 px-4 relative overflow-hidden" id="admin-login-root">
      
      {/* Absolute Aesthetic Background Blur Blobs */}
      <div className="absolute top-1/4 -left-12 w-64 h-64 bg-mustard/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-tangerine/10 rounded-full blur-3xl animate-pulse" />

      {/* Main Glassmorphic Wrapper */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 card-shadow p-8 sm:p-10 relative">
        
        {/* Top Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-mustard to-tangerine flex items-center justify-center text-white mb-4 shadow-md">
            <Lock className="w-5 h-5 animate-pulse-soft" />
          </div>
          <h2 className="text-2xl font-display font-medium text-charcoal tracking-tight uppercase text-center">
            {isForgot ? "PEMULIHAN KUNCI" : "PORTAL KEAMANAN STAF"}
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-1 text-center">
            {isForgot ? "Otorisasi PIN pemulihan administrasi keamanan standar" : "Masuk dengan akun terdaftar untuk mengelola sistem informasi."}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-sans flex items-start space-x-2">
            <AlertCircle className="w-4.5 h-4.5 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isForgot ? (
          /* Forgot Password Area */
          <form onSubmit={handleRecovery} className="space-y-4">
            {recoverySent ? (
               <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-center text-xs font-sans flex items-center justify-center gap-2">
                <span>✓ Kode pemulihan aktif telah diteruskan ke layar <strong>Siti Rahma</strong>.</span>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Email Terdaftar</label>
                  <div className="relative">
                    <input
                      required
                      type="email"
                      className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 pl-10 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard"
                      placeholder="contoh: admin@bontolojong.gov"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Mail className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-charcoal hover:bg-brown text-white font-sans text-xs font-bold uppercase tracking-widest rounded-full shadow-md transition-all cursor-pointer text-center"
                >
                  Kirimkan PIN Penyelamat
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsForgot(false)}
              className="mt-6 w-full text-center text-xs text-slate-500 font-mono flex items-center justify-center space-x-1 hover:text-mustard transition-all cursor-pointer"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
              <span>Kembali ke menu login utama</span>
            </button>
          </form>
        ) : (
          /* Standard Login Form */
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div>
              <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Username Administrasi</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 pl-10 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard focus:bg-white"
                  placeholder="admin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[10px] font-mono text-brown uppercase font-bold">Kunci Sandi Akses</label>
                <button
                  type="button"
                  onClick={() => setIsForgot(true)}
                  className="text-[9px] font-mono text-tangerine hover:underline cursor-pointer"
                >
                  Lupa Sandi?
                </button>
              </div>
              <div className="relative">
                <input
                  required
                  type="password"
                  className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 pl-10 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard focus:bg-white"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <KeyRound className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>



            {/* Default credentials hint panel */}
            <div className="p-3 bg-amber-50/50 rounded-xl border border-mustard/15 text-[10px] text-brown font-sans leading-relaxed flex items-center space-x-2 select-none">
              <ShieldCheck className="w-4 h-4 text-mustard shrink-0" />
              <p>
                <strong>Petunjuk Masuk:</strong> Akun default telah terisi otomatis. Kunci: <code>{targetUsername}</code> + sandi: <code>{targetPassword}</code>.
              </p>
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-3.5 bg-gradient-to-r from-mustard to-tangerine hover:from-tangerine hover:to-mustard text-white font-sans text-xs font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2 text-center"
            >
              <span>BUKA DASHBOARD KEAMANAN</span>
            </button>
          </form>
        )}

        {/* Back to Home shortcut */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <button
            onClick={() => setView("landing")}
            className="text-xs text-slate-500 hover:text-slate-800 font-sans transition-colors cursor-pointer"
          >
            ← Kembali ke Menu Utama Web
          </button>
        </div>

      </div>
    </div>
  );
}
