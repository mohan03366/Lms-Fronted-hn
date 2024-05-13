import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { isValidEmail } from "../Helpers/regexMatcher";
import axios from "axios";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function HandleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!userInput.name || !userInput.email || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isValidEmail(userInput.email)) {
      toast.error("Invalid email");
      return;
    }

    try {
      const response = axios.post(
        "http://localhost:5006/api/v1/misc/contact",
        userInput
      );

      toast.promise(response, {
        loading: "Submitting your message...",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });

      const contactResponse = response.data;

      console.log("Response:", contactResponse);

      if (contactResponse && contactResponse.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
        toast.success("Form submitted successfully");
      }
    } catch (error) {
      console.error("Error:", error); // Log the error for debugging
      toast.error("Failed to submit the form. Please try again later.");
    }
  }

  return (
    <HomeLayout>
      <div className="flex item-center justify-center h-[90vh]">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
        >
          <h1 className="text-3xl font-semibold">Contact Form</h1>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              className="bg-transparent-border px-2 py-1 rounded-sm"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              onChange={HandleInputChange}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              className="bg-transparent-border px-2 py-1 rounded-sm"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={HandleInputChange}
              value={userInput.email}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent-border px-2 py-1 rounded-sm resize-none h-40"
              id="message"
              name="message"
              placeholder="Enter your message"
              onChange={HandleInputChange}
              value={userInput.message}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-400 rounded-sm transition-all in ease-out duration-300 py-2 font-semibold text-lg cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
