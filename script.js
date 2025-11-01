let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ إضافة عنصر إلى السلة
function addToCart(name, image, price) {
    const product = { name, image, price };
    console.log("Adding to cart:", product); // للتشخيص
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showMessage("Item added to cart!");
}

// ✅ تحديث عدد العناصر في السلة (🛒)
function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (countEl) {
        countEl.innerText = cart.length;
    }
}

// ✅ إظهار رسالة صغيرة عند إضافة منتج
function showMessage(msg) {
    const box = document.getElementById("cart-msg");
    if (box) {
        box.innerText = msg;
        box.classList.add("show");
        setTimeout(() => {
            box.classList.remove("show");
        }, 2500);
    } else {
        alert(msg); // fallback لو مفيش العنصر
    }
}

// ✅ تغيير صورة تيشيرت زارا
function changeZaraColor(filename) {
    const img = document.getElementById("main-zara-image");
    if (img) {
        img.src = "images/" + filename;
    }
}

// ✅ فتح صفحة السلة
function openCart() {
    window.location.href = "cart.html";
}

// ✅ تحديث محتوى صفحة السلة
function updateCartPage() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (!container || !totalPriceElement) return;

    container.innerHTML = "";
    let total = 0;

    if (cartItems.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
    }

    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("cart-item-image-container");

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.classList.add("cart-item-image");
        img.onerror = function() {
            this.src = "images/logo.jpg";
        };

        imageContainer.appendChild(img);

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("cart-item-details");

        const title = document.createElement("h4");
        title.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = `${item.price} EGP`;

        detailsDiv.appendChild(title);
        detailsDiv.appendChild(price);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => {
            removeFromCart(index);
        };

        itemDiv.appendChild(imageContainer);
        itemDiv.appendChild(detailsDiv);
        itemDiv.appendChild(removeBtn);
        container.appendChild(itemDiv);

        total += parseFloat(item.price);
    });

    totalPriceElement.textContent = `${total.toFixed(2)} EGP`;
}

// ✅ إزالة منتج من السلة
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateCartPage();
}

// ✅ عند تحميل الصفحة
window.onload = () => {
    updateCartCount();
    if (window.location.href.includes("cart.html")) {
        updateCartPage();
    }
};

// ✅ مسح السلة بالكامل
function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    updateCartCount();
    updateCartPage();
}

// ✅ زر العودة للصفحة الرئيسية
function goHome() {
    window.location.href = "index.html";
}

// ✅ إتمام الشراء
function checkout() {
    alert("Thank you for your purchase! ✅");
    clearCart();
}

