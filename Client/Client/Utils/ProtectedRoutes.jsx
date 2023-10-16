import {Outlet,Navigate} from 'react-router-dom'
import { useSelector } from "react-redux";

export default function ProtectedRoute()
{
    const User=useSelector((state)=>state.Auth.User)
    return User ? <Outlet />:<Navigate to='/'/>
}