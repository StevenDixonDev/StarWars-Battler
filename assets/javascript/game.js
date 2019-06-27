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
const armies = [
  {
    name: 'Alliance Army',
    power: 0,
    retaliation: 0,
    attacks: 0,
    maxHp: 0,
    evasion: 0,
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
    power: 0,
    retaliation: 0,
    attacks: 0,
    maxHp: 0,
    evasion: 0,
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
    power: 0,
    retaliation: 0,
    attacks: 0,
    maxHp: 0,
    evasion: 0,
    //special: A friend in need: crickets
    special:  function(){},
    alignment: "Republic",
    picture: {
      ground: '',
      space: ''
    }
  },
  {
    name: 'Imperial Army',
    power: 0,
    retaliation: 0,
    attacks: 0,
    maxHp: 0,
    evasion: 0,
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
    power: 0,
    retaliation: 0,
    attacks: 0,
    maxHp: 0,
    evasion: 0,
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
    power: 0,
    retaliation: 0,
    attacks: 0,
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


// function to create a new army
function createArmy(){

}