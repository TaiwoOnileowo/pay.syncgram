"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, HelpCircle, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PaymentFailedProps {
  errorMessage: string;
}

export default function PaymentFailed({ errorMessage }: PaymentFailedProps) {
  return (
    <Card className="shadow-xl border-0 p-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className=" py-4 bg-[#0075FF] text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-full">
            <Image src="/icon.png" alt="SyncGram" width={20} height={20} />
          </div>
          <CardTitle className="text-2xl font-bold poppins">
            Payment Issue
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-8 pb-6 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h2 className="text-xl font-bold text-[#1A1F37] mb-2">
          Payment Failed
        </h2>
        <p className="text-gray-600 text-center mb-6">{errorMessage}</p>

        <div className="flex gap-4">
          <Button
            variant={"ghost"}
            className=" gap-2"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button className="bg-[#0075FF] hover:bg-[#0075FF]/90 gap-2">
            <Link
              href={"https://t.me/SyncGramSupportBot"}
              className="flex items-center gap-2"
              target="_blank"
            >
              <HelpCircle className="h-4 w-4" />
              Contact Support
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
