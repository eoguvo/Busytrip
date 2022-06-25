import { ICompany } from './../interfaces/company';
import { RefreshTokenService } from './../services/refreshToken';
import { CompanyService } from './../services/company';
import { Request, Response } from 'express';
import {
  Controller,
  Middleware,
  Get,
  Post,
  Put,
  Delete,
} from '@overnightjs/core';
import { loggerMiddleware } from '../middlewares/auth';

@Controller('company')
export class CompanyController {
  CompanyService;
  refreshTokenService;
  constructor() {
    this.CompanyService = new CompanyService();
    this.refreshTokenService = new RefreshTokenService();
  }

  @Get()
  @Middleware(loggerMiddleware)
  async GetAll(req: Request, res: Response) {
    const data = await this.CompanyService.GetAll();
    res.status(200).json(data);
  }

  @Get('near')
  async FindNear(req: Request, res: Response) {
    const data = await this.CompanyService.FindNear(
      parseInt(`${req.query.latitude}`),
      parseInt(`${req.query.longitude}`),
      parseInt(`${req.query.distance}`)
    );
    res.status(200).json(data);
  }

  @Get(':id')
  async GetById(req: Request, res: Response) {
    const data = await this.CompanyService.GetById(req.params.id);
    res.status(200).json(data);
  }

  @Post()
  async Create(req: Request, res: Response) {
    const { company, token } = await this.CompanyService.Create(req.body);
    const refreshToken = await this.refreshTokenService.create(
      company as ICompany
    );

    res.cookie(
      'refreshToken',
      this.refreshTokenService.generateTokenCookie(refreshToken)
    );
    res.status(201).json({ company, token, message: 'Created successfully' });
  }

  @Put(':id')
  async Update(req: Request, res: Response) {
    await this.CompanyService.Update(req.params.id, req.body);
    res.status(204).json({ message: 'Updated successfully' });
  }
}
