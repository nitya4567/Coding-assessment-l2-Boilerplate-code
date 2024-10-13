async function fetchCartData() {
  try {
      const response = await fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889');
      const data = await response.json();

      let cartItemsHTML = '';
      let total = 0;

      data.items.forEach((item, index) => {
          const subtotal = item.price * item.quantity;
          total += subtotal;

          cartItemsHTML += `
              <tr>
                  <td><img src="${item.image}" alt="${item.title}"> ${item.title}</td>
                  <td>₹ ${item.price}</td>
                  <td><input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input"></td>
                  <td>₹ <span class="subtotal" data-index="${index}">${subtotal}</span></td>
                  <td><span class="remove-item" data-index="${index}">🗑️</span></td>
              </tr>
          `;
      });

      document.querySelector('#cart-items tbody').innerHTML = cartItemsHTML;
      document.getElementById('subtotal').textContent = total;
      document.getElementById('total').textContent = total;

      document.querySelectorAll('.quantity-input').forEach(input => {
          input.addEventListener('change', updateQuantity);
      });

      document.querySelectorAll('.remove-item').forEach(button => {
          button.addEventListener('click', removeItem);
      });

  } catch (error) {
      console.error('Error fetching the cart data:', error);
  }
}
const toggleMenu = document.getElementById('toggle-menu');
const menuItems = document.querySelector('.menu-items');

toggleMenu.addEventListener('change', () => {
    if (toggleMenu.checked) {
        menuItems.classList.add('active');
    } else {
        menuItems.classList.remove('active');
    }
});
function updateQuantity(event) {
  const index = event.target.getAttribute('data-index');
  const newQuantity = event.target.value;
  const item = document.querySelectorAll('.cart-table tbody tr')[index];
  const price = parseFloat(item.querySelector('td:nth-child(2)').textContent.replace('₹ ', ''));
  const newSubtotal = price * newQuantity;

  item.querySelector('.subtotal').textContent = newSubtotal;

  calculateTotal();
}
function removeItem(event) {
  const index = event.target.getAttribute('data-index');
  document.querySelectorAll('.cart-table tbody tr')[index].remove();
  calculateTotal();
}
function calculateTotal() {
  let total = 0;
  document.querySelectorAll('.subtotal').forEach(sub => {
      total += parseFloat(sub.textContent);
  });

  document.getElementById('subtotal').textContent = total;
  document.getElementById('total').textContent = total;
}
document.getElementById('checkout-btn').addEventListener('click', () => {
  alert('Proceeding to checkout...');
});
fetchCartData();
