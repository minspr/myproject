document.addEventListener('DOMContentLoaded', () => {
    const menuForm = document.getElementById('menu-form');
    const menuItemsContainer = document.getElementById('menu-items');
    let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
function displayMenuItems() {
        menuItemsContainer.innerHTML = '';
        menuItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('menu-item');
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: ฿${item.price}</p>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            menuItemsContainer.appendChild(itemDiv);
        });
    }

  function displayMenuItems() {
    menuItemsContainer.innerHTML = '';
    menuItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: ฿${item.price}</p>
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        menuItemsContainer.appendChild(itemDiv);
    });
}
    // Display menu items on load
    displayMenuItems();

    // Add or update menu item
    menuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('menu-name').value;
        const price = document.getElementById('menu-price').value;
        const imageInput = document.getElementById('menu-image');
        const menuId = document.getElementById('menu-id').value;

        const reader = new FileReader();
        reader.onload = function (e) {
            const newItem = {
                name: name,
                price: price,
                image: e.target.result
            };

            if (menuId === "") {
                menuItems.push(newItem); // Add new item
            } else {
                menuItems[menuId] = newItem; // Update existing item
            }

            localStorage.setItem('menuItems', JSON.stringify(menuItems)); // Save to localStorage
            displayMenuItems(); // Update the display
            menuForm.reset(); // Reset form
        };
        reader.readAsDataURL(imageInput.files[0]);
    });

    // Delete or Edit menu item
    menuItemsContainer.addEventListener('click', (e) => {
        const index = e.target.dataset.index;

        if (e.target.classList.contains('delete-btn')) {
            menuItems.splice(index, 1); // Delete item
            localStorage.setItem('menuItems', JSON.stringify(menuItems)); // Update localStorage
            displayMenuItems(); // Update the display
        }

        if (e.target.classList.contains('edit-btn')) {
            const item = menuItems[index];
            document.getElementById('menu-name').value = item.name;
            document.getElementById('menu-price').value = item.price;
            document.getElementById('menu-id').value = index;
        }
    });
});