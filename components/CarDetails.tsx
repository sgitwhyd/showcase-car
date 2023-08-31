import React, { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";

import { CarApiResponseProps } from "@/types";
import { generateCarImageUrl } from "@/utils";

interface CarDetailsProps {
	car: CarApiResponseProps;
	isOpen: boolean;
	closeModal: () => void;
}

const CarDetails = ({ car, isOpen, closeModal }: CarDetailsProps) => {
	return (
		<>
			<Transition show={isOpen} appear as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leaveTo='opacity-0'
						leaveFrom='opacity-100'
						leave='ease-in duration-200'>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>
					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
								leaveFrom='opacity-100 scale-100'
								leave='ease-in duration-200'>
								<Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] transform overflow-y-auto rounded-2xl bg-white text-left shadow-xl transition-all flex flex-col gap-5 p-6'>
									<button
										type='button'
										onClick={closeModal}
										className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'>
										<Image
											src='/close.svg'
											alt='close icon'
											width={20}
											height={20}
											className='object-contain'
										/>
									</button>
									<div className='flex-1 flex-col gap-3'>
										<div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg'>
											<Image
												src={generateCarImageUrl(car)}
												alt='car model'
												fill
												priority
												className='object-contain'
												sizes='100vw'
											/>
										</div>
										<div className='flex gap-3 mt-3'>
											<div className='flex-1 relative w-full  h-24 bg-primary-blue-100 rounded-lg'>
												<Image
													src={generateCarImageUrl(car, "29")}
													alt='car model'
													fill
													priority
													className='object-contain'
													sizes='100vw'
												/>
											</div>
											<div className='flex-1 relative w-full  h-24 bg-primary-blue-100 rounded-lg'>
												<Image
													src={generateCarImageUrl(car, "33")}
													alt='car model'
													fill
													priority
													className='object-contain'
													sizes='100vw'
												/>
											</div>
											<div className='flex-1 relative w-full  h-24 bg-primary-blue-100 rounded-lg'>
												<Image
													src={generateCarImageUrl(car, "13")}
													alt='car model'
													fill
													priority
													className='object-contain'
													sizes='100vw'
												/>
											</div>
										</div>
									</div>
									<div className='flex-1 flex-col gap-2'>
										<h2 className='font-semibold text-xl capitalize'>
											{car.make} {car.model}
										</h2>
										<div className='mt-3 flex flex-wrap gap-4'>
											{Object.entries(car).map(([key, value]) => (
												<div
													key={key}
													className='flex justify-between gap-5 w-full text-right'>
													<h4 className='text-grey capitalize'>
														{key.split("_").join(" ")}
													</h4>
													<p className='text-black-100 font-semibold capitalize'>
														{value === "m"
															? "Manual"
															: value === "a"
															? "Automatic"
															: value}
													</p>
												</div>
											))}
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default CarDetails;
