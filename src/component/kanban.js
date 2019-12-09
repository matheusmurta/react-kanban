import React from "react";
import KanbanBoard from './kanban-board';

export class Kanban extends React.Component {
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

  export default Kanban;