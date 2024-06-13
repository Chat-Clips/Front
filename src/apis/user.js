import api from "./api";

export const getById=async(userId)=>{
    try{
        const res=api.get(process.env.REACT_APP_API_BASE_URL+'/user/'+userId)
        console.log(res)
        return res;
    }
    catch(err){
        console.log(err)
    }
}

export const getByname=async(userName)=>{
    try{
        const res=api.get(process.env.REACT_APP_API_BASE_URL+'/user/'+userName)
        console.log(res)
        return res;
    }
    catch(err){
        console.log(err)
    }
}