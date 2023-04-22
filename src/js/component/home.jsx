import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [task, setTask] = useState("");
	const [todos, setTodos] = useState([])
	useEffect(() => {
		getTodoList()
	}, [])

	async function addTask(e) {
		if (e.code == "Enter") {
			const newTask = [...todos, { label: task, done: false }]
			let response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/daniel', {
				body: JSON.stringify(newTask),
				method: "PUT",
				headers: { "Content-Type": "application/json" }
			})
			if (!response.ok) {
				console.log(response.status + ": " + response.statusText)
				return
			}
			let data = await response.json()
			// setTodos([...todos, task])
			setTodos(newTask)
			setTask("")
		}
	}

	async function deleteTask(index) {
		const newListTaks = [...todos]
		let objIndex = newListTaks.findIndex(task => task.index == index)
		newListTaks.splice(objIndex, 1)
		setTodos(newListTaks)
		let response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/daniel', {
			body: JSON.stringify(newListTaks),
			method: "PUT",
			headers: { "Content-Type": "application/json" }
		})
		if (!response.ok) {
			console.error(response.status + ": " + response.statusText)
		}
	}

	function checkToDo(index) {
		let newTodos = [...todos]
		newTodos[index].done = !newTodos[index].done
		setTodos(newTodos)
	}

	function getTodoList() {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/daniel')
			.then(response => {
				if (response.ok) {
					return response.json()
				}
				else {
					console.log(response.status + ": " + response.statusText)
				}
			})
			.then(data => {
				console.log(data)
				setTodos(data)
			})
			.catch(error => {
				console.error(error)
			})
		console.log("Iniciada la peticion")
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

							<div>
								<input className="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault" onChange={() => checkToDo(index)} checked={todo.done} />
								{todo.label}
							</div>
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
