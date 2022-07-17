const users = require("./../users.json")
const personnel = require("./../emp.json")
const fs = require("fs")

export default async (req, res) =>{
    if (req.method=="GET"){res.status(405).json('invalid request method!')}
    else{
    const login=JSON.parse(req.body)
    const mat=login.mat
    const pass=login.pass

    const userSearch=users.filter((item)=>(item.matricul==mat))
    if (userSearch.length > 0) {res.status(406).json(406)}
    else{
    const empSearch=personnel.filter((item)=>(item.matricul==mat))
    if (empSearch.length <= 0) {res.status(404).json(404)}
    else{
        const newUser = {
            "matricul": mat,
            "pass": pass
        }
        fs.readFile("pages/api/users.json", function (err, data) {
            var json = JSON.parse(data)
            json.push(newUser)
        
            fs.writeFile("pages/api/users.json", JSON.stringify(json,null,4),(err)=>{
                if (err) throw err;
                console.log("saved.")
            })
        })
        res.status(200).json(200)
    }
    }
    }

}