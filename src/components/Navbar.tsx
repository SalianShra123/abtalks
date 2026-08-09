import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageTransition } from '../context/TransitionContext';
import { useAuth } from '../context/AuthContext';
import { ViewModeState } from '../types';
import { Menu, X, Flame, Shield, User, AlertTriangle, ArrowRight, Sparkles, Film, LogIn, UserPlus, LogOut, LayoutDashboard, Trophy, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  viewMode: ViewModeState;
  setViewMode: (mode: ViewModeState) => void;
  streakDays?: number;
  currentDay?: number;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  setViewMode,
  streakDays = 12,
  currentDay = 12,
  onReplayIntro,
}) => {
  const location = useLocation();
  const { navigateWithTransition } = usePageTransition();
  const { isAuthenticated, user, signOut } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [edgeCaseMenuOpen, setEdgeCaseMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    navigateWithTransition(path);
  };

  const handleSignOut = () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    signOut();
    navigateWithTransition('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-zinc-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 group text-left focus:outline-none cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-bold text-sm shadow-md border border-zinc-700/50 group-hover:bg-indigo-950 transition-colors"
          >
            AB
          </motion.div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-900 tracking-tight text-base group-hover:text-indigo-600 transition-colors">
                ABTalks
              </span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 uppercase tracking-wider animate-pulse shadow-[0_0_10px_rgba(79,70,229,0.25)]">
                60 Days
              </span>
            </div>
            <span className="text-[10px] text-zinc-600 hidden sm:block">
              Visible Proof Platform
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => handleNavClick('/')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
              isActive('/')
                ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                : 'text-zinc-600 hover:text-indigo-600 hover:bg-indigo-50/80'
            }`}
          >
            Overview
          </button>
          
          <button
            onClick={() => handleNavClick('/dashboard')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 group ${
              isActive('/dashboard')
                ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                : 'text-zinc-600 hover:text-indigo-600 hover:bg-indigo-50/80'
            }`}
          >
            <span>Dashboard</span>
            <span className={`px-1.5 py-0.5 text-[10px] rounded-md font-mono transition-colors ${
              isActive('/dashboard')
                ? 'bg-indigo-950 text-indigo-200'
                : 'bg-zinc-200/80 text-zinc-700 group-hover:bg-indigo-100 group-hover:text-indigo-800'
            }`}>
              Day {currentDay}
            </span>
          </button>

          <button
            onClick={() => handleNavClick('/day/12')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
              isActive('/day/12')
                ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                : 'text-zinc-600 hover:text-indigo-600 hover:bg-indigo-50/80'
            }`}
          >
            Today's Challenge
          </button>
        </nav>

        {/* Right Side Controls & Auth Actions */}
        <div className="flex items-center gap-2">

          {/* Replay Intro Film Button */}
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white/80 hover:bg-indigo-50 hover:text-[#3b42c4] hover:border-indigo-200 text-xs font-semibold text-[#111111] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs hidden sm:flex"
              title="Replay Full-Screen Cinematic Film Intro"
            >
              <Film className="w-3.5 h-3.5 text-[#3b42c4]" />
              <span className="hidden lg:inline">Intro Film</span>
            </button>
          )}

          {/* Edge Case Preset Selector Dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setEdgeCaseMenuOpen(!edgeCaseMenuOpen)}
              className="px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white/80 hover:bg-indigo-50/90 hover:text-indigo-700 hover:border-indigo-200 text-xs font-medium text-zinc-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Test UX Edge Cases"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden lg:inline">State:</span>
              <span className="capitalize font-semibold text-zinc-900 group-hover:text-indigo-700">
                {viewMode === 'normal' ? 'Normal' : viewMode === 'firstDay' ? 'Day 01' : viewMode === 'missedDay' ? 'Missed Day' : 'Empty Profile'}
              </span>
            </button>

            <AnimatePresence>
              {edgeCaseMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 p-1.5 bg-white rounded-xl shadow-xl border border-zinc-200 z-50 text-xs"
                >
                  <div className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600 border-b border-zinc-100 mb-1">
                    UX Testing Presets
                  </div>

                  <button
                    onClick={() => { setViewMode('normal'); setEdgeCaseMenuOpen(false); }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center gap-2 ${
                      viewMode === 'normal' ? 'bg-indigo-50 text-indigo-900 font-semibold' : 'hover:bg-zinc-50 text-zinc-700'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <div>
                      <div>Normal Active State</div>
                      <div className="text-[10px] text-zinc-600">Day 12 • 12 Day Streak</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setViewMode('firstDay'); setEdgeCaseMenuOpen(false); }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center gap-2 ${
                      viewMode === 'firstDay' ? 'bg-indigo-50 text-indigo-900 font-semibold' : 'hover:bg-zinc-50 text-zinc-700'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 text-indigo-500" />
                    <div>
                      <div>First Day Mode</div>
                      <div className="text-[10px] text-zinc-600">Day 01 • Encouraging Start</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setViewMode('missedDay'); setEdgeCaseMenuOpen(false); }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center gap-2 ${
                      viewMode === 'missedDay' ? 'bg-indigo-50 text-indigo-900 font-semibold' : 'hover:bg-zinc-50 text-zinc-700'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <div>
                      <div>Missed Day Mode</div>
                      <div className="text-[10px] text-zinc-600">Day 11 Missed • Supportive UX</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setViewMode('emptyProfile'); setEdgeCaseMenuOpen(false); }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center gap-2 ${
                      viewMode === 'emptyProfile' ? 'bg-indigo-50 text-indigo-900 font-semibold' : 'hover:bg-zinc-50 text-zinc-700'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-zinc-600" />
                    <div>
                      <div>Empty Profile Mode</div>
                      <div className="text-[10px] text-zinc-600">New Builder Onboarding</div>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Streak Badge */}
          {viewMode !== 'firstDay' && (
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 font-semibold text-xs">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{streakDays}d Streak</span>
            </div>
          )}

          {/* ================= DESKTOP AUTHENTICATION CONTROLS ================= */}
          {!isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              {/* SIGN IN */}
              <motion.button
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleNavClick('/signin')}
                className="px-3.5 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-xs font-mono font-bold text-[#111111] transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-[#3b42c4]" />
                <span>SIGN IN</span>
              </motion.button>

              {/* SIGN UP */}
              <motion.button
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleNavClick('/signup')}
                className="px-4 py-1.5 rounded-lg bg-[#111111] hover:bg-[#3b42c4] text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1.5 group"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>SIGN UP</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          ) : (
            /* AUTHENTICATED USER PROFILE CONTROL */
            <div className="relative hidden md:block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl bg-white border border-zinc-200/90 shadow-2xs hover:border-indigo-300 hover:bg-indigo-50/40 transition-all cursor-pointer"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover border border-zinc-200"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-[#111111] text-white font-mono font-bold text-xs flex items-center justify-center">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                )}
                <span className="text-xs font-bold text-[#111111]">
                  {user?.name || 'Shravya'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 p-1.5 bg-white rounded-xl shadow-xl border border-zinc-200 z-50 text-xs"
                  >
                    <div className="px-3 py-2 border-b border-zinc-100 mb-1">
                      <div className="font-bold text-[#111111] truncate">{user?.name || 'Shravya'}</div>
                      <div className="text-[10px] text-zinc-500 font-mono truncate">{user?.email || 'shravya@example.com'}</div>
                      <div className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-50 text-[#3b42c4] border border-indigo-100">
                        {user?.track || 'Frontend Development'}
                      </div>
                    </div>

                    <button
                      onClick={() => handleNavClick('/dashboard')}
                      className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-zinc-700 hover:bg-zinc-50 font-medium cursor-pointer"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Dashboard</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('/day/12')}
                      className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-zinc-700 hover:bg-zinc-50 font-medium cursor-pointer"
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      <span>My Challenge (Day {currentDay})</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('/dashboard')}
                      className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-zinc-700 hover:bg-zinc-50 font-medium cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Profile</span>
                    </button>

                    <div className="my-1 border-t border-zinc-100" />

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-rose-600 hover:bg-rose-50 font-semibold cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-600" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg md:hidden text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-200 bg-white/95 backdrop-blur-xl px-4 py-4 space-y-3"
          >
            {/* Authenticated User Status Header on Mobile */}
            {isAuthenticated && user && (
              <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#111111] text-white font-mono font-bold text-xs flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#111111]">{user.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">{user.track}</div>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-rose-600 text-[11px] font-mono font-bold hover:bg-rose-50 flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Out</span>
                </button>
              </div>
            )}

            <div className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider px-1">
              Navigation
            </div>
            
            <button
              onClick={() => handleNavClick('/')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                isActive('/') ? 'bg-zinc-100 font-semibold text-zinc-900' : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <span>Product Overview</span>
              <span className="text-xs text-zinc-600">Home</span>
            </button>

            <button
              onClick={() => handleNavClick('/dashboard')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                isActive('/dashboard') ? 'bg-zinc-100 font-semibold text-zinc-900' : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <span>Personal Dashboard</span>
              <span className="text-xs font-mono text-indigo-600">Day {currentDay}</span>
            </button>

            <button
              onClick={() => handleNavClick('/day/12')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                isActive('/day/12') ? 'bg-zinc-100 font-semibold text-zinc-900' : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <span>Today's Challenge (Day 12)</span>
              <span className="text-xs text-zinc-600">REST API</span>
            </button>

            {/* Mobile Auth Actions */}
            {!isAuthenticated ? (
              <div className="pt-2 border-t border-zinc-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('/signin')}
                  className="py-2.5 px-3 rounded-xl border border-zinc-200 bg-white text-[#111111] text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#3b42c4]" />
                  <span>SIGN IN</span>
                </button>

                <button
                  onClick={() => handleNavClick('/signup')}
                  className="py-2.5 px-3 rounded-xl bg-[#111111] text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>SIGN UP</span>
                </button>
              </div>
            ) : null}

            {onReplayIntro && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between text-[#3b42c4] bg-indigo-50/60 hover:bg-indigo-50 font-semibold cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#3b42c4]" />
                  <span>Replay Film Intro</span>
                </div>
                <span className="text-xs text-[#3b42c4] font-mono font-bold">Watch</span>
              </button>
            )}

            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between px-2 text-xs text-zinc-600">
              <span>Streak: <strong className="text-amber-600">{streakDays} Days</strong></span>
              <span>Track: <strong className="text-zinc-800">{user?.track || 'Full Stack'}</strong></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
