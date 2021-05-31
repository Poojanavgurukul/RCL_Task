import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles(()=>({
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
  const history = useHistory();

  const handleSubmit =(e)=>{
    e.preventDefault()
    const post = {title, body, user};
    setIsPending(true);
    fetch("https://jsonplaceholder.typicode.com/posts",{
      method:'POST',
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(console.log(post))
    }).then(()=>{
      console.log("new blog added");
      setIsPending(false);
      history.push('/')
    })
  }

  return ( 
    <div>
      <h2>Adding a Post</h2>
      <form className={classes.formBox} onSubmit={handleSubmit}>
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
        {!isPending ? <button className={classes.addBtn}>Add Blog</button>:<button disabled className={classes.addBtn}>Adding Blog...</button>}
      </form>
    </div>
   );
}
 
export default Postform;