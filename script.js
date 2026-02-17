const habitInput = document.getElementById('habit-input');
const addBtn = document.getElementById('add-btn');
const habitList = document.getElementById('habit-list');


let habits = JSON.parse(localStorage.getItem('myHabits')) || [];

function renderHabits() {
    habitList.innerHTML = habits.map((habit, index) => `
        <li class="habit-item ${habit.completed ? 'completed' : ''}" onclick="toggleHabit(${index})">
            ${habit.text}
            <button onclick="deleteHabit(event, ${index})">✕</button>
        </li>
    `).join('');
    localStorage.setItem('myHabits', JSON.stringify(habits));
}

function addHabit() {
    if (habitInput.value.trim() === "") return;
    habits.push({ text: habitInput.value, completed: false });
    habitInput.value = "";
    renderHabits();
}

window.toggleHabit = (index) => {
    habits[index].completed = !habits[index].completed;
    renderHabits();
};

window.deleteHabit = (e, index) => {
    e.stopPropagation(); 
    habits.splice(index, 1);
    renderHabits();
};

addBtn.addEventListener('click', addHabit);
renderHabits(); 