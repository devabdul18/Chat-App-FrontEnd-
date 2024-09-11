import "react-toastify/dist/ReactToastify.css";
import "../../styles/login.scss";
import { useState } from "react";
// import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginFetch } from "../../redux/slice/AuthSlice";
import { fetchProfile } from "../../redux/slice/ProfileSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { Theme, toggleTheme } = useTheme();
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const handleInput = (e: any) => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const [errorPopup, setErrorPopup] = useState("");

    const errorHandling = () => {
        if (inputs.username.length === 0) {
            toast.error("Please Enter Username");
        } else if (inputs.password.length === 0) {
            toast.error("Please Enter Password");
        } else {
            setErrorPopup("");
        }
    };

    const handleForm = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        errorHandling();

        const payload = {
            username: inputs.username,
            password: inputs.password,
        };

        await dispatch(loginFetch(payload));

        await dispatch(fetchProfile());

        setInputs({
            username: "",
            password: "",
        });

        // let form = e.target;
        // let formData = new FormData(form);
        // let formObj = Object.fromEntries(formData.entries());
        // console.log(formObj);
    };

    const handleNavigate = () => {
        navigate("/signup");
    };

    return (
        <div className="login_container">
            <div className="login_header">Login to Chat App</div>
            {/* <div className="mode_changer">
                <label>
                    <input type="checkbox" onChange={toggleTheme} checked={Theme === "dark"} />
                    <span className="slider mode"></span>
                </label>
            </div> */}
            <form className="login_form" onSubmit={handleForm}>
                {errorPopup && <p className="error_popup">{errorPopup}</p>}
                <input
                    className="username"
                    name="username"
                    type="text"
                    value={inputs.username}
                    placeholder="Username"
                    onChange={handleInput}
                    autoFocus
                />

                <input
                    className="password"
                    name="password"
                    type="password"
                    value={inputs.password}
                    placeholder="Password"
                    onChange={handleInput}
                />

                <button type="submit" className="login_btn">
                    Login
                </button>
            </form>
            <div className="xyz">
                <div className="or">Or</div>
                <div className="login_footer">
                    Don't have an account?{" "}
                    <span onClick={handleNavigate} className="login_span">
                        {" "}
                        Sign Up
                    </span>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
export default Login;
