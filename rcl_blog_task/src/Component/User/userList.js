import SingleUserPost from './singleUserPost';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MUIDataTable from "mui-datatables";

import {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  modalBox:{
    // padding:"1rem",
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
});

export default function BasicTable({allUsers,allPosts}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [usertId, setUserId] = useState(null);
  const [username, setUsername] = useState('');

  const handleOpen = (id,user) => {
    setOpen(true);
    setUserId(id);
    setUsername(user);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
     name: "id",
     label: "id",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "name",
     label: "Name",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "username",
     label: "Username",
     options: {
      filter: true,
      sort: false,
     }},
     {
      name: "email",
      label: "Email",
      options: {
       filter: true,
       sort: false,
      }},
      {
        name: "website",
        label: "Website",
        options: {
         filter: true,
         sort: false,
      }},
      {
        name: "company",
        label: "Company Name",
        options: {
         filter: true,
         sort: false,
        }
    }
   ];
   const handleRowClick = (rowData) =>{
    handleOpen(rowData[0],rowData[2])
  }
  const options ={
    filterType: 'checkbox',
    onRowClick: handleRowClick,
  }
  return (
    <div>
       <MUIDataTable
            title={"User Details"}
            data={allUsers}
            columns={columns}
            options={options}
          />
      <Modal
          open={open}
          onClose={handleClose}
        >
        <div className={classes.modalBox}>
          <SingleUserPost  allPost={allPosts} id={usertId} username={username} />
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
    </div>
  );
}
