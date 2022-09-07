import axios from "axios";
import { BASE_URL } from "../../config";
import {
  DEFAULT_CITY,
  DEFAULT_COUNTRY,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  END_DATE,
  START_DATE,
} from "../../constants";
import { formatDateInMilliSeconds } from "../helpers";

export const getActivities = async (
  pageSize,
  page = DEFAULT_PAGE,
  cities = DEFAULT_CITY,
  countries = DEFAULT_COUNTRY,
  deviceCategory = [],
  startDate = "",
  endDate = ""
) => {
  if (!pageSize) pageSize = DEFAULT_PAGE_SIZE;
  try {
    const response = await axios.get(
      `${BASE_URL}/dashboard/user-activity/?pageSize=${pageSize}&page=${page}&city=${JSON.stringify(
        cities
      )}&country=${JSON.stringify(countries)}&deviceCategory=${JSON.stringify(
        deviceCategory
      )}&startDate=${formatDateInMilliSeconds(
        startDate,
        START_DATE
      )}&endDate=${formatDateInMilliSeconds(endDate, END_DATE)}`
    );
    return response?.data;
  } catch (error) {
    return [];
  }
};

export const getUniqueCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/get-distinct-country`);
    return response?.data?.data;
  } catch (error) {
    return [];
  }
};

export const getUniqueCities = async (countries) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/dashboard/get-distinct-city?countries=${JSON.stringify(countries)}`
    );
    return response?.data?.data;
  } catch (error) {
    return [];
  }
};

export const getCountriesByCities = async (cities) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/dashboard/get-countries-by-cities?cities=${JSON.stringify(cities)}`
    );
    return response?.data?.data;
  } catch (error) {
    return [];
  }
};

export const getDownloadData = async (
  cities = DEFAULT_CITY,
  countries = DEFAULT_COUNTRY,
  deviceCategory = [],
  startDate = "",
  endDate = ""
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/dashboard/download?&city=${JSON.stringify(
        cities
      )}&country=${JSON.stringify(countries)}&deviceCategory=${JSON.stringify(
        deviceCategory
      )}&startDate=${formatDateInMilliSeconds(
        startDate
      )}&endDate=${formatDateInMilliSeconds(endDate)}`
    );
    return response?.data;
  } catch (error) {
    return [];
  }
};
