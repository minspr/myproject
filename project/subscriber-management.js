document.addEventListener('DOMContentLoaded', () => {
    const subscriberForm = document.getElementById('subscriber-form');
    const subscriberList = document.getElementById('subscriber-list');
    const subscriberEmail = document.getElementById('subscriber-email');
    const subscriberId = document.getElementById('subscriber-id');

    let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];

    function displaySubscribers() {
        subscriberList.innerHTML = '';
        subscribers.forEach((subscriber, index) => {
            const subscriberDiv = document.createElement('div');
            subscriberDiv.classList.add('subscriber-item');
            subscriberDiv.innerHTML = `
                <span>${subscriber.email}</span>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;

            // Add fade-in animation
            subscriberDiv.style.opacity = 0;
            setTimeout(() => {
                subscriberDiv.style.opacity = 1;
                subscriberDiv.style.transition = 'opacity 0.3s ease-out';
            }, index * 100); // delay each item slightly for staggered effect

            subscriberList.appendChild(subscriberDiv);
        });
    }

    function showAlert(message, type = 'success') {
        const alertBox = document.createElement('div');
        alertBox.classList.add('alert-box', type);
        alertBox.innerText = message;
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
    }

    subscriberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = subscriberEmail.value;
        const id = subscriberId.value;

        if (id) {
            // Update existing subscriber
            subscribers[id].email = email;
            showAlert('Subscriber updated successfully!', 'success');
        } else {
            // Add new subscriber
            subscribers.push({ email });
            showAlert('Subscriber added successfully!', 'success');
        }

        localStorage.setItem('subscribers', JSON.stringify(subscribers));
        subscriberForm.reset();
        subscriberId.value = '';
        displaySubscribers();
    });

    subscriberList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const index = e.target.dataset.index;
            subscriberEmail.value = subscribers[index].email;
            subscriberId.value = index;
        } else if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            subscribers.splice(index, 1);
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
            displaySubscribers();
            showAlert('Subscriber deleted successfully!', 'error');
        }
    });

    displaySubscribers();
});