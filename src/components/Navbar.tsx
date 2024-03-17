import Image from "next/image";

import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

import Search from "public/search.png";
import Cart from "public/cart.png";

const Navbar: React.FC = () => {
    return (
        <>
            <div className="flex items-center justify-end space-x-4 mr-4 h-9">
                <p className="text-[12px] font-normal">Help</p>
                <p className="text-[12px] font-normal">Orders & Returns</p>
                <p className="text-[12px] font-normal">Hi, John</p>
            </div>
            <div className="flex justify-between items-center ml-4 h-16">
                <div className="text-[32px] font-bold">ECOMMERCE</div>
                <div className="flex space-x-4 text-[16px] font-[600] -ml-40">
                    <p>Categories</p>
                    <p>Sale</p>
                    <p>Clearance</p>
                    <p>New Stock</p>
                    <p>Trending</p>
                </div>
                <div className="icon flex space-x-4 mr-4">
                    <div>
                        <Image src={Search} alt="Image" width={32} height={32} />
                    </div>
                    <div>
                        <Image src={Cart} alt="Image" width={32} height={32} />
                    </div>
                </div>
            </div>
            <div className="bg-[#F4F4F4] flex items-center justify-center space-x-3 h-9">
                <div>
                    <Icon path={mdiChevronLeft} size={0.67} />
                </div>
                <div>Get 10% off on business sign up</div>
                <div>
                    <Icon path={mdiChevronRight} size={0.67} />
                </div>
            </div>
        </>
    );
};

export default Navbar;