import { saveTask, getTask, onGetTasks, deleteTask, updateTask } from "./firebase.js";
const taskContainer = document.getElementById("tasks-container");
const taskForm = document.getElementById("task-form");

let editStatus = false;
let id = "";
window.addEventListener("DOMContentLoaded", async() => {
    onGetTasks((querySnapshot) => {
        taskContainer.innerHTML = ""
        querySnapshot.forEach((doc) => {
            const task = doc.data();


            taskContainer.innerHTML += `
            <div
            class="card card-body mt-2 border-primary
            >
        <h3
        class="h5"
        >${task.title}<h3>
        <p
        class="salto-de-linea"
        >${task.description}</p>
        <div>
        
        <button class="btn-delete btn btn-primary" data-id="${doc.id}">Delete</button>
        <button class="btn-edit btn btn-secondary" data-id="${doc.id}">Edit</button>
        </div>
        </div>
        `;
        });

        const btnsDelete = taskContainer.querySelectorAll(".btn-delete")
        btnsDelete.forEach(btn => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                deleteTask(dataset.id)

            })
        })

        const btnsEdit = taskContainer.querySelectorAll(".btn-edit")
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async({ target: { dataset } }) => {
                try {

                    const doc = await getTask(dataset.id)
                    const task = doc.data();
                    taskForm['task-title'].value = task.title
                    taskForm['task-description'].value = task.description
                    taskForm["btn-task-form"].innerText = "Update"
                    id = dataset.id
                    editStatus = true;
                } catch (error) {
                    console.log(error)
                }


            })
        })
    });
});



taskForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const title = taskForm["task-title"];
    const description = taskForm["task-description"];

    try {
        if (!editStatus) {
            await saveTask(title.value, description.value);
        } else {
            await updateTask(id, { title: title.value, description: description.value });
            editStatus = false
            id = "";
            taskForm["btn-task-form"].innerText = "Save";
        }


        taskForm.reset();
        title.focus()

    } catch (error) {
        console.log(error)
    }

});