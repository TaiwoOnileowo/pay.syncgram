"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CountdownTimer from "./CountdownTimer";

interface PaymentData {
  recipientAddress: string;
  amount: number;
  currency: string;
  expiryTimeInSeconds: number;
}

interface PaymentCheckoutProps {
  paymentData: PaymentData;
  onPaymentConfirm: () => void;
}

export default function PaymentCheckout({
  paymentData,
  onPaymentConfirm,
}: PaymentCheckoutProps) {
  const { recipientAddress, amount, currency, expiryTimeInSeconds } =
    paymentData;
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "crypto" | "wallet"
  >("wallet");

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      onPaymentConfirm();
    }, 2000);
  };

  const formatCurrency = (value: number, currency: string) => {
    // List of known cryptocurrencies
    const cryptoCurrencies = ["USDT", "BTC", "ETH", "BNB", "XRP"];

    if (cryptoCurrencies.includes(currency)) {
      // For cryptocurrencies, format without currency symbol
      return `${value.toFixed(6)} ${currency}`;
    }

    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(value);
    } catch (error) {
      // Fallback for any other invalid currency codes
      return `${value.toFixed(2)} ${currency}`;
    }
  };

  return (
    <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm py-0">
      <CardHeader className="bg-[#0075FF]  py-6  text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-full">
            <Image src="/icon.png" alt="SyncGram" width={20} height={20} />
          </div>
          <CardTitle className="text-2xl poppins">SyncGram Checkout</CardTitle>
        </div>
        <CardDescription className="text-white/80">
          Fast, secure payments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-2 mb-4">
            {/* <Button
              variant={paymentMethod === "card" ? "default" : "outline"}
              className={
                paymentMethod === "card"
                  ? "bg-[#5e19b3] hover:bg-[#4c1591] flex-1"
                  : "flex-1"
              }
              onClick={() => setPaymentMethod("card")}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Card
            </Button>
            <Button
              variant={paymentMethod === "crypto" ? "default" : "outline"}
              className={
                paymentMethod === "crypto"
                  ? "bg-[#5e19b3] hover:bg-[#4c1591] flex-1"
                  : "flex-1"
              }
              onClick={() => setPaymentMethod("crypto")}
            >
              <Zap className="h-4 w-4 mr-2" />
              Crypto
            </Button> */}
            <Button
              variant={paymentMethod === "wallet" ? "default" : "outline"}
              className={
                paymentMethod === "wallet"
                  ? "bg-[#0075FF] hover:bg-[#0075FF]/90 flex-1"
                  : "flex-1"
              }
              onClick={() => setPaymentMethod("wallet")}
            >
              <Wallet />
              Wallet
            </Button>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500">Recipient</h3>
            <p className="text-sm text-gray-700">{recipientAddress}</p>
          </div>

          <div className="flex justify-between items-center border-t border-b py-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Payment Amount
              </h3>
              <p className="text-2xl font-bold text-[#1A1F37]">
                {formatCurrency(amount, currency)}
              </p>
            </div>
            <div className="bg-[#A384FF]/20 text-[#5e19b3] px-3 py-1 rounded-full text-sm font-medium">
              {currency}
            </div>
          </div>

          <div className="bg-[#1A1F37]/10 p-3 rounded-lg flex items-start gap-2">
            <Clock className="h-5 w-5 text-[#5e19b3] mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-[#1A1F37]">
                Payment Expiry
              </h3>
              <CountdownTimer
                initialTimeInSeconds={expiryTimeInSeconds}
                onExpire={() => console.log("Payment expired")}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col py-6 gap-3">
        <Button
          className="w-full bg-[#0075FF] hover:bg-[#0075FF]/90 text-white"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "I've made the payment"}
        </Button>
        <p className="text-xs text-center text-gray-500">
          Secured by{" "}
          <Link
            href={"https://sync-gram.com/"}
            target="_blank"
            className="font-bold hover:underline"
          >
            SyncGram Pay
          </Link>{" "}
          • Terms apply
        </p>
      </CardFooter>
    </Card>
  );
}
