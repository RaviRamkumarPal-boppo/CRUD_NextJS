'use client'

import { Product } from "@/app/components/Interface/page";
import Loading from "@/app/components/modules/loading";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai"; 
import { toast } from "react-toastify";


function ProductCard({ params }: { params: { id: number } }) {

  const [productById, setProductById] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const productId = params.id;

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProductById([response.data]);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        toast.error("Error fetching data!");
      }
    };

    fetchDataById();
  }, [productId]);

  if (loading) {
    return (
      <div className="loading-tag">
        <Loading />
      </div>
    );
  }

  return (
    <div className=" h-screen p-4">
      <p className="font-medium text-2xl">Product Detail</p>
      <div className="flex justify-center mt-[50px] ">
        {
          productById?.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 w-10/12 ">
              <div className="bg-[#65a8ba] h-[400px] flex justify-center items-center rounded-l-lg">
                <div className="h-72">
                  <img
                    src={item.image}
                    alt={`Product Image ${index}`}
                    className="h-full object-contain"
                  />
                </div>
              </div>
              <div className="productbg p-5 rounded-r-lg">
                <div>
                  <p className="font-medium text-lg">PRODUCT</p>
                  <p className="text-xl font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </div>
                <hr className="my-4" />
                <p className="text-sm text-gray-700">{item.description}</p>
                <hr className="my-4" />
                <p className="font-medium text-lg">RATING</p>
                <p className="flex items-center text-yellow-500">
                  <IoStarSharp className="mr-1" />
                  {item.rating.rate} ({item.rating.count} reviews)
                </p>
                <hr className="my-4" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-lg">PRICE</p>
                    <p className="text-xl font-semibold">${item.price}</p>
                  </div>
                  <div>
                    <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-medium py-2 px-4 rounded inline-flex items-center">
                      <span>Add to cart</span>
                      <AiOutlineShoppingCart className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ProductCard;
