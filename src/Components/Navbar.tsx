import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../Store/AuthStore";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signInWithGitHub, signOut } = useAuthStore();
  const displayUser = user?.user_metadata.name || user?.email;

  // Accent text styles
  const accentText = "text-orange-400";
  const accentBorder = "border-orange-400";
  const accentBgGradient = "bg-gradient-to-r from-orange-500 to-yellow-400";
  const accentBgGradientHover = "hover:from-orange-600 hover:to-yellow-500";
  const accentBgGradientReverse =
    "bg-gradient-to-tr from-orange-500 to-yellow-400";
  const accentBgGradientReverseMobile =
    "bg-gradient-to-tr from-orange-500 to-yellow-400";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black via-gray-900 to-gray-800 backdrop-blur-xl border-b border-orange-400/30 shadow-2xl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-2xl font-extrabold tracking-tight select-none"
          >
            <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-white bg-clip-text text-transparent drop-shadow-lg">
              Thread
            </span>
            <span className={`${accentText} drop-shadow-lg`}>ly</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {["Home", "Create Post", "Communities", "Create Community"].map(
              (text, idx) => (
                <Link
                  key={idx}
                  to={  
                    text === "Home"
                      ? "/"
                      : text === "Create Post"
                      ? "/create" // Explicit path for Create Post
                      : text === "Create Community"
                      ? "/community/create" // Explicit path for Create Community
                      : `/${text.toLowerCase().replace(/\s+/g, "")}`
                  }
                  className={`px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:${accentText} hover:bg-orange-500/10 transition-all duration-200`}
                >
                  {text}
                </Link>
              )
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="User Avatar"
                    className={`w-9 h-9 rounded-full object-cover border-2 ${accentBorder} shadow-md`}
                  />
                ) : (
                  <div
                    className={`w-9 h-9 rounded-full ${accentBgGradientReverse} flex items-center justify-center text-white font-bold text-lg shadow-md`}
                  >
                    {displayUser?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <span
                  className={`font-semibold truncate max-w-[120px] ${accentText}`}
                >
                  {displayUser}
                </span>
                <button
                  onClick={signOut}
                  className={`${accentBgGradient} ${accentBgGradientHover} text-white px-4 py-1.5 rounded-lg font-semibold shadow transition-all duration-200`}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGitHub}
                className="bg-gradient-to-r from-gray-700 to-black hover:from-black hover:to-gray-800 text-orange-300 px-4 py-1.5 rounded-lg font-semibold shadow transition-all duration-200 border border-orange-400/40"
              >
                Sign in with GitHub
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-gray-200 hover:text-orange-400 focus:outline-none p-2 rounded transition"
              aria-label="Toggle menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-b from-black via-gray-900 to-gray-800 border-t border-orange-400/30 shadow-xl animate-fade-in-down">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {["Home", "Create Post", "Communities", "Create Community"].map(
              (text, idx) => (
                <Link
                  key={idx}
                  to={
                    text === "Home"
                      ? "/"
                      : `/${text.toLowerCase().replace(/\s+/g, "")}`
                  }
                  className={`block px-4 py-2 rounded-lg text-base font-medium text-gray-200 hover:${accentText} hover:bg-orange-500/10 transition-all duration-200`}
                  onClick={() => setMenuOpen(false)}
                >
                  {text}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-orange-400/20">
              {user ? (
                <div className="flex items-center gap-3 mt-2">
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="User Avatar"
                      className={`w-8 h-8 rounded-full object-cover border-2 ${accentBorder} shadow`}
                    />
                  ) : (
                    <div
                      className={`w-8 h-8 rounded-full ${accentBgGradientReverseMobile} flex items-center justify-center text-white font-bold text-lg shadow`}
                    >
                      {displayUser?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span
                    className={`font-semibold truncate max-w-[100px] ${accentText}`}
                  >
                    {displayUser}
                  </span>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                    className={`ml-auto ${accentBgGradient} ${accentBgGradientHover} text-white px-3 py-1 rounded-lg font-semibold shadow transition-all duration-200`}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signInWithGitHub();
                  }}
                  className="w-full mt-2 bg-gradient-to-r from-gray-700 to-black hover:from-black hover:to-gray-800 text-orange-300 px-3 py-2 rounded-lg font-semibold shadow transition-all duration-200 border border-orange-400/40"
                >
                  Sign in with GitHub
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
