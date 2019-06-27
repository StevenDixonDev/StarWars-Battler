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
    special:  function(){},
    alignment: "Republic",
    picture: {
      ground: '',
      space: ''
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
    special:  function(){},
    alignment: "Sith",
    picture: {
      ground: '',
      space: ''
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
    special:  function(){},
    alignment: "Republic",
    picture: {
      ground: '',
      space: ''
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
    special:  function(){},
    alignment: "Sith",
    picture: {
      ground: '',
      space: ''
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
    special:  function(){},
    alignment: "Sith",
    picture: {
      ground: '',
      space: ''
    }
  },
  {
    name: 'Rebel Army',
    power: 10,
    retaliation: 10,
    attacks: 2,
    maxHp: 0,
    evasion: 0,
    //Gurrella warfare: 
    special:  function(){},
    alignment: "Republic",
    picture: {
      ground: '',
      space: ''
    }
  }
]


// to do go find sounds for fight
// list of sound effects
const soundEffects = []



// function to create a new army
function createArmy(army){
  this.hp = army.maxHp;
  this.power = army.power;
  this.name = army.name;
  this.attacks = army.attacks;
  this.evasion = army.evasion;
  this.retaliation = army.retaliation;
  this.special = army.special;
  this.attack = function(evasion = 0){
    //handles attack damage
    let damage = 0;
    // army attacks = to number of attacks but power is random
    for(let i = 0; i < this.attacks; i++){
      damage += Math.floor(Math.random()*this.power)
    }
    // substract other armies evasion to calculate total damage
    damage = damage - evasion;
    // if damage is negative set it to zero
    if(damage < 0) damage = 0;
    return damage;
  }
  this.retaliate = function(evasion = 0){
    let damage = 0;
    for(let i = 0; i < this.attacks; i++){
      damage += Math.floor(Math.random()*this.retaliation)
    }
    damage = damage - evasion;
    if(damage < 0) damage = this.power;
    return damage;
  }
  this.levelUp = function(){
    // when player levels up 
    this.attacks+=1;
  }
  this.useSpecial = function(){
    this.special();
  }
}


let myArmy = new createArmy(armies[1]);

console.log(myArmy)

console.log(myArmy.attack(5))