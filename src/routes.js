import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Board from './component/board';
import Kanban from './component/kanban';


export class RouterComponent extends React.Component {  


 
    render() {  

      const sidenavStyle = {
        'height': '100%',
        'width': '130px',
        'position':'fixed',
        'z-index': '1',
        'top': '0',
        'left': '0',
        'background-color':'white',
        'overflow-x': 'hidden',
        'padding-top': '20px',
        'color':'white',
        'boxShadow': '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 1px 8px rgba(0, 0, 0, 0.08)'
      }

      const viewStyle = {
        'margin-left': '130px',
        'padding': '0px 10px',
        'height': '100%'
      }

        return (  
            <Router>
            <div style={viewStyle} >
              <div style={sidenavStyle}>
                <li>
                  <Link to="/Home">Board</Link>
                </li>
                <li>
                  <Link to="/kanban">Kanban</Link>
                </li>
              </div>
      
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

