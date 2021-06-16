import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import PostForm from '../User/addPostForm';
import UpDate from '../User/updatePost';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import MUIDataTable from "mui-datatables";
import PostComments from './postComments';
import IconButton from '@material-ui/core/IconButton';

import { useContext, useEffect, useState } from "react";
import { PostContext } from '../../contexts/postContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function BasicTable() {
  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackbarOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [allData, setAllData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const {classes,users,posts,history,id,setId} = useContext(PostContext);

    
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpened = (e,id) => {
    setOpened(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClosed = () => {
    setOpened(false);
  };
  
  const handleSnackBarClosed = (event, reason) =>{
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  }
  const rowClick = (postId) =>{
    setModalOpen(true)
    setId(postId)
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const handleDelete = (e,id) => {
    setSnackbarOpen(true);
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

  const columns = [
    {
     name: "username",
     label: "Username",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "id",
     label: "ID",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "title",
     label: "Title",
     options: {
      filter: true,
      sort: false,
     }
    },
     {
      name: "body",
      label: "Body",
      options: {
       filter: true,
       sort: false,
      }
    },
    {
      name: "Delete",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button onClick={(e) => {handleDelete(e.stopPropagation(),tableMeta.rowData[1])}}>
              Delete
            </button>
          );
        }
      }
    },
    {
      name: "Edit",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button onClick={(e) => {handleOpened(e.stopPropagation(),tableMeta.rowData[1])}}>
              Edit
            </button>
          );
        }
      }
    },
   ];

   const handleRowClick = (rowData) =>{
    rowClick(rowData[1])
    console.log(rowData[1])
  }
   const options ={
    filterType: 'checkbox',
    onRowClick: handleRowClick,
  }

  useEffect(()=>{
    const  getAllDatas = () =>{
      const mergeData = (post, user) =>
              post.map(element => ({
                  ...user.find((item) => (item.id === element.userId)),
                  ...element
              }));
              setAllData(mergeData(posts, users))
    }   
    getAllDatas()
  },[users,posts])

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
      <MUIDataTable
        title={"User Details"}
        data={allData}
        columns={columns}
        options={options}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalBox}>
          <PostForm />
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
      <Modal
          open={modalOpen}
          onClose={handleCloseModal}
        >
        <div className={classes.modalBox}>
          <PostComments id={id} />
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleCloseModal} className={classes.closeBtn}
           >
          <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
        </Modal>
        <Modal
          open={opened}
          onClose={handleClosed}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          >
          <div className={classes.modalBox}>
          <UpDate postId={id}/>
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
      <div className={classes.root}>
          <Snackbar open={snackBarOpen} autoHideDuration={8000} onClose={handleSnackBarClosed}>
            <Alert onClose={handleSnackBarClosed} severity="success">
              Post deleted SucessFully!
            </Alert>
          </Snackbar>
      </div>
    </div>
  );
}
