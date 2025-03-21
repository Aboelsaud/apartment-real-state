
# :house: Apartment Listing Application

Welcome to the **Apartment Listing Application**! This is a full-stack application built using **Next.js** for the frontend, **NestJS** for the backend, and **MongoDB** for the database. It allows users to view and manage a list of apartments, each with details like unit number, project name, price, and description. This app is fully responsive, making it user-friendly on both desktop and mobile devices.

The project also features **Swagger UI** for interactive API documentation.

---

## :rocket: Features

- **List of Apartments**: View detailed apartment information including unit number, project, price, and description.
- **Responsive Design**: Optimized for both desktop and mobile devices using **Bootstrap**.
- **Search and Filter**: Easily find apartments with search and filter functionality.
- **API Documentation**: Interactive API documentation available via Swagger.
- **Dockerized**: Ready to be deployed with Docker using `docker-compose`.

---

## :computer: Installation & Setup

To set up and run the project locally, follow these steps:

### 1. Clone the Repository

Start by cloning the project to your local machine:

```bash
git clone https://github.com/Aboelsaud/apartment-real-state.git
```

### 2. Build and Start with Docker Compose

Make sure you have **Docker** and **Docker Compose** installed on your machine. After ensuring Docker is installed, run the following command to build and start the application:

```bash
docker-compose up --build
```

- **What this does**:
  - **Builds** the necessary Docker images for both the frontend (Next.js) and backend (NestJS).
  - **Starts** the frontend and backend services, running them as containers.
  - Configures the services to work together with the **MongoDB** database automatically.

Once the services are up and running, you can access the app and API locally.

---

## :link: Access the Application

After the application starts successfully, you can access it at the following URLs:

- **Frontend (Next.js)**: [http://localhost:3000](http://localhost:3000) - The apartment listings page.
- **Backend (NestJS)**: [http://localhost:3001](http://localhost:3001) - The backend API server.
- **Swagger API Documentation**: [http://localhost:3001/api/docs](http://localhost:3001/api/docs) - Interactive Swagger documentation for API endpoints.

---

## :gear: Environment Variables

You can modify the following environment variables in the `.env` file to customize your local setup:

- `MONGO_URI`: MongoDB connection string for the database.
- `APP_PORT`: The port for the backend (NestJS) API.

---

## :book: Usage

### **Frontend (Next.js)**

- Visit the **apartment listings page** at [http://localhost:3000](http://localhost:3000) to see available apartments.
- You can search and filter the listings based on various criteria.

### **Backend (NestJS)**

- The backend is built with **NestJS** and handles all the API logic.
- Visit the Swagger UI documentation at [http://localhost:3001/api/docs](http://localhost:3001/api/docs) to interact with the API endpoints.

---

## :wrench: Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Bootstrap](https://getbootstrap.com/)
- **Backend**: [NestJS](https://nestjs.com/), [MongoDB](https://www.mongodb.com/)
- **API Documentation**: [Swagger](https://swagger.io/)
- **Containerization**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)

---

## :memo: Contributing

Feel free to contribute to this project! You can open issues, submit bug reports, or create pull requests.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.
