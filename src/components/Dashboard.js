import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase-config';
import { getFirestore } from 'firebase/firestore';
// import { collection, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const db = getFirestore();

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/'); // Navigate to login page after logout
    });
  };

  useEffect(() => {
    // if (user) {
    //   const userDocRef = doc(collection(db, 'users'), user.uid);

    //   getDoc(userDocRef).then((docSnap) => {
    //     if (docSnap.exists()) {
    //       setUserData(docSnap.data());
    //     }
    //   });
    // }
  }, [user, db]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-light mb-3 text-center h2">
              Dashboard
            </div>
            <div className="card-body">
              {user ? (
                <>
                  <h2 className="mb-4">
                    Welcome to the Dashboard,
                    {user.displayName || user.email}!
                  </h2>
                  {userData && (
                    <p className="mb-3">
                      First Name: {userData.firstName} | Last Name: {userData.lastName}
                    </p>
                  )}
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <p className="text-center">
                  Please log in to access the dashboard.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
