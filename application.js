$(function() {

  $('#store_list tbody tr').draggable({
    helper: 'clone',
  });


  $("#grocery_list").droppable({
    accept: '#store_list tbody tr',
    drop: function(event, ui) {
      grocery_list.addItem(item);
      grocery_list.render();
    }
  });

  $('#store_list tbody').on('mousedown', 'tr', function(e){
    var name = $(this).find('.item_name').text();
    var price = $(this).find('.item_price').text();
    item = new Item(name, price);
  });
});

function Item(name, price) {
    this.name = name;
    this.price = price;
};


Item.prototype = {
  render: function() {
    return '<tr><td>'+this.name +'</td><td>'+this.price+'</td></tr>';
  }
};

function List(container){
  this.container = container;
  this.items = [];
}

List.prototype = {
  addItem: function(item) {
    this.items.push(item);
  },

  getTotal: function() {
    var totalPrice = 0;
    for (var i = 0; i < this.items.length; i++) {
      totalPrice = totalPrice + +this.items[i].price;
    }
    return totalPrice.toFixed(2);
  },

  render: function() {
    var tableBody = '';
    for (var i = 0; i < this.items.length; i++) {
      var tableBody = tableBody + this.items[i].render();
    }

    $(this.container).find('tbody').html(tableBody);
    $(this.container).find('#total_cost').text(this.getTotal());
  }
};

grocery_list = new List("#grocery_list");

/*
* What are the objects in this exercise?
* What are their properties and methods?
* How do your objects interact with their respective DOM elements?
*/
