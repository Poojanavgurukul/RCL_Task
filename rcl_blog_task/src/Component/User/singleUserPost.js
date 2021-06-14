import MUIDataTable from "mui-datatables";
import { useContext, useEffect, useState } from "react"
import { PostContext } from "../../contexts/postContext";


const SingleUserPost = ({id,username}) => {
    const [users, setUsers] = useState([])
    const {posts} = useContext(PostContext);
    const dataFind = () => {
       const items = posts.filter(item => item.userId === id)
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
    }, [posts])
    
    return (       
        <div>
            <MUIDataTable
                title={username}
                data={users}
                columns={columns}
                options={options}
                />
        </div>      
     );
}
export default SingleUserPost;