const statusEl = document.getElementById('status');
const gridEl = document.getElementById('grid');
const loadBtn = document.getElementById('load-btn');
const refreshBtn = document.getElementById('refresh-btn');

function createCard(item){
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `<h3>${item.name}</h3><p>${item.country}</p>`;
  return div;
}

async function fetchDestinations(){
  statusEl.textContent = 'Loading destinations...';
  const res = await fetch('https://dummyjson.com/users?limit=8');
  const data = await res.json();
  statusEl.textContent = 'Destinations loaded.';
  return data.users.map(u => ({ name: 'Mohit', country: u.address?.country || 'Unknown' }));
}

function fetchWeather(city){
  return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(r => r.json())
    .then(post => translateToEnglish(post.title)
      .then(translated => ({ city, summary: 'Sunny', note: translated }))
    )
    .catch(() => ({ city, summary: 'Unknown', note: 'N/A' }));
}

function translateToEnglish(text){
  return Promise.resolve(text);
}

async function loadAll(){
  gridEl.innerHTML = '';
  const destinations = await fetchDestinations();

  fetchWeather(destinations[0]?.name || 'Unknown')
    .then(weather => {
      const info = document.createElement('div');
      info.className = 'status';
      info.textContent = `Weather for ${weather.city}: ${weather.summary} (note: ${weather.note})`;
      gridEl.before(info);
    })
    .finally(() => {
      for(let i=0;i<destinations.length;i++){
        gridEl.appendChild(createCard(destinations[i]));
      }
    });
}

loadBtn.addEventListener('click', loadAll);
refreshBtn.addEventListener('click', loadAll);
