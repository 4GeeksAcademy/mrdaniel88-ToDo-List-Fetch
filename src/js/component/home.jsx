import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [task, setTask] = useState("");
	const [todos, setTodos] = useState(["Tarea 1", "Tarea 2"])

	function addTask(e) {

		if (e.code == "Enter") {
			// setTodos([...todos, task])
			const newTask = [...todos, task]
			setTodos(newTask)
			setTask("")
		}
	}

	function deleteTask(index) {
		const newListTaks = [...todos]
		newListTaks.splice(index,1)
		setTodos(newListTaks)
	}

	return (
		<div className="card">
			<div className="card-header">
				<input type="text"
					className="form-control border-0"
					placeholder="Escriba una tarea"
					value={task}
					onChange={(e) => setTask(e.target.value)}
					onKeyDown={addTask}
				/>
			</div>
			<ul className="list-group list-group-flush" id="task">
				{
					todos.map((todo, index) => (
						<li key={index} className="list-group-item d-flex justify-content-between align-item-center" >
							{todo}
							<button onClick={() => deleteTask(index)} className="btn btn-outline-danger btn-sm rounded-pill" id="showX">X</button>
						</li>
					))
				}

			</ul>
			<div className="card-footer">
				{todos.length} tareas pendientes
			</div>
		</div>
	);
};

export default Home;
