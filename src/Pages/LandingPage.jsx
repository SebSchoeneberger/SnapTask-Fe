import React from "react";
import Slider from "react-slick";
import AOS from "aos";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import logo from "../img/Logo.png";
import heroImage from "../img/herotask.png";
import trustImage from "../img/trust.png";
import qualImage from "../img/qual.png";
import innovationsImage from "../img/innovations.png";
import person1Image from "../img/1st-person-main.jpg";
import person2Image from "../img/2nd-person-main.jpg";
import person3Image from "../img/3rd-person-main.jpg";
import hospitalsImage from "../img/hospitals and clinics.jpg";
import industryImage from "../img/industry2.jpg";
import roommatesImage from "../img/roommates.jpg";
import HowItWorks from "./LandingPage/HowItWorks";

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
    <div className="font-normal m-auto bg-[#ffffff] text-black">
      <header className="relative z-20 px-4 sm:px-6 lg:px-8 py-4" data-aos="fade-down">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center">
            <img className="w-12 h-auto" src={logo} alt="logo" />
            <span className="ml-4 text-xl font-semibold text-black">SnapTask</span>
          </div>
          <div className="hidden sm:flex gap-4">
            <Link
              to="/login"
              className="bg-[#40446b] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#7e5035] transition-colors duration-300">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#40446b] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#7e5035] transition-colors duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-white relative mt-36" data-aos="fade-up">
          <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col-reverse lg:flex-row items-center px-4 sm:px-6 lg:px-8 py-10">
            <div className="lg:w-1/2" data-aos="fade-right">
              <h2 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold mb-4">Easy management</h2>
              <p className="text-sm lg:text-lg mb-6">
                At Snap Tasks, we understand that organizing tasks can be overwhelming. Our mission is to simplify your life by providing a powerful
                platform that helps you streamline your tasks, set priorities, and achieve your goals with ease. Whether you're managing a busy
                schedule, coordinating with a team, or looking to enhance your productivity, Snap Tasks offers innovative solutions tailored to your
                needs.
              </p>
              <Link
                to="/signup"
                className="bg-[#40446b] text-white w-full sm:w-auto py-3 px-6 rounded-lg font-semibold hover:bg-[#7e5035] transition-colors duration-300 text-center">
                Get Started
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
              <img className="w-full h-auto object-cover" src={heroImage} alt="hero" data-aos="fade-left" />
            </div>
          </div>
        </section>

        <HowItWorks />

        <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-28" data-aos="fade-up">
          <h2 className="text-4xl font-extrabold text-center mb-6">What we offer</h2>
          <p className="text-lg font-normal text-center mb-8">
            Our solutions are ideal for busy professionals, team leaders, and anyone looking to enhance their organizational skills and productivity.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card bg-base-100  shadow-xl group relative" data-aos="zoom-in">
              <figure>
                <img
                  src={hospitalsImage}
                  alt="Expert Guidance"
                  className="group-hover:brightness-50 transition duration-300 ease-in-out rounded-xl"
                />
              </figure>
              <div className="card-body opacity-0 group-hover:opacity-100 flex items-center justify-center absolute inset-0 transition-opacity duration-300 ease-in-out">
                <h2 className="card-title text-white text-2xl">Hospitals & Clinics</h2>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl group relative" data-aos="zoom-in">
              <figure>
                <img
                  src={industryImage}
                  alt="Personalized Service"
                  className="group-hover:brightness-50 transition duration-300 ease-in-out rounded-xl"
                />
              </figure>
              <div className="card-body opacity-0 group-hover:opacity-100 flex items-center justify-center absolute inset-0 transition-opacity duration-300 ease-in-out">
                <h2 className="card-title text-white text-2xl">Industry</h2>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl group relative" data-aos="zoom-in">
              <figure>
                <img
                  src={roommatesImage}
                  alt="Transparent Process"
                  className="group-hover:brightness-50 transition duration-300 ease-in-out rounded-xl "
                />
              </figure>
              <div className="card-body opacity-0 group-hover:opacity-100 flex items-center justify-center absolute inset-0 transition-opacity duration-300 ease-in-out">
                <h2 className="card-title text-white text-2xl">Individuals </h2>
              </div>
            </div>
          </div>
        </section>

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

        <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-52" data-aos="fade-up">
          <h2 className="text-4xl font-extrabold text-center mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg drop-shadow-lg" data-aos="fade-right">
              <img src={person1Image} alt="Daniel Avery" className="mb-6 max-w-full h-auto border-0" />
              <h5 className="text-gray-800 text-2xl font-medium">Sebastian</h5>
              <p className="text-gray-500 text-base">CEO</p>
            </div>
            <div className="p-6 rounded-lg drop-shadow-lg" data-aos="fade-up">
              <img src={person2Image} alt="Jessi Howard" className="mb-6 max-w-full h-auto border-0" />
              <h5 className="text-gray-800 text-2xl font-medium">Felipe</h5>
              <p className="text-gray-500 text-base">CEO</p>
            </div>
            <div className="p-6 rounded-lg drop-shadow-lg" data-aos="fade-left">
              <img src={person3Image} alt="Matt Baker" className="mb-6 max-w-full h-auto border-0" />
              <h5 className="text-gray-800 text-2xl font-medium">Serge</h5>
              <p className="text-gray-500 text-base">CEO</p>
            </div>
            <div className="p-6 rounded-lg drop-shadow-lg" data-aos="fade-right">
              <img src={person3Image} alt="Matt Baker" className="mb-6 max-w-full h-auto border-0" />
              <h5 className="text-gray-800 text-2xl font-medium">Michal</h5>
              <p className="text-gray-500 text-base">CEO</p>
            </div>
          </div>
        </section>

        <section className="bg-[#ffffff] py-24 text-center mt-52" data-aos="fade-up">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-black mb-6">Get in Touch</h2>
            <p className="text-lg text-black mb-6">We are here for you. Contact us for any inquiries or support.</p>
            <button className="bg-[#40446b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7e5035] transition-colors duration-300">
              Contact Us
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white text-base-content p-10 mx-auto max-w-screen-xl mt-52">
        <div className="flex flex-wrap justify-between">
          <aside className="w-full sm:w-1/2 lg:w-1/5 mb-6">
            <div className="flex items-center mb-4">
              <img className="w-7 h-auto" src={logo} alt="logo" />
              <span className="ml-4 text-xl font-semibold text-black">SnapTask</span>
            </div>
            <p className="font-bold mt-6">Where Organization Meets Excellence</p>
          </aside>

          <nav className="w-full sm:w-1/2 lg:w-1/5 mb-6" data-aos="fade-right">
            <h6 className="footer-title text-[#2A1B13]">About</h6>
            <ul className="font-bold flex flex-col">
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

          <nav className="w-full sm:w-1/2 lg:w-1/5 mb-6" data-aos="fade-right">
            <h6 className="footer-title text-[#2A1B13]">Support</h6>
            <ul className="font-bold flex flex-col">
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

          <nav className="w-full sm:w-1/2 lg:w-1/5 mb-6" data-aos="fade-left">
            <h6 className="footer-title text-[#2A1B13]">Contact</h6>
            <ul className="font-bold flex flex-col">
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
