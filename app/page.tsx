import React from "react";
import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from "@/components";

import { fetchCars } from "@/utils";
import { CarApiResponseProps, ISearchParamsProps } from "@/types";

import { yearsOfProduction, fuels } from "@/constants";

const Home = async ({ searchParams }: { searchParams: ISearchParamsProps }) => {
	const allCars = await fetchCars({
		manufacturer: searchParams?.manufacturer || "",
		model: searchParams?.model || "",
		year: searchParams?.year || "2022",
		limit: searchParams?.limit || 4,
		fuel: searchParams?.fuel || "",
	});

	const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

	return (
		<main className='overflow-hidden'>
			<Hero />
			<div className='mt-12 padding-x padding-y max-width' id='discover'>
				<div className='home__text-container'>
					<h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
					<p>Explore the cars you might like</p>
				</div>
				<div className='home__filters'>
					<SearchBar />

					<div className='home__filter-container'>
						<CustomFilter title='fuel' options={fuels} />
						<CustomFilter title='year' options={yearsOfProduction} />
					</div>
				</div>

				{!isDataEmpty ? (
					<section>
						<div className='home__cars-wrapper'>
							{allCars?.map((car: CarApiResponseProps, idx: number) => (
								<CarCard car={car} key={idx} />
							))}
						</div>
						<ShowMore
							pageNumber={searchParams?.limit || 4}
							isNext={(searchParams?.limit || 4) > allCars.length}
						/>
					</section>
				) : (
					<div className='home__error-container'>
						<h2 className='text-black text-xl font-bold'>Oops, no results</h2>
						<p>{allCars?.message}</p>
					</div>
				)}
			</div>
		</main>
	);
};

export default Home;
