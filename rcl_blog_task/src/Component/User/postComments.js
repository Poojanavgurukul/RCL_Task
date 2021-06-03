import MUIDataTable from "mui-datatables";
import useFetch from "../../CustomHooks/useFetch";


const PostComments = ({id}) => {
    const {data:comments} = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    const columns = [
        {
         name: "name",
         label: "Name",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "body",
         label: "Comment",
         options: {
          filter: true,
          sort: false,
         }
        },
       ];

       const options = {
        filterType: 'checkbox',
    };

    return (
        <MUIDataTable
            title={"Single User Post"}
            data={comments}
            columns={columns}
            options={options}
        /> 
     );
}
 
export default PostComments;