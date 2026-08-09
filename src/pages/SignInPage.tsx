import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePageTransition } from '../context/TransitionContext';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Lock, Mail, Eye, EyeOff, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

export const SignInPage: React.FC = () => {
  const { navigateWithTransition } = usePageTransition();
  const { signIn, signInWithGoogle, forgotPassword } = useAuth();

  const [email, setEmail] = useState('shravya@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  // Status states: 'idle' | 'signing_in' | 'google_connecting' | 'success_signin' | 'success_google'
  const [status, setStatus] = useState<'idle' | 'signing_in' | 'google_connecting' | 'success_signin' | 'success_google'>('idle');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }
    setErrorMessage('');
    setStatus('signing_in');

    await signIn(email, password);

    setStatus('success_signin');
    setTimeout(() => {
      navigateWithTransition('/dashboard');
    }, 600);
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setStatus('google_connecting');

    await signInWithGoogle();

    setStatus('success_google');
    setTimeout(() => {
      navigateWithTransition('/dashboard');
    }, 600);
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your email above to receive password reset instructions.');
      return;
    }
    setErrorMessage('');
    setForgotLoading(true);
    await forgotPassword(email);
    setForgotLoading(false);
    setForgotSent(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#faf9f6] flex flex-col justify-center items-center py-12 px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e4e0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white rounded-2xl border border-[#e5e4e0] shadow-xl p-6 sm:p-8 relative z-10"
      >
        {/* Brand Mark Header */}
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
            <span>ABTalks Platform</span>
          </motion.span>

          <h1 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
            WELCOME BACK
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#666666] mt-1">
            Continue your 60-day journey.
          </p>
        </div>

        {/* Forgot Password Banner Toast */}
        <AnimatePresence>
          {forgotSent && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-emerald-950">Password reset link sent!</strong>
                <span>We sent a realistic mock reset link to <strong className="font-semibold">{email}</strong>. Check your inbox.</span>
              </div>
            </motion.div>
          )}

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

        {/* Form Container */}
        <form onSubmit={handleSignInSubmit} className="space-y-4">
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-1.5"
          >
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
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={forgotLoading}
                className="text-xs font-mono text-[#3b42c4] hover:underline font-semibold cursor-pointer"
              >
                {forgotLoading ? 'Sending...' : 'Forgot password?'}
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#e5e4e0] bg-white text-sm text-[#111111] placeholder:text-zinc-400 focus:outline-none focus:border-[#3b42c4] focus:ring-2 focus:ring-[#3b42c4]/20 transition-all font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer p-0.5"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          {/* Primary Submit Button */}
          <motion.button
            type="submit"
            disabled={status !== 'idle'}
            whileHover={{ scale: status === 'idle' ? 1.01 : 1, y: status === 'idle' ? -1 : 0 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-xl font-mono font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
              status === 'signing_in'
                ? 'bg-zinc-800 text-white cursor-wait'
                : status === 'success_signin'
                ? 'bg-emerald-600 text-white'
                : 'bg-[#111111] hover:bg-[#3b42c4] text-white'
            }`}
          >
            {status === 'signing_in' ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>SIGNING IN...</span>
              </>
            ) : status === 'success_signin' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                <span>SIGNED IN ✓</span>
              </>
            ) : (
              <>
                <span>SIGN IN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </motion.button>
        </form>

        {/* OR Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e5e4e0]" />
          </div>
          <span className="relative px-3 bg-white font-mono text-[11px] font-bold text-zinc-400 uppercase">
            OR
          </span>
        </div>

        {/* Continue with Google Button */}
        <motion.button
          type="button"
          onClick={handleGoogleSignIn}
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
              {/* Official Google G Logo SVG */}
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

        {/* Footer Toggle Link */}
        <div className="mt-8 pt-4 border-t border-zinc-100 text-center">
          <p className="text-xs font-medium text-[#666666]">
            Don't have an account?{' '}
            <button
              onClick={() => navigateWithTransition('/signup')}
              className="font-mono font-bold text-[#3b42c4] hover:underline cursor-pointer uppercase tracking-wider"
            >
              SIGN UP
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
