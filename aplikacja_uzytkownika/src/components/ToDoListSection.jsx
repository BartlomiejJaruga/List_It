import { useState } from 'react';
import "../styles/ToDoListSection.css";

function ToDoListSection(){

    const [tasks, setTasks] = useState([
        { name: 'Sample Task 1', important: false, completed: false, deleteChecked: false },
        { name: 'Sample Task 2', important: true, completed: false, deleteChecked: false },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [isNewTaskImportant, setIsNewTaskImportant] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const addTask = () => {
        if (newTaskName.trim() !== '') {
            console.log("Added task.");
            setTasks([...tasks, { name: newTaskName, important: isNewTaskImportant, completed: false, deleteChecked: false }]);
            setIsModalOpen(false);
            setNewTaskName('');
            setIsNewTaskImportant(false);
        }
    };

    const toggleTaskCompletion = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const toggleTaskDeleteChecked = (index) => {
        const newTasks = [...tasks];
        newTasks[index].deleteChecked = !newTasks[index].deleteChecked;
        setTasks(newTasks);
    };

    const deleteTasks = () => {
        setTasks(tasks.filter(task => !task.deleteChecked));
        setIsDeleting(false);
    };

    const toggleDeleteMode = () => {
        setIsDeleting(!isDeleting);
        if (!isDeleting) {
            // Reset delete checks when exiting delete mode
            const newTasks = tasks.map(task => ({ ...task, deleteChecked: false }));
            setTasks(newTasks);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        console.log("Adding...")
    };

    return (
        <div className="todo-container">
            <ul className="todo-list">
                {tasks.map((task, index) => (
                    <li key={index} className="todo-item">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={isDeleting ? () => toggleTaskDeleteChecked(index) : () => toggleTaskCompletion(index)}
                            className="task-checkbox"
                        />
                        <span className="task-text" style={{
                            color: task.important ? 'red' : 'black',
                            textDecoration: task.completed ? 'line-through' : 'none'
                        }}>
              {task.name}
            </span>
                    </li>
                ))}
            </ul>
            <div className="button-container">
                <button className="round-button" onClick={openModal}>+</button>
                {isDeleting ? (
                    <button className="round-button" onClick={deleteTasks}>✓</button>
                ) : (
                    <button className="round-button" onClick={toggleDeleteMode}>-</button>
                )}
            </div>

            {isModalOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Add New Task</h2>
                        <input
                            type="text"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            placeholder="Task Name"
                        />
                        <label>
                            Important <input
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