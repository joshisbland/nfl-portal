"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    fetch("/api/players")
      .then(res => res.json())
      .then(setPlayers);
  }, []);

  const filtered = players.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (!position || p.position === position)
  );

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">NFL Portal Tracker</h1>

      <input
        placeholder="Search player..."
        className="p-2 rounded bg-slate-800 mb-4"
        onChange={e => setSearch(e.target.value)}
      />

      <select
        className="p-2 rounded bg-slate-800 mb-6"
        onChange={e => setPosition(e.target.value)}
      >
        <option value="">All Positions</option>
        <option value="QB">QB</option>
        <option value="WR">WR</option>
        <option value="RB">RB</option>
      </select>

      <div className="grid gap-4">
        {filtered.map(player => (
          <div key={player.id} className="bg-slate-800 p-4 rounded-xl">
            <h2 className="text-xl">{player.name}</h2>
            <p>{player.position} • {player.team}</p>
            <p className="text-sky-400">{player.status}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
