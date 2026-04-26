export async function GET() {
  try {
    const res = await fetch(
      "https://site.api.espn.com/apis/v2/sports/football/nfl/athletes"
    );

    const data = await res.json();

    const players = data.items.map(p => ({
      id: p.id,
      name: p.fullName,
      position: p.position?.abbreviation || "N/A",
      team: p.team?.displayName || "Free Agent",
      status: ["Free Agent", "Signed", "Traded"][
        Math.floor(Math.random() * 3)
      ]
    }));

    return Response.json(players);
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
