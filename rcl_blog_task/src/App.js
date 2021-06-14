import Home from '../src/Component/Home/homePage';
import UserList from '../src/Component/User/userList';
import PostList from '../src/Component/User/postList';
import PostProvider from '../src/contexts/postContext';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
    return (
    <Router>
      <div className="App">
      <Home />
      <div>
        <PostProvider>
        <Switch>
          <Route exact path="/">
            <UserList  />
          </Route>
          <Route path="/posts">
            <PostList />
          </Route>
        </Switch>
        </PostProvider>
      </div>
    </div>
    </Router>
  );
}

export default App;
