# API Reference

This document provides a complete reference for all RESTful endpoints exposed by the Veltrix Express.js backend.

## 1. Authentication Endpoints (`/register`, `/login`, `/verify_email`)

Controller: `backend/src/controllers/authController.js`

---

### `POST /register`

Handles user registration, creates a new user in the database, and sends a verification email.

| Property | Type | Description |
| :--- | :--- | :--- |
| **Request Body** | `object` | Contains user credentials. |
| `req.body.username`| `string` | The desired username. |
| `req.body.email`| `string` | The user's email address. |
| `req.body.password`| `string` | The user's chosen password (plain text). |

| Response Code | Description |
| :--- | :--- |
| **201 Created**| Success message with instructions to check email. |
| **400 Bad Request**| Error if user already exists. |
| **500 Internal Server Error**| Server error during registration or email sending. |

---

### `POST /verify_email`

Verifies a user's email address using a token sent in the registration email.

| Property | Type | Description |
| :--- | :--- | :--- |
| **Request Body** | `object` | Contains the verification token. |
| `req.body.token` | `string` | The unique verification token. |

| Response Code | Description |
| :--- | :--- |
| **200 OK**| Success message. |
| **400 Bad Request**| Error for invalid or expired token. |
| **500 Internal Server Error**| Server error during verification. |

---

### `POST /login`

Handles user login and returns essential user data upon success.

| Property | Type | Description |
| :--- | :--- | :--- |
| **Request Body** | `object` | Contains login credentials. |
| `req.body.email`| `string` | The user's email address. |
| `req.body.password`| `string` | The user's password (plain text). |

| Response Code | Description |
| :--- | :--- |
| **200 OK**| Success object containing the user's non-sensitive profile data (`user_id`, `username`, `email`, `is_admin`) and a message. |
| **401 Unauthorized**| Error for invalid credentials. |
| **403 Forbidden**| Error if the email is not verified. |
| **500 Internal Server Error**| Server error during login. |

## 2. User Management Endpoints (`/users`, `/user/:user_id`)

Controller: `backend/src/controllers/userController.js`

---

### `GET /users`

Retrieves a list of all users, ordered by creation date (DESC). **Restricted to administrators.**

| Property | Type | Description |
| :--- | :--- | :--- |
| **Query Parameter** | `object` | Authentication check. |
| `req.query.user_id`| `string` | The ID of the authenticated user. |

| Response Code | Description |
| :--- | :--- |
| **200 OK**| An array of all user objects (admin only). |
| **403 Forbidden**| Access Forbidden: Only administrators can view all users. |
| **500 Internal Server Error**| Database error. |

---

### `PUT /user/:user_id`

Updates a user's profile (username and/or email).

| Property | Type | Description |
| :--- | :--- | :--- |
| **Route Parameter**| `string` | The ID of the user to update. |
| **Request Body**| `object` | New profile data. |
| `req.body.username`| `string` | The new username. |
| `req.body.email`| `string` | The new email address. |

| Response Code | Description |
| :--- | :--- |
| **200 OK**| Success object with the updated user data. |
| **400 Bad Request**| Error if the provided email is already in use by another user. |
| **404 Not Found**| Error if the `user_id` is not found. |
| **500 Internal Server Error**| Server error during profile update. |

---

### `DELETE /user/:user_id`

Deletes a user account and all associated trades. **Requires password confirmation.**

| Property | Type | Description |
| :--- | :--- | :--- |
| **Route Parameter**| `string` | The ID of the user whose account should be deleted. |
| **Request Body**| `object` | Password confirmation. |
| `req.body.password`| `string` | The user's current password (plain text). |

| Response Code | Description |
| :--- | :--- |
| **200 OK**| Success message. |
| **401 Unauthorized**| Error for incorrect password. |
| **404 Not Found**| Error if the `user_id` is not found. |
| **500 Internal Server Error**| Server error during account deletion. |

## 3. Trade and Session Endpoints (`/trade`, `/trades`, `/session`)

Controller: `backend/src/controllers/tradeController.js`

---

### `GET /session`

Retrieves a list of all predefined trading sessions.

| Response Code | Description |
| :--- | :--- |
| **200 OK**| An array of session objects. |
| **500 Internal Server Error**| Database error. |

---

### `GET /trade_calendar`

Retrieves trade data for a specific month, optimized for the calendar view. Filters by `user_id` unless the user is an admin.

| Property | Type | Description |
| :--- | :--- | :--- |
| **Query Parameter**| `object` | Filtering parameters. |
| `req.query.date`| `string` | A date string (e.g., '2024-01-01') representing the start of the month to query. |
| `req.query.user_id`| `string` | The ID of the authenticated user. |

| Response Code | Description |
| :--- | :--- |
| **200 OK**| An array of simplified trade objects (`trade_id`, `exit_date`, `pnl`, `outcome`). |
| **500 Internal Server Error**| Database error. |

---

### `GET /trade`

Retrieves all detailed trades for a specific user, or all trades for an admin. Joins with session and tags data.

| Property | Type | Description |
| :--- | :--- | :--- |
| **Query Parameter**| `object` | User filtering. |
| `req.query.user_id`| `string` | The ID of the authenticated user. |

| Response Code | Description |
| :--- | :--- |
| **200 OK**| An array of detailed trade objects including `session_name` and `tags`. |
| **500 Internal Server Error**| Database error. |

---

### `POST /trades`

Creates a new trade record in the database and optionally links it to tags.

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Request Body**| `object` | - | Trade details. |
| `user_id`| `string` | - | ID of the user creating the trade. |
| `asset`| `string` | - | Trading asset/pair. |
| `direction`| `('Buy'\|'Sell')` | - | Trade direction. |
| `entry_date`| `string` | - | Entry timestamp/date. |
| `exit_date`| `string` | - | Exit timestamp/date. |
| `size`| `number` | - | Position size/lot size. |
| `pnl`| `number` | `null` | Profit and Loss amount. |
| `outcome`| `('Win'\|'Loss'\|'BE')` | `null` | Trade outcome. |
| `session_id`| `string` | `null` | The ID of the associated session. |
| `strategy`| `string` | `null` | The strategy used for the trade. |
| `is_reviewed`| `boolean` | `false` | Whether the trade has been reviewed. |
| `notes`| `string` | `null` | Notes and reflection for the trade. |
| `tags`| `string[]` | `[]` | An array of tag IDs (UUIDs) to associate with the trade. |

| Response Code | Description |
| :--- | :--- |
| **201 Created**| The newly created trade object including its tags. |
| **500 Internal Server Error**| Server error during creation or tag association. |

---

### `DELETE /trade/:trade_id`

Deletes a single trade record by its ID.

| Property | Type | Description |
| :--- | :--- | :--- |
| **Route Parameter**| `string` | The ID of the trade to delete. |

| Response Code | Description |
| :--- | :--- |
| **200 OK**| Success message. |
| **404 Not Found**| Error if the trade ID is not found. |
| **500 Internal Server Error**| Database error. |

## 4. Tag Management Endpoints (`/tags`)

Controller: `backend/src/controllers/tagController.js`

---

### `GET /tags`

Retrieves all custom tags belonging to a specific user.

| Property | Type | Description |
| :--- | :--- | :--- |
| **Query Parameter**| `object` | Filtering parameter. |
| `req.query.user_id`| `string` | The ID of the authenticated user. |

| Response Code | Description |
| :--- | :--- |
| **200 OK**| An array of tag objects. |
| **500 Internal Server Error**| Database error. |

---

### `POST /tags`

Creates a new tag associated with a user.

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Request Body**| `object` | - | New tag details. |
| `req.body.user_id`| `string` | - | The ID of the user creating the tag. |
| `req.body.tag_name`| `string` | - | The name of the new tag (e.g., 'Impulse'). |
| `req.body.tag_type`| `string` | `'general'`| The category of the tag (e.g., 'Strategy', 'Psychology'). |
| `req.body.tag_color`| `string` | `'blue'`| The color code/name for the tag display. |

| Response Code | Description |
| :--- | :--- |
| **201 Created**| The newly created tag object. |
| **500 Internal Server Error**| Database error. |

---

### `DELETE /tags/:tag_id`

Deletes a tag specified by its ID. Deletes all associated `trade_tags` entries via CASCADE.

| Property | Type | Description |
| :--- | :--- | :--- |
| **Route Parameter**| `string` | The ID of the tag to delete. |

| Response Code | Description |
| :--- | :--- |
| **200 OK**| Success message. |
| **404 Not Found**| Error if the tag ID is not found. |
| **500 Internal Server Error**| Database error. |