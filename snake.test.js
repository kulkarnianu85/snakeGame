const snake= require("./snake");
//const keydownevents = require("./onkeydown");
//Game class Object
var gameTst;
//Snake class object
var gameSnake = new snake.Snake();

beforeEach(() => {
    gameTst = new snake.Game();
  });

//1.Check Fenstergröße
test("1.Game-Fenster spielgröße ist 300*300 ", () =>
{
var height = gameTst.C_HEIGHT;
var width = gameTst.C_WIDTH;
expect(height).toBe(300);
expect(width).toBe(300);

});

//2.1Snake soll 3 dots betragen
test("2.Beide Schlange sind 3 dots groß",()=>
{
    gameTst.createSnake();
    expect(gameTst.snake1.dots).toBe(3);
    expect(gameTst.snake2.dots).toBe(3);
    

});

//• Beide snakes sind anders gestaltet.
/* test("Beide snakes sind anders gestaltet",() =>
{ 
    gameTst.loadImages();
    console.log(gameTst.ball.sizes.height);
   expect(gameTst.ball.src).not.toBe(gameTst.ball1.src);

});
*/
//Anfangsposition von der Schlangen
test("3.Anfangsposition von snake1: x[0]=90,y[0]=50 & Anfangsposition von snake1: x[0]=90,y[0]=30" ,()=>
{
gameTst.loadImages();
gameTst.createSnake();
expect(gameTst.snake1.x[0]).toBe(90);
expect(gameTst.snake1.y[0]).toBe(50);
expect(gameTst.snake2.x[0]).toBe(90);
expect(gameTst.snake2.y[0]).toBe(30);

});
//
test("4.pfeiltasten Arrow keys funktioniert richtig",()=>
{
    
    
    
    expect(gameTst.KEY_DOWN).toBe(40);
    expect(gameTst.KEY_UP).toBe(38);
    expect(gameTst.KEY_LEFT).toBe(37);
    expect(gameTst.KEY_RIGHT).toBe(39);
    expect(gameTst.KEY_W).toBe(87);
    expect(gameTst.KEY_A).toBe(65);
    expect(gameTst.KEY_S).toBe(83);
    expect(gameTst.KEY_D).toBe(68);
    
});

// Schlange sollen sich in schritten von 10 bewegen
test("5.Schlange bewegen sich in schritten von 10 pixeln", ()=>
{
    expect(gameTst.dotSize).toBe(10);

});

//Der Kopf sollte sich in Startposition(vorne) und der Körper dahinter befinden
test("6.Der Kopf befindet sich in Startposition(vorne) und der Körper dahinter und Bewegen sich in richtige richtung",()=>
{
    gameTst.createSnake();
    gameTst.snake1.move();
    gameTst.snake2.move();
    if(gameSnake.up)
    {
        expect(gameTst.snake1.y[0]).toBeLessThan(gameTst.snake1.y[1]);
        expect(gameTst.snake2.y[0]).toBeLessThan(gameTst.snake2.y[1]);
        expect(onkeydown).toBe(gameTst.snake1.KEY_UP);
        expect(onkeydown).toBe(gameTst.snake2.KEY_W);
                
    }
    if(gameSnake.down)
    {
        expect(gameTst.snake1.y[0]).toBeGreaterThan(gameTst.snake1.y[1]);
        expect(gameTst.snake2.y[0]).toBeGreaterThan(gameTst.snake2.y[1]);
        //expect(gameTst.snake1.down).toBe(true);
        //expect(gameTst.snake2.down).toBe(true);
        expect(onkeydown).toBe(gameTst.snake1.KEY_DOWN);
        expect(onkeydown).toBe(gameTst.snake2.KEY_S);
        
    }
    if(gameSnake.right)
    {
        expect(gameTst.snake1.x[0]).toBeGreaterThan(gameTst.snake1.x[1]);
        expect(gameTst.snake2.x[0]).toBeGreaterThan(gameTst.snake2.x[1]);
        expect(onkeydown).toBe(gameTst.snake1.KEY_RIGHT);
        expect(onkeydown).toBe(gameTst.snake2.KEY_D);
        
    }
    if(gameSnake.left)
    {
        expect(gameTst.snake1.x[0]).toBeLessThan(gameTst.snake1.x[1]);
        expect(gameTst.snake2.x[0]).toBeLessThan(gameTst.snake2.x[1]);
        expect(onkeydown).toBe(gameTst.snake1.KEY_LEFT);
        expect(onkeydown).toBe(gameTst.snake2.KEY_A);
        
    }
    console.log("Hiiiiiiiii");

});
//Das objekt Apfel soll zufällig platziert mit der Koordinaten in Schritten von 10 Pixeln
test("7.Das objekt Apfel ist zufällig platziert mit der Koordinaten in Schritten von 10 (wie dotSize) Pixeln  ", ()=>
{
    gameTst.locateApple();
    expect(gameTst.apple_x % gameTst.dotSize).toBe(0);
    expect(gameTst.apple_y % gameTst.dotSize).toBe(0);

});
//Scores
test("8.initial Score ist 0",()=>
{
    gameTst.createSnake();
    expect(gameTst.snake1.score).toBe(0);
    expect(gameTst.snake2.score).toBe(0);

});

//Snake1 wird länger wenn sie Apfel essen
test("9.Die Schlange snake1 ist 4 dots groß nachdem sie einen Apfel isst",()=>
{
    gameTst.createSnake();
    var initialDots1= gameTst.snake1.dots;
    console.log(initialDots1);
    
    gameTst.locateApple();
    gameTst.snake1.x[0]=gameTst.apple_x;
    gameTst.snake1.y[0]=gameTst.apple_y;
    console.log(gameTst.snake1.x[0], gameTst.snake1.y[0], gameTst.apple_x, gameTst.apple_y);
   gameTst.checkApple(gameTst.snake1);
   var resulDots1= gameTst.snake1.dots;
    console.log(resulDots1);
    expect(resulDots1).toBe(initialDots1+1);

});

//Snake2 wird länger wenn sie Apfel essen
test("10.Die Schlange snake2 ist 4 dots groß nachdem sie einen Apfel isst",()=>
{
    gameTst.createSnake();
    var initialDots2= gameTst.snake2.dots;
    console.log(initialDots2);
    
    gameTst.locateApple();
    gameTst.snake2.x[0]=gameTst.apple_x;
    gameTst.snake2.y[0]=gameTst.apple_y;
    console.log(gameTst.snake2.x[0], gameTst.snake2.y[0], gameTst.apple_x, gameTst.apple_y);
   gameTst.checkApple(gameTst.snake2);
   var resulDots2= gameTst.snake2.dots;
    console.log(resulDots2);
    expect(resulDots2).toBe(initialDots2+1);

});

//Ckeck score for snake1
test("11.Score von snake1 erhöht sich von 0 bis 1 wenn er einen Apfel isst.", ()=>
{
    gameTst.createSnake();
    var initialscore1= gameTst.snake1.score;
    console.log(initialscore1);
    gameTst.locateApple();
    gameTst.snake1.x[0]=gameTst.apple_x;
    gameTst.snake1.y[0]=gameTst.apple_y;
    gameTst.checkApple(gameTst.snake1);
    var resultscore1 = gameTst.snake1.score;
    console.log(resultscore1);
    expect(resultscore1).toBe(initialscore1+1);

});

//Ckeck score for snake2
test("12.Score von snake1 erhöht sich von 0 bis 1 wenn er einen Apfel isst.", ()=>
{
    gameTst.createSnake();
    var initialscore2= gameTst.snake2.score;
    console.log(initialscore2);
    gameTst.locateApple();
    gameTst.snake2.x[0]=gameTst.apple_x;
    gameTst.snake2.y[0]=gameTst.apple_y;
    gameTst.checkApple(gameTst.snake2);
    var resultscore2 = gameTst.snake2.score;
    console.log(resultscore2);
    expect(resultscore2).toBe(initialscore2+1);
    gameTst.locateApple();
    gameTst.snake2.x[0]=gameTst.apple_x;
    gameTst.snake2.y[0]=gameTst.apple_y;
    gameTst.checkApple(gameTst.snake2);
    var resultscore2New=gameTst.snake2.score;
    console.log(resultscore2New);
    expect(resultscore2New).toBe(initialscore2+2);
    expect(resultscore2New).toBe(resultscore2+1);

});

//check delay
test("13.Timeout delay ist 540",()=>
{ 
    gameTst.init();
    expect(gameTst.DELAY).toBe(540);
    console.log("Delay is 540");

});

//check if ingame is true
test("14.Ingame is true",()=>
{
    gameTst.init();
    expect(gameTst.inGame).toBe(true);
    console.log("inGame is true");

});

//Matchers to be even ot tobe divisible by 2
expect.extend({
    toBeDivisibleBy(received, argument) { 
        const pass = received % argument == 0; 
        if (pass) { 
            return { 
                message: () => 'expected ${received} not to be divisible by ${argument}', 
                pass: true, 
            }; 
        } else { 
            return { 
                message: () => 'expected ${received} to be divisible by ${argument}', 
                pass: false, 
            };
        }
    },
});

test("15.even number", () => { 
    expect(100).toBeDivisibleBy(2);
});

//Matchers to be prime

expect.extend({
    toBePrimeNumber(received) { 
        
        if (typeof(received)==='number')
        {

        if (received==0 || received==1) 
        { 
            return { 
                message: () => 'expected ${received} either 0 or 1 and not a Prime Number', 
                pass: false, 
            }; 
        } 
        
        else 
        { 
            for(var i=2;i<received;i++)
            {
                if(received%i==0)
                {
                    return{
                        message: () => 'expected ${received} is a not prime number.', 
                pass: false, 

                    };
                }            
        }
        return { 
            message: () => 'expected ${received} is a prime number', 
            pass: true,

        };

        }
    }
    
    else
    {
        console.log(typeof(received));
            return { 
                message: () => 'expected ${received} is not a  Number.Please enter valid nr.', 
                pass: false, 
            }; 
    }
    },
});

test("16.prime number", () => { 
    expect(43).toBePrimeNumber();
    });



