// login-archive.js
document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');

    function displayUsers() {
        // In a real application, this data would come from a secure server-side API
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        userList.innerHTML = '';
        users.forEach((user, index) => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user-item');
            userDiv.innerHTML = `
                <span>${user.name} (${user.email})</span>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            userList.appendChild(userDiv);
        });
    }

    userList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const index = e.target.dataset.index;
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users[index];
            
            // In a real application, you'd open a modal or navigate to an edit page
            const newName = prompt('Enter new name:', user.name);
            const newEmail = prompt('Enter new email:', user.email);
            
            if (newName && newEmail) {
                users[index].name = newName;
                users[index].email = newEmail;
                localStorage.setItem('users', JSON.stringify(users));
                displayUsers();
            }
        } else if (e.target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this user?')) {
                const index = e.target.dataset.index;
                const users = JSON.parse(localStorage.getItem('users')) || [];
                users.splice(index, 1);
                localStorage.setItem('users', JSON.stringify(users));
                displayUsers();
            }
        }
    });

    displayUsers();
});