/*

  Game Idea instead of jedi and sith we use armies

  space or ground battles are randomly chosen, maybe just theme.

  instead of direct numbers players gain more power in the realm of number of attacks


  Alliance Army = {
    special: Madines Rules: deals double damage when hp is low
    alignment: Republic
  },

  Droid Army = {
    special: Indomitable Force: Takes no damage for a turn after making a attack
    alignment: Sith
  }

  Gungan Grand Army = {
    special: A friend in need: crickets
    alignment: Republic
  }

  Imperial Army = {
    special: Prowess of the Sith: Lowers enemy evasion 
    alignment: Sith
  }

  Republic Army = {
    special: Backup: Call in an extra attack from space
    alignment: Sith
  }

  Rebel Army = {
    special: Gurrella warfare: 
    alignment: Republic
  }


*/


// Create a menu where the player can pick their army

// should be six characters with different stats

// when fighting randomly choose between ground and space

// 

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
const soundEffects = []

// function to create a new army
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
}

let myArmy = new createArmy(armies[1]);

console.log(myArmy.attack(5));

// Create Menu Logic


const Game = {
  data: {
    gameState: 'menu',
    playerChoice: null,
    enemyChoice: null,
    turn: '',
  },
  setTurn: function (whosTurn) {
    // can be player or computer
    this.data.turn = whosTurn;
  },
  setGameState: function (newState) {
    // states can be 
    // menu
    // playing
    // end?
    this.data.state = newState;
  },
  setPlayerArmy: function(value){

  },
  init: function () {
    this.setGameState('menu');
    this.setTurn('player');
    this.render();
    this.handleInput();
  },
  render: function () {
    switch (this.data.gameState) {
      case 'menu': renderMenu(this); break;
      case 'playing': renderGame(this); break;
      case 'end': renderEnd(this); break;
    }
  },
  handleInput: function(){
    switch(this.data.gameState){
      case 'menu': handleInputMenu(this); break;
      case 'playing': handleInputPlaying(this); break;
      case 'end': handleInputEnd(this); break;
    }
  }
}

function renderMenu(context) {
  // context = this
  $.each(armies, function(key, item){
    console.log(item)
    $("#army-wrapper").append(`
      <div class="menu-army" name="${item.name}">
        <img class="menu-army-img ${item.alignment}" src="./assets/images/${item.picture.ground}"></img>
        <h2 class="menu-army-title" >${item.name}</h2>
      </div>
    `)
  }) 

}

function renderGame(context) {
  // context = this

}

function renderEnd(context) {
  //status is our win or lose
}

function handleInputMenu(context){
  $('.menu-army').click(function(){
    context.setPlayerArmy($(this).attr('name'));
    $('#menu').toggleClass('zoomout');
    $('#game').toggleClass('zoomin');
  })
}

function handleInputPlaying(context){
  
}

function handleInputEnd(context){

}


Game.init();

