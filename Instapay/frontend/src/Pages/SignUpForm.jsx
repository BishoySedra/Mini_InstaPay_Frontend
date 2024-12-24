import {useState } from "react";
import { motion } from "framer-motion";
import DollarLogo from "../assets/InstaPayIcon.svg";
import axios from "axios";  // Import Axios for API requests
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import Eye icons
import { toast } from "react-toastify";


const SignUpForm = ({ setMoveImage, loginMove, setLoginMove, setSignUpButton }) => {
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        phone: "",
    });
    const [enteredValues, setEnteredValues] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const emailRegex = /^[^\s@]+@[a-zA-Z0-9-]+\.(com)$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;
    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    function handleInputChange(identifier, value) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [identifier]: "",
        }));
        setEnteredValues((prevEnteredValues) => ({
            ...prevEnteredValues,
            [identifier]: value,
        }));
    }

    function validateEmail() {
        if (!enteredValues.email) return "Email is required.";
        if (!emailRegex.test(enteredValues.email)) return "Please enter a valid email address with '.com' domain.";

        return "";
    }

    function validatePassword() {
        if (!enteredValues.password) return "Password is required.";
        if (!passwordRegex.test(enteredValues.password)) {
            return "Password must contain at least 8 characters, one uppercase letter, one number, and one special character.";
        }
        return "";
    }

    function validatePhone() {
        if (!enteredValues.phone) return "Phone number is required.";
        if (!phoneRegex.test(enteredValues.phone)) {
            return "Please enter a valid phone number (e.g., +1234567890 or (123) 456-7890).";
        }
        return "";
    }

    // Function to handle the signup form submission
    async function handleSignUp(event) {
        event.preventDefault();
    
        const emailErrorMessage = validateEmail();
        const passwordErrorMessage = validatePassword();
        const phoneErrorMessage = validatePhone();
    
        if (emailErrorMessage || passwordErrorMessage || phoneErrorMessage) {
            setErrors({
                email: emailErrorMessage,
                password: passwordErrorMessage,
                phone: phoneErrorMessage,
            });
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', {
                name: enteredValues.name,
                email: enteredValues.email,
                password: enteredValues.password,
                address: enteredValues.address,
                phone: enteredValues.phone,
            });
            
            console.log("Sign Up successful!", response.data);
            // Reset form and errors if signup is successful
            setEnteredValues({
                name: "",
                email: "",
                password: "",
                address: "",
                phone: "",
            });
            setErrors({
                email: "",
                password: "",
                phone: "",
            });
    
            toast.success("Signup successful! Please head to the login page again.");
            setMoveImage(0);
            setLoginMove(0);
            setSignUpButton((prev) => !prev);
          
        } catch (error) {
            console.error("Signup error:", error);
    
            // Handle specific error from backend (email or phone taken)
            if (error.response && error.response.data.message) {
                const errorMessage = error.response.data.message;
                if (errorMessage === "Email already in use") {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: "This email is already taken. Please use another one.",
                    }));
                } else if (errorMessage === "Phone number already in use") {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        phone: "This phone number is already taken. Please use another one.",
                    }));
                }
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "An error occurred. Please try again later.",
                }));
            }
        }
    }
    
    

    return (
        <motion.div animate={{ x: loginMove }} className="w-1/2 p-12 flex flex-col justify-center bg-white mr-10">
            <div className="text-center">
                <img src={DollarLogo} alt="Robot Photo" className="w-[100px] mx-auto mb-6" />
                <h2 className="text-3xl font-semibold text-welcome-text-h2 mb-4">Join us by creating an account</h2>
                <h1 className="text-7xl font-bold text-welcome-text-h1">Hi There!</h1>
            </div>
            <form className="space-y-6 mt-6" onSubmit={handleSignUp}>
                {/* Name Field */}
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-bold text-purple-800">
                        Name
                    </label>
                    <input
                        id="name"
                        className="w-full p-3 text-sm border rounded-md border-gray-300"
                        onChange={(event) => handleInputChange("name", event.target.value)}
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={enteredValues.name}
                    />
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-bold text-purple-800">
                        Address
                    </label>
                    <input
                        value={enteredValues.address}
                        id="address"
                        className="w-full p-3 text-sm border rounded-md border-gray-300"
                        onChange={(event) => handleInputChange("address", event.target.value)}
                        type="text"
                        placeholder="Enter your address"
                        required
                    />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                    <label htmlFor="phone" className={`block text-sm font-bold ${errors.phone ? "text-red-500" : "text-purple-800"}`}>
                        Phone Number
                    </label>
                    <input
                        value={enteredValues.phone}
                        id="phone"
                        className={`w-full p-3 text-sm border rounded-md ${errors.phone ? "border-red-400 bg-red-100" : "border-gray-300"
                            }`}
                        onChange={(event) => handleInputChange("phone", event.target.value)}
                        type="tel"
                        placeholder="Enter your phone number"
                    />
                    <p className={`text-red-500 text-sm mt-1 h-5`}>{errors.phone || ""}</p>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <label htmlFor="email" className={`block text-sm font-bold ${errors.email ? "text-red-500" : "text-purple-800"}`}>
                        Email
                    </label>
                    <input
                        value={enteredValues.email}
                        id="email"
                        className={`w-full p-3 text-sm border rounded-md ${errors.email ? "border-red-400 bg-red-100" : "border-gray-300"}`}
                        onChange={(event) => handleInputChange("email", event.target.value)}
                        type="email"
                        placeholder="Enter your email"
                    />
                    <p className={`text-red-500 text-sm mt-1 h-5`}>{errors.email || ""}</p>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label htmlFor="password" className={`block text-sm font-bold ${errors.password ? "text-red-500" : "text-purple-800"}`}>
                        Password
                    </label>
                    <div className="relative">
                        <input
                        value={enteredValues.password}
                            id="password"
                            className={`w-full p-3 text-sm border rounded-md ${errors.password ? "border-red-400 bg-red-100" : "border-gray-300"
                                }`}
                            onChange={(event) => handleInputChange("password", event.target.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                          {showPassword ? (
                                    <AiOutlineEye size={20} /> // Eye icon when password is hidden
                                    
                                ) : (
                                    <AiOutlineEyeInvisible size={20} /> // Eye icon when password is visible
                                )}
                        </button>
                    </div>
                    <p className={`text-red-500 text-sm mt-1 h-5`}>{errors.password || ""}</p>
                </div>

                {/* Terms and Conditions */}
                <p className="text-xs text-gray-500 text-center mt-3">
                    Use 8 or more characters with at least one capital letter, one number, and one special character.
                    <br />
                    By signing up, you agree to the{" "}
                    <a className="text-purple-600 font-bold" href="#">
                        Terms of Use
                    </a>{" "}
                    and{" "}
                    <a className="text-purple-600 font-bold" href="#">
                        Privacy Policy
                    </a>
                    .
                </p>

                {/* Sign Up Button */}
                <button
                    type="submit"
                    className="ml-14 w-[392px] bg-social-button text-white p-3 rounded-md hover:bg-purple-700 transition mb-4"
                >
                    Sign Up
                </button>
            </form>

            {/* Link to Login */}
            <p className="text-center mt-3 mb-8">
                <span>Already have an account?</span>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setMoveImage(0);
                        setLoginMove(0);
                        setSignUpButton((prev) => !prev);
                    }}
                    className="text-social-button font-bold"
                >
                    Log in
                </a>
            </p>
        </motion.div>
    );
};

export default SignUpForm;
