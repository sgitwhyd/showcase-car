import { HTMLAttributes } from "react";

export interface CustomButtonProps extends HTMLAttributes<HTMLButtonElement> {
	title: string;
	type?: "button" | "submit" | "reset";
	rightIcon?: string;
	isDisabled?: boolean | false;
}

export interface SearchManufacturerProps {
	manufacturer: string;
	setManufacturer: (manufacturer: string) => void;
}

export interface CarApiResponseProps {
	city_mpg: number;
	class: string;
	combination_mpg: number;
	cylinders: number;
	displacement: number;
	drive: string;
	fuel_type: string;
	highway_mpg: number;
	make: string;
	model: string;
	transmission: string;
	year: number;
	message?: string;
}

export interface CarApiOnErrorResponseProps {
	message?: string;
	error?: string;
}

export interface FilterProps {
	manufacturer: string;
	year: string;
	model: string;
	limit: number;
	fuel: string;
}

export interface OptionProps {
	title: string;
	value: string;
}

export interface CustomFilterProps {
	title: string;
	options: OptionProps[];
}

export interface IShowMoreProps {
	pageNumber: number;
	isNext: boolean;
}

export interface ISearchParamsProps {
	manufacturer: string;
	model: string;
	year: string;
	limit: number;
	fuel: string;
	pageNumber: number;
}
