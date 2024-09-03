import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section className="w-full py-12 mt-52">
      <div className="max-w-6xl mx-auto text-center px-4">
        <motion.h2
          className="text-4xl font-bold text-primary mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}>
          <p className="text-black">How It Works</p>
        </motion.h2>
        <div className="grid grid-cols-2 m-auto justify-center gap-12 mt-16">
          <motion.div
            className="flex flex-col items-center max-w-xs text-center m-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">1. Create Areas</h3>
            <p className="text-gray-700">Set up distinct areas within your organization for better task segmentation.</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center max-w-xs text-center m-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">2. Assign Tasks</h3>
            <p className="text-gray-700">Assign tasks to the right staff members based on their roles and expertise.</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center max-w-xs text-center m-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}>
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">3. Monitor Progress</h3>
            <p className="text-gray-700">Track the status of tasks in real-time and ensure everything is on schedule.</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center max-w-xs text-center m-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}>
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">4. Use QR Codes</h3>
            <p className="text-gray-700">Easily access tasks by scanning QR codes placed in specific areas.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
