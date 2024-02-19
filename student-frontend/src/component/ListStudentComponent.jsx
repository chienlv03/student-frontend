// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { deleteStudent, listStudent } from '../service/StudentService'
import { useNavigate } from 'react-router-dom'

const ListStudentComponent = () => {

    const [student, setStudent] = useState([])

    const navigator = useNavigate()

    useEffect(() => {
        getAllStudent();
    }, []);
    
    function getAllStudent() {
        listStudent().then((response) => {
            setStudent(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewStudent() {
        navigator('/add-student')
    }
    
    function updateStudent(id) {
        navigator(`/edit-student/${id}`)
    }

    function removeStudent(id) {
        console.log(id);

        deleteStudent(id).then(() => {
            console.log(id);
            getAllStudent();
        }).catch(error => {
            console.error(error);
        })
    }


    return (
        <div className='container'>
            <h2 className='text-center'>List Student</h2>
            <button className='btn btn-primary mb-2' onClick={addNewStudent}>Add Student</button>
            <table className='table table-striped table-hover table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map(student =>
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.date}</td>
                                <td>{student.address}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button className='btn btn-success' onClick={() => updateStudent(student.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeStudent(student.id)} style={{marginLeft: '10px'}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListStudentComponent