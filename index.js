document.getElementById('img').onload = async function () {
    const c = document.getElementById('c');
    const ctx = c.getContext("2d");
    var img = document.getElementById("img");

    setTimeout(() => {

        ctx.drawImage(img, 0, 0, 400, 400);
    }, 100);

}


