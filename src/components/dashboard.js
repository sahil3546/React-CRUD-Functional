import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import UserService from '../services/user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    let [posts, setPostData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        UserService.getAll().then(response => response)
        .then(({ data: posts }) => {
            setPostData(posts);
        })
    };

    
    const handleDelete = (id) => {
        UserService.delete(id).then((res) => {
            if (res) {
                toast.error("Deleted Successfully !", {
                    position: toast.POSITION.TOP_RIGHT
                });
                fetchData();
            }
            else {
                toast.error("Error in Deleting !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        });
    }

    return (
        <div className="list row">
            <div className="container">
                <h2>Bordered Table</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Profession</th>
                            <th>About</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {posts.map((post, i) => (
                            <tr key={i}>
                                <td>{post.firstName} {post.lastName}</td>
                                <td>{post.username}</td>
                                <td>{post.email}</td>
                                <td>{post.phone}</td>
                                <td>{post.profession}</td>
                                <td><Link to={`/details/${post.id}`} className="btn btn-info" > About </Link></td>
                                <td><Link to={`/register/${post.id}`} className="btn btn-warning" > Edit </Link></td>
                                <td><button className="btn btn-danger" onClick={() => handleDelete(post.id)}  >Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;