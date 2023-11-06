var show_num = [];
draw(show_num);

function dj() {
    draw(show_num);
}

function sublim() {
    var val = document.getElementById("text").value;
    var num = show_num.join("");
    if (val == num) {
        return true;
    } else {
        return false;
    }

}

function draw(show_num) {
    var canvas_width = document.getElementById('canvas').clientWidth;
    var canvas_height = document.getElementById('canvas').clientHeight;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m";
    var aCode = sCode.split(",");
    var aLength = aCode.length;

    for (var i = 0; i <= 3; i++) {
        var j = Math.floor(Math.random() * aLength);
        var deg = Math.random() * 30 * Math.PI / 180;
        var txt = aCode[j];
        show_num[i] = txt;
        var x = 8 + i * 20;
        var y = 25 + Math.random() * 8;
        context.font = "bold 28px Consolas,monospace";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
    }
	if (g_page_cstmfun.CF_WEB_CAPTCHA_SIMPLE == "0") {
	    for (var i = 0; i <= 5; i++) {
	        context.strokeStyle = randomColor();
	        context.beginPath();
	        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
	        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
	        context.stroke();
	    }
	    for (var i = 0; i <= 30; i++) {
	        context.strokeStyle = randomColor();
	        context.beginPath();
	        var x = Math.random() * canvas_width;
	        var y = Math.random() * canvas_height;
	        context.moveTo(x, y);
	        context.lineTo(x + 1, y + 1);
	        context.stroke();
	    }
		}
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}
