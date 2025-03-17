import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendRegistrationEmail = async (
  recipientEmail,
  eventDetails,
  attendeeDetails,
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: `🎉 Registration Confirmed: ${eventDetails.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background: #007bff;
                  color: white;
                  padding: 15px;
                  text-align: center;
                  font-size: 20px;
                  font-weight: bold;
                  border-radius: 8px 8px 0 0;
              }
              .content {
                  padding: 20px;
                  color: #333;
              }
              .event-details, .attendee-details {
                  margin-top: 20px;
                  padding: 15px;
                  background: #f9f9f9;
                  border-radius: 5px;
              }
              .footer {
                  text-align: center;
                  margin-top: 20px;
                  font-size: 14px;
                  color: #666;
              }
              .cta-button {
                  display: inline-block;
                  background: #007bff;
                  color: white;
                  padding: 10px 15px;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 10px;
              }
              .cta-button:hover {
                  background: #0056b3;
              }
                  @media screen and (max-width: 480px) {
              .container {
                width: 90% !important;
                padding: 15px !important;
              }
              .header {
                font-size: 18px !important;
              }
              .cta-button {
                padding: 12px !important;
                font-size: 16px !important;
              }
            }

          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">🎉 Registration Confirmation</div>
              <div class="content">
                  <p>Hello <b>${attendeeDetails.firstname} ${
      attendeeDetails.lastname
    }</b>,</p>
                  <p>Thank you for registering for <b>${
                    eventDetails.name
                  }</b>. Below are the event and your registration details:</p>
                  
                  <div class="event-details">
                      <h3>📅 Event Details:</h3>
                      <p><b>Name:</b> ${eventDetails.name}</p>
                      <p><b>Subtitle:</b> ${eventDetails.subtitle}</p>
                      <p><b>Date:</b> ${eventDetails.date}</p>
                      <p><b>Time:</b> ${eventDetails.timeFrom} - ${
      eventDetails.timeTill
    }</p>
                      <p><b>Location:</b> ${eventDetails.address}, ${
      eventDetails.city
    }</p>
                      <p><b>Description:</b> ${eventDetails.description}</p>
                  </div>

                  <div class="attendee-details">
                      <h3>👤 Your Registration Details:</h3>
                      <p><b>Name:</b> ${attendeeDetails.firstname} ${
      attendeeDetails.lastname
    }</p>
                      <p><b>Email:</b> ${attendeeDetails.email}</p>
                      <p><b>Phone:</b> ${
                        attendeeDetails.phonenumber || 'N/A'
                      }</p>
                      <p><b>Company:</b> ${
                        attendeeDetails.companyname || 'N/A'
                      }</p>
                      <p><b>Job Title:</b> ${
                        attendeeDetails.jobtitle || 'N/A'
                      }</p>
                  </div>

                  <p>We are excited to have you at the event! If you have any questions, feel free to contact us.</p>

               
              </div>
              <div class="footer">
                  © ${new Date().getFullYear()} Event Organizer | All Rights Reserved
              </div>
          </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Registration email sent successfully.');
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};
