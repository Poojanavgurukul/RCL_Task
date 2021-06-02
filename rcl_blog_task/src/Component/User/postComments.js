import useFetch from "../../CustomHooks/useFetch";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(()=>({
    commenter:{
        color:"#000",
        fontWeight:"bold",
        letterSpacing:"0.05rem"
    },
    fonstStyle:{
        letterSpacing:"0.05rem"
    }
}))
const PostComments = ({id}) => {
    const classes = useStyles();
    const {data:comments} = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    return ( 
        <div>
            {
            comments.map((comment,index)=>(
                <div key={index}>
                   <span className={classes.commenter}>Name : </span>
                   <span className={classes.fonstStyle}>{comment.name}</span>
                   <p>
                        <span className={classes.commenter}>Comment : </span>
                        <span className={classes.fonstStyle}>{comment.body}</span>
                   </p>
                   <hr></hr>
               </div>
            ))
            }
        </div>
     );
}
 
export default PostComments;