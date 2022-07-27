import { ICompany } from '../interfaces/company';
import { CompanyService } from './company';
import crypto from './crypto';
import tokenService from './token';

export class AuthService {
  async Login({ password, email }: ICompany) {
    const companyService = new CompanyService();

    const company = await companyService.FindByEmail(email);
    if (!company) throw { message: 'Usuário não existe' };

    const isMatch = await crypto.compare(password!, company.password);
    if (!isMatch) throw { message: 'Senha inválida' };

    const token = tokenService.sign({ id: company.id, role: company.role });
    return { token, company };
  }
}
