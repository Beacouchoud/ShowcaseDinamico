//TODO: Refactor
//TODO: Validate input (min value not working)
//TODO: Remove product from cart is broken
//TODO: Implement Delete Order

const order = document.getElementById("order");
const elementPrice = document.getElementById("price");
const elementTotalPrice = document.getElementById("totalPrice");

const createShowcaseProducts = () => {}


const createQuantityInput = () => {

    let elementFormGroup = document.createElement('div');
    let elementQuantity = document.createElement('input');
    let spanQuantity = document.createElement('span');

    elementFormGroup.setAttribute("class", "input-group input-group-sm mb-3");
    elementFormGroup.setAttribute("style", "width: 30%");

    spanQuantity.setAttribute("class", "input-group-text");
    spanQuantity.setAttribute("id", "inputGroup-sizing-sm");
    spanQuantity.textContent = "Kg";

    elementQuantity.setAttribute("aria-describedby", "inputGroup-sizing-sm");
    elementQuantity.setAttribute("type", "number");
    elementQuantity.setAttribute("contenteditable", "true");
    elementQuantity.setAttribute("value", "1");
    elementQuantity.setAttribute("class", "form-control");
    elementQuantity.setAttribute("min", "1");
    elementQuantity.addEventListener("change", (ev) => {
        ev.target.value = ev.target.value <= 0 ? 1 : ev.target.value;  
        recalculateTotalCost();
    });

    elementFormGroup.appendChild(elementQuantity);
    elementFormGroup.appendChild(spanQuantity);

    return elementFormGroup;
}

const createOrderProductElement = (name, price) => {
    let elementListItem = document.createElement('li');
    let elementParagraph = document.createElement('p');
    let text = document.createTextNode(name + " " + price);
    let quantityInput = createQuantityInput();

    elementParagraph.appendChild(text);
    elementParagraph.setAttribute("class", "product-info font-monospace");

    elementListItem.setAttribute("id", name+"_product");
    elementListItem.appendChild(elementParagraph);
    elementListItem.appendChild(quantityInput);
    elementListItem.setAttribute("class", "list-group-item mx-auto bg-transparent d-flex justify-content-between");

    order.insertBefore(elementListItem, elementPrice);
}

const addElementTocart = (ev) => {
    ev.preventDefault();
    let name = ev.dataTransfer.getData("name");
    let price = ev.dataTransfer.getData("price");
    ev.target.appendChild(document.getElementById(name));
    createOrderProductElement(name, price);
    recalculateTotalCost();
}

const removeElementFromcart = (ev) => {
    ev.preventDefault();
    let name = ev.dataTransfer.getData("name");
    order.removeChild(document.getElementById(name+"_product"));
    ev.target.appendChild(document.getElementById(name));
    recalculateTotalCost();
}

const recalculateTotalCost = (ev) => {
    // str.match(/(\d+)/);
    let allInputs = document.getElementsByTagName("input");
    let totalPrice = 0.00;
    for (let input of allInputs) {
        
       totalPrice += input.closest('li').querySelector('p').textContent.match(/(\d+\.\d+)/)[0] * input.value;
    }
    elementTotalPrice.textContent = totalPrice.toFixed(2);
}

const emptycart = () => {} 

function allowDrop(ev) {
    console.log("allow drop");
    ev.preventDefault();
}

function drag(ev) {
    console.log("drag start");
    ev.dataTransfer.setData("name", ev.target.id);
    ev.dataTransfer.setData("price", ev.target.title);
}

function drop(ev) {
    console.log("drop");
    ev.preventDefault();
    var data = ev.dataTransfer.getData("name");
    ev.target.appendChild(document.getElementById(data));
    recalculateTotalCost();
}