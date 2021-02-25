import React, { useEffect, useState } from 'react'
import UserService from '../services/user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useParams } from "react-router-dom";


const Register = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '', username: '', email: '', phone: '', profession: '', review: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { id } = useParams();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }



    useEffect(() => {
        getDetail()
    }, []);

    const getDetail = () => {
        if (id) {
            UserService.get(id)
                .then(res => {
                    let user = res.data
                    return {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        profession: user.profession,
                        review: user.review,
                    };
                }
                )
                .then(user => setUser(user));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (id) {
            UserService.update(id, user).then((response) => {
                if (response) {
                    history.push('/');
                    toast.success("Updated Successfully ", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                else {
                    toast.error("Updation Failed", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            });
        }
        else {
            if (user.firstName && user.lastName && user.email && user.phone) {
                UserService.create(user);
                history.push("/");
                toast.success("Updated Successfully ", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }

    }



    return (
        <div className="container" style={{ marginTop: "1em" }}>
            <form onSubmit={handleSubmit}>
                <div className="card person-card">
                    <div className="card-body">
                        <img id="img_sex" className="person-img"
                            src="https://visualpharm.com/assets/217/Life%20Cycle-595b40b75ba036ed117d9ef0.svg" />
                        <h4 id="who_message" className="card-title">User Information</h4>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label htmlFor="firstName" className="col-form-label">Title</label>
                                <select id="input_sex" className="form-control">
                                    <option value="Mr.">Mr.</option>
                                    <option value="Ms.">Ms.</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="firstName" className="col-form-label">First Name <span className="requiredField">*</span></label>
                                <input type="text" name="firstName" value={user.firstName} onChange={handleChange} id="firstName" placeholder="Phone Name"
                                    className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />

                                {submitted && !user.firstName &&
                                    <div className="invalid-feedback">First Name is required</div>
                                }

                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="lastName" className="col-form-label">Last name <span className="requiredField">*</span></label>
                                <input type="text" name="lastName" className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} value={user.lastName} onChange={handleChange} id="lastName" placeholder="Phone Name" />

                                {submitted && !user.lastName &&
                                    <div className="invalid-feedback">Last Name is required</div>
                                }

                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="username" className="col-form-label">Username <span className="requiredField">*</span></label>
                                <input type="text" name="username" className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} value={user.username} onChange={handleChange} id="username" placeholder="Phone Name" />
                                {submitted && !user.username &&
                                    <div className="invalid-feedback">Username is required</div>
                                }

                            </div>

                            <div className="form-group col-md-4">
                                <label htmlFor="email" className="col-form-label">Email <span className="requiredField">*</span></label>
                                <input type="text" name="email" className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} value={user.email} onChange={handleChange} id="email" placeholder="email" />
                                {submitted && !user.email &&
                                    <div className="invalid-feedback">Email is required</div>
                                }

                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="phone" className="col-form-label">Phone <span className="requiredField">*</span></label>
                                <input type="text" name="phone" className={'form-control' + (submitted && !user.phone ? ' is-invalid' : '')} value={user.phone} onChange={handleChange} id="phone" placeholder="phone" />
                                {submitted && !user.phone &&
                                    <div className="invalid-feedback">Phone is required</div>
                                }
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="profession" className="col-form-label">Profession <span className="requiredField">*</span></label>
                                <input type="text" name="profession" className={'form-control' + (submitted && !user.profession ? ' is-invalid' : '')} value={user.profession} onChange={handleChange} id="profession" placeholder="Profession" />
                                {submitted && !user.profession &&
                                    <div className="invalid-feedback">Profession is required</div>
                                }

                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="review" className="col-form-label">Reviews</label>
                                <input type="text" name="review" className="form-control" value={user.review} onChange={handleChange} id="review" placeholder="Review" />
                                <div className="review-feedback">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "1em" }}>
                    <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;