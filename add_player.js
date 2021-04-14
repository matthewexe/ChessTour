import { LinkedList as List } from "./src/LinkedList.js";
import { Table } from "./src/Table.js";

const raw_input = document.querySelectorAll(
    "main .container .add-player form .input-data input[type = 'text']"
);
const add_btn = document.querySelector("#add-to-list");
const add_err = document.querySelector(".container .add-player .err");
const table = new Table(".container .data-player table tbody");
const list = new List();

let input = new Array(raw_input.length);

const setBorderColor = (element, color) => {
    element.style.borderColor = color;
};

const emptyFields = () => raw_input.forEach((element) => (element.value = ""));

const deleteRow = (element) => {
    element.parentNode.removeChild(element);
};

const removeRow = (props) => {
    list.remove(list.length() - props.path[2].rowIndex);
    deleteRow(props.path[2]);
};

const addPlayer = (input, table) => {
    table.addRow(input);
    const tableHTML = table.getTable();
    for (const iterator of tableHTML.children) {
        iterator.lastChild.addEventListener("click", removeRow);
    }
    tableHTML.children[0].removeEventListener("click", removeRow);
    tableHTML.removeEventListener("click", removeRow);
    start_err.innerHTML = "";
};

add_btn.addEventListener("click", () => {
    if (checkInput()) {
        input = getInput();
        list.add(input[0], input[1], input[2], input[3]);
        addPlayer(input, table);
        add_err.innerHTML = "";
        emptyFields();
        removeActive();
    }
});

// Taking input fields
const getInput = () => {
    const input = new Array();
    raw_input.forEach((element, index) => {
        input.push(element.value.trim());
        if (index == 0 || index == 1) {
            input[index] =
                input[index].charAt(0).toUpperCase() +
                input[index].slice(1).toLowerCase();
        } else if (index == 2 && /^[a-z]+$/.test(input[2]))
            input[index] = input[index].toUpperCase();
        else if (index == 3 && isNumeric(input[index]))
            input[3] = parseInt(input[3]);
    });

    return input;
};

// Checking input fields
const isNumeric = (value) => /^\d+$/.test(value);
const isAlpha = (value) => /^[a-zA-z' ]+$/.test(value) && !/^[' ]/.test(value);

const checkName = (element) => {
    if (isAlpha(element.value)) {
        correctInput(element);
        return 1;
    } else {
        errorInput(element);
        return 0;
    }
};

const checkSurname = (element) => {
    if (isAlpha(element.value)) {
        correctInput(element);
        return 1;
    } else {
        errorInput(element);
        return 0;
    }
};

const checkNation = (element) => {
    if (
        isAlpha(element.value) &&
        (element.value.trim().length === 2 || element.value.trim().length === 3)
    ) {
        correctInput(element);
        return 1;
    } else {
        errorInput(element);
        return 0;
    }
};

const checkElo = (element) => {
    if (
        isNumeric(element.value) &&
        element.value >= 100 &&
        element.value <= 3000
    ) {
        correctInput(element);
        return 1;
    } else {
        errorInput(element);
        return 0;
    }
};

const checkInput = () => {
    const name = checkName(raw_input[0]);
    const surname = checkSurname(raw_input[1]);
    const nation = checkNation(raw_input[2]);
    const elo = checkElo(raw_input[3]);
    return name && surname && nation && elo;
};

const correctInput = (element) => {
    setBorderColor(element, "var(--main-border-color)");
};

const errorInput = (element) => {
    setBorderColor(element, "red");
    add_err.innerHTML = "<span>Fill all fields correctly</span>";
};

// Button "Start tournament"
// Button "Start tournament"
// Button "Start tournament"
const start_btn = document.querySelector(
    ".container .add-player .button-start button#start"
);
const start_err = document.querySelector(
    ".container .add-player .button-start .err"
);

start_btn.addEventListener("click", () => {
    if (list.length() < 2)
        start_err.innerHTML = "<span>Not enough players</span>";
    else window.location.href = "./tournament.html";
});

// Animation Input
// Animation Input
// Animation Input

const input_fields = document.querySelectorAll(
    ".container .add-player form .input-data"
);

input_fields.forEach((el) => {
    el.children[1].addEventListener("focus", () => {
        el.children[0].classList.add("active");
    });
    el.children[1].addEventListener("focusout", () => {
        if (el.children[1].value.length == 0)
            el.children[0].classList.remove("active");
    });
});

const removeActive = () =>
    input_fields.forEach((element) => {
        element.children[0].classList.remove("active");
    });

export { checkInput, getInput };
