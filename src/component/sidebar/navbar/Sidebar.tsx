import { NavLink } from "react-router-dom";
import { BsFillChatSquareFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { RiEqualizerFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutFetch } from "../../../redux/slice/AuthSlice";
import { resetProfile } from "../../../redux/slice/ProfileSlice";
import "../../../styles/sidebar.scss";

const Sidebar = ({ setActiveComponent }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logoutFetch());
        dispatch(resetProfile());
        navigate("/login");
    };

    return (
        <div className="sidebar_menu">
            <ul className="menu_list">
                <li className="menu_items" onClick={() => setActiveComponent("Chats")}>
                    <NavLink to="/chats" className="active">
                        <i>
                            <BsFillChatSquareFill className="icons" />
                        </i>
                        All Chats
                    </NavLink>
                </li>
                <li className="menu_items">
                    <NavLink to="/profile" className="active">
                        <i>
                            <FaUser className="icons" />
                        </i>
                        Profile
                    </NavLink>
                </li>
                <li className="menu_items" onClick={() => setActiveComponent("Contacts")}>
                    <i>
                        <FaUserFriends className="icons" />
                    </i>
                    Contacts
                </li>
                <li className="menu_items">
                    <NavLink to="/edit" className="active">
                        <i>
                            <RiEqualizerFill className="icons" />
                        </i>{" "}
                        Edit
                    </NavLink>
                </li>
                <li onClick={handleLogout} className="menu_items">
                    {" "}
                    <i>
                        <BiLogOut className="icons" />
                    </i>
                    Logout
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
