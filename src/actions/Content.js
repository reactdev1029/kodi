import {
  GET_TYPES,
  GET_TYPES_SUCCESS,
  GET_MANUFACTURER,
  GET_MANUFACTURER_SUCCESS,
  GET_ADDRESS,
  GET_COORDINATES,
  GET_SELECTED_TYPE,
  GET_SELECTED_MANUFACTURER,
  GET_MODELS,
  GET_MODELS_SUCCESS,
  GET_SELECTED_MODEL,
  WORKING_HOURS,
  GET_ASSET,
  GET_ASSET_SUCCESS,
  GET_ASSET_FAILED,
  GET_RATING,
  GET_SORT,
  GET_VERIFIED,
  GET_SELECTED_RESULT,
  POST_RFQ,
  POST_RFQ_SUCCESS,
  POST_RFQ_FAILED,
  POST_ASSET,
  POST_ASSET_SUCCESS,
  POST_ASSET_FAILED,
  SET_SEARCH_TYPE,
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_SELECTED_COUNTRY,
  GET_MANS_MODELS,
  GET_MANS_MODELS_SUCCESS,
  GET_LEGIT,
  GET_MIN_MAN_YEAR,
  GET_MAX_DISTANCE,
  RENT_AUTH_SEARCH,
  RENT_AUTH_SEARCH_SUCCESS,
  RENT_AUTH_SEARCH_FAILED,
  ADD_TO_RFQ,
  POST_RENT_COSTS,
  POST_RENT_COSTS_SUCCESS,
  POST_RENT_COSTS_FAILED,
  DATETIME_START,
  DATETIME_END,
  GET_PLACE,
  ERROR_CLEAR,
  GET_BID_MIN_VALUE,
  GET_BID_SEARCH,
  GET_BID_SEARCH_SUCCESS,
  GET_BID_SEARCH_FAILED,
  GET_BID_BASKET,
  GET_BID_BASKET_SUCCESS,
  GET_BID_BASKET_FAILED,
  GET_ORG_EQUIP,
  GET_ORG_EQUIP_SUCCESS,
  GET_EQUIP_DETAILS,
  GET_EQUIP_DETAILS_SUCCESS,
  GET_EQUIP_DETAILS_FAILED,
  POST_BIDS,
  POST_BIDS_SUCCESS,
  POST_BIDS_FAILED,
  GET_BUY_SEARCH,
  GET_BUY_SEARCH_SUCCESS,
  GET_BUY_SEARCH_FAILED,
  GET_BUY_EQUIP,
  GET_BUY_EQUIP_SUCCESS,
  GET_BUY_EQUIP_FAILED,
  POST_BUY,
  POST_BUY_SUCCESS,
  POST_BUY_FAILED,
  GET_SIMILAR_BUY,
  GET_SIMILAR_BUY_SUCCESS,
  GET_SIMILAR_BUY_FAILED,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_SELECTED_CATEGORY,
  GET_SELECTED_SUB_CATEGORY,
  GET_ORDER,
  GET_KEYWORD,
  GET_AVAILABILITY,
  GET_COUNTRIES_STATUS,
  GET_FITTINGS,
  GET_FITTINGS_SUCCESS,
  GET_FITTINGS_STATUS,
  GET_MANUFACTURER_STATUS,
  GET_MODEL_STATUS,
  POST_IMAGE,
  POST_IMAGE_SUCCESS,
  POST_IMAGE_FAILED,
  GET_PURPOSE,
  GET_FEED,
  GET_FEED_SUCCESS,
  GET_FEED_FAILED,
  GET_RFQS,
  GET_RFQS_SUCCESS,
  GET_RFQS_FAILED,
  GET_BIDS,
  GET_BIDS_SUCCESS,
  GET_BIDS_FAILED,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  GET_INBOX,
  GET_INBOX_SUCCESS,
  GET_INBOX_FAILED,
  GET_MESSAGES,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILED,
  POST_MESSAGE,
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_FAILED,
  CANCEL_RFQ,
  CANCEL_RFQ_SUCCESS,
  CANCEL_RFQ_FAILED,
  CANCEL_BID,
  CANCEL_BID_SUCCESS,
  CANCEL_BID_FAILED,
  GET_ID_BID,
  GET_ID_BID_SUCCESS,
  GET_ID_BID_FAILED,
  GET_ID_RFQ,
  GET_ID_RFQ_SUCCESS,
  GET_ID_RFQ_FAILED,
  IGNORE_BID,
  IGNORE_BID_SUCCESS,
  IGNORE_BID_FAILED,
  ACCEPT_BID,
  ACCEPT_BID_SUCCESS,
  ACCEPT_BID_FAILED,
} from 'constants/ActionTypes';

export function getTypes() {
  return {
    type: GET_TYPES,
  };
}

export function getTypesSuccess(types) {
  return {
    type: GET_TYPES_SUCCESS,
    types,
  };
}

export function getManufacturer() {
  return {
    type: GET_MANUFACTURER,
  };
}

export function getManufacturerSuccess(manufacturers) {
  return {
    type: GET_MANUFACTURER_SUCCESS,
    manufacturers,
  };
}

export function getAddress(address) {
  return {
    type: GET_ADDRESS,
    address,
  };
}

export function getCoordinates(coordinates) {
  return {
    type: GET_COORDINATES,
    coordinates,
  };
}

export function getSelectedType(selectedType) {
  return {
    type: GET_SELECTED_TYPE,
    selectedType,
  };
}

export function getSelectedManufacturer(selectedManufacturer) {
  return {
    type: GET_SELECTED_MANUFACTURER,
    selectedManufacturer,
  };
}

export function getModels() {
  return {
    type: GET_MODELS,
  };
}

export function getModelsSuccess(types_models) {
  return {
    type: GET_MODELS_SUCCESS,
    types_models,
  };
}

export function getSelectedModel(selectedModel) {
  return {
    type: GET_SELECTED_MODEL,
    selectedModel,
  };
}

export function getWorkingHours(max_quip_hours) {
  return {
    type: WORKING_HOURS,
    max_quip_hours,
  };
}

export function getAsset(params) {
  return {
    type: GET_ASSET,
    params,
  };
}

export function getAssetSuccess(asset) {
  return {
    type: GET_ASSET_SUCCESS,
    asset,
  };
}

export function getAssetFailed(error) {
  return {
    type: GET_ASSET_FAILED,
    error,
  };
}

export function getRating(min_rating) {
  return {
    type: GET_RATING,
    min_rating,
  };
}

export function getSort(sort) {
  return {
    type: GET_SORT,
    sort,
  };
}

export function getVerified(is_quip_verified) {
  return {
    type: GET_VERIFIED,
    is_quip_verified,
  };
}

export function getSelectedResult(result) {
  return {
    type: GET_SELECTED_RESULT,
    result,
  };
}

export function postRfq(data) {
  return {
    type: POST_RFQ,
    data,
  };
}

export function postRfqSuccess(rfq) {
  return {
    type: POST_RFQ_SUCCESS,
    rfq,
  };
}

export function postRfqFailed(error) {
  return {
    type: POST_RFQ_FAILED,
    error,
  };
}

export function postAsset(data) {
  return {
    type: POST_ASSET,
    data,
  };
}

export function postAssetSuccess(postedAsset) {
  return {
    type: POST_ASSET_SUCCESS,
    postedAsset,
  };
}

export function postAssetFailed(error) {
  return {
    type: POST_ASSET_FAILED,
    error,
  };
}

export function setSearchType(searchType) {
  return {
    type: SET_SEARCH_TYPE,
    searchType,
  };
}

export function getCountries() {
  return {
    type: GET_COUNTRIES,
  };
}

export function getCountriesSuccess(countries) {
  return {
    type: GET_COUNTRIES_SUCCESS,
    countries,
  };
}

export function getSelectedCountry(selectedCountry) {
  return {
    type: GET_SELECTED_COUNTRY,
    selectedCountry,
  };
}

export function getMansModels() {
  return {
    type: GET_MANS_MODELS,
  };
}

export function getMansModelsSuccess(mans_models) {
  return {
    type: GET_MANS_MODELS_SUCCESS,
    mans_models,
  };
}

export function getLegit(is_legit) {
  return {
    type: GET_LEGIT,
    is_legit,
  };
}

export function getMinManYear(min_man_year) {
  return {
    type: GET_MIN_MAN_YEAR,
    min_man_year,
  };
}

export function getMaxDistance(max_quip_distance) {
  return {
    type: GET_MAX_DISTANCE,
    max_quip_distance,
  };
}

export function rentAuthSearch(params) {
  return {
    type: RENT_AUTH_SEARCH,
    params,
  };
}

export function rentAuthSearchSuccess(rent_auth_search) {
  return {
    type: RENT_AUTH_SEARCH_SUCCESS,
    rent_auth_search,
  };
}

export function rentAuthSearchFailed(error) {
  return {
    type: RENT_AUTH_SEARCH_FAILED,
    error,
  };
}

export function addToRfq(rfq_items) {
  return {
    type: ADD_TO_RFQ,
    rfq_items,
  };
}

export function postRentCosts(data) {
  return {
    type: POST_RENT_COSTS,
    data,
  };
}

export function postRentCostsSuccess(rent_costs) {
  return {
    type: POST_RENT_COSTS_SUCCESS,
    rent_costs,
  };
}

export function postRentCostsFailed(error) {
  return {
    type: POST_RENT_COSTS_FAILED,
    error,
  };
}

export function datetimeStart(datetime_start) {
  return {
    type: DATETIME_START,
    datetime_start,
  };
}

export function datetimeEnd(datetime_end) {
  return {
    type: DATETIME_END,
    datetime_end,
  };
}

export function getPlace(place) {
  return {
    type: GET_PLACE,
    place,
  };
}

export const errorClear = () => {
  return {
    type: ERROR_CLEAR,
  };
};

export const getBidMinValue = min_total_value => {
  return {
    type: GET_BID_MIN_VALUE,
    min_total_value,
  };
};

export const getBidSearch = params => {
  return {
    type: GET_BID_SEARCH,
    params,
  };
};

export const getBidSearchSuccess = bid_search => {
  return {
    type: GET_BID_SEARCH_SUCCESS,
    bid_search,
  };
};

export const getBidSearchFailed = error => {
  return {
    type: GET_BID_SEARCH_FAILED,
    error,
  };
};

export const getBidBasket = url => {
  return {
    type: GET_BID_BASKET,
    url,
  };
};

export const getBidBasketSuccess = bid_rfq_items => {
  return {
    type: GET_BID_BASKET_SUCCESS,
    bid_rfq_items,
  };
};

export const getBidBasketFailed = error => {
  return {
    type: GET_BID_BASKET_FAILED,
    error,
  };
};

export function getOrgEquip() {
  return {
    type: GET_ORG_EQUIP,
  };
}

export function getOrgEquipSuccess(org_equipment_list) {
  return {
    type: GET_ORG_EQUIP_SUCCESS,
    org_equipment_list,
  };
}

export const getEquipDetails = url => {
  return {
    type: GET_EQUIP_DETAILS,
    url,
  };
};

export const getEquipDetailsSuccess = equip_details => {
  return {
    type: GET_EQUIP_DETAILS_SUCCESS,
    equip_details,
  };
};

export const getEquipDetailsFailed = error => {
  return {
    type: GET_EQUIP_DETAILS_FAILED,
    error,
  };
};

export function postBids(data) {
  return {
    type: POST_BIDS,
    data,
  };
}

export function postBidsSuccess(rfq) {
  return {
    type: POST_BIDS_SUCCESS,
    rfq,
  };
}

export function postBidsFailed(error) {
  return {
    type: POST_BIDS_FAILED,
    error,
  };
}

export const getBuySearch = params => {
  return {
    type: GET_BUY_SEARCH,
    params,
  };
};

export const getBuySearchSuccess = buy_search => {
  return {
    type: GET_BUY_SEARCH_SUCCESS,
    buy_search,
  };
};

export const getBuySearchFailed = error => {
  return {
    type: GET_BUY_SEARCH_FAILED,
    error,
  };
};

export const getBuyEquip = url => {
  return {
    type: GET_BUY_EQUIP,
    url,
  };
};

export const getBuyEquipSuccess = buy_equip_details => {
  return {
    type: GET_BUY_EQUIP_SUCCESS,
    buy_equip_details,
  };
};

export const getBuyEquipFailed = error => {
  return {
    type: GET_BUY_EQUIP_FAILED,
    error,
  };
};

export function postBuy(data) {
  return {
    type: POST_BUY,
    data,
  };
}

export function postBuySuccess(rfq) {
  return {
    type: POST_BUY_SUCCESS,
    rfq,
  };
}

export function postBuyFailed(error) {
  return {
    type: POST_BUY_FAILED,
    error,
  };
}

export function getSimilarBuy(asset_uid) {
  return {
    type: GET_SIMILAR_BUY,
    asset_uid,
  };
}

export function getSimilarBuySuccess(buy_search) {
  return {
    type: GET_SIMILAR_BUY_SUCCESS,
    buy_search,
  };
}

export function getSimilarBuyFailed(error) {
  return {
    type: GET_SIMILAR_BUY_FAILED,
    error,
  };
}

export function getCategory() {
  return {
    type: GET_CATEGORY,
  };
}

export function getCategorySuccess(category) {
  return {
    type: GET_CATEGORY_SUCCESS,
    category,
  };
}

export function getSelectedCategory(selectedCategory) {
  return {
    type: GET_SELECTED_CATEGORY,
    selectedCategory,
  };
}

export function getSelectedSubCategory(selectedSubCategory) {
  return {
    type: GET_SELECTED_SUB_CATEGORY,
    selectedSubCategory,
  };
}

export function getOrder(order) {
  return {
    type: GET_ORDER,
    order,
  };
}

export function getKeyword(keywords) {
  return {
    type: GET_KEYWORD,
    keywords,
  };
}

export function getAvailability(availability) {
  return {
    type: GET_AVAILABILITY,
    availability,
  };
}

export function getCountriesStatus(countriesStatus) {
  return {
    type: GET_COUNTRIES_STATUS,
    countriesStatus,
  };
}

export function getFittings() {
  return {
    type: GET_FITTINGS,
  };
}

export function getFittingsSuccess(fittings) {
  return {
    type: GET_FITTINGS_SUCCESS,
    fittings,
  };
}

export function getFittingsStatus(fittingsStatus) {
  return {
    type: GET_FITTINGS_STATUS,
    fittingsStatus,
  };
}

export function getManufacturerStatus(manufacturersStatus) {
  return {
    type: GET_MANUFACTURER_STATUS,
    manufacturersStatus,
  };
}

export function getModelStatus(modelsStatus) {
  return {
    type: GET_MODEL_STATUS,
    modelsStatus,
  };
}

export function postImage(data) {
  return {
    type: POST_IMAGE,
    data,
  };
}

export function postImageSuccess(postedImage) {
  return {
    type: POST_IMAGE_SUCCESS,
    postedImage,
  };
}

export function postImageFailed(error) {
  return {
    type: POST_IMAGE_FAILED,
    error,
  };
}

export function getPurpose(purpose) {
  return {
    type: GET_PURPOSE,
    purpose,
  };
}

export function getFeed() {
  return {
    type: GET_FEED,
  };
}

export function getFeedSuccess(feeds) {
  return {
    type: GET_FEED_SUCCESS,
    feeds,
  };
}

export function getFeedFailed(error) {
  return {
    type: GET_FEED_FAILED,
    error,
  };
}

export function getRfqs() {
  return {
    type: GET_RFQS,
  };
}

export function getRfqsSuccess(rfqs) {
  return {
    type: GET_RFQS_SUCCESS,
    rfqs,
  };
}

export function getRfqsFailed(error) {
  return {
    type: GET_RFQS_FAILED,
    error,
  };
}

export function getBids() {
  return {
    type: GET_BIDS,
  };
}

export function getBidsSuccess(bids) {
  return {
    type: GET_BIDS_SUCCESS,
    bids,
  };
}

export function getBidsFailed(error) {
  return {
    type: GET_BIDS_FAILED,
    error,
  };
}

export function getUserProfile() {
  return {
    type: GET_USER_PROFILE,
  };
}

export function getUserProfileSuccess(user_profile) {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    user_profile,
  };
}

export function getUserProfileFailed(error) {
  return {
    type: GET_USER_PROFILE_FAILED,
    error,
  };
}

export function getUsers() {
  return {
    type: GET_USERS,
  };
}

export function getUsersSuccess(sub_users) {
  return {
    type: GET_USERS_SUCCESS,
    sub_users,
  };
}

export function getUsersFailed(error) {
  return {
    type: GET_USERS_FAILED,
    error,
  };
}

export function getInbox() {
  return {
    type: GET_INBOX,
  };
}

export function getInboxSuccess(inbox) {
  return {
    type: GET_INBOX_SUCCESS,
    inbox,
  };
}

export function getInboxFailed(error) {
  return {
    type: GET_INBOX_FAILED,
    error,
  };
}

export function getMessages(uid) {
  return {
    type: GET_MESSAGES,
    uid,
  };
}

export function getMessagesSuccess(messages) {
  return {
    type: GET_MESSAGES_SUCCESS,
    messages,
  };
}

export function getMessagesFailed(error) {
  return {
    type: GET_MESSAGES_FAILED,
    error,
  };
}

export function postMessage(data) {
  return {
    type: POST_MESSAGE,
    data,
  };
}

export function postMessageSuccess(messages) {
  return {
    type: POST_MESSAGE_SUCCESS,
    messages,
  };
}

export function postMessageFailed(error) {
  return {
    type: POST_MESSAGE_FAILED,
    error,
  };
}

export function cancelRfq(data) {
  return {
    type: CANCEL_RFQ,
    data,
  };
}

export function cancelRfqSuccess(rfq) {
  return {
    type: CANCEL_RFQ_SUCCESS,
    rfq,
  };
}

export function cancelRfqFailed(error) {
  return {
    type: CANCEL_RFQ_FAILED,
    error,
  };
}

export function cancelBid(data) {
  return {
    type: CANCEL_BID,
    data,
  };
}

export function cancelBidSuccess(cancel_bid) {
  return {
    type: CANCEL_BID_SUCCESS,
    cancel_bid,
  };
}

export function cancelBidFailed(error) {
  return {
    type: CANCEL_BID_FAILED,
    error,
  };
}

export function getIdBid(url) {
  return {
    type: GET_ID_BID,
    url,
  };
}

export function getIdBidSuccess(id_bid) {
  return {
    type: GET_ID_BID_SUCCESS,
    id_bid,
  };
}

export function getIdBidFailed(error) {
  return {
    type: GET_ID_BID_FAILED,
    error,
  };
}

export function getIdRfq(url) {
  return {
    type: GET_ID_RFQ,
    url,
  };
}

export function getIdRfqSuccess(id_rfq) {
  return {
    type: GET_ID_RFQ_SUCCESS,
    id_rfq,
  };
}

export function getIdRfqFailed(error) {
  return {
    type: GET_ID_RFQ_FAILED,
    error,
  };
}

export function ignoreBid(data) {
  return {
    type: IGNORE_BID,
    data,
  };
}

export function ignoreBidSuccess(ignore_bid) {
  return {
    type: IGNORE_BID_SUCCESS,
    ignore_bid,
  };
}

export function ignoreBidFailed(error) {
  return {
    type: IGNORE_BID_FAILED,
    error,
  };
}

export function acceptBid(data) {
  return {
    type: ACCEPT_BID,
    data,
  };
}

export function acceptBidSuccess(bid) {
  return {
    type: ACCEPT_BID_SUCCESS,
    bid,
  };
}

export function acceptBidFailed(error) {
  return {
    type: ACCEPT_BID_FAILED,
    error,
  };
}
