import FAQentry from "../Components/FAQentry";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Faq() {
  const faqs = [
    {
      question: "What is the purpose of this website?",
      answer: "The purpose of this website is to provide a platform for users to manage their tasks and projects.",
    },
    {
      question: "What are the different user roles in SnapTask?",
      answer: `There are three different user roles in SnapTask: Admin, Manager, and Staff. Admin: Has the highest level of access. 
        Admins can create and manage other users, areas, and tasks, and have access to all reports and statistics.
        Manager is similar to Admin but with slightly fewer permissions.
        Managers can also create users, areas, and tasks, and manage task assignments.
        Staff is assigned specific tasks in designated areas. They can view and work on tasks assigned to them and see their progress status.
        `,
    },
    {
      question: "How do I create a new user?",
      answer: `Admins and Managers can create new users by navigating to the user management section in the dashboard. 
      Fill in the required details such as the user’s role and area assignment, and then save the changes.
        `,
    },
    {
      question: "How do I create and assign tasks?",
      answer: `Admins and Managers can create tasks by accessing the task management section. 
      Specify the details of the task, choose the relevant area, and assign it to a staff member. 
      The assigned staff will then see the task in their dashboard.
        `,
    },
    {
      question: "What are the different task statuses?",
      answer: `New: The task has been created but not yet started. 
      In Progress: The task is currently being worked on.
      Finished: The task has been completed.`,
    },
    {
      question: "How do staff members access their tasks?",
      answer: `Staff members will be redirected to their specific area upon logging in. 
      They can view and select tasks assigned to them from the list in their area.`,
    },
    {
      question: "Can staff members see tasks assigned to other staff?",
      answer: `No, staff members can only see tasks that are specifically assigned to them.`,
    },
    {
      question: "How does the QR code feature work?",
      answer: `Admins can generate QR codes for specific tasks and place them at relevant locations. 
      When staff members scan the QR code using their mobile device, they will be redirected to the task page on the SnapTask website,
      where they can view and work on the task.`,
    },
    {
      question: "How can I view performance and activity reports?",
      answer: `Admins can access performance and activity reports through the dashboard. 
      The reports section provides insights into user activity, task progress, and overall performance.`,
    },
    {
      question: "Can I print a QR code for a task?",
      answer: `Yes, admins can generate and print QR codes for specific tasks. 
      This feature is useful for directing staff to tasks at specific locations easily.`,
    },
    {
      question: "What should I do if I forget my password?",
      answer: `Click on the "Forgot Password" link on the login page. 
      Follow the instructions to reset your password using the email associated with your account.`,
    },
    {
      question: "How do I change user roles or permissions?",
      answer: `Admins can change user roles and permissions by navigating to the user management section of the dashboard, 
      selecting the user, and modifying their role or permissions as needed.`,
    },
    {
      question: "Can I assign a task to multiple staff members?",
      answer: `Currently, tasks can only be assigned to one staff member at a time. 
      If you need to assign the same task to multiple staff members, you'll need to create separate tasks for each.`,
    },
    {
      question: "Is there a way to track task progress in real-time?",
      answer: `Yes, you can track task progress in real-time through the task management section of the dashboard. 
      Updates will be reflected as staff members change the task status.`,
    },
    {
      question: "Who can I contact for support?",
      answer: `For support, please contact our support team through the "Help" or "Contact Us" section on the website. 
      Provide details about your issue, and we’ll assist you as quickly as possible.`,
    },
  ];
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

export default Faq;
