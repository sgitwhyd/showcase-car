import React from "react";
import Link from "next/link";
import Image from "next/image";

import { footerLinks } from "@/constants";

const Footer = () => {
	return (
		<footer className='flex flex-col text-black-100 mt-5 border-t border-gray-100'>
			<div className='flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10'>
				<div className='flex flex-col items-start gap-6'>
					<Image
						src='/./logo.svg'
						alt='logo'
						width={118}
						height={18}
						className='object-contain'
					/>
					<p className='text-base text-gray-700'>
						Car Rental © 2021 <br />
						All Rights Reserved
					</p>
				</div>
				<div className='footer__links'>
					{footerLinks.map((link, index) => (
						<div key={index} className='footer__link'>
							<h3 className='font-bold'>{link.title}</h3>
							{link.links.map((link, index) => (
								<Link key={index} href={link.url} className='text-gray-500'>
									{link.title}
								</Link>
							))}
						</div>
					))}
				</div>
			</div>
			<div className='flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10'>
				<p>@2021 Car Rental. All rights reserved.</p>
				<div className='footer__copyright-link'>
					<Link className='text-gray-500' href='/'>
						Privacy Policy
					</Link>
					<Link className='text-gray-500' href='/'>
						Term of Use
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
