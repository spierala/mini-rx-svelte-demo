declare var __myapp;

const myapp = __myapp; // Retrieved from .env via rollup replace plugin
const environment = myapp.env;

export const apiBasePath = environment.API_URL;
export const isProd = environment.isProd;
