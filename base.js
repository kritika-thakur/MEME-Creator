(function (document, FileReader, Image) {
    "use strict";
    var e = {},
        reader = new FileReader(),
        image = new Image(),
        ctxt = null,
        writeMeme = null,
        renderMeme = null,
        get = function (id) {
            return document.getElementById(id);
        };
    e.box1 = get("box1");
    e.ifile = get("ifile");
    e.box2 = get("box2");
    e.topline = get("topline");
    e.bottomline = get("bottomline");
    e.c = get("c");
    e.downloadLink = get("downloadLink");
    ctxt = e.c.getContext("2d");
    writeMeme = function (text, x, y) {
        var f = null;
        for (f = 36; f >= 0; f -= 1) {
            ctxt.font = "bold " + f + "pt Impact, Charcoal, sans-serif";
            if (ctxt.measureText(text).width < e.c.width - 10) {
                ctxt.fillText(text, x, y);
                ctxt.strokeText(text, x, y);
                break;
            }
        }
    };
    renderMeme = function () {
        ctxt.drawImage(image, 0, 0, e.c.width, e.c.height);
        writeMeme(e.topline.value, e.c.width / 2, 50);
        writeMeme(e.bottomline.value, e.c.width / 2, e.c.height - 20);
    };
    e.ifile.onchange = function () {
        reader.readAsDataURL(e.ifile.files[0]);
        reader.onload = function () {
            image.src = reader.result;
            image.onload = function () {
                if (image.width < e.box1.clientWidth) {
                    e.c.width = image.width;
                    e.c.height = image.height;
                } else {
                    e.c.width = e.box1.clientWidth;
                    e.c.height = image.height * (e.box1.clientWidth / image.width);
                }
                ctxt.textAlign = "center";
                ctxt.fillStyle = "white";
                ctxt.strokeStyle = "black";
                ctxt.lineWidth = 2;
                renderMeme();
                e.box1.style.display = "none";
                e.box2.style.display = "";
            };
        };
    };
    e.topline.onkeyup = renderMeme;
    e.bottomline.onkeyup = renderMeme;
    e.downloadLink.onclick = function () {
        e.downloadLink.href = e.c.toDataURL();
        e.downloadLink.download = "MemeCreator.png";
    };
}(this.document, this.FileReader, this.Image));
