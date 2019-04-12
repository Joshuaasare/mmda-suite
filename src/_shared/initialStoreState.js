import { Dimensions } from 'react-native';

export default {
  auth: {
    signInActive: true,
    beginSignUp: false,
    endSignUp: false,

    loginPhone: '',
    loginPin: '',
    error: '',
    loading: false,
    code: '',
  },
  profile: {
    id: null,
    name: '',
    gender: '',
    phone: '',
    picture: '',
    assemblyId: null,
    assemblyName: '',
    marketId: null,
    marketName: '',
    marketTicketPrice: null,
    sectionId: null,
    sectionNumber: '',
    sectionName: '',
  },
  layout: {
    newLayoutWidth: Dimensions.get('window').width,
    newLayoutHeight: Dimensions.get('window').height,
  },
  collection: {
    direction: {
      directionResults: {},
      width: 0,
      mode: 'walking',
      modeLoading: true,
    },
  },
};
