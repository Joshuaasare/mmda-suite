export type Assembly = {
  id: number,
  name: string,
  region: string,
  assemblyType: string,
};

export type Market = {
  id: number,
  name: string,
  assembly: Assembly,
  region: ?string,
};

export type SectionalHead = {
  id: number,
  surname: string,
  otherNames: string,
  gender: string,
  phoneNumber: string,
  picture: ?string,
  market: Market,
};

export type Section = {
  id: number,
  sectionNumber: ?number,
  sectionName: ?string,
  sectionalHead: SectionalHead,
  market: Market,
};

export type TollCollector = {
  id: number,
  surname: string,
  otherNames: string,
  gender: string,
  phoneNumber: string,
  picture: ?string,
  market: Market,
  section: Section,
  assembly: Assembly,
};

export type RevenueHead = {
  id: number,
  surname: string,
  otherNames: string,
  gender: string,
  phoneNumber: string,
  picture: ?string,
  assembly: Assembly,
};

export type Trader = {
  id: number,
  surname: string,
  otherNames: string,
  gender: string,
  phoneNumber: string,
  picture: ?string,
  nameOfShop: ?string,
  latitude: ?string,
  longitude: ?string,
  tinNumber: ?string,
  amountOwing: number,
  amountPaid: number,
  section: Section,
  market: Market,
  assembly: Assembly,
  paidForToday: number,
  scannedForToday: number,
  isUpdated: boolean,
};

export type Transaction = {
  id: number,
  assembly: Assembly,
  market: Market,
  section: Section,
  tollCollector: TollCollector,
  trader: Trader,
  data: ?string,
  amountPaid: number,
  isUpdated: boolean,
};
