import React, { useState, useEffect } from "react";
import axios from "axios"; // For making API calls

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState(null); // For handling errors
  const [id, setId] = useState();

  useEffect(() => {
    const fetchUserStatusAndNotifications = async () => {
      const token = localStorage.getItem("token");
      try {
        // Fetch user status to get the ID
        const userResponse = await axios.get("http://localhost:3000/auth/status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userId = userResponse.data.id;
        setId(userId);

        // Fetch notifications using the fetched ID
        const notificationsResponse = await axios.get(`http://localhost:3000/notifications/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(notificationsResponse.data);
        console.log(notificationsResponse.data);
      } catch (err) {
        console.error("Error fetching user status or notifications:", err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatusAndNotifications();
  }, []);

  // Function to mark a notification as read
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:3000/notifications/${id}/read`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the state to mark as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  // Filter notifications to only show unread ones
  const unreadNotifications = notifications.filter((notif) => !notif.read);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold text-purple-800 text-center mb-6">Notifications</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading notifications...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : unreadNotifications.length === 0 ? (
        <p className="text-center text-gray-500">You have no unread notifications.</p>
      ) : (
        <div className="space-y-4">
          {unreadNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex justify-between items-start p-4 border rounded-lg shadow-md bg-white"
            >
              <div className="flex-1">
                <p className="text-base text-gray-700 leading-relaxed">
                  <span className="font-medium text-purple-800">Message:</span> {notification.message}
                </p>
              </div>
              <div>
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Mark as Read
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
