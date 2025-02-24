JWT Authentication API Testing Guide
This guide provides step-by-step instructions for testing the JWT Authentication API using Postman.

Prerequisites
Postman Installed: Download and install Postman from here.

API Running: Ensure the Node.js backend is running locally at http://localhost:3000.

API Endpoints
Method	Endpoint	Description
POST	/auth/register	Register a new user.
POST	/auth/login	Login and receive a JWT token.
GET	/api/protected	Access a protected route.
Step 1: Set Up Postman
Open Postman.

Create a new collection:

Click on Collections in the sidebar.

Click New Collection and name it (e.g., JWT Auth API).

Step 2: Test the Registration Endpoint
Create a POST Request:

Set the request method to POST.

Enter the URL: http://localhost:3000/auth/register.

Set the Request Body:

Go to the Body tab.

Select raw and choose JSON from the dropdown.

Add the following JSON payload:

json
Copy
{
  "username": "testuser",
  "password": "testpassword"
}
Send the Request:

Click the Send button.

You should receive a 201 Created response with the message:

json
Copy
{
  "message": "User registered successfully"
}
Step 3: Test the Login Endpoint
Create a POST Request:

Set the request method to POST.

Enter the URL: http://localhost:3000/auth/login.

Set the Request Body:

Go to the Body tab.

Select raw and choose JSON from the dropdown.

Add the following JSON payload:

json
Copy
{
  "username": "testuser",
  "password": "testpassword"
}
Send the Request:

Click the Send button.

You should receive a 200 OK response with a JWT token:

json
Copy
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Save the Token:

Copy the token from the response. You'll use it to access protected routes.

Step 4: Test the Protected Route
Create a GET Request:

Set the request method to GET.

Enter the URL: http://localhost:3000/api/protected.

Set the Authorization Header:

Go to the Headers tab.

Add a new header with the following key-value pair:

Key: Authorization

Value: Bearer <your-token> (replace <your-token> with the token you received from the login request).

Send the Request:

Click the Send button.

You should receive a 200 OK response with the protected data:

json
Copy
{
  "message": "This is a protected route",
  "user": {
    "userId": "64f1b2c3e4b0f5a6d7e8f9a0",
    "username": "testuser",
    "iat": 1633024800,
    "exp": 1633028400
  }
}
Step 5: Test Error Cases
Invalid Registration
Try registering with the same username again. You should get a 400 Bad Request response with the message: "User already exists".

Invalid Login
Try logging in with an incorrect username or password. You should get a 400 Bad Request response with the message: "Invalid credentials".

Unauthorized Access
Try accessing the protected route without providing a token or with an invalid token. You should get a 401 Unauthorized or 403 Forbidden response.

Step 6: Use Environment Variables (Optional)
To avoid manually copying and pasting the JWT token, you can use Postman's environment variables:

Create an Environment:

Click on the gear icon in the top-right corner and select Manage Environments.

Create a new environment (e.g., JWT Auth).

Add a variable called token.

Set the Token Variable:

In the Tests tab of the Login request, add the following script:

javascript
Copy
pm.environment.set("token", pm.response.json().token);
Use the Token Variable:

In the Authorization header for the protected route, use Bearer {{token}}.

Step 7: Automate Testing (Optional)
You can use Postman's Collection Runner or Monitors to automate testing of your API. This is useful for continuous integration and regression testing.

Troubleshooting
API Not Running: Ensure the Node.js server is running on http://localhost:3000.

Database Connection: Ensure MongoDB is running and the connection string in config/db.js is correct.

Invalid Token: If the token is expired or invalid, you'll get a 403 Forbidden response. Log in again to get a new token.

Support
For any issues or questions, please open an issue in the repository or contact the maintainer.

Happy Testing! 🚀