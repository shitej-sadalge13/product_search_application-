const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const productContainer = document.getElementById("productContainer");
const status = document.getElementById("status");

const searchProducts = async (query) => {
    try {
        status.className = "";
        status.textContent = "Loading products...";
        productContainer.innerHTML = "";

        const response = await fetch(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const products = data.products;

        if (!products || products.length === 0) {
            throw new Error("No products found");
        }

        const validProducts = products.filter(
            product => product.title && product.price
        );

        const productCards = validProducts.map(product => `
            <div class="product-card">
                <img src="${product.thumbnail}" alt="${product.title}">

                <div class="product-info">
                    <h2>${product.title}</h2>
                    <p>Category: ${product.category}</p>
                    <p>Rating: ${product.rating}</p>
                    <p class="price">$${product.price}</p>
                </div>
            </div>
        `);

        productContainer.innerHTML = productCards.join("");

        status.textContent = `${validProducts.length} products found`;

    } catch (error) {
        status.textContent = error.message;
        status.className = "error";
        productContainer.innerHTML = "";
    }
};

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
        status.textContent = "Please enter a product name";
        status.className = "error";
        productContainer.innerHTML = "";
        return;
    }

    await searchProducts(query);
});
