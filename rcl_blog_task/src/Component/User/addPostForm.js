import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


import { useState } from "react";
import { useHistory } from "react-router";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  formBox:{
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"space-around",
    flexDirection:"column"
  },
  space:{
    margin:"0.5rem 0"
  },
  addBtn:{
    backgroundColor:"#3f51b5",
    outline:"0",
    cursor:"pointer",
    textTransform:"uppercase",
    borderRadius:"4px",
    color:"#fff",
    padding:"6px 16px",
    transition:"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
  }
}));
const Postform = ({allUsersData}) => {

  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [user, setUser] = useState('');
  const [isPending, setIsPending] = useState('');
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const handleSubmit =(e)=>{
    e.preventDefault()
    const post = {title, body, user};
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
      <form className={classes.formBox} onSubmit={handleSubmit} >
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
        <select value={user} onChange={(e)=>setUser(e.target.value)} className={classes.space}>
          {
            allUsersData.map( user =>(
              <option>{user.username}</option>
            ) )
          }
        </select>
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