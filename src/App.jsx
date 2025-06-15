import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/Profile";
import NotificationsPage from "./Pages/NotificationsPage";
import TabContent from "./Pages/TabContent.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import "./custom.css";
import Layout from "./Pages/Layout.jsx";
import AdminLayout from "./Pages/AdminLayout.jsx";
import AdminTabContent from "./Pages/AdminTabContent.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  const [handleTabs, setHandleTabs] = useState({ tab: "send" });
  const [adminTabs, setAdminTabs] = useState({ tab: "users" });
  const [recentTransaction, setRecentTransaction] = useState(false);
  const [focus, setFocus] = useState("send");  // Store the focused item


  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    bankAccounts: [],
  });

  const [edited, setEdited] = useState({
    email: false,
    password: false,
  });
  const [selectedUser, setSelectedUser] = useState("");

  // Define routes using createBrowserRouter
  const router = createBrowserRouter([
    {
      path: "/", // Default route - Login Page
      element: (
        <LoginPage
          enteredValues={enteredValues}
          setEnteredValues={setEnteredValues}
          edited={edited}
          setEdited={setEdited}
        />
      ),
    },
    {
      element: <Layout />, // Apply the Layout (with Header) to these routes
      children: [

        {
          path: "/home",
          element: <HomePage name={enteredValues.name} focus={focus} setFocus={setFocus} />,
        },
        {
          path: "/notifications",
          element: <NotificationsPage />,
        },
        {
          path: "/users/showBankAccounts", element: <ProfilePage
            name={enteredValues.name}
            email={enteredValues.email}
            phone={enteredValues.phone}
            address={enteredValues.address}
            bankAccounts={enteredValues.bankAccounts}
          />
        },
        {
          path: "/profile",
          element: (
            <ProfilePage
              name={enteredValues.name}
              email={enteredValues.email}
              phone={enteredValues.phone}
              address={enteredValues.address}
              bankAccounts={enteredValues.bankAccounts}
            />
          ),
        },
        {
          path: "/tab/:tabId",
          element: (
            <TabContent
              enteredValues={enteredValues}
              handleTabs={handleTabs}
              setHandleTabs={setHandleTabs}
              focus={focus}
              setFocus={setFocus}
            />
          ),
        },
      ],
    },
    {
      element: <AdminLayout />, // Admin Layout for Admin routes
      path: "/admin",
      children: [
        {
          index: true, // Default Admin Page
          element: (
            <AdminTabContent
              adminTabs={adminTabs}
              setAdminTabs={setAdminTabs}
              setSelectedUser={setSelectedUser}
              selectedUser={selectedUser}
              setRecentTransaction={setRecentTransaction}
              recentTransaction={recentTransaction}
            />
          ),
        },
        {
          path: "tabs/:tabId",
          element: (
            <AdminTabContent
              adminTabs={adminTabs}
              setAdminTabs={setAdminTabs}
              setSelectedUser={setSelectedUser}
              selectedUser={selectedUser}
              setRecentTransaction={setRecentTransaction}
              recentTransaction={recentTransaction}
            />
          ),
        },
      ],
    },
  ]);

  return <> <RouterProvider router={router} />
    <ToastContainer></ToastContainer>
  </>
    ;
}

export default App;
