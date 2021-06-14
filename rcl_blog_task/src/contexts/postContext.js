import useFetch from "../CustomHooks/useFetch";

import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

export const PostContext = createContext();
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    minWidth: 650,
  },
  buttonAdd: {
    margin: theme.spacing(1),
  },
  modalBox:{
    padding:"1rem",
    backgroundColor:"white",
    width:"50%",
    position:"relative",
    display: 'block',
    height: '77vh',
    overflow: 'auto',
    left: '25%',
    top: '15%'
  },
  closeBtn:{
    height:"5vh",
    position:"absolute",
    top:"0",
    right:"0"
  },
  button: {
    margin: theme.spacing(1),
  },
  cancelBtn:{
    backgroundColor:"#3f51b5",
    outline:"0",
    cursor:"pointer",
    textTransform:"uppercase",
    borderRadius:"4px",
    color:"#fff",
    padding:"6px 16px",
    transition:"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
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
    float:"right",
    transition:"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
  },
}));
const PostContextProvider = (props) => {
    const { data:posts} = useFetch('https://jsonplaceholder.typicode.com/posts');
    const  history = useHistory();
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [id, setId] = useState(null);
    const [isPending, setIsPending] = useState('');
    const url='https://jsonplaceholder.typicode.com/users';
    useEffect(()=>{
      fetch(url)
      .then((res)=>res.json())
      .then(data=>{
        const userData=data.map((user)=>{
          user.company=user.company.name
          return user;
        })
        setUsers(userData)
      })
    },[url])

    return ( 
        <PostContext.Provider value={
        {
            history,
            posts,
            users,
            classes,
            id,
            isPending,
            setId,
            setIsPending
        }}>
            {props.children}
        </PostContext.Provider>
     );
}
 
export default PostContextProvider;