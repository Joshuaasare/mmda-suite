import * as realmSchema from './realmSchemas';

export const realmSchemas = [
  realmSchema.AssemblySchema,
  realmSchema.MarketSchema,
  realmSchema.RevenueHeadSchema,
  realmSchema.SectionalHeadSchema,
  realmSchema.SectionSchema,
  realmSchema.TollCollectorSchema,
  realmSchema.TraderSchema,
  realmSchema.TransactionSchema,
  realmSchema.ScannedSchema,
];

export const RealmConfig = {
  schema: realmSchemas,
  path: 'test.realm',
};
