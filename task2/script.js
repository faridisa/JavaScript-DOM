const cart = [];
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");

function money(value) {
  return "₺" + value.toLocaleString("tr-TR");
}

function renderCart() {
  let html = "";
  let total = 0;
  cartCount.textContent = cart.length + " ürün";

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="cart-empty">Sepet boş. Bir ürün ekleyin.</p>';
    cartTotal.textContent = money(0);
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price * item.qty;
    html +=
      '<div class="cart-row">' +
      '<img src="' +
      item.image +
      '" alt="' +
      item.name +
      '">' +
      "<div>" +
      "<h3>" +
      item.name +
      "</h3>" +
      "<p>" +
      money(item.price) +
      " · Adet " +
      item.qty +
      "</p>" +
      '<div class="cart-row-actions">' +
      "<strong>" +
      money(item.price * item.qty) +
      "</strong>" +
      '<div class="qty-control">' +
      '<button type="button" data-action="dec" data-id="' +
      item.id +
      '">−</button>' +
      "<span>" +
      item.qty +
      "</span>" +
      '<button type="button" data-action="inc" data-id="' +
      item.id +
      '">+</button>' +
      "</div>" +
      "</div>" +
      '<button type="button" class="remove-button" data-action="del" data-id="' +
      item.id +
      '">Sil</button>' +
      "</div>" +
      "</div>";
  }

  cartItems.innerHTML = html;
  cartTotal.textContent = money(total);
}

document
  .querySelectorAll(".product-card [data-add-to-cart]")
  .forEach(function (button) {
    button.addEventListener("click", function () {
      const card = button.closest(".product-card");
      const id = Number(card.dataset.id);
      const item = cart.find(function (x) {
        return x.id === id;
      });

      if (item) item.qty++;
      else
        cart.push({
          id: id,
          name: card.dataset.name,
          price: Number(card.dataset.price),
          image: card.dataset.image,
          qty: 1,
        });

      renderCart();
    });
  });

cartItems.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  const index = cart.findIndex(function (x) {
    return x.id === id;
  });
  if (index === -1) return;

  if (action === "inc") cart[index].qty++;
  if (action === "dec")
    cart[index].qty > 1 ? cart[index].qty-- : cart.splice(index, 1);
  if (action === "del") cart.splice(index, 1);

  renderCart();
});

clearCartButton.addEventListener("click", function () {
  cart.length = 0;
  renderCart();
});

renderCart();
