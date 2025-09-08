document.addEventListener('DOMContentLoaded', () => {
  // 1. Читаем параметры из URL
  const params = new URLSearchParams(window.location.search);
  const filmID = params.get("id");   // например, "hunger-game"

  // 2. Находим контейнер, куда вставим инфо о фильме
  const elems = document.getElementById("film");

  let films;

  // 3. Перебираем все ключи объекта postItms
  for (const day in postItms) {
    // ищем фильм с таким id в массиве фильмов этого дня
    films = (postItms[day] || []).find(f => f.id === filmID);
    if (films) break; // если нашли — дальше не ищем
  }

  // 4. Если не нашли фильм
  if (!films) {
    elems.textContent = "Произошла ошибка 404, фильм не найден!";
    return;
  }

  // 5. Если нашли — вставляем HTML с данными
  elems.innerHTML = `
    <h1>${films.name}</h1>
    
    <div class="cont_film">
        <div class="post_film"><img src="${films.src}" alt="${films.alt || ""}"></div>
        <div class="info_film">
            <p><strong>Дата выхода:</strong> ${films.data || "-"}</p>
            <p><strong>Продолжительность:</strong> ${films.tim || "-"}</p>
            <p>${films.synopsis || "Описание будет добавлено позднее"}</p>
            <button class="btn-glow">Купить</button>
        </div>
    </div>
    
  `;
});
