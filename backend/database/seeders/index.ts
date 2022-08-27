import { faker } from '@faker-js/faker';
import crypto from '../../services/crypto'
import { ROLES } from '../../config';

import '../index'
import mongoose from '..';
import UserModel from '../models/user';
import CategoryModel from '../models/category';

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
  for(let i = 0; i < itemsNumber; i++) {
    console.log(i)
    company.push({
      name: faker.company.companyName(),
      email: faker.internet.email(),
      password: await crypto.hash("senha1234"),
      phone: faker.phone.number('+55 ## 9####-####'),
      bio: faker.company.bs(),
      avatar_url: `https://picsum.photos/200?random=${i}`,
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
  
  console.log(company)
  await UserModel.insertMany(company)
  await mongoose.connection.close()
}

console.log('alo')
SeedCategory()
SeedCompany()
