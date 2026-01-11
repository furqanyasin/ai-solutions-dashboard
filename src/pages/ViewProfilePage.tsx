import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import MasterLayout from "../layouts/MasterLayout";
import { useAuth } from "../contexts/AuthContext";

const ViewProfilePage: React.FC = () => {
    const { user, updateProfile } = useAuth();

    // State for tabs
    const [activeTab, setActiveTab] = useState("edit");

    // State for edit form
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        department: user.department,
        designation: user.designation,
        language: user.language,
        bio: user.bio
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
        updateProfile(formData);
        alert("Profile updated successfully!");
    };

    return (
        <MasterLayout>
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                <h6 className="fw-semibold mb-0">View Profile</h6>
                <ul className="d-flex align-items-center gap-2">
                    <li className="fw-medium">
                        <Link to="/" className="d-flex align-items-center gap-1 hover-text-primary">
                            <Icon icon="solar:home-smile-angle-outline" className="icon text-lg" />
                            Dashboard
                        </Link>
                    </li>
                    <li>-</li>
                    <li className="fw-medium">View Profile</li>
                </ul>
            </div>

            <div className="row gy-4">
                <div className="col-lg-4">
                    <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
                        <img src="/assets/images/user-grid/user-grid-bg1.png" alt="" className="w-100 object-fit-cover" />
                        <div className="pb-24 ms-16 mb-24 me-16 mt--100">
                            <div className="text-center border border-top-0 border-start-0 border-end-0">
                                <img
                                    src="/assets/images/user-grid/user-grid-img14.png"
                                    alt=""
                                    className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
                                />
                                <h6 className="mb-0 mt-16">{user.name}</h6>
                                <span className="text-secondary-light mb-16">{user.email}</span>
                            </div>
                            <div className="mt-24">
                                <h6 className="text-xl mb-16">Personal Info</h6>
                                <ul>
                                    <li className="d-flex align-items-center gap-1 mb-12">
                                        <span className="w-30 text-md fw-semibold text-primary-light">Full Name</span>
                                        <span className="w-70 text-secondary-light fw-medium">: {user.name}</span>
                                    </li>
                                    <li className="d-flex align-items-center gap-1 mb-12">
                                        <span className="w-30 text-md fw-semibold text-primary-light"> Email</span>
                                        <span className="w-70 text-secondary-light fw-medium">: {user.email}</span>
                                    </li>
                                    <li className="d-flex align-items-center gap-1 mb-12">
                                        <span className="w-30 text-md fw-semibold text-primary-light"> Phone</span>
                                        <span className="w-70 text-secondary-light fw-medium">: {user.phone}</span>
                                    </li>
                                    <li className="d-flex align-items-center gap-1 mb-12">
                                        <span className="w-30 text-md fw-semibold text-primary-light"> Dept</span>
                                        <span className="w-70 text-secondary-light fw-medium">: {user.department}</span>
                                    </li>
                                    <li className="d-flex align-items-center gap-1 mb-12">
                                        <span className="w-30 text-md fw-semibold text-primary-light"> Desig</span>
                                        <span className="w-70 text-secondary-light fw-medium">: {user.designation}</span>
                                    </li>
                                    <li className="d-flex align-items-center gap-1 mb-12">
                                        <span className="w-30 text-md fw-semibold text-primary-light"> Languages</span>
                                        <span className="w-70 text-secondary-light fw-medium">: {user.language}</span>
                                    </li>
                                    <li className="d-flex align-items-center gap-1">
                                        <span className="w-30 text-md fw-semibold text-primary-light"> Bio</span>
                                        <span className="w-70 text-secondary-light fw-medium">: {user.bio}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card h-100">
                        <div className="card-body p-24">
                            <ul className="nav border-gradient-tab nav-pills mb-20 d-inline-flex" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link d-flex align-items-center px-24 ${activeTab === 'edit' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('edit')}
                                    >
                                        Edit Profile
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link d-flex align-items-center px-24 ${activeTab === 'password' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('password')}
                                    >
                                        Change Password
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link d-flex align-items-center px-24 ${activeTab === 'notifications' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('notifications')}
                                    >
                                        Notification Settings
                                    </button>
                                </li>
                            </ul>

                            <div className="tab-content">
                                {activeTab === 'edit' && (
                                    <div className="tab-pane fade active show">
                                        <h6 className="text-md text-primary-light mb-16">Profile Image</h6>
                                        <div className="mb-24 mt-16">
                                            <div className="avatar-upload">
                                                <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                                                    <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" hidden />
                                                    <label htmlFor="imageUpload" className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle">
                                                        <Icon icon="solar:camera-outline" />
                                                    </label>
                                                </div>
                                                <div className="avatar-preview">
                                                    <div id="imagePreview" style={{ backgroundImage: `url(${user.avatar})` }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="mb-20">
                                                        <label htmlFor="name" className="form-label fw-semibold text-primary-light text-sm mb-8">Full Name <span className="text-danger-600">*</span></label>
                                                        <input type="text" className="form-control radius-8" id="name" value={formData.name} onChange={handleInputChange} placeholder="Enter Full Name" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="mb-20">
                                                        <label htmlFor="email" className="form-label fw-semibold text-primary-light text-sm mb-8">Email <span className="text-danger-600">*</span></label>
                                                        <input type="email" className="form-control radius-8" id="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="mb-20">
                                                        <label htmlFor="phone" className="form-label fw-semibold text-primary-light text-sm mb-8">Phone</label>
                                                        <input type="text" className="form-control radius-8" id="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone number" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="mb-20">
                                                        <label htmlFor="department" className="form-label fw-semibold text-primary-light text-sm mb-8">Department <span className="text-danger-600">*</span> </label>
                                                        <select className="form-control radius-8 form-select" id="department" value={formData.department} onChange={handleInputChange}>
                                                            <option value="Development">Development</option>
                                                            <option value="Design">Design</option>
                                                            <option value="Marketing">Marketing</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="mb-20">
                                                        <label htmlFor="designation" className="form-label fw-semibold text-primary-light text-sm mb-8">Designation <span className="text-danger-600">*</span> </label>
                                                        <select className="form-control radius-8 form-select" id="designation" value={formData.designation} onChange={handleInputChange}>
                                                            <option value="Front End Developer">Front End Developer</option>
                                                            <option value="UI/UX Designer">UI/UX Designer</option>
                                                            <option value="Project Manager">Project Manager</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="mb-20">
                                                        <label htmlFor="language" className="form-label fw-semibold text-primary-light text-sm mb-8">Language <span className="text-danger-600">*</span> </label>
                                                        <select className="form-control radius-8 form-select" id="language" value={formData.language} onChange={handleInputChange}>
                                                            <option value="English">English</option>
                                                            <option value="Bangla">Bangla</option>
                                                            <option value="Hindi">Hindi</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <div className="mb-20">
                                                        <label htmlFor="bio" className="form-label fw-semibold text-primary-light text-sm mb-8">Bio</label>
                                                        <textarea id="bio" className="form-control radius-8" value={formData.bio} onChange={handleInputChange} placeholder="Write description..."></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center gap-3">
                                                <button type="button" className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8">
                                                    Cancel
                                                </button>
                                                <button type="submit" className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8">
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {activeTab === 'password' && (
                                    <div className="tab-pane fade active show">
                                        <div className="mb-20">
                                            <label className="form-label fw-semibold text-primary-light text-sm mb-8">New Password <span className="text-danger-600">*</span></label>
                                            <div className="position-relative">
                                                <input type="password" name="password" className="form-control radius-8" placeholder="Enter New Password*" />
                                                <Icon icon="ri:eye-line" className="cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light" />
                                            </div>
                                        </div>
                                        <div className="mb-20">
                                            <label className="form-label fw-semibold text-primary-light text-sm mb-8">Confirmed Password <span className="text-danger-600">*</span></label>
                                            <div className="position-relative">
                                                <input type="password" name="confirm-password" className="form-control radius-8" placeholder="Confirm Password*" />
                                                <Icon icon="ri:eye-line" className="cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light" />
                                            </div>
                                        </div>
                                        <button className="btn btn-primary-600">Update Password</button>
                                    </div>
                                )}

                                {activeTab === 'notifications' && (
                                    <div className="tab-pane fade active show">
                                        {[
                                            { id: 'companzNew', label: 'Company News', checked: false },
                                            { id: 'pushNotifcation', label: 'Push Notification', checked: true },
                                            { id: 'weeklyLetters', label: 'Weekly News Letters', checked: true },
                                            { id: 'meetUp', label: 'Meetups Near you', checked: false },
                                            { id: 'orderNotification', label: 'Orders Notifications', checked: true }
                                        ].map(item => (
                                            <div key={item.id} className="form-switch switch-primary py-12 px-16 border align-items-center d-flex justify-content-between radius-8 position-relative mb-16">
                                                <label htmlFor={item.id} className="line-height-1 fw-medium text-secondary-light mb-0">{item.label}</label>
                                                <input className="form-check-input" type="checkbox" role="switch" id={item.id} defaultChecked={item.checked} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default ViewProfilePage;
