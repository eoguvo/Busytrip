import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import { Server } from '@overnightjs/core';
import cookieParser from 'cookie-parser';
import { AuthController } from './controllers/auth';
import { CompanyController } from './controllers/company';
import { ErrorHandler } from './middlewares/errorHandler';
import 'dotenv/config';
import './database';
import { UserController } from './controllers/user';
import { FeedbackController } from './controllers/feedback';

class App extends Server {
  port: number;
  constructor(port = 8080) {
    super();

    this.port = Number(process.env.port) || port;
    this.middlewares();
    this.addControllers();

    this.app.use(ErrorHandler);

    this.listen();
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(
      cors()
    );
    this.app.use(logger("dev"))
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  addControllers() {
    const companyController = new CompanyController();
    const authController = new AuthController();
    const userController = new UserController();
    const feedbackController = new FeedbackController();

    super.addControllers([companyController, userController, feedbackController, authController]);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening http://localhost:${this.port}`);
    });
  }
}

export default App;
