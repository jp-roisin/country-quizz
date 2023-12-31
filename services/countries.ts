import axios from "axios";

export const regions = [
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
] as const;

export type Region = (typeof regions)[number];
export type RegionOrWorldwide = Region | "WORLDWIDE";

export type Country = {
  name: {
    common: string;
  };
  region: Region;
  cca2: string;
  subregion: string;
  capital: string[];
  flag: string;
  flags: {
    png: string;
    svg: string;
  };
  population: number;
  languages: {
    [key: string]: string;
  };
};

export const getCountryList = async (): Promise<
  Pick<Country, "name" | "cca2" | "flags" | "region">[]
> => {
  const response = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,cca2,flags,region",
  );

  return response.data;
};

export const getCountryByName = async (name: string): Promise<Country[]> => {
  const response = await axios.get(
    `https://restcountries.com/v3.1/name/${name}`,
  );

  return response.data;
};

export const getCountryByCca2 = async (cca2: string): Promise<Country> => {
  const response = await axios.get(
    `https://restcountries.com/v3.1/alpha/${cca2}`,
  );

  return response.data;
};
