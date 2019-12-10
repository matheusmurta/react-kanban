import React from "react";
import axios from 'axios';
import Swal from "sweetalert2";


export class KanbanCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			showMe: false,
			newName: '',
			newDescription: '',
			EditIsAtive: false
		};

		this.handleChangeNewName = this.handleChangeNewName.bind(this);
		this.handleChangeNewDescription = this.handleChangeNewDescription.bind(this);
	}

	handleChangeNewName(event) {
		this.setState({ newName: event.target.value });
	}

	handleChangeNewDescription(event) {
		this.setState({ newDescription: event.target.value });
	}


	update(e, targetTask) {

		const task = {
			name: this.state.newName,
			description: this.state.newDescription,
			project_stage: targetTask.project_stage
		}

		axios.put('http://127.0.0.1:3001/api/tasks/' + targetTask.id, task)
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

	ativeEdit(event, task) {
		this.setState({ EditIsAtive: true, newName: this.props.project.name, newDescription: this.props.project.description });
	}

	exitEdit(event) {
		this.setState({ EditIsAtive: false });
	}

	delete(event, task) {

		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.value) {

				axios.delete('http://127.0.0.1:3001/api/tasks/' + task.id)
					.then(res => console.log(res.data));

				Swal.fire(
					'Deleted!',
					'Your file has been deleted.',
					'success'
				)

				setTimeout(() =>
					window.location.reload()
					, 1000);
			}
		})


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

				{!this.state.EditIsAtive && <div>
					<button onClick={(e) => { this.delete(e, this.props.project) }}>Remove</button>
					<button onClick={(e) => { this.ativeEdit(e) }}>Edit</button>
				</div>}


				{!this.state.EditIsAtive && <div><h4>  {this.props.project.name}</h4></div>}
				{(this.state.collapsed) ? null :
					(<div>
						{!this.state.EditIsAtive &&
							<div>
								<strong>Description: </strong><br />
								<p>{this.props.project.name}</p>
								<p>{this.props.project.description}</p>
							</div>}

						{this.state.EditIsAtive &&
							<div>
								<br />
								<button onClick={(e) => { this.exitEdit(e) }}>Exit Edition</button>
								<input type="text" value={this.state.newName} onChange={this.handleChangeNewName} />
								<textarea value={this.state.newDescription} onChange={this.handleChangeNewDescription} />
								<button onClick={(e) => { this.update(e, this.props.project) }}>Update description</button>

							</div>}


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

export default KanbanCard;