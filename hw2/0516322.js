var i, j; // 不宣告也能用 但要好維護
document.writeln("<h1>Daisy's Magic Game</h1>");
document.writeln("<h3>Please find a number between 1 and 64, I will read your mind and find it immediately.</h3>");


for (i=0;i<6;i++){
	document.writeln('<table>');
	document.writeln('<tr>'
		+ '<td colspan="8" >Number ' + (i+1) + ' Card '
		+ '<input type="checkbox" name="check">'
		+ '</td>'
		+ '</tr>'
		);
	for(j=0;j<32;j++){
		if (j%8==0) document.write('<tr class="good">');
		document.write("<td>" + (j*2+Math.pow(2, i)-j%Math.pow(2, i)) + "</td>");
		if (j%8==7) document.write("</tr>");
	}
	document.writeln("</table>");
}


