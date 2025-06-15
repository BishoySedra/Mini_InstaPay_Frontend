import "./SendMoney.css";
import Input from "../Components/Input";
import { useState } from "react";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify";

const SendMoney = () => {
    const [formData, setFormData] = useState({
        accountNumber: "",
        bankAccount: "",
        amount: "",
        transferType: "", // instant or scheduled
    });

    const [errors, setErrors] = useState({
        accountNumber: "",
        bankAccount: "",
        amount: "",
        transferType: "",
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[cC][oO][mM]$/; // Regex for email validation

    // Function to handle input change and validation
    function handleInputChange(identifier, value) {
        setFormData(prevFormData => ({
            ...prevFormData,
            [identifier]: value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [identifier]: "" // Clear error when user modifies the field
        }));
    }

    // Function to validate the form data before submission
    // Function to validate the form data before submission
    function validateFormData() {
        let isValid = true;

        // Validate account number (must be non-empty and numeric)
        if (!formData.accountNumber) {
            setErrors(prevErrors => ({
                ...prevErrors,
                accountNumber: "Account number is required",
            }));
            isValid = false;
        } else if (!/^\d+$/.test(formData.accountNumber)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                accountNumber: "Account number must contain only numbers",
            }));
            isValid = false;
        }

        // Validate bank account (must be non-empty and numeric)
        if (!formData.bankAccount) {
            setErrors(prevErrors => ({
                ...prevErrors,
                bankAccount: "Bank account is required",
            }));
            isValid = false;
        } else if (!/^\d+$/.test(formData.bankAccount)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                bankAccount: "Bank account must contain only numbers",
            }));
            isValid = false;
        }

        // Validate amount (must be non-empty and numeric)
        if (!formData.amount) {
            setErrors(prevErrors => ({
                ...prevErrors,
                amount: "Amount is required",
            }));
            isValid = false;
        } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
            setErrors(prevErrors => ({
                ...prevErrors,
                amount: "Amount must be a valid number greater than 0",
            }));
            isValid = false;
        }

        // Validate transfer type (must be selected)
        if (!formData.transferType) {
            setErrors(prevErrors => ({
                ...prevErrors,
                transferType: "Transfer type is required",
            }));
            isValid = false;
        }

        return isValid;
    }


    // Handle form submission
    async function handleSubmit(event) {
        event.preventDefault();

        if (validateFormData()) {
            try {
                const token = localStorage.getItem('token'); // Example: Retrieve token from storage
                const response = await axios.post(
                    "http://localhost:3000/transactions/make-transaction",
                    {
                        senderAccountNumber: formData.accountNumber,
                        receiverAccountNumber: formData.bankAccount,
                        amount: parseFloat(formData.amount),
                        transactionType: formData.transferType,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token in Authorization header
                        },
                    }
                );
              console.log(response.data);
              
                

                if (response.data) {
                    toast.success(response.data.message);
                    setFormData({
                        accountNumber: "",
                        bankAccount: "",
                        amount: "",
                        transferType: "",
                    });
                }
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
                toast.error("Transaction failed: " + error.response?.data?.message || "Please try again.");
            }
        }
    }



    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="input">
                    <Input
                        label="Your Bank Account Number"
                        type="text"
                        id="account"
                        name="account"
                        placeholder="Enter Account or Phone Number"
                        className={`input-field ${errors.accountNumber ? "input-error" : ""}`}
                        value={formData.accountNumber}
                        onChange={(event) => handleInputChange("accountNumber", event.target.value)}
                    />
                    {errors.accountNumber && <span className="error-message">{errors.accountNumber}</span>}
                </div>
                <div className="input">
                    <Input
                        label="Receiver Bank Account Number"
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter Source Bank Account"
                        className={`input-field ${errors.bankAccount ? "input-error" : ""}`}
                        value={formData.bankAccount}
                        onChange={(event) => handleInputChange("bankAccount", event.target.value)}
                    />
                    {errors.bankAccount && <span className="error-message">{errors.bankAccount}</span>}
                </div>
                <div className="input">
                    <Input
                        label="Amount"
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="Enter Amount"
                        className={`input-field ${errors.amount ? "input-error" : ""}`}
                        value={formData.amount}
                        onChange={(event) => handleInputChange("amount", event.target.value)}
                    />
                    {errors.amount && <span className="error-message">{errors.amount}</span>}

                </div>
                <div className="form-field checkboxes">
                    <label>Transfer Type</label>
                    <div className="radio-buttons">
                        <label>
                            <input
                                type="radio"
                                name="transfer-type"
                                value="INSTANT"
                                checked={formData.transferType === "INSTANT"}
                                onChange={(event) => handleInputChange("transferType", event.target.value)}
                            />
                            <span className="radio-btn"></span> Instant
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="transfer-type"
                                value="SCHEDULED"
                                checked={formData.transferType === "SCHEDULED"}
                                onChange={(event) => handleInputChange("transferType", event.target.value)}
                            />
                            <span className="radio-btn"></span> Scheduled
                        </label>
                    </div>
                    {errors.transferType && <span style={{ position: "relative", top: "3px" }} className="error-message">{errors.transferType}</span>}
                </div>

                <div >
                    <button type="submit" className="submit-button  bg-button-bg-color rounded-sm">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SendMoney;
