import React, { useState } from "react";
import PaymentDataService from "../api/PaymentDataService";

const initialState = {
  fullName: "",
  email: "",
  text: "",
};

const Contact = () => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitMessage = (e) => {
    e.preventDefault();
    //message send to server
    // console.log(form)
    PaymentDataService.sendQuery(form).then(
      (response) => {
        if (response.status === 200) {
          document.getElementById("submit-message-success").innerHTML =
            "Message sent successfully";
          setTimeout(() => {
            document.getElementById("submit-message-success").innerHTML = "";
          }, 5000);
        }
      },
      (error) => {
        console.log(error);
        document.getElementById("submit-message-error").innerHTML =
          "Error occured,try again";
        setTimeout(() => {
          document.getElementById("submit-message-success").innerHTML = "";
        }, 5000);
      }
    );
  };

  return (
    <div id="contact">
      <h1>Contact Us</h1>
      <form onSubmit={submitMessage}>
        <span id="submit-message-success" style={{ color: "green" }}></span>
        <span id="submit-message-error" style={{ color: "#d8000c" }}></span>

        <label htmlFor="fullName"></label>
        <input
          name="fullName"
          onChange={handleChange}
          type="text"
          placeholder="Full Name"
          required
        />
        <label htmlFor="email"></label>
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Your Email"
          required
        />
        <label htmlFor="text"></label>
        <textarea
          name="text"
          onChange={handleChange}
          required
          placeholder="Drop us a message.We will contact you shortly..."
        ></textarea>
        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
};

export default Contact;
