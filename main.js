const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        this.field[0][0] = pathCharacter; 
        //path character staring position
    }

runGame() {
let playing = true;
while (playing) {
  this.print();
  this.askQuestion();
  if(!this.isInBound()) {
    console.log('Instructions are out of bound!');
    playing = false;
    break;
  } else if (this.isHole()) {
    console.log('Opps, you fell down a hole! Try again');
    playing = false;
  } else if (this.isHat()) {
    console.log('Hip hip horray, you found your hat!!');
    playing = false;
    break;
  }
// current location update
this.field[this.locationY][this.locationX] = pathCharacter;
  }
}

askQuestion() {
const answer = prompt('Which direction?').toUpperCase();
switch (answer) {
  case 'L':
    this.locationX -= 1;
    break;
  case 'R':
    this.locationX += 1;
    break;
  case 'U':
     this.locationY -= 1;
     break;
  case 'D':
      this.locationY += 1;
      break;
    default:
     console.log('Please enter L/R/U/D!');
     this.askQuestion();
     break;
}
}

isInBound() {
return (
  this.locationY >= 0 &&
  this.locationX >= 0 &&
  this.locationY < this.field.length &&
  this.locationX < this.field[0].length
 );
}

isHat() {
  return this.field[this.locationY][this.locationX] === hat;
}

isHole() {
return this.field[this.locationY][this.locationX] === hole;
}

print() {
    const displayString = this.field.map(row => { 
      return row.join('');
      }).join('\n');
    console.log(displayString);
  }
// random height and width to be decided freom out output
//filed is new arrays 
static generateField(height, width, percentage = 0.1) {
  const field = new Array(height).fill(0).map(el => new Array(width));
  for(let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const prob = Math.random();
      field[x][y] = prob > percentage ? fieldCharacter : hole;   // placement formula 
     }
  }
//placing the hat onto the Field
const hatLocation = {
  x: Math.floor(Math.random() * width),
  y: Math.floor(Math.random() * height)
};
//hat not on starting point
while (hatLocation.x === 0 && hatLocation.y === 0) {
  hatLocation.x =  Math.floor(Math.random() * width);
  hatLocation.y = Math.Floor(Math.random() * height);
}
field[hatLocation.y][hatLocation.x] = hat
return field;
}; 
};

const myfield = new Field(Field.generateField(10, 10, 0.2));
myfield.runGame();


