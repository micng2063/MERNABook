import React, { useState } from "react";
import axios from "axios";
import Footer from "../footer/footer";

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    await axios.post('http://localhost:5050/email/inquiry', {
      to: ["mernabook2024@gmail.com", "micnguyen2063@gmail.com"],
      subject: 'Contact: ' + subject,
      text: `From: ${name} (${email})\n\nMessage:\n\n${message}`,
    });

    setTimeout(() => {
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };


  return (
    <div>
      <div className="bg-primary" style={{ height: "300px", backgroundImage: "url('https://i.imgur.com/Ko4Cntc.png')", backgroundSize: "cover" }}></div>
      <div className="container-fluid pb-3" style={{ marginTop: "-200px", width: "80vw" }}>
        <h2 className="section-title text-white px-2">Contact Us</h2>

        <div className="bg-light" style={{ padding: "20px 20px" }}>
          <div className="row">
            <div className="col-md-4 border-right">
              <div className="py-3 pt-5">
                <h6 className="section-title position-relative text-primary text-uppercase text-center">
                  <span className="bg-white"><i className="fas fa-map-marker-alt fa-2x pr-2 " />Address</span>
                </h6>
                <p className="mb-2 text-center">601 University Dr</p>
                <p className="mb-2 text-center">San Marcos, TX 78666</p>
              </div>

              <div className="py-3">
                <h6 className="section-title position-relative text-primary text-uppercase text-center">
                  <span className="bg-white"><i className="fas fa-envelope fa-2x pr-2 " />Email
                  </span>
                </h6>
                <p className="mb-2 text-center">https://www.txst.edu/</p>
              </div>

              <div className="py-3">
                <h6 className="section-title position-relative text-primary text-uppercase text-center">
                  <span className="bg-white"><i className="fas fa-phone-alt fa-2x pr-2 " />Phone
                  </span>
                </h6>
                <p className="mb-2 text-center">(512) 245-2111</p>
              </div>
            </div>

            <div className="col-md-8 pl-5">
              <h4 className="section-title position-relative text-primary text-uppercase">
                Send us a message
              </h4>
              <div className=" border-bottom mt-2 mb-2"></div>
              <p>If you have any questions about your order or need assistance, please don't hesitate to send us a message. We're here to help!</p>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="control-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="control-group">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="control-group">
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="control-group">
                  <textarea
                    className="form-control"
                    rows="3"
                    id="message"
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-block bg-primary text-white font-weight-bold px-5" >Send Message</button>
                  {success && <p className="text-success mt-2">Email sent! We will get back to you as soon as we can!</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
