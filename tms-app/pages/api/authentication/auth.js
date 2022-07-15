import {personnel} from '../data.js'
import cookie from 'cookie'

require("dotenv").config();

const jwt = require('jsonwebtoken')

export default async (req, res) =>{
    if (req.method=="GET"){
        res.status(405).json('invalid request method!')

    }
    const login=JSON.parse(req.body)
    const mat=login.mat
    const pass=login.pass
    const result=personnel.filter((item)=>(item.matricul==mat) && (item.pass==pass))
    if (result.length >0) {
        const userToken = jwt.sign({mat}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'})
        res.setHeader('Set-Cookie', cookie.serialize('session_id',userToken,{
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600,
            path:'/'
        }))
        res.status(200).json(200)
    }else{
        res.status(401).json(401)
    }
}