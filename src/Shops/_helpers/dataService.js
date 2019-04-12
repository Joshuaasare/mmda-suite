import { getRealmInstance } from '../../_shared/services';
import * as realmSchemas from '../../_shared/services/realmSchemas';

export function getShopDetails(psuedoId: string) {
  const realm = getRealmInstance();
  const shopData = realm.objects(realmSchemas.TraderSchema.name);
  for (let i = 0; i < shopData.length; i += 1) {
    if (psuedoId === shopData[i].psuedoId) {
      return shopData[i];
    }
  }
  return null;
}
