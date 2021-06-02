import Home from '../src/Component/Home/homePage';
import UserList from '../src/Component/User/userList';
import useFetch from '../src/CustomHooks/useFetch';
import PostList from '../src/Component/User/postList';
import EditPost from '../src/Component/User/updatePost';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
    const { data:users, isloading, error } = useFetch('https://jsonplaceholder.typicode.com/users');
    const { data:posts, isPending, errorLog } = useFetch('http://localhost:8000/posts');//https://jsonplaceholder.typicode.com/posts
  return (
    <Router>
      <div className="App">
      <Home />
      <div>
        <Switch>
          <Route exact path="/">
          {error && <div>{error}</div>}
            {isloading && <div>loading.....</div>}
            {users && <UserList allUsers={users} allPosts={posts} />}
          </Route>
          <Route path="/posts">
            {errorLog && <div>{errorLog}</div>}
            {isPending && <div>loading.....</div>}
            {posts && <PostList allPosts={posts} allUsers={users} />}
          </Route>
          <Route path="/update/:id">
              <EditPost />
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
