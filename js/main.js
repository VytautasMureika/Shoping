$(document).ready( function () {
    
    getItemList(); // makes an array from localStorage
    printItemList(); // shows information of array from localStorage
    cartList();
    $('#list').on('click', function () {
        $('.item-box').removeClass('big').addClass('list');
    });

    $('#big').on('click', function () {
        $('.item-box').removeClass('list').addClass('big');
    });

    $('.add-to-cart').on('click', updateCart);
    
    $('#cart-button').on('click', function () {
        cartList();
    });
    
    $('.item-box').hover( function () {
        $(this).toggleClass('highlighted');        
    });
});

var $itemArray = [];
var $cart = [];
var $price = null;
var $countAllItems = null;
var $rezult = [];

function getItemList () {

    var preke = null;

    for ( i=1; i<7; i++) {
        preke = "Preke"+i;
        var item = JSON.parse(localStorage.getItem(preke));
        $itemArray.push(item);
    }

    return $itemArray;
}

// Creates new tags and displays the array of $itemArray;

function printItemList () {
    
    var itemsList = $('#items-box');
    
    $.each($itemArray, function (index, val) {
        $(itemsList).append('<div>');
        
        var itemBox = $(itemsList).find('div:last');
        
        $(itemBox).addClass('item-box big').append('<img>');
        $(itemBox).find('img').attr('src', this.foto);
        $(itemBox).append('<ul>');
        $(itemBox).find('ul').append('<li>' + this.preke + '</li>');
        $(itemBox).find('ul').append('<li>' + this.kaina + '</li>');
        $(itemBox).append("<button rel='" + this.preke + "' type='button' class='btn btn-default show add-to-cart' aria-label='Left Align'><p>I Krepseli.</p></button>");
        
    })
}

// Function updates cart information 
//      in $('#total-price') total price section

function updateCart () {
    
    var $item = $(this).attr('rel');
    var $price = 0;
    
    // puts element in cart
    $.each( $itemArray, function (index, val) {
        if (this.preke === $item) {
            $cart.push(this);
        } 
    })
        
    $.each($cart, function (index, val) {
        $price += Number($cart[index].kaina);
    });
       
    $countAllItems = $cart.length;
        
    $('#total-price').html('<p>Swords in cart: ' + $countAllItems + ' Total: ' + $price.toFixed(2) + ' Eu <p>' );
        
    $(this).addClass('sold');
    
}



// function generates list of items in the $cart array

function cartList () {
       
    var $modalBody = $('.category-menu');
        
    $modalBody.text('');

    // counts how many item objects is in the cart.
    $.each( $itemArray, function (index, val) {
            
        var $itemInArray = $itemArray[index].preke;
        var $itemPrice = $itemArray[index].kaina;
        var $count = 0;
        
        $.each( $cart, function (index, val) {
            if ( $cart[index].preke === $itemInArray) {
                $count += 1;
            } 
        });
        
        if ( $count > 0 ) {
            $modalBody.append( "<p>Preke " + $itemInArray + '. Krepselyje: ' + $count 
                              + "<span rel='" + $itemInArray + "' class='x'> X </span></p><p> Vieneto kaina: " 
                              + $itemPrice + '</p>');
        }
        
    });
    
    $('.x').on('click', deleItemFromCart);
}

// function removes item object from $cart array.

function deleItemFromCart () {
    
    //gets value of item name.
    var value = $(this).attr('rel')
    
    $("button[rel='"+value+"']").removeClass('sold');        
    //removes item object from $cart array.
    $cart = $.grep( $cart, function (obj, index) {        
        return obj.preke != value;
    });
    
    updateCart();
    cartList();
}




















