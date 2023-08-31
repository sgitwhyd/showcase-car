"use client";

import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { updateSearchParams } from "@/utils";

import { CustomFilterProps } from "@/types";

const CustomFilter = ({ title, options }: CustomFilterProps) => {
	const Router = useRouter();
	const [selected, setSelected] = useState(options[0]);

	const handleUpdateParams = (e: { title: string; value: string }) => {
		const newPathname = updateSearchParams(title, e.value.toLowerCase());

		Router.push(newPathname, {
			scroll: false,
		});
	};

	return (
		<div className='w-fit z-10'>
			<Listbox
				value={selected}
				onChange={(e) => {
					setSelected(e);
					handleUpdateParams(e);
				}}>
				<div className='relative'>
					<Listbox.Button className='custom-filter__btn  cursor-pointer'>
						<span className='block truncate'>{selected.title}</span>
						<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
							<Image
								src='/chevron-up-down.svg'
								alt='chevron up down'
								width={20}
								height={20}
							/>
						</span>
					</Listbox.Button>

					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<Listbox.Options className='custom-filter__options'>
							{options.map((option, idx) => (
								<Listbox.Option
									value={option}
									key={idx}
									className={({ active }) =>
										`relative cursor-default select-none py-2 px-4 ${
											active ? "bg-primary-blue text-white" : "text-gray-900"
										}`
									}>
									{({ selected }) => (
										<span
											className={`block truncate ${
												selected ? "font-medium" : "font-normal"
											}`}>
											{option.title}
										</span>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
};

export default CustomFilter;
