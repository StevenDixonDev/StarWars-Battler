# Star Wars Armies Battler Game

Do you have what it takes to conquer the galaxy? Test your skills in this browser based rpg.

## Libraries

- Jquery

## Concepts Tackled

- Factory functions
- Observer pattern
- SubPub pattern
- Game State and logic
- Jquery animation sequences

## What I learned

I learned the hard way that even though I can find really advanced options to tackle a problem, I should try to used what is necessary instead. I really created a mountian out of a mole hill on this one. I was trying to come up with a good way to handle the dom update logic outside of games input logic. What I eventually got working was a gameObserver that notifies the view object that it should be updated. 
