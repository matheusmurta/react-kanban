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
        return (  
            <Router>
            <div>
              <ul>
                <li>
                  <Link to="/">Home
                  <Board/>
                  </Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/topics">Topics</Link>
                </li>
              </ul>
      
              <Switch>
                <Route path="/about">
                  <Kanban />
                </Route>
              </Switch>
            </div>
          </Router>
        );  
    }  
} 

export default RouterComponent;

