// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBkGrdvukwz773inAwTz7IfUctMEieKCspp7zEdNbvic8sjajD2Rmx3VX-5LSAERPtCycsCS05u7z6it7h2VsUu9C7AMggJBFyjN3tv1SGhJ3BoG-tqrVOHi1dKfv5bxEHVc_AS1o8lLQYSJlTNolHuwObwEa72AgCirURg-d05QdTv3VebXgSrKCuWJFlMJpKuy6BRVk1jQx6Lj76cSYC3AOU0Og_OvgKftaX7zC1F0vEkrAoeIA2jVBWkpEq_nadlCBzr5NaiRRQKmzl7pFwsF5K1yCBF';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);