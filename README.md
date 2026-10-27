# EcoCity — Backend + Existing UI

This project packages your uploaded `index.html` and `style.css` with a Node.js + Express backend. The frontend is served by the same server, so it can be hosted together as one project.

## Requirements
- Node.js LTS installed on your computer/server
- Terminal or VS Code

## Run locally
1. Extract `EcoCity_Backend_Project.zip`.
2. Open the extracted folder in VS Code.
3. In the terminal, make sure you are inside the folder containing `package.json`.
4. Run:

   ```bash
   npm install
   npm start
   ```

5. Open `http://localhost:3000`.

Do not open `public/index.html` by double-clicking it. Use the localhost URL so the frontend can call the API.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/status` | Check server |
| GET | `/api/collection-points` | Read collection points |
| GET | `/api/collection-points?search=plastic` | Search collection points |
| GET | `/api/stats` | Read demo dashboard statistics |
| POST | `/api/reports` | Submit a citizen waste report |
| GET | `/api/reports` | Read submitted reports |
| GET | `/api/reports/1` | Read one report |
| PATCH | `/api/reports/1/status` | Update report status |
| DELETE | `/api/reports/1` | Delete a report |

Reports are submitted from the existing Report form. Optional image uploads are stored in the `uploads` folder and limited to 5 MB. Only image files are accepted.

## Test the API with Postman

### Read collection points
- Method: `GET`
- URL: `http://localhost:3000/api/collection-points`

### Read server status
- Method: `GET`
- URL: `http://localhost:3000/api/status`

### Submit a report
- Method: `POST`
- URL: `http://localhost:3000/api/reports`
- Choose `Body` → `form-data` and add these text fields:
  - `name`: Demo Student
  - `email`: student@example.com
  - `location`: Main Market
  - `wasteType`: Dry / recyclable
  - `description`: Overflowing waste bin near the market
- Optional photo: add a field named `photo`, change its type from Text to File, and select an image.

### Update report status
- Method: `PATCH`
- URL: `http://localhost:3000/api/reports/1/status`
- Body → raw → JSON:
  ```json
  { "status": "Resolved" }
  ```

### Delete report
- Method: `DELETE`
- URL: `http://localhost:3000/api/reports/1`

## Important: no database
This version intentionally does not connect to MongoDB, MySQL, or any other database. Reports are stored in a JavaScript array in server memory. They are lost when the server restarts. Collection points and dashboard numbers are demonstration data, not verified live municipal information. Uploaded photos are written to `uploads/`, but some hosting platforms use temporary storage; check the hosting provider's file-storage rules before relying on photo persistence.

## Hosting
This project requires a Node.js-capable server/hosting service. Upload the project folder (or connect its Git repository), install dependencies with `npm install`, and configure the start command as `npm start`. The server listens on `process.env.PORT`, which is needed by many hosting providers.

Static-only hosting such as GitHub Pages cannot run the Express backend. If using GitHub Pages, the backend must be hosted separately and the frontend API URL must be configured to point to that backend. This ZIP is arranged to host the frontend and backend together on a Node.js server.

## WAD syllabus topics demonstrated
- Node.js runtime and npm
- HTTP server with Express
- Middleware and request logging
- Routing and REST API
- JSON responses and HTTP status codes
- CRUD operations for waste reports using temporary in-memory data
- Form submission from frontend to backend using `fetch`
- File upload using Multer
- API testing with Postman

Authentication and a real database are not implemented in this version.
