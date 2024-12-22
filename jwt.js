const express=require("express")
const jwt=require("jsonwebtoken")
const env=require("dotenv")

const app=express()
app.use(express.json())
env.config()

const Secretkey=process.env.secretkey;
const users=[
    {
        id:1,
        name:"inayath",
        password:"akki",
        age:20,
        admin:true
    },
    {
        id:2,
        name:"akhil",
        password:"innu",
        age:21,
        admin:false
    }

]

//creating jwt token
app.post("/user",(req,res)=>{
    const {name,password}=req.body;
    const user=users.find((person)=>{
        return person.name=== name && person.password===password
    })

    if(user){
        const token=jwt.sign({
            id:user.id,
            name:user.name
        },Secretkey)
        res.json({
            id:user.id,
            name:user.name,
            token
        })
    }
    else{
        console.log(error.message)
    }
})


//verifying the jwt token for authetication
app.post("/verify",checktoken,(req,res)=>{
    jwt.verify(req.token,Secretkey,(err,data)=>{
        if(err){
            res.status(500).json({message:"invalid token"})
        }
        else{
            res.json({
                message:"profile matched",
                data
            })
        }
    })
})
//middleware to check the token
function checktoken(req,res,next){
    const bearer=req.headers["authorization"]
    if(typeof bearer!==undefined){
        const auth=bearer.split(" ")
        const token=auth[1]
        req.token=token
        next()

    }else{
        res.status(500).json({message:"token not available"})
    }
}


app.listen(3000,()=>{
    console.log("Server started...")
})