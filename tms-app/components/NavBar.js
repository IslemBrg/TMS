import React from 'react'
import Button from '@mui/material/Button';
import { borderRadius } from '@mui/system';

export default function NavBar() {
  return (
    <div className='login'>
        <div  style={{borderBottom:"1px solid green",borderRadius:"12px",width:"10vh"}}>
            <Button color='success' href='../Sign/Login/'>
                <b style={{fontSize: "1.7vh"}}>   Login</b>
            </Button>
        </div>
    </div>
  )
}
