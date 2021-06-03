import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react"


const SingleUserPost = ({allPost,id,username}) => {
    const [users, setUsers] = useState([])

    const dataFind = () => {
       const items = allPost.filter(item => item.userId === id)
       setUsers(items)
    }
    const columns = [
        {
         name: "id",
         label: "Post id",
         options: {
          filter: true,
          sort: true,
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
        }
       ];

    const options = {
        filterType: 'checkbox',
    };
    useEffect(() =>{
        dataFind()   
    }, [allPost])
    
    return (       
        <div>
            <Typography variant="h5" component="h5" gutterBottom align="center">
            {username}
            </Typography>
            <hr></hr>
            <MUIDataTable
                title={"Single User Post"}
                data={users}
                columns={columns}
                options={options}
                />
        </div>      
     );
}
export default SingleUserPost;