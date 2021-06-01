import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import PostForm from '../User/addPostForm';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import { useHistory } from "react-router";


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
    display:"flex",
    justifyContent:"center",
    flexWrap:"wrap",
    padding:"1rem",
    backgroundColor:"white",
    width:"30vw",
    height:"50vh",
    position:"absolute",
    right:"25%",
    left:"35%",
    top:"25%"
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
}));

export default function BasicTable({allPosts,allUsers}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [allData, setAllData]= useState([]);
  const history = useHistory();

  const  getAllDatas = () =>{
    const mergeData = (post, user) =>
            post.map(element => ({
                ...user.find((item) => (item.id === element.userId)),
                ...element
            }));
            setAllData(mergeData(allPosts, allUsers))
  } 
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/posts/${id}`,{
      method:'DELETE',
    })
    .then(()=>{
      history.push('/');
    })
    .catch((err)=>{
      console.log(err.message);
    })
  }

  useEffect(()=>{
    getAllDatas()
  },[])
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonAdd}
        startIcon={<Icon>add</Icon>}
        onClick={handleOpen}
      >
        Add Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalBox}>
        <PostForm  allUsersData={allUsers}/>
        <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose} className={classes.closeBtn}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
        </div>
      </Modal>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Userame</TableCell>
              <TableCell align="center">Post Id</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Body</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData.map((post,index) => (
              <TableRow key={index}>
                <TableCell align="center">{post.username} </TableCell>
                <TableCell align="center">{post.id}</TableCell>
                <TableCell align="center">{post.title}</TableCell>
                <TableCell align="center">{post.body}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={()=>handleDelete(post.id)}
                  >
                      Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
