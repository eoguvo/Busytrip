import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Server } from '@overnightjs/core';
import cookieParser from 'cookie-parser';
import { AuthController } from './controllers/auth';
import { CompanyController } from './controllers/company';
import { ErrorHandler } from './middlewares/errorHandler';
import 'dotenv/config';
import './database';

class App extends Server {
  port: number;
  constructor(port = 3000) {
    super();

    this.port = port;
    this.middlewares();
    this.addControllers();

    this.app.use(ErrorHandler);

    this.listen();
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: process.env.FRONT_URL,
      })
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  addControllers() {
    const companyController = new CompanyController();
    const authController = new AuthController();

    super.addControllers([companyController, authController]);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening http://localhost:${this.port}`);
    });
  }
}

export default App;
