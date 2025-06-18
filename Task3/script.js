document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const errorMessage = document.getElementById('error-message');
    const productsContainer = document.getElementById('products-container');
    const sortSelect = document.getElementById('sort-select');
    const resultsCount = document.getElementById('results-count');
    let products = [];
    let isLoading = false;
    fetchProducts('https://dummyjson.com/products');
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleSearch());
    sortSelect.addEventListener('change', () => sortProducts(sortSelect.value));
    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        
        if (!searchTerm) {
            showError('Please enter a search term');
            searchInput.focus();
            return;
        }
        
        clearError();
        showLoading();
        
        fetchProducts(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`);
    }
    
    async function fetchProducts(url) {
        try {
            isLoading = true;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            products = data.products || [];
            
            displayProducts(products);
            updateResultsCount(products.length);
        } catch (error) {
            console.error('Fetch error:', error);
            showError('Failed to load products. Please try again later.');
            displayEmptyState();
        } finally {
            isLoading = false;
        }
    }
    
    function displayProducts(productsToDisplay) {
        if (!productsToDisplay.length) {
            displayEmptyState();
            return;
        }
        
        productsContainer.innerHTML = '';
        
        const productsGrid = document.createElement('div');
        productsGrid.className = 'products-grid';
        
        productsToDisplay.forEach(product => {
            const discountPercentage = Math.round(product.discountPercentage);
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
                    ${discountPercentage > 0 ? `<span class="product-badge">-${discountPercentage}%</span>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price}</p>
                    <div class="product-rating">
                        <div class="stars">
                            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                            ${product.rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                            ${'<i class="far fa-star"></i>'.repeat(5 - Math.ceil(product.rating))}
                        </div>
                        <span class="rating-value">${product.rating.toFixed(1)}</span>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        productsContainer.appendChild(productsGrid);
    }
    
    function sortProducts(sortType) {
        if (isLoading || !products.length) return;
        
        const [field, order] = sortType.split('-');
        
        const sortedProducts = [...products].sort((a, b) => {
            return order === 'asc' ? a[field] - b[field] : b[field] - a[field];
        });
        
        displayProducts(sortedProducts);
    }
    
    function showLoading() {
        productsContainer.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading products...</p>
            </div>
        `;
    }
    
    function displayEmptyState() {
        productsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="far fa-folder-open"></i>
                </div>
                <h3 class="empty-text">No products found</h3>
                <p>Try a different search term</p>
            </div>
        `;
        updateResultsCount(0);
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => errorMessage.style.opacity = '1', 10);
    }
    
    function clearError() {
        errorMessage.style.opacity = '0';
        setTimeout(() => {
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
        }, 300);
    }
    
    function updateResultsCount(count) {
        resultsCount.textContent = `${count} ${count === 1 ? 'result' : 'results'} found`;
    }
});