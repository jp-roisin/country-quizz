import axios from "axios";

type AllCountries = {
  name: {
    common: string;
  };
  region: string;
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

export const getAllCountries = async (): Promise<AllCountries[]> => {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  return response.data;
};
