// --- NAVEGAÇÃO ---
function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    const targetTab = document.getElementById(id);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Adiciona active no botão clicado
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// --- RELÓGIO ---
function updateTime() {
    const clockEl = document.getElementById('clock');
    const dateEl = document.getElementById('full-date');
    if (!clockEl) return;

    const now = new Date();
    clockEl.innerText = now.toLocaleTimeString('pt-BR');
    dateEl.innerText = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
}
setInterval(updateTime, 1000);
updateTime();

// --- TEMA (NIGHT MODE) ---
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    document.getElementById('theme-icon').innerText = isDark ? '☀️' : '🌙';
    document.getElementById('theme-text').innerText = isDark ? 'Day Mode' : 'Night Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// --- LÓGICA DE DADOS ---
const lists = ['agenda-list', 'wish-list', 'habits-list'];
const defaultHabits = ["Tomar 2L de Água", "Skin Care Matinal", "Ler 50 Páginas", "Treino de 30min", "Journaling"];

// Função para Adicionar
function add(listId, inputId) {
    const input = document.getElementById(inputId);
    const val = input.value;
    if(!val) return;

    let data = JSON.parse(localStorage.getItem(listId) || "[]");
    data.push({ text: val, checked: false });
    localStorage.setItem(listId, JSON.stringify(data));
    input.value = "";
    render();
}

// Função para Marcar/Desmarcar
function toggle(listId, idx) {
    let data = JSON.parse(localStorage.getItem(listId));
    data[idx].checked = !data[idx].checked;
    localStorage.setItem(listId, JSON.stringify(data));
    render();
}

// NOVO: Função para Apagar
function removeItem(listId, idx) {
    let data = JSON.parse(localStorage.getItem(listId));
    data.splice(idx, 1);
    localStorage.setItem(listId, JSON.stringify(data));
    render();
}

// Função para Desenhar na Tela
function render() {
    lists.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        let data = JSON.parse(localStorage.getItem(id));
        
        if(id === 'habits-list' && !data) {
            data = defaultHabits.map(h => ({text: h, checked: false}));
            localStorage.setItem(id, JSON.stringify(data));
        }
        
        if(!data) return;

        el.innerHTML = data.map((item, i) => `
            <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <input type="checkbox" ${item.checked ? 'checked' : ''} onclick="toggle('${id}', ${i})">
                    <span style="${item.checked ? 'text-decoration: line-through; opacity: 0.5' : ''}">${item.text}</span>
                </div>
                <button onclick="removeItem('${id}', ${i})" style="background: none; border: none; cursor: pointer; color: var(--accent-dark); font-weight: bold; font-size: 1.2rem;">&times;</button>
            </div>
        `).join('');
    });
}

function saveManifest() {
    localStorage.setItem('manifest', document.getElementById('manifest-in').value);
    alert("Enviado ao subconsciente! ✨");
}

// --- INIT ---
window.onload = () => {
    if(localStorage.getItem('theme') === 'dark') toggleTheme();
    
    const manifestIn = document.getElementById('manifest-in');
    if (manifestIn) {
        manifestIn.value = localStorage.getItem('manifest') || "";
    }
    
    render();
};
