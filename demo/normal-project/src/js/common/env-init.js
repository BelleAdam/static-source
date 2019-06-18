import siteConfig from 'site-config';

localStorage.setItem('DEBUG', !!siteConfig.DEBUG);

if (siteConfig.DEBUG) {
  // do something
} else {
  // do something
}
