const BUSINESS_WHATSAPP_NUMBER = "923001234567"; // Replace with actual EZZI Stationary WhatsApp number

const products = [
  { id: "ST-101", name: "Executive Notebook", category: "Office", price: 850, description: "Hardcover A5 notebook with 200 premium pages." },
  { id: "ST-102", name: "Gel Pen Set (Pack of 10)", category: "Writing", price: 450, description: "Smooth-flow gel pens in black and blue shades." },
  { id: "ST-103", name: "Wooden Pencil Pack", category: "School", price: 300, description: "HB pencils pack with sharpener and eraser." },
  { id: "ST-104", name: "Highlighter Set", category: "Study", price: 520, description: "6-color fluorescent highlighter collection." },
  { id: "ST-105", name: "Desk Organizer", category: "Office", price: 1200, description: "Multi-compartment organizer for desk essentials." },
  { id: "ST-106", name: "A4 Printing Paper (500 Sheets)", category: "Office", price: 1450, description: "Bright white, smooth texture paper for printing." },
  { id: "ST-107", name: "Sticky Notes Combo", category: "Study", price: 380, description: "Assorted sizes and colors for reminders and planning." },
  { id: "ST-108", name: "Art Marker Pack", category: "Creative", price: 980, description: "Dual-tip markers for sketching and illustration." }
];

const productGrid = document.getElementById("productGrid");
const customerNameInput = document.getElementById("customerName");
const customerPhoneInput = document.getElementById("customerPhone");
const customerNoteInput = document.getElementById("customerNote");

document.getElementById("year").textContent = new Date().getFullYear();

function renderProducts() {
  const cards = products
    .map((product) => `
      <article class="product-card">
        <h3>${product.name}</h3>
        <p class="desc">${product.description}</p>
        <div class="meta">
          <span class="price">PKR ${product.price.toLocaleString()}</span>
          <span class="tag">${product.category}</span>
        </div>
        <button class="order-btn" data-product-id="${product.id}">Order on WhatsApp</button>
      </article>
    `)
    .join("");

  productGrid.innerHTML = cards;
}

function buildMessage(product) {
  const name = customerNameInput.value.trim();
  const phone = customerPhoneInput.value.trim();
  const note = customerNoteInput.value.trim();

  if (!name || !phone) {
    alert("Please enter your name and phone number before placing an order.");
    return null;
  }

  return [
    "Hello EZZI Stationary,",
    "",
    "I would like to order this product:",
    `• Product: ${product.name}`,
    `• Product ID: ${product.id}`,
    `• Price: PKR ${product.price.toLocaleString()}`,
    "",
    "My details:",
    `• Name: ${name}`,
    `• Phone: ${phone}`,
    `• Note: ${note || "N/A"}`
  ].join("\n");
}

function orderProduct(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const message = buildMessage(product);
  if (!message) return;

  const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".order-btn");
  if (!button) return;
  orderProduct(button.dataset.productId);
});

renderProducts();
