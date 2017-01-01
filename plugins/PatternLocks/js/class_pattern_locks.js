export default class PatternLock {

	// Parameters-------------------



// state const  autoInit=true;
  constructor(){
		/*
    this.autoInit=true;
    this.autoSubmit=true;
    this.isdrawing=false;
    this.from="";
    this.to="";
    this.inputbox="";
    this.startbutton=0;
		*/
		this.prop = {
			autoInit:true,
			autoSubmit:true,
			isdrawing:false,
			from:"",
			to:"",
			inputbox:"",
			startbutton:0,
		};
  }

	init(){

		if (this.prop.autoInit){
		  var pw = document.getElementsByTagName("input");
		  for (var i=0;i<pw.length;i++){


			  this.bind();

			 if((pw[i].type=='submit') && (this.autoSubmit)){
				 pw[i].style.display = 'none';
			 }
		  }
		}
	}

	bind(){
		let thisClass=this;
		for (var i=1;i<10;i++){
			//var buttonTag = document.createElement("div");
			//buttonTag.className = "patternlockbutton";
			//buttonTag.id = "patternlockbutton" + i;

			var buttonTag = document.getElementById("patternlockbutton" + i);
			buttonTag.onmousedown = function(e){
				if (!e){
					var e = window.event;
				}else{
					e.preventDefault();
				}
				thisClass.buttontouchstart(this)
			};
			buttonTag.ontouchstart = function(e){
				if (!e) var e = window.event;
				e.preventDefault();
				thisClass.buttontouchstart(this)
			};
			buttonTag.ontouchmove = thisClass.buttontouchmove;
			buttonTag.onmouseover = function(){thisClass.buttontouchover(this)};

			buttonTag.onmouseup = function(){thisClass.buttontouchend(this)};
			buttonTag.ontouchend = function(){thisClass.buttontouchend(this)};
		//	buttonsTag.appendChild(buttonTag);
		}
	}

	buttontouchstart(b){
		this.prop.isdrawing = true;
		b.className = "patternlockbutton touched";
		this.prop.from = "";
		this.prop.to = b.id.split("patternlockbutton").join("");
		this.prop.inputbox = this.prop.to;
		this.prop.startbutton = this.prop.to;
		return false;
	}

	buttontouchover(b){

		if (this.prop.isdrawing){
			console.log("touchover")
			var thisbutton = b.id.split("patternlockbutton").join("");

			if(thisbutton != this.prop.to){ // touching the same button twice in a row is not allowed (should it ?)

				var cn = b.className;
				if(cn.indexOf('touched')<0){
					b.className = "patternlockbutton touched"
				}else{
					b.className = "patternlockbutton touched multiple"
				}

				this.prop.from = this.prop.to;
				this.prop.to = thisbutton;

				//update input value
				this.prop.inputbox += this.prop.to;
				console.log(this.prop.inputbox);
				// display line between 2 buttons
				var thisline = document.getElementById("line" + this.prop.from + this.prop.to);
				if (this.prop.to <  this.prop.from){
					thisline = document.getElementById("line" + this.prop.to + this.prop.from);
				}
				console.log(thisline);
				if (thisline){
					thisline.style.visibility = 'visible';
				}

			}


		}
		return(false)
	}



	buttontouchmove(e){
		if(e.touches.length == 1){
			var touch = e.touches[0];

			// find position relative to first button
			var b1 = document.getElementById("patternlockbutton1");
			var b2 = document.getElementById("patternlockbutton2");
			var p = findPos(b1);
			var p2 = findPos(b2);
			var cox = parseInt(touch.pageX) - parseInt(p[0])
			var coy = parseInt(touch.pageY) - parseInt(p[1])
			var gridsize =  p2[0] - p[0] // bit stupid no ?


			// on what button are we over now?
			// grid 3x3 to sequential nummber
			var buttonnr = Math.min(2,Math.max(0,Math.floor(cox/gridsize))) + (Math.min(2,Math.max(0,Math.floor(coy/gridsize)))*3) + 1;

			if (buttonnr != this.prop.to){
				// only trigger if the touch is near the middle of the button
				// otherwise diagonal moves are impossible
				var distancex = (cox % gridsize);
				var distancey = (coy % gridsize);
				if ((distancex< (gridsize/2)) && (distancey < (gridsize/2))){
					// we're over a new button
					var newbutton = document.getElementById("patternlockbutton" + buttonnr)
					this.buttontouchover(newbutton);
				}
			}
		}
	}

	buttontouchend(b){
		if (this.prop.isdrawing){
				console.log("touchend");
		    this.prop.isdrawing = false;
		if (this.prop.autoSubmit){
			var dosubmit = true;
			//if (document.forms[0].onsubmit){ dosubmit = document.forms[0].onsubmit() }
			//if(dosubmit){

			//}
		}
		}
		return(false)

	}

	attach(target, functionref, tasktype){
		var tasktype=(window.addEventListener)? tasktype : "on"+tasktype
		if (target.addEventListener)
			target.addEventListener(tasktype, functionref, false)
		else if (target.attachEvent)
			target.attachEvent(tasktype, functionref)
	}
}
