import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import TaskView from './components/TaskView';
import ListView from './components/ListView';
import './styles/App.scss';
import 'font-awesome/css/font-awesome.min.css';

function App() {


    return (
        // Step 1 - Create a basic page where the form and lists are on the same page
        // <div>
        //     <h1>Task Management App</h1>
        //     <TaskForm addTask={addTask} />
        //     <TaskList tasks={tasks} closedTasks={closedTasks} closeTask={closeTask} />
        // </div>

        // Step 2 - Create navigation for different pages in the SPA
        <Router>
            <div>
                {/* <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/tasks">Tasks</Link>
                        </li>
                        <li>
                            <Link to="/tasks/add">Add Task</Link>
                        </li>
                    </ul>
                </nav> */}
                {/*Step 3 - Replace with a navigation bar*/}
                
                <NavigationBar />
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <TaskView />
                        } 
                    />
                    <Route
                        path="/lists"
                        element={
                            <ListView />
                        }
                    />
                    {/* <Route path="/tasks" exact element={<TaskList tasks={tasks} closedTasks={closedTasks} closeTask={closeTask} />} />
                    <Route path="/tasks/add" element={<TaskForm addTask={addTask} tasks={tasks} />} /> */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;