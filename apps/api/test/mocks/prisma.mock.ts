export const prismaMock = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  product: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};
