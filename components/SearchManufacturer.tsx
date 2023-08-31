import React, { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";

import { manufacturers } from "@/constants";
import { SearchManufacturerProps } from "@/types";

const SearchManufacturer = ({
	manufacturer,
	setManufacturer,
}: SearchManufacturerProps) => {
	const [query, setQuery] = useState("");

	const filteredManufacturers =
		query === ""
			? manufacturers
			: manufacturers.filter((item) =>
					item
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	return (
		<div className='search-manufacturer'>
			<Combobox value={manufacturer} onChange={setManufacturer}>
				<div className='relative w-full'>
					<Combobox.Button className='absolute top-[14px]'>
						<Image
							src='/car-logo.svg'
							alt='car logo'
							width={20}
							height={20}
							className='ml-4'
						/>
					</Combobox.Button>
					<Combobox.Input
						autoComplete='off'
						className='search-manufacturer__input'
						placeholder='Volkwagen'
						displayValue={(manufacturer: string) => manufacturer}
						onChange={(event) => setQuery(event.target.value)}
					/>
					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
						afterLeave={() => setQuery("")}>
						<Combobox.Options className='absolute mt-1 z-10 bg-white w-full max-h-60 overflow-y-scroll shadow-md rounded-lg'>
							{filteredManufacturers.length === 0 && query !== "" ? (
								<Combobox.Option
									value={query}
									className='relative cursor-default select-none py-2 px-4 text-gray-700'>
									{query} Not Found
								</Combobox.Option>
							) : (
								filteredManufacturers.map((item) => (
									<Combobox.Option
										key={item}
										value={item}
										className={({ active }) =>
											`relative search-manufacturer__option ${
												active ? "bg-primary-blue text-white" : "text-gray-900"
											}`
										}>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? "font-medium" : "font-normal"
													}`}>
													{item}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? "text-white" : "text-teal-600"
														}`}></span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
};

export default SearchManufacturer;
