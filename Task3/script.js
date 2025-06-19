document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('products-grid');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const sortBy = document.getElementById('sort-by');
    const brandFilter = document.getElementById('brand-filter');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    
    let allProducts = [];
    let displayedProducts = [];
    
    function fetchProducts(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                allProducts = data.products;
                displayedProducts = [...allProducts];
                renderProducts(displayedProducts);
                populateBrandFilter();
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                showEmptyState('Failed to load products. Please try again later.');
            });
    }
    
    function populateBrandFilter() {
        const brands = [...new Set(allProducts.map(product => product.brand))].filter(b => b);
        brands.sort().forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        });
    }
    
    function renderProducts(products) {
        productsGrid.innerHTML = '';
        
        if (products.length === 0) {
            showEmptyState('No products found. Try adjusting your filters.');
            return;
        }
        
        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.style.animationDelay = `${index * 0.1}s`;
            
            const discountPercentage = product.discountPercentage ? Math.round(product.discountPercentage) : 0;
            
            productCard.innerHTML = `
                ${discountPercentage > 0 ? `<span class="product-badge">${discountPercentage}% OFF</span>` : ''}
                <div class="product-image-container">
                    <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
                </div>
                <div class="product-info">
                    <p class="product-brand">${product.brand || 'Generic'}</p>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price}</p>
                    <div class="product-rating">
                        <i class="fas fa-star"></i>
                        <span>${product.rating}</span>
                    </div>
                    <div class="product-actions">
                        <button class="wishlist-btn">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="add-to-cart">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
    }
    
    function showEmptyState(message) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-box-open"></i>
                </div>
                <h3 class="empty-title">No Products Found</h3>
                <p class="empty-description">${message}</p>
                <button class="add-to-cart" onclick="resetFilters()">
                    <i class="fas fa-sync-alt"></i> Reset Filters
                </button>
            </div>
        `;
    }
    
    function sortProducts() {
        const sortValue = sortBy.value;
        
        switch(sortValue) {
            case 'price-asc':
                displayedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                displayedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating-asc':
                displayedProducts.sort((a, b) => a.rating - b.rating);
                break;
            case 'rating-desc':
                displayedProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                displayedProducts = [...allProducts];
                break;
        }
        
        applyProductFilters();
    }
    
    function applyProductFilters() {
        const selectedBrand = brandFilter.value;
        const minPriceValue = parseFloat(minPrice.value) || 0;
        const maxPriceValue = parseFloat(maxPrice.value) || Infinity;
        
        let filteredProducts = [...displayedProducts];
        
        if (selectedBrand) {
            filteredProducts = filteredProducts.filter(product => 
                product.brand === selectedBrand
            );
        }
        
        filteredProducts = filteredProducts.filter(product => 
            product.price >= minPriceValue && product.price <= maxPriceValue
        );
        
        renderProducts(filteredProducts);
    }
    
    function searchProducts() {
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm === '') {
            fetchProducts('https://dummyjson.com/products');
            return;
        }
        
        fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`)
            .then(response => response.json())
            .then(data => {
                allProducts = data.products;
                displayedProducts = [...allProducts];
                sortProducts();
            })
            .catch(error => {
                console.error('Error searching products:', error);
                showEmptyState('Search failed. Please try again.');
            });
    }
    
    window.resetFilters = function() {
        sortBy.value = '';
        brandFilter.value = '';
        minPrice.value = '';
        maxPrice.value = '';
        searchInput.value = '';
        fetchProducts('https://dummyjson.com/products');
    };
    
    searchButton.addEventListener('click', searchProducts);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    sortBy.addEventListener('change', sortProducts);
    brandFilter.addEventListener('change', applyProductFilters);
    minPrice.addEventListener('input', applyProductFilters);
    maxPrice.addEventListener('input', applyProductFilters);
    
    fetchProducts('https://dummyjson.com/products');
});