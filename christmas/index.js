/**@type {HTMLDivElement} */
const mainContainer = document.createElement("div");
mainContainer.id = "jssection";
mainContainer.classList.add("hide");
document.body.appendChild(mainContainer);

/** @type {HTMLTableElement} */
const dataTable = document.createElement("table");
mainContainer.appendChild(dataTable);

/** @type {HTMLTableSectionElement} */
const tableHead = document.createElement("thead");
dataTable.appendChild(tableHead);

/** @type {HTMLTableRowElement} */
const headerRow = document.createElement("tr");
tableHead.appendChild(headerRow);

/** @type {string[]} */
const columnNames = ["Osztály", "Manó", "Műszak"];

for (const colName of columnNames) {
    /**@type {HTMLTableCellElement} */
    const headerCell = document.createElement("th");
    headerCell.innerText = colName;
    headerRow. appendChild(headerCell);
}

/** @type {HTMLTableSectionElement} */
const tableBody = document.createElement("tbody");
tableBody.id = "jstbody";
dataTable.appendChild(tableBody);

/**@typedef {what: string, who1: string, shift1: string, who2?: string, shift2?: string} Elf */

/** @type {Elf[]} */
const elfData = [
    {
        what: "Logisztika",
        who1: "Kovács Máté",
        shift1: "Délelőttös",
        who2: "Kovács József",
        shift2: "Délutános"
    },
    {
        what: "Könyvelés",
        who1: "Szabó Anna",
        shift1: "Éjszakai"
    }
];

/**
 * @param {string} fieldValue 
 * @returns {boolean}
 */
function validate(fieldValue) {
    let valid = true;
    if(fieldValue == '') {
        const parentDiv = fieldValue.parentElement;
        const errorSpan = parentDiv.querySelector('.error');
        errorSpan.innerText = "Ez a mező kötelező! ";
        valid = false;
    }
    return valid
}

/**
 * @param {string} identifier 
 * @param {string} labelText 
 * @returns {void}
*/
function createSelect(identifier, labelText) {
    const container = document.createElement("div");

    const labelElem = document.createElement("label");
    labelElem.innerText = labelText;
    labelElem.htmlFor = identifier;
    container.appendChild(labelElem);

    const selectElem = document.createElement("select");
    selectElem.id = identifier;

    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption. innerText = "Válassz műszakot!";
    selectElem.appendChild(emptyOption);

    const shiftOptions = [
        { value: "1", text: "Délelőttös" },
        { value: "2", text: "Délutános" },
        { value: "3", text: "Éjszakai" }
    ];

    for (let idx = 0; idx < shiftOptions.length; idx++) {
        const opt = document.createElement("option");
        opt.value = shiftOptions[idx].value;
        opt.innerText = shiftOptions[idx].text;
        selectElem.appendChild(opt);
    }

    container.appendChild(selectElem);

    const errorSpan = document.createElement("span");
    errorSpan.classList. add("error");
    container.appendChild(errorSpan);

    dynamicForm.appendChild(container);
}

/**
 * @param {string} identifier 
 * @param {string} labelText
 * @returns {void} 
 */
function createInput(identifier, labelText) {
    const container = document.createElement("div");
    dynamicForm.appendChild(container);

    const labelElem = document.createElement("label");
    labelElem.innerText = labelText;
    labelElem. htmlFor = identifier;
    container.appendChild(labelElem);

    const inputElem = document. createElement("input");
    inputElem.id = identifier;
    inputElem.name = identifier;
    container.appendChild(inputElem);

    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error");
    container.appendChild(errorSpan);
}

/**
 * @param {Elf} dataArray 
 * @returns {void}
*/
function renderTbody(dataArray) {
    tableBody.innerHTML = "";

    for (let idx = 0; idx < dataArray.length; idx++) {
        const firstRow = document.createElement("tr");
        tableBody.appendChild(firstRow);

        const departmentCell = document.createElement("td");
        departmentCell.innerText = dataArray[idx].what;
        firstRow.appendChild(departmentCell);

        const firstElfCell = document.createElement("td");
        firstElfCell. innerText = dataArray[idx]. who1;
        firstRow. appendChild(firstElfCell);

        const firstShiftCell = document.createElement("td");
        firstShiftCell.innerText = dataArray[idx].shift1;
        firstRow.appendChild(firstShiftCell);

        if (dataArray[idx].who2 && dataArray[idx].shift2) {
            departmentCell.rowSpan = 2;

            const secondRow = document.createElement("tr");
            tableBody.appendChild(secondRow);

            const secondElfCell = document.createElement("td");
            secondElfCell.innerText = dataArray[idx].who2;
            secondRow.appendChild(secondElfCell);

            const secondShiftCell = document.createElement("td");
            secondShiftCell.innerText = dataArray[idx].shift2;
            secondRow.appendChild(secondShiftCell);
        }
    }
}

/**@type {HTMLFormElement} */
const dynamicForm = document.createElement("form");
dynamicForm.id = "jsform";
mainContainer.appendChild(dynamicForm);

createInput("osztaly", "Osztály");
createInput("mano1", "Manó 1");
createSelect("muszak1", "Manó 1 műszak");

/** @type {HTMLDivElement} */
const checkboxContainer = document.createElement("div");

/** @type {HTMLInputElement} */
const secondElfCheckbox = document.createElement("input");
secondElfCheckbox.type = "checkbox";
secondElfCheckbox.id = "masodikmano";
checkboxContainer.appendChild(secondElfCheckbox);

/** @type {HTMLLabelElement} */
const checkboxLabel = document.createElement("label");
checkboxLabel.innerText = "Két manót veszek fel";
checkboxLabel. htmlFor = "masodikmano";
checkboxContainer.appendChild(checkboxLabel);

dynamicForm.appendChild(checkboxContainer);

createInput("mano2", "Manó 2");
createSelect("muszak2", "Manó 2 műszak");

const submitBtn = document.createElement("button");
submitBtn.innerText = "Hozzáadás";
dynamicForm.appendChild(submitBtn);

initCheckbox(secondElfCheckbox);

dynamicForm.addEventListener("submit", handleJSForm);

renderTbody(elfData);
initSelect(elfData);

/**
 * @param {Event} event 
 */
function handleJSForm(event) {
    event.preventDefault();

    /** @type {HTMLInputElement} */
    const departmentInput = dynamicForm.querySelector("#osztaly");
    /** @type {HTMLInputElement} */
    const firstElfInput = dynamicForm.querySelector("#mano1");
    /** @type {HTMLSelectElement} */
    const firstShiftSelect = dynamicForm.querySelector("#muszak1");
    /** @type {HTMLInputElement} */
    const secondElfInput = dynamicForm.querySelector("#mano2");
    /** @type {HTMLSelectElement} */
    const secondShiftSelect = dynamicForm.querySelector("#muszak2");
    /** @type {HTMLInputElement} */
    const hasSecondElf = dynamicForm.querySelector("#masodikmano");

    if (validate(departmentInput. value) & validate(firstElfInput.value) & validate(firstShiftSelect.value)) {
        /** @type {Elf} */
        const newEntry = {
            what: departmentInput.value,
            who1: firstElfInput.value,
            shift1: mapMuszak(firstShiftSelect.value)
        };

        if (hasSecondElf. checked) {
            newEntry. who2 = secondElfInput.value;
            newEntry. shift2 = mapMuszak(secondShiftSelect.value);
        }

        createNewElement(newEntry, dynamicForm, elfData);
    }
}

const staticForm = document.getElementById("htmlform");
staticForm.addEventListener("submit", handleHTMLForm);

/**
 * @param {Event} event
 */
function handleHTMLForm(event) {
    event.preventDefault();

    /** @type {HTMLFormElement} */
    const formElement = event.target;
    
    for (const errorElement of formElement.querySelectorAll(".error")) {
        errorElement.innerText = "";
    }

    /** @type {HTMLSelectElement} */
    const elfSelector = formElement.querySelector("#manochooser");
    /** @type {HTMLInputElement} */
    const firstTask = formElement.querySelector("#manotev1");
    /** @type {HTMLInputElement} */
    const secondTask = formElement.querySelector("#manotev2");

    if (validate(elfSelector.value) & validate(firstTask.value)) {
        const htmlTableBody = document.getElementById("htmltbody");

        const newRow = document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.innerText = elfSelector.value;
        newRow.appendChild(cell1);

        const cell2 = document.createElement("td");
        cell2.innerText = firstTask. value;
        newRow.appendChild(cell2);

        if (secondTask.value) {
            const cell3 = document.createElement("td");
            cell3.innerText = secondTask.value;
            newRow.appendChild(cell3);
        } else {
            cell2.colSpan = 2;
        }

        htmlTableBody.appendChild(newRow);
        formElement.reset();
    }
}