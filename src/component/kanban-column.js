import React from "react";
import axios from 'axios';
import KanbanCard from './kaban-card';
import Swal from "sweetalert2";


export class KanbanColumn extends React.Component {
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
		const task = {
			name: this.state.name,
			description: this.state.description,
			project_stage: column,
		}

		let url = window.location.pathname;
		let id = url.substring(url.lastIndexOf('/') + 1);

		axios.post('http://127.0.0.1:3001/api/boards/' + id + '/tasks', task)
			.then(res => console.log(res.data));

		Swal.fire({
			icon: 'success',
			title: 'Success',
			type: 'success',
			text: 'Operation completed successfully.',
		}).then(() => {
			window.location.reload();
		})

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
			'marginRight': '10px',
			'marginLeft': '10px',
			'marginBottom': '5px',
			'width': '230px',
			'textAlign': 'center',
			'borderRadius': '10px',
			'padding': '10px',
			'backgroundColor': '#f6f8fc',
			'boxShadow': '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 1px 8px rgba(0, 0, 0, 0.08)',
			'border-top': '10px solid' + this.setColor(),
		};
		return (
			<div
				style={columnStyle}
				onDragEnter={(e) => { this.setState({ mouseIsHovering: true }); this.props.onDragEnter(e, this.props.stage); }}
				onDragExit={(e) => { this.setState({ mouseIsHovering: false }); }}
			>
				<h4>{this.props.stage}. {this.props.name} ({this.props.projects.length})</h4>


				{this.generateKanbanCards()}
				<br />
				<button className="button button1" onClick={(e) => { this.addTask(e, this.props.stage) }}>Add</button><br />
				<input value={this.state.name} onChange={this.handleNameChange} type="text" placeholder="Name"></input>
				<input value={this.state.description} onChange={this.handleDescriptionChange} type="text" placeholder="Description"></input>
			</div>
		);
	}
}


export default KanbanColumn;