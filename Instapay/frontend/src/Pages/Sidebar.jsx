/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./sidebar.css";
import { useState } from "react";

const Sidebar = ({ setHandleTabs ,focus,setFocus}) => {

  function handleOptions(identifier) {
    setHandleTabs({ tab: identifier });
    setFocus(identifier);  // Set the focused item
  }

  return (
    <div className="sidebar">
      <ul className="nav-list">
        <li>
          <a
            className={`nav-item ${focus === "send" ? "focused" : ""}`}
            role="button"
            onClick={() => handleOptions("send")}
          >
            Send Money
          </a>
        </li>
        <li>
          <a
            className={`nav-item ${focus === "receive" ? "focused" : ""}`}
            role="button"
            onClick={() => handleOptions("receive")}
          >
            Received Money
          </a>
        </li>
        <li>
          <a
            className={`nav-item ${focus === "refund" ? "focused" : ""}`}
            role="button"
            onClick={() => handleOptions("refund")}
          >
            Refund & Dispute Resolution
          </a>
        </li>
        <li>
          <a
            className={`nav-item ${focus === "set-transaction-limits" ? "focused" : ""}`}
            role="button"
            onClick={() => handleOptions("set-transaction-limits")}
          >
            Set Transaction Limits
          </a>
        </li>
        <li>
          <a
            className={`nav-item ${focus === "view-history" ? "focused" : ""}`}
            role="button"
            onClick={() => handleOptions("view-history")}
          >
            View History
          </a>
        </li>
        <li>
          <a
            className={`nav-item ${focus === "account-usage" ? "focused" : ""}`}
            role="button"
            onClick={() => handleOptions("account-usage")}
          >
            Account Usage
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
