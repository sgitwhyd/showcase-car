"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { IShowMoreProps } from "@/types";
import { CustomButton } from ".";
import { updateSearchParams } from "@/utils";

const ShowMore = ({ pageNumber, isNext }: IShowMoreProps) => {
	const Router = useRouter();

	const handleNavigation = () => {
		const newLimit = Number(pageNumber) + 4;
		const newPathName = updateSearchParams("limit", newLimit.toLocaleString());

		Router.push(newPathName, {
			scroll: false,
		});
	};

	const handleShowLess = () => {
		const newLimit = Number(pageNumber) - 4;
		const newPathName = updateSearchParams("limit", newLimit.toLocaleString());

		Router.push(newPathName, {
			scroll: false,
		});
	};

	const backToDefaultLimit = () => {
		const newPathName = updateSearchParams("limit", "4");
		Router.push(newPathName, {
			scroll: false,
		});
	};

	return (
		<div className='w-full flex-center mt-10 gap-5'>
			{!isNext ? (
				<div className='flex gap-5'>
					<CustomButton
						title='Show More'
						type='button'
						onClick={handleNavigation}
						className='bg-primary-blue rounded-full text-white'
					/>
					{pageNumber > 4 && (
						<CustomButton
							title='Show Less'
							type='button'
							onClick={handleShowLess}
							className='bg-white border border-primary-blue rounded-full text-black hover:bg-primary-blue hover:text-white transition-[background-color] '
						/>
					)}
				</div>
			) : (
				<CustomButton
					title='Back To Default Display'
					type='button'
					onClick={backToDefaultLimit}
					className='bg-white border border-primary-blue rounded-full text-black hover:bg-primary-blue hover:text-white transition-[background-color] '
				/>
			)}
		</div>
	);
};

export default ShowMore;
