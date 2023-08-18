import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Modal } from "react-bootstrap";

//--------------------------------------------------------------------------------------------------------------------------//

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    branch: "",
    contact: "",
  });
  const [fieldValidity, setFieldValidity] = useState({
    firstName: "",
    lastName: "",
    email: "",
    branch: "",
    password: "",
    confirmPassword: "",
    contact: "",
  });
  // const [registrationAlert, setRegistrationAlert] = useState({
  //   message: "",
  //   type: "",
  // });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    header:"",
    message: "",
    type: "",
  });

  let name, value;

  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    branch: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const validateForm = () => {
    const errors = {};
    if (!user.firstName) {
      errors.firstName = "First name is required";
    }
    if (!user.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!user.email) {
      errors.email = "Email is required";
    } else if (
      !user.email.match(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/)
    ) {
      errors.email = "Invalid email";
    }
    if (!user.branch) {
      errors.branch = "Please select your Branch";
    }
    if (!user.contact) {
      errors.contact = "Contact number is required";
    } else if (user.contact.length !== 10 || !user.contact.match(/^\d{10}$/)) {
      errors.contact = "Invalid contact no.";
    }
    if (!registerPassword) {
      errors.password = "Password is required";
    } else if (registerPassword.length < 8 || registerPassword.length > 20) {
      errors.password = "Password must be between 8 and 20 characters";
    }
    if (!registerEmail) {
      errors.registerEmail = "Email is required";
    }
    if (registerEmail !== user.email) {
      errors.registerEmail = "Email is not matching";
    }
    if (!user.confirmPassword) {
      errors.confirmPassword = "Confirmation is required";
    } else if (user.confirmPassword !== registerPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const postUserData = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, branch, contact } = user;
    const isValid = validateForm(); // Call the validateForm function to check form validity

    if (isValid) {
      const res = await fetch(
        "https://campusqr-559ab-default-rtdb.firebaseio.com/campusDB.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            branch,
            contact,
          }),
        }
      );
      if (res) {
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          branch: "",
          contact: "",
        });
        setModalMessage({
          header : "Success!!",
          message: "Data Stored Successfully",
          type: "bg-success",
        });
        setShowModal(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } else {
      setModalMessage({
        header : "Error!!",
        message: "Please Fill All The Details !!!",
        type: "bg-danger",
      });
      setShowModal(true);
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
      <div className="bg-light-subtle mt-5">
        <div className="container mt-5" data-bs-theme="dark">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-primary text-light mb-3 text-center h2">
                  Register
                </div>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <div>
                  <Modal.Header className={modalMessage.type} closeButton>
                    <Modal.Title className="text-center">{modalMessage.header}</Modal.Title>
                  </Modal.Header>
                  <Modal.Footer className={`${modalMessage.type} justify-content-center`}>{modalMessage.message}</Modal.Footer>
                  </div>    
                </Modal>
                <div className="card-body">
                  <form className="row g-3 needs-validation" method="POST">
                    <div className="col-md-6">
                      <label
                        htmlFor="validationDefault01"
                        className="form-label fw-bold"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={(event) => {
                          getUserData(event);
                          const isValid = !!event.target.value;
                          setFieldValidity({
                            ...fieldValidity,
                            firstName: isValid,
                          });
                          setValidationErrors({
                            ...validationErrors,
                            firstName: isValid ? "" : "First name is required",
                          });
                        }}
                        className={`form-control ${
                          validationErrors.firstName
                            ? "is-invalid"
                            : fieldValidity.firstName
                            ? "is-valid"
                            : ""
                        }`}
                        id="validationDefault01"
                        required
                      />
                      {validationErrors.firstName && (
                        <div className="invalid-feedback">
                          {validationErrors.firstName}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="validationDefault02"
                        className="form-label fw-bold"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        value={user.lastName}
                        onChange={(event) => {
                          getUserData(event);
                          const isValid = !!event.target.value;
                          setFieldValidity({
                            ...fieldValidity,
                            lastName: isValid,
                          });
                          setValidationErrors({
                            ...validationErrors,
                            lastName: isValid ? "" : "Last name is required",
                          });
                        }}
                        name="lastName"
                        className={`form-control ${
                          validationErrors.lastName
                            ? "is-invalid"
                            : fieldValidity.lastName
                            ? "is-valid"
                            : ""
                        }`}
                        id="validationDefault02"
                      />
                      {validationErrors.lastName && (
                        <div className="invalid-feedback">
                          {validationErrors.lastName}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="validationDefaultUsername"
                        className="form-label fw-bold"
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
                          onChange={(event) => {
                            const emailValue = event.target.value;
                            getUserData(event);

                            // Check if emailValue matches the regular expression for a valid email
                            const isEmailValid =
                              /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(
                                emailValue
                              );

                            // Update fieldValidity and validationErrors based on the email validation result
                            setFieldValidity({
                              ...fieldValidity,
                              email: isEmailValid,
                            });
                            setValidationErrors({
                              ...validationErrors,
                              email: isEmailValid ? "" : "Invalid email format",
                            });
                          }}
                          className={`form-control ${
                            validationErrors.email
                              ? "is-invalid"
                              : fieldValidity.email
                              ? "is-valid"
                              : ""
                          }`}
                          id="validationDefaultUsername"
                          aria-describedby="inputGroupPrepend2"
                        />
                        {validationErrors.email && (
                          <div className="invalid-feedback">
                            {validationErrors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label
                        for="validationDefaultUsername"
                        className="form-label fw-bold"
                      >
                        Confirm Email
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
                            const confirmEmail = event.target.value;
                            getUserData(event);
                            setRegisterEmail(confirmEmail);
                            // Check if the confirm email matches the original email
                            const isEmailMatch = confirmEmail === user.email;

                            // Update fieldValidity and validationErrors based on email match and format validation
                            if (!confirmEmail) {
                              setFieldValidity({
                                ...fieldValidity,
                                registerEmail: isEmailMatch,
                              });
                              setValidationErrors({
                                ...validationErrors,
                                registerEmail: "Confirmation required",
                              });
                            } else {
                              setFieldValidity({
                                ...fieldValidity,
                                registerEmail: isEmailMatch,
                              });
                              setValidationErrors({
                                ...validationErrors,
                                registerEmail: isEmailMatch
                                  ? ""
                                  : "Email does not match",
                              });
                            }
                          }}
                          className={`form-control ${
                            validationErrors.registerEmail
                              ? "is-invalid"
                              : fieldValidity.registerEmail
                              ? "is-valid"
                              : ""
                          }`}
                          id="validationDefaultUsername"
                          aria-describedby="inputGroupPrepend2"
                        />
                        {validationErrors.registerEmail && (
                          <div className="invalid-feedback">
                            {validationErrors.registerEmail}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label
                        for="validationDefault03"
                        className="form-label fw-bold"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={(event) => {
                          setRegisterPassword(event.target.value);
                          getUserData(event);
                          const passwordValue = event.target.value;
                          let passwordValidity = true;

                          if (!passwordValue) {
                            passwordValidity = false;
                            setValidationErrors({
                              ...validationErrors,
                              password: "Password is required",
                            });
                          } else if (
                            passwordValue.length < 8 ||
                            passwordValue.length > 20
                          ) {
                            passwordValidity = false;
                            setValidationErrors({
                              ...validationErrors,
                              password:
                                "Password must be between 8 and 20 characters",
                            });
                          } else {
                            setValidationErrors({
                              ...validationErrors,
                              password: "",
                            });
                          }

                          setFieldValidity({
                            ...fieldValidity,
                            password: passwordValidity,
                          });
                        }}
                        className={`form-control ${
                          validationErrors.password
                            ? "is-invalid"
                            : fieldValidity.password
                            ? "is-valid"
                            : ""
                        }`}
                        id="exampleInputPassword1"
                        required
                      />
                      {validationErrors.password && (
                        <div className="invalid-feedback">
                          {validationErrors.password}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="validationDefault03"
                        className="form-label fw-bold"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        onChange={(event) => {
                          const cpassValue = event.target.value;
                          let cpasswordValidity = true;
                          if (!cpassValue) {
                            setValidationErrors({
                              ...validationErrors,
                              confirmPassword: "Confirmation is required",
                            });
                            setFieldValidity({
                              ...fieldValidity,
                              confirmPassword: "",
                            });
                          } else if (
                            cpassValue !== registerPassword ||
                            registerPassword.length < 8 ||
                            registerPassword.length > 20
                          ) {
                            setValidationErrors({
                              ...validationErrors,
                              confirmPassword: "Passwords do not match",
                            });
                            setFieldValidity({
                              ...fieldValidity,
                              confirmPassword: "",
                            });
                          } else {
                            setValidationErrors({
                              ...validationErrors,
                              confirmPassword: "",
                            });
                            setFieldValidity({
                              ...fieldValidity,
                              confirmPassword: cpasswordValidity,
                            });
                          }
                          getUserData(event);
                        }}
                        className={`form-control ${
                          validationErrors.confirmPassword
                            ? "is-invalid"
                            : fieldValidity.confirmPassword
                            ? "is-valid"
                            : ""
                        }`}
                        id="validationDefaultConfirmPassword"
                      />
                      {validationErrors.confirmPassword && (
                        <div className="invalid-feedback">
                          {validationErrors.confirmPassword}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="validationDefault04"
                        className="form-label fw-bold"
                      >
                        Branch
                      </label>
                      <select
                        className={`form-select ${
                          validationErrors.branch ? "is-invalid" : ""
                        }`}
                        name="branch"
                        value={user.branch}
                        onChange={(event) => {
                          // Update the confirmPassword in the user state
                          getUserData(event);
                          if (!event.target.value) {
                            setValidationErrors({
                              ...validationErrors,
                              branch: "Please select your Branch",
                            });
                          } else {
                            setValidationErrors({
                              ...validationErrors,
                              branch: "",
                            });
                          }
                        }}
                        id="validationDefault04"
                      >
                        <option value="" disabled>
                          Choose...
                        </option>
                        <option value="MCA">MCA</option>
                        <option value="BTech">BTech</option>
                        <option value="BE">BE</option>
                        <option value="EE">EE</option>
                      </select>
                      {validationErrors.branch && (
                        <div className="invalid-feedback">
                          {validationErrors.branch}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="validationDefault05"
                        className="form-label fw-bold"
                      >
                        Contact No.
                      </label>

                      <input
                        type="text"
                        name="contact"
                        value={user.contact}
                        onChange={(event) => {
                          getUserData(event);
                          const contactValue = event.target.value;
                          let isValid = true;

                          if (!contactValue) {
                            isValid = false;
                            setValidationErrors({
                              ...validationErrors,
                              contact: "Contact number is required",
                            });
                            setFieldValidity({
                              ...fieldValidity,
                              contact: isValid,
                            });
                          } else if (
                            contactValue.length !== 10 ||
                            !contactValue.match(/^\d{10}$/)
                          ) {
                            isValid = false;
                            setValidationErrors({
                              ...validationErrors,
                              contact: "Invalid contact no.",
                            });
                            setFieldValidity({
                              ...fieldValidity,
                              contact: isValid,
                            });
                          } else {
                            setValidationErrors({
                              ...validationErrors,
                              contact: "",
                            });
                            setFieldValidity({
                              ...fieldValidity,
                              contact: isValid,
                            });
                          }
                        }}
                        className={`form-control ${
                          validationErrors.contact
                            ? "is-invalid"
                            : fieldValidity.contact
                            ? "is-valid"
                            : ""
                        }`}
                        id="validationDefault05"
                      />
                      {validationErrors.contact && (
                        <div className="invalid-feedback">
                          {validationErrors.contact}
                        </div>
                      )}
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto">
                      <button
                        // type="button" // Change to type="button" to prevent form submission
                        className="btn btn-primary justify-content-center"
                        onClick={async (event) => {
                          event.preventDefault();
                          validateForm(event); // To validate all the fields
                          await registerUser(event); // Wait for registerUser to complete
                          postUserData(event); // Call postUserData after registerUser is done
                        }}
                      >
                        Submit
                      </button>
                    </div>
                    <p className="ms-2 p-3 text-center">
                      Already have an account?&nbsp;
                      <Link
                        className="icon-link justify-content-center badge rounded-pill bg-info"
                        to="/"
                      >
                        Click here
                      </Link>
                    </p>
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
