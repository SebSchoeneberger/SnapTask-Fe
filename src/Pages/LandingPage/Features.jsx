import { motion } from "framer-motion";

export default function Features() {
  return (
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
  );
}
