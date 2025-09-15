document.addEventListener('DOMContentLoaded', () => {

  const ROWS = 9;
  const COLS = 15;
  const PRICE = 440; 

 
  const params = new URLSearchParams(window.location.search);
  const filmID = params.get("id");                 
  const container = document.getElementById("film");

  let film = null;
  for (const day in postItms) {
    const arr = Array.isArray(postItms[day]) ? postItms[day] : [];
    const hit = arr.find(f => f.id === filmID);
    if (hit) { film = hit; break; }
  }

  if (!film) {
    container.textContent = "Произошла ошибка 404, фильм не найден!";
    return;
  }


  container.innerHTML = `
    <h1>${film.name || film.id}</h1>
    <div class="cont_film">
      <div class="post_film"><img src="${film.src}" alt="${film.alt || ""}"></div>
      <div class="info_film">
        <p><strong>Дата выхода:</strong> ${film.data || "-"}</p>
        <p><strong>Продолжительность:</strong> ${film.tim || "-"}</p>
        <p>${film.synopsis || "Описание будет добавлено позднее"}</p>
        <button class="btn-glow" id="openSeatsBtn">Купить</button>
      </div>
    </div>
  `;

 
  const modal = document.getElementById('seatModal');
  const hall  = document.getElementById('seat-hall');
  const labels= document.getElementById('seat-rowLabels');
  const selectedCountEl = document.getElementById('selectedCount');
  const priceEl = document.getElementById('price');
  const totalEl = document.getElementById('total');
  const payBtn = document.getElementById('payBtn');

  priceEl.textContent = PRICE; 

  const occupiedByFilm = {
    'hunger-game': ['1-7','1-8','3-5','5-10'],
    // 'batman': [...],
    // и тд
  };
  const occupiedSet = new Set(occupiedByFilm[film.id] || []);

  // открыть модалку
  document.getElementById('openSeatsBtn').addEventListener('click', () => {
    openModal();
    renderHall();      
    renderLabels();   
    updateSummary();   
  });

 
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

  function openModal(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); }
  function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }

  
  function renderHall(){
    hall.innerHTML = ''; // очистим 
    const frag = document.createDocumentFragment();

    for (let r = 1; r <= ROWS; r++){
      for (let c = 1; c <= COLS; c++){
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'seat';
        btn.dataset.row = r;
        btn.dataset.col = c;
        btn.title = `Ряд ${r}, место ${c}`;

        if (occupiedSet.has(`${r}-${c}`)) btn.classList.add('occupied');

        frag.appendChild(btn);
      }
    }
    hall.appendChild(frag);
  }

  // подписи 
  function renderLabels(){
    labels.innerHTML = '';
    const lf = document.createDocumentFragment();
    for (let c = 1; c <= COLS; c++){
      const d = document.createElement('div');
      d.textContent = c;
      lf.appendChild(d);
    }
    labels.appendChild(lf);
  }

  
  hall.addEventListener('click', (e) => {
    const seat = e.target.closest('.seat');
    if (!seat) return;
    if (seat.classList.contains('occupied')) return;

    seat.classList.toggle('selected');
    updateSummary();
  });

  function updateSummary(){
    const selected = hall.querySelectorAll('.seat.selected').length;
    selectedCountEl.textContent = selected;
    totalEl.textContent = `${selected * PRICE} ₽`;
    payBtn.disabled = selected === 0;
  }

  
  payBtn.addEventListener('click', () => {
    
    const chosen = [...hall.querySelectorAll('.seat.selected')]
      .map(s => `${s.dataset.row}-${s.dataset.col}`);


    alert(`Фильм: ${film.name}\nМеста: ${chosen.join(', ')}\nК оплате: ${chosen.length * PRICE} ₽`);

    
    for (const s of hall.querySelectorAll('.seat.selected')) {
      s.classList.remove('selected');
      s.classList.add('occupied');
      occupiedSet.add(`${s.dataset.row}-${s.dataset.col}`);
    }
    updateSummary();
    closeModal();
  });
});

