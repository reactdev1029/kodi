import {
  SWITCH_LANGUAGE,
  SWITCH_CURRENCY,
  SWITCH_HAMBURGER,
  WINDOW_WIDTH,
} from 'constants/ActionTypes';

export function updateWindowWidth(screenSize) {
  return { type: WINDOW_WIDTH, screenSize };
}

export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale,
  };
}

export function switchCurrency(currency) {
  return {
    type: SWITCH_CURRENCY,
    payload: currency,
  };
}

export function switchHamburger(hamSwitcher) {
  return {
    type: SWITCH_HAMBURGER,
    hamSwitcher,
  };
}
