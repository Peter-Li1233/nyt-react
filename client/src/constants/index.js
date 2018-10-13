
const PATH_BASE = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const API_KEY = 'api-key=d888cd2d436044058e7d52d04099f735';
const PARAM_SEARCH = 'q=';
const PARAM_BeginDate = 'begin_date=';
const PARAM_EndDate = 'end_date=';
const PARAM_PAGE = 'page=0';

// const url = `${PATH_BASE}?${API_KEY}&${PARAM_SEARCH}golf&${PARAM_PAGE}&${PARAM_BeginDate}20181001&${PARAM_EndDate}20181011`;
// console.log(url);

export {PATH_BASE, API_KEY, PARAM_PAGE, PARAM_SEARCH, PARAM_BeginDate, PARAM_EndDate};