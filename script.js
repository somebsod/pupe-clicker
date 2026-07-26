// Загрузка данных из localStorage
function loadData(key, defaultValue) {
    const saved = localStorage.getItem(key);
    return saved ? parseInt(saved) : defaultValue;
}

// Инициализация переменных
let score = loadData('clicker_score', 0);
let clickPower = loadData('clicker_power', 1);
let autoclickers = loadData('clicker_autos', 0);
let clickUpgradePrice = loadData('clicker_power_price', 1);
let autoUpgradePrice = loadData('clicker_auto_price', 5);

// Элементы DOM из твоего кода
const scoreDisplay = document.getElementById('score');
const clickArea = document.getElementById('click-area');
const clickImg = document.getElementById('click-img');
const clickSound = document.getElementById('click-sound');
const cpsDisplay = document.getElementById('cps-display');

// Элементы магазина (будут добавлены в HTML)
const buyClickBtn = document.getElementById('buy-click-upgrade');
const buyAutoBtn = document.getElementById('buy-auto-upgrade');
const clickPriceDisplay = document.getElementById('click-upgrade-price');
const autoPriceDisplay = document.getElementById('auto-upgrade-price');

const normalImg = "https://i.ibb.co/BKj8XGSt/pup1.png"; 
const pressedImg = "https://i.ibb.co/wNQqvQC6/pup2.png"; 

// Обновление текста на экране
function updateUI() {
    scoreDisplay.textContent = score;
    if (cpsDisplay) cpsDisplay.textContent = autoclickers;
    
    // Обновление цен в магазине
    if (clickPriceDisplay) clickPriceDisplay.textContent = clickUpgradePrice;
    if (autoPriceDisplay) autoPriceDisplay.textContent = autoUpgradePrice;
    
    // Доступность кнопок (визуальное отключение без анимаций)
    if (buyClickBtn) buyClickBtn.disabled = score < clickUpgradePrice;
    if (buyAutoBtn) buyAutoBtn.disabled = score < autoUpgradePrice;
}

// Сохранение всего прогресса
function saveAllData() {
    localStorage.setItem('clicker_score', score);
    localStorage.setItem('clicker_power', clickPower);
    localStorage.setItem('clicker_autos', autoclickers);
    localStorage.setItem('clicker_power_price', clickUpgradePrice);
    localStorage.setItem('clicker_auto_price', autoUpgradePrice);
}

// Клик по главной области
clickArea.addEventListener('mousedown', () => {
    clickImg.src = pressedImg;
    clickArea.style.transform = "scale(0.95)";
    
    score += clickPower; // Учитываем силу клика
    updateUI();
    saveAllData();
    
    clickSound.currentTime = 0; 
    clickSound.play();
});

clickArea.addEventListener('mouseup', () => {
    clickImg.src = normalImg;
    clickArea.style.transform = "scale(1)";
});

clickArea.addEventListener('mouseleave', () => {
    clickImg.src = normalImg;
    clickArea.style.transform = "scale(1)";
});

// Логика покупки улучшения клика
if (buyClickBtn) {
    buyClickBtn.addEventListener('click', () => {
        if (score >= clickUpgradePrice) {
            score -= clickUpgradePrice;
            clickPower += 1;
            clickUpgradePrice *= 2; // Увеличение цены в 2 раза
            updateUI();
            saveAllData();
        }
    });
}

// Логика покупки автокликера
if (buyAutoBtn) {
    buyAutoBtn.addEventListener('click', () => {
        if (score >= autoUpgradePrice) {
            score -= autoUpgradePrice;
            autoclickers += 1;
            autoUpgradePrice *= 2; // Увеличение цены в 2 раза
            updateUI();
            saveAllData();
        }
    });
}

// Работа автокликера (раз в секунду)
setInterval(() => {
    if (autoclickers > 0) {
        score += autoclickers;
        updateUI();
        saveAllData();
    }
}, 1000);

// Первичный запуск UI при загрузке страницы
updateUI();
