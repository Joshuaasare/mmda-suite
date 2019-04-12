import { getRealmInstance, eventListener } from '../../_shared/services';
import * as realmSchemas from '../../_shared/services/realmSchemas';
import { constants } from '../../_shared/constants';

export async function storeShopDataLocally(shopData) {
  try {
    const realm = getRealmInstance();
    const data = {
      psuedoId: shopData.psuedoId,
      surname: shopData.surname,
      otherNames: shopData.otherNames,
      gender: shopData.gender,
      phoneNumber: shopData.phoneNumber,
      nameOfShop: shopData.nameOfShop,
    };

    realm.write(() => {
      realm.create(realmSchemas.TraderSchema.name, data, true);
    });
    eventListener.dispatch(constants.subscribableEvents.SHOPS_UPDATED);
    //  console.warn('success');
  } catch (error) {
    console.log(error);
  }
}

export function convertShopDataIntoServerFormat(shopData) {
  const serverData = {
    id: shopData.id,
    surname: shopData.surname,
    other_names: shopData.otherNames,
    gender: shopData.gender,
    phone_number: shopData.phone,
    name_of_shop: shopData.nameOfShop,
  };
  return serverData;
}

export async function uploadShopData(shopData) {
  const serverData = convertShopDataIntoServerFormat(shopData);
  console.log(serverData);
  // make request to api to update shopData
  /* if successful */
  const isUpdated = true;
  storeShopDataLocally(shopData, isUpdated);
}
