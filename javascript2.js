document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const cartCountSpan = document.getElementById('cart-count');
    const cartSidebar = document.getElementById('cart-sidebar');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn'); // Select all "Add to Cart" buttons

    // Initialize cart from localStorage or as an empty array
    let cart = JSON.parse(localStorage.getItem('ferreteriaStalynCart')) || [];

    // --- Event Listeners ---

    // Add event listener to each "Agregar al Carrito" button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.dataset.name;
            const productPrice = parseFloat(event.target.dataset.price);
            const productImage = event.target.dataset.image; // Get the image path from data-image

            addItemToCart(productName, productPrice, productImage);
        });
    });

    // --- Cart Functions ---

    /**
     * Adds a product to the cart or increases its quantity if it already exists.
     * @param {string} name - The name of the product.
     * @param {number} price - The price of the product.
     * @param {string} image - The path to the product image.
     */
    function addItemToCart(name, price, image) {
        // Create a simple unique ID for the product (e.g., "Taladro-Industrial-100")
        const productId = name.replace(/\s/g, '-') + '-' + price;

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, name, price, image, quantity: 1 });
        }
        updateCartDisplay(); // Refresh the cart display
        saveCart();         // Save changes to localStorage
        toggleCart(true);   // Open the cart sidebar automatically
    }

    /**
     * Removes a product from the cart.
     * @param {string} productId - The unique ID of the product to remove.
     */
    function removeItemFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
        saveCart();
    }

    /**
     * Updates the quantity of a product in the cart.
     * @param {string} productId - The unique ID of the product.
     * @param {number} change - The amount to change the quantity by (+1 for increase, -1 for decrease).
     */
    function updateItemQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeItemFromCart(productId); // Remove if quantity drops to 0 or less
            } else {
                updateCartDisplay();
                saveCart();
            }
        }
    }

    /**
     * Renders the current state of the cart in the sidebar and updates totals.
     */
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Clear existing items in the cart display
        let total = 0;
        let itemCount = 0;

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block'; // Show empty message
        } else {
            emptyCartMessage.style.display = 'none'; // Hide empty message
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Precio Unitario: S/. ${item.price.toFixed(2)}</p>
                        <p>Subtotal: S/. ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div class="item-quantity-controls">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item-button" data-id="${item.id}">Eliminar</button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);

                total += item.price * item.quantity;
                itemCount += item.quantity;
            });
        }

        cartTotalSpan.textContent = total.toFixed(2); // Update total price
        cartCountSpan.textContent = itemCount;          // Update item count in header

        // Attach event listeners to quantity control and remove buttons (since they are dynamically created)
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                updateItemQuantity(productId, -1);
            });
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                updateItemQuantity(productId, 1);
            });
        });

        document.querySelectorAll('.remove-item-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                removeItemFromCart(productId);
            });
        });
    }

    /**
     * Saves the current cart state to Local Storage.
     */
    function saveCart() {
        localStorage.setItem('ferreteriaStalynCart', JSON.stringify(cart));
    }

    /**
     * Toggles the visibility of the cart sidebar.
     * This function is made global so it can be called from onclick in HTML.
     * @param {boolean} [forceOpen] - Optional. If true, forces the cart to open. If false, forces it to close.
     */
    window.toggleCart = function(forceOpen) {
        if (typeof forceOpen === 'boolean') {
            if (forceOpen) {
                cartSidebar.classList.add('open');
            } else {
                cartSidebar.classList.remove('open');
            }
        } else {
            cartSidebar.classList.toggle('open');
        }
    };

    // Initial load: render cart content when the page loads
    updateCartDisplay();
});