const savedAssignments = localStorage.getItem("assignments");
let assignments = savedAssignments ? JSON.parse(savedAssignments) : [];

const courseInput = document.querySelector("#course");
const form = document.querySelector("#assignment-form");
const nameInput = document.querySelector("#assignment-name");
const dueDateInput = document.querySelector("#due-date");
const assignmentList = document.querySelector(".assignment-list");
const priorityInput = document.querySelector("#priority");

function saveAssignments() {
  localStorage.setItem("assignments", JSON.stringify(assignments));
}

function displayAssignment(assignment) {
  const newAssignment = document.createElement("article");
  newAssignment.classList.add("assignment");
  newAssignment.classList.add(assignment.priority);

  const title = document.createElement("h3");
  title.textContent = assignment.name;
  newAssignment.append(title);

  const courseText = document.createElement("p");
  courseText.textContent = `Class: ${assignment.course}`;
  newAssignment.append(courseText);

  const priorityText = document.createElement("p");
  priorityText.textContent = `Priority: ${assignment.priority}`;
  newAssignment.append(priorityText);

  const date = document.createElement("p");
  date.textContent = `Due: ${new Date(`${assignment.dueDate}T00:00:00`).toLocaleDateString()}`;
  newAssignment.append(date);

  const completeLabel = document.createElement("label");
  const completeBox = document.createElement("input");
  completeBox.type = "checkbox";
  completeBox.checked = assignment.completed;
  completeLabel.append(completeBox, " Completed");
  newAssignment.append(completeLabel);

  newAssignment.classList.toggle("completed", assignment.completed);

  completeBox.addEventListener("change", function () {
    assignment.completed = completeBox.checked;
    newAssignment.classList.toggle("completed", assignment.completed);
    saveAssignments();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  newAssignment.append(deleteButton);

  deleteButton.addEventListener("click", function () {
    assignments = assignments.filter(function (item) {
      return item !== assignment;
    });

    saveAssignments();
    newAssignment.remove();
  });

  assignmentList.append(newAssignment);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const assignment = {
    name: nameInput.value,
    course: courseInput.value,
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
    completed: false
  };

  assignments.push(assignment);
  saveAssignments();
  displayAssignment(assignment);
  form.reset();
});

assignments.forEach(function (assignment) {
  displayAssignment(assignment);
});