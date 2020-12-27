class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      car1=createSprite(200,100);
      car2=createSprite(200,300);
      car3=createSprite(200,500);
      car4=createSprite(200,700);
      cars=[car1,car2,car3,car4];
      
    }
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index=0;
      var x;
      var y=0;
      
      for(var i in allPlayers){
        index=index+1;
        x=displayWidth-allPlayers[i].distance;
        y=y+200;
cars[index-1].x=x
cars[index-1].y=y
        if (index ===  player.index){
cars[index-1].shapeColor="red";
camera.position.x=cars[index-1];
camera.position.y=displayHeight/2
        }
          
      }
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    drawSprites();
  }
}
