import crypto from './crypto';
import CompanyModel from '../database/models/company';
import R from 'ramda';
import { ICompany } from '../interfaces/company';
import tokenService from './token';

export class CompanyService {
  db;
  constructor() {
    this.db = CompanyModel;
  }
  async GetAll() {
    const companies = await this.db.find().lean<ICompany[]>();
    return this.SerializeCompany(companies);
  }

  async GetById(id: string) {
    if (!id) throw new Error('Selecione um id');
    const company = await this.db.findById(id).lean<ICompany>();
    return this.SerializeCompany([company]);
  }

  async Create(user: ICompany) {
    try {
      const hash = await crypto.hash(user.password!);
      const { _doc: data } = await this.db.create({
        ...user,
        password: hash,
      });

      const token = tokenService.sign({ id: data._id, role: data.role });
      const company = this.SerializeCompany(data);

      return {
        company,
        token,
      };
    } catch (e) {
      throw e;
    }
  }

  async Update(id: string, body: ICompany) {
    if (!id) throw new Error('Selecione um id');
    return await this.db.findByIdAndUpdate(id, body);
  }

  async FindNear(latitude: number, longitude: number, distance = 50) {
    console.log({ latitude, longitude });
    const filter = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [latitude, longitude],
          },
          $maxDistance: distance * 1000,
        },
      },
    };
    const companies = await this.db.find(filter).lean<ICompany[]>();
    return this.SerializeCompany(companies);
  }

  async FindByEmail(email: string) {
    return await this.db.findOne({ email });
  }

  private SerializeCompany(company: ICompany[]): ICompany | ICompany[] {
    const serializedCompany: ICompany[] = company.map(R.omit(['password']));
    return serializedCompany.length === 1
      ? serializedCompany[0]
      : serializedCompany;
  }
}
