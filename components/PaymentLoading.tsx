"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PaymentLoading() {
  return (
    <Card className="shadow-xl border-0 p-0 bg-white/95 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-[#0075FF] py-4 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-full">
            <Image src="/icon.png" alt="SyncGram" width={20} height={20} />
          </div>
          <h2 className="text-2xl font-bold poppins">SyncGram Checkout</h2>
        </div>
        <p className="text-white/80 text-sm">Preparing your payment...</p>
      </CardHeader>

      <CardContent className="">
        {/* Animated loading indicator */}
        <div className="flex justify-center mb-8 mt-2">
          <div className="relative w-16 h-16">
            {/* Outer spinning circle */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-t-[#5e19b3] border-r-[#A384FF] border-b-[#A384FF] border-l-[#5e19b3]"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner pulsing circle */}
            <motion.div
              className="absolute inset-3 bg-[#A384FF]/20 rounded-full flex items-center justify-center"
              animate={{ scale: [0.8, 1, 0.8] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image src="/icon.png" alt="SyncGram" width={16} height={16} />
            </motion.div>
          </div>
        </div>

        {/* Skeleton UI for payment form */}
        <div className="space-y-6">
          {/* Payment method skeleton */}
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-10 flex-1 bg-[#A384FF]/10" />
            <Skeleton className="h-10 flex-1 bg-[#A384FF]/10" />
            <Skeleton className="h-10 flex-1 bg-[#A384FF]/10" />
          </div>

          {/* Recipient address skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-[#A384FF]/10" />
            <Skeleton className="h-4 w-full bg-[#A384FF]/10" />
          </div>

          {/* Payment amount skeleton */}
          <div className="flex justify-between items-center border-t border-b py-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 bg-[#A384FF]/10" />
              <Skeleton className="h-8 w-32 bg-[#A384FF]/10" />
            </div>
            <Skeleton className="h-8 w-16 rounded-full bg-[#A384FF]/10" />
          </div>

          {/* Expiry time skeleton */}
          <div className="bg-[#1A1F37]/10 p-3 rounded-lg">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 bg-[#A384FF]/10" />
              <Skeleton className="h-4 w-40 bg-[#A384FF]/10" />
            </div>
          </div>
        </div>

        {/* Button skeleton */}
        <div className="mt-6">
          <Skeleton className="h-10 w-full bg-[#A384FF]/20" />
        </div>

        {/* Footer text skeleton */}
        <div className="mt-3 flex justify-center">
          <Skeleton className="h-3 w-48 bg-[#A384FF]/10" />
        </div>
      </CardContent>
    </Card>
  );
}
