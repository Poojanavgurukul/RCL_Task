import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react"

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    padding: "10px",
  },
  hlo:{
    border: '2px solid #000',
  }
});

const SingleUserPost = ({allPost,id,username}) => {
    const classes = useStyles();
    const [users, setUsers] = useState([])

    const dataFind = (post,id) => {
       const items = post.filter(item => item.userId === id)
       setUsers(items)
    }
    useEffect(() =>{
        dataFind(allPost,id )   
    }, [allPost])
    
    return (       
        <div>
            <Typography variant="h5" component="h5" gutterBottom align="center">
            {username}
            </Typography>
            <hr></hr>
            <table className={classes.table}>
                <thead>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Body</th>
                </thead>
                <tbody >
                {users.map((post,index) => (
                    <tr key={index} className={classes.hlo}>
                        <td >{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>      
    // <TableContainer component={Paper}>
    //   <Table className={classes.table} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell align="center">Id</TableCell>
    //         <TableCell align="center">Title</TableCell>
    //         <TableCell align="center">Body</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
          
    //         <TableRow >
    //           <TableCell align="center" className={classes.space}>{post.id}</TableCell>
    //           <TableCell align="center">{post.title}</TableCell>
    //           <TableCell align="center">{post.body}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
     );
}
export default SingleUserPost;