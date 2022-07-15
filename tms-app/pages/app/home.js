import React from 'react'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';


const isLoggedIn = async () => {    
    const router = useRouter()
  const res = await fetch(`http://localhost:3000/api/authentication/authed`)
    const user = await res.json()
    if ((user == 403) || (user == 401)) {router.push('/Sign/Login')}
  }

export default function home() {
    const router = useRouter()
    isLoggedIn()

    const handleLogout = async (event) => {
        const res = await fetch('http://localhost:3000/api/authentication/logout')
        const resp = await res.json()
        router.push('/Sign/Login')
    }
  return (
    <div>
        <div>home</div>
        <Button color='success' onClick={handleLogout}>
            <b style={{fontSize: "1.7vh"}}>   Logout</b>
        </Button>
    </div>
  )
}
