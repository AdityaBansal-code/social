import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../Store/AuthStore";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signInWithGitHub, signOut } = useAuthStore();
  const displayUser = user?.user_metadata.name || user?.email;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#1a1333] via-[#221a3a] to-[#2d1e4d] backdrop-blur-xl border-b border-purple-700/30 shadow-2xl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-2xl font-extrabold text-white tracking-tight select-none"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
              Thread
            </span>
            <span className="text-purple-400 drop-shadow-lg">ly</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-purple-700/30 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-purple-700/30 transition-all duration-200"
            >
              Create Post
            </Link>
            <Link
              to="/communities"
              className="px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-purple-700/30 transition-all duration-200"
            >
              Communities
            </Link>
            <Link
              to="/community/create"
              className="px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-purple-700/30 transition-all duration-200"
            >
              Create Community
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full object-cover border-2 border-purple-400 shadow-md"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {displayUser?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <span className="text-gray-200 font-semibold truncate max-w-[120px]">{displayUser}</span>
                <button
                  onClick={signOut}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-1.5 rounded-lg font-semibold shadow transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGitHub}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-1.5 rounded-lg font-semibold shadow transition-all duration-200"
              >
                Sign in with GitHub
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-gray-200 hover:text-white focus:outline-none p-2 rounded transition"
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
        <div className="md:hidden bg-gradient-to-b from-[#1a1333] via-[#221a3a] to-[#2d1e4d] border-t border-purple-700/30 shadow-xl animate-fade-in-down">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-purple-700/30 transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/create"
              className="block px-4 py-2 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-purple-700/30 transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Create Post
            </Link>
            <Link
              to="/communities"
              className="block px-4 py-2 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-purple-700/30 transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Communities
            </Link>
            <Link
              to="/community/create"
              className="block px-4 py-2 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-purple-700/30 transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Create Community
            </Link>
            <div className="pt-3 border-t border-purple-700/20">
              {user ? (
                <div className="flex items-center gap-3 mt-2">
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover border-2 border-purple-400 shadow"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow">
                      {displayUser?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="text-gray-200 font-semibold truncate max-w-[100px]">{displayUser}</span>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                    className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-1 rounded-lg font-semibold shadow transition-all duration-200"
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
                  className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white px-3 py-2 rounded-lg font-semibold shadow transition-all duration-200"
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
