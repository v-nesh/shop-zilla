import styles from "./Contact.module.scss";
import Card from "./../../components/card/Card";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_o7jgt2k",
        "template_nr71wic",
        form.current,
        "9ElHRZbkDGpl00cqo"
      )
      .then(
        (result) => {
          toast.success("Message Sent Successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>
          Contact Us
          <div className={styles.section}>
            <form ref={form} onSubmit={sendEmail}>
              <Card className={styles.card}>
                <label>Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Full Name"
                  required
                />
                <label>Email</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="your email"
                  required
                />
                <label>Subject</label>
                <input
                  type="text"
                  name="user_subject"
                  placeholder="Subject"
                  required
                />
                <label>Message</label>
                <textarea name="message" cols="30" rows="10"></textarea>
                <button className="--btn --btn-primary">Send Message</button>
              </Card>
            </form>
            <div className={styles.details}>
              <Card cardClass={styles.card2}>
                <h3>Our Contact Information</h3>
                <div className={styles.icons}>
                  <span>
                    <FaPhoneAlt size={20} />
                    <p>+91-8789868890</p>
                  </span>
                  <span>
                    <FaEnvelope size={20} />
                    <p>shopzilla@gmail.com</p>
                  </span>
                  <span>
                    <GoLocation size={20} />
                    <p>Chennai, TamilNadu</p>
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </h2>
      </div>
    </section>
  );
};

export default Contact;
