import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";


//--------------------------------------------------------------------------------------------------------------------------//

const Register = (props) => {

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    branch: "",
    contact: ""
  });

  let name, value;

  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const postUserData = async (e) => {
    // e.preventDefault();

    const { firstName, lastName, email, branch, contact } = user;

    if (firstName && lastName && email && branch && contact) {

      const res = await fetch(
        "https://campusqr-559ab-default-rtdb.firebaseio.com/campusDB.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          branch,
          contact
        })
      }
      );

      if(res){
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          branch: "",
          contact: ""
        });

        alert("Data Stored Successfully");
      }
    }
    else {
      alert("Please Fill All The Details !!!");
    }

  };

  //-----------------------------------------------------------------------------------------------------------------------------//

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const registerUser = async () => {

      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }

  };

  return (
    <>
      <div className="bg-light-subtle mt-5" style={{ minHeight: "100vh" }}>
        <div className="container mt-5" data-bs-theme={`${props.mode}`}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-success-subtle text-emphasis-success mb-3 text-center h2">
                  Register
                </div>

                <div className="card-body">
                  <form className="row g-3" method="POST">
                    <div className="col-md-4">
                      <label
                        forHTML="validationDefault01"
                        className="form-label"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={getUserData}
                        className="form-control"
                        id="validationDefault01"
                      />
                    </div>


                    <div className="col-md-4">
                      <label
                        forHTML="validationDefault02"
                        className="form-label"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        value={user.lastName}
                        onChange={getUserData}
                        name="lastName"
                        className="form-control"
                        id="validationDefault02"
                      />
                    </div>


                    <div className="col-md-4">
                      <label
                        for="validationDefaultUsername"
                        className="form-label"
                      >
                        Email
                      </label>
                      <div className="input-group">
                        <span
                          className="input-group-text"
                          id="inputGroupPrepend2"
                        >
                          @
                        </span>
                        <input
                          type="text"
                          name="email"
                          value={user.email}
                          onChange={getUserData}
                          className="form-control"
                          id="validationDefaultUsername"
                          aria-describedby="inputGroupPrepend2"
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label
                        for="validationDefaultUsername"
                        className="form-label"
                      >
                        Confirm Your Email
                      </label>
                      <div className="input-group">
                        <span
                          className="input-group-text"
                          id="inputGroupPrepend2"
                        >
                          @
                        </span>
                        <input
                          type="text"
                          name="cemail"
                          onChange={(event) => {
                            setRegisterEmail(event.target.value);
                          }}
                          className="form-control"
                          id="validationDefaultUsername"
                          aria-describedby="inputGroupPrepend2"
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label for="validationDefault03" className="form-label">
                        Password
                      </label>
                      <input type="password"
                        name="password"
                        onChange={(event) => {
                          setRegisterPassword(event.target.value);
                        }}
                        class="form-control"
                        id="exampleInputPassword1" />
                    </div>


                    <div className="col-md-4">
                      <label for="validationDefault04" className="form-label">
                        Branch
                      </label>
                      <select
                        className="form-select"
                        name="branch"
                        value={user.branch}
                        onChange={getUserData}
                        id="validationDefault04"
                      >
                        <option selected disabled value="">
                          Choose...
                        </option>
                        <option value="1">MCA</option>
                        <option value="2">BTech</option>
                        <option value="3">BE</option>
                        <option value="3">EE</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label for="validationDefault05" className="form-label">
                        Contact No.
                      </label>
                      <input
                        type="text"
                        name="contact"
                        value={user.contact}
                        onChange={getUserData}
                        className="form-control"
                        id="validationDefault05"
                      />
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto">
                      <button
                        type="button" // Change to type="button" to prevent form submission
                        className="btn btn-primary justify-content-center"
                        onClick={async () => {
                          await registerUser(); // Wait for registerUser to complete
                          postUserData(); // Call postUserData after registerUser is done
                        }}
                      >
                        Submit
                      </button>
                      <p className="ms-2 p-3">
                        Already have an account?&nbsp;
                        <Link className="icon-link justify-content-center" to="/">
                          Click here
                        </Link>
                      </p>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;