'use strict';

let store = [
  {name : 'apples', checked : false},
  {name : 'oranges', checked : false},
  {name : 'milk', checked : true},
  {name : 'bread', checked : false},
];

function addItem() {
  $('#js-shopping-list-form').on('submit', function(event) {
    event.preventDefault();
    const itemName = $('#shopping-list-entry').val();
    // create item object and add to stor array.
    store.push({ name: itemName, completed: false });
    renderShoppingList();
    return true;
  });
}

function deleteItem() {
  $('.shopping-item-delete').on('click', function() {
    store.splice($(this).closest('li').attr('item-index'), 1);
    $(this).parent().parent().remove();
    renderShoppingList();
  });
}
function toggleItem() {
  // Unable to use addClass, removeClass, toggleClass. Even after verifying its targeting properly.
  $('.shopping-item-toggle').on('click', function() {
    let currentItem = parseInt($(this).closest('li').attr('item-index'));
    if (store[currentItem].checked === true) {
      store[currentItem].checked = false;
    } else {
      store[currentItem].checked = true;
    }
    //$(this).parent().prev().toggleClass('shopping-item__checked');
    renderShoppingList();
  });
}

function generateItemHTML(item, index) {
  const itemCheckedClass = item.checked ? 'shopping-item__checked' : '';
  return `
    <li item-index="${index}">
      <span class="shopping-item ${itemCheckedClass}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>
  `;
}

function generateShoppingList(items) {
  const itemElements = items.map((item, itemIndex) => {
    return generateItemHTML(item, itemIndex);
  });
  return itemElements.join('');
}

function renderShoppingList() {
  const listHTML = generateShoppingList(store);
  $('.shopping-list').html(listHTML);
  deleteItem();
  toggleItem();
}

function main() {
  renderShoppingList();
  addItem();
  deleteItem();
  toggleItem();
}

$(main);