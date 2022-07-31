import { ROLES } from './../config/index';
import { FeedbackService } from './../services/feedback';
import { NextFunction, Request, Response } from 'express';
import {
  Controller,
  Middleware,
  Get,
  Post
} from '@overnightjs/core';
import { authorizate, authorized } from '../middlewares/auth';
import { UserService } from '../services/user';

@Controller('feedback')
export class FeedbackController {
  FeedbackService;
  UserService;
  constructor() {
    this.FeedbackService = new FeedbackService();
    this.UserService = new UserService();
  }

  @Get(':id')
  async GetByCompanyId(req: Request, res: Response, next: NextFunction) {
    const data = await this.FeedbackService.GetByCompanyId(req.params.id);
    if(!data.length) return next({ statusCode: 204 });
    const user = await this.UserService.GetById(data[0].user_id);
    const response = [...data.map(e => {
      return {...e, user}
    })];
    res.status(200).json(response);
  }

  @Post()
  @Middleware([authorizate, authorized(ROLES.USER)])
  async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.FeedbackService.Create({...req.body, user_id: res.locals.user.id});
      res.status(200).json(data);
    } catch (e) {
      next(e)
    }
  }
}
