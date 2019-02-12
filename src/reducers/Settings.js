import {
  CHANGE_DIRECTION,
  CHANGE_NAVIGATION_STYLE,
  FIXED_DRAWER,
  HORIZONTAL_MENU_POSITION,
  INSIDE_THE_HEADER,
  SWITCH_LANGUAGE,
  SWITCH_CURRENCY,
  SWITCH_HAMBURGER,
  TOGGLE_COLLAPSED_NAV,
  VERTICAL_NAVIGATION,
  WINDOW_WIDTH,
} from 'constants/ActionTypes';

const rltLocale = ['ar'];
const initialSettings = {
  navCollapsed: false,
  drawerType: FIXED_DRAWER,
  screenSize: { width: window.innerWidth, height: window.innerHeight },
  isDirectionRTL: false,
  navigationStyle: VERTICAL_NAVIGATION,
  horizontalNavPosition: INSIDE_THE_HEADER,
  locale: {
    languageId: 'english',
    locale: 'en',
    name: 'English',
    icon: 'us',
  },
  currency: {
    currencyId: 'dollar',
    icon: '$',
    name: 'USD',
  },
  hamSwitcher: false,
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        navCollapsed: false,
      };
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: action.isNavCollapsed,
      };
    case WINDOW_WIDTH:
      return {
        ...state,
        screenSize: action.screenSize,
      };
    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: action.payload,
        isDirectionRTL: rltLocale.includes(action.payload.locale),
      };
    case SWITCH_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    case SWITCH_HAMBURGER:
      return {
        ...state,
        hamSwitcher: action.hamSwitcher,
      };
    case CHANGE_DIRECTION:
      return {
        ...state,
        isDirectionRTL: !state.isDirectionRTL,
      };

    case CHANGE_NAVIGATION_STYLE:
      return {
        ...state,
        navigationStyle: action.payload,
      };

    case HORIZONTAL_MENU_POSITION:
      return {
        ...state,
        horizontalNavPosition: action.payload,
      };

    default:
      return state;
  }
};

export default settings;
