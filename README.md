


# JobSphere Backend

Welcome to the backend repository for JobSphere, a unified job search assistant designed to aggregate technical job postings from multiple platforms into a single, easy-to-use interface. This backend is a robust RESTful API built with Node.js, Express, and MongoDB.

**Live Frontend:** [jobsphare.netlify.app](https://jobsphare.netlify.app)

**Live Backend API:** [jobsphere-backend-jsos.onrender.com](https://jobsphere-backend-jsos.onrender.com)

---

## ✨ Features

- **Robust RESTful API:** Built with Express.js and structured with a professional, scalable architecture (routes, controllers, models, utils).
- **Multi-Platform Aggregation:** Designed to ingest and standardize job data from various sources like LinkedIn and Indeed.
- **Data Normalization:** A modular **mapper pattern** parses and transforms inconsistent raw JSON into a clean, unified Mongoose schema.
- **Data Enrichment:** A powerful **skills parser** automatically scans job descriptions to extract and tag relevant technologies, powering a more accurate search.
- **Advanced Search & Filtering:** A dynamic `GET /jobs` endpoint that supports:
    - Full-text search on job titles and skills.
    - Filtering by location, experience level, job type, and source platform.
    - Efficient, server-side pagination.
- **Secure User Authentication:** Full authentication flow (register, login) using **JSON Web Tokens (JWT)** and **bcrypt.js** for password hashing.
- **Protected Routes:** Middleware to secure user-specific endpoints, such as bookmarking jobs.
- **Professional Error Handling:** Centralized error handling with custom `ApiError` and `ApiResponse` classes for consistent and predictable responses.
- **Containerized & Deployable:** Fully containerized with **Docker** and includes a **GitHub Actions** CI/CD pipeline for automated deployments to **AWS ECS**. Also configured for deployment on **Render**.

## 🛠️ Tech Stack

-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB with Mongoose
-   **Authentication:** JSON Web Tokens (jsonwebtoken), bcryptjs
-   **DevOps & Deployment:** Docker, GitHub Actions, AWS ECS, Render

## 🚀 API Endpoints

The base URL for all endpoints is `/api/v1`.

### Job Routes

| Method | Endpoint     | Description                                       |
| :----- | :----------- | :------------------------------------------------ |
| `POST` | `/jobs`      | Bulk-adds new jobs from a scraper.                |
| `GET`  | `/jobs`      | Gets a paginated and filterable list of all jobs. |
| `GET`  | `/jobs/:jobId` | Gets the details of a single job by its ID.       |

### User Routes

| Method | Endpoint          | Description                         |
| :----- | :---------------- | :---------------------------------- |
| `POST` | `/users/register` | Registers a new user.               |
| `POST` | `/users/login`    | Logs in a user and returns a JWT. |

### Bookmark Routes (Protected)

| Method | Endpoint                 | Description                                    |
| :----- | :----------------------- | :--------------------------------------------- |
| `GET`  | `/bookmarks`             | Gets all bookmarked jobs for the logged-in user. |
| `POST` | `/bookmarks/toggle/:jobId` | Adds or removes a bookmark for a specific job. |

## ⚙️ Environment Variables

To run this project, you will need to create a `.env` file in the root of the project and add the following variables:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000,[https://your-frontend-url.com](https://your-frontend-url.com)
ACCESS_TOKEN_SECRET=your_super_long_and_random_jwt_secret
