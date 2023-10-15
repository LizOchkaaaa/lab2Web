const error = document.getElementById("errorText")
let pointX;
let pointY;
let pointR;
let pointResult;

function safeToStorage(data){
    pointX = localStorage.getItem("arrayX");
    pointY = localStorage.getItem("arrayY");
    pointR = localStorage.getItem("arrayR");
    pointResult = localStorage.getItem("arrayResult");
    if (pointX == null){
        pointX = "";
        pointY = "";
        pointR = "";
        pointResult = "";

    }
    pointX += data["x"] + " ";
    pointY += data["y"] + " ";
    pointR += data["r"] + " ";
    pointResult += data["result"] + " ";
    localStorage.setItem("arrayX", pointX);
    localStorage.setItem("arrayY", pointY);
    localStorage.setItem("arrayR", pointR);
    localStorage.setItem("arrayResult", pointResult);
}
function drawPoint(x, y, r, result) {
    [x, y] = untransforme(x, y, r)
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "6");
    circle.style.fill = result ? "#09a53d" : "#cdc684";
    svg.appendChild(circle);
}

async function sendCoordinatesToServer(x, y, r) {
    const data = await checkPoint(x, y, r);

    if (data["code"] == null) {
        safeToStorage(data);
        drawPoint(x, y, r, data.result);
        addOneRowToTable(data);
    }
    else {
        error.textContent = data["message"];
        setTimeout(() =>{
            error.textContent = ""
        }, 2000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
        let pointX = localStorage.getItem("arrayX");
        let pointY  = localStorage.getItem("arrayY");
        let pointR = localStorage.getItem("arrayR");
        let pointResult = localStorage.getItem("arrayResult");
        if (pointX != null && pointY != null && pointR != null && pointResult != null) {
            pointX = pointX.split(" ");
            pointY = pointY.split(" ");
            pointR = pointR.split(" ");
            pointResult  = pointResult.split(" ");
            for (let i = 0; i < pointX.length; i++) {
                const x = parseFloat(pointX[i]);
                const y = parseFloat(pointY[i]);
                const r = parseFloat(pointR[i]);
                if (isNaN(x) || isNaN(y) || isNaN(r)) continue;

                let result = pointResult[i] === "true";
                drawPoint(x, y, r, result);
            }
        }

    svg.addEventListener("click", (event) => {
        if ((arrayR.includes(selectR.value))) { {
            const  rect = svg.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            let coord = transform(x, y, selectR.value);
            x = coord[0];
            y = coord[1];
            selectR.style.border = '1px solid black';
            sendCoordinatesToServer(x, y, selectR.value );
        }
        }
        else {
            selectR.style.border = '3px solid red';
        }
    })
});

function transform(x, y , r){
    let scale = r;
    let start = 150;
    let rPosition = 100;
    x = (x - start)/rPosition * scale;
    y = -(y - start)/rPosition * scale;
    return [x, y];
}
function untransforme(x, y, r){
    let scale = r;
    let start = 150;
    let rPosition = 100;
    x = x * rPosition / scale + start;
    y = -y * rPosition / scale + start;
    return [x.toFixed(3), y.toFixed(3)];
}