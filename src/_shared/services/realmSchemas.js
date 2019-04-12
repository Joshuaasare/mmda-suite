export const TollCollectorSchema = {
  name: 'TollCollector',
  primaryKey: 'id',
  properties: {
    id: 'int',
    surname: 'string',
    otherNames: 'string',
    gender: 'string',
    phoneNumber: 'string',
    picture: { type: 'string', optional: true }, // same as 'string?'
    market: 'Market',
    section: 'Section',
    assembly: 'Assembly',
    transactions: { type: 'linkingObjects', objectType: 'Transaction', property: 'tollCollector' },
  },
};

export const SectionalHeadSchema = {
  name: 'SectionalHead',
  primaryKey: 'id',
  properties: {
    id: 'int',
    surname: 'string',
    otherNames: 'string',
    gender: 'string',
    phoneNumber: 'string',
    picture: { type: 'string', optional: true },
    market: 'Market',
    sectionWhereSectionalHead: {
      type: 'linkingObjects',
      objectType: 'Section',
      property: 'sectionalHead',
    },
  },
};

// section that a particular sectional head has jurisdiction over
export const SectionSchema = {
  name: 'Section',
  primaryKey: 'id',
  properties: {
    id: 'int',
    sectionNumber: { type: 'string', optional: true },
    sectionName: { type: 'string', optional: true },
    sectionalHead: 'SectionalHead',
    market: 'Market',
    tollCollectors: { type: 'linkingObjects', objectType: 'TollCollector', property: 'section' },
    traders: { type: 'linkingObjects', objectType: 'Trader', property: 'section' },
  },
};

export const RevenueHeadSchema = {
  name: 'RevenueHead',
  primaryKey: 'id',
  properties: {
    id: 'int',
    surname: 'string',
    otherNames: 'string',
    gender: 'string',
    phoneNumber: 'string',
    picture: { type: 'string', optional: true },
    assembly: 'Assembly',
  },
};

export const TraderSchema = {
  name: 'Trader',
  primaryKey: 'psuedoId',
  properties: {
    psuedoId: 'string',
    surname: 'string',
    otherNames: 'string',
    gender: 'string',
    phoneNumber: 'string',
    picture: { type: 'string', optional: true },
    nameOfShop: { type: 'string', optional: true }, // same as 'string?'
    latitude: { type: 'string', optional: true },
    longitude: { type: 'string', optional: true },
    tinNumber: { type: 'string', optional: true },
    amountOwing: 'float',
    amountPaid: 'float',
    section: 'Section',
    market: 'Market',
    assembly: 'Assembly',
    isUpdated: { type: 'bool', default: false },
    transactions: { type: 'linkingObjects', objectType: 'Transaction', property: 'trader' },
  },
};

export const MarketSchema = {
  name: 'Market',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    assembly: 'Assembly',
    region: { type: 'string', optional: true },
    ticketPrice: { type: 'float', optional: false },
    sections: { type: 'linkingObjects', objectType: 'Section', property: 'market' }, // sections in the market
    traders: { type: 'linkingObjects', objectType: 'Trader', property: 'market' }, // all traders in this market
    tollCollectors: { type: 'linkingObjects', objectType: 'TollCollector', property: 'market' }, // all the toll collectors in this market
  },
};

export const AssemblySchema = {
  name: 'Assembly',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    region: 'string',
    assemblyType: 'string',
    markets: { type: 'linkingObjects', objectType: 'Market', property: 'assembly' }, // markets in this assembly
  },
};

export const TransactionSchema = {
  name: 'Transaction',
  primaryKey: 'psuedoId',
  properties: {
    psuedoId: 'string',
    assembly: 'Assembly',
    market: 'Market',
    section: 'Section',
    tollCollector: 'TollCollector',
    trader: 'Trader',
    date: 'int',
    amountPaid: 'float',
    isUpdated: { type: 'bool', default: false },
  },
};

export const ScannedSchema = {
  name: 'Scanned',
  primaryKey: 'psuedoId',
  properties: {
    psuedoId: 'string',
    assembly: 'Assembly',
    market: 'Market',
    section: 'Section',
    tollCollector: 'TollCollector',
    trader: 'Trader',
    date: 'int',
    paid: { type: 'int', default: 0 },
    isUpdated: { type: 'bool', default: false },
  },
};
