import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createStudent, getStudent, updateStudent } from '../service/StudentService'

const StudentComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [date, setDate] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')

    const { id } = useParams()

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        date: '',
        address: '',
        email: ''
    })

    const navigator = useNavigate()

    useEffect(() => {
        if (id) {
            getStudent(id).then(response => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setDate(response.data.date)
                setAddress(response.data.address)
                setEmail(response.data.email)
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdateStudent(e) {
        e.preventDefault()

        if (validateForm()) {
            const student = { firstName, lastName, date, address, email }
            console.log(student);

            if (id) {
                updateStudent(id, student).then(response => {
                    console.log(response.data);
                    navigator('/students')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createStudent(student).then(response => {
                    console.log(response.data);

                    navigator('/students')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm() {
        let valid = true;

        const errorCopy = { ...error }

        if (firstName.trim()) {
            errorCopy.firstName = '';
        } else {
            errorCopy.firstName = 'First name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorCopy.lastName = '';
        } else {
            errorCopy.lastName = 'Last name is required';
            valid = false;
        }

        if (date.trim()) {
            errorCopy.date = '';
        } else {
            errorCopy.date = 'Date name is required';
            valid = false;
        }

        if (address.trim()) {
            errorCopy.address = '';
        } else {
            errorCopy.address = 'Address name is required';
            valid = false;
        }

        if (email.trim()) {
            errorCopy.email = '';
        } else {
            errorCopy.email = 'Email name is required';
            valid = false;
        }

        setError(errorCopy)

        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Student</h2>
        } else {
            return <h2 className='text-center'>Add Student</h2>
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='card mt-5 col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            {/* Form First Name */}
                            <div className="form-group mb-2">
                                <label className='form-label'>First Name </label>
                                <input
                                    type="text"
                                    className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
                                    name='firstName'
                                    placeholder="Enter first name student"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    required
                                />
                                {error.firstName && <div className='invalid-feedback'>{error.firstName}</div>}
                            </div>
                            {/* Form Last Name */}
                            <div className="form-group mb-2">
                                <label className='form-label'>Last Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
                                    name='lastName'
                                    placeholder="Enter last name student"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    required
                                />
                                {error.lastName && <div className='invalid-feedback'>{error.lastName}</div>}
                            </div>
                            {/* Form Date */}
                            <div className="form-group mb-2">
                                <label className='form-label'>Date</label>
                                <input
                                    type="date pickers"
                                    className={`form-control ${error.date ? 'is-invalid' : ''}`}
                                    name='date'
                                    placeholder="Enter date student"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    required
                                />
                                {error.date && <div className='invalid-feedback'>{error.date}</div>}
                            </div>
                            {/* Form Address */}
                            <div className="form-group mb-2">
                                <label className='form-label'>Address</label>
                                <input
                                    type="text"
                                    className={`form-control ${error.address ? 'is-invalid' : ''}`}
                                    name='address'
                                    placeholder="Enter address student"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    required
                                />
                                {error.address && <div className='invalid-feedback'>{error.address}</div>}
                            </div>
                            {/* Form Email */}
                            <div className="form-group mb-2">
                                <label className='form-label'>Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${error.email ? 'is-invalid' : ''}`}
                                    name='email'
                                    placeholder="Enter email student"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                                {error.email && <div className='invalid-feedback'>{error.email}</div>}
                            </div>



                            <button className='btn btn-success' onClick={saveOrUpdateStudent}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentComponent