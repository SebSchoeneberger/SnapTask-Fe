import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LandingPageAI() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "https://via.placeholder.com/800x400?text=Image+1",
    "https://via.placeholder.com/800x400?text=Image+2",
    "https://via.placeholder.com/800x400?text=Image+3",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center w-full">
      {/* Header Section */}
      <header className="text-center py-8">
        <motion.h1
          className="text-5xl font-bold text-primary mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          Welcome to SnapTask
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          Streamline your task management and improve team productivity
        </motion.p>
      </header>

      {/* Features Section */}
      <section className="w-full max-w-6xl flex flex-wrap justify-center gap-8 px-4 py-12">
        <motion.div
          className="card w-80 bg-base-100 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="card-body">
            <h2 className="card-title text-primary">Manage Areas</h2>
            <p>Create and manage specific areas for your tasks to keep everything organized.</p>
          </div>
        </motion.div>

        <motion.div
          className="card w-80 bg-base-100 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}>
          <div className="card-body">
            <h2 className="card-title text-primary">Assign Tasks</h2>
            <p>Assign tasks to staff members based on their roles and areas.</p>
          </div>
        </motion.div>

        <motion.div
          className="card w-80 bg-base-100 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}>
          <div className="card-body">
            <h2 className="card-title text-primary">Track Progress</h2>
            <p>Monitor task status in real-time and generate performance reports.</p>
          </div>
        </motion.div>

        <motion.div
          className="card w-80 bg-base-100 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}>
          <div className="card-body">
            <h2 className="card-title text-primary">QR Code Access</h2>
            <p>Staff can easily access tasks by scanning QR codes placed on-site.</p>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16">
        <div className="max-w-6xl mx-auto text-center px-4">
          <motion.h2
            className="text-4xl font-bold text-primary mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}>
            How It Works
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-12">
            <motion.div
              className="flex flex-col items-center max-w-xs text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="text-5xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold mb-2">1. Create Areas</h3>
              <p className="text-gray-600">Set up distinct areas within your organization for better task segmentation.</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center max-w-xs text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}>
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">2. Assign Tasks</h3>
              <p className="text-gray-600">Assign tasks to the right staff members based on their roles and expertise.</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center max-w-xs text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}>
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">3. Monitor Progress</h3>
              <p className="text-gray-600">Track the status of tasks in real-time and ensure everything is on schedule.</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center max-w-xs text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}>
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">4. Use QR Codes</h3>
              <p className="text-gray-600">Easily access tasks by scanning QR codes placed in specific areas.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="bg-base-100 w-full py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-primary mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}>
            Our Work in Action
          </motion.h2>
          <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
            {images.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  x: currentSlide === index ? 0 : -100,
                }}
                transition={{ duration: 0.8 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <footer className="text-center py-12">
        <motion.a href="/signup" className="btn btn-primary btn-lg" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          Get Started
        </motion.a>
        <motion.p
          className="mt-4 text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}>
          Already have an account?{" "}
          <a href="/login" className="text-primary">
            Log in here
          </a>
        </motion.p>
      </footer>
    </div>
  );
}
