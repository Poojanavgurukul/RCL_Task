import Home from '../src/Component/Home/homePage';
import UserList from '../src/Component/User/userList';
import useFetch from '../src/CustomHooks/useFetch';
import PostList from '../src/Component/User/postList';
import EditPost from '../src/Component/User/updatePost';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useEffect, useState } from 'react';


function App() {
    const { data:posts, isPending, errorLog } = useFetch('https://jsonplaceholder.typicode.com/posts');//https://jsonplaceholder.typicode.com/posts or http://localhost:8000
    const [allUser, setAllUser] = useState([]);

    useEffect(()=>{
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((res)=>res.json())
      .then(data=>{
        console.log(data)
        const userData=data.map((user)=>{
          user.company=user.company.name
          return user;
        })
        setAllUser(userData)
      })
    })
    return (
    <Router>
      <div className="App">
      <Home />
      <div>
        <Switch>
          <Route exact path="/">
            <UserList allUsers={allUser} allPosts={posts} />
          </Route>
          <Route path="/posts">
            {errorLog && <div>{errorLog}</div>}
            {isPending && <div>loading.....</div>}
            {posts && <PostList allPosts={posts} allUsers={allUser} />}
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
