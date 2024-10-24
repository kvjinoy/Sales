# POS


## Overview

This project is a full-stack application that uses Azure SQL as the backend database, an ASP.NET Core REST API for the server-side logic, and a React application with TypeScript for the frontend. 

Dapper, a micro ORM, is used for handling database operations. The SQL DDL is defined in a separate project to separate concerns. Vite is used as the JavaScript build tool.

Current state - Sequence diagram : https://github.com/kvjinoy/Sales/blob/master/Sequence%20%20Diagram.png

## Prerequisites

- .NET 8.0 or later
- Node.js 22.5.1 or later
- Azure SQL/ SQL Database
- Vite 5.4.1 or later
- react 18.3.1

## Backend

The backend is an ASP.NET Core REST API that connects to an Azure SQL database. Dapper is used for handling database operations.

### Database Setup

The SQL DDL is defined in a separate project. You can create the database schema by running the scripts in the `SalesDatabase` project.

### Running the Backend

Navigate to the `Sales.Server` directory and run the following command to start the server:

```bash
dotnet run
```

## Frontend

The frontend is a React application written in TypeScript. Vite is used as the JavaScript build server.

### Running the Frontend

Navigate to the `Sales.Client` directory and install the dependencies:

```bash
npm install
```

Then, you can start the development server:

```bash
npm run dev
```

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for
