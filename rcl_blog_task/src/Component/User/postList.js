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
import UpDate from '../User/updatePost';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
    padding:"1rem",
    backgroundColor:"white",
    width:"30vw",
    height:"60vh",
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
  cancelBtn:{
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

export default function BasicTable({allPosts,allUsers}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [allData, setAllData]= useState([]);
  const [postId, setPostId]= useState(null);

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
  const handleOpened = (id) => {
    setOpened(true);
    setPostId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClosed = () => {
    setOpened(false);
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
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData.map((post,index) => (
              <TableRow key={index}>
                <TableCell align="center">{post.username}</TableCell>
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
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    onClick={()=>handleOpened(post.id)}
                  >
                      Edit
                  </Button>
                  <Modal
                  open={opened}
                  onClose={handleClosed}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  >
                  <div className={classes.modalBox}>
                  <UpDate  allUsersData={allUsers} postId={postId}/>
                  <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleClosed} className={classes.closeBtn}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                      <button variant="contained" color="primary" onClick={handleClosed} className={classes.cancelBtn}>
                        Cancel
                      </button>
                  </div>
                  </Modal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
