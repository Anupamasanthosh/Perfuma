
import {Outlet,Navigate} from 'react-router-dom'
import { useSelector } from "react-redux";

export default function PrivateRoute()
{
    const Admin=useSelector((state)=>state.Auth.Admin)
    return Admin ? <Outlet />:<Navigate to='/'/>
}