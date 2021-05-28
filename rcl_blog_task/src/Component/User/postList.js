import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({allPosts,allUsers}) {
  const classes = useStyles();
  const [allData, setAllData]= useState([]);
  const  getAllDatas = () =>{
    const mergeData = (post, user) =>
            post.map(element => ({
                ...user.find((item) => (item.id === element.userId)),
                ...element
            }));
            setAllData(mergeData(allPosts, allUsers))
  } 
  useEffect(()=>{
    getAllDatas()
  },[])
  console.log(allData)
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Userame</TableCell>
            <TableCell align="center">Post Id</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allData.map((post,index) => (
            <TableRow key={index}>
              <TableCell align="center">{post.username} </TableCell>
              <TableCell align="center">{post.id}</TableCell>
              <TableCell align="center">{post.title}</TableCell>
              <TableCell align="center">{post.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
