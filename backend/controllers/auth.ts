import { ICompany } from './../interfaces/company';
import { AuthService } from './../services/auth';
import { RefreshTokenService } from './../services/refreshToken';
import { CompanyService } from './../services/company';
import tokenService from './../services/token';
import { Request, Response, NextFunction } from 'express';
import {
  Controller,
  Middleware,
  Get,
  Post,
  Put,
  Delete,
} from '@overnightjs/core';
import cookie from 'cookie';

@Controller('auth')
export class AuthController {
  companyService;
  refreshTokenService;
  authService;
  constructor() {
    this.companyService = new CompanyService();
    this.refreshTokenService = new RefreshTokenService();
    this.authService = new AuthService();
  }

  @Post('login')
  async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { token, company } = await this.authService.Login({
        email,
        password,
      } as ICompany);
      const refreshToken = await this.refreshTokenService.create(company);

      const { cookieOptions } = this.refreshTokenService.generateTokenCookie(refreshToken);
      res.cookie(
        'refreshToken',
        refreshToken, { ...cookieOptions }
      );
      res.status(200).json({ token });
    } catch (e: any) {
      next({ statusCode: 401, message: e.message || 'Não autorizado' });
    }
  }

  @Get('logout')
  async Logout(req: Request, res: Response, next: NextFunction) {
    try {
      const headerToken = cookie.parse(req.cookies['refreshToken']);
      const parsedHeaderToken = headerToken?.refreshToken;
      await this.refreshTokenService.revoke(parsedHeaderToken);

      res.cookie('refreshToken', '');
      res.status(200).json({ message: 'Logout realizado com sucesso' });
    } catch (e: any) {
      next({
        statusCode: 400,
        message: e.message || 'Impossivel fazer logout',
      });
    }
  }

  @Get('refresh-token')
  async RefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.cookies) throw new Error('Companhia não logada');
      const headerToken = req.cookies['refreshToken'];
      const oldToken = await this.refreshTokenService.get(headerToken);
      await this.refreshTokenService.revoke(oldToken.token);

      const { user } = oldToken;
      const refreshToken = await this.refreshTokenService.create({ 
          _id: oldToken.user_id 
      });
      const token = tokenService.sign({ id: user._id, role: user.role });

      res.cookie(
        'refreshToken',
        this.refreshTokenService.generateTokenCookie(refreshToken)
      );
      res.status(200).json({ token });
    } catch (e: any) {
      
      next({ statusCode: 401, message: e.message || 'Não autorizado' });
    }
  }
}
