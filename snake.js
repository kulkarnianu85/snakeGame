class Snake {
    /*
* creates a snake
* number of dots at the beginning need to be set
* coordinates of each dot need to be saved in the x and y arrays
*/
// Constructor for snake
constructor(dots , x , y, up, down,left,right)
{
    this.dots=dots;
    this.x=x;
    this.y=y;
    this.up=up;
    this.down=down;
    this.left=left;
    this.right=right;  
    this.score=0;    
}

  move()
  {
      for(var i=this.dots;i>0;i--)
      {
         this.x[i]=this.x[i-1];
         this.y[i]=this.y[i-1];
      }
      if(this.up)
      {
          this.y[0]-=game.dotSize;
      }
      if(this.down)
      {
          this.y[0]+=game.dotSize;  
      }
      if(this.right)
      {
          this.x[0]+=game.dotSize;
      }
      if(this.left)
      {
          this.x[0]-=game.dotSize;
      }

    }

  checkCollision()
  {
         
   if ((this.x[0] <= 0 || this.x[0]>=game.C_WIDTH)||(this.y[0] <= 0 || this.y[0]>=game.C_HEIGHT))
   {
       game.inGame=false;
       
   }
   
      for(var i=1;i<this.dots;i++)
      {
          if(this.x[0]==this.x[i]&& this.y[0]== this.y[i])
          {
            game.inGame=false;
          }
      } 
  }

  checkApple() 
  {

      // *****TODO 10: implement the code for this function*****
       if((this.x[0]== game.apple_x )&&(this.y[0]==game.apple_y))
      {
          this.dots += 1;
          this.score=this.dots-3;
          game.check_score();
                         
          game.locateApple();
  
      }  
  
  }   
   
 
}


class Game {
    constructor(){
        this.canvas;
        this.ctx;
        
        //variables for images for head, apple and ball
        this.head;
        this.apple;
        this.ball;
        this.ball1;
        
        //number of dots the snake consists of
        
        // *****TODO 1: initialize variable dots without a start value*****
        //2 variables for the apple coordinates
        this.apple_x;
        this.apple_y;    
        //boolean value if game is still going on, will be set to false if user loses
        this.inGame = true;  
        
        /*
        * variable that stores the size of a snake dot/the apple
        * size of each dot/the apple 10
        */
        
        // *****TODO 3: initialize dot size variable*****
        //this.dotSize = 10;
        this.dotSize=10;
        //height and width of the canvas
        this.C_HEIGHT = 300;
        this.C_WIDTH = 300;    
        
        //speed of the game 
        this.DELAY = 540;
        
        /*
        * constants, that store the values of the 4 arrow keys
        * in JavaScript: each key has a certain numer as keycode (see: http://keycode.info)
        */
        
        // *****TODO 4: initialize constants*****
        
        this.KEY_LEFT=37;
        this.KEY_RIGHT=39;
        this.KEY_UP=38;
        this.KEY_DOWN=40;
        
        //console.log(snake1Directions[0]);
        
        this.KEY_W=87;
        this.KEY_A=65;
        this.KEY_S=83;
        this.KEY_D=68;
        
        this.snake1;
        this.snake2;

        /*
        * two arrays that store the x and y coordinates of all joints (dots) of the snake (head e.g. is x[0], y[0])
        */
        
        // *****TODO 6: initialize arrays*****
        
        this.x = new Array();
        this.y = new Array();
    }



createSnake() {

this.snake1= new Snake(3, [90,80,70], [50,50,50], false, false, false, true);
  
this.snake2= new Snake(3, [90,80,70], [30,30,30] , false,true,false,false);

} 

locateApple() {

     // *****TODO 5: implement the code for this function*****
    
     this.apple_x = this.dotSize*Math.floor((Math.random()*this.C_WIDTH/this.dotSize),1) ;
     this.apple_y = this.dotSize*Math.floor((Math.random()*this.C_HEIGHT/this.dotSize),1);

    
}    

gameCycle() {
    
    if (this.inGame) {

        this.snake1.checkApple();
        this.snake2.checkApple();
        this.snake1.checkCollision();
        this.snake2.checkCollision();
        this.snake1.move();
        this.snake2.move();
        this.doDrawing();
        
        setTimeout("game.gameCycle()", this.DELAY);
    }
}

gameOver() {
    
    this.ctx.fillStyle = 'white';
    this.ctx.textBaseline = 'middle'; 
    this.ctx.textAlign = 'center'; 
    this.ctx.font = 'normal bold 18px serif';
    
    this.ctx.fillText('Game over', this.C_WIDTH/2, this.C_HEIGHT/2);
}


doDrawing() {
    
    this.ctx.clearRect(0, 0, this.C_WIDTH, this.C_HEIGHT);
    
    if (this.inGame) {

        this.ctx.drawImage(this.apple, this.apple_x, this.apple_y);

        for (var z = 0; z < this.snake1.dots; z++) {
            
            if (z == 0) {
                this.ctx.drawImage(this.head, this.snake1.x[z],this.snake1.y[z]);
            } else {
                this.ctx.drawImage(this.ball, this.snake1.x[z],this.snake1. y[z]);
            }
        }    
        for (var z = 0; z < this.snake2.dots; z++) {
            
            if (z == 0) {
                this.ctx.drawImage(this.head, this.snake2.x[z], this.snake2.y[z]);
            } else {
                this.ctx.drawImage(this.ball1, this.snake2.x[z], this.snake2.y[z]);
            }
        }    
    } else {

        this.gameOver();
    }        
} 


init() {
    
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.loadImages();
    this.createSnake();
    this.locateApple();
    setTimeout("game.gameCycle()", this.DELAY);
}   

//loads images for head, ball and apple
loadImages() {
    
    this.head = new Image();
    this.head.src = 'head.png';    
    
    this.ball = new Image();
    this.ball.src = 'dot.png';
    
    this.apple = new Image();
    this.apple.src = 'apple.png'; 

    // for snake 2
    this.ball1 = new Image();
    this.ball1.src='dotSnake2.png';

}
 check_score()
 {
    var score1=0;
    var score2=0; 

    score1=this.snake1.score;
    score2=this.snake2.score;
       
    document.getElementById("snake1").innerHTML=score1;
    document.getElementById("snake2").innerHTML=score2;

    //two arrays for saving 2 scores
    var score1_arr=new Array();
    var score2_arr=new Array();

    //add scores to arrays
    score1_arr.push(score1);
    score2_arr.push(score2);

    //sort arrays in descending order
    score1_arr.sort(function(a, b){return b - a});
    score2_arr.sort(function(a, b){return b - a});

    //display highest scores
    document.getElementById("txtFeld1").innerHTML= score1_arr[0];
    document.getElementById("txtFeld2").innerHTML= score2_arr[0];
     
    //alert if score reaches certain level
    if(score1_arr[0]==10 || score1_arr[0]==20)
    {        
        alert("Congratulations Player 1 !!! You are at desired score!!");
    }
    
    else if(score2_arr[0]==10 || score2_arr[0]==20)
    {
        alert("Congratulations Player 2 !!! You are at desired score!!");
    }


 }

 restart()
 {
    this.init(); 
    this.inGame=true;
    //restart from initial positions
    this.createSnake();
     
    //display scores as 0
    document.getElementById("snake1").innerHTML=0;
    document.getElementById("snake2").innerHTML=0;

 }
}

let game = new Game();

function restart() {
    game.restart();
}

function init()
{
    game.init();
}

/*
* sets the direction the snake is moving to
* --> updates the boolean values leftDirection, rightDirection, upDirection, downDirection
* the key value is stored in the variable "key"
* changing to the opposite direction is not possible, in that case nothing happens
* --> (e.g. snake is moving down and user presses UP_KEY)
*/
onkeydown = function(e) {
    
    var key = e.keyCode;
    
        // *****TODO 12: implement the code for this function*****
        if(key == game.KEY_DOWN && game.snake1.up==false)
        {
            game.snake1.down=true;
            game.snake1.right=false;
            game.snake1.left=false;
            game.snake1.up=false
        }
        if(key == game.KEY_RIGHT && game.snake1.left==false)
        {
            game.snake1.right=true;
           
            game.snake1.down=false;
            game.snake1.up=false;
        }
        if(key==game.KEY_LEFT &&  game.snake1.right==false)
        {
            game.snake1.left=true;
          
            game.snake1.up=false;
            game.snake1.down=false;
        }
        if(key==game.KEY_UP && game.snake1.down==false)
        {
            game.snake1.up=true;
           
            game.snake1.left=false;
            game.snake1.right=false;
        }
        if(key == game.KEY_S && game.snake2.up==false)
        {
            game.snake2.down=true;
            game.snake2.right=false;
            game.snake2.left=false;
            game.snake2.up=false
        }
        if(key == game.KEY_D && game.snake2.left==false)
        {
            game.snake2.right=true;
           
            game.snake2.down=false;
            game.snake2.up=false;
        }
        if(key==game.KEY_A &&  game.snake2.right==false)
        {
            game.snake2.left=true;
          
            game.snake2.up=false;
            game.snake2.down=false;
        }
        if(key==game.KEY_W && game.snake2.down==false)
        {
            game.snake2.up=true;
           
            game.snake2.left=false;
            game.snake2.right=false;
        }
}