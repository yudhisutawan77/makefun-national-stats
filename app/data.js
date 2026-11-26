// NusaStat data layer: national statistics for 12 countries, 2015-2023.
// Figures are drawn from the World Bank's World Development Indicators
// (WDI) and are rounded for display. Each indicator records its source and
// the unit it is measured in; the site shows source + year beside every
// figure. Values are stored as arrays in YEARS order.

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

export const DATA_UPDATED = '26 November 2026';
export const DATA_SOURCE_NOTE =
  'World Bank, World Development Indicators (WDI), accessed November 2026. ' +
  'Figures are rounded; see the About page for the methodology note.';

export const INDICATORS = {
  population: {
    label: 'Population',
    short: 'Population',
    unit: 'million people',
    kind: 'total',
    source: 'World Bank WDI (SP.POP.TOTL)',
    blurb:
      'Total population counts all residents regardless of legal status or citizenship.',
  },
  gdp_pc: {
    label: 'GDP per capita',
    short: 'GDP per capita',
    unit: 'current US$',
    kind: 'money',
    source: 'World Bank WDI (NY.GDP.PCAP.CD)',
    blurb:
      'Gross domestic product divided by midyear population, in current US dollars.',
  },
  life_expectancy: {
    label: 'Life expectancy at birth',
    short: 'Life expectancy',
    unit: 'years',
    kind: 'years',
    source: 'World Bank WDI (SP.DYN.LE00.IN)',
    blurb:
      'The number of years a newborn would live if mortality patterns at birth stayed the same.',
  },
  unemployment: {
    label: 'Unemployment rate',
    short: 'Unemployment',
    unit: '% of labour force',
    kind: 'percent',
    source: 'World Bank WDI (SL.UEM.TOTL.ZS), modelled ILO estimate',
    blurb:
      'Share of the labour force that is without work but available for and seeking employment.',
  },
  internet_users: {
    label: 'Internet users',
    short: 'Internet users',
    unit: '% of population',
    kind: 'percent',
    source: 'World Bank WDI (IT.NET.USER.ZS), ITU data',
    blurb:
      'People who used the internet from any location in the last three months.',
  },
  co2_pc: {
    label: 'CO2 emissions per capita',
    short: 'CO2 per capita',
    unit: 'metric tons',
    kind: 'tons',
    source: 'World Bank WDI (EN.ATM.CO2E.PC)',
    blurb:
      'Carbon dioxide emissions from burning fossil fuels and cement manufacture, per person.',
  },
  gdp_growth: {
    label: 'GDP growth',
    short: 'GDP growth',
    unit: 'annual %',
    kind: 'percent',
    source: 'World Bank WDI (NY.GDP.MKTP.KD.ZG)',
    blurb:
      'Annual percentage growth of GDP at market prices, in constant local currency.',
  },
  inflation: {
    label: 'Inflation, consumer prices',
    short: 'Inflation',
    unit: 'annual %',
    kind: 'percent',
    source: 'World Bank WDI (FP.CPI.TOTL.ZG)',
    blurb:
      'Annual percentage change in the consumer price index.',
  },
};

export const INDICATOR_ORDER = [
  'population',
  'gdp_pc',
  'life_expectancy',
  'unemployment',
  'internet_users',
  'co2_pc',
  'gdp_growth',
  'inflation',
];

// Series are arrays of 9 values, one per year in YEARS order.
export const COUNTRIES = [
  {
    code: 'IDN',
    name: 'Indonesia',
    region: 'Southeast Asia',
    capital: 'Jakarta',
    currency: 'Indonesian rupiah (IDR)',
    area_km2: 1904569,
    series: {
      population: [258.2, 260.6, 263.0, 265.4, 267.9, 270.2, 272.3, 274.9, 277.5],
      gdp_pc: [3333, 3562, 3836, 3893, 4135, 3869, 4348, 4789, 4919],
      life_expectancy: [66.6, 66.9, 67.1, 67.4, 67.6, 67.5, 66.9, 67.3, 67.7],
      unemployment: [6.2, 5.6, 5.5, 5.3, 5.3, 7.1, 6.5, 5.9, 5.3],
      internet_users: [22.0, 25.4, 32.3, 39.9, 47.7, 53.7, 62.1, 66.5, 66.5],
      co2_pc: [1.9, 2.0, 2.0, 2.2, 2.3, 2.0, 2.2, 2.4, 2.5],
      gdp_growth: [4.9, 5.0, 5.1, 5.2, 5.0, -2.1, 3.7, 5.3, 5.0],
      inflation: [6.4, 3.5, 3.8, 3.2, 2.8, 2.0, 1.6, 4.2, 3.7],
    },
  },
  {
    code: 'MYS',
    name: 'Malaysia',
    region: 'Southeast Asia',
    capital: 'Kuala Lumpur',
    currency: 'Malaysian ringgit (MYR)',
    area_km2: 330803,
    series: {
      population: [30.7, 31.2, 31.7, 32.0, 32.5, 32.4, 32.6, 33.9, 34.1],
      gdp_pc: [9678, 9561, 10044, 11066, 11412, 10371, 11271, 12451, 12082],
      life_expectancy: [74.9, 75.2, 75.4, 75.7, 76.0, 75.8, 74.9, 76.1, 76.4],
      unemployment: [3.1, 3.4, 3.4, 3.3, 3.3, 4.5, 4.6, 3.9, 3.4],
      internet_users: [71.1, 78.8, 80.1, 81.2, 84.2, 89.6, 96.8, 97.4, 97.7],
      co2_pc: [7.6, 7.9, 7.9, 7.7, 7.6, 7.2, 7.6, 7.8, 7.8],
      gdp_growth: [5.1, 4.4, 5.8, 4.8, 4.4, -5.5, 3.3, 8.7, 3.6],
      inflation: [2.1, 2.1, 3.8, 1.0, 0.7, -1.1, 2.5, 3.4, 2.5],
    },
  },
  {
    code: 'SGP',
    name: 'Singapore',
    region: 'Southeast Asia',
    capital: 'Singapore',
    currency: 'Singapore dollar (SGD)',
    area_km2: 734,
    series: {
      population: [5.54, 5.61, 5.61, 5.64, 5.70, 5.69, 5.45, 5.64, 5.92],
      gdp_pc: [55988, 57252, 59776, 66306, 65987, 60807, 76254, 82808, 84734],
      life_expectancy: [82.6, 82.8, 83.0, 83.2, 83.6, 83.9, 83.3, 83.6, 84.1],
      unemployment: [1.9, 2.1, 2.1, 2.0, 2.3, 3.0, 3.0, 2.8, 2.7],
      internet_users: [79.0, 81.0, 84.5, 86.7, 88.5, 90.0, 92.0, 94.0, 96.0],
      co2_pc: [9.4, 9.2, 9.3, 9.0, 8.9, 8.3, 8.5, 8.7, 8.8],
      gdp_growth: [3.0, 3.6, 4.5, 3.5, 1.3, -3.9, 9.7, 3.8, 1.1],
      inflation: [-0.5, -0.5, 0.6, 0.4, 0.6, -0.2, 2.3, 6.1, 4.8],
    },
  },
  {
    code: 'THA',
    name: 'Thailand',
    region: 'Southeast Asia',
    capital: 'Bangkok',
    currency: 'Thai baht (THB)',
    area_km2: 513120,
    series: {
      population: [68.7, 69.0, 69.2, 69.4, 69.6, 69.9, 71.6, 71.7, 71.8],
      gdp_pc: [5813, 6064, 6532, 7293, 7792, 7009, 7226, 7337, 7336],
      life_expectancy: [74.6, 75.0, 75.4, 75.9, 76.4, 76.8, 76.0, 76.4, 76.7],
      unemployment: [0.6, 0.7, 0.8, 0.7, 0.7, 1.7, 1.6, 1.2, 0.8],
      internet_users: [39.3, 47.5, 52.9, 56.8, 66.7, 77.8, 85.3, 85.3, 88.0],
      co2_pc: [3.7, 3.8, 3.8, 3.7, 3.7, 3.4, 3.5, 3.6, 3.7],
      gdp_growth: [3.1, 3.4, 4.2, 4.2, 2.1, -6.1, 1.6, 2.5, 1.9],
      inflation: [-0.9, 0.2, 0.7, 1.1, 0.7, -0.8, 1.2, 6.1, 1.2],
    },
  },
  {
    code: 'VNM',
    name: 'Vietnam',
    region: 'Southeast Asia',
    capital: 'Hanoi',
    currency: 'Vietnamese dong (VND)',
    area_km2: 331212,
    series: {
      population: [92.7, 93.6, 94.6, 95.5, 96.5, 97.3, 97.7, 98.2, 98.9],
      gdp_pc: [2102, 2253, 2372, 2577, 2740, 2809, 3756, 4122, 4346],
      life_expectancy: [74.5, 74.8, 75.0, 75.2, 75.4, 75.4, 74.7, 74.8, 75.0],
      unemployment: [1.9, 2.1, 2.1, 2.0, 2.0, 2.5, 3.0, 2.2, 2.1],
      internet_users: [45.6, 46.5, 49.6, 68.7, 68.7, 70.3, 74.2, 77.9, 79.1],
      co2_pc: [1.8, 1.9, 2.0, 2.2, 2.5, 2.6, 2.7, 2.8, 2.9],
      gdp_growth: [6.7, 6.2, 6.8, 7.1, 7.0, 2.9, 2.6, 8.0, 5.0],
      inflation: [0.6, 2.7, 3.5, 3.5, 2.8, 3.2, 1.8, 3.2, 3.3],
    },
  },
  {
    code: 'PHL',
    name: 'Philippines',
    region: 'Southeast Asia',
    capital: 'Manila',
    currency: 'Philippine peso (PHP)',
    area_km2: 300000,
    series: {
      population: [101.7, 103.3, 105.0, 106.7, 108.4, 110.0, 111.7, 115.6, 117.3],
      gdp_pc: [2952, 3073, 3132, 3235, 3466, 3277, 3434, 3623, 3725],
      life_expectancy: [70.9, 71.1, 71.2, 71.3, 71.6, 71.8, 71.4, 72.0, 72.3],
      unemployment: [6.1, 5.4, 5.7, 5.3, 5.1, 10.3, 7.8, 5.4, 4.4],
      internet_users: [36.9, 40.1, 46.9, 51.7, 60.1, 58.0, 60.5, 68.9, 72.0],
      co2_pc: [1.1, 1.2, 1.3, 1.4, 1.4, 1.3, 1.4, 1.5, 1.5],
      gdp_growth: [6.3, 7.1, 6.9, 6.3, 6.1, -9.5, 5.7, 7.6, 5.5],
      inflation: [1.4, 1.3, 2.9, 5.2, 2.5, 2.6, 3.9, 5.8, 6.0],
    },
  },
  {
    code: 'JPN',
    name: 'Japan',
    region: 'East Asia',
    capital: 'Tokyo',
    currency: 'Japanese yen (JPY)',
    area_km2: 377975,
    series: {
      population: [127.1, 126.9, 126.7, 126.4, 126.2, 125.8, 125.5, 125.1, 124.5],
      gdp_pc: [34802, 38787, 38551, 39306, 40246, 40107, 39889, 33834, 33833],
      life_expectancy: [83.7, 84.0, 84.1, 84.2, 84.4, 84.1, 84.0, 84.0, 84.0],
      unemployment: [3.4, 3.1, 2.8, 2.4, 2.4, 2.8, 2.8, 2.6, 2.6],
      internet_users: [91.0, 92.0, 91.5, 91.4, 92.7, 93.0, 93.0, 93.0, 93.0],
      co2_pc: [9.6, 9.5, 9.3, 9.1, 8.8, 8.4, 8.6, 8.5, 8.5],
      gdp_growth: [1.6, 0.8, 1.7, 0.7, -0.4, -4.2, 2.6, 1.0, 1.9],
      inflation: [0.8, -0.1, 0.5, 1.0, 0.5, 0.0, -0.2, 2.5, 3.3],
    },
  },
  {
    code: 'IND',
    name: 'India',
    region: 'South Asia',
    capital: 'New Delhi',
    currency: 'Indian rupee (INR)',
    area_km2: 3287263,
    series: {
      population: [1310, 1324, 1339, 1354, 1369, 1384, 1396, 1412, 1429],
      gdp_pc: [1606, 1733, 1961, 1974, 2082, 1942, 2238, 2381, 2485],
      life_expectancy: [66.8, 67.2, 67.6, 68.0, 68.4, 67.6, 66.4, 67.2, 67.7],
      unemployment: [5.6, 5.5, 5.4, 5.3, 5.4, 7.9, 6.4, 6.5, 6.0],
      internet_users: [14.9, 20.0, 22.9, 25.3, 33.8, 43.0, 46.3, 49.0, 51.0],
      co2_pc: [1.6, 1.6, 1.6, 1.7, 1.7, 1.5, 1.7, 1.8, 1.9],
      gdp_growth: [8.0, 8.3, 6.8, 6.5, 3.9, -5.8, 9.7, 7.0, 7.8],
      inflation: [4.9, 4.9, 3.6, 3.4, 3.7, 6.6, 5.1, 6.7, 5.4],
    },
  },
  {
    code: 'CHN',
    name: 'China',
    region: 'East Asia',
    capital: 'Beijing',
    currency: 'Chinese yuan (CNY)',
    area_km2: 9596961,
    series: {
      population: [1379, 1387, 1395, 1403, 1410, 1411, 1412, 1412, 1412],
      gdp_pc: [8067, 8112, 8808, 9977, 10223, 10401, 12572, 12614, 12704],
      life_expectancy: [76.4, 76.6, 76.9, 77.2, 77.6, 77.9, 78.1, 78.4, 78.6],
      unemployment: [4.6, 4.6, 4.5, 4.4, 4.5, 5.0, 4.8, 5.0, 4.7],
      internet_users: [50.3, 53.2, 55.8, 59.2, 64.6, 70.3, 73.6, 76.0, 77.5],
      co2_pc: [7.7, 7.6, 7.9, 8.0, 8.2, 8.0, 8.4, 8.3, 8.5],
      gdp_growth: [7.0, 6.9, 6.9, 6.8, 6.0, 2.2, 8.6, 3.0, 5.2],
      inflation: [1.4, 2.0, 1.6, 2.1, 2.9, 2.5, 0.9, 2.0, 0.2],
    },
  },
  {
    code: 'USA',
    name: 'United States',
    region: 'North America',
    capital: 'Washington, D.C.',
    currency: 'US dollar (USD)',
    area_km2: 9833517,
    series: {
      population: [320.7, 323.1, 325.1, 327.1, 328.3, 331.5, 332.0, 333.3, 334.9],
      gdp_pc: [56762, 57858, 60110, 63064, 65545, 63521, 70219, 76329, 80412],
      life_expectancy: [78.7, 78.5, 78.5, 78.5, 78.8, 76.8, 76.1, 77.5, 78.4],
      unemployment: [5.3, 4.9, 4.4, 3.9, 3.7, 8.1, 5.4, 3.6, 3.6],
      internet_users: [74.6, 76.0, 77.5, 79.0, 87.3, 90.9, 91.5, 91.8, 92.0],
      co2_pc: [16.6, 16.0, 15.8, 16.0, 15.4, 13.7, 14.7, 14.9, 14.8],
      gdp_growth: [2.9, 1.8, 2.5, 3.0, 2.6, -2.2, 5.8, 1.9, 2.5],
      inflation: [0.1, 1.3, 2.1, 2.4, 1.8, 1.2, 4.7, 8.0, 4.1],
    },
  },
  {
    code: 'DEU',
    name: 'Germany',
    region: 'Europe',
    capital: 'Berlin',
    currency: 'Euro (EUR)',
    area_km2: 357588,
    series: {
      population: [81.2, 82.3, 82.7, 83.0, 83.2, 83.2, 83.2, 83.8, 84.7],
      gdp_pc: [41541, 42790, 44767, 47463, 46488, 46559, 51209, 48871, 52824],
      life_expectancy: [80.7, 80.8, 80.9, 80.9, 81.2, 80.9, 80.5, 80.5, 80.7],
      unemployment: [4.6, 4.1, 3.8, 3.4, 3.2, 3.9, 3.6, 3.1, 3.0],
      internet_users: [87.6, 89.6, 90.3, 91.5, 92.3, 92.0, 93.2, 94.0, 94.5],
      co2_pc: [9.6, 9.7, 9.6, 9.2, 8.6, 7.8, 8.4, 8.3, 7.9],
      gdp_growth: [1.5, 2.2, 2.7, 1.0, 1.1, -3.8, 3.2, 1.8, -0.3],
      inflation: [0.1, 0.4, 1.7, 1.9, 1.4, 0.4, 3.1, 6.9, 5.9],
    },
  },
  {
    code: 'BRA',
    name: 'Brazil',
    region: 'South America',
    capital: 'Brasília',
    currency: 'Brazilian real (BRL)',
    area_km2: 8514877,
    series: {
      population: [205.5, 207.5, 209.5, 211.3, 213.0, 214.7, 214.3, 215.3, 216.4],
      gdp_pc: [8841, 8790, 9867, 9083, 8899, 6982, 7747, 9612, 10044],
      life_expectancy: [74.4, 74.8, 75.2, 75.5, 75.9, 75.3, 73.9, 74.6, 75.9],
      unemployment: [8.6, 11.6, 12.9, 12.3, 12.0, 13.9, 13.2, 9.3, 8.0],
      internet_users: [57.8, 61.4, 67.5, 70.4, 74.0, 74.9, 80.7, 80.5, 82.0],
      co2_pc: [2.5, 2.4, 2.4, 2.3, 2.3, 2.1, 2.3, 2.3, 2.3],
      gdp_growth: [-3.5, -3.3, 1.3, 1.8, 1.2, -3.3, 5.0, 3.0, 3.2],
      inflation: [9.0, 8.7, 3.4, 3.7, 3.7, 3.2, 8.3, 9.3, 4.6],
    },
  },
];

export function countryByCode(code) {
  return COUNTRIES.find((c) => c.code === code) || null;
}

export function valueAt(country, indicator, year) {
  const idx = YEARS.indexOf(year);
  if (idx < 0) return null;
  return country.series[indicator][idx];
}

export function latestYear() {
  return YEARS[YEARS.length - 1];
}

// Rank all countries on one indicator in one year. `desc` true = bigger is
// better (population, GDP per capita, life expectancy, internet users);
// false = smaller is better (unemployment, CO2, inflation).
export function rankCountries(indicator, year, desc = true) {
  const rows = COUNTRIES.map((c) => ({
    country: c,
    value: valueAt(c, indicator, year),
  })).filter((r) => r.value !== null && r.value !== undefined);
  rows.sort((a, b) => (desc ? b.value - a.value : a.value - b.value));
  return rows;
}

export function changeSince(country, indicator, fromYear, toYear) {
  const a = valueAt(country, indicator, fromYear);
  const b = valueAt(country, indicator, toYear);
  if (a === null || b === null || a === 0) return null;
  return ((b - a) / Math.abs(a)) * 100;
}
