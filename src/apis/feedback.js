import { getByTitle } from "@testing-library/react";
import api from "./api";

export const addPost=(props)=>{
    let data={
        title : props.title,
        text : props.text,
        userId : props.id
    }

    try{
        console.log(data)
        const res=api.post('/feedback/post',data)
        console.log(res)
        return res;
    }
    catch(err){
        console.log(err)
    }
}

export const updateFeedback=(props)=>{
    let data={
        id : props.postId,
        title : props.title,
        text : props.text
    }

    try{
        const res=api.post('/feedback/update',data)
        console.log(res)
        return res;
    }
    catch(err){
        console.log(err)
    }
}

export const deletePost=(postId)=>{
    try{
        const res=api.delete('/feedback/delete/', postId)
        console.log(res)
        return res;
    }
    catch(err){
        console.log(err)
    }
}

export const getallPost=()=>{
    try{
        const res=api.get('/feedback/all')
        //console.log(res)
        return res;
    }
    catch(err){
        console.log(err)
    }
}