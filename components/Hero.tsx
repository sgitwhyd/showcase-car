"use client";

import React from "react";
import Image from "next/image";

import { CustomButton } from "@/components";

const Hero = () => {
	const handleScroll = () => {
		const discoverSection = document.getElementById("discover");

		if (discoverSection) {
			discoverSection.scrollIntoView({
				behavior: "smooth",
			});
		}
	};

	return (
		<div className='hero'>
			<div className='flex-1 pt-36 padding-x'>
				<h1 className='hero__title'>
					Find, book, or rent a car - quickly and easily
				</h1>
				<div className='hero__subtitle'>
					Streamline your car rental experience with our effortless booking
					process.
				</div>
				<CustomButton
					title='Explore Cars'
					className='bg-primary-blue text-white rounded-full mt-10'
					onClick={handleScroll}
				/>
			</div>
			<div className='hero__image-container'>
				<div className='hero__image'>
					<Image
						src='/hero.png'
						alt='hero image'
						fill
						className='object-contain'
					/>
				</div>
				<div className='hero__image-overlay' />
			</div>
		</div>
	);
};

export default Hero;
