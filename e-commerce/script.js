// DOM Elements
const productsContainer = document.getElementById('products-container');
const modal = document.getElementById('product-modal');
const closeModal = document.querySelector('.close-modal');
const searchInput = document.getElementById('search');
const filterButtons = document.querySelectorAll('.filter-btn');
const priceFilter = document.getElementById('price-filter');
const priceValue = document.getElementById('price-value');
const filterToggle = document.getElementById('filter-toggle');
const filtersSection = document.querySelector('.filters');
const cartIcon = document.querySelector('.cart-icon');
const clearFiltersBtn = document.getElementById('clear-filters');
const filterTitles = document.querySelectorAll('.filter-title');
const productTags = document.querySelectorAll('.product-tag');
const ratingOptions = document.querySelectorAll('.rating-option input');
const sortSelect = document.getElementById('sort-select');

// Check if we need to show the filter toggle (on mobile)
function checkMobileView() {
    if (window.innerWidth <= 768) {
        filterToggle.style.display = 'block';
        filtersSection.classList.add('collapsible');
    } else {
        filterToggle.style.display = 'none';
        filtersSection.classList.remove('collapsible');
    }
}

// Current filter state
let currentFilters = {
    category: 'all',
    price: 100000,
    search: '',
    tags: [],
    rating: 0
};

// Format price in Indian Rupees
function formatIndianPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Generate tags HTML if product has tags
    let tagsHtml = '';
    if (product.tags && product.tags.length) {
        tagsHtml = `
            <div class="product-tags">
                ${product.tags.map(tag => `<span class="card-tag ${tag}">${tag}</span>`).join('')}
            </div>
        `;
    }
    
    // Generate rating HTML if product has rating
    let ratingHtml = '';
    if (product.rating) {
        const fullStars = Math.floor(product.rating);
        const halfStar = product.rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        ratingHtml = `
            <div class="product-rating">
                ${Array(fullStars).fill('<i class="fas fa-star"></i>').join('')}
                ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
                ${Array(emptyStars).fill('<i class="far fa-star"></i>').join('')}
                <span>(${product.rating})</span>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="product-badges">
            ${product.tags && product.tags.includes('new') ? '<span class="badge new-badge">New</span>' : ''}
            ${product.tags && product.tags.includes('sale') ? '<span class="badge sale-badge">Sale</span>' : ''}
        </div>
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            ${ratingHtml}
            <p class="product-price">${formatIndianPrice(product.price)}</p>
            <p class="product-category">${product.category}</p>
            ${tagsHtml}
        </div>
    `;
    card.addEventListener('click', () => showProductModal(product));
    return card;
}

// Show Product Modal
function showProductModal(product) {
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="modal-image-container">
            <img src="${product.image}" alt="${product.name}" class="modal-image">
        </div>
        <div class="modal-details">
            <h2>${product.name}</h2>
            <p class="modal-price">${formatIndianPrice(product.price)}</p>
            <p class="modal-description">${product.description}</p>
            <div class="modal-features">
                <h3>Features:</h3>
                <ul>
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <button class="add-to-cart" onclick="addToCart('${product.id}')">
                Add to Cart
            </button>
        </div>
    `;
    modal.style.display = 'block';
}

// Close Modal
function closeProductModal() {
    modal.style.display = 'none';
}

// Filter Products
function filterProducts() {
    filterAndSortProducts();
}

// Render Products
function renderProducts(productsToRender) {
    productsContainer.innerHTML = '';
    productsToRender.forEach(product => {
        productsContainer.appendChild(createProductCard(product));
    });
}

// Shopping Cart Functionality
let cartItems = [];
let cartCount = 0;

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;
    
    const existingItem = cartItems.find(item => item.id == productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    cartCount++;
    updateCartUI();
    showCartNotification(product.name);
    
    // Save cart to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', cartCount);
}

// Update Cart UI
function updateCartUI() {
    document.querySelector('.cart-count').textContent = cartCount;
}

// Show Cart Notification
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} added to cart!</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }, 100);
}

// Show Cart Modal
function showCartModal() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const modalBody = modal.querySelector('.modal-body');
    let subtotal = 0;
    
    modalBody.innerHTML = `
        <div class="cart-modal-content">
            <h2>Your Shopping Cart</h2>
            <div class="cart-items">
                ${cartItems.map(item => {
                    subtotal += item.price * item.quantity;
                    return `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                            <div class="cart-item-details">
                                <h3>${item.name}</h3>
                                <p>${formatIndianPrice(item.price)}</p>
                                <div class="cart-item-quantity">
                                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                                </div>
                            </div>
                            <button class="remove-item" onclick="removeFromCart(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="cart-summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>${formatIndianPrice(subtotal)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping:</span>
                    <span>${formatIndianPrice(99)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>${formatIndianPrice(subtotal + 99)}</span>
                </div>
                <button class="checkout-btn">Proceed to Checkout</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Update Item Quantity
function updateQuantity(productId, change) {
    const item = cartItems.find(item => item.id == productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        cartCount += change;
        updateCartUI();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartCount', cartCount);
        showCartModal(); // Refresh the cart modal
    }
}

// Remove Item From Cart
function removeFromCart(productId) {
    const itemIndex = cartItems.findIndex(item => item.id == productId);
    if (itemIndex > -1) {
        cartCount -= cartItems[itemIndex].quantity;
        cartItems.splice(itemIndex, 1);
        updateCartUI();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartCount', cartCount);
        showCartModal(); // Refresh the cart modal
    }
}

// Event Listeners
closeModal.addEventListener('click', closeProductModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProductModal();
    }
});

searchInput.addEventListener('input', (e) => {
    currentFilters.search = e.target.value;
    filterProducts();
});

// Cart icon click event
cartIcon.addEventListener('click', showCartModal);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        currentFilters.category = button.dataset.category;
        filterProducts();
    });
});

priceFilter.addEventListener('input', (e) => {
    currentFilters.price = e.target.value;
    priceValue.textContent = formatIndianPrice(e.target.value);
    filterProducts();
});

// Toggle filters on mobile
filterToggle.addEventListener('click', () => {
    filtersSection.classList.toggle('active');
});

// Handle window resize
window.addEventListener('resize', () => {
    checkMobileView();
});

// Filter Title Toggle
filterTitles.forEach(title => {
    title.addEventListener('click', () => {
        title.classList.toggle('active');
        const content = title.nextElementSibling;
        if (content.style.display === 'none') {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
});

// Product Tags Filter
productTags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('active');
        
        // Update currentFilters.tags
        const tagValue = tag.getAttribute('data-tag');
        
        if (tag.classList.contains('active')) {
            if (!currentFilters.tags.includes(tagValue)) {
                currentFilters.tags.push(tagValue);
            }
        } else {
            currentFilters.tags = currentFilters.tags.filter(t => t !== tagValue);
        }
        
        filterProducts();
    });
});

// Rating Filter
ratingOptions.forEach(option => {
    option.addEventListener('change', () => {
        if (option.checked) {
            currentFilters.rating = parseInt(option.value);
            filterProducts();
        }
    });
});

// Clear All Filters
clearFiltersBtn.addEventListener('click', () => {
    // Reset filter state
    currentFilters = {
        category: 'all',
        price: 100000,
        search: '',
        tags: [],
        rating: 0
    };
    
    // Reset UI elements
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector('[data-category="all"]').classList.add('active');
    
    priceFilter.value = 100000;
    priceValue.textContent = formatIndianPrice(100000);
    
    productTags.forEach(tag => {
        tag.classList.remove('active');
    });
    
    ratingOptions.forEach(option => {
        option.checked = false;
    });
    
    searchInput.value = '';
    
    filterProducts();
});

// Sort products
sortSelect.addEventListener('change', () => {
    filterAndSortProducts();
});

// Filter and sort products
function filterAndSortProducts() {
    // First filter the products
    const filteredProducts = products.filter(product => {
        const matchesCategory = currentFilters.category === 'all' || product.category === currentFilters.category;
        const matchesPrice = product.price <= currentFilters.price;
        const matchesSearch = product.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
                            product.description.toLowerCase().includes(currentFilters.search.toLowerCase());
        
        // Tag filters
        const matchesTags = currentFilters.tags.length === 0 || 
            (product.tags && currentFilters.tags.some(tag => product.tags.includes(tag)));
        
        // Rating filter
        const matchesRating = currentFilters.rating === 0 || 
            (product.rating && product.rating >= currentFilters.rating);
        
        return matchesCategory && matchesPrice && matchesSearch && matchesTags && matchesRating;
    });
    
    // Then sort the filtered products
    const sortOption = sortSelect.value;
    
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch(sortOption) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            default:
                return 0; // featured - default order
        }
    });
    
    // Update result count and render
    const resultCount = document.getElementById('result-count');
    if (resultCount) {
        resultCount.textContent = `${sortedProducts.length} products found`;
    }
    
    renderProducts(sortedProducts);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from local storage
    const savedCartItems = localStorage.getItem('cartItems');
    const savedCartCount = localStorage.getItem('cartCount');
    
    if (savedCartItems) {
        cartItems = JSON.parse(savedCartItems);
    }
    
    if (savedCartCount) {
        cartCount = parseInt(savedCartCount);
    }
    
    // Update cart UI
    updateCartUI();
    
    // Initialize filter UI
    // Open first filter section by default
    if (filterTitles.length > 0) {
        filterTitles[0].classList.add('active');
    }
    
    // Initial product rendering
    filterAndSortProducts();
    checkMobileView();
    
    // Add image loading error handling
    document.addEventListener('error', function(e) {
        if (e.target.tagName.toLowerCase() === 'img') {
            e.target.src = 'https://via.placeholder.com/800x600?text=Product+Image';
        }
    }, true);
});
