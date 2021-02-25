import React, { useEffect, useState } from 'react';
import UserService from '../services/user';
import { useParams } from "react-router-dom";
var faker = require('faker');


const Details = () => {
    let [detail, setDetail] = useState({});
    let { id } = useParams();

    useEffect(() => {
        fetchDetail()
    }, []);

    const fetchDetail = () => {
        UserService.get(id).then((res) => {
            setDetail(res.data)
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <br />
            <div className="container emp-profile shadow-lg p-3 mb-5 bg-white rounded">
                <form method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={faker.fake("{{image.image}}")} alt="" />
                                <div className="file btn btn-lg btn-primary">
                                    Change Photo
                  <input type="file" name="file" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    {detail.firstName}  {detail.lastName}
                                </h5>
                                <h6>
                                    Web Developer and Designer
                                    </h6>
                                <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Username</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p> {detail.username}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{detail.firstName} {detail.lastName}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{detail.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{detail.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{detail.profession}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Details;