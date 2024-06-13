import api from "./api";

export const getById=async(userId)=>{
    try{
        const res=api.get('/user/id/'+userId)
        console.log(res)
        return res;
    }
    catch(err){
        console.log(err)
    }
}

export const getByname=async(userName)=>{
    try{
        const res=api.get('/user/'+userName)
        console.log(res)
        return res;
    }
    catch(err){
        console.log(err)
    }
}