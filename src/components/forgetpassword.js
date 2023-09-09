import React, { useState } from "react";
import { auth } from "./firebase-config";
import { Modal } from "react-bootstrap";
import { sendPasswordResetEmail } from "firebase/auth";

function Forgetpassword() {
    const [values, setValues] = useState({
      email: "",
    });
  
    const [validationErrors, setValidationErrors] = useState({
      email: "",
    });
  
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({
      header: "",
      message: "",
      type: "",
    });
  
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  
    // Validation and submission logic...
    const handleSubmission = () => {
        // Similar validation logic as your login component...
        // Check for valid email format and handle errors.
      
        // If validation passes...
        sendPasswordResetEmail(auth, values.email)
          .then(() => {
            // Password reset email sent!
            setModalMessage({
              header: "Success!",
              message: "Password reset email sent. Check your inbox.",
              type: "bg-success",
            });
            setShowModal(true); // Show the success modal
          })
          .catch((error) => {
            // Handle errors...
            setModalMessage({
              header: "Error!",
              message: "Failed to send password reset email.",
              type: "bg-danger",
            });
            setShowModal(true); // Show the error modal
          });
      };


return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-primary text-light mb-3 text-center h2">
                  Reset Password
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
                    <div className="col-md-15">
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
                          className={`form-control ${validationErrors.email ? "is-invalid" : ""
                            }`}
                          onChange={(event) => {
                            setValues((prev) => ({
                              ...prev,
                              email: event.target.value,
                            }));
                            const isValid = !!event.target.value.match(
                              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                            );
                            if (!isValid) {
                              setValidationErrors((prev) => ({
                                ...prev,
                                email: "Invalid email format",
                              }));
                            } else {
                              setValidationErrors((prev) => ({
                                ...prev,
                                email: "",
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
      
                    {/* Password Reset \*/}
                    <div className="d-grid gap-2 col-6 mx-auto">
                      <button
                        disabled={submitButtonDisabled}
                        onClick={(event) => {
                          event.preventDefault();
                          handleSubmission(event);
                        }}
                        className={`btn btn-primary justify-content-center ${submitButtonDisabled ? "disabled" : ""
                          }`}
                      >
                        {submitButtonDisabled ? "Sending Email..." : "Send Reset Email"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
}
export default Forgetpassword;


























