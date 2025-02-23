const flaskEndpoint = 'http://127.0.0.1:5000/send-email';

const sendEmail = async (email, subject, body) => {
  try {
    const response = await fetch(flaskEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, subject, body })
    });

    if (response.ok) {
      console.log('Email sent successfully');
    } else {
      console.log('Failed to send email');
    }
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

// sendEmail('sarthak.shastri@gmail.com', 'Test Email', 'This is a test email');

export default sendEmail;
