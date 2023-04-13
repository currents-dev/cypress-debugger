import parse from 'url-parse';
import isValidUrl from './isValidUrl';

export default (url: string) => (isValidUrl(url) ? parse(url, false) : null);
