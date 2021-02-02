# Blackjack Switch

Blackjack Switch is a single page game.
It's built on ReactJS, HTML, CSS, and Express.

## Project Description

Blackjack Switch was built for our final project at Lighthouse Labs. My team and I built everything from the ground up. The server is built with Express which allows users to sign-in, deposit and withdraw funds. The client side is built using React, making heavy use of State and Props.

- The player makes a bet on every hand.
- Players are dealt two hands, containing 2 face-up cards each while the dealer gets one card.
- The player then plays his two hands vs. the dealer's.
- The goal is to get the value of your hands closer to 21 than the dealer's, without going over 21.
- The game then checks for winner and updates the bankroll accordingly.
- More in depth rules can be found in the Rules.jsx file 

*you will be able to play without signing in to an account, but you will not be able to bet money and see the change in your bankroll unless you do


## Final Product

### Betting and playing a hand
!["Betting and playing a hand"](https://github.com/NDGP/black-jack-switch/blob/main/gifs%20for%20demonstration/BJS.gif?raw=true)

### Splitting when you have a hand of two identical values (fyi: never split a 20)
!["Splitting when you have a hand of two identical values"](https://github.com/NDGP/black-jack-switch/blob/main/gifs%20for%20demonstration/Splitting.gif?raw=true)

### Menu, rules and account registration
!["Menu, rules and account registration"](https://github.com/NDGP/black-jack-switch/blob/main/gifs%20for%20demonstration/rules%20and%20registration.gif?raw=true)


## Installing and running the app

- Install all dependencies (using the `npm install` command).
- paste the following into a .env file in back-end directory:

  DB_HOST = localhost
  DB_USER = labber
  DB_PASS = labber
  DB_NAME = black_jack_switch
  DB_PORT = 5432

- creating the database by running `createdb black_jack_switch -O labber`
- run npm run db:reset
- run the back end server by running `npm start` from the back-end directory
- run client server by running `npm start` from the client directory
- Launch browser and navigate to localhost:3000
- Play Blackjack Switch!

## dependencies

- Node.js
- React.js
- Express
- bcrypt
- cookie-session
- axios
- bootstrap
- pg, pg-native
