"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SearchManufacturer from "./SearchManufacturer";

const SearchButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
	...props
}) => {
	const { className } = props;
	return (
		<button {...props} type='submit' className={` z-10 ${className}`}>
			<Image
				src='/magnifying-glass.svg'
				alt='magnifying glass icon'
				width={40}
				height={40}
				className='object-contain'
			/>
		</button>
	);
};

const SearchBar = () => {
	const Router = useRouter();

	const [manufacturer, setManufacturer] = useState("");
	const [model, setModel] = useState("");

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!manufacturer || !model) {
			alert("Please fill in the search field");
			return;
		}

		updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
	};

	const updateSearchParams = (model: string, manufacturer: string) => {
		const searchParams = new URLSearchParams(window.location.search);

		if (model) {
			searchParams.set("model", model);
		} else {
			searchParams.delete("model");
		}

		if (manufacturer) {
			searchParams.set("manufacturer", manufacturer);
		} else {
			searchParams.delete("manufacturer");
		}

		const newPathname = `${
			window.location.pathname
		}?${searchParams.toString()}`;

		Router.push(newPathname, {
			scroll: false,
		});
	};

	return (
		<form className='searchbar' onSubmit={handleSearch}>
			<div className='searchbar__item'>
				<SearchManufacturer
					manufacturer={manufacturer}
					setManufacturer={setManufacturer}
				/>

				<SearchButton className='sm:hidden' />
			</div>
			<div className='searchbar__item'>
				<Image
					src='/model-icon.png'
					alt='model icon'
					width={25}
					height={25}
					className='absolute w-5 h-5 ml-4'
				/>
				<input
					autoComplete='off'
					type='text'
					name='model'
					value={model}
					onChange={(e) => setModel(e.target.value)}
					placeholder='Tiguan'
					className='searchbar__input'
				/>
				<SearchButton className='sm:hidden' />
			</div>
			<SearchButton className='max-sm:hidden' />
		</form>
	);
};

export default SearchBar;
