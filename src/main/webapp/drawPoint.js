function drawPoint(x, y, r, result) {
    [x, y] = untransformed(x, y, r)
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "6");
    circle.style.fill = result ? "#09a53d" : "#cdc684";
    svg.appendChild(circle);
}

async function sendCoordinatesToServer(x, y, r) {
    const data = await checkPoint(x, y, r);

    if (!data.error) {
        drawPoint(x, y, r, data.result);
        addOneRowToTable(data);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("output");

    if (table) {
        for (let item of table.rows) {
            const x = parseFloat(item.children[0].innerText);
            const y = parseFloat(item.children[1].innerText);
            const r = parseFloat(item.children[2].innerText);
            if (isNaN(x) || isNaN(y) || isNaN(r)) continue;

            let result = (item.children[3].innerText === "Hit");
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
            sendCoordinatesToServer(x, y, selectR.value );
        }
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
function untransformed(x, y, r){
    let scale = r;
    let start = 150;
    let rPosition = 100;
    x = x * rPosition / scale + start;
    y = -y * rPosition / scale + start;
    return [x.toFixed(3), y.toFixed(3)];
}