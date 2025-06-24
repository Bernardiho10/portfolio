import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Button from "../reusable/Button";
import FormInput from "../reusable/FormInput";

const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current
      )
      .then(() => {
        setStatus("success");
        form.current.reset();
      })
      .catch((error) => {
        console.error("Email error:", error);
        setStatus("error");
      });
  };

  return (
    <div className="w-full lg:w-1/2">
      <div className="leading-loose">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
        >
          <p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
            Contact Form
          </p>
          <FormInput
            inputLabel="Full Name"
            labelFor="name"
            inputType="text"
            inputId="name"
            inputName="from_name"
            placeholderText="Your Name"
            ariaLabelName="Name"
          />
          <FormInput
            inputLabel="Email"
            labelFor="email"
            inputType="email"
            inputId="email"
            inputName="from_email"
            placeholderText="Your email"
            ariaLabelName="Email"
          />
          <div className="mt-6">
            <label
              className="block text-lg text-primary-dark dark:text-primary-light mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              name="message"
              className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
              id="message"
              cols="14"
              rows="6"
              aria-label="Message"
            ></textarea>
          </div>

          <div className="font-general-medium w-40 px-4 py-2.5 text-white text-center font-medium tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
            <Button
              title="Send Message"
              type="submit"
              aria-label="Send Message"
            />
          </div>

          {status === "sending" && (
            <p className="text-yellow-500 text-center mt-4">
              Sending your message...
            </p>
          )}
          {status === "success" && (
            <p className="text-green-500 text-center mt-4">
              Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-center mt-4">
              There was an error sending your message. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
