export async function GET() {
  const res = await fetch(
    "https://site.api.espn.com/apis/v2/sports/football/nfl/statistics"
  );

  const data = await res.json();

  const stats = data?.categories?.[0]?.athletes?.map(a => ({
    name: a.athlete?.displayName,
    team: a.team?.displayName,
    stats: {
      yards: a.stats?.[0] || 0,
      touchdowns: a.stats?.[1] || 0
    }
  })) || [];

  return Response.json(stats);
}
