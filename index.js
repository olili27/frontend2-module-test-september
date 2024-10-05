"use-strict";

let newEmployees = [
//   { id: 1, name: "jack", profession: "developer", age: 20 },
//   { id: 2, name: "john", profession: "admin", age: 28 },
];
let id = 0;

function createDiv() {
    return document.createElement("div");
}

function createSpanWithData(prefix, data) {
    let span = document.createElement("span");
    span.textContent = `${prefix}: ${data}`;
    return span;
}

function deleteEmployee(event) {
    let button = event.target;
    let parentNode = button.parentNode.parentNode;
    let employeeId = parentNode.getAttribute("data-id");
    
    newEmployees.filter(employee => employee.id == employeeId)
    .forEach( toBeDeleted => {
        let index = newEmployees.indexOf(toBeDeleted);
        newEmployees.splice(index, 1);
    });

    parentNode.remove()
    displayEmployees()
    document.querySelector(".message").style.display = "none";
}

function showError() {
    let messageElement = document.querySelector(".message");
    let paragraph = messageElement.querySelector("p");
    paragraph.textContent = "Error : Please Make sure All the fields are filled before adding in an employee!";
    paragraph.className = "";
    paragraph.classList.add("error");
    messageElement.style.display = "block";
}

function showSuccess() {
let messageElement = document.querySelector(".message");
let paragraph = messageElement.querySelector("p");
paragraph.textContent =
  "Success : Employee Added!";
  paragraph.className = "";
paragraph.classList.add("success");
messageElement.style.display = "block";
}

function validate(value) {
    if(!value || value === "" || value === null) {
        return false;
    }

    return true
}

function addNewEmployee() {
    let nameInput = document.getElementById("name-input");
    let professionInput = document.getElementById("profession-input");
    let ageInput = document.getElementById("age-input");

    let name = nameInput.value.trim();
    let profession = professionInput.value.trim();
    let age = ageInput.value.trim();

    if(!validate(name) || !validate(profession) || !validate(age)) {

        showError();
        return;
    }
    
    newEmployees.push({
        id: id++,
        name, 
        profession,
        age
    });

    nameInput.value = "";
    professionInput.value = "";
    ageInput.value = "";

    showSuccess();
    displayEmployees();
}

function displayEmployees() {
if (newEmployees.length === 0) {
  document.querySelector(".zero-employees-msg").style.display = "block";
  return;
}

let addedEmployeesDiv = document.getElementById("added-employees");
let zeroEmployeesMsgElement = createDiv();
zeroEmployeesMsgElement.classList.add("zero-employees-msg")
let p = document.createElement("p");
p.textContent = "You have 0 Employees";
zeroEmployeesMsgElement.appendChild(p);

addedEmployeesDiv.innerHTML = "";
addedEmployeesDiv.appendChild(zeroEmployeesMsgElement);

document.querySelector(".zero-employees-msg").style.display = "none";

newEmployees.map((employee, index) => {
  let div = createDiv();
  div.classList.add("info");
  div.setAttribute("data-id", employee.id);

  let employeeInfoDiv = createDiv();
  employeeInfoDiv.classList.add("employee-info");

  let count = document.createElement("span");
  count.textContent = `${index + 1}.`;
  employeeInfoDiv.appendChild(count);

  let nameSpan = createSpanWithData("Name", employee.name);
  employeeInfoDiv.appendChild(nameSpan);

  let professionSpan = createSpanWithData("Profession", employee.profession);
  employeeInfoDiv.appendChild(professionSpan);

  let ageSpan = createSpanWithData("Age", employee.age);
  employeeInfoDiv.appendChild(ageSpan);
  div.appendChild(employeeInfoDiv);

  let deleteContainerDiv = createDiv();
  deleteContainerDiv.classList.add("delete-container");
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete User";
  deleteButton.classList.add("delete");
  deleteButton.onclick = deleteEmployee;
  deleteContainerDiv.appendChild(deleteButton);
  div.appendChild(deleteContainerDiv);

  addedEmployeesDiv.appendChild(div);
});
}

window.addEventListener("DOMContentLoaded", async function () {
    
    
    // let addedEmployeesDiv = document.getElementById("added-employees");

    // newEmployees.map(
    //     (employee, index) => {
    //         let div = createDiv();
    //         div.classList.add("info");
    //         div.setAttribute("data-id", employee.id);

    //         let employeeInfoDiv = createDiv();
    //         employeeInfoDiv.classList.add("employee-info");
            
    //         let count = document.createElement("span");
    //         count.textContent = `${index + 1}.`;
    //         employeeInfoDiv.appendChild(count)

    //         let nameSpan = createSpanWithData("Name", employee.name);
    //         employeeInfoDiv.appendChild(nameSpan);
            
    //         let professionSpan = createSpanWithData(
    //             "Profession",
    //             employee.profession
    //         );
    //         employeeInfoDiv.appendChild(professionSpan);

            
    //         let ageSpan = createSpanWithData(
    //           "Age",
    //           employee.age
    //         );
    //         employeeInfoDiv.appendChild(ageSpan);
    //         div.appendChild(employeeInfoDiv);

    //         let deleteContainerDiv = createDiv();
    //         deleteContainerDiv.classList.add("delete-container");
    //         let deleteButton = document.createElement("button");
    //         deleteButton.textContent = "Delete User"
    //         deleteButton.classList.add("delete");
    //         deleteButton.onclick = deleteEmployee;
    //         deleteContainerDiv.appendChild(deleteButton);
    //         div.appendChild(deleteContainerDiv);
            
    //         addedEmployeesDiv.appendChild(div);
    //   }
    // );

    displayEmployees();

    document.getElementById("add-user").onclick = addNewEmployee;
});


