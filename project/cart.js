// cart.js
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const receiptSection = document.getElementById('receipt-section');
    const receiptItemsContainer = document.getElementById('receipt-items');
    const receiptTotalPriceElement = document.getElementById('receipt-total-price');
    const paymentMessage = document.getElementById('payment-message');
    const backHomeBtn = document.getElementById('back-home-btn');
    const receiptIdElement = document.getElementById('receipt-id');
    const receiptDateElement = document.getElementById('receipt-date');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        let totalPrice = 0;
        cartItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h3>${item.name}</h3>
                        <p>Price: ฿${item.price}</p>
                    </div>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
            totalPrice += parseFloat(item.price);
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index;
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            displayCartItems();
        }
    });

    checkoutBtn.addEventListener('click', () => {
        // Disable the checkout button to prevent multiple clicks
        checkoutBtn.disabled = true;

        // Show processing message
        const processingMessage = document.createElement('p');
        processingMessage.textContent = 'Processing payment...';
        processingMessage.id = 'processing-message';
        cartItemsContainer.insertAdjacentElement('afterend', processingMessage);

        // Simulate payment processing
        setTimeout(() => {
            // Remove processing message
            processingMessage.remove();

            // Show payment confirmation message
            const confirmationMessage = document.createElement('p');
            confirmationMessage.textContent = 'Payment has been made successfully.';
            confirmationMessage.id = 'payment-confirmation';
            confirmationMessage.style.color = 'green';
            confirmationMessage.style.fontWeight = 'bold';
            cartItemsContainer.insertAdjacentElement('afterend', confirmationMessage);

            // Generate receipt after a short delay
            setTimeout(() => {
                receiptItemsContainer.innerHTML = '';
                let totalReceiptPrice = 0;

                // Generate Receipt ID and Date
                const receiptId = Math.floor(Math.random() * 1000000);
                const currentDate = new Date().toLocaleDateString();

                receiptIdElement.textContent = receiptId;
                receiptDateElement.textContent = currentDate;

                // Display Receipt Items
                cartItems.forEach(item => {
                    const receiptDiv = document.createElement('div');
                    receiptDiv.classList.add('receipt-item');
                    receiptDiv.innerHTML = `
                        <span>${item.name}</span>
                        <span>฿${item.price}</span>
                    `;
                    receiptItemsContainer.appendChild(receiptDiv);
                    totalReceiptPrice += parseFloat(item.price);
                });

                receiptTotalPriceElement.textContent = totalReceiptPrice.toFixed(2);
                receiptSection.classList.remove('hidden'); // Show receipt section

                paymentMessage.classList.remove('hidden'); // Show payment message
                backHomeBtn.classList.remove('hidden'); // Show back to home button

                localStorage.removeItem('cartItems'); // Clear cart
                cartItems = [];
                displayCartItems(); // Refresh cart display

                // Remove the confirmation message
                confirmationMessage.remove();

                // Re-enable the checkout button
                checkoutBtn.disabled = false;
            }, 3000); // Show receipt after 3 seconds
        }, 1500); // Simulate 1.5 seconds processing time
    });

    backHomeBtn.addEventListener('click', () => {
        window.location.href = '/';
    });

    displayCartItems();
});