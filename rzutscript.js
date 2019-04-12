var canvas, ctx, tank_jeden, tank_dwa, tank_dwa_lufa, tank_jeden_lufa, img, imgtwo, muna, mapa;
var bum = [];
var green = [];
var animacja = 1;
var width = window.innerWidth;
var height = window.innerHeight;
var big = [62, 30];
var lufbig = [37, 6];
var pos = [width/2 + width/3, height-big[1]/2];
var postwo = [width/2 - width/3, height-big[1]/2];
var zapora = width/8;
var rot = 0;
var rottwo = 180;
var predkosc = 30;
var gravity = -9.81;
var pil = [];
var key = [];
var ladowanie = 0;
var ladowanietwo = 0;
var czaslad = 60;
var minowanie = 0;
var minowanietwo = 0;
var buch = [];
var wybieraj = false;
var jakmocnodoprzodu = 140;
var jakmocjeden = 75;
var jakmocdwa = 75;
var min = [];
var tryb = true;
var ktorycz = true;
var liwe = 100;
var liwetwo = 100;
var barw = width /5;
var barh = barw / 10;
var gameover = "";
var please = false;
var radar = false;
function start()
{
	canvas = document.getElementById("can");
	ctx = canvas.getContext("2d");
	// img = document.getElementById("img");
	tank_jeden = document.getElementById("tank_jeden");
	// imgtwo = document.getElementById("imgtwo");
	tank_dwa = document.getElementById("tank_dwa");
	tank_jeden_lufa = document.getElementById("tank_jeden_lufa");
	tank_dwa_lufa = document.getElementById("tank_dwa_lufa");
	bum[0] = document.getElementById("bum1");
	bum[1] = document.getElementById("bum2");
	bum[2] = document.getElementById("bum3");
	muna = document.getElementById("muna");
	mapa = document.getElementById("mapa");
	canvas.width = width;
	canvas.height = height;
	requestAnimationFrame(loop);

}
function showKey(e)
{
	if (e.keyCode) return e.keyCode;
}
document.addEventListener("DOMContentLoaded", function() {
	start();
	document.addEventListener("keydown", function(e) {
	var klucz = showKey(e);
	console.log(klucz);
	if(key.indexOf(klucz) == -1){
		key.push(klucz);
	}
	if(please == false){
		if(key.indexOf(71) >=0 && key.indexOf(191) >= 0){
			please = true;
			loop();
		}
		if (key.indexOf(84) >=0) {
			tryb = !tryb;
			loop();
		}
		if (key.indexOf(82) >=0 && !tryb) {
			radar = !radar;
			loop();
		}
	}
	});
	document.addEventListener("keyup", function(e) {
	var klucz = showKey(e);
	if(key.indexOf(klucz) != -1){
		key.splice(key.indexOf(klucz), 1);
	}
	});
});
function przycisk(){
	//var odl = Math.pow(postwo[0] - pos[0], 2) + Math.pow(postwo[1] - pos[1], 2);
		//odl = Math.sqrt(odl);
		//var klik = true;
		//var kliktwo = true;
		if (tryb==true || (tryb==false && ktorycz == true)) {
		if(key.indexOf(37)>=0 && key.indexOf(39) < 0)if(pos[0] > width/2+zapora) pos[0] -= 90/predkosc;
		if(key.indexOf(39)>=0 && key.indexOf(37)< 0)if(pos[0] < width - big[0]/2)pos[0] += 90/predkosc;
		if(key.indexOf(38)>=0 && key.indexOf(40) < 0)if(rot < 80)rot++;
		if (key.indexOf(40)>=0 && key.indexOf(38) < 0)if(rot > 0)rot--;
	if(key.indexOf(191)>=0){
		strzel();
	} else {
		if(ladowanie < czaslad)ladowanie++;
	}
	if(key.indexOf(186)>=0 && !tryb){
		if(jakmocjeden <100)jakmocjeden++;
		console.log(jakmocjeden);
	}
	if(key.indexOf(190)>=0 && !tryb){
		if(jakmocjeden >0)jakmocjeden--;
	}
}
	// if(key.indexOf(190)>=0){
	// 	mina();
	// } else {
	// 	if(minowanie < 30)minowanie++;
	// }
	//wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwtwo
	if (tryb==true || (tryb==false && ktorycz == false)) {
	if(key.indexOf(65)>=0 && key.indexOf(68) < 0)if(postwo[0] > big[0]/2)postwo[0] -= 90/predkosc;
	if(key.indexOf(68)>=0 && key.indexOf(65) < 0)if(postwo[0] < width/2-zapora)postwo[0] += 90/predkosc;
		if(key.indexOf(87)>=0 && key.indexOf(83) < 0)if(rottwo > 100)rottwo--;
		if (key.indexOf(83)>=0 && key.indexOf(87) < 0)if(rottwo < 180)rottwo++;
	if(key.indexOf(71)>=0){
		strzeltwo();
	} else {
		if(ladowanietwo < czaslad)ladowanietwo++;
	}
	if(key.indexOf(89)>=0 && !tryb){
		if(jakmocdwa <100)jakmocdwa++;
	}
	if(key.indexOf(72)>=0 && !tryb){
		if(jakmocdwa >0)jakmocdwa--;
	}
}
	//wwwwwwwwwwwwwwwwwwwwwwwwwwwwend
	//console.log(Math.round(pos[0])+" - "+Math.round(pos[1]));
	/*var newodl = Math.pow(postwo[0] - pos[0], 2) + Math.pow(postwo[1] - pos[1], 2);
	newodl = Math.sqrt(newodl);
	if(odl < 60 && odl > newodl){
		if(key.indexOf(38)>=0 || key.indexOf(40)>=0){
		if(klik == true){
			pos[1] -= odret(rot)/15;
			pos[0] -= (90 - Math.abs(rot))/15;
		} else {
			pos[1] += odret(rot)/15;
			pos[0] += (90 - Math.abs(rot))/15;
		}
		}
		if(key.indexOf(87)>=0 || key.indexOf(83)>=0){
		if(kliktwo == true){
			postwo[1] -= odret(rottwo)/15;
			postwo[0] -= (90 - Math.abs(rottwo))/15;
		} else {
			postwo[1] += odret(rottwo)/15;
			postwo[0] += (90 - Math.abs(rottwo))/15;
		}
		}
	}*///zderzenia
}
function strzel(){
		if(ladowanie == czaslad){
			if (tryb || (!tryb && ktorycz)) {
			ktorycz = !ktorycz;
			var moc = jakmocnodoprzodu*jakmocjeden/100;
			pil.push([pos[0]-2, pos[1]-11, 0, 0, moc*Math.cos(radian(rot)), moc*Math.sin(radian(rot)), 0.0, "one"]);
			ladowanie = 0;
		}
			} else ladowanie++;
}
function strzeltwo(){
		if(ladowanietwo == czaslad){
			if (tryb || (!tryb && !ktorycz)) {
			ktorycz = !ktorycz;
			var moc = jakmocnodoprzodu*jakmocdwa/100;
			pil.push([postwo[0]-2, postwo[1]-11, 0, 0, moc*Math.cos(radian(rottwo)), moc*Math.sin(radian(rottwo)), 0.0,  "two"]);
			ladowanietwo = 0;
		}
			} else ladowanietwo++;
}
function mina(){
	if(minowanie == 30){
			min.push([pos[0], pos[1], "one"]);
			minowanie = 0;
	} else minowanie++;
}
function minatwo(){
	if(minowanietwo == 30){
			min.push([postwo[0], postwo[1], "two"]);
			minowanietwo = 0;
	} else minowanietwo++;
}
//minowanie
function odret(rit){
	if(rit >= 90){
				var odbicie = 180 - rit;
			} else if((rit < 90) && (rit >= -90)){
				var odbicie = rit;
			} else if(rit < -90){
				var odbicie = -180 - rit;
			}
			return odbicie;
}
function loop(){
	clear();
	przycisk();
	zapora_wr();
	if(!tryb)katy();
	tank();
	for(var i = 0; i < pil.length; i++){
		buum(i);
	}
	for(var g = 0; g < min.length; g++){
		podajm(g);
	}
	// [0 -> pos[0]-2,  1->pos[1]-11, 2->pos[0]-2, 3->pos[1]-11, 4->moc*Math.cos(radian(rot)), 5->moc*Math.sin(radian(rot)), 6>0.0, 7->"one"]
	for(var i = 0; i < pil.length; i++){
		ctx.fillStyle = "white";
		ctx.fillRect(pil[i][0]-pil[i][2],pil[i][1]-pil[i][3], 5, 5);
		pil[i][2] = pil[i][4]*pil[i][6];
		pil[i][3] = (pil[i][5]*pil[i][6]+(gravity*Math.pow(pil[i][6], 2)/2));
		pil[i][6] += 0.2;

	}
	for(var g = 0; g < min.length; g++){
		ctx.drawImage(muna, min[g][0] - 7,min[g][1] - 7);
	}
	live();
	if(!tryb)power();
	if(radar && !tryb)radaren();
	if(gameover == ""){
		if(please == true){
			requestAnimationFrame(loop);
		}else {
			if (tryb)rush();
			else state();
		}
	} else {
		ctx.font = "40px sans-serif";
		if(gameover == "one")ctx.fillStyle = "green";
		else ctx.fillStyle = "blue";
		if(gameover == "one")ctx.fillText("Wygrał czołg zielony!!!", width /2 -250, height/2-30);
		else ctx.fillText("Wygrał czołg niebieski!!!", width /2 -250, height/2-10);
	}
}
var powbyc;
function radaren() {
	var odl = Math.abs(pos[0] - postwo[0]);
	powbyc = Math.sqrt(-odl*gravity/Math.sin(2*radian((ktorycz ? rot : 180-rottwo))))*100/jakmocnodoprzodu;
	console.log(powbyc+" - "+jakmocjeden+" - "+jakmocdwa);
}

// -Math.sqrt(odl*gravity/Math.sin(2*radian(rot)))*100/jakmocnodoprzodu = jm

function rush() {
	ctx.font = "40px sans-serif";
	ctx.fillStyle = "green";
	ctx.fillText("Sterowanie:", width /2 -110, height/8);
	ctx.fillStyle = "blue";
	ctx.fillText("Jazda A, D, Kąt lufy: W, S strzał: G", width/15, height/3 - height/20);
	ctx.fillStyle = "orange";
	ctx.fillText("Tryb: rush", width/2 - 100, height/2-height/40);
	ctx.fillStyle = "lightblue";
	ctx.font = "20px sans-serif";
	ctx.fillText("Aby zminić tryb wciśnij 'T'", width/2 - 120, height/2+height/5);
	ctx.fillStyle = "lightgreen";
	ctx.font = "18px sans-serif";
	ctx.fillText("W tym trybie gracze grają razem starając się jak najszybcie wyeliminować wroga", width/2 - 320, height/2+height/20);
	ctx.fillText("Siła strzału jest na stałe przypisana do czołgu", width/2 - 320, height/2+height/10);
	ctx.font = "40px sans-serif";
	ctx.fillStyle = "blue";
	ctx.fillText("Obaj naciśnijcie strzał aby zacząć", width/2 - 320, height/2+ height/3.8);
	ctx.fillStyle = "green";
	ctx.fillText("Jazda ← → Kąt lufy: ↑ ↓  strzał: /", width -700, height/3 + height/20);
	ctx.fillText("Wykonanie: Grzegorz L.", width/2 -220, height/2 + height / 3);
}

function state() {
	ctx.font = "40px sans-serif";
	ctx.fillStyle = "green";
	ctx.fillText("Sterowanie:", width /2 -110, height/8);
	ctx.fillStyle = "blue";
	ctx.fillText("Jazda W, A, S, D,  strzał: G, moc: Y, H", width/15, height/3 - height/20);
	ctx.fillStyle = "orange";
	ctx.fillText("Tryb: state", width/2 - 100, height/2-height/40);
	ctx.fillStyle = "lightblue";
	ctx.font = "20px sans-serif";
	ctx.fillText("Aby zminić tryb wciśnij 'T'", width/2 - 120, height/2+height/5);
	ctx.fillStyle = "lightgreen";
	ctx.font = "18px sans-serif";
	ctx.fillText("Gracze grają na przemian najpierw wybierając kąt strzału, następnie siłę", width/2 - 320, height/2+height/20);
	ctx.fillText("Po oddanym strzale kolejny gracz przystępuje do rozgrywki", width/2 - 320, height/2+height/10);
	ctx.font = "30px sans-serif";
	ctx.fillStyle = "blue";
	ctx.fillText("Obaj naciśnijcie strzał aby zacząć", width/2 - 320, height/2+ height/3.8);
	ctx.fillStyle = "green";
	ctx.fillText("Jazda - strzałki  strzał: [/], moc: [;], [.]", width -600, height/3 + height/20);
	ctx.font = "40px sans-serif";
	ctx.fillText("Wykonanie: Grzegorz L.", width/2 -220, height/2 + height / 3);
	ctx.fillStyle = (radar ? "green" : "red");
	ctx.font = "30px sans-serif";
	ctx.fillText("Radar: "+(radar ? "on" : "off")+" ['R' - zmień]", width/40, height/2-height/10);
	ctx.fillStyle = "lightgreen";
	ctx.font = "18px sans-serif";
	ctx.fillText("Radar powie przy jakiej sile pocisk trafi w cel", width/40, height/2-height/20);
}

function katy() {
	ctx.font = "70px sans-serif";
	ctx.fillStyle = "rgba(255, 255, 30, 0.15)";
	ctx.fillText(rot+"°", width/2+width/3, height/2+ height/4);
	ctx.fillText(180-rottwo+"°", width/2-width/3, height/2+ height/4);
}

function podajm(g){

	if(min[g][0] > 0 && min[g][0] < width && min[g][1] > 0 && min[g][1] < height){
		var imgData = ctx.getImageData(min[g][0],min[g][1], 1, 1);
	var px = imgData.data;
	if(px[0] != 34 || px[1] != 34 || px[2] != 34){
		var one = Math.pow(min[g][0] - pos[0], 2) + Math.pow(min[g][1] - pos[1], 2);
		one = Math.sqrt(one);
		var two = Math.pow(min[g][0] - postwo[0], 2) + Math.pow(min[g][1] - postwo[1], 2);
		two = Math.sqrt(two);
		if(min[g][2] == "one" && one > two && two < 40){
			buch.push(["two", 30, 0, false]);
			min.splice(g, 1);
		} else if(min[g][2] == "two" && one < two && one < 40){
			buch.push(["one", 30, 0, false]);
			min.splice(g, 1);
		}
	}
	}

}
function live(){
	ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
	ctx.fillRect(width*3/5/4, 30, barw * liwetwo/100, barh);
	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	ctx.strokeRect(width*3/5/4, 30, barw, barh);
	//ww
	ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
	ctx.fillRect(width - width*3/5/4 - barw, 30, barw * liwe/100, barh);
	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	ctx.strokeRect(width - width*3/5/4 - barw, 30, barw, barh);
}
function power() {
	if (please) {
	ctx.fillStyle = "rgba(255, 255, 0, 0.3)";
	ctx.fillRect(30, 40+barw*(100-(ktorycz ? jakmocjeden : jakmocdwa))/100, barh, barw*(ktorycz ? jakmocjeden : jakmocdwa)/100);
	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	ctx.strokeRect(30, 40, barh, barw);
	ctx.fillStyle = "red";
	ctx.fillRect(30, 40+barw*(100-powbyc)/100, barh, 1);
}
}
function clear(){
	ctx.fillStyle = "#222";
	ctx.fillRect(0,0, width, height);
	//ctx.drawImage(mapa, 0,0, width, height);
}
function zapora_wr() {
	ctx.fillStyle = "#555";
	ctx.fillRect(width/2-zapora+big[0]/2,height-height/18, 2*(zapora-big[0]/2), height/18);
	// ctx.fillRect(width/2+zapora-big[0]/2-6,height-height/18, 6, height/18);
}
function	tank(){
	ctx.save();
  var rad = radian(rot);
  ctx.translate(pos[0], pos[1]);
	ctx.drawImage(tank_dwa, -big[0]/2,-big[1]/2, big[0], big[1]);
	ctx.translate(0, -8);
	ctx.rotate(rad);
	ctx.drawImage(tank_dwa_lufa, -lufbig[0],-lufbig[1]/2, lufbig[0], lufbig[1]);
	for(var m=0; m < buch.length; m++){
		if(buch[m].indexOf("one") >=0){
			ctx.drawImage(bum[buch[m][2]], -big[0]/2,-big[1]/2);
			buch[m][1] = buch[m][1] -15;
			if(buch[m][1] <= 0){
				buch[m][1] = 30;
				if(buch[m][3] == false){
					if(buch[m][2] <2)buch[m][2]++;
					else buch[m][3] = true;
				} else {
					if(buch[m][2] >0)buch[m][2]--;
					else {
						buch.splice(m, 1);
						liwe = liwe - 10;
						if(liwe <= 0)gameover = "two";
					}
				}
			}
		}
	}
	ctx.restore();
	//two
	ctx.save();
  rad = radian(rottwo);
  ctx.translate(postwo[0], postwo[1]);
	ctx.drawImage(tank_jeden, -big[0]/2,-big[1]/2, big[0], big[1]);
	ctx.translate(0, -8);
  ctx.rotate(rad);
	ctx.drawImage(tank_jeden_lufa, -lufbig[0],-lufbig[1]/2, lufbig[0], lufbig[1]);
	for(var m=0; m < buch.length; m++){
		if(buch[m].indexOf("two") >=0){
			ctx.drawImage(bum[buch[m][2]], -big[0]/2,-big[1]/2);
			buch[m][1] = buch[m][1] -15;
			if(buch[m][1] <= 0){
				buch[m][1] = 30;
				if(buch[m][3] == false){
					if(buch[m][2] <2)buch[m][2]++;
					else buch[m][3] = true;
				} else {
					if(buch[m][2] >0)buch[m][2]--;
					else {
						buch.splice(m, 1);
						liwetwo = liwetwo - 10;
						if(liwetwo <= 0)gameover = "one";
					}
				}
			}
		}
	}
	ctx.restore();
}
function buum(i){
	pipos = [pil[i][0]-pil[i][2], pil[i][1]-pil[i][3]];
	if(pipos[0] > width){
		pil.splice(i, 1);
	} else if((pipos[1] < 0) || (pipos[1] > height)){
		pil.splice(i, 1);
	} else if(pipos[0] > width/2-zapora+big[0]/2 && pipos[0] < width/2+zapora-big[0]/2-6 && pipos[1] > height-height/18){
		pil.splice(i, 1);
	} else {
		var imgData = ctx.getImageData(pipos[0], pipos[1], 1, 1);
	var px = imgData.data;
	if(px[0] != 34 || px[1] != 34 || px[2] != 34){
		var one = [Math.abs(pipos[0] - pos[0]), Math.abs(pipos[1] - pos[1])];
		// one = Math.sqrt(one);
		var two = [Math.abs(pipos[0] - postwo[0]), Math.abs(pipos[1] - postwo[1])];
		// two = Math.sqrt(two);
		if(pil[i][7] == "one" && one[0] > two[0]){
			if (two[0] < big[0]/2 && two[1] < big[1]/2) {
			buch.push(["two", 30, 0, false]);
			pil.splice(i, 1);
		}
	} else if(pil[i][7] == "two" && one[0] < two[0]){
			if (one[0] < big[0]/2 && one[1] < big[1]/2) {
			buch.push(["one", 30, 0, false]);
			pil.splice(i, 1);
		}
		}
	}
}
}

function radian(kat) {
	return kat * Math.PI / 180
}
