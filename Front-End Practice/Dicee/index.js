var x = Math.random();
x = Math.floor(x * 6);
x++;

var y = Math.random();
y = Math.floor(y * 6);
y++;

var body = document.firstElementChild.lastElementChild;
body.firstElementChild.querySelector(".dice").lastElementChild.setAttribute("src", "images/dice" + x + ".png" );
body.firstElementChild.lastElementChild.lastElementChild.setAttribute("src", "images/dice" + y + ".png" );

if (x > y){
    body.firstElementChild.firstElementChild.innerHTML = "Player 1 Wins!";
}

else if (x === y){
    body.firstElementChild.firstElementChild.innerHTML = "Draw!";
}

else{
    body.firstElementChild.firstElementChild.innerHTML = "Player 2 Wins!";
}