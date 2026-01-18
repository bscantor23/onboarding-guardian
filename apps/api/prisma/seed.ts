import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const currencies = [
    { code: 'COP', name: 'Peso Colombiano', symbol: '$', decimals: 2 },
    { code: 'USD', name: 'Dólar Americano', symbol: '$', decimals: 2 },
    { code: 'EUR', name: 'Euro', symbol: '€', decimals: 2 },
  ];

  for (const currency of currencies) {
    await prisma.currency.upsert({
      where: { code: currency.code },
      update: {},
      create: currency,
    });
  }

  const types = [
    {
      code: 'SAVINGS',
      name: 'Cuenta de Ahorros',
      description: 'Cuentas para ahorro personal',
    },
    {
      code: 'CHECKING',
      name: 'Cuenta Corriente',
      description: 'Cuentas transaccionales empresariales',
    },
    {
      code: 'CREDIT',
      name: 'Crédito',
      description: 'Tarjetas y cupos de crédito',
    },
    {
      code: 'INVESTMENT',
      name: 'Inversión',
      description: 'Productos de inversión',
    },
    {
      code: 'LOAN',
      name: 'Préstamo',
      description: 'Créditos de consumo e hipotecarios',
    },
    {
      code: 'DIGITAL',
      name: 'Cuenta Digital',
      description: 'Productos 100% digitales',
    },
  ];

  for (const type of types) {
    await prisma.productType.upsert({
      where: { code: type.code },
      update: {},
      create: type,
    });
  }

  const currencyMap = await prisma.currency.findMany();
  const typeMap = await prisma.productType.findMany();

  const getCurrencyId = (code: string) => {
    const currency = currencyMap.find((c) => c.code === code);
    if (!currency) throw new Error(`Currency not found: ${code}`);
    return currency.id;
  };

  const getTypeId = (code: string) => {
    const type = typeMap.find((t) => t.code === code);
    if (!type) throw new Error(`ProductType not found: ${code}`);
    return type.id;
  };

  const products = [
    {
      id: 'ebb61622-3bd9-4886-aa4b-bc99264fea24',
      code: 'CTA_AHO_DIG',
      name: 'Cuenta Ahorros Digital',
      description: 'Apertura digital sin cuota de manejo',
      type: 'SAVINGS',
      currency: 'COP',
      min: '0.00',
      max: '100000000.00',
    },
    {
      code: 'CTA_DIG_USD',
      name: 'Cuenta Digital USD',
      description: 'Cuenta digital en dólares',
      type: 'DIGITAL',
      currency: 'USD',
      min: '10.00',
      max: '500000.00',
    },
    {
      code: 'CTA_CORR',
      name: 'Cuenta Corriente Empresarial',
      description: 'Cuenta para manejo empresarial',
      type: 'CHECKING',
      currency: 'COP',
      min: '100000.00',
      max: '500000000.00',
    },
    {
      code: 'TC_CLAS',
      name: 'Tarjeta Crédito Clásica',
      description: 'Tarjeta de crédito básica',
      type: 'CREDIT',
      currency: 'COP',
      min: '500000.00',
      max: '20000000.00',
    },
    {
      code: 'PRE_CONS',
      name: 'Crédito de Consumo',
      description: 'Préstamo de libre inversión',
      type: 'LOAN',
      currency: 'COP',
      min: '1000000.00',
      max: '100000000.00',
    },
    {
      code: 'CDT_12M',
      name: 'CDT 12 Meses',
      description: 'Inversión a término fijo',
      type: 'INVESTMENT',
      currency: 'COP',
      min: '1000000.00',
      max: '1000000000.00',
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { code: p.code },
      update: {},
      create: {
        code: p.code,
        name: p.name,
        description: p.description,
        productTypeId: getTypeId(p.type),
        currencyId: getCurrencyId(p.currency),
        minAmount: p.min,
        maxAmount: p.max,
        active: true,
      },
    });
  }
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
