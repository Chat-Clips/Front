import * as StompJs from "@stomp/stompjs"

export const connectStomp=(uid,rid)=>{
    const callback=function(message){
        if(message.body){
            let msg=JSON.parse(message.body);
            console.log(msg)
        }
    }

    try{
        const clientdata=new StompJs.Client({
            brokerURL: "ws://localhost:8080/ws",
            connectHeaders:{
                userId: uid,
            },
            debug: function(str){
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
        
        clientdata.onConnect=function(){
            if(rid!==null){
                clientdata.subscribe("/sub/chatroom/"+rid, callback);
            }
        };
        
        clientdata.onStompError=function(frame){
            console.log("Broker reported error: "+frame.headers['message']);
            console.log("Additional details: "+frame.body);
        }

        clientdata.activate()
        return clientdata;
    }
    catch(error){
        console.log(error);
    }
}

export const disconnectStomp=(client)=>{
    if(client===null){
        return;
    }
    client.deactivate();
    return;
}