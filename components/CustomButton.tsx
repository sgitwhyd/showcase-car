"use client";

import React from "react";
import Image from "next/image";

import { CustomButtonProps } from "@/types";

const CustomButton = ({
	title,
	className,
	onClick,
	type,
	rightIcon,
	isDisabled,
}: CustomButtonProps) => {
	return (
		<button
			disabled={isDisabled}
			type={type || "button"}
			className={`custom-btn ${className}`}
			onClick={onClick}>
			<span className={`flex-1`}>{title}</span>
			{rightIcon && (
				<div className='relative w-6 h-6'>
					<Image
						src={rightIcon}
						alt='right icon'
						fill
						className='object-contain'
					/>
				</div>
			)}
		</button>
	);
};

export default CustomButton;
