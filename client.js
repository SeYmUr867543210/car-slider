let content = document.querySelector(".content");
let sliderParent = document.querySelector(".sliderParent");
let carsParent = document.querySelector(".carsParent");

leftArrow.onclick = rightArrow.onclick = function (event) {
    let selectedLogo = selectLogo()
    showCars(event, selectedLogo)
}

let carOutSide = true;
function showCars(event, selectedLogo) {

    for (let i = 0; i < carsParent.children.length; i++) {

        let mainPath = "/imgs/";
        let carName = selectedLogo ? selectedLogo : "Lamborghini";
        let carSide = carOutSide ? `${carName}Outside` : `${carName}Inside`;
        let imgFormat = ".jpg";
        let carCount = carsParent.children[i].src.slice(carsParent.children[i].src.length - 5).slice(0, 1);
        let fullPath = "";

        if (!event || event.target.getAttribute("id") == "leftArrow") {
            if (carCount == 1) {
                carCount = carsParent.children.length + 1;
            }

            fullPath = `${mainPath}${carSide}${carCount - 1}${imgFormat}`;

        } else if (event.target.getAttribute("id") == "rightArrow") {
            if (carCount == carsParent.children.length) {
                carCount = 0;
            }

            fullPath = `${mainPath}${carSide}${Number(carCount) + 1}${imgFormat}`;

        }
        carsParent.children[i].src = fullPath


    }

}
//modal window
carsParent.addEventListener("click", function (event) {
    let modalWindowParent = document.querySelector(".modalWindowParent");
    modalWindowParent.style = "display: block;background: black;width: 100%;height: 100%;border: 3px solid black;position:absolute;background: black;z-index: 1"

    let modalWindowImg = document.getElementById("modalWindowImg");
    modalWindowImg.style = `width: 80%;height: 80%;margin: 0 auto;transform: translateX(10%);`// add transition 
    modalWindowImg.src = event.target.src

    let closeIcon = document.getElementById("closeIcon");
    modalWindowImg.onclick = closeIcon.onclick = function (event) {
        modalWindowParent.style = "display: none";
    }
})
/////////////////////////////////////////////////////////////////////////////////

let allLogosParent = document.querySelector(".allLogosParent");
let allCars = ["Lamborghini", "Bmw", "Mercedes", "Audi", "Porsche", "FordMustang"];

for (let i = 0; i < allCars.length; i++) {
    let img = document.createElement("img");
    img.style = `width: 150px;height: 100px;`

    if (allCars[i] == "Lamborghini") {
        img.setAttribute("selected", true)
        img.style = "width: 150px;height: 100px;background: center/contain no-repeat url(/imgs/Lamborghini-logo.png) ;";
        img.setAttribute("name", allCars[i])
    } else if (allCars[i] == "Bmw") {
        img.style = "width: 150px;height: 100px;background: center/contain no-repeat url(/imgs/bmw-logo.png);";
        img.setAttribute("name", allCars[i])
    } else if (allCars[i] == "Mercedes") {
        img.style = "width: 150px;height: 100px;background: center/contain no-repeat url(/imgs/mersedes-logo.png);";
        img.setAttribute("name", allCars[i])
    } else if (allCars[i] == "Audi") {
        img.style = "width: 150px;height: 100px;background: center/contain no-repeat url(/imgs/audi-logo.png);";
        img.setAttribute("name", allCars[i])
    } else if (allCars[i] == "Porsche") {
        img.style = "width: 150px;height: 100px;background: center/contain no-repeat url(/imgs/porsche-logo.jpg);";
        img.setAttribute("name", allCars[i])
    } else if (allCars[i] == "FordMustang") {
        img.style = "width: 150px;height: 100px;background: center/contain no-repeat url(/imgs/mustang-logo.jpg);";// mustang-logo.jpg
        img.setAttribute("name", allCars[i])
    }

    allLogosParent.append(img)
}

/////////////////////////////////////////////////////////////////////////////////

//choosing logo
allLogosParent.addEventListener("click", function (event) {
    let selectedLogo = selectLogo(event);
    showCars("", selectedLogo)
})
function selectLogo(event) {

    if (event) {

        //delete all selected attrs
        for (let i = 0; i < allLogosParent.children.length; i++) {
            if (allLogosParent.children[i].hasAttribute("selected")) {
                allLogosParent.children[i].removeAttribute("selected");
                event.target.setAttribute("selected", true);
            }
        }

        let eventTargetWidth = event.target.getClientRects()[0].width;
        let eventTargetHeight = event.target.getClientRects()[0].height;
        let eventTargetTop = event.target.getClientRects()[0].top;
        let eventTargetX = event.target.getClientRects()[0].left;

        let upSelectLine = document.getElementById("upSelectLine");
        let downSelectLine = document.getElementById("downSelectLine");

        upSelectLine.style = `width: ${eventTargetWidth};left: ${eventTargetX};top: ${eventTargetTop - 10};position: absolute;border-top: 1px solid black;`
        downSelectLine.style = `width: ${eventTargetWidth};left: ${eventTargetX};top: ${eventTargetTop + eventTargetHeight + 10};position: absolute;border-top: 1px solid black;`

        return event.target.getAttribute("name")
    } else {
        for (let i = 0; i < allLogosParent.children.length; i++) {
            if (allLogosParent.children[i].hasAttribute("selected")) {
                return allLogosParent.children[i].getAttribute("name")
            }
        }
    }

}


let mouseDownXYpos = {};
allLogosParent.addEventListener("mousedown", function (event) {
    mouseDownXYpos.x = event.x;
    mouseDownXYpos.y = event.y;
})

allLogosParent.addEventListener("mouseup", function (event) {

    if (Math.abs(mouseDownXYpos.y - event.y) > Math.abs(mouseDownXYpos.x - event.x)) {
        carOutSide = !carOutSide;
        console.log("im here")
        showCars("");
    } else {
        // console.log("right/left")
    }
})

/////////////////////////////////////////////////////////////////////////////////

let flag = false;
setInterval(() => {
    if (Number(window.getComputedStyle(leftArrow).opacity) > 0 && !flag) {
        leftArrow.style.opacity = Number(window.getComputedStyle(leftArrow).opacity) - 0.1
        rightArrow.style.opacity = Number(window.getComputedStyle(leftArrow).opacity) - 0.1
        upSelectLine.style.opacity = Number(window.getComputedStyle(leftArrow).opacity) - 0.1
        downSelectLine.style.opacity = Number(window.getComputedStyle(leftArrow).opacity) - 0.1
        if (Number(leftArrow.style.opacity) == 0) {
            flag = true;

        }
    } else if (flag) {
        leftArrow.style.opacity = Number(window.getComputedStyle(leftArrow).opacity) + 0.1
        rightArrow.style.opacity = Number(window.getComputedStyle(leftArrow).opacity) + 0.1
        upSelectLine.style.opacity = Number(window.getComputedStyle(leftArrow).opacity) + 0.1
        downSelectLine.style.opacity = Number(window.getComputedStyle(leftArrow).opacity) + 0.1
        if (Number(leftArrow.style.opacity) == 1) {
            flag = false;
        }
    }
}, 100);











