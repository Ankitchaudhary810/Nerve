
const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
const strategyArray = [
    {
        'View': 'Bullish',
        'Value': {
            '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Bull Call Spread'],
            '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Long Call', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy2', 'Strategy1', 'Strategy2', 'Bull Call Spread'],
            '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call', 'Strategy Call', 'Strategy Put'],
        }
    },
    {
        'View': 'Bearish',
        'Value': {
            '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long Put', 'Long Put', 'Bear Call Spread'],
            '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put', 'Long Put'],
            '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put'],
        }
    },
    {
        'View': 'RangeBound',
        'Value': {
            '24-Apr-2024': ['Short Straddle', 'Short Strangle', 'Short Strangle', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Short Straddle'],
            '02-May-2024': ['Short Straddle', 'Short Straddle', 'Short Strangle', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Short Straddle'],
            '21-Jun-2024': ['Iron Condor', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Iron Condor'],
        }
    },
    {
        'View': 'Volatile',
        'Value': {
            '02-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Long Straddle'],
            '09-May-2024': ['Long Straddle', 'Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Long Straddle'],
            '31-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle'],
        }
    }
];

function formatDate(dateStr) {
    const [day, month, year] = dateStr.split('-');
    return `${parseInt(day)} ${month} ${year}`;
}

let currentView = 'Bullish';
let currentDate = dateArray[0];
const dropdown = document.querySelector('.dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const cardsContainer = document.querySelector('.cards-container');
const toggleButtons = document.querySelectorAll('.toggle-btn');

dropdownToggle.textContent = formatDate(currentDate);
dateArray.forEach(date => {
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.textContent = formatDate(date);
    item.dataset.value = date;
    if (date === currentDate) item.classList.add('selected');
    dropdownMenu.appendChild(item);
});

dropdownToggle.addEventListener('click', () => {
    const isActive = dropdownToggle.classList.contains('active');
    dropdownToggle.classList.toggle('active');
    dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        dropdownToggle.classList.remove('active');
        dropdownMenu.classList.remove('show');
    }
});

dropdownMenu.addEventListener('click', (e) => {
    const item = e.target.closest('.dropdown-item');
    if (!item) return;

    currentDate = item.dataset.value;
    dropdownToggle.textContent = formatDate(currentDate);

    document.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');

    dropdownToggle.classList.remove('active');
    dropdownMenu.classList.remove('show');

    renderStrategyCards(currentView, currentDate);
});

function countStrategies(strategies) {
    const counts = {};
    strategies.forEach(strategy => {
        counts[strategy] = (counts[strategy] || 0) + 1;
    });
    return counts;
}

function renderStrategyCards(view, date) {
    cardsContainer.innerHTML = '';

    const viewData = strategyArray.find(item => item.View === view);
    if (viewData && viewData.Value[date]) {
        const strategyCounts = countStrategies(viewData.Value[date]);

        Object.entries(strategyCounts).forEach(([strategy, count]) => {
            const card = document.createElement('div');
            card.className = 'strategy-card';
            card.innerHTML = `
    <div class="strategy-name">${strategy}</div>
    <div class="strategy-count">${count} ${count === 1 ? 'Strategy' : 'Strategies'}</div>
    `;
            cardsContainer.appendChild(card);
        });
    } else {
        cardsContainer.innerHTML = `
                    <div class="empty-state">
                        <p>There are no strategies for</p>
                        <h3>${formatDate(date)}</h3>
                    </div>
                `;
    }
}

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentView = button.dataset.view;
        renderStrategyCards(currentView, currentDate);
    });
});

renderStrategyCards(currentView, currentDate);
