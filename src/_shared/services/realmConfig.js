/**
 * @Author: joshuaasare
 * @Date:   2019-02-24 03:16:30
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-11-01 17:05:42
 */

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
