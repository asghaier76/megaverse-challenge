# CrossMint Megaverse Challenge

## Description

Building the Megaverse takes time and brilliance, it can't be done at once. 

Building the Megaverse happened in three steps.

### Populating 🪐POLYanets🪐

The goal matrix shows that there is symmetry drawn around row and col 13 so there are four petals in four qudrants

So, getting the POLYanets 🪐 in place requires running the same code to planet the POLYanets 🪐 in each qudrant 
but with a twist of the indices based on which quadrant is targeted using the a transformation built for that.

Inside each quadrant, there is also a pattern that shows it can be done in steps of filling two in a row then 
two in a column, and then repeat in the opposite order.

### Sprinkling 🌙SOLOONs🌙

Here a mapping table is used extracted from the goals matrix to sprinkle the 🌙SOLoons each in its position, 
there was no pattern identfied. A check point is to make sure that the sent to index is adjacent to a 🪐POLYanet. 

### The Guarding ☄COMETHs☄

As the guardians of the Megaverse, the same approach of a mapping table is used extracted from the goals matrix to 
throw the ☄COMETHs and scatter them across the Megaverse.

### Megaverse temporal and spatial glitches
As expected, building a Megaverse is full of surprises, physics can't yet explain all about it, so glitches were 
handled by adding a timing and retry interceptor to resend objects into the Megaverse if Law of HTTP produced the 429 constant.

### Watch it get built
A simple colorful astor-console displays what is happening as objects gets sent into the Megaverse.

## Installation

```bash
$ npm install
```

## Running the app

To run phase 1 run 
```bash
$ npm run start:phase1
```

To run phase 2 run 
```bash
$ npm run start:phase2
```

To wipe a single index and replace it with SPACE run
```bash
$ npm run start:wipe -- --action one --index row,col
```

To wipe entire Megaverse and replace it with all SPACEs
```bash
$ npm run start:wipe -- --action all
```

To extract the indices for 🌙SOLOONs and ☄COMETHs run this command
```bash
$ npm run extract
```

## Stay in touch

- Author - [Ahmad Sghaier](https://www.linkedin.com/in/ahmad-sghaier-2619a645/)
- Twitter - [@ahmad_sghaier](https://twitter.com/ahmad_sghaier)