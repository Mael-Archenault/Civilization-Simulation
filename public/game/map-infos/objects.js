//----------------------------------------------------------------
// Information Box (to get data from a tile)
//----------------------------------------------------------------

class SelectedTileBox{
    constructor(mapOrigin){
        this.x = 0;
        this.y = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.targetType = "";
        this.box = document.querySelector(".infoBox");
        this.selectionBox = document.querySelector(".selectionBox");

        this.pixelX = 0;
        this.pixelY = 0;

        this.landType = this.box.querySelector(".landType");
        this.visible = false;
        this.color = "rgb(0,0,0)";

        this.radius = 60;

        this.mapOrigin = mapOrigin

    }
    updateTargetPosition = (move)=>{
        this.targetX += move[0];
        this.targetY += move[1];

        this.setPosition(this.targetX, this.targetY, );
        this.updateNonZoomedPosition();
        this.displaySelected(false);

    }

    setNewTarget(x,y){
        this.setPosition(x,y);
        this.updateNonZoomedPosition();
        this.displaySelected(true);
    }
    
    setPosition = (x,y)=>{

        this.targetX = this.mapOrigin.x + Math.floor((x-this.mapOrigin.x)/this.mapOrigin.scaledGridStep)*this.mapOrigin.scaledGridStep + this.mapOrigin.scaledGridStep/2;
        this.targetY = this.mapOrigin.y + Math.floor((y-this.mapOrigin.y)/this.mapOrigin.scaledGridStep)*this.mapOrigin.scaledGridStep + this.mapOrigin.scaledGridStep/2;

        this.updateNonZoomedPosition();
        

        this.pixelX =Math.floor((this.targetX - this.mapOrigin.x)/this.mapOrigin.scaledGridStep);
        this.pixelY = Math.floor((this.targetY - this.mapOrigin.y)/this.mapOrigin.scaledGridStep);
        

        if (this.pixelX >= 0 &&this.pixelX < simulation.map.coloredMap[0].length && this.pixelY>= 0 && this.pixelY < simulation.map.coloredMap.length){   
            this.color = simulation.map.coloredMap[this.pixelY][this.pixelX]
            this.targetType = findType(this.color, thresholds);
        }
        else {
            this.color = "rgb(16,143,198)";
            this.targetType = "Water";
        }
        if (this.color == "rgba(0,0,0,0)"){
            this.color = "rgb(16,143,198)";
        }

        this.displaySelected(true);

    
    }

    updateNonZoomedPosition(){
        this.initialX = (this.targetX - this.mapOrigin.centerX)/this.mapOrigin.scaleFactor + this.mapOrigin.centerX;
        this.initialY = (this.targetY - this.mapOrigin.centerY)/this.mapOrigin.scaleFactor + this.mapOrigin.centerY;
    }

    displaySelected = (moveEase)=>{
        this.selectionBox.style.width = this.mapOrigin.scaledGridStep+'px';
        this.selectionBox.style.height = this.mapOrigin.scaledGridStep+'px';
        

        
        if (moveEase==true){
            this.selectionBox.style.transition = "all 0.2s ease-in-out";
        }
        else {
            this.selectionBox.style.transition = "";
            
        }

        this.selectionBox.style.top = (this.targetY-this.mapOrigin.scaledGridStep/2)+'px';
        this.selectionBox.style.left = (this.targetX-this.mapOrigin.scaledGridStep/2)+'px';


        

       
        this.selectionBox.style.borderWidth = this.mapOrigin.scaledGridStep/8 + 'px';


        this.landType.style.background = this.color;
        this.landType.textContent = this.targetType; 
    
    }
}


