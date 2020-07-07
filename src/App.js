import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter as Router, Route, Switch,withRouter} from 'react-router-dom';
import { createBrowserHistory } from "history";
import PostList from './containers/PostList'
import PostDetail from './containers/PostDetail'
import Layout from './containers/Layout'
import PostCreate from './containers/PostCreate'
import PostUpdate from './containers/PostUpdate'
import PostDelete from './containers/PostDelete'


const history = createBrowserHistory();

function App() {
  return (
   <Router history={history}>
    <Layout>
        <Switch>
          <Route exact path="/" component={withRouter(PostList)}/>
          <Route path="/create" component={withRouter(PostCreate)}/>
          <Route path="/post/:postSlug" component={withRouter(PostDetail)}/>
          <Route path="/post/:postSlug/update" component={withRouter(PostUpdate)}/>
          <Route path="/post/:postSlug/delete" component={withRouter(PostDelete)}/>
        </Switch>
      </Layout>
   </Router>
  );
}

export default App;
