from flask import Flask, request, jsonify
from email.message import EmailMessage
import ssl
import smtplib
from dotenv import load_dotenv
import os

# allow cors
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

# Load environment variables from .env file
load_dotenv()
# Configure your email sender details
EMAIL_SENDER = "akshaychavan.kkwedu@gmail.com"
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()
password = EMAIL_PASSWORD
sender_email = EMAIL_SENDER
smtp_server = "smtp.gmail.com"
port = 465  # Use SSL port
print(EMAIL_SENDER, EMAIL_PASSWORD)

# Function to send an email
def send_email(email, subject, body):
    print(f"Sending email to {email}")
    # Email configuration
    receiver_email = email

    # Create message
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    # Add body to email
    message.attach(MIMEText(body, "plain"))

    try:
        # Create SMTP session with SSL
        with smtplib.SMTP_SSL(smtp_server, port) as server:
            server.login(sender_email, password)
            text = message.as_string()
            server.sendmail(sender_email, receiver_email, text)
        print("Email sent successfully")
        return {"status": "success", "message": "Email sent successfully"}
    except Exception as e:
        print(f"Failed to send email: {e}")
        return {"status": "error", "message": f"Failed to send email: {e}"}

@app.route("/")
def home():
    return "Flask Email Service"

# Flask route to trigger email
@app.route("/send-email", methods=["POST"])
def email_api():
    data = request.json
    receiver = data.get("email")
    subject = data.get("subject", "No Subject")
    body = data.get("body", "")

    if not receiver:
        return jsonify({"status": "error", "message": "Receiver email is required"}), 400

    response = send_email(receiver, subject, body)
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
