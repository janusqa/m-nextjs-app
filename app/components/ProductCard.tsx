import React from 'react';
import AddToCart from './AddToCart';

const ProductCard = () => {
    return (
        <main>
            <div>ProductCard</div>
            {/* <div className="p-5 my-5 bg-sky-400 text-white text-xl hover:bg-sky-500"> */}
            <div>
                <AddToCart />
            </div>
        </main>
    );
};

export default ProductCard;
