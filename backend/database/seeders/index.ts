import { faker } from '@faker-js/faker';
import crypto from '../../services/crypto'
import { ROLES } from '../../config';

import '../index'
import UserModel from '../models/user';
import CategoryModel from '../models/category';
import mongoose from '..';

const categoriesMock = [
  { icon: 'FaBars', name: 'Geral' },
  { icon: 'FaHamburger', name: 'Comida' },
  { icon: 'FaSmileBeam', name: "Diversão" },
  { icon: 'FaBasketballBall', name: "Esporte" },
  { icon: 'FaUmbrellaBeach', name: "Lazer" },
  { icon: 'FaTree', name: "Eco" },
  { icon: 'FaRegKissWinkHeart', name: "Beleza" },
  { icon: 'FaGasPump', name: "Posto" },
  { icon: 'FaShoppingBag', name: "Mercado" },
  { icon: 'FaTshirt', name: "Roupa" }
]

async function SeedCategory() {
  if(!!(await CategoryModel.count())) return;

  await CategoryModel.insertMany(categoriesMock)
}

async function SeedCompany(itemsNumber = 15) {
  let company = [];
  for(let i = 0; i < itemsNumber/2; i++) {
    company.push({
      name: faker.company.companyName(),
      email: faker.internet.email(),
      password: await crypto.hash("senha1234"),
      phone: faker.phone.number('+55 ## 9####-####'),
      bio: faker.company.bs(),
      avatar_url: faker.image.business(200, 200, true),
      categories: [
        (await CategoryModel.aggregate([ { $sample: { size: 1 } } ]))[0]
      ],
      role: ROLES.COMPANY,
      location: {
        type: 'Point',
        coordinates: faker.address.nearbyGPSCoordinate([-23.263991163004658, -47.30107424198266], 200, true)
      }
    });
  }

  for(let i = 0; i < itemsNumber/2; i++) {
    company.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: await crypto.hash("senha1234"),
      phone: faker.phone.number('+55 ## 9####-####'),
      avatar_url: faker.internet.avatar(),
      role: ROLES.USER,
    });
  }

  await UserModel.insertMany(company)
}

SeedCategory()
SeedCompany()

mongoose.connection.close()
