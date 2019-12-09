import React from "react";
import axios from 'axios';

export class KanbanCard extends React.Component {
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

  export default KanbanCard;