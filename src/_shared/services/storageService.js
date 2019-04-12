import Realm from 'realm';
import forEach from 'lodash/forEach';
import axios from 'axios';
import * as realmSchema from './realmSchemas';
import { RealmConfig } from './realmConfig';
import { constants } from '../constants';

// const testSchemas = ['Assembly', 'Market'];

export function getRealmInstance() {
  try {
    global.realm = new Realm(RealmConfig);
    return global.realm;
  } catch (error) {
    return console.log({ realmError: error });
  }
}

export async function populateLocalDb() {
  try {
    const realm = await getRealmInstance();
    const populateLocalSchema = async (schema) => {
      let resp = null;
      resp = await axios.get(`${constants.api.ROOT_URL}/data-synchronization/${schema}`);
      const schemaData = await resp.data;
      realm.write(() => {
        forEach(schemaData, (dataItem) => {
          realm.create(schema, dataItem, true);
        });
      });
    };
    /**
    please note that since some schemas are children of other schemas,
    it is important to other the population such that child schemas are populated
    before parent schemas
    */
    await populateLocalSchema(realmSchema.AssemblySchema.name);
    await populateLocalSchema(realmSchema.MarketSchema.name);
    await populateLocalSchema(realmSchema.RevenueHeadSchema.name);
    await populateLocalSchema(realmSchema.SectionalHeadSchema.name);
    await populateLocalSchema(realmSchema.SectionSchema.name);
    await populateLocalSchema(realmSchema.TollCollectorSchema.name);
    await populateLocalSchema(realmSchema.TraderSchema.name);
    await populateLocalSchema(realmSchema.TransactionSchema.name);
    await populateLocalSchema(realmSchema.ScannedSchema.name);
    return true;
  } catch (error) {
    console.log({ error });
    return null;
  }
}
