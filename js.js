const form = document.getElementById('form');
        const input = document.getElementById('input');
        const todosUL = document.getElementById('todos');

        const todos = JSON.parse(localStorage.getItem('todos'));

        if (todos) {
            todos.forEach(todo => addTodo(todo));
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            addTodo();
        });

        function addTodo(todo) {
            let todoText = input.value;

            if (todo) {
                todoText = todo.text;
            }

            if (todoText) {
                const todoEl = document.createElement('li');
                if (todo && todo.completed) {
                    todoEl.classList.add('completed');
                }

                todoEl.innerHTML = `
                 ${todoText} 
                    <span class="tick" aria-label="Complete task">&#10003;</span>
                    `;

                todoEl.querySelector('.tick').addEventListener('click', () => {
                    todoEl.remove();
                    updateLS();
                });

                todoEl.addEventListener('click', () => {
                    todoEl.classList.toggle('completed');
                    updateLS();
                });

                todosUL.appendChild(todoEl);
                input.value = '';
                updateLS();
            }
        }

        function updateLS() {
            const todosEl = document.querySelectorAll('li');

            const todos = [];
            todosEl.forEach(todoEl => {
                todos.push({
                    text: todoEl.childNodes[0].nodeValue.trim(),
                    completed: todoEl.classList.contains('completed')
                });
            });

            localStorage.setItem('todos', JSON.stringify(todos));
        }