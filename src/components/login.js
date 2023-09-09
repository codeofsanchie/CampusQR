import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import { Modal } from "react-bootstrap";


function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  const [fieldValidity, setFieldValidity] = useState({
    email: "",
    pass: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    pass: "",
  });

  // const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    header: "",
    message: "",
    type: "",
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    // Validation logic similar to the registration form
    const errors = {};
    let isValid = true;

    if (!values.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (
      !values.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!values.pass) {
      errors.pass = "Password is required";
      isValid = false;
    } else if (values.pass.length < 8 || values.pass.length > 20) {
      errors.pass = "Password is Incorrect";
      isValid = false;
    }

    setValidationErrors(errors);

    if (!isValid) {
      return;
    }

    if (!navigator.onLine) {
      setModalMessage({
        header: "Error!!",
        message:
          "You are currently offline. Please try again when you're online.",
        type: "bg-danger",
      });
      setShowModal(true); // Show the modal with the offline message
      return;
    }

    setModalMessage(""); // Clear modal message
    setShowModal(false); // Hide the modal

    setSubmitButtonDisabled(true);

    if (values.email === "admin@example.com" && values.pass === "adminpassword") {
      // If the credentials match, redirect to a special page
      navigate("/admin"); 
    } 
    else {
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setModalMessage({
          header: "Error!!",
          message: "Invalid email or password",
          type: "bg-danger",
        });
        setShowModal(true); // Show the modal with the error message
        setTimeout(() => {
          setShowModal(false); // Hide the modal after a delay
          setModalMessage(""); // Clear modal message
        }, 3000);
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-light mb-3 text-center h2">
              Login
            </div>
            <div className="card-body">
              <form className="row g-3 needs-validation" method="POST">
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <div>
                    <Modal.Header className={modalMessage.type} closeButton>
                      <Modal.Title className="text-center">
                        {modalMessage.header}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer
                      className={`${modalMessage.type} justify-content-center`}
                    >
                      {modalMessage.message}
                    </Modal.Footer>
                  </div>
                </Modal>
                {/* Email input */}
                <div className="col-md-6">
                  <label
                    htmlFor="validationDefault01"
                    className="form-label fw-bold"
                  >
                    Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text" id="inputGroupPrepend2">
                      @
                    </span>
                    <input
                      className={`form-control ${
                        validationErrors.email
                          ? "is-invalid"
                          : fieldValidity.email
                          ? "is-valid"
                          : ""
                      }`}
                      onChange={(event) => {
                        setValues((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }));
                        const isValid = !!event.target.value.match(
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                        );
                        if (!isValid) {
                          setValidationErrors((prev) => ({
                            ...prev,
                            email: "Invalid email format",
                          }));
                          setFieldValidity((prev) => ({
                            ...prev,
                            email: "",
                          }));
                        } else {
                          setValidationErrors((prev) => ({
                            ...prev,
                            email: "",
                          }));
                          setFieldValidity((prev) => ({
                            ...prev,
                            email: isValid,
                          }));
                        }
                      }}
                      placeholder="Enter email address"
                    />
                    {validationErrors.email && (
                      <div className="invalid-feedback">
                        {validationErrors.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Password input */}
                <div className="col-md-6">
                  <label
                    htmlFor="validationDefault01"
                    className="form-label fw-bold"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="validationDefault01"
                    className={`form-control ${
                      validationErrors.pass
                        ? "is-invalid"
                        : fieldValidity.pass
                        ? "is-valid"
                        : ""
                    }`}
                    onChange={(event) => {
                      setValues((prev) => ({
                        ...prev,
                        pass: event.target.value,
                      }));
                      const passwordValue = event.target.value;
                      let passwordValidity = true;
                      if (!passwordValue) {
                        setFieldValidity((prev) => ({
                          ...prev,
                          pass: "",
                        }));
                        setValidationErrors((prev) => ({
                          ...prev,
                          pass: "Password is required",
                        }));
                      } else if (
                        passwordValue.length < 8 ||
                        passwordValue.length > 20
                      ) {
                        setFieldValidity((prev) => ({
                          ...prev,
                          pass: "",
                        }));
                        setValidationErrors((prev) => ({
                          ...prev,
                          pass: "Password is Incorrect",
                        }));
                      } else {
                        setFieldValidity((prev) => ({
                          ...prev,
                          pass: passwordValidity,
                        }));
                        setValidationErrors((prev) => ({
                          ...prev,
                          pass: "",
                        }));
                      }
                    }}
                    placeholder="Enter Password"
                  />
                  {validationErrors.pass && (
                    <div className="invalid-feedback">
                      {validationErrors.pass}
                    </div>
                  )}
                </div>

                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    disabled={submitButtonDisabled}
                    onClick={(event) => {
                      event.preventDefault();
                      handleSubmission(event);
                    }}
                    className={`btn btn-primary justify-content-center ${
                      submitButtonDisabled ? "disabled" : ""
                    }`}
                  >
                    {submitButtonDisabled ? "Logging In..." : "Login"}
                  </button>
                </div>
                <p className="ms-2 p-3 text-center">
                  Don't have an account?&nbsp;
                  <span>
                    <Link
                      className="icon-link justify-content-center badge rounded-pill bg-info"
                      to="/Register"
                    >
                      Sign up
                    </Link>
                  </span>
                </p>

                <p className="ms-2 p-3 text-center">
                  <span>
                    <Link
                      className="icon-link justify-content-center"
                      to="/reset-password"
                    >
                      Forget password ?
                    </Link>
                  </span>
                </p>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
