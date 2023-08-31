"use client";

import React, { useState } from "react";
import Image from "next/image";

import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

import { calculateCarRentPrice, generateCarImageUrl } from "@/utils";
import { CarApiResponseProps } from "@/types";

interface CarCardProps {
	car: CarApiResponseProps;
}

const CarCard = ({ car }: CarCardProps) => {
	const {
		city_mpg,
		fuel_type,
		highway_mpg,
		make,
		model,
		year,
		transmission,
		drive,
	} = car;
	const [isOpen, setIsOpen] = useState(false);
	const carRentPrice = calculateCarRentPrice(city_mpg, year);

	const handleIsOpenModal = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className='car-card group'>
			<div className='car-card__content'>
				<h2 className='car-card__content-title'>
					{make} {model}
				</h2>
			</div>

			<p className='flex  mt-6 text-[32px] font-extrabold'>
				<span className='self-start text-[14px]  font-semibold'>Rp</span>
				{carRentPrice}
				<span className='self-end text-[14px]  font-medium'>/day</span>
			</p>

			<div className='relative w-full h-40 my-3 object-contain'>
				<Image
					src={generateCarImageUrl(car)}
					alt='car model'
					fill
					priority
					className='object-contain w-auto h-auto'
					sizes='100vw'
				/>
			</div>

			<div className='relative flex w-full mt-2'>
				<div className='flex group-hover:invisible w-full justify-between text-gray'>
					<div className='flex flex-col justify-center items-center gap-2'>
						<Image
							src='/steering-wheel.svg'
							alt='steering wheel'
							width={20}
							height={20}
						/>
						<p className='text-[14px]'>
							{transmission === "a" ? "Automatic" : "Manual"}
						</p>
					</div>
					<div className='flex flex-col justify-center items-center gap-2'>
						<Image src='/tire.svg' alt='tire' width={20} height={20} />
						<p className='text-[14px]'>{drive.toUpperCase()}</p>
					</div>
					<div className='flex flex-col justify-center items-center gap-2'>
						<Image
							src='/gas.svg'
							alt='gas'
							width={20}
							height={20}
							className='object-contain'
						/>
						<p className='text-[14px]'>{city_mpg} MPG</p>
					</div>
				</div>
				<div className='car-card__btn-container'>
					<CustomButton
						title='View More'
						className='w-full py-[16px] rounded-full bg-primary-blue text-white text-[14px] leading-[17px] font-bold'
						rightIcon='/right-arrow.svg'
						onClick={handleIsOpenModal}
					/>
				</div>

				<CarDetails isOpen={isOpen} closeModal={handleIsOpenModal} car={car} />
			</div>
		</div>
	);
};

export default CarCard;
