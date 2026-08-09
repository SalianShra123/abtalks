import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePageTransition } from '../context/TransitionContext';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Lock, Mail, User, CheckCircle2, Sparkles, AlertCircle, Code } from 'lucide-react';

const TRACK_OPTIONS = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Data Science',
  'AI / Machine Learning',
  'Mobile Development',
  'Cloud & DevOps',
];

export const SignUpPage: React.FC = () => {
  const { navigateWithTransition } = usePageTransition();
  const { signUp, signInWithGoogle } = useAuth();

  const [fullName, setFullName] = useState('Shravya');
  const [email, setEmail] = useState('shravya@example.com');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [track, setTrack] = useState('Frontend Development');

  const [status, setStatus] = useState<'idle' | 'creating' | 'google_connecting' | 'success_signup' | 'success_google'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please check and try again.');
      return;
    }

    setErrorMessage('');
    setStatus('creating');

    await signUp(fullName, email, password, track);

    setStatus('success_signup');
    setTimeout(() => {
      navigateWithTransition('/dashboard');
    }, 600);
  };

  const handleGoogleSignUp = async () => {
    setErrorMessage('');
    setStatus('google_connecting');

    await signInWithGoogle();

    setStatus('success_google');
    setTimeout(() => {
      navigateWithTransition('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#faf9f6] flex flex-col justify-center items-center py-12 px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Subtle background ambient pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e4e0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg bg-white rounded-2xl border border-[#e5e4e0] shadow-xl p-6 sm:p-8 relative z-10"
      >
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.button
            onClick={() => navigateWithTransition('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-xl bg-[#111111] text-white flex items-center justify-center font-black text-lg shadow-md border border-zinc-800 mb-4 cursor-pointer"
          >
            AB
          </motion.button>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-[#3b42c4] text-[10px] font-mono font-bold uppercase tracking-widest mb-3 shadow-2xs inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#3b42c4]" />
            <span>Join 60-Day Challenge</span>
          </motion.span>

          <h1 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
            START YOUR 60-DAY JOURNEY
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#666666] mt-1">
            Create your ABTalks account and start building every day.
          </p>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Signup Form */}
        <form onSubmit={handleSignUpSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Shravya"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e5e4e0] bg-white text-sm text-[#111111] placeholder:text-zinc-400 focus:outline-none focus:border-[#3b42c4] focus:ring-2 focus:ring-[#3b42c4]/20 transition-all font-sans"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="shravya@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e5e4e0] bg-white text-sm text-[#111111] placeholder:text-zinc-400 focus:outline-none focus:border-[#3b42c4] focus:ring-2 focus:ring-[#3b42c4]/20 transition-all font-sans"
              />
            </div>
          </div>

          {/* Passwords row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e5e4e0] bg-white text-sm text-[#111111] placeholder:text-zinc-400 focus:outline-none focus:border-[#3b42c4] focus:ring-2 focus:ring-[#3b42c4]/20 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e5e4e0] bg-white text-sm text-[#111111] placeholder:text-zinc-400 focus:outline-none focus:border-[#3b42c4] focus:ring-2 focus:ring-[#3b42c4]/20 transition-all font-sans"
                />
              </div>
            </div>
          </div>

          {/* Coding Track Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
              Coding Track <span className="text-zinc-400 text-[10px] lowercase font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Code className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-[#e5e4e0] bg-white text-sm text-[#111111] focus:outline-none focus:border-[#3b42c4] focus:ring-2 focus:ring-[#3b42c4]/20 transition-all appearance-none cursor-pointer font-sans"
              >
                {TRACK_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-xs font-mono">
                ▼
              </div>
            </div>
          </div>

          {/* Create Account Submit Button */}
          <motion.button
            type="submit"
            disabled={status !== 'idle'}
            whileHover={{ scale: status === 'idle' ? 1.01 : 1, y: status === 'idle' ? -1 : 0 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-xl font-mono font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
              status === 'creating'
                ? 'bg-zinc-800 text-white cursor-wait'
                : status === 'success_signup'
                ? 'bg-emerald-600 text-white'
                : 'bg-[#111111] hover:bg-[#3b42c4] text-white'
            }`}
          >
            {status === 'creating' ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>CREATING ACCOUNT...</span>
              </>
            ) : status === 'success_signup' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                <span>ACCOUNT CREATED ✓</span>
              </>
            ) : (
              <>
                <span>CREATE ACCOUNT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e5e4e0]" />
          </div>
          <span className="relative px-3 bg-white font-mono text-[11px] font-bold text-zinc-400 uppercase">
            OR
          </span>
        </div>

        {/* Google Sign In */}
        <motion.button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={status !== 'idle'}
          whileHover={{ scale: status === 'idle' ? 1.01 : 1, y: status === 'idle' ? -1 : 0 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-2.5 px-4 rounded-xl border border-[#e5e4e0] bg-white hover:bg-zinc-50/80 text-[#111111] font-mono text-xs font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-2xs ${
            status === 'google_connecting'
              ? 'bg-indigo-50 border-indigo-200 text-[#3b42c4]'
              : status === 'success_google'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : ''
          }`}
        >
          {status === 'google_connecting' ? (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-[#3b42c4]/30 border-t-[#3b42c4] animate-spin" />
              <span>CONNECTING TO GOOGLE...</span>
            </>
          ) : status === 'success_google' ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span>GOOGLE ACCOUNT CONNECTED ✓</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </motion.button>

        {/* Footer Link */}
        <div className="mt-8 pt-4 border-t border-zinc-100 text-center">
          <p className="text-xs font-medium text-[#666666]">
            Already have an account?{' '}
            <button
              onClick={() => navigateWithTransition('/signin')}
              className="font-mono font-bold text-[#3b42c4] hover:underline cursor-pointer uppercase tracking-wider"
            >
              SIGN IN
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
