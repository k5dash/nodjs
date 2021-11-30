console.clear();
let table = document.getElementById('table'),
cardWidth = 100, cardHeight = 150,
cardCount = 1, startingHands = 0, cardMap=[];

function init() {
    // Initial draw
    cardWidth = 100, cardHeight = 150,
    cardCount = 1, startingHands = 0;
    
    cardMap=[];
    for (var i = 0; i<52;i++){
        cardMap.push(i);
    }
    $(".card").remove();
    gsap.timeline().restart();
}

(function() {
  "use strict";
  
  const symbols = ["♣", "♠", "♥", "♦"];
  const numbers = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  bindEvents();
/*  
  function start() {
    if(startingHands < 3) {
      startingHands++;
      draw();
      
      setTimeout(start, 1000);
    }
  }
*/ 
  function bindEvents() {
    document.querySelector("body").addEventListener('click', () => {
      if (cardMap.length == 0){
          alert("没卡了!");
          return;
      }
      draw();
    });
  }
  
  function draw() {
    let tl = gsap.timeline(),
        position = getTableCenter(),
        card = addCard();
    
    cardCount++;
    
    gsap.set(card, {
      y: -table.offsetHeight,
      x: table.offsetWidth / 2,
      zIndex: cardCount,
    });
    let offsetX = table.offsetWidth * .5,
        offsetY = table.offsetHeight * .5;
    tl.addLabel('start')
      .to(card, {
        duration: 1.5,
        ease: Power2.easeOut,      
        x: position.x + getRandom(-offsetX, offsetX)*0.8,
        y: position.y + getRandom(-offsetY, offsetY)*0.8,
      }, 'start')
      .to(card, {
        duration: 1.4,
        ease: Power2.easeOut,
        rotation: getRandom(360),
      }, 'start');
  }
  
  function addCard() {
    let card = document.createElement('div');
    card.className = 'card';
    let span = document.createElement('span');
    let index = Math.floor(Math.random() * cardMap.length);
    let card_color = ((cardMap[index]<52/2) ? ' card__symbol--red' : '')
    let card_value = cardMap[index]%13
    span.className = 'card__symbol' + card_color;
    console.log(cardMap[index]);
    span.appendChild(document.createTextNode(symbols[Math.floor(cardMap[index]/52 * symbols.length)]))
    let number = document.createElement('span');
    cardMap.splice(index, 1);

    number.innerHTML = numbers[card_value];
    number.className = "card__number--top-left "+ card_color;
    card.appendChild(span);
    card.append(number);
    number = document.createElement('span');
    number.innerHTML = numbers[card_value];
    number.className = "card__number--bottom-right "+card_color;
    card.append(number);
    table.appendChild(card);
    
    return card;
  }

  function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  
  function getTableCenter() {
    return {
      x: (table.offsetLeft + table.offsetWidth / 2) - (cardWidth / 2),
      y: (table.offsetTop + table.offsetHeight / 2) - (cardHeight / 2),
    };
  }
  
  function getRandom(min, max = null) {
    let realMax = (max === null ? min * 2 : max);
    return min + Math.random() * (realMax - min);    
  }  
    
  
  init();
  
})();