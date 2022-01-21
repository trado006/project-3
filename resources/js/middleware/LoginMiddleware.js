import { Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';

export default function ( position ){
    if(position==''){
        return <Login />
    }else if(position=='student'){
        return <Navigate to='/' />
    }else if(position=='teacher'){
        return <Navigate to='/teacher/my-courses' />
    }else if(position=='admin'){
        return <Navigate to='/admin/courses' />
    }
}