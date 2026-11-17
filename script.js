// Sample Inventory / Stock Data
let inventory = [
    { id: 1, name: "Sugar (Cheeni)", pricePerKg: 150, stockKg: 50 },
    { id: 2, name: "Basmati Rice (Chawal)", pricePerKg: 320, stockKg: 40 },
    { id: 3, name: "Cooking Oil", pricePerKg: 500, stockKg: 100 },
    { id: 4, name: "Daal Chana", pricePerKg: 260, stockKg: 25 },
    { id: 5, name: "Wheat Flour (Aata)", pricePerKg: 140, stockKg: 80 }
];

let cart = [];

// Load Data on Start
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("billDate").innerText = new Date().toLocaleDateString();
    renderStockTable();
    populateSelectOptions();
});

// Display Stock Table
function renderStockTable() {
    const tbody = document.getElementById("stockTableBody");
    tbody.innerHTML = "";
    
    inventory.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>PKR ${item.pricePerKg}</td>
                <td>${item.stockKg} kg</td>
            </tr>
        `;
    });
}

// Populate Dropdown
function populateSelectOptions() {
    const select = document.getElementById("productSelect");
    inventory.forEach(item => {
        let opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = item.name;
        select.appendChild(opt);
    });
}

// Calculate Price based on selected weight
function updatePrice() {
    const productId = document.getElementById("productSelect").value;
    const weight = parseFloat(document.getElementById("weightSelect").value);
    
    if (!productId) {
        document.getElementById("calculatedPrice").value = "";
        return;
    }

    const product = inventory.find(p => p.id == productId);
    const totalPrice = product.pricePerKg * weight;
    
    document.getElementById("calculatedPrice").value = `PKR ${totalPrice}`;
}

// Add Item to Bill & Deduct Stock
function addToCart() {
    const productId = document.getElementById("productSelect").value;
    const weight = parseFloat(document.getElementById("weightSelect").value);

    if (!productId) {
        alert("Please select a product first!");
        return;
    }

    const product = inventory.find(p => p.id == productId);

    // Check Stock
    if (product.stockKg < weight) {
        alert("Not enough stock available!");
        return;
    }

    // Deduct Stock
    product.stockKg -= weight;

    // Calculate item total
    const itemTotal = product.pricePerKg * weight;

    // Add to Cart
    cart.push({
        name: product.name,
        weight: weight,
        total: itemTotal
    });

    // Refresh UI
    renderStockTable();
    renderBill();
}

// Render Receipt / Bill
function renderBill() {
    const tbody = document.getElementById("billTableBody");
    tbody.innerHTML = "";
    let grandTotal = 0;

    cart.forEach(item => {
        grandTotal += item.total;
        tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.weight} kg</td>
                <td>PKR ${item.total}</td>
            </tr>
        `;
    });

    document.getElementById("grandTotal").innerText = grandTotal;
}