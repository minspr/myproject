document.addEventListener('DOMContentLoaded', () => {
    const menuItemsContainer = document.getElementById('menu-items');
    let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Function to display the menu items with animation
    function displayMenuItems() {
        menuItemsContainer.innerHTML = '';
        if (menuItems.length === 0) {
            menuItemsContainer.innerHTML = '<p>No food items available.</p>';
            return;
        }

        menuItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('menu-item');
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: ฿${item.price}</p>
                <button class="add-to-cart-btn" data-index="${index}">Add to Cart</button>
            `;

            // Add fade-in animation
            itemDiv.style.opacity = 0;
            itemDiv.style.transform = 'translateY(20px)';
            setTimeout(() => {
                itemDiv.style.opacity = 1;
                itemDiv.style.transform = 'translateY(0)';
                itemDiv.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            }, index * 100); // delay each item slightly for a staggered effect

            menuItemsContainer.appendChild(itemDiv);
        });
    }

    // Function to add items to the cart
    function addToCart(index) {
        const item = menuItems[index];
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save cart to localStorage

        // Alert with animation
        const alertBox = document.createElement('div');
        alertBox.classList.add('alert-box');
        alertBox.innerText = `${item.name} added to cart!`;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.style.opacity = 1;
            alertBox.style.transform = 'translateY(0)';
        }, 10);

        setTimeout(() => {
            alertBox.style.opacity = 0;
            alertBox.style.transform = 'translateY(-20px)';
            setTimeout(() => document.body.removeChild(alertBox), 300);
        }, 2000);

        // Change button style when added to cart
        const button = document.querySelector(`.add-to-cart-btn[data-index="${index}"]`);
        button.innerText = 'Added';
        button.disabled = true;
        button.classList.add('added');
    }

    // Add event listener to handle adding items to the cart
    menuItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const index = e.target.dataset.index;
            addToCart(index);
        }
    });

    // Display menu items on page load
    displayMenuItems();
});