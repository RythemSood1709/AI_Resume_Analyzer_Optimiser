import { FileText } from "lucide-react";
import { motion } from "framer-motion";

const AILogo = () => {
  return (
    <div
      className="relative h-12 w-12 flex items-center justify-center"
      aria-label="AI is online"
    >
      {/* Soft outer halo glow — breathes */}
      <motion.div
        className="absolute -inset-1 rounded-[20px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
          filter: "blur(10px)",
        }}
        animate={{ opacity: [0.45, 0.9, 0.45], scale: [0.85, 1.08, 0.85] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating conic gradient ring (the sweep) */}
      <div className="absolute inset-0 rounded-[16px] overflow-hidden">
        <motion.div
          className="absolute -inset-1/2"
          style={{
            background:
              "conic-gradient(from 0deg, #2F4A3A, #5B7C6A, #A8C4B3, #5B7C6A, #2F4A3A)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Inner card (creates the ring frame) */}
      <div className="relative h-[38px] w-[38px] rounded-[12px] bg-[var(--surface)] flex items-center justify-center overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
        {/* Soft inner gradient backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, var(--accent-soft) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <FileText
          aria-hidden="true"
          className="relative z-10 h-[20px] w-[20px]"
          color="var(--accent)"
          strokeWidth={1.8}
        />
      </div>
    </div>
  );
};

export default AILogo;
