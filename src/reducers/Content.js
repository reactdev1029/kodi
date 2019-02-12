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
  GET_COUNTRIES_SUCCESS,
  GET_SELECTED_COUNTRY,
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
  GET_INBOX_FAIELD,
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

const INIT_STATE = {
  searchLoader: false,
  loader: false,
  types: undefined,
  manufacturers: undefined,
  address: '',
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  selectedType: '',
  selectedManufacturer: '',
  types_models: undefined,
  selectedModel: '',
  max_quip_hours: 100,
  rent_search: undefined,
  error: undefined,
  min_rating: 2,
  ordering: 'for_sale',
  is_quip_verified: true,
  storedResult: undefined,
  rfq: undefined,
  typesList: [],
  manufacturersList: [],
  modelsList: [],
  postedAsset: undefined,
  searchType: undefined,
  countries: undefined,
  countriesList: [],
  countriesStatus: undefined,
  selectedCountry: '',
  mans_models: undefined,
  is_legit: true,
  min_man_year: 1980,
  max_quip_distance: 100,
  rfq_items: [],
  rent_costs: {
    subtotal_value: '',
    transit_value: '',
    total_value: '',
    currency: 'usd',
  },
  datetime_start: null,
  datetime_end: null,
  place: {
    country: '',
    city: '',
    latitude: null,
    longitude: null,
  },
  min_total_value: 0,
  bid_search: undefined,
  bid_rfq_items: undefined,
  org_equipment_list: undefined,
  equip_details: undefined,
  buy_search: undefined,
  buy_equip_details: undefined,
  category: undefined,
  categoryList: [],
  selectedCategory: '',
  selectedSubCategory: '',
  order: '',
  keywords: '',
  availability: {
    for_sale: false,
    for_rent: false,
  },
  fittings: undefined,
  fittingsStatus: undefined,
  manufacturersStatus: undefined,
  modelsStatus: undefined,
  postedImage: undefined,
  purpose: 'rent',
  feeds: undefined,
  rfqs: undefined,
  bids: undefined,
  user_profile: undefined,
  sub_users: undefined,
  inbox: undefined,
  messages: undefined,
  id_bid: undefined,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TYPES_SUCCESS: {
      return {
        ...state,
        types: action.types,
        typesList: action.types.map(suggestion => ({
          value: suggestion.name,
          label: suggestion.name,
        })),
      };
    }
    case GET_MANUFACTURER_SUCCESS: {
      return {
        ...state,
        manufacturers: action.manufacturers,
        manufacturersList: action.manufacturers.map(list => ({
          value: list.name,
          label: list.name,
        })),
      };
    }
    case GET_ADDRESS: {
      return {
        ...state,
        address: action.address,
      };
    }
    case GET_COORDINATES: {
      return {
        ...state,
        coordinates: action.coordinates,
      };
    }
    case GET_SELECTED_TYPE: {
      return {
        ...state,
        selectedType: action.selectedType,
        error: undefined,
      };
    }
    case GET_SELECTED_MANUFACTURER: {
      return {
        ...state,
        selectedManufacturer: action.selectedManufacturer,
        selectedModel: '',
      };
    }
    case GET_MODELS_SUCCESS: {
      return {
        ...state,
        types_models: action.types_models,
        modelsList: action.types_models.map(list => ({
          value: list.name,
          label: list.name,
        })),
      };
    }
    case GET_SELECTED_MODEL: {
      return {
        ...state,
        selectedModel: action.selectedModel,
      };
    }
    case WORKING_HOURS: {
      return {
        ...state,
        max_quip_hours: action.max_quip_hours,
      };
    }
    case GET_ASSET: {
      return {
        ...state,
        searchLoader: true,
        error: undefined,
        bid_search: undefined,
      };
    }
    case GET_ASSET_SUCCESS: {
      return {
        ...state,
        searchLoader: false,
        rent_search: action.asset,
      };
    }
    case GET_ASSET_FAILED: {
      return {
        ...state,
        searchLoader: false,
        error: action.error,
        rent_search: undefined,
      };
    }
    case GET_RATING: {
      return {
        ...state,
        min_rating: action.min_rating,
      };
    }
    case GET_SORT: {
      return {
        ...state,
        ordering: action.sort,
      };
    }
    case GET_VERIFIED: {
      return {
        ...state,
        is_quip_verified: action.is_quip_verified,
      };
    }
    case GET_SELECTED_RESULT: {
      return {
        ...state,
        storedResult: action.result,
      };
    }
    case POST_RFQ: {
      return {
        ...state,
        loader: true,
        rfq: undefined,
        error: undefined,
      };
    }
    case POST_RFQ_SUCCESS: {
      return {
        ...state,
        loader: false,
        rfq: action.rfq,
        error: undefined,
        rent_costs: {
          subtotal_value: '',
          transit_value: '',
          total_value: '',
          currency: 'usd',
        },
        datetime_start: null,
        datetime_end: null,
        place: {
          country: '',
          city: '',
          latitude: null,
          longitude: null,
        },
        rfq_items: [],
      };
    }
    case POST_RFQ_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
        rfq: undefined,
      };
    }
    case POST_ASSET: {
      return {
        ...state,
        loader: true,
        postedAsset: undefined,
        error: undefined,
      };
    }
    case POST_ASSET_SUCCESS: {
      return {
        ...state,
        loader: false,
        postedAsset: action.postedAsset,
        error: undefined,
      };
    }
    case POST_ASSET_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case SET_SEARCH_TYPE: {
      return {
        ...state,
        searchType: action.searchType,
      };
    }
    case GET_COUNTRIES_SUCCESS: {
      let countriesStatus = {};
      for (var i = 0; i < action.countries.length; i++) {
        countriesStatus[action.countries[i].name] = false;
      }
      return {
        ...state,
        countries: action.countries,
        countriesList: action.countries.map(suggestion => ({
          value: suggestion.name,
          label: suggestion.name,
        })),
        countriesStatus,
      };
    }
    case GET_SELECTED_COUNTRY: {
      return {
        ...state,
        selectedCountry: action.selectedCountry,
        error: undefined,
      };
    }
    case GET_MANS_MODELS_SUCCESS: {
      let manufacturersStatus = {};
      let modelsStatus = {};
      for (var i = 0; i < action.mans_models.length; i++) {
        manufacturersStatus[action.mans_models[i].name] = false;
        modelsStatus[action.mans_models[i].name] = {};
        for (var j = 0; j < action.mans_models[i].models.length; j++) {
          modelsStatus[action.mans_models[i].name][
            action.mans_models[i].models[j]
          ] = false;
        }
      }
      return {
        ...state,
        mans_models: action.mans_models,
        error: undefined,
        manufacturersStatus,
        modelsStatus,
      };
    }
    case GET_LEGIT: {
      return {
        ...state,
        is_legit: action.is_legit,
      };
    }
    case GET_MIN_MAN_YEAR: {
      return {
        ...state,
        min_man_year: action.min_man_year,
      };
    }
    case GET_MAX_DISTANCE: {
      return {
        ...state,
        max_quip_distance: action.max_quip_distance,
      };
    }
    case RENT_AUTH_SEARCH: {
      return {
        ...state,
        searchLoader: true,
        error: undefined,
        bid_search: undefined,
      };
    }
    case RENT_AUTH_SEARCH_SUCCESS: {
      return {
        ...state,
        searchLoader: false,
        rent_search: action.rent_auth_search,
      };
    }
    case RENT_AUTH_SEARCH_FAILED: {
      return {
        ...state,
        searchLoader: false,
        error: action.error,
        rent_search: undefined,
      };
    }
    case ADD_TO_RFQ: {
      return {
        ...state,
        rfq_items: action.rfq_items,
      };
    }
    case POST_RENT_COSTS_SUCCESS: {
      return {
        ...state,
        rent_costs: action.rent_costs,
        error: undefined,
      };
    }
    case POST_RENT_COSTS_FAILED: {
      return {
        ...state,
        error: action.error,
      };
    }
    case DATETIME_START: {
      return {
        ...state,
        datetime_start: action.datetime_start,
      };
    }
    case DATETIME_END: {
      return {
        ...state,
        datetime_end: action.datetime_end,
      };
    }
    case GET_PLACE: {
      return {
        ...state,
        place: action.place,
      };
    }
    case ERROR_CLEAR: {
      return {
        ...state,
        searchLoader: false,
        loader: false,
        error: undefined,
        rfq: undefined,
        bid_rfq_items: undefined,
      };
    }
    case GET_BID_MIN_VALUE: {
      return {
        ...state,
        min_total_value: action.min_total_value,
      };
    }
    case GET_BID_SEARCH: {
      return {
        ...state,
        searchLoader: true,
        error: undefined,
        rent_search: undefined,
      };
    }
    case GET_BID_SEARCH_SUCCESS: {
      return {
        ...state,
        searchLoader: false,
        error: undefined,
        bid_search: action.bid_search,
      };
    }
    case GET_BID_SEARCH_FAILED: {
      return {
        ...state,
        searchLoader: false,
        error: action.error,
        bid_search: undefined,
      };
    }
    case GET_BID_BASKET: {
      return {
        ...state,
        loader: true,
        buy_equip_details: undefined,
        org_equipment_list: undefined,
        id_bid: undefined,
        error: undefined,
      };
    }
    case GET_BID_BASKET_SUCCESS: {
      return {
        ...state,
        loader: false,
        bid_rfq_items: action.bid_rfq_items,
        error: undefined,
      };
    }
    case GET_BID_BASKET_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case GET_ORG_EQUIP_SUCCESS: {
      return {
        ...state,
        org_equipment_list: action.org_equipment_list,
      };
    }
    case GET_EQUIP_DETAILS: {
      return {
        ...state,
        loader: false,
        error: undefined,
      };
    }
    case GET_EQUIP_DETAILS_SUCCESS: {
      return {
        ...state,
        loader: false,
        equip_details: action.equip_details,
        error: undefined,
      };
    }
    case GET_EQUIP_DETAILS_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case POST_BIDS: {
      return {
        ...state,
        loader: true,
        rfq: undefined,
        error: undefined,
      };
    }
    case POST_BIDS_SUCCESS: {
      return {
        ...state,
        loader: false,
        rfq: action.rfq,
        error: undefined,
      };
    }
    case POST_BIDS_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
        rfq: undefined,
      };
    }
    case GET_BUY_SEARCH: {
      return {
        ...state,
        searchLoader: true,
        error: undefined,
        buy_search: undefined,
        rent_search: undefined,
        bid_search: undefined,
      };
    }
    case GET_BUY_SEARCH_SUCCESS: {
      return {
        ...state,
        searchLoader: false,
        error: undefined,
        buy_search: action.buy_search,
        buy_equip_details: undefined,
      };
    }
    case GET_BUY_SEARCH_FAILED: {
      return {
        ...state,
        searchLoader: false,
        error: action.error,
      };
    }
    case GET_BUY_EQUIP: {
      return {
        ...state,
        loader: false,
        id_bid: undefined,
        bid_rfq_items: undefined,
        error: undefined,
      };
    }
    case GET_BUY_EQUIP_SUCCESS: {
      return {
        ...state,
        loader: false,
        buy_equip_details: action.buy_equip_details,
        error: undefined,
      };
    }
    case GET_BUY_EQUIP_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case POST_BUY: {
      return {
        ...state,
        loader: true,
        rfq: undefined,
        error: undefined,
      };
    }
    case POST_BUY_SUCCESS: {
      return {
        ...state,
        loader: false,
        rfq: action.rfq,
        error: undefined,
      };
    }
    case POST_BUY_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
        rfq: undefined,
      };
    }
    case GET_SIMILAR_BUY_SUCCESS: {
      return {
        ...state,
        searchLoader: false,
        error: undefined,
        buy_search: action.buy_search,
      };
    }
    case GET_SIMILAR_BUY_FAILED: {
      return {
        ...state,
        searchLoader: false,
        error: action.error,
      };
    }
    case GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        category: action.category,
        categoryList: Object.keys(action.category).map(suggestion => ({
          value: suggestion,
          label: suggestion,
        })),
      };
    }
    case GET_SELECTED_CATEGORY: {
      return {
        ...state,
        selectedCategory: action.selectedCategory,
        selectedSubCategory: '',
        error: undefined,
      };
    }
    case GET_SELECTED_SUB_CATEGORY: {
      return {
        ...state,
        selectedSubCategory: action.selectedSubCategory,
        error: undefined,
      };
    }
    case GET_ORDER: {
      return {
        ...state,
        order: action.order,
      };
    }
    case GET_KEYWORD: {
      return {
        ...state,
        keywords: action.keywords,
      };
    }
    case GET_AVAILABILITY: {
      return {
        ...state,
        availability: action.availability,
      };
    }
    case GET_COUNTRIES_STATUS: {
      return {
        ...state,
        countriesStatus: action.countriesStatus,
      };
    }
    case GET_FITTINGS_SUCCESS: {
      return {
        ...state,
        fittings: action.fittings,
      };
    }
    case GET_FITTINGS_STATUS: {
      return {
        ...state,
        fittingsStatus: action.fittingsStatus,
      };
    }
    case GET_MANUFACTURER_STATUS: {
      return {
        ...state,
        manufacturersStatus: action.manufacturersStatus,
      };
    }
    case GET_MODEL_STATUS: {
      return {
        ...state,
        modelsStatus: action.modelsStatus,
      };
    }
    case POST_IMAGE: {
      return {
        ...state,
        loader: true,
        postedImage: undefined,
        postedAsset: undefined,
        error: undefined,
      };
    }
    case POST_IMAGE_SUCCESS: {
      return {
        ...state,
        loader: false,
        postedImage: action.postedImage,
        error: undefined,
      };
    }
    case POST_IMAGE_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case GET_PURPOSE: {
      return {
        ...state,
        purpose: action.purpose,
      };
    }
    case GET_FEED: {
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    }
    case GET_FEED_SUCCESS: {
      return {
        ...state,
        loader: false,
        feeds: action.feeds,
        error: undefined,
      };
    }
    case GET_FEED_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case GET_RFQS: {
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    }
    case GET_RFQS_SUCCESS: {
      return {
        ...state,
        loader: false,
        rfqs: action.rfqs,
        error: undefined,
      };
    }
    case GET_RFQS_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case GET_BIDS: {
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    }
    case GET_BIDS_SUCCESS: {
      return {
        ...state,
        loader: false,
        bids: action.bids,
        error: undefined,
      };
    }
    case GET_BIDS_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case GET_USER_PROFILE: {
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    }
    case GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        loader: false,
        user_profile: action.user_profile,
        error: undefined,
      };
    }
    case GET_USER_PROFILE_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case GET_USERS: {
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        loader: false,
        sub_users: action.sub_users,
        error: undefined,
      };
    }
    case GET_USERS_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case GET_INBOX: {
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    }
    case GET_INBOX_SUCCESS: {
      return {
        ...state,
        loader: false,
        inbox: action.inbox,
        error: undefined,
      };
    }
    case GET_INBOX_FAIELD: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case GET_MESSAGES: {
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    }
    case GET_MESSAGES_SUCCESS: {
      return {
        ...state,
        loader: false,
        messages: action.messages,
        error: undefined,
      };
    }
    case GET_MESSAGES_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case POST_MESSAGE: {
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    }
    case POST_MESSAGE_SUCCESS: {
      return {
        ...state,
        loader: false,
        messages: action.messages,
        error: undefined,
      };
    }
    case POST_MESSAGE_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case CANCEL_RFQ: {
      return {
        ...state,
        loader: true,
        rfq: undefined,
        error: undefined,
      };
    }
    case CANCEL_RFQ_SUCCESS: {
      return {
        ...state,
        loader: false,
        rfq: action.rfq,
        error: undefined,
      };
    }
    case CANCEL_RFQ_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case CANCEL_BID: {
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    }
    case CANCEL_BID_SUCCESS: {
      return {
        ...state,
        loader: false,
        rfq: action.cancel_bid,
        error: undefined,
      };
    }
    case CANCEL_BID_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case GET_ID_BID: {
      return {
        ...state,
        loader: true,
        rfq: undefined,
        buy_equip_details: undefined,
        org_equipment_list: undefined,
        bid_rfq_items: undefined,
        error: undefined,
      };
    }
    case GET_ID_BID_SUCCESS: {
      return {
        ...state,
        loader: false,
        id_bid: action.id_bid,
        error: undefined,
      };
    }
    case GET_ID_BID_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case GET_ID_RFQ: {
      return {
        ...state,
        loader: true,
        rfq: undefined,
        error: undefined,
      };
    }
    case GET_ID_RFQ_SUCCESS: {
      return {
        ...state,
        loader: false,
        bid_rfq_items: action.id_rfq,
        error: undefined,
      };
    }
    case GET_ID_RFQ_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case IGNORE_BID: {
      return {
        ...state,
        loader: true,
        rfq: undefined,
        error: undefined,
      };
    }
    case IGNORE_BID_SUCCESS: {
      return {
        ...state,
        loader: false,
        rfq: action.ignore_bid,
        error: undefined,
      };
    }
    case IGNORE_BID_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case ACCEPT_BID: {
      return {
        ...state,
        loader: true,
        rfq: undefined,
        error: undefined,
      };
    }
    case ACCEPT_BID_SUCCESS: {
      return {
        ...state,
        loader: false,
        rfq: action.bid,
        error: undefined,
      };
    }
    case ACCEPT_BID_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
};
