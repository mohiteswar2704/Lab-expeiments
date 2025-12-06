const byId = x => document.getElementById(x);
byId('go').onclick = () => {
  const name = (byId('name').value || 'Friend').trim();
  const mood = byId('mood').value;
  const h = new Date().getHours();
  const time = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  const note = mood==='happy'?'😊 Great to see you!' : mood==='calm'?'🌿 Take it easy.' : mood==='excited'?'🎉 Let’s go!' : '😴 Hope you rest soon.';
  const msg = byId('msg');
  msg.textContent = `${time}, ${name}! ${note}`;
  msg.classList.add('show','pulse');
  setTimeout(()=>msg.classList.remove('pulse'),1000);
};