let tasks = []; // Initialize tasks array

tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Load tasks from localStorage

fillTasks(); // Initial call to fill the task list


// fill each task in the list
function fillTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to localStorage
    document.getElementById("task-table").innerHTML = ""; // Clear previous tasks
    if (tasks.length === 0) {
        document.getElementById("task-table").innerHTML = "<p style='text-align:center; color:#888; font-family:Rakkas, serif;'>📝 لا توجد مهام حالياً</p>";
        return; // Exit if no tasks are available}
    }   
    let index = 0;
    for (task of tasks){
        document.getElementById("task-table").innerHTML += 
        `
            <div class="task ${task.isDone ? 'done' : ''}">
                <span>${index + 1}</span>            <!-- Display task number -->
                <p>${task.title}</p>                 <!-- Display task title -->     
                <div class="icons">                 
                        <i class="fa fa-trash"           onclick="deleteTask(${index})"      aria-hidden="true" style="background-color: rgba(180, 73, 69, 0.774);"></i>
                        ${task.isDone ? 
                        `
                        <i class="fa fa-check "          onclick="changeTaskState(${index})" aria-hidden="true" style="background-color: rgba(40, 119, 73, 0.774);"></i>
                        ` 
                        :
                        `
                        <i class="fa fa-xmark"           onclick="changeTaskState(${index})" aria-hidden="true" style="background-color: rgba(95, 34, 34, 0.77);" ></i>
                        `
                        }
                        <i class="fa fa-pencil"          onclick="editTask(${index})"        aria-hidden="true" style="background-color:  rgba(43, 112, 133, 0.93);"></i>
                </div>
            </div>
        `
        index++;
    }
    
    
}

// add task 
document.getElementById("add-task").addEventListener("click", function() {
    
    let taskTitle = prompt("عنوان المهمة");
    if (taskTitle) {
        tasks.push({ title: taskTitle, isDone: false });
        alert("تم إضافة المهمة بنجاح");
        fillTasks(); // Refresh the task list
    }
    else {
        alert("لم يتم إدخال عنوان المهمة");
    }
    
});

// delete task
function deleteTask(index) {
    if (confirm("هل أنت متأكد من حذف مهمة :" + tasks[index].title + "؟")) {
        tasks.splice(index, 1);
        fillTasks(); // Refresh the task list
        alert("تم حذف المهمة بنجاح");
    }
}

// edit task
function editTask(index){
    let newTitle = prompt("تعديل مهمة : " + tasks[index].title, tasks[index].title);
    if (newTitle) {
        tasks[index].title = newTitle;
        fillTasks(); // Refresh the task list
        alert("تم تعديل المهمة بنجاح");
    } else {
        alert("لم يتم إدخال عنوان جديد للمهمة");
    }
}

// change state of task
function changeTaskState(index) {
    tasks[index].isDone = !tasks[index].isDone; // Toggle completion status
    fillTasks(); // Refresh the task list
    alert(tasks[index].isDone ? "تم إكمال مهمة : " + tasks[index].title : "تم إلغاء إكمال مهمة : " + tasks[index].title);
}
