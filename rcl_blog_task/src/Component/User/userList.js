import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SingleUserPost from './singleUserPost';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">UserName</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Website</TableCell>
            <TableCell align="center">Company Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user,index) => (
            <TableRow key={index}  onClick={()=>handleOpen(user.id,user.username)}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{user.username}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.website}</TableCell>
              <TableCell align="center">{user.company.name}</TableCell>
            </TableRow>
          ))}
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}
