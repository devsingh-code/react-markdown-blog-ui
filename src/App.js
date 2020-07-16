import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter as Router, Route, Switch,withRouter} from 'react-router-dom';
import { history } from "./helpers";
import PostList from './containers/PostList'
import PostDetail from './containers/PostDetail'
import Layout from './containers/Layout'
import PostCreate from './containers/PostCreate'
import PostUpdate from './containers/PostUpdate'
import PostDelete from './containers/PostDelete'
import Login from './containers/Login';
import Signup from "./containers/Signup"
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
   <Router history={history}>
    <Layout>
        <Switch>
          <Route exact path="/" component={withRouter(PostList)}/>
          <PrivateRoute path="/create" component={withRouter(PostCreate)}/>
          <Route exact path="/posts/:postSlug" component={withRouter(PostDetail)}/>
          <PrivateRoute path="/posts/:postSlug/update" component={withRouter(PostUpdate)}/>
          <Route path="/posts/:postSlug/delete" component={withRouter(PostDelete)}/>
          <Route path='/login' component={withRouter(Login)} />
          <Route path='/signup' component={withRouter(Signup)} />
        </Switch>
      </Layout>
   </Router>
  );
}

export default App;
