var exactMatches = 0;
$( init );

function init() {

  var totalTime = 35;
  var tWidget = setInterval(function(){

    if(totalTime <= 0 ){

      clearInterval(tWidget);
      $('#losingText').show();

      $('#losingText').animate({
        left: '380px',
        top: '200px',
        width: '400px',
        height: '150px',
        opacity: 1
        });

    }
    else if(exactMatches==10){
        clearInterval(tWidget);
        totalTime = 35;
    }
    else{
    document.getElementById('time-remaining').innerText=totalTime-1;
    totalTime -= 1;

    }

  }, 1000);

  $('#winningText').hide();
  $("#losingText").hide();
  $('#winningText').css({
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  });

  $('#losingText').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  exactMatches = 0;
  $('#firstRow').html( '' );
  $('#secondRow').html( '' );

  var digits = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
  digits.sort( function() { return Math.random() - .5 } );

  for ( var i=0; i<10; i++ ) {
    $('<div>' + digits[i] + '</div>').data( 'digits', digits[i] ).attr( 'id', 'card'+digits[i] ).appendTo( '#firstRow' ).draggable( {
      containment: '#content',
      stack: '#firstRow div',
      cursor: 'move',
      revert: true
    } );
  }

  var spelledNumbers = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten' ];
  for ( var i=1; i<=10; i++ ) {
    $('<div>' + spelledNumbers[i-1] + '</div>').data( 'digits', i ).appendTo( '#secondRow' ).droppable( {
      accept: '#firstRow div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }

}

function handleCardDrop(event, ui) {
  
  var index = $(this).data('digits');
  var cardNumber = ui.draggable.data('digits');

  if (index === cardNumber) {
    ui.draggable.addClass('correct');
    ui.draggable.draggable('disable');
    $(this).droppable('disable');
    ui.draggable.position({
      of: $(this), my: 'left top', at: 'left top'
    });

    ui.draggable.draggable('option', 'revert', false);
    exactMatches++; 
  }
  if (exactMatches === 10) {
    $('#winningText').show();
    $('#winningText').animate({
      left: '380px',
      top: '200px',
      width: '400px',
      height: '150px',
      opacity: 1
    });


  }

 
  
}

