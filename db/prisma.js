const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

async function softDeleteMiddleware(params, next) {
  if (params.action === 'delete') {
    // Defer delete operation and convert it to an update operation
    params.action = 'update';
    params.args['data'] = { deleted_at: new Date() };
  }
  if (params.action === 'deleteMany') {
    params.action = 'updateMany';
    if (params.args.data != undefined) {
      params.args.data['deleted_at'] = new Date();
    } else {
      params.args['data'] = { deleted_at: new Date() };
    }
  }
  return next(params);
}

async function filterDeletedMiddleware(params, next) {
  if (params.action === 'findUnique' || params.action === 'findFirst') {
    // Add a condition to exclude deleted records
    params.args.where['deleted_at'] = null;
  }
  if (params.action === 'findMany') {
    // Add a condition to exclude deleted records
    if (params.args.where) {
      if (params.args.where.deleted_at === undefined) {
        params.args.where.deleted_at = null;
      }
    } else {
      params.args.where = { deleted_at: null };
    }
  }
  return next(params);
}

prisma.$use(softDeleteMiddleware);
prisma.$use(filterDeletedMiddleware);

module.exports = { prisma };
