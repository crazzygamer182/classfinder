import { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim()) {
      onLogin(password.trim());
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <h2 className="text-lg font-bold text-gray-700 text-center">Admin Login</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          autoFocus
        />
        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold
                     py-2.5 rounded-lg text-sm transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
