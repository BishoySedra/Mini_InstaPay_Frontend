import React, { useState, useEffect } from "react";
import axios from "axios";
import GoIcon from "../assets/GoIcon.svg";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bankAccounts: [{}],
  });
  const [newAccount, setNewAccount] = useState({
    accountNumber: "",
    bankName: "",
    balance: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility for adding account
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false); // State for account details modal
  const [selectedAccount, setSelectedAccount] = useState(null); // State to store selected account for details

  useEffect(() => {
    const fetchUserStatus = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/users/status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data.user.name);
        

        setProfile((prev) => ({
          ...prev,
          name: response.data.user.name,
          email: response.data.user.email,
          phone: response.data.user.phone,
          address: response.data.user.address,
        }));
      } catch (err) {
        setError("Error fetching user data.");
      }
    };

    fetchUserStatus();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please login first.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/users/showBankAccounts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.accounts) {
          setProfile((prevState) => ({
            ...prevState,
            bankAccounts: response.data.accounts.accounts,
          }));
        } else {
          setError("No bank accounts found.");
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle adding a new bank account
  const handleAddAccount = async () => {
    setError("")
    const { accountNumber, bankName, balance } = newAccount;
    if (accountNumber.trim() && bankName.trim() && balance.trim()) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "http://localhost:3000/users/linkBankAccount",
          { accountNumber, bankName, balance },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.account) {
          setProfile((prev) => ({
            ...prev,
            bankAccounts: [...prev.bankAccounts, response.data.account],
          }));
          setNewAccount({
            accountNumber: "",
            bankName: "",
            balance: "",
          });
          toast.success("Bank account added successfully!");
          setIsModalOpen(false); // Close the modal after successful submission
        } else {
          setError("Failed to add bank account");
        }
      } catch (err) {
        setError("Failed to add bank account");
      }
    } else {
      setError("All fields must be filled.");
    }
  };

  // Handle deleting a bank account
  const handleDeleteAccount = async (accountNumber) => {
    setError("")
    if (!accountNumber) {
      setError("Account number is missing.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/users/unlinkBankAccount/${accountNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.message === "Bank account unlinked successfully") {
        setProfile((prev) => ({
          ...prev,
          bankAccounts: prev.bankAccounts.filter(
            (account) => account.accountNumber !== accountNumber
          ),
        }));
        toast.success(response.data.message);
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (err) {
      setError("Failed to delete bank account");
    }
  };

  // Handle profile input changes
  const handleInputChange = (e) => {
    setError("")
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle saving changes (updating profile)
  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    const { phone, address } = profile;

    const updateData = { phone, address };
    const validData = Object.fromEntries(
      Object.entries(updateData).filter(([key, value]) => value && value !== '' && value !== undefined)
    );

    if (Object.keys(validData).length > 0) {
      try {
        const response = await axios.patch(
          "http://localhost:3000/users/updateProfile",
          validData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.message === "Profile updated successfully") {
          toast.success("Profile updated successfully!");
          setProfile((prev) => ({
            ...prev,
            phone: response.data.updatedUser.phone,
            address: response.data.updatedUser.address,
          }));
        } else {
          setError("Failed to update profile.");
        }
      } catch (err) {
        setError("Failed to update profile. Please try again.");
      }
    } else {
      setError("No valid fields to update.");
    }
  };

  // Function to handle the "View Details" button click
  const handleViewDetails = (account) => {
    setSelectedAccount(account);
    setIsAccountModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold text-purple-800 text-center mb-6">My Profile</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">User Name</label>
            <input
              disabled
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="w-full border border-gray-900 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              disabled
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Bank Accounts</label>
          {profile.bankAccounts.length > 0 ? (
            profile.bankAccounts.map((account, index) => (
              <div key={account.id || index} className="flex items-center gap-4 mb-2">
                <input
                  type="text"
                  value={account.accountNumber}
                  className="flex-1 border border-gray-300 rounded-lg p-2"
                  readOnly
                />
                <button
                  onClick={() => handleViewDetails(account)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <img src={GoIcon} alt="expand-icon" className="bg-orange-200 p-1 rounded-md" />
                </button>
                <button
                  onClick={() => handleDeleteAccount(account.accountNumber)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
            ))
          ) : (
            <p>No bank accounts linked to the user.</p>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-4 w-1/2 ml-60"
      >
        Add Account
      </button>

      <button
        onClick={handleSaveChanges}
        className="w-full mt-6 bg-purple-800 text-white py-2 rounded-lg hover:bg-purple-700"
      >
        Save Changes
      </button>

      {/* Modal for adding a new bank account */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Bank Account</h2>
            <input
              type="text"
              name="accountNumber"
              value={newAccount.accountNumber}
              onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
              placeholder="Account Number"
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
            />
            <input
              type="text"
              name="bankName"
              value={newAccount.bankName}
              onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
              placeholder="Bank Name"
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
            />
            <input
              type="number"
              name="balance"
              value={newAccount.balance}
              onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
              placeholder="Balance"
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
            />
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setIsModalOpen(false);  // Close the modal
                  setError("");           // Clear the error
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAccount}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Add Account
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Modal for viewing bank account details */}
      {isAccountModalOpen && selectedAccount && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <p><strong>Account Number:</strong> {selectedAccount.accountNumber}</p>
            <p><strong>Bank Name:</strong> {selectedAccount.bankName}</p>
            <p><strong>Balance:</strong> ${selectedAccount.balance}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
