import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT } from '../util/request';
import config from '../config';
import {
  GET_TYPES,
  GET_MANUFACTURER,
  GET_MODELS,
  GET_ASSET,
  POST_RFQ,
  POST_ASSET,
  GET_COUNTRIES,
  GET_MANS_MODELS,
  RENT_AUTH_SEARCH,
  POST_RENT_COSTS,
  GET_BID_SEARCH,
  GET_BID_BASKET,
  GET_ORG_EQUIP,
  GET_EQUIP_DETAILS,
  POST_BIDS,
  GET_BUY_SEARCH,
  GET_BUY_EQUIP,
  POST_BUY,
  GET_SIMILAR_BUY,
  GET_CATEGORY,
  GET_FITTINGS,
  POST_IMAGE,
  GET_FEED,
  GET_RFQS,
  GET_BIDS,
  GET_USER_PROFILE,
  GET_USERS,
  GET_INBOX,
  GET_MESSAGES,
  POST_MESSAGE,
  CANCEL_RFQ,
  CANCEL_BID,
  GET_ID_BID,
  GET_ID_RFQ,
  IGNORE_BID,
  ACCEPT_BID,
} from 'constants/ActionTypes';
import {
  getTypesSuccess,
  getManufacturerSuccess,
  getModelsSuccess,
  getAssetSuccess,
  getAssetFailed,
  postRfqSuccess,
  postRfqFailed,
  postAssetSuccess,
  postAssetFailed,
  getCountriesSuccess,
  getMansModelsSuccess,
  rentAuthSearchSuccess,
  rentAuthSearchFailed,
  postRentCostsSuccess,
  postRentCostsFailed,
  getBidSearchSuccess,
  getBidSearchFailed,
  getBidBasketSuccess,
  getBidBasketFailed,
  getOrgEquipSuccess,
  getEquipDetailsSuccess,
  getEquipDetailsFailed,
  postBidsSuccess,
  postBidsFailed,
  getBuySearchSuccess,
  getBuySearchFailed,
  getBuyEquipSuccess,
  getBuyEquipFailed,
  postBuySuccess,
  postBuyFailed,
  getSimilarBuySuccess,
  getSimilarBuyFailed,
  getCategorySuccess,
  getFittingsSuccess,
  postImageSuccess,
  postImageFailed,
  getFeedSuccess,
  getFeedFailed,
  getRfqsSuccess,
  getRfqsFailed,
  getBidsSuccess,
  getBidsFailed,
  getUserProfileSuccess,
  getUserProfileFailed,
  getUsersSuccess,
  getUsersFailed,
  getInboxSuccess,
  getInboxFailed,
  getMessagesSuccess,
  getMessagesFailed,
  postMessageSuccess,
  postMessageFailed,
  cancelRfqSuccess,
  cancelRfqFailed,
  cancelBidSuccess,
  cancelBidFailed,
  getIdBidSuccess,
  getIdBidFailed,
  getIdRfqSuccess,
  getIdRfqFailed,
  ignoreBidSuccess,
  ignoreBidFailed,
  acceptBidSuccess,
  acceptBidFailed,
} from 'actions/Content';

const getTypesCall = async () =>
  await GET(`content/static/types_models/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getManufacturerCall = async () =>
  await GET(`content/static/manufacturers/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getModelsCall = async () =>
  await GET(`content/static/types_models/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getAssetCall = async (quip_type, country, mans_models) =>
  await GET(
    `content/rent/anon_search/?quip_type=${quip_type}&country=${country}&mans_models=${mans_models}`,
    {
      baseUrl: `${config.baseUrl}`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response)
    .catch(error => error.response);

const postRfqCall = async data =>
  await POST(`content/rfq/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const postAssetCall = async data =>
  await POST(`content/asset/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const getCountriesCall = async () =>
  await GET(`content/static/countries/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getMansModelsCall = async () =>
  await GET(`content/static/manufacturers_models/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const rentAuthSearchCall = async (
  quip_type,
  country,
  mans_models,
  min_rating,
  is_legit,
  is_quip_verified,
  o_countries,
  min_man_year,
  max_quip_distance,
  max_quip_hours,
  fittings,
) =>
  await GET(
    `content/rent/auth_search/?quip_type=${quip_type}&country=${country}&mans_models=${mans_models}&min_rating=${min_rating}&is_legit=${is_legit}&is_quip_verified=${is_quip_verified}&o_countries=${o_countries}&min_man_year=${min_man_year}&max_quip_distance=${max_quip_distance}&max_quip_hours=${max_quip_hours}&fittings=${fittings}`,
    {
      baseUrl: `${config.baseUrl}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('user_id')}`,
      },
    },
  )
    .then(response => response)
    .catch(error => error.response);

const postRentCostsCall = async data =>
  await POST(`content/rent/costs/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const getBidSearchCall = async (url, headers) =>
  await GET(url, {
    baseUrl: `${config.baseUrl}`,
    headers,
  })
    .then(response => response)
    .catch(error => error.response);

const getBidBasketCall = async url =>
  await GET('', {
    baseUrl: url,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getOrgEquipCall = async () =>
  await GET(`content/asset/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getEquipDetailsCall = async url =>
  await GET('', {
    baseUrl: url,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const postBidsCall = async data =>
  await POST(`content/bid/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const getBuySearchCall = async (url, headers) =>
  await GET(url, {
    baseUrl: `${config.baseUrl}`,
    headers,
  })
    .then(response => response)
    .catch(error => error.response);

const getBuyEquipCall = async url =>
  await GET('', {
    baseUrl: url,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const postBuyCall = async data =>
  await POST(`content/account/purchase_offers/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const getSimilarBuyCall = async (url, headers) =>
  await GET(url, {
    baseUrl: `${config.baseUrl}`,
    headers,
  })
    .then(response => response)
    .catch(error => error.response);

const getCategoryCall = async () =>
  await GET(`content/static/categories/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getFittingsCall = async () =>
  await GET(`content/static/types_fittings/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const postImageCall = async data =>
  await POST(`content/asset/image/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const getFeedCall = async () =>
  await GET(`user/account/feed/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getRfqsCall = async () =>
  await GET(`content/rfq/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getBidsCall = async () =>
  await GET(`content/bid/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getUserProfileCall = async () =>
  await GET(`user/account/profile/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getUsersCall = async () =>
  await GET(`user/account/list_subaccounts/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getInboxCall = async () =>
  await GET(`content/inbox/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getMessagesCall = async uid =>
  await GET(`content/inbox/${uid}/messages/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
  })
    .then(response => response)
    .catch(error => error.response);

const postMessageCall = async (data, uid) =>
  await POST(`content/inbox/${uid}/messages/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const cancelRfqCall = async data =>
  await POST(`content/rfq/cancel/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const cancelBidCall = async data =>
  await POST(`content/bid/cancel/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const ignoreBidCall = async data =>
  await POST(`content/bid/ignore/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const acceptBidCall = async data =>
  await POST(`content/bid/accept/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const getIdBidCall = async url =>
  await GET(``, {
    baseUrl: url,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getIdRfqCall = async url =>
  await GET(``, {
    baseUrl: url,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

function* getTypesRequest() {
  try {
    const types = yield call(getTypesCall);
    yield put(getTypesSuccess(types.data.results));
  } catch (error) {
    console.error(error);
  }
}

function* getManufacturerRequest() {
  try {
    const manufacturers = yield call(getManufacturerCall);
    yield put(getManufacturerSuccess(manufacturers.data.results));
  } catch (error) {
    console.error(error);
  }
}

function* getModelsRequest() {
  try {
    const models = yield call(getModelsCall);
    yield put(getModelsSuccess(models.data.results));
  } catch (error) {
    console.error(error);
  }
}

function* getAssetRequest({ params }) {
  const { quip_type, country, mans_models } = params;
  try {
    const asset = yield call(getAssetCall, quip_type, country, mans_models);
    if (asset.status >= 200 && asset.status < 400) {
      yield put(getAssetSuccess(asset.data));
    } else {
      yield put(getAssetFailed(asset.data));
    }
  } catch (error) {
    yield put(getAssetFailed(error));
  }
}

function* postRfqRequest({ data }) {
  try {
    const rfq = yield call(postRfqCall, data);
    if (rfq.status >= 200 && rfq.status < 400) {
      yield put(postRfqSuccess(rfq.data));
    } else {
      yield put(postRfqFailed(rfq.data));
    }
  } catch (error) {
    yield put(postRfqFailed(error));
  }
}

function* postAssetRequest({ data }) {
  try {
    const asset = yield call(postAssetCall, data);
    if (asset.status >= 200 && asset.status < 400) {
      yield put(postAssetSuccess(asset.data));
    } else {
      yield put(postAssetFailed(asset.data));
    }
  } catch (error) {
    yield put(postAssetFailed(error));
  }
}

function* getCountriesRequest() {
  try {
    const countries = yield call(getCountriesCall);
    yield put(getCountriesSuccess(countries.data.results));
  } catch (error) {
    console.error(error);
  }
}

function* getMansModelsRequest() {
  try {
    const mans_models = yield call(getMansModelsCall);
    yield put(getMansModelsSuccess(mans_models.data.results));
  } catch (error) {
    console.error(error);
  }
}

function* rentAuthSearchRequest({ params }) {
  const {
    quip_type,
    country,
    mans_models,
    min_rating,
    is_legit,
    is_quip_verified,
    o_countries,
    min_man_year,
    max_quip_distance,
    max_quip_hours,
    fittings,
  } = params;
  try {
    const asset = yield call(
      rentAuthSearchCall,
      quip_type,
      country,
      mans_models,
      min_rating,
      is_legit,
      is_quip_verified,
      o_countries,
      min_man_year,
      max_quip_distance,
      max_quip_hours,
      fittings,
    );
    if (asset.status >= 200 && asset.status < 400) {
      yield put(rentAuthSearchSuccess(asset.data));
    } else {
      yield put(rentAuthSearchFailed(asset.data));
    }
  } catch (error) {
    yield put(rentAuthSearchFailed(error));
  }
}

function* postRentCostsRequest({ data }) {
  try {
    const rent_costs = yield call(postRentCostsCall, data);
    if (rent_costs.status >= 200 && rent_costs.status < 400) {
      yield put(postRentCostsSuccess(rent_costs.data));
    } else {
      yield put(postRentCostsFailed(rent_costs.data));
    }
  } catch (error) {
    yield put(postRentCostsFailed(error));
  }
}

function* getBidSearchRequest({ params }) {
  const { ordering, countries, for_rent, for_sale } = params;
  let url = `content/rfq/search/?ordering=${ordering}&countries=${countries}&for_rent=${for_rent}&for_sale=${for_sale}`;
  let headers = {
    'Content-Type': 'application/json',
  };
  if (localStorage.getItem('user_id')) {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    };
  }
  try {
    const asset = yield call(getBidSearchCall, url, headers);
    if (asset.status >= 200 && asset.status < 400) {
      yield put(getBidSearchSuccess(asset.data));
    } else {
      yield put(getBidSearchFailed(asset.data));
    }
  } catch (error) {
    yield put(getBidSearchFailed(error));
  }
}

function* getBidBasketRequest({ url }) {
  try {
    const asset = yield call(getBidBasketCall, url);
    if (asset.status >= 200 && asset.status < 400) {
      yield put(getBidBasketSuccess(asset.data));
    } else {
      yield put(getBidBasketFailed(asset.data));
    }
  } catch (error) {
    yield put(getBidBasketFailed(error));
  }
}

function* getOrgEquipRequest() {
  try {
    const org_equip = yield call(getOrgEquipCall);
    yield put(getOrgEquipSuccess(org_equip.data.results));
  } catch (error) {
    console.error(error);
  }
}

function* getEquipDetailsRequest({ url }) {
  try {
    const asset = yield call(getEquipDetailsCall, url);
    if (asset.status >= 200 && asset.status < 400) {
      yield put(getEquipDetailsSuccess(asset.data));
    } else {
      yield put(getEquipDetailsFailed(asset.data));
    }
  } catch (error) {
    yield put(getEquipDetailsFailed(error));
  }
}

function* postBidsRequest({ data }) {
  try {
    const rfq = yield call(postBidsCall, data);
    if (rfq.status >= 200 && rfq.status < 400) {
      yield put(postBidsSuccess(rfq.data));
    } else {
      yield put(postBidsFailed(rfq.data));
    }
  } catch (error) {
    yield put(postBidsFailed(error));
  }
}

function* getBuySearchRequest({ params }) {
  const {
    mans_models,
    quip_cat,
    country,
    keywords,
    for_sale,
    for_rent,
    min_rating,
    min_year,
    max_distance,
    max_hours,
    is_legit,
    is_quip_verified,
    o_countries,
    order,
    fittings,
    landing,
  } = params;
  let url = `content/asset/search/?mans_models=${mans_models}&quip_cat=${quip_cat}&country=${country}&keywords=${
    keywords ? keywords : ''
  }&for_sale=${for_sale ? for_sale : false}&for_rent=${
    for_rent ? for_rent : false
  }`;
  if (landing) {
    url += `&min_rating=${min_rating ? min_rating : ''}&min_year=${
      min_year ? min_year : ''
    }&max_distance=${max_distance ? max_distance : ''}&max_hours=${
      max_hours ? max_hours : ''
    }&is_legit=${is_legit ? is_legit : false}&is_quip_verified=${
      is_quip_verified ? is_quip_verified : false
    }&o_countries=${o_countries ? o_countries : ''}&order=${
      order ? order : ''
    }&fittings=${fittings ? fittings : ''}`;
  }
  let headers = {
    'Content-Type': 'application/json',
  };
  if (localStorage.getItem('user_id')) {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    };
  }
  try {
    const asset = yield call(getBuySearchCall, url, headers);
    if (asset.status >= 200 && asset.status < 400) {
      yield put(getBuySearchSuccess(asset.data));
    } else {
      yield put(getBuySearchFailed(asset.data));
    }
  } catch (error) {
    yield put(getBuySearchFailed(error));
  }
}

function* getBuyEquipRequest({ url }) {
  try {
    const asset = yield call(getBuyEquipCall, url);
    if (asset.status >= 200 && asset.status < 400) {
      yield put(getBuyEquipSuccess(asset.data));
    } else {
      yield put(getBuyEquipFailed(asset.data));
    }
  } catch (error) {
    yield put(getBuyEquipFailed(error));
  }
}

function* postBuyRequest({ data }) {
  try {
    const rfq = yield call(postBuyCall, data);
    if (rfq.status >= 200 && rfq.status < 400) {
      yield put(postBuySuccess(rfq.data));
    } else {
      yield put(postBuyFailed(rfq.data));
    }
  } catch (error) {
    yield put(postBuyFailed(error));
  }
}

function* getSimilarBuyRequest({ asset_uid }) {
  let url = `content/asset/similar_search/?asset_uid=${asset_uid}`;
  let headers = {
    'Content-Type': 'application/json',
  };
  try {
    const asset = yield call(getSimilarBuyCall, url, headers);
    if (asset.status >= 200 && asset.status < 400) {
      yield put(getSimilarBuySuccess(asset.data));
    } else {
      yield put(getSimilarBuyFailed(asset.data));
    }
  } catch (error) {
    yield put(getSimilarBuyFailed(error));
  }
}

function* getCategoryRequest() {
  try {
    const category = yield call(getCategoryCall);
    yield put(getCategorySuccess(category.data));
  } catch (error) {
    console.error(error);
  }
}

function* postImageRequest({ data }) {
  try {
    const asset = yield call(postImageCall, data);
    if (asset.status >= 200 && asset.status < 400) {
      yield put(postImageSuccess(asset.data));
    } else {
      yield put(postImageFailed(asset.data));
    }
  } catch (error) {
    yield put(postImageFailed(error));
  }
}

function* getFittingsRequest() {
  try {
    const fittings = yield call(getFittingsCall);
    yield put(getFittingsSuccess(fittings.data.results));
  } catch (error) {
    console.error(error);
  }
}

function* getFeedRequest() {
  try {
    const feeds = yield call(getFeedCall);
    if (feeds.status >= 200 && feeds.status < 400) {
      yield put(getFeedSuccess(feeds.data));
    } else {
      yield put(getFeedFailed(feeds.data));
    }
  } catch (error) {
    yield put(getFeedFailed(error));
  }
}

function* getRfqsRequest() {
  try {
    const rfqs = yield call(getRfqsCall);
    if (rfqs.status >= 200 && rfqs.status < 400) {
      yield put(getRfqsSuccess(rfqs.data));
    } else {
      yield put(getRfqsFailed(rfqs.data));
    }
  } catch (error) {
    yield put(getRfqsFailed(error));
  }
}

function* getBidsRequest() {
  try {
    const bids = yield call(getBidsCall);
    if (bids.status >= 200 && bids.status < 400) {
      yield put(getBidsSuccess(bids.data));
    } else {
      yield put(getBidsFailed(bids.data));
    }
  } catch (error) {
    yield put(getBidsFailed(error));
  }
}

function* getUserProfileRequest() {
  try {
    const user_profile = yield call(getUserProfileCall);
    if (user_profile.status >= 200 && user_profile.status < 400) {
      yield put(getUserProfileSuccess(user_profile.data));
    } else {
      yield put(getUserProfileFailed(user_profile.data));
    }
  } catch (error) {
    yield put(getUserProfileFailed(error));
  }
}

function* getUsersRequest() {
  try {
    const user_profile = yield call(getUsersCall);
    if (user_profile.status >= 200 && user_profile.status < 400) {
      yield put(getUsersSuccess(user_profile.data));
    } else {
      yield put(getUsersFailed(user_profile.data));
    }
  } catch (error) {
    yield put(getUsersFailed(error));
  }
}

function* getInboxRequest() {
  try {
    const inbox = yield call(getInboxCall);
    if (inbox.status >= 200 && inbox.status < 400) {
      yield put(getInboxSuccess(inbox.data));
    } else {
      yield put(getInboxFailed(inbox.data));
    }
  } catch (error) {
    yield put(getInboxFailed(error));
  }
}

function* getMessagesRequest({ uid }) {
  try {
    const inbox = yield call(getMessagesCall, uid);
    if (inbox.status >= 200 && inbox.status < 400) {
      yield put(getMessagesSuccess(inbox.data));
    } else {
      yield put(getMessagesFailed(inbox.data));
    }
  } catch (error) {
    yield put(getMessagesFailed(error));
  }
}

function* postMessageRequest({ data }) {
  let uid = data.get('conversation_uid');
  try {
    const inbox = yield call(postMessageCall, data, uid);
    if (inbox.status >= 200 && inbox.status < 400) {
      yield put(postMessageSuccess(inbox.data));
    } else {
      yield put(postMessageFailed(inbox.data));
    }
  } catch (error) {
    yield put(postMessageFailed(error));
  }
}

function* cancelRfqRequest({ data }) {
  try {
    const inbox = yield call(cancelRfqCall, data);
    if (inbox.status >= 200 && inbox.status < 400) {
      yield put(cancelRfqSuccess(inbox.data));
    } else {
      yield put(cancelRfqFailed(inbox.data));
    }
  } catch (error) {
    yield put(cancelRfqFailed(error));
  }
}

function* cancelBidRequest({ data }) {
  try {
    const inbox = yield call(cancelBidCall, data);
    if (inbox.status >= 200 && inbox.status < 400) {
      yield put(cancelBidSuccess(inbox.data));
    } else {
      yield put(cancelBidFailed(inbox.data));
    }
  } catch (error) {
    yield put(cancelBidFailed(error));
  }
}

function* ignoreBidRequest({ data }) {
  try {
    const inbox = yield call(ignoreBidCall, data);
    if (inbox.status >= 200 && inbox.status < 400) {
      yield put(ignoreBidSuccess(inbox.data));
    } else {
      yield put(ignoreBidFailed(inbox.data));
    }
  } catch (error) {
    yield put(ignoreBidFailed(error));
  }
}

function* acceptBidRequest({ data }) {
  try {
    const inbox = yield call(acceptBidCall, data);
    if (inbox.status >= 200 && inbox.status < 400) {
      yield put(acceptBidSuccess(inbox.data));
    } else {
      yield put(acceptBidFailed(inbox.data));
    }
  } catch (error) {
    yield put(acceptBidFailed(error));
  }
}

function* getIdBidRequest({ url }) {
  try {
    const inbox = yield call(getIdBidCall, url);
    if (inbox.status >= 200 && inbox.status < 400) {
      yield put(getIdBidSuccess(inbox.data));
    } else {
      yield put(getIdBidFailed(inbox.data));
    }
  } catch (error) {
    yield put(getIdBidFailed(error));
  }
}

function* getIdRfqRequest({ url }) {
  try {
    const inbox = yield call(getIdRfqCall, url);
    if (inbox.status >= 200 && inbox.status < 400) {
      yield put(getIdRfqSuccess(inbox.data));
    } else {
      yield put(getIdRfqFailed(inbox.data));
    }
  } catch (error) {
    yield put(getIdRfqFailed(error));
  }
}

export function* getTypes() {
  yield takeEvery(GET_TYPES, getTypesRequest);
}

export function* getManufacturer() {
  yield takeEvery(GET_MANUFACTURER, getManufacturerRequest);
}

export function* getModels() {
  yield takeEvery(GET_MODELS, getModelsRequest);
}

export function* getAsset() {
  yield takeEvery(GET_ASSET, getAssetRequest);
}

export function* postRfq() {
  yield takeEvery(POST_RFQ, postRfqRequest);
}

export function* postAsset() {
  yield takeEvery(POST_ASSET, postAssetRequest);
}

export function* getCountries() {
  yield takeEvery(GET_COUNTRIES, getCountriesRequest);
}

export function* getMansModels() {
  yield takeEvery(GET_MANS_MODELS, getMansModelsRequest);
}

export function* rentAuthSearch() {
  yield takeEvery(RENT_AUTH_SEARCH, rentAuthSearchRequest);
}

export function* postRentCosts() {
  yield takeEvery(POST_RENT_COSTS, postRentCostsRequest);
}

export function* getBidSearch() {
  yield takeEvery(GET_BID_SEARCH, getBidSearchRequest);
}

export function* getBidBasket() {
  yield takeEvery(GET_BID_BASKET, getBidBasketRequest);
}

export function* getOrgEquip() {
  yield takeEvery(GET_ORG_EQUIP, getOrgEquipRequest);
}

export function* getEquipDetails() {
  yield takeEvery(GET_EQUIP_DETAILS, getEquipDetailsRequest);
}

export function* postBids() {
  yield takeEvery(POST_BIDS, postBidsRequest);
}

export function* getBuySearch() {
  yield takeEvery(GET_BUY_SEARCH, getBuySearchRequest);
}

export function* getBuyEquip() {
  yield takeEvery(GET_BUY_EQUIP, getBuyEquipRequest);
}

export function* postBuy() {
  yield takeEvery(POST_BUY, postBuyRequest);
}

export function* getSimilarBuy() {
  yield takeEvery(GET_SIMILAR_BUY, getSimilarBuyRequest);
}

export function* getCategory() {
  yield takeEvery(GET_CATEGORY, getCategoryRequest);
}

export function* getFittings() {
  yield takeEvery(GET_FITTINGS, getFittingsRequest);
}

export function* postImage() {
  yield takeEvery(POST_IMAGE, postImageRequest);
}

export function* getFeed() {
  yield takeEvery(GET_FEED, getFeedRequest);
}

export function* getRfqs() {
  yield takeEvery(GET_RFQS, getRfqsRequest);
}

export function* getBids() {
  yield takeEvery(GET_BIDS, getBidsRequest);
}

export function* getUserProfile() {
  yield takeEvery(GET_USER_PROFILE, getUserProfileRequest);
}

export function* getUsers() {
  yield takeEvery(GET_USERS, getUsersRequest);
}

export function* getInbox() {
  yield takeEvery(GET_INBOX, getInboxRequest);
}

export function* getMessages() {
  yield takeEvery(GET_MESSAGES, getMessagesRequest);
}

export function* postMessage() {
  yield takeEvery(POST_MESSAGE, postMessageRequest);
}

export function* cancelRfq() {
  yield takeEvery(CANCEL_RFQ, cancelRfqRequest);
}

export function* cancelBid() {
  yield takeEvery(CANCEL_BID, cancelBidRequest);
}

export function* getIdBid() {
  yield takeEvery(GET_ID_BID, getIdBidRequest);
}

export function* getIdRfq() {
  yield takeEvery(GET_ID_RFQ, getIdRfqRequest);
}

export function* ignoreBid() {
  yield takeEvery(IGNORE_BID, ignoreBidRequest);
}

export function* acceptBid() {
  yield takeEvery(ACCEPT_BID, acceptBidRequest);
}

export default function* rootSaga() {
  yield all([
    fork(getTypes),
    fork(getManufacturer),
    fork(getModels),
    fork(getAsset),
    fork(postRfq),
    fork(postAsset),
    fork(getCountries),
    fork(getMansModels),
    fork(rentAuthSearch),
    fork(postRentCosts),
    fork(getBidSearch),
    fork(getBidBasket),
    fork(getOrgEquip),
    fork(getEquipDetails),
    fork(postBids),
    fork(getBuySearch),
    fork(getBuyEquip),
    fork(postBuy),
    fork(getSimilarBuy),
    fork(getCategory),
    fork(getFittings),
    fork(postImage),
    fork(getFeed),
    fork(getRfqs),
    fork(getBids),
    fork(getUserProfile),
    fork(getUsers),
    fork(getInbox),
    fork(getMessages),
    fork(postMessage),
    fork(cancelRfq),
    fork(cancelBid),
    fork(getIdBid),
    fork(getIdRfq),
    fork(ignoreBid),
    fork(acceptBid),
  ]);
}
