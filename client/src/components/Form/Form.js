import React,{useState,useEffect} from "react";
import { TextField,Button,Typography,Paper } from "@material-ui/core";
import FileBase from 'react-file-base64'
import { useDispatch } from "react-redux";
import { createPost,updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";

import useStyles from './styles'
const Form = ({ currentId,setCurrentId }) =>{
    const [PostData,setPostData] = useState({
        creator: '',
        title: '',
        message:'',
        tags:'',
        selectedFile:''
    })
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(post) setPostData(post)
    },[post])

    
    const handleSubmit = (e) =>{
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId,PostData));
        }
        else{
            dispatch(createPost(PostData));
        }
        clear()
    }

    const clear = () =>{
        setCurrentId(null);
        setPostData({ creator:'', title:'', message:'', tags:'', selectedFile:''});
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography varient="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth
                    value={PostData.creator}
                    onChange={(e)=> setPostData({...PostData,creator: e.target.value})} 
                />
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="title" 
                    fullWidth
                    value={PostData.title}
                    onChange={(e)=> setPostData({...PostData,title: e.target.value})} 
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="message" 
                    fullWidth
                    value={PostData.message}
                    onChange={(e)=> setPostData({...PostData,message: e.target.value})} 
                />
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="tags" 
                    fullWidth
                    value={PostData.tags}
                    onChange={(e)=> setPostData({...PostData,tags: e.target.value.split(',')})} 
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64})=> setPostData({...PostData,selectedFile: base64})}>
                    </FileBase>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    )
}

export default Form