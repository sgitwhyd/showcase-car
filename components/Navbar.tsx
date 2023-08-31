import React from "react";
import Image from "next/image";
import Link from "next/link";

import { CustomButton } from "@/components";

const Navbar = () => {
	return (
		<header className='w-full absolute z-10'>
			<nav className='max-w-7xl mx-auto flex justify-between items-center px-16 py-4 md:px-6'>
				<Link href='/' className='flex items-center justify-center'>
					<Image
						src='/./logo.svg'
						alt='logo'
						width={118}
						height={18}
						className='object-contain'
					/>
				</Link>
				<CustomButton
					title='Sign In'
					type='button'
					className='text-primary-blue rounded-full bg-white min-w-[130px]'
				/>
			</nav>
		</header>
	);
};

export default Navbar;
