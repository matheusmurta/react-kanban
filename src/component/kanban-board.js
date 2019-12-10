import React from "react";
import axios from 'axios';
import KanbanColumn from './kanban-column';

export class KanbanBoard  extends React.Component  {

	constructor(props) {
		super(props);

		let  url = window.location.pathname;
		let  id = url.substring(url.lastIndexOf('/') + 1);

		this.state = ({
			boardID : id,
			isLoading: false,
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
		axios.get('http://127.0.0.1:3000/api/tasks/listbyboard/'+ this.state.boardID )
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


  export default KanbanBoard;