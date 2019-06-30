/*

  Game Idea instead of jedi and sith we use armies

  space or ground battles are randomly chosen, maybe just theme.

  instead of direct numbers players gain more power in the realm of number of attacks

  I wanted to learn how to use 
  - factory patterns
  - Observer patterns
*/ 

// Define the armies and their stats
// Balancing the armies will be the hardest part
const armies = [
  {
    name: 'Alliance Army',
    power: 10,
    retaliation: 10,
    attacks: 2,
    maxHp: 50,
    evasion: 5,
    //Madines Rules: deals double damage when hp is low
    special: function () { },
    alignment: "Republic",
    picture: {
      ground: 'Alliance Army-ground.png',
      space: 'Alliance Army-space.jpg'
    }
  },
  {
    name: 'Droid Army',
    power: 10,
    retaliation: 10,
    attacks: 2,
    maxHp: 50,
    evasion: 2,
    //Indomitable Force: Takes no damage for a turn after making a attack
    special: function () { },
    alignment: "Sith",
    picture: {
      ground: 'droid army-ground.jpg',
      space: 'droid army-space.jpg'
    }
  },
  {
    name: 'Gungan Grand Army',
    power: 10,
    retaliation: 10,
    attacks: 2,
    maxHp: 50,
    evasion: 2,
    //special: Gungan Shields: increases evasion by *2?
    special: function () { },
    alignment: "Republic",
    picture: {
      ground: 'Gungan-ground.jpg',
      space: 'Gungan-space.png'
    }
  },
  {
    name: 'Imperial Army',
    power: 15,
    retaliation: 15,
    attacks: 2,
    maxHp: 50,
    evasion: 2,
    //Prowess of the Sith: Lowers enemy evasion 
    special: function () { },
    alignment: "Sith",
    picture: {
      ground: 'imperial army-ground.jpg',
      space: 'imperial space.jpg'
    }
  },
  {
    name: 'Republic Army',
    power: 10,
    retaliation: 10,
    attacks: 2,
    maxHp: 50,
    evasion: 2,
    //Backup: Call in an extra attack from space
    special: function () { },
    alignment: "Sith",
    picture: {
      ground: 'republic-ground.png',
      space: 'republic-space.png'
    }
  },
  {
    name: 'Rebel Army',
    power: 10,
    retaliation: 10,
    attacks: 2,
    maxHp: 50,
    evasion: 2,
    //Gurrella warfare: 
    special: function () { },
    alignment: "Republic",
    picture: {
      ground: 'rebel-ground.jpg',
      space: 'rebel-space.jpg'
    }
  }
]


// to do go find sounds for fight
// list of sound effects
const soundEffects = {
  music: [
    "./assets/sounds/Asteroid chase.mp3",
    "./assets/sounds/falcon.mp3"
  ],
  battle: {
    fire: [
      "./assets/sounds/tiefighter.mp3",
      "./assets/sounds/xwingfire.mp3",
      "./assets/sounds/turretfire.mp3"
    ],
    exposion: [
      "./assets/sounds/explode1.mp3",
      "./assets/sounds/explode2.mp3"
    ]
  },
  alarm: "./assets/sounds/Battle alarm.mp3"
}

// Army factory function
function createArmy(army) {
  this.hp = army.maxHp;
  this.power = army.power;
  this.name = army.name;
  this.attacks = army.attacks;
  this.evasion = army.evasion;
  this.retaliation = army.retaliation;
  this.special = army.special;
  this.attack = function (evasion = 0) {
    //handles attack damage
    let damage = 0;
    // army attacks = to number of attacks but power is random
    for (let i = 0; i < this.attacks; i++) {
      damage += Math.floor(Math.random() * this.power)
    }
    // substract other armies evasion to calculate total damage
    damage = damage - evasion;
    // if damage is negative set it to zero
    if (damage < 0) damage = 0;
    return damage;
  }
  this.retaliate = function (evasion = 0) {
    let damage = 0;
    for (let i = 0; i < this.attacks; i++) {
      damage += Math.floor(Math.random() * this.retaliation)
    }
    damage = damage - evasion;
    // make sure the enemy does damage
    if (damage < 0) damage = this.power;
    return damage;
  }
  this.levelUp = function () {
    // when player levels up increase number of attacks
    this.attacks += 1;
  }
  this.useSpecial = function () {
    // not completely definite yet.
    this.special();
  }
  return this;
}

// create a subscriber for events mainly if we need to do updates
// function subscriber() {
//   let subscribers = {};
//   return {
//     publish(event, callback) {
//       // method that adds updated
//       // if the event does not exist add the event
//       if (!subscribers[event]) {
//         subscribers[event] = [];
//       }
//       // add callback in event as an array
//       subscribers[event].push(callback);
//     },
//     subscribe(event, data) {
//       //check to see if event exists
//       if (!subscribers[event]) return;
//       // call all callbacks registered to that event
//       subscribers[event].forEach(subscriberCallback =>
//         subscriberCallback(data));
//     }
//   }
// }

// const subcriberFunction = subscriber();

// create an observer that will update our object when things change
function observer(){
  let observers = [];
  return {
    subscribe(callback){
      observers.push(callback);
    },
    unsubscribe(f){
      observers = observers.filter(subsciber => subsciber !== f);
    },    
    notify(data){
      observers.forEach(observer => observer.update(data));
    }
  }
}

const gameObserver = new observer();
// Create Menu Logic
const gameModel = {
  data: {
    // keep track of where the game currently is
    gameState: 'menu',
    // keep track of which person is picking a character in the menu
    menuState: 'player',
    // keep track of players army
    playerChoice: null,
    // keep track of enemy army
    enemyChoice: null,
    // keep track of which turn it is in the game
    turn: '',
    // keep track of the remaining armies
    remainingArmies: []
  },
  setTurn: function (whosTurn) {
    // can be player or computer
    this.data.turn = whosTurn;
  },
  setGameState: function (newState) {
    // states can be menu playing end?
    this.data.gameState = newState;
  },
  setMenuState: function (newState) {
    this.data.menuState = newState;
  },
  setArmy: function (armyName, user) {
    // create the army the player picks of the user specified
    let army = new createArmy(this.getArmy(armyName));
    if (user === 'player') {
      this.data.playerChoice = army;
    } else {
      this.data.enemyChoice = army;
    }
  },
  getArmy: function (armyName) {
    // filter through armies to return the one the player picked
    return armies.filter(function (item) {
      if (item.name === armyName) {
        return item
      }
    })[0];
  },
  removeArmy: function (armyName) {
    this.data.remainingArmies = this.data.remainingArmies.filter(item => item !== armyName);
  },
  init: function () {
    this.setGameState('menu');
    this.setTurn('player');
    this.data.remainingArmies = armies.map(item => item.name);
    //this.update();
    return this;
  },
  update: function (data) {
    this.data = data;
    //update the dom event listeners
    this.handleInput();
  },
  handleInput: function () {
    switch (this.data.gameState) {
      case 'menu': handleInputMenu(this); break;
      case 'playing': handleInputPlaying(this); break;
      case 'end': handleInputEnd(this); break;
    }
  }
}

function handleInputMenu(context) {
  $('.menu-army').click(function () {
    if (context.data.menuState === 'player') {
      context.setArmy($(this).attr('name'), 'player');
      context.setMenuState('enemy');
    } else if (context.data.menuState === 'enemy') {
      context.setArmy($(this).attr('name'), 'enemy');
      context.setMenuState('ready');
    }
    // remove the chosen from the remaining armies
    context.removeArmy($(this).attr('name'));
    //update the dom
    if (context.data.menuState === 'ready') {
      $('#menu').toggleClass('zoomout');
      $('#game').toggleClass('zoom');
    }
    gameObserver.notify(context.data);
  })
}


const gameView = {
  data: {},
  init(){
    return this;
  },
  update(data){
    this.data = data;
    switch (data.gameState) {
      case 'menu': this.renderMenu(data); break;
      case 'playing': this.renderGame(this); break;
      case 'end': this.renderEnd(this); break;
    }
  },
  renderMenu(data) {
    // context = this
    // side effect is it clears the event listeners
    $("#army-wrapper").empty();
    if (data.menuState === 'player') {
      $(".menu-intro-instructions").text("Select Your Army:");
    } else if (data.menuState === 'enemy') {
      $(".menu-intro-instructions").text("Select the Enemy Army:");
    }
    $.each(data.remainingArmies, function (key, army) {
      //console.log(key, army)
      armies.forEach(function (item) {
        if (item.name === army) {
          $("#army-wrapper").append(`
             <div class="menu-army" name="${item.name}">
               <img class="menu-army-img ${item.alignment}" src="./assets/images/${item.picture.ground}"></img>
               <h2 class="menu-army-title" >${item.name}</h2>
             </div>`)
        }
      });
    });
  },
  renderGame(data) {
    // context = this
  
  },
  renderEnd(data) {
    //status is our win or lose
  }
}


function handleInputPlaying(context) {

}

function handleInputEnd(context) {

}

function playSound() {
  // need to figure out how to play a sound then play another right after...
  // var audio = new Audio('audio_file.mp3');
  // audio.play();
  // audio.volume = .03;

  // audio.play().then(() => {
  //   this.audioState = false;
  // });
}

$(document).ready(function(){
  // todo these are dependant because of input
  // initialize the view
  gameObserver.subscribe(gameView.init());
  // initialize the game logic
  gameObserver.subscribe(gameModel.init());
  gameObserver.notify(gameModel.data);
});


