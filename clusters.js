
//clusters code
const cluster=require("node:cluster")
const express=require("express")

if(cluster.isPrimary){
    console.log(`server ${process.pid} started`);
    for(let i=0;i<4;i++){
        cluster.fork()
    }
}else{
    const app=express()
    app.get("/",(req,res)=>{
        return res.send(`Hello inayath from ${process.pid}`)
    })
    app.listen(3001,()=>{
        console.log(`worker ${process.pid}started...`)
    })
}