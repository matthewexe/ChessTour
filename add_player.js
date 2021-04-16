import { LinkedList } from "./src/LinkedList.js";
import { Table } from "./src/Table.js";

const input_tags = document.querySelectorAll(
    "main .container .add-player form .input-data input[type = 'text']"
);
const add_btn = document.querySelector("#add-to-list");
const add_err = document.querySelector(".container .add-player .err");
const table = new Table(".container .data-player table tbody");
const list = new LinkedList();

let input = new Array(input_tags.length);

const emptyFields = () => input_tags.forEach((element) => (element.value = ""));

// Options for row with player and his delete button
const removeRow = (element) => {
    element.parentNode.removeChild(element);
};

const removePlayer = (props) => {
    list.remove(list.length() - props.path[2].rowIndex);
    removeRow(props.path[2]);
};

const addPlayer = (input, table) => {
    table.addRow(input);
    const tableHTML = table.getTable();
    for (const iterator of tableHTML.children) {
        iterator.lastChild.addEventListener("click", removePlayer);
    }
    tableHTML.children[0].removeEventListener("click", removePlayer);
    tableHTML.removeEventListener("click", removePlayer);
    start_err.innerHTML = "";
};

// Taking input fields
const getInput = () => {
    const input = new Array();
    input_tags.forEach((element, index) => {
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
    const name = checkName(input_tags[0]);
    const surname = checkSurname(input_tags[1]);
    const nation = checkNation(input_tags[2]);
    const elo = checkElo(input_tags[3]);
    return name && surname && nation && elo;
};

// Set color of border input if there are or aren't errors
const setBorderColor = (element, color) => {
    element.style.borderColor = color;
};

const correctInput = (element) => {
    setBorderColor(element, "var(--main-border-color)");
};

const errorInput = (element) => {
    setBorderColor(element, "red");
    add_err.innerHTML = "<span>Fill all fields correctly</span>";
};

// Button "Start tournament"
const start_btn = document.querySelector(
    ".container .add-player .button-start button#start"
);
const start_err = document.querySelector(
    ".container .add-player .button-start .err"
);

start_btn.addEventListener("click", () => {
    list.setSession();
    if (list.length() < 2)
        start_err.innerHTML = "<span>Not enough players</span>";
    else window.location.href = "./tournament.html";
});

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

// Button "Add player"
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
