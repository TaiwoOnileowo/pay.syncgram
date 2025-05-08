"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // SVG checkmark animation variants
  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.3 },
      },
    },
  };

  // Circle animation variants
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <Card className="shadow-xl border-0 py-0 overflow-hidden relative bg-white/95 backdrop-blur-sm">
      {showConfetti && <Confetti />}

      <CardHeader className="bg-[#0075FF] py-6  text-white rounded-t-lg">
        <div className="flex items-center justify-center gap-2">
          <div className="bg-white p-1 rounded-full">
            <Image src="/icon.png" alt="SyncGram" width={20} height={20} />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-8 pb-6 flex flex-col items-center">
        <div className="w-24 h-24 mb-6 relative">
          <motion.div
            className="absolute inset-0"
            initial="hidden"
            animate="visible"
            variants={circleVariants}
          >
            <div className="w-full h-full rounded-full bg-[#0075FF]/20 flex items-center justify-center">
              <Check className="text-[#0075FF] w-10 h-10" />
            </div>
          </motion.div>
        </div>

        <h2 className="text-xl font-bold text-[#1A1F37] mb-2">Thank You!</h2>
        <p className="text-gray-600 text-center mb-6">
          Your payment has been processed successfully. A confirmation has been
          sent to your email.
        </p>

        <div className="bg-[#1A1F37]/10 p-4 rounded-lg w-full mb-6">
          <h3 className="text-sm font-medium text-[#1A1F37] mb-1">
            Transaction ID
          </h3>
          <p className="text-sm font-mono text-[#5e19b3]">
            SG-{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Confetti effect with SyncGram colors
function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            top: "-10%",
            left: `${Math.random() * 100}%`,
            opacity: 1,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            top: "100%",
            rotate: Math.random() * 360,
            opacity: 0,
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            backgroundColor: [
              "#5e19b3", // SyncGram purple
              "#A384FF", // SyncGram light purple
              "#1A1F37", // SyncGram dark blue
              "#FFFFFF", // White
              "#8A4FFF", // Another purple shade
            ][Math.floor(Math.random() * 5)],
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
}
