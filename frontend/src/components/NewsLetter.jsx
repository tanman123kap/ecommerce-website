import React from "react";

const NewsLetter = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault(); //this function will not reload the webpage on submission
    }
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
      <p className="text-gray-400 mt-3">
        Get daily updates on all the fun stuff you don’t want to miss! Receive the latest news and updates about our services straight to your inbox. Don’t forget to subscribe to our feeds—just enter your email below.
      </p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input type="email" className="w-full sm:flex-1 outline-none" placeholder="Enter your email" required />
        <button type="submit" className="bg-black text-white text-xs px-10 py-4 cursor-pointer">SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetter