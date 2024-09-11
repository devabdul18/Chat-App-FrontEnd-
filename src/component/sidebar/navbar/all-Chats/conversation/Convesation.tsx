import { useState } from "react";
import "../../../../../styles/conversation.scss";
import { CiSearch } from "react-icons/ci";

const Conversation = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="conversations">
      <div className="reciever_name">
        UserName
        <div className="search_input" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <div className={`input_field${isHovered ? "show_input" : ""}`}>
            <input type="text" placeholder="Search" />
          </div>
          <CiSearch className="search_icon" />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
