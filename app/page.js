"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [tab, setTab] = useState("portal");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/players")
      .then(res => res.json())
      .then(setPlayers);
  }, []);

  const filtered = players.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const rank = (pos) => {
    const map = { QB: 96, WR: 88, RB: 87, TE: 82 };
    return map[pos] || 75;
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-white">

      {/* HEADER */}
      <header className="sticky top-0 bg-[#0b1020]/90 backdrop-blur border-b border-white/10 p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl tracking-wide">NFL PORTAL</h1>

        <input
          className="bg-white/5 px-3 py-2 rounded-lg text-sm outline-none w-64"
          placeholder="Search players..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {/* TABS */}
      <div className="flex gap-6 px-6 pt-4 text-sm">
        {["portal", "teams", "rankings"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 border-b-2 transition ${
              tab === t
                ? "border-blue-400 text-white"
                : "border-transparent text-white/50"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <main className="p-6">
        {tab === "portal" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => (
              <div
                key={p.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold">{p.name}</h2>
                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                    {p.position}
                  </span>
                </div>

                <p className="text-white/60 text-sm">{p.team}</p>

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-white/40">{p.status}</span>
                  <span className="text-yellow-400 font-bold">
                    {rank(p.position)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "teams" && (
          <div className="text-white/70">
            Try: /teams/giants, /teams/chiefs, /teams/cowboys
          </div>
        )}

        {tab === "rankings" && (
          <div className="text-white/70">
            Player rankings system coming (we can build sortable tiers next)
          </div>
        )}
      </main>
    </div>
  );
}
