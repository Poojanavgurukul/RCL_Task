import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useFetch from '../../CustomHooks/useFetch';

import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../contexts/postContext';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const EditPost = ({postId}) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [username, setUserName] = useState('');

    const{
        users,
        history,
        classes,
        isPending,
        setIsPending
    }   = useContext(PostContext);
    const {data:post} = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);//https://jsonplaceholder.typicode.com

    const handleClick = () => {
        setOpen(true);
      };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };
    console.log(post)
    const handleUpdate = (e) => {
        e.preventDefault();
        const post = {title, body, username};
        setIsPending(true);
        fetch(`https://jsonplaceholder.typicode.com/${postId}`,{//https://jsonplaceholder.typicode.com
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
                    users.map( user =>(
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