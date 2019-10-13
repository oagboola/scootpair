## SCOOTPAIR

# Set up
- the database needs to be pre-populated with existing users. The users collection is structured as `{"phone":1234, "vin": 8765, "locked": false, "paired": false, "disabled": false, "locked": true}`. Refer to the `POST /users` endpoint to create a new user

- user docker-compose up to start the app

- app runs on http://localhost:3000

# Endpoints

- `POST /initiate-pair` : Initiates pairing process
    - sample payload: `{  "user": "5da2182ba308cc206d2a2f1a" }`

- `POST /validate_otp`: Validate the OTP inputed by the user
    - sampe payload: `{ "user": "5da2182ba308cc206d2a2f1a", "code": 3738 }`

- `POST /validate_pair`: Validate the pairing code
    - sample payload: `{ "user": "5da2182aa308cc206d2a2f18", "code": 93048 }`

- `POST /unlock`
    - sample payload: `{ "user": "5da22bf9a308cc206d2a2f1b" }`
    - header required: `{ auth: "admin" }`

- `POST /reset`
    - sample payload: `{ "user": "5da22bf9a308cc206d2a2f1b" }`
    - header required: `{ auth: "admin" }`

- `GET /history`
    - header required: `{ auth: "admin" }`

- `POST /users`
    - sample payload: `{"phone":1234, "vin": 8765, "locked": false, "paired": false, "disabled": false, "locked": true}`

# App flow
  The user initiates the pairing process; this triggers an OTP to be sent to the user. The OTP is entered into the app by the user and the OTP is validated; if valid, the user receives a pairing code which is also validated by the backend. If the OTP is invalid, the user is allowed to try 2 more times, if all attempts failed. The user account is loacked and has to be reset by a Customer Agent. However if OTP and pairing code have been succefully validated. The use is allowed to unlock the scooter. The user is allowed 2 minutes from when they receive the pairing code to enter it. If the code is not entered within 2 minutes, the account is locked.

  A more elaborate flow is available [here](https://docs.google.com/document/d/1e-oKidI3CjZx0SEwOXPDuMocb-hLdFYb21iZJCuYP_Q/edit?usp=sharing)
