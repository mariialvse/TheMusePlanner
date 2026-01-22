// --- TROCA DE ABAS ---
function openTab(evt, tabName) {
    let contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) contents[i].classList.remove("active");

    let links = document.getElementsByClassName("nav-link");
    for (let i = 0; i < links.length; i++) links[i].classList.remove("active");

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// --- RELÓGIO ---
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString('pt-BR');
    document.getElementById('full-date').innerText = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
}
setInterval(updateClock, 1000);
updateClock();

// --- THEME TOGGLE ---
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    document.getElementById('theme-icon').innerText = isDark ? '☀️' : '🌙';
    document.getElementById('theme-text').innerText = isDark ? 'Day Mode' : 'Night Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// --- GERENCIAMENTO DE LISTAS ---
const lists = ['agenda-list', 'wish-list', 'habits-list'];
const defaultHabits = ["Tomar 2L de Água", "Skin Care", "Ler 50 Páginas", "Exercício"];

function addItem(listId, inputId) {
    const input = document.getElementById(inputId);
    if (!input.value) return;

    let data = JSON.parse(localStorage.getItem(listId) || "[]");
    data.push({ text: input.value, checked: false });
    localStorage.setItem(listId, JSON.stringify(data));
    input.value = "";
    render();
}

function toggleItem(listId, index) {
    let data = JSON.parse(localStorage.getItem(listId));
    data[index].checked = !data[index].checked;
    localStorage.setItem(listId, JSON.stringify(data));
    render();
}

function render() {
    lists.forEach(id => {
        const container = document.getElementById(id);
        let data = JSON.parse(localStorage.getItem(id));

        if (id === 'habits-list' && !data) {
            data = defaultHabits.map(h => ({ text: h, checked: false }));
            localStorage.setItem(id, JSON.stringify(data));
        }

        if (!data) return;
        container.innerHTML = data.map((item, i) => `
            <div class="item-row">
                <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleItem('${id}', ${i})">
                <span style="${item.checked ? 'text-decoration: line-through; opacity: 0.5' : ''}">${item.text}</span>
            </div>
        `).join('');
    });
}

function saveManifest() {
    localStorage.setItem('manifestText', document.getElementById('manifest-in').value);
    alert("Manifestação enviada! ✨");
}

// --- START ---
window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') toggleTheme();
    document.getElementById('manifest-in').value = localStorage.getItem('manifestText') || "";
    render();
};
