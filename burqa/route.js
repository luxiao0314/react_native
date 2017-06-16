/**
 * Created by lipeiwei on 16/10/4.
 */
import {
  Navigator,
} from 'react-native';

let navigator;

const routeMap = new Map();

export function registerNavigator(tempNavigator) {
  if (navigator) {
    return;
  }
  navigator = tempNavigator;

}

export function getNavigator() {
  return navigator;
}

export function getRouteMap() {
  return routeMap;
}






