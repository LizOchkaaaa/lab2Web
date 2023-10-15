const svg = document.getElementById("svg");
const submit = document.getElementById("btn1");
const chooseX = document.querySelector('.text');
const chooseY = document.querySelector('.selectY');
const selectR = document.querySelector('.selectR');

var arrayY = ["-2" , "-1.5" , "-1" , "-0.5" , "0" , "0.5" , "1" , "1.5" , "2"]
var arrayR = ["1" , "1.5" , "2" , "2.5" , "3"]

submit.addEventListener('click',async function (e) {
    var flagX = true
    var flagY = true
    var flagR = true

    var styleX = chooseX.style
    var styleY = chooseY.style
    var styleR = selectR.style

    chooseX.addEventListener('input', function () {
        chooseX.style = styleX
        if (isNaN(chooseX.value) && chooseX.value && chooseX.value != '-' || !isNaN(chooseX.value) && (Number(chooseX.value) <= -3 || Number(chooseX.value) >= 3)) {
            color();
        } else {
            flagX = true
        }
    })

    function color() {
        setTimeout(function () {
            chooseX.value = ""
            chooseX.style.border = '3px solid red'
            chooseX.blur()
            flagX = false
        }, 100)
    }

    chooseY.addEventListener('change', function () {
        chooseY.style = styleY
        flagY = true
    })

    selectR.addEventListener('change', function () {
        selectR.style = styleR
        flagR = true
    })

    if (!chooseX.value || chooseX.value == '-') {
        chooseX.style.border = '3px solid red'
        flagX = false
    }

    if (chooseY.value == "Y" || !(arrayY.includes(chooseY.value))) {
        chooseY.style.border = '3px solid red'
        flagY = false
    } else {
        chooseY.style = styleY
        flagY = true
    }

    if (selectR.value == "R" || !(arrayR.includes(selectR.value))) {
        selectR.style.border = '3px solid red'
        flagR = false
    } else {
        selectR.style = styleR
        flagR = true
    }

    e.preventDefault();

    if (flagX && flagY && flagR) {
        let xFloat = parseFloat(chooseX.value);
        let yFloat = parseFloat(chooseY.value);
        let rFloat = parseFloat(selectR.value);
        let response = await fetch(new URL("controller?" + "x=" + xFloat + "&y=" + yFloat + "&r=" + rFloat + "&action=form", window.location.href), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((responseCatched) => {
                if (responseCatched.ok) {
                    return responseCatched.json()
                }
                throw new Error(responseCatched.statusText)
            })
        const data = response
        addOneRowToTable(data);
        safeToStorage(data);
        drawPoint(xFloat, yFloat, rFloat, data.result);
    }
})

function addOneRowToTable(array) {
    let res = array["result"] ? "Hit" : "Miss";
    let row_html_code = document.createElement("tr");
    row_html_code.innerHTML += `<th>`+array["x"].substring(0,6)+  `</th>` ;
    row_html_code.innerHTML += `<th>`+array["y"].substring(0,6)+  `</th>` ;
    row_html_code.innerHTML += `<th>`+array["r"]+  `</th>` ;
    row_html_code.innerHTML += `<th>`+ res + `</th>` ;
    row_html_code.innerHTML += `<th>`+array["scriptTime"]+  `</th>` ;
    row_html_code.innerHTML += `<th>`+array["time"]+  `</th>` ;

    document.getElementById("output").appendChild(row_html_code);
}
async function checkPoint(x, y, r) {
    const form = new FormData();
    form.append("x", x);
    form.append("y", y);
    form.append("r", r);
    form.append("action", "checkPoint")

    const url = "controller?" + new URLSearchParams(form).toString();
    const response = await fetch(url, { method: "get" });

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(response.statusText);
    }
    return data;
}
