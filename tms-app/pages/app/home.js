import React from 'react'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const isLoggedIn = async () => {    
    const router = useRouter()
  const res = await fetch(`http://localhost:3000/api/authentication/authed`)
    const user = await res.json()
    return(user)
  }

export default function home() {
  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [Service, setService] = useState("")

    const router = useRouter()

    isLoggedIn().then(data => {
      setFirstName(data[0].FirstName)
      setLastName(data[0].LastName)
      setService(data[0].service)
    })

    const handleLogout = async (event) => {
        const res = await fetch('http://localhost:3000/api/authentication/logout')
        const resp = await res.json()
        router.push('/Sign/Login')
    }
  return (
    <div>
        <Button color='success' onClick={handleLogout}>
            <b style={{fontSize: "1.7vh"}}>   Logout</b>
        </Button>
        <h1>bienvenu</h1><br/>
        <h2>M./Mme   {FirstName} {LastName}</h2>
        <h2>Service : {Service}</h2>
    </div>
  )
}
