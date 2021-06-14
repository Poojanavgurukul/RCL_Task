import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useContext, useState } from "react";
import { PostContext } from '../../contexts/postContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Postform = () => {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [username, setUserName] = useState('');

  const {
    history,
    users,
    classes,
    isPending,
    setIsPending
  } = useContext(PostContext);

  const handleSubmit =()=>{
    const post = {title, body, username};
    setIsPending(true);
    //https://jsonplaceholder.typicode.com/posts (instead of local server api use this api also)
    fetch("http://localhost:8000/posts",{
      method:'POST',
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(post)
    }).then(()=>{
      setIsPending(false);
      history.push('/')
    }).catch((err)=>{
      console.log(err.message);
    })
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return ( 
    <div>
      <h2>Adding a Post</h2>
      <form  onSubmit={handleSubmit} >
        <div className={classes.formBox}>
        <label>Title:</label>
        <input 
          type="text"
          required
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className={classes.space}
        />
        <label>Body:</label>
        <input 
         type="text"
         required
         value={body}
         onChange={(e)=>setBody(e.target.value)}
         className={classes.space}
        />
        <select value={username} onChange={(e)=>setUserName(e.target.value)} className={classes.space}>
          <option>Select</option>
          {
            users.map( user =>(
              <option>{user.username}</option>
            ) )
          }
        </select>
        </div>
        {!isPending ? <button className={classes.addBtn} onClick={handleClick}>Add Post</button>:<button disabled className={classes.addBtn}>Adding Post...</button>}
      </form>
      <div className={classes.root}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Post Added SucessFully!
            </Alert>
          </Snackbar>
      </div>
    </div>
   );
}
 
export default Postform;