const gameForm = document.getElementById("gameForm");
const gameList = document.getElementById("gameList");

async function fetchGames() {
  const res = await fetch("/api/games");
  const games = await res.json();
  gameList.innerHTML = games.map(game => `
    <div class="game-card">
      <h3>${game.name}</h3>
      <p><strong>Main Story:</strong> ${game.mainStoryHours} hrs</p>
      <p><strong>Completionist:</strong> ${game.completionistHours} hrs</p>
      <p><strong>Platform:</strong> ${game.platform}</p>
      <p><strong>Multiplayer:</strong> ${game.multiplayer ? 'Yes' : 'No'}</p>
    </div>
  `).join('');
}

gameForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById("name").value,
    mainStoryHours: Number(document.getElementById("mainStoryHours").value),
    completionistHours: Number(document.getElementById("completionistHours").value),
    platform: document.getElementById("platform").value,
    multiplayer: document.getElementById("multiplayer").value === "true"
  };

  await fetch("/api/games", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  gameForm.reset();
  fetchGames();
});

fetchGames();
