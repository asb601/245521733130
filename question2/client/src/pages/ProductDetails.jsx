import React, { useState } from 'react';
import axios from 'axios';

const ProductDetails = () => {
    const [companyName, setCompanyName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [top, setTop] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [products, setProducts] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(
                `http://localhost:8080/api/v1/companies/${companyName}/categories/${categoryName}/products`,
                {
                    params: {
                        top,
                        minPrice,
                        maxPrice,
                    },
                }
            );

            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-5">Product Search</h1>
            <form onSubmit={handleSubmit} className="flex flex-wrap justify-between">
                <div className="mb-4">
                    <label htmlFor="company" className="block">
                        Select Company:
                    </label>
                    <select
                        id="company"
                        value={companyName}
                        onChange={(e) => {
                            setCompanyName(e.target.value);
                        }}
                        className="border p-2"
                    >
                        <option value="">Select Company</option>
                        <option value="AMZ">AMZ</option>
                        <option value="FLP">FLP</option>
                        <option value="SNP">SNP</option>
                        <option value="MYN">MYN</option>
                        <option value="AZO">AZO</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block">
                        Select Category:
                    </label>
                    <select
                        id="category"
                        value={categoryName}
                        onChange={(e) => {
                            setCategoryName(e.target.value);
                        }}
                        className="border p-2"
                    >
                        <option value="">Select Category</option>
                        <option value="Phone">Phone</option>
                        <option value="Computer">Computer</option>
                        <option value="TV">TV</option>
                        <option value="Earphone">Earphone</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Charger">Charger</option>
                        <option value="Mouse">Mouse</option>
                        <option value="Keypad">Keypad</option>
                        <option value="Bluetooth">Bluetooth</option>
                        <option value="Pendrive">Pendrive</option>
                        <option value="Remote">Remote</option>
                        <option value="Speaker">Speaker</option>
                        <option value="Headset">Headset</option>
                        <option value="Laptop">Laptop</option>
                        <option value="PC">PC</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="top" className="block">
                        Top:
                    </label>
                    <input
                        type="number"
                        id="top"
                        value={top}
                        onChange={(e) => {
                            setTop(e.target.value);
                        }}
                        className="border p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="minPrice" className="block">
                        Min Price:
                    </label>
                    <input
                        type="number"
                        id="minPrice"
                        value={minPrice}
                        onChange={(e) => {
                            setMinPrice(e.target.value);
                        }}
                        className="border p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="maxPrice" className="block">
                        Max Price:
                    </label>
                    <input
                        type="number"
                        id="maxPrice"
                        value={maxPrice}
                        onChange={(e) => {
                            setMaxPrice(e.target.value);
                        }}
                        className="border p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-10 py-2"
                >
                    Search
                </button>
            </form>

            {products.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mt-5">Products</h2>
                    <ul className="mt-3">
                        {products.map((product) => (
                            <li key={product.id} className="border-b pb-3">
                                <div className="my-4">
                                    <div className="flex gap-8">
                                        <h3 className="text-xl font-bold">{product.productName}</h3>
                                        <p className="text-yellow-600">Rating: ⭐️{product.rating}</p>
                                    </div>
                                    <p className="text-red-500">Availability: {product.availability}</p>
                                    <div className="flex gap-4">
                                        <p className="text-gray-700 font-bold">Price: {product.price}/-</p>
                                        <p>{product.discount}% off Hurry up!!!!</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
