import 'dotenv/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { PRODUCT_TYPES } from './constants/product-types';
import { CURRENCIES } from './constants/currencies';
import { DESCRIPTIONS } from './constants/descriptions';
import { randomUUID } from 'node:crypto';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const mapHelper = <T>(map: readonly T[]): T => {
  return map[Math.floor(Math.random() * map.length)];
};

function requirementsTextHelper(pool: readonly string[]): string {
  if (!pool.length) return '';

  const count = Math.floor(Math.random() * pool.length) + 1;
  const selected = [...pool].slice(0, count);
  return selected.join(' ');
}

function amountRangeHelper(currencyCode: string, productTypeCode: string) {
  const isCreditLike =
    productTypeCode === 'LOAN' || productTypeCode === 'CREDIT';

  let minBase = 0;
  let minRange = 0;
  let maxBase = 0;
  let maxRange = 0;

  if (currencyCode === 'COP') {
    if (isCreditLike) {
      minBase = 300000;
      minRange = 2700000;
      maxBase = 10000000;
      maxRange = 190000000;
    } else {
      maxBase = 1000000;
      maxRange = 99000000;
    }
  } else if (currencyCode === 'USD' || currencyCode === 'EUR') {
    if (isCreditLike) {
      minBase = 50;
      minRange = 450;
      maxBase = 2000;
      maxRange = 48000;
    } else {
      maxBase = 200;
      maxRange = 19800;
    }
  }

  const min = minBase + Math.floor(Math.random() * (minRange + 1));
  let max = maxBase + Math.floor(Math.random() * (maxRange + 1));

  if (max <= min) max = min + 1;

  return {
    min: min.toFixed(2),
    max: max.toFixed(2),
  };
}

async function main() {
  for (const currency of CURRENCIES) {
    await prisma.currency.upsert({
      where: { code: currency.code },
      update: {},
      create: currency,
    });
  }

  for (const type of PRODUCT_TYPES) {
    await prisma.productType.upsert({
      where: { code: type.code },
      update: {},
      create: type,
    });
  }

  const currencyMap = await prisma.currency.findMany();
  const typeMap = await prisma.productType.findMany();

  for (let i = 1; i <= 20; i++) {
    const currency = mapHelper(currencyMap);
    const type = mapHelper(typeMap);

    const name = mapHelper(DESCRIPTIONS.names);
    const audienceType = mapHelper(DESCRIPTIONS.audiences);
    const rateType = mapHelper(DESCRIPTIONS.rateTypes);
    const headline = mapHelper(DESCRIPTIONS.headlines);
    const generalInfo = mapHelper(DESCRIPTIONS.generalInfos);
    const requirements = requirementsTextHelper(DESCRIPTIONS.requirements);
    const term = mapHelper(DESCRIPTIONS.termPool);

    const rate = new Prisma.Decimal((10 + Math.random() * 20).toFixed(2));
    const { min, max } = amountRangeHelper(currency.code, type.code);
    const minAmount = new Prisma.Decimal(min);
    const maxAmount = new Prisma.Decimal(max);

    const code = `PROD-${String(i).padStart(3, '0')}`;

    let createData = {
      id: randomUUID(),
      code,
      name: `${type.name} ${name}`,
      headline,
      generalInfo,
      requirements,
      term,
      audienceType,
      rateType,
      rate,
      productTypeId: type.id,
      currencyId: currency.id,
      minAmount,
      maxAmount,
      active: true,
    };

    if (i === 1) {
      createData.id = 'ebb61622-3bd9-4886-aa4b-bc99264fea24';
    }

    await prisma.product.upsert({
      where: { code },
      update: {},
      create: createData,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
