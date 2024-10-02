document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const viewCartBtn = document.getElementById('view-cart');
    const cartModal = document.getElementById('cart-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeButtons = document.querySelectorAll('.close');
    const checkoutBtn = document.getElementById('checkout-btn');
    const paymentForm = document.getElementById('payment-form');
    let cart = [];

    // Add floating Thai elements
    addFloatingElements();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    viewCartBtn.addEventListener('click', showCart);

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    checkoutBtn.addEventListener('click', showCheckout);

    paymentForm.addEventListener('submit', processPayment);

    function addToCart(event) {
        const menuItem = event.target.closest('.menu-item');
        const name = menuItem.querySelector('h2').textContent;
        const price = parseFloat(menuItem.querySelector('.price').textContent.slice(1));

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartButton();
        showAddedAnimation(menuItem);
    }

    function updateCartButton() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        viewCartBtn.textContent = `View Cart (${totalItems})`;
    }

    function showCart() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <span>${item.name} x${item.quantity}</span>
                    <span>฿${itemTotal.toFixed(2)}</span>
                    <button class="remove-item" data-index="${index}">ลบ</button>
                </div>
            `;
        });

        cartTotal.textContent = `Total: ฿${total.toFixed(2)}`;
        cartModal.style.display = 'block';

        // Add event listener to remove buttons
        const removeItemButtons = document.querySelectorAll('.remove-item');
        removeItemButtons.forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    function removeFromCart(event) {
        const itemIndex = event.target.getAttribute('data-index');
        cart.splice(itemIndex, 1);  // ลบรายการตาม index
        showCart();  // อัพเดทรายการตะกร้า
        updateCartButton();  // อัพเดตปุ่มแสดงจำนวนรายการในตะกร้า
    }

    function showCheckout() {
        cartModal.style.display = 'none';
        checkoutModal.style.display = 'block';
    }

    function closeModal() {
        cartModal.style.display = 'none';
        checkoutModal.style.display = 'none';
    }

    function processPayment(event) {
        event.preventDefault();
        // การประมวลผลการชำระเงินจำลอง
        alert('Payment processed successfully!');
        cart = [];
        updateCartButton();
        closeModal();
    }

    function showAddedAnimation(menuItem) {
        const animation = document.createElement('div');
        animation.textContent = '✓';
        animation.className = 'added-animation';
        menuItem.appendChild(animation);
        setTimeout(() => animation.remove(), 1000);
    }

    function addFloatingElements() {
        const elements = ['🍜', '🍚', '🥢', '🍤', '🌶️'];
        elements.forEach(emoji => {
            const element = document.createElement('div');
            element.textContent = emoji;
            element.className = 'floating-element';
            element.style.left = `${Math.random() * 100}vw`;
            element.style.top = `${Math.random() * 100}vh`;
            element.style.fontSize = `${Math.random() * 30 + 20}px`;
            document.body.appendChild(element);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // ดึงข้อมูลอีเมลและรหัสผ่านจากฟอร์ม
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // ดึงข้อมูลผู้ใช้จาก Local Storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // เก็บสถานะการเข้าสู่ระบบใน Local Storage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userName', user.name);

            // เปลี่ยนหน้าไปยัง index.html
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });

    // ฟังก์ชันตรวจสอบสถานะการเข้าสู่ระบบ
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userName = localStorage.getItem('userName');
        
        if (isLoggedIn === 'true') {
            // แสดงข้อความในหน้า Home ว่าเข้าสู่ระบบแล้ว
            const navLinks = document.getElementById('nav-links');
            const loggedInMessage = document.createElement('li');
            loggedInMessage.textContent = `Logged in as ${userName}`;
            navLinks.appendChild(loggedInMessage);
        }
    }

    // เรียกใช้ฟังก์ชันเมื่อโหลดหน้า
    checkLoginStatus();
});

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // ดึงค่าจากฟอร์ม
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // ตรวจสอบว่ารหัสผ่านทั้งสองช่องตรงกัน
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        // สร้างวัตถุผู้ใช้ใหม่
        const user = {
            name: name,
            email: email,
            password: password
        };

        // เก็บข้อมูลผู้ใช้ใน Local Storage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            alert("This email is already registered. Please use a different email.");
        } else {
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            alert("Registration successful! Please log in.");
            window.location.href = 'login.html';
        }
    });
});