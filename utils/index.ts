import {
	CarApiResponseProps,
	CarApiOnErrorResponseProps,
	FilterProps,
} from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const imaginCustomer = process.env.NEXT_PUBLIC_IMAGIN_CUSTOMER;
const rapidApiKey = process.env.NEXT_PUBLIC_RAPID_APIKEY;
const rapidHost = process.env.NEXT_PUBLIC_RAPID_HOST;

const formatNumber = (number: number) => {
	return new Intl.NumberFormat("id-ID").format(number);
};

export const fetchCars = async (filters: FilterProps) => {
	const { manufacturer, year, model, limit, fuel } = filters;
	const headers = {
		"X-RapidAPI-Key": rapidApiKey as string,
		"X-RapidAPI-Host": rapidHost as string,
	};

	const url = `${baseUrl}&make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`;

	try {
		const response = await fetch(url, {
			headers: headers,
		});
		const result: CarApiResponseProps = await response.json();

		return result;
	} catch (error) {
		const erorrResult: CarApiOnErrorResponseProps = {
			message: "Something went wrong",
			error: error as string,
		};

		return erorrResult;
	}
};

export const calculateCarRentPrice = (city_mpg: number, year: number) => {
	const BASE_PRICE_PER_DAY = 300000;
	const ADDITIONAL_RATE_PER_KILOMETERS_DRIVEN = 1400;
	const ADDITIONAL_RATE_PER_YEAR_OF_VEHICLE_AGE = 700;

	const MILEAGE_RATE = city_mpg * ADDITIONAL_RATE_PER_KILOMETERS_DRIVEN;
	const CAR_AGE_RATE =
		(new Date().getFullYear() - year) * ADDITIONAL_RATE_PER_YEAR_OF_VEHICLE_AGE;

	// total rent per day
	const rentalRatePerDay = BASE_PRICE_PER_DAY + MILEAGE_RATE + CAR_AGE_RATE;

	return formatNumber(rentalRatePerDay);
};

export const generateCarImageUrl = (
	car: CarApiResponseProps,
	angle?: string
) => {
	const { make, year, model } = car;
	const url = new URL("https://cdn.imagin.studio/getimage");
	url.searchParams.append("customer", imaginCustomer as string);
	url.searchParams.append("make", make);
	url.searchParams.append("modelFamily", model.split(" ")[0]);
	url.searchParams.append("zoomType", "fullscreen");
	url.searchParams.append("year", `${year}`);
	url.searchParams.append("angle", `${angle}`);

	return url.toString();
};

export const updateSearchParams = (type: string, value: string) => {
	const searchParams = new URLSearchParams(window.location.search);

	if (value === "") {
		searchParams.delete(type);
	}
	{
		searchParams.set(type, value);
	}

	return `${window.location.pathname}?${searchParams.toString()}`;
};
