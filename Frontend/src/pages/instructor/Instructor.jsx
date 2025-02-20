import React, { useState, useEffect } from "react";
import axios from "axios";
import "./instructor.css";

export const Instructor = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({
        id: null,
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
    });


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setEditingUser(user.id);
        setEditForm({ ...user });
    };

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/users/${editForm._id}`, editForm);
            console.log(response.data)
            if (response.status === 200) {
                setUsers(users.map((user) => (user.id === editForm.id ? editForm : user)));
                setEditingUser(null);
            } else {
                console.error("Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div>
            <div className="instructor-head">
                <p>Instructor Details - Edit & Add New Instructor</p>
            </div>
            <div className="instructor-box">
                {users.map((el, i) => (

                    <div key={i} className="instr-cart">
                        {editingUser === el.id ? (
                            console.log(el),
                            <form onSubmit={handleSubmit} className="edit-form">
                                <input type="text" name="name" value={editForm.name} onChange={handleChange} required />
                                <input type="email" name="email" value={editForm.email} onChange={handleChange} required />
                                <input type="text" name="phone" value={editForm.phone} onChange={handleChange} required />
                                <input type="text" name="role" value={editForm.role} onChange={handleChange} required />
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                <p><strong>Name:</strong> {el.name}</p>
                                <p><strong>Email:</strong> {el.email}</p>
                                <p><strong>Phone: </strong>{el.phone}</p>
                                <p><strong>Role:</strong> {el. role
                                }</p>
                                <button onClick={() => handleEditClick(el)}>Edit Details</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
