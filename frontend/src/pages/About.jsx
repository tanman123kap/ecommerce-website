import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="About" className="w-full md:max-w-[450px]" />
        <div className="flex flex-col justify-center gap-6 ms:w-2/4 text-gray-600">
          <p>At Stella, we are passionate about offering high-quality products that cater to your needs. Our goal is to provide an exceptional shopping experience with an easy-to-navigate platform and reliable service. We take pride in offering a wide range of products that suit every taste, ensuring you find exactly what you're looking for.</p>
          <p>We believe in transparency, quality, and customer satisfaction. Our team works hard to bring you the best deals, top-notch products, and a seamless experience every time you shop with us. Join us on our journey to transform your shopping experience into something special.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>At Stella, our mission is to provide our customers with top-quality products and an outstanding shopping experience. We are committed to innovation, reliability, and customer satisfaction, ensuring that every product we offer meets the highest standards. Our goal is to make your shopping experience effortless and enjoyable, with exceptional service every step of the way.</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">We prioritize quality in every product we offer. From sourcing to delivery, each item undergoes rigorous quality checks to ensure that it meets the highest standards. You can trust that every purchase you make is of exceptional quality.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">Shopping with us is easy and hassle-free. Our user-friendly website and fast checkout process make your experience smooth and enjoyable. Plus, with quick shipping and simple returns, convenience is always at your fingertips.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">We are committed to providing exceptional customer service. Our dedicated support team is available to assist you with any questions or concerns, ensuring that you have the best shopping experience possible. Your satisfaction is our priority.</p>
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}

export default About