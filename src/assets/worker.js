onmessage = function(event) {
    console.log(event.data);
}

setInterval(() => {

    var a = 0;
    var i = 0;
    while(i < 100000){
        i ++;
        a += Math.random();
    }


    postMessage("Hei: " + a)
}, 300)