import React, { useEffect, useState } from 'react'

function Curd() {

    let [user, setUser] = useState({});
    let [userData, setUserData] = useState([]);
    let [index, setIndex] = useState(-1);

    useEffect(() => {
        let oldData = JSON.parse(sessionStorage.getItem("users")) || [];
        setUserData(oldData)
    }, [])

    let handelChange = (e) => {
        let { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        let data
        if (index != -1) {
            data = [...userData]
            data[index] = user;
        } else {
            data = [...userData, user];
        }
        setUserData(data);
        sessionStorage.setItem("users", JSON.stringify(data))
        setUser({})
        setIndex(-1)
    }

    let handleDelete = (idx) => {
        let data = [...userData];
        data.splice(idx, 1);
        setUserData(data)
        sessionStorage.setItem("users", JSON.stringify(data))
    }

    let handleEdit = (idx) => {
        setIndex(idx)
        setUser(userData[idx])
    }
    return (
        <>
            <div className="container">
                <form className="form" method='post' onSubmit={ handleSubmit }>
                    <h2>Hey bub, ya gotta register!</h2>
                    <div className="form-control">
                        <label htmlFor="username">Name</label>
                        <input type="text" name="name" onChange={ handelChange } value={ user.name || "" } placeholder="Enter name" />
                        <small>Error message</small>
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" onChange={ handelChange } value={ user.email || "" } placeholder="Enter email" />
                        <small>Error message</small>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Phone</label>
                        <input type="text" name="phone" onChange={ handelChange } value={ user.phone || "" } placeholder="Enter Phone" />
                        <small>Error message</small>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password2">Gender</label>
                        <input type="radio" name='gender' onChange={ handelChange } checked={ user && user.gender == "male" } value='male' />Male
                        <input type="radio" name='gender' onChange={ handelChange } checked={ user && user.gender == "female" } value='female' />Female
                        <small>Error message</small>
                    </div>
                    <button type="submit">{ !index ? "Update" : "Submit" }</button>
                </form>
            </div>
            <section>
                <h1>Fixed Table header</h1>
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                            {
                                userData.map((val, idx) => (
                                    <tr>
                                        <td>{ val.name }</td>
                                        <td>{ val.email }</td>
                                        <td>{ val.phone }</td>
                                        <td>{ val.gender }</td>
                                        <td>
                                            <button className='delete' onClick={ () => handleDelete(idx) }>Delete</button>
                                            <button className='edit' onClick={ () => handleEdit(idx) }>Edit</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default Curd
