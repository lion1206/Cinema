const postItms = {
    today: [
        {src: "photo/пост1.png", alt: "пост1"},
        {src: "photo/пост2.png", alt: "пост1"},
        {src: "photo/пост3.png", alt: "пост1"},
        {src: "photo/пост4.png", alt: "пост1"},
        {src: "photo/пост5.png", alt: "пост1"},
        {src: "photo/пост6.png", alt: "пост1"},
        {src: "photo/пост7.png", alt: "пост1"},
        {src: "photo/пост8.png", alt: "пост1"},
        {src: "photo/пост9.png", alt: "пост1"},
        {src: "photo/пост10.png", alt: "пост1"},
    ], 
    tomorrow: [
        {src: "photo/пост3.png", alt: "пост1"},
        {src: "photo/пост4.png", alt: "пост1"},
    ],
    '2025-09-08': [
        {src: "photo/пост5.png", alt: "пост1"},
        {src: "photo/пост6.png", alt: "пост1"},
    ],
    '2025-09-09': [
        {src: "photo/пост7.png", alt: "пост1"},
        {src: "photo/пост8.png", alt: "пост1"},
    ],
    '2025-09-10': [
        {src: "photo/пост9.png", alt: "пост1"},
        {src: "photo/пост10.png", alt: "пост1"},
    ]
};


document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelectorAll('.bt-dat');
    const filtr = document.getElementById('now');
    const galery = document.getElementById('gallery');

    renderGaler('today');

    filtr.querySelector('[data-filter="today"]').classList.add('active');

    filtr.addEventListener('click', (e) => {
        const btn = e.target.closest('.bt-dat');
        if (!btn) return;

        filtr.querySelectorAll('.bt-dat').forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

        const key = btn.dataset.filter;

        renderGaler(key);
    });

    function renderGaler(key) {
        const itm = postItms[key] || [];

        galery.innerHTML = '';

        if (!itm.length) {
            const empty = document.createElement('p');
            empty.textContent = "В этот день сеансов нет";
            empty.style.opacity = '.8';
            galery.appendChild(empty);
            return
        }

        const flag = document.createDocumentFragment();

        for (const it of itm){
            const img = document.createElement('img');
            innerHeight.className = 'post';
            img.src = it.src;
            img.alt = it.alt || '';
            img.loading = 'lazy';
            flag.appendChild(img);
        }
        galery.appendChild(flag);
    }

    
});