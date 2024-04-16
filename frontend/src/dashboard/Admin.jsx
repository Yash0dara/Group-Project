import React, { useEffect,useState } from 'react'
import { Toaster } from 'react-hot-toast';
// import { location } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import axios from 'axios';





 function Admin(){

    const navigate = useNavigate()

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [editId,seteditId] = useState(-1) 
    const [uusername,usetUsername] = useState('')
    const [uemail,usetEmail] = useState('')
    const [ufirstName,usetfirstName] = useState('')
    const [uRole,usetRole] = useState('')

    const[formDataEdit,setFormDataEdit]=useState({
        username:""||uusername,
        email:""||uemail,
    })

    const [users,setUsers] = useState([])
    useEffect(()=>{
         axios.get(`http://localhost:8070/api/getUsers`)
        .then(users => setUsers(users.data))
        .catch(err => console.log(err))
    },[])

    const handleEdit=(username)=>{
        axios.get(`http://localhost:8070/api/user/${username}`)
        .then(res => {
            console.log(res.data)
            usetUsername(res.data.username)
            usetEmail(res.data.email)
            usetfirstName(res.data.firstName)
            usetRole(res.data.role)
        })
        .catch(er => console.log(er))
        seteditId(username)
    }

    const handleUpdate=()=>{
        axios.put(`http://localhost:8070/api/update`, {username:uusername,email: uemail,firstName:ufirstName,role:uRole})
        .then(res => {
            console.log(res.data);
            
            // navigate('/admin')  
            window.location.reload()
            seteditId(-1);
        }).catch(err => console.log(err));
    }

    const handleDelete=async(id)=>{

        const data =await axios.delete(`http://localhost:8070/api/delete/${id}`)
        alert(data.data.message)
        window.location.reload()
    }

    return(


        <div className="w-screen h-screen flex justify-center items-center  ">

            
            

            <table  className="bg-black border-b-2 border-gray-200  rounded-lg ">
                <thead>
                    <tr>
                        <th className="text-white p-3 text-sm font-semibold tracking-wide text-left">Id</th>
                        <th className="text-white p-3 text-sm font-semibold tracking-wide text-left">Username</th>
                        <th className="text-white p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                        <th className="text-white p-3 text-sm font-semibold tracking-wide text-left">First Name</th>
                        <th className="text-white p-3 text-sm font-semibold tracking-wide text-left">Role</th>
                        <th className="text-white p-3 text-sm font-semibold tracking-wide text-left">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>(
                            user.username===editId?
                            <tr  key={user._id}>
                                <td className="text-white p-3 text-sm font-bold">{user._id}</td>
                                <td className="text-white flex justify-center items-center p-3 text-sm">{user.username}</td>
                                <td className="text-black p-3 text-sm"><input type="text" value={uemail} onChange={e => usetEmail(e.target.value)}/></td>
                                <td className="text-black p-3 text-sm"><input type="text" value={ufirstName} onChange={e => usetfirstName(e.target.value)}/></td>
                                <td className="text-black p-3 text-sm"><input type="text" value={uRole} onChange={e => usetRole(e.target.value)}/></td>
                                <td><button className="bg-blue-600 text-white px-2 py-1 rounded-lg" onClick={handleUpdate}>Update</button></td>
                            </tr>
                            
                            :  
                            <tr>
                                <td className="text-white p-3 text-sm font-bold">{user._id}</td>
                                <td className="text-white flex justify-center items-center p-3 text-sm">{user.username}</td>
                                <td className="text-white p-3 text-sm">{user.email}</td>
                                <td className="text-white p-3 text-sm">{user.firstName}</td>
                                <td className="text-white p-3 text-sm">{user.role}</td>
                                <td className='space-x-6 lg:space-x-3'>
                                <button className="bg-green-600 text-white px-2 py-1  rounded-lg"  onClick={()=>handleEdit(user.username)}>Edit</button>
                                
                                <button  className="bg-red-600 text-white px-2 py-1 rounded-lg" onClick={()=>handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
    
}
export default Admin;
