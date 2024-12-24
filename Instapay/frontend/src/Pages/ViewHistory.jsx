import "./ViewHistory.css";
import CalenderPhoto from "../assets/Calender.png";
import ToIcon from "../assets/To.png";  // Import ToIcon image
import FromIcon from "../assets/From.png";  // Import FromIcon image
import { useEffect, useState } from "react";
import axios from "axios";

function ViewHistory() {
    const [userHistory, setUserHistory] = useState([]);  // Default to an empty array
    const [loggedInUser, setLoggedInUser] = useState(null);

    // Fetch user transaction history on component mount
    useEffect(() => {
        const fetchUserStatus = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:3000/auth/status", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("User data fetched:", response.data);
                setLoggedInUser(response.data.name);
            } catch (err) {
                console.log("Error fetching user data:", err.response || err);
                console.log(token);
            }
        };

        fetchUserStatus();
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:3000/transactions/show-all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserHistory(response.data.data); // Set the transaction history data
                console.log(response.data.data);
                
            } catch (err) {
                console.log("Error fetching transaction data:", err.response || err);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="form-container container">
            {userHistory.length > 0 ? (
                userHistory.map((transaction) => (
                    <div key={transaction.id} className="list-item">
                        {/* Transaction Details */}
                        <div className="details">
                            {/* Dynamically set image based on sender or receiver */}
                            <img
                                src={loggedInUser === transaction.sender.name ? FromIcon : ToIcon}  // Show FromIcon if sender, ToIcon if receiver
                                alt={loggedInUser === transaction.sender.name ? "From-icon" : "To-icon"}
                                className="form-icon"
                            />
                            <div className="person-details">
                                <p className="number">
                                    {/* Display associated account number based on the direction of transaction */}

                                    {transaction.id}

                                </p>
                                <p className="name">
                                    {/* Conditionally display 'from' or 'to' based on whether the user is sender or receiver */}
                                    {loggedInUser === transaction.sender.name
                                        ? `To ${transaction.receiver.name}`  // If logged in user is sender, display the receiver's name
                                        : `From ${transaction.sender.name}`}
                                    {/* // If logged in user is receiver, display the sender's name */}
                                </p>

                            </div>
                        </div>

                        {/* Amount */}
                        <div
                            className={`money-label ${loggedInUser === transaction.receiver.name
                                ? "positive"  // Green for received money
                                : "negative"  // Red for sent money
                                }`}
                        >
                            {loggedInUser === transaction.receiver.name
                                ? `+  ${transaction.amount} EGP`
                                : `-  ${transaction.amount} EGP`}
                        </div>

                        {/* Date and Status */}
                        <div className="info">
                            <p className="date">
                                <img src={CalenderPhoto} alt="calender-icon" />
                                {(() => {
                                    const date = new Date(transaction.createdAt);
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    return `${year}-${month}-${day}`;  // Format as 'YYYY-MM-DD'
                                })()}
                            </p>
                            <p
                                className={`status ${transaction.status === "SUCCESS"
                                        ? "success"
                                        : transaction.status === "PENDING"
                                            ? "pending"
                                            : "text-yellow-500" // Apply yellow color if the status is neither SUCCESS nor FAILED
                                    }`}
                            >
                                {transaction.status}
                            </p>

                        </div>
                    </div>
                ))
            ) : (
                <p>No transaction history available.</p>
            )}
        </div>
    );
}

export default ViewHistory;
