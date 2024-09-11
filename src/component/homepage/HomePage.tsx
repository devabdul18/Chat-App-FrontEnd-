import "../../styles/homepage.scss";
import user from "../../assets/user.png";
import Sidebar from "../sidebar/navbar/Sidebar";
import Chats from "../sidebar/navbar/all-Chats/Chats";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Contacts from "../sidebar/navbar/contacts/Contacts";
import Conversation from "../sidebar/navbar/all-Chats/conversation/Convesation";

const Homepage = () => {
    const contacts = [
        { id: 1, name: "John", message: "Hey how are you ?", img: user },
        {
            id: 2,
            name: "Cena",
            message: "Good to see you so well and enthusiastic. I know you have worked out so well for this",
            img: user,
        },
        { id: 3, name: "Doe", message: "Lorem ipsum dolor sit amet consectetur .", img: user },
        { id: 4, name: "Alex", message: "Lorem ipsum dolor sit amet consectetur .", img: user },
        { id: 5, name: "Alexis", message: "Lorem ipsum dolor sit amet consectetur  .", img: user },
        { id: 6, name: "Sanchez", message: "Lorem ipsum dolor sit amet consectetur .", img: user },
        { id: 7, name: "Joe", message: "Lorem ipsum dolor sit amet consectetur .", img: user },
        { id: 8, name: "Dan", message: "Lorem ipsum dolor sit amet consectetur .", img: user },
        { id: 9, name: "Doe", message: "Lorem ipsum dolor sit amet consectetur .", img: user },
        { id: 10, name: "Alex", message: "Lorem ipsum dolor sit amet consectetur .", img: user },
    ];

    const [activeComponent, setActiveComponent] = useState("Chats");
    const [searchinput, setSearchInput] = useState("");

    const renderComponent = () => {
        switch (activeComponent) {
            case "Chats":
                return <NavLink to="/chats" />;
            case "Contacts":
                return <Contacts />;
            default:
                return <Chats />;
        }
    };

    const bew = "";
    const filteredContacts = contacts.filter((val) => {
        if (searchinput === "") {
            return val;
        } else if (val.name.toLowerCase().includes(searchinput.toLowerCase())) {
            return val;
        } else if (val.message.toLowerCase().includes(searchinput.toLowerCase())) {
            return val;
        }
    });

    return (
        <div className="homepage_container">
            <div className="logs">
                <div className="user_details">
                    <Sidebar setActiveComponent={setActiveComponent} />
                </div>
            </div>
            <div className="chats">
                {renderComponent()}
                <div className="input_search">
                    <input type="text" placeholder="Search" value={searchinput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
                <div className="user_list">
                    {filteredContacts.map(({ id, name, message, img }) => {
                        return (
                            <div className="user_details" key={id}>
                                <div className="avatar">
                                    <img src={img} alt="avatar" />
                                    <div className="user_info">
                                        <h2>{name}</h2>

                                        <div className="user_message">
                                            <p>{message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Conversation />
        </div>
    );
};

export default Homepage;
