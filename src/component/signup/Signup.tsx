import "../../styles/signup.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupFetch } from "../../redux/slice/AuthSlice";
import { fetchProfile } from "../../redux/slice/ProfileSlice";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<any | {}>({
        fullName: "",
        username: "",
        password: "",
        confirmpassword: "",
        gender: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const { fullName, username, password, confirmpassword } = formData;
    const errorHandle = () => {
        setTimeout(() => {
            setErrorMessage("");
        }, 2000);
        if (!fullName) {
            toast.error("Please Enter full name!");
            return;
        } else if (!username) {
            toast.error("Please Enter username!");
        } else if (!password) {
            toast.error("Please Enter Password!");
        } else if (!confirmpassword) {
            toast.error("Please Enter Confirm Password");
        } else {
            setErrorMessage("");
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        errorHandle();

        const payload = {
            fullName: formData.fullName,
            username: formData.username,
            password: formData.password,
            confirmPassword: formData.confirmpassword,
            gender: formData.gender,
        };
        console.log(payload);

        await dispatch(signupFetch(payload));
        await dispatch(fetchProfile());
        // console.log(payload);
        setFormData({
            fullName: "",
            username: "",
            password: "",
            confirmpassword: "",
            gender: "",
        });
    };

    const handleNavigate = () => {
        navigate("/login");
    };

    return (
        <div className="container_signup">
            <div className="signup_details">Sign Up to Chat App</div>
            <form className="input_fields" onSubmit={handleSubmit}>
                {errorMessage && <p className="error_message">{errorMessage}</p>}

                <input
                    className="username"
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    name="fullName"
                    onChange={handleChange}
                    autoFocus
                />

                <input
                    className="email"
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={formData.Username}
                    onChange={handleChange}
                />

                <input
                    className="password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <input
                    className="cpassword"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmpassword"
                    value={formData.confirmpassword}
                    onChange={handleChange}
                />
                <div className="gender">
                    <label>
                        <input name="gender" type="checkbox" value="male" checked={formData.gender === "male"} onChange={handleChange} />
                        Male
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="female"
                            name="gender"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                        />
                        Female
                    </label>
                </div>

                <button className="signup_btn" type="submit">
                    Sign Up
                </button>
                <span className="span_signup">
                    Already have an Account?
                    <span className="jumpto_login" onClick={handleNavigate}>
                        {" "}
                        Login
                    </span>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup;
