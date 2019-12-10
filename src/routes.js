import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Board from './component/board';
import Kanban from './component/kanban';

export class RouterComponent extends React.Component {


  render() {

    const viewStyle = {
      'padding': '0px 10px',
      'height': '100%',
      'background-color': 'rgb(228, 241, 254)'
    }

    return (
      <Router>
        <div style={viewStyle} >
          <Switch>
            <Route path="/Home">
              <Board />
            </Route>
            <Route path="/kanban/:boardID">
              <Kanban />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default RouterComponent;

