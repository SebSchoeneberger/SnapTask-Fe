import React from "react";
import Slider from "react-slick";
import AOS from "aos";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import logo from "../img/Logo.png";
// import heroImage from "../img/herotask.png";
import trustImage from "../img/trust.png";
import qualImage from "../img/qual.png";
import innovationsImage from "../img/innovations.png";
import person1Image from "../img/1st-person-main.jpg";
import person2Image from "../img/2nd-person-main.jpg";
import person3Image from "../img/3rd-person-main.jpg";
import heroImage from "../img/Hero-picture.png";
import hospitalsImage from "../img/hospitals and clinics.jpg";
import constructionImage from "../img/construction.jpg";
import restaurantImage from "../img/restaurant.jpg";
import hotelImage from "../img/hotels.jpg";
import roommatesImage from "../img/wg.jpg";
import HowItWorks from "../Pages/LandingPage/HowItWorks";

const LandingPage = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="font-normal m-auto bg-[#ffffff]">
      <header className="relative z-20 px-4 sm:px-6 lg:px-8 py-4" data-aos="fade-down">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center">
            <img className="w-12 h-auto" src={logo} alt="logo" />
            <span className="ml-4 text-xl font-semibold text-black">SnapTask</span>
          </div>
          <div className="hidden sm:flex gap-4">
            <Link
              to="/login"
              className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-fuchsia-500 transition-colors duration-300">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-fuchsia-500 transition-colors duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-white relative mt-36" data-aos="fade-up">
          <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col-reverse lg:flex-row items-center px-4 sm:px-6 lg:px-8 py-10">
            <div className="lg:w-1/2 text-start" data-aos="fade-right">
              <h2 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold mb-8 text-left text-primary">Keep track, optimize resources</h2>
              <p className="text-sm lg:text-lg mb-10 text-left text-black">
                At Snap Tasks, we understand that organizing tasks can be overwhelming. Our mission is to simplify your life by providing a powerful
                platform that helps you streamline your tasks, set priorities, and achieve your goals with ease. Whether you're managing a busy
                schedule, coordinating with a team, or looking to enhance your productivity, Snap Tasks offers innovative solutions tailored to your
                needs.
              </p>
              <Link
                to="/signup"
                className="bg-primary text-white w-full sm:w-auto py-3 px-6 rounded-lg font-semibold hover:bg-fuchsia-500 transition-colors duration-300 text-center">
                Get Started
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
              <img className="w-full h-auto object-cover" src={heroImage} alt="hero" data-aos="fade-left" />
            </div>
          </div>
        </section>
        <HowItWorks />
        <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-52 bg-purple-50 rounded-xl shadow-lg" data-aos="fade-up">
          <h2 className="text-4xl font-extrabold text-center mb-6 text-primary">A Tailored Solution For You</h2>
          <p className="text-lg font-normal text-center mb-8 text-black">
            Our solutions are ideal for busy professionals, team leaders, and anyone looking to enhance their organizational skills and productivity.
          </p>
          <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="card bg-base-100 shadow-xl group relative" data-aos="zoom-in">
                <figure>
                  <img
                    src={hospitalsImage}
                    alt="Expert Guidance"
                    className="group-hover:brightness-0 transition duration-300 ease-in-out rounded-xl"
                  />
                </figure>
                <div className="card-body opacity-0 group-hover:opacity-100 flex items-center justify-center absolute inset-0 transition-opacity duration-300 ease-in-out">
                  <ul className="text-white text-sm list-disc text-left flex flex-col gap-5">
                    <li>Keep track of rooms and areas clean</li>
                    <li>Get informed about the performance of your employees</li>
                    <li>Get informes about what are the areas that use more resources</li>
                  </ul>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl group relative" data-aos="zoom-in">
                <figure>
                  <img
                    src={restaurantImage}
                    alt="Expert Guidance"
                    className="group-hover:brightness-0 transition duration-300 ease-in-out rounded-xl"
                  />
                </figure>
                <div className="card-body opacity-0 group-hover:opacity-100 flex items-center justify-center absolute inset-0 transition-opacity duration-300 ease-in-out">
                  <ul className="text-white text-sm list-disc text-left flex flex-col gap-5">
                    <li>Keep track of rooms and areas clean</li>
                    <li>Get informed about the performance of your employees</li>
                    <li>Get informes about what are the areas that use more resources</li>
                  </ul>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl group relative" data-aos="zoom-in">
                <figure>
                  <img src={hotelImage} alt="Expert Guidance" className="group-hover:brightness-0 transition duration-300 ease-in-out rounded-xl" />
                </figure>
                <div className="card-body opacity-0 group-hover:opacity-100 flex items-center justify-center absolute inset-0 transition-opacity duration-300 ease-in-out">
                  <ul className="text-white text-sm list-disc text-left flex flex-col gap-5">
                    <li>Keep track of rooms and areas clean</li>
                    <li>Get informed about the performance of your employees</li>
                    <li>Get informes about what are the areas that use more resources</li>
                  </ul>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl group relative" data-aos="zoom-in">
                <figure>
                  <img
                    src={constructionImage}
                    alt="Expert Guidance"
                    className="group-hover:brightness-0 transition duration-300 ease-in-out rounded-xl"
                  />
                </figure>
                <div className="card-body opacity-0 group-hover:opacity-100 flex items-center justify-center absolute inset-0 transition-opacity duration-300 ease-in-out">
                  <ul className="text-white text-sm list-disc text-left flex flex-col gap-5">
                    <li>Keep track of rooms and areas clean</li>
                    <li>Get informed about the performance of your employees</li>
                    <li>Get informes about what are the areas that use more resources</li>
                  </ul>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl group relative" data-aos="zoom-in">
                <figure>
                  <img
                    src={roommatesImage}
                    alt="Expert Guidance"
                    className="group-hover:brightness-0 transition duration-300 ease-in-out rounded-xl"
                  />
                </figure>
                <div className="card-body opacity-0 group-hover:opacity-100 flex items-center justify-center absolute inset-0 transition-opacity duration-300 ease-in-out">
                  <ul className="text-white text-sm list-disc text-left flex flex-col gap-5">
                    <li>Keep track of rooms and areas clean</li>
                    <li>Get informed about the performance of your employees</li>
                    <li>Get informes about what are the areas that use more resources</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="mt-4 uppercase text-primary text-2xl font-medium ">
                <h3>Healthcare</h3>
              </div>
              <div className="mt-4 uppercase text-primary text-2xl font-medium">
                <h3>Restaurants</h3>
              </div>
              <div className="mt-4 uppercase text-primary text-2xl font-medium">
                <h3>Hospitality</h3>
              </div>
              <div className="mt-4 uppercase text-primary text-2xl font-medium">
                <h3>Construction</h3>
              </div>
              <div className="mt-4 uppercase text-primary text-2xl font-medium">
                <h3>Shared Flats</h3>
              </div>
            </div>
          </div>
        </section>

        <section
          className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-52"
          data-aos="fade-up"
        >
          <h2 className="text-4xl font-extrabold text-center mb-6 text-primary">
            What we provide
          </h2>

        <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-28" data-aos="fade-up">
          <h2 className="text-4xl font-extrabold text-center mb-6">What we provide</h2>
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <Slider {...sliderSettings} className="w-full">
                <div className="flex justify-center items-center p-4">
                  <div className="flex justify-center items-center w-full h-full">
                    <img src={trustImage} alt="Description 1" className="w-3/4 h-auto object-contain" />
                  </div>
                </div>
                <div className="flex justify-center items-center p-4">
                  <div className="flex justify-center items-center w-full h-full">
                    <img src={qualImage} alt="Description 2" className="w-3/4 h-auto object-contain" />
                  </div>
                </div>
                <div className="flex justify-center items-center p-4">
                  <div className="flex justify-center items-center w-full h-full">
                    <img src={innovationsImage} alt="Description 3" className="w-3/4 h-auto object-contain" />
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </section>
        <section
          className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-28 mb-44 bg-green-100 w-full rounded-xl shadow-lg"
          data-aos="fade-up">
          <h2 className="text-4xl font-extrabold text-center mb-6 text-primary">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg drop-shadow-lg" data-aos="fade-right">
              <img src={person1Image} alt="Daniel Avery" className="mb-6 max-w-full h-auto border-0" />
              <h5 className="text-primary text-2xl font-medium">Sebastian</h5>
              <p className="text-gray-500 text-base">CEO</p>
            </div>
            <div className="p-6 rounded-lg drop-shadow-lg" data-aos="fade-up">
              <img src={person2Image} alt="Jessi Howard" className="mb-6 max-w-full h-auto border-0" />
              <h5 className="text-primary text-2xl font-medium">Felipe</h5>
              <p className="text-gray-500 text-base">CEO</p>
            </div>
            <div className="p-6 rounded-lg drop-shadow-lg" data-aos="fade-left">
              <img src={person3Image} alt="Matt Baker" className="mb-6 max-w-full h-auto border-0" />
              <h5 className="text-primary text-2xl font-medium">Serge</h5>
              <p className="text-gray-500 text-base">CEO</p>
            </div>
            <div className="p-6 rounded-lg drop-shadow-lg" data-aos="fade-right">
              <img src={person3Image} alt="Matt Baker" className="mb-6 max-w-full h-auto border-0" />
              <h5 className="text-primary text-2xl font-medium">Michal</h5>
              <p className="text-gray-500 text-base">CEO</p>
            </div>
          </div>
        </section>


<section className="bg-indigo-100 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-44 mb-44 w-full rounded-xl shadow-lg">
    <div className="container mx-auto grid grid-cols-1 gap-20 text-center">
        <div>
            <span className="block text-lg font-bold text-primary uppercase tracking-wider mb-4">
                Contact us
            </span>
            <h2 className="text-4xl font-bold text-neutral mb-8">Have a question?</h2>
            <p className="text-lg text-black leading-relaxed mb-12">
                Have you ever thought about getting rid of all the tracking paper sheets
                and modernizing your operation? We're here to help!
            </p>
            <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <div className="form-control">
                        <label htmlFor="name" className="label">
                            <span className="label-text font-medium text-black">First Name</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your First Name"
                            className="input input-bordered w-full bg-slate-50"
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="surname" className="label">
                            <span className="label-text font-medium text-black">Last Name</span>
                        </label>
                        <input
                            type="text"
                            id="surname"
                            placeholder="Enter your Last Name"
                            className="input input-bordered w-full bg-slate-50"
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email" className="label">
                            <span className="label-text font-medium text-black">Email</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your Email"
                            className="input input-bordered w-full bg-slate-50"
                        />
                    </div>
                </div>
                <div className="form-control">
                    <label htmlFor="message" className="label">
                        <span className="label-text font-medium text-black">Message</span>
                    </label>
                    <textarea
                        id="message"
                        cols="20"
                        rows="10"
                        placeholder="Write your message here"
                        className="textarea textarea-bordered w-full bg-slate-50 h-full"
                    ></textarea>

                    
                    <div className="mt-4">
                        <div className="flex items-start justify-start">
                            <label htmlFor="agree" className="label cursor-pointer flex items-start">
                                <input
                                    required
                                    type="checkbox"
                                    id="agree"
                                    className="checkbox checkbox-primary mt-1 mr-2"
                                />
                                <span className="label-text text-sm text-black text-left">
                                    <span className="text-red-500">*</span> By submitting this
                                    message, I confirm that I have read and agree to the terms of use
                                    and privacy policy of SnapTask.
                                </span>
                            </label>
                        </div>
                        <div className="flex justify-start mt-4">
                            <button type="submit" className="btn btn-primary w-44">
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div className="bg-base-200 p-8 rounded-xl bg-indigo-300">
            <div className="mb-12 text-center">
                <span className="block text-2xl font-bold mb-6 text-indigo-900">
                    Get in touch
                </span>
                <p className="text-lg leading-relaxed text-indigo-900">
                    We love to hear from you. Our team is always here to chat.
                </p>

        <section className="py-24 bg-indigo-100 m-auto">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 px-16">
            <div>
              <span className="block text-lg font-bold text-primary uppercase tracking-wider mb-4">Contact us</span>
              <h2 className="text-4xl font-bold text-neutral mb-8">Have a question?</h2>
              <p className="text-lg text-black leading-relaxed mb-12">
                Have you ever think about get rid of all the tracking paper sheets and modernize your operation? We're here to help!
              </p>
              <form className="space-y-8">
                <div className="form-control">
                  <label htmlFor="name" className="label">
                    <span className="label-text font-medium text-black">First Name</span>
                  </label>
                  <input type="text" id="name" placeholder="Enter your First Name" className="input input-bordered w-full bg-slate-50" />
                </div>
                <div className="form-control">
                  <label htmlFor="surname" className="label">
                    <span className="label-text font-medium text-black">Last Name</span>
                  </label>
                  <input type="text" id="surname" placeholder="Enter your Last Name" className="input input-bordered w-full bg-slate-50" />
                </div>
                <div className="form-control">
                  <label htmlFor="email" className="label">
                    <span className="label-text font-medium text-black">Email</span>
                  </label>
                  <input type="email" id="email" placeholder="Enter your Email" className="input input-bordered w-full bg-slate-50" />
                </div>
                <div className="form-control">
                  <label htmlFor="message" className="label">
                    <span className="label-text font-medium text-black">Message</span>
                  </label>
                  <textarea
                    id="message"
                    cols="20"
                    rows="10"
                    placeholder="Write your message here"
                    className="textarea textarea-bordered w-full bg-slate-50 h-36"></textarea>
                </div>
                <div className="form-control flex items-start">
                  <label htmlFor="agree" className="label cursor-pointer flex items-start">
                    <input required type="checkbox" id="agree" className="checkbox checkbox-primary mt-1 mr-2" />
                    <span className="label-text text-sm text-black text-left">
                      <span className="text-red-500">*</span> By submitting this message, I confirm that I have read and agree to the terms of use and
                      privacy policy of SnapTask.
                    </span>
                  </label>
                </div>
                <button type="submit" className="btn btn-primary w-44">
                  Send Message
                </button>
              </form>
            </div>
            <div className="p-8 rounded-xl bg-indigo-200">
              <div className="mb-12 mt-6">
                <span className="block text-3xl font-bold mb-6 text-indigo-900">Get in touch</span>
                <p className="text-xl leading-relaxed text-indigo-900">We love to hear from you. Our team is always here to chat.</p>
              </div>
              <address className="not-italic">
                <div className="flex items-center mb-8 text-xl">
                  <div className="bg-primary p-4 rounded-full text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <span className="flex justify-start text-lg font-bold text-indigo-900">Address</span>
                    <p className="text-indigo-700">Tierstr. 119, Leipzig, Germany</p>
                  </div>
                </div>
                <div className="flex items-center mb-8 text-xl">
                  <div className="bg-primary p-4 rounded-full text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <span className="flex justify-start text-lg font-bold text-indigo-900">Phone</span>
                    <p className=" text-indigo-700">+49 186 73636 838</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary p-4 rounded-full text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                      />
                    </svg>
                  </div>
                  <div className="ml-4 text-xl">
                    <span className="flex justify-start text-lg font-bold text-indigo-900">Email</span>
                    <p className="text-indigo-700">hello@snaptask.com</p>
                  </div>
                </div>
              </address>

            </div>
            <address className="not-italic flex flex-col lg:flex-row lg:justify-between">
    <div className="flex items-center mb-6 lg:mb-0">
        <div className="bg-primary p-4 rounded-full text-white text-2xl">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
            </svg>
        </div>
        <div className="ml-4">
            <span className="flex justify-start text-lg font-bold text-indigo-900">
                Address
            </span>
            <p className="text-indigo-700 text-start">Tierstr. 119, Leipzig, Germany</p>
        </div>
    </div>
    <div className="flex items-center mb-6 lg:mb-0">
        <div className="bg-primary p-4 rounded-full text-white text-2xl">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
            </svg>
        </div>
        <div className="ml-4">
            <span className="flex justify-start text-lg font-bold text-indigo-900">
                Phone
            </span>
            <p className="text-indigo-700 text-start">+49 186 73636 838</p>
        </div>
    </div>
    <div className="flex items-center">
        <div className="bg-primary p-4 rounded-full text-white text-2xl">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
            </svg>
        </div>
        <div className="ml-4">
            <span className="flex justify-start text-lg font-bold text-indigo-900">
                Email
            </span>
            <p className="text-indigo-700 text-start">hello@snaptask.com</p>
        </div>
        </div>
        </address>
      </div>
    </div>
</section>
</main>
  

      <footer className="bg-white text-gray-600 p-10 mx-auto max-w-screen-xl pt-16">
        <div className="flex flex-wrap justify-between">
          <aside className="w-full sm:w-1/2 lg:w-1/5 mb-6">
            <div className="flex items-start mb-4">
              <img className="w-7 h-auto" src={logo} alt="logo" />
              <span className="ml-4 text-xl font-semibold text-black">SnapTask</span>
            </div>
            <p className="font-bold mt-6 text-start">Where Organization Meets Excellence</p>
          </aside>

          <nav className="w-full sm:w-1/2 lg:w-1/5 mb-6">
            <h6 className="footer-title text-primary flex item start">About</h6>
            <ul className="font-bold flex flex-col items-start">
              <li className="mb-2">
                <Link to="#" className="link link-hover">
                  Our Story
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="link link-hover">
                  Careers
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="link link-hover">
                  Our Team
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="link link-hover">
                  Resources
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="w-full sm:w-1/2 lg:w-1/5 mb-6">
            <h6 className="footer-title text-primary flex items-start">Support</h6>
            <ul className="font-bold flex flex-col items-start">
              <li className="mb-2">
                <Link to="#" className="link link-hover">
                  FAQ
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="link link-hover">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="link link-hover">
                  Help Center
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="w-full sm:w-1/2 lg:w-1/5 mb-6">
            <h6 className="footer-title text-primary flex items-start">Contact</h6>
            <ul className="font-bold flex flex-col items-start">
              <li className="mb-2">
                <a href="mailto:info@snaptask.com" className="link link-hover">
                  Email Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="link link-hover">
                  Support
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="link link-hover">
                  Locations
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
