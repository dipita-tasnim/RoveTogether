// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const RideConfirmation = () => {
//   const location = useLocation();
//   const rideId = new URLSearchParams(location.search).get("rideId");
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const joinedUserId = localStorage.getItem(`joinedUserId_${rideId}`);
//     if (!joinedUserId) {
//       setError("No user has joined this ride.");
//       return;
//     }

//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`/users/${joinedUserId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setUser(data);
//         } else {
//           setError(data.message || "Failed to fetch user profile");
//         }
//       } catch (err) {
//         setError("Failed to fetch user profile");
//       }
//     };

//     fetchUser();
//   }, [rideId]);

//   return (
//     <div className="user-profile">
//       <h2>Ride Confirmation</h2>
//       {error && <p>{error}</p>}
//       {user && (
//         <div className="user-card">
//           <p><strong>Full Name:</strong> {user.fullname.firstname} {user.fullname.lastname}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RideConfirmation;










import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const RideConfirmation = () => {
  const location = useLocation();
  const rideId = new URLSearchParams(location.search).get("rideId");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [action, setAction] = useState(null); // 'confirm' or 'cancel'

  useEffect(() => {
    const joinedUserId = localStorage.getItem(`joinedUserId_${rideId}`);
    if (!joinedUserId) {
      setError("No user has joined this ride.");
      return;
    }

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/users/${joinedUserId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          setError(data.message || "Failed to fetch user profile");
        }
      } catch (err) {
        setError("Failed to fetch user profile");
      }
    };

    fetchUser();

    const storedAction = localStorage.getItem(`rideConfirmationAction_${rideId}`);
    if (storedAction === "confirm" || storedAction === "cancel") {
      setAction(storedAction);
    }
  }, [rideId]);

  const handleConfirm = () => {
    setAction("confirm");
    localStorage.setItem(`rideConfirmationAction_${rideId}`, "confirm");
  };

  const handleCancel = () => {
    setAction("cancel");
    localStorage.setItem(`rideConfirmationAction_${rideId}`, "cancel");
  };

  return (
    <div className="user-profile">
      <h2>Ride Confirmation</h2>
      {error && <p>{error}</p>}
      {user && (
        <div className="user-card">
          <p><strong>Full Name:</strong> {user.fullname.firstname} {user.fullname.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <div className="confirmation-buttons">
        <button
          className={`confirm-btn ${action === "confirm" ? "active" : ""}`}
          onClick={handleConfirm}
          disabled={action === "confirm"}
        >
          Confirm
        </button>
        <button
          className={`cancel-btn ${action === "cancel" ? "active" : ""}`}
          onClick={handleCancel}
          disabled={action === "cancel"}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RideConfirmation;

