import { IUser } from './../interfaces/user';
import { RefreshTokenService } from './../services/refreshToken';
import { UserService } from './../services/user';
import { Request, Response, NextFunction } from 'express';
import {
  Controller,
  Middleware,
  Get,
  Post,
  Put
} from '@overnightjs/core';
import { authorizate } from '../middlewares/auth';
import SchemaValidator from '../middlewares/schemaValidotr';

@Controller('user')
export class UserController {
  UserService;
  refreshTokenService;
  constructor() {
    this.UserService = new UserService();
    this.refreshTokenService = new RefreshTokenService();
  }

  @Get()
  async GetAll(req: Request, res: Response) {
    const data = await this.UserService.GetAll();
    res.status(200).json(data);
  }

  @Get(':id')
  async GetById(req: Request, res: Response) {
    const data = await this.UserService.GetById(req.params.id);
    res.status(200).json(data);
  }

  @Post()
  @Middleware(SchemaValidator(true))
  async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await this.UserService.Create(req.body);
      const refreshToken = await this.refreshTokenService.create(
        user as IUser
      );
  
      res.cookie(
        'refreshToken',
        this.refreshTokenService.generateTokenCookie(refreshToken)
      );
  
      res.status(201).json({ user, token, message: 'Created successfully' });
      next();
    } catch (e) {
      console.log(e)
      next(e);
    }
  }
  
  @Put(':id')
  @Middleware(authorizate)
  async Update(req: Request, res: Response) {
    await this.UserService.Update(req.params.id, req.body);
    res.status(204).json({ message: 'Updated successfully' });
  }
}
