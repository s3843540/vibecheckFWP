import React from "react";
import './Profile.css';
import { FaUser, FaEdit, FaUserMinus } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { deleteUser, getUser } from "../data/repository"

function Profile(props) {
  //Displays modal when user clicks the delete icon.
  const handleDeleteClick = (event) => {
    const modal = document.getElementById("delete-modal");
    modal.style.display = "block";
  }

  //Deletes user, redirects to home page
  const handeOnClickYes = (event) => {
    deleteUser(getUser());
    props.logoutUser();
    props.history.push("/");
  }

  //Hides modal
  const handeOnClickNo = (event) => {
    const modal = document.getElementById("delete-modal")
    modal.style.display = "none";
  }

  return (
    <div class="wrapper">
        <div class="profile-container">
            <div class="image-container">
                <FaUser size="50px"/>
            </div>
            <div class="profile-details">
                <b>{props.username}</b>
                <div>{props.email}</div>
                <div>Joined: {props.date}</div>
                <div class="profile-icons">
                  <Link class="icon-1" to="/edit"><FaEdit size="25px"/></Link>
                  <Link class="icon-2" onClick={handleDeleteClick}><FaUserMinus size="25px" color="red"/></Link>
                </div>
            </div>
        </div>
        <div id="delete-modal" class="modal">
          <div class="modal-content">
            <div class="modal-body">
              Are you sure you want to delete your account?
            </div>
            <div class="modal-footer">
              <button class="btn-yes" onClick={handeOnClickYes}>Yes</button>
              <button class="btn-no" onClick={handeOnClickNo}>No</button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Profile;
