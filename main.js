class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}
class ShoppingCart {
    constructor() {
        this.items = [];
    }
    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newItem = new ShoppingCartItem(product, quantity);
            this.items.push(newItem);
        }
    }
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }
    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    displayItems() {
        console.log("Items in the cart:");
        this.items.forEach(item => {
            console.log(`${item.product.name} (x${item.quantity}): $${item.getTotalPrice().toFixed(2)}`);
        });
    }
}
const cart = new ShoppingCart();

document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll(".card");
    const totalPriceElement = document.querySelector(".total");

    products.forEach(product => {
        const plusButton = product.querySelector(".fa-plus-circle");
        const minusButton = product.querySelector(".fa-minus-circle");
        const quantityElement = product.querySelector(".quantity");
        const unitPriceElement = product.querySelector(".unit-price");
        const deleteButton = product.querySelector(".fa-trash-alt");
        const likeButton = product.querySelector(".fa-heart");

        const productId = parseInt(product.dataset.id); 
        const productName = product.querySelector(".product-name").textContent; 
        const unitPrice = parseFloat(unitPriceElement.textContent.replace(" $", ""));

        const productObj = new Product(productId, productName, unitPrice);
        let quantity = 0;

        const updateTotalPrice = () => {
            const total = cart.getTotal();
            totalPriceElement.textContent = `${total.toFixed(2)} $`;
        };

        plusButton.addEventListener("click", () => {
            quantity++;
            quantityElement.textContent = quantity;
            cart.addItem(productObj, 1); 
            updateTotalPrice();
        });

        minusButton.addEventListener("click", () => {
            if (quantity > 0) {
                quantity--;
                quantityElement.textContent = quantity;
                cart.removeItem(productId); 
                if (quantity > 0) {
                    cart.addItem(productObj, 1); 
                }
                updateTotalPrice();
            }
        });

        deleteButton.addEventListener("click", () => {
            quantity = 0;
            quantityElement.textContent = quantity;
            cart.removeItem(productId);
            updateTotalPrice();
        });

        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("liked");
        });
    });
});