import { SET_DEVICE } from "../actions/actionTypes";
import Device from '@/device';

const device = new Device();

const initialState = device.breakpoints();

export function onResize (callback) {
  window.addEventListener('resize', () => {
    callback();
  });
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DEVICE: {
      return {
        ...action.payload, // isMobile, isTablet etc
      };
    }
    default:
      return state;
  }
}
