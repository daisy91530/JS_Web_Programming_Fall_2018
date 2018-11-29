var i, j, k; // 不宣告也能用 但要好維護
document.writeln("<h1>Daisy's Magic Game</h1>");
document.writeln("<h3>Please find a number between 1 and 64, I will read your mind and find it immediately.</h3>");
document.writeln('<h3 id="message">What is your number ? </h3> ');
document.writeln("<div>");
document.writeln('<input class="btn" type = "submit" value = "Submit" onclick = "guess()">');
document.writeln('<input class="btn" type = "button" value = "Uncheck" onclick="reset()">');
document.writeln("</div>");
document.writeln("<div>");
for (i=0;i<6;i++){
	document.writeln('<table>');
	document.writeln('<tr>'
		+ '<td colspan="8" >Number ' + (i+1) + ' Card '
		+ '<input type="checkbox" name="card">'
		+ '</td>'
		+ '</tr>'
		);
	for(j=0;j<32;j++){
		if (j%8==0) document.write('<tr class="good">');
		k = j*2+Math.pow(2, i)-j%Math.pow(2, i);
		document.write('<td id="ye" name="num',k,'" >'+k+'</td>');
		if (j%8==7) document.write("</tr>");
	}
	document.writeln("</table>");
}
document.writeln("</div>");
var flashnum=0, timer, ans;

function blink(bingo){
	var o, i;
	o = document.getElementsByName("num"+flashnum);
	for(i=0;i<o.length;i++) o[i].className="good";
	flashnum = bingo || Math.floor(Math.random()*63) + 1;
	o = document.getElementsByName("num"+flashnum);
	for(i=0;i<o.length;i++) o[i].className="goodd";
	o = document.getElementById("message");
	o.innerText = o.innerText + "." ;
}

function start(){
	timer = setInterval(blink, 500);
	setTimeout(stop, 3000); //6 bink then stop
}

function stop(){
	clearInterval(timer);
	var o = document.getElementById("message");
	o.innerText = "What you are thinking is: " + ans;
	blink(ans);
}

function guess(){
	ans = 0;
	var arr = document.getElementsByName("card");
	for( var i=0;i<6;i++){
		if(arr[i].checked){
			ans += Math.pow(2, i);
		}
	}
	start();
}

function reset(){
	var inputs = document.getElementsByName("card");
  	for(i = 0; i < inputs.length; i++) {
    	inputs[i].checked = false;
  	}
}
