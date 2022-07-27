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

@Controller('feedback')
export class FeedbackController {
  FeedbackService;
  constructor() {
    this.FeedbackService = new FeedbackService();
  }

  @Get(':id')
  async GetByCompanyId(req: Request, res: Response) {
    const data = await this.FeedbackService.GetByCompanyId(req.params.id);
    res.status(200).json(data);
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
