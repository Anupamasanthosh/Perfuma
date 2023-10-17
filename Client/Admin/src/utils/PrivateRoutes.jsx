
import {Outlet,Navigate} from 'react-router-dom'
import { useSelector } from "react-redux";



export default function PrivateRoute()
{
    const Admin=useSelector((state)=>state.Auth.Admin)
    console.log(Admin,'from private route')
    return Admin ? <Outlet />:<Navigate to='/'/>
}