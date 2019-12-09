import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class Board extends React.Component {

	redirect() {
		alert("time to redirect");
	}

	createBoard() {
		//get name
		//post
	}

	render() {

		const style = {
			'padding': '30px'
		}

		return (
			<div style={style}>
				<h1>Submit a board Name</h1>
				<input placeholder="Board Name"></input>
				<button onClick={this.redirect} >Save</button>
			</div>
		);
	}
}



class Kanban extends React.Component {
	render() {

		const style = {
			'padding': '30px',
			'paddingTop': '5px',
		};

		return (
			<div style={style}>
				<h1>Project Kanban Board</h1>
				<KanbanBoard />
			</div>
		);
	}
}


class KanbanBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = ({
			isLoading: true,
			projects: [],
			draggedOverCol: 0,
		});
		this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
		this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
		this.columns = [
			{ name: 'Backlog', stage: 1 },
			{ name: 'To do', stage: 2 },
			{ name: 'In Progress', stage: 3 },
			{ name: 'Testing', stage: 4 },
			{ name: 'Done', stage: 5 },
		];


	}


	get() {
		axios.get('http://127.0.0.1:3000/api/tasks')
			.then(res => {
				this.setState({ projects: res.data, isLoading: false });

			})
			.catch(error => {
				console.log(error);
			});
	}

	componentDidMount() {
		this.get();
	}

	// é chamado quando um cartão Kanban é arrastado sobre uma coluna (chamada por coluna)
	handleOnDragEnter(e, stageValue) {
		//acomapnha o valor da coluna que ele quer 
		console.log(stageValue);
		this.setState({ draggedOverCol: stageValue });
	}

	// é chamado quando um cartão Kanban cai sobre uma coluna (chamado por cartão)
	handleOnDragEnd(e, project) {
		//Atualizar no branco 
		//pegar o valor do column
		//atualiza no state 
		console.log("desc do projeto jogado", project);
		console.log(project.project_stage != this.state.draggedOverCol);
		console.log("nome da coluna que ele jogou " + this.state.draggedOverCol);
		if( project.project_stage != this.state.draggedOverCol)
		{
			//alert('estava na '+project.project_stage)
			//alert('projeto'+project.id)
			//alert('estou querendo ir para ' + this.state.draggedOverCol);
			const project_stage = { project_stage: this.state.draggedOverCol }
			axios.put('http://127.0.0.1:3000/api/tasks/'+ project.id, project_stage)
				.then(res => console.log(res.data));

				const updatedProjects = this.state.projects.slice(0);
				updatedProjects.find((projectObject) => { return projectObject.name === project.name; }).project_stage = this.state.draggedOverCol;
				this.setState({ projects: updatedProjects });
		}
	
	
	}

	render() {
		if (this.state.isLoading) {
			return (<h3>Loading...</h3>);
		}

		return (
			<div>
				{this.columns.map((column) => {
					return (
						<KanbanColumn
							name={column.name}
							stage={column.stage}
							projects={this.state.projects.filter((project) => { return parseInt(project.project_stage, 10) === column.stage; })}
							onDragEnter={this.handleOnDragEnter}
							onDragEnd={this.handleOnDragEnd}
							key={column.stage}
						/>
					);
				})}
			</div>
		);
	}
}


class KanbanColumn extends React.Component {
	constructor(props) {
		super(props);
		this.state = ({ mouseIsHovering: false, name: '', description: '', project_stage: '1' });
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.state = ({ mouseIsHovering: false });
	}

	handleNameChange(event) {
		this.setState({ name: event.target.value });
	}

	handleDescriptionChange(event) {
		this.setState({ description: event.target.value });
	}


	addTask(event, column) {
		//e.preventDefault();
		const task = {
			name: this.state.name,
			description: this.state.description,
			project_stage: column,
		}
		axios.post('http://127.0.0.1:3000/api/boards/1/tasks', task)
			.then(res => console.log(res.data));

		console.log(task);
		window.location.reload();
	}

	generateKanbanCards() {
		return this.props.projects.slice(0).map((project) => {
			return (
				<KanbanCard
					project={project}
					key={project.name}
					onDragEnd={this.props.onDragEnd}
				/>
			);
		});
	}



	setColor() {
		switch (this.props.stage) {
			case 1: return "#3498db";
			case 2: return "#f1c40f";
			case 3: return "#95a5a6";
			case 4: return "#16a085";
			case 5: return "#2ecc71";
			default: return "#2ecc71";
		}
	}

	render() {
		const columnStyle = {
			'display': 'inline-block',
			'verticalAlign': 'top',
			'marginRight': '5px',
			'marginBottom': '5px',
			'width': '230px',
			'textAlign': 'center',
			'borderRadius': '10px',
			'padding': '10px',
			'backgroundColor': this.setColor(),
		};
		return (
			<div
				style={columnStyle}
				onDragEnter={(e) => { this.setState({ mouseIsHovering: true }); this.props.onDragEnter(e, this.props.stage); }}
				onDragExit={(e) => { this.setState({ mouseIsHovering: false }); }}
			>
				<h4>{this.props.stage}. {this.props.name} ({this.props.projects.length})</h4>
				<button onClick={(e) => { this.addTask(e, this.props.stage) }}>Add</button><br />
				<input  value={this.state.name} onChange={this.handleNameChange} type="text" placeholder="name"></input>
				<input  value={this.state.description} onChange={this.handleDescriptionChange} type="text" placeholder="description"></input>

				{this.generateKanbanCards()}
				<br />
			</div>
		);
	}
}


class KanbanCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: true,
			showMe: false
		};

		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
	}

	handleDescriptionChange(event) {
		this.setState({ description: event.target.value });
	}


	update(e, data) {

		//axios.put('http://127.0.0.1:3000/api/tasks/'+ data.id, data)
		//	.then(res => console.log(res.data));


		//tem que dar update da descricao
		//e atualizar no dom 
		console.log(data.id);
		console.log(data);
		alert('update!');
	//	window.location.reload();
	}


	delete(event, task) {
		axios.delete('http://127.0.0.1:3000/api/tasks/'+ task.id )
			.then(res => console.log(res.data));

		console.log(task.id);
		window.location.reload();

	}


	render() {
		const cardStyle = {
			'backgroundColor': 'white',
			'paddingLeft': '0px',
			'paddingTop': '5px',
			'paddingBottom': '5px',
			'marginLeft': '0px',
			'marginRight': '5px',
			'marginBottom': '5px',
			'borderRadius': '8px',
			'boxShadow': '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 1px 8px rgba(0, 0, 0, 0.08)'
		};

		return (
			<div
				style={cardStyle}
				draggable={true}
				onDragEnd={(e) => { this.props.onDragEnd(e, this.props.project); }}
			>
				<br />
				<button onClick={(e) => { this.delete(e, this.props.project) }}>Remove</button>
		
				<div><h4>{this.props.project.name}</h4></div>
				{(this.state.collapsed) ? null: 
				(<div><strong>Description: </strong><br />
					
				<textarea 
				type="text" 
				name="payloadBox" 
				placeholder="Enter payload here..."
				onChange={this.handleDescriptionChange}
				value={ this.props.project.description } 
				/>
	  			<br/>	
	  			<button onClick={(e) => { this.update(e, this.props.project) }}>Update description</button>
				</div>
					)
				}
				<div
					style={{ 'width': '100%' }}
					onClick={(e) => { this.setState({ collapsed: !this.state.collapsed }); }}
				>
					{(this.state.collapsed) ? String.fromCharCode('9660') : String.fromCharCode('9650')}
				</div>
			</div>
		);
	}
}




function App() {

	return (
		<Kanban />
	);
}

export default App;
