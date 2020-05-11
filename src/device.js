import { SET_DEVICE } from './store/actions/actionTypes';

const tablet = 768;
const desktop = 980;
const wide = 1248;

const mobileMaxWidth = tablet - 1;
const tabletMaxWidth = desktop - 1;
const desktopMaxWidth = wide - 1;

export default class Device {
  constructor () {
    this.update();
  }

  init (store) {
    window.addEventListener('resize', () => {
      this.update();

      // Update store with new values
      store.dispatch({
        type: SET_DEVICE,
        payload: this.breakpoints(),
      });
    });
  }

  update () {
    const { innerWidth: width } = window;
    this.width = width;
    this.isMobile = width <= mobileMaxWidth;
    this.isTablet = width > mobileMaxWidth && width <= tabletMaxWidth;
    this.isDesktopPlus = width > tabletMaxWidth;
    this.isDesktop = width > tabletMaxWidth && width <= desktopMaxWidth;
    this.isWide = width > desktopMaxWidth;
  }

  breakpoints () {
    return {
      isMobile: this.isMobile,
      isTablet: this.isTablet,
      isDesktopPlus: this.isDesktopPlus,
      isDesktop: this.isDesktop,
      isWide: this.isWide,
    }
  }
}
