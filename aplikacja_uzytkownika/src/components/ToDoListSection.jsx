import { useState } from 'react';
import "../styles/ToDoListSection.css";

function ToDoListSection(){

    const [tasks, setTasks] = useState([
        { name: 'Sample Task 1', important: false, completed: false },
        { name: 'Sample Task 2', important: true, completed: false },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [isNewTaskImportant, setIsNewTaskImportant] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [tasksToDelete, setTasksToDelete] = useState([]);

    const addTask = () => {
        if (newTaskName.trim() !== '') {
            setTasks([...tasks, { name: newTaskName, important: isNewTaskImportant, completed: false }]);
            setNewTaskName('');
            setIsNewTaskImportant(false);
            setIsModalOpen(false);
        }
    };

    const toggleTaskCompletion = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const toggleTaskToDelete = (index) => {
        const newTasksToDelete = [...tasksToDelete];
        if (newTasksToDelete.includes(index)) {
            newTasksToDelete.splice(newTasksToDelete.indexOf(index), 1);
        } else {
            newTasksToDelete.push(index);
        }
        setTasksToDelete(newTasksToDelete);
    };

    const deleteTasks = () => {
        setTasks(tasks.filter((_, index) => !tasksToDelete.includes(index)));
        setTasksToDelete([]);
        setIsDeleting(false);
    };

    return(
        <div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(index)}
                        />
                        <span style={{ color: task.important ? 'red' : 'black', textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.name}
            </span>
                        {isDeleting && (
                            <input
                                type="checkbox"
                                checked={tasksToDelete.includes(index)}
                                onChange={() => toggleTaskToDelete(index)}
                            />
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={() => setIsModalOpen(true)}>Add Task</button>
            {isDeleting ? (
                <button onClick={deleteTasks}>Confirm Delete</button>
            ) : (
                <button onClick={() => setIsDeleting(true)}>Delete Task</button>
            )}

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New Task</h2>
                        <input
                            type="text"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            placeholder="Task Name"
                        />
                        <label>
                            Important
                            <input
                                type="checkbox"
                                checked={isNewTaskImportant}
                                onChange={(e) => setIsNewTaskImportant(e.target.checked)}
                            />
                        </label>
                        <button onClick={addTask}>Add Task</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ToDoListSection;