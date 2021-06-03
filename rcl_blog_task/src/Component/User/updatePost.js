import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useFetch from '../../CustomHooks/useFetch';

import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme)=>({
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
      float:"right",
      transition:"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    },
  }));
const EditPost = ({allUsersData,postId}) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [username, setUserName] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const {data:post} = useFetch(`http://localhost:8000/posts/${postId}`);//https://jsonplaceholder.typicode.com

    const handleClick = () => {
        setOpen(true);
      };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const post = {title, body, username};
        setIsPending(true);
        fetch(`http://localhost:8000/posts/${postId}`,{//https://jsonplaceholder.typicode.com
            method:"PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(post)
        })
        .then(()=>{
            setIsPending(false);
            history.push("/");
        });
    }
    
    useEffect(()=>{
        if(post){
            setTitle(post.title);
            setBody(post.body);
            setUserName(post.username);
        }
    },[post])

    return ( 
        <div>
            <h2>Updating the post</h2>
            <form onSubmit={handleUpdate}>
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
                {
                    allUsersData.map( user =>(
                    <option>{user.username}</option>
                    ) )
                }
            </select> 
            </div>
            {!isPending ? <button variant="contained" color="primary" className={classes.addBtn} onClick={handleClick}>Update Post</button>:<button disabled variant="contained" color="primary" className={classes.addBtn}>updating Post .....</button>}
            </form>
            <div className={classes.root}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                    Post Updated SucessFully!
                    </Alert>
                </Snackbar>
            </div>
        </div>
     );
}
 
export default EditPost;