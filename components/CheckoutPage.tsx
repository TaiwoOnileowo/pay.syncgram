"use client";

import { getCheckoutDetails } from "@/lib/actions/checkout.action";
import { useEffect, useState } from "react";
import PaymentCheckout from "./PaymentCheckout";
import PaymentFailed from "./PaymentFailed";
import PaymentLoading from "./PaymentLoading";
import PaymentSuccess from "./PaymentSuccess";

interface PaymentData {
  address: string;
  amount: number;
  currency: string;
  expires_at: string;
  status: string;
}

export default function PaymentGateway({ invoiceId }: { invoiceId: string }) {
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "success" | "failed" | "timeout"
  >("pending");
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate expiry time in seconds from expires_at
  const getExpiryTimeInSeconds = (expiresAt: string) => {
    const expiryDate = new Date(expiresAt);
    const now = new Date();
    return Math.max(
      0,
      Math.floor((expiryDate.getTime() - now.getTime()) / 1000)
    );
  };

  // Fetch initial payment data
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const result = await getCheckoutDetails(invoiceId);
        if (result.success) {
          setPaymentData(result.data);
          setPaymentStatus(result.data.status);
        } else {
          setError("Failed to fetch payment data");
          setPaymentStatus("failed");
        }
      } catch (err) {
        setError("Network error occurred");
        setPaymentStatus("failed");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentData();
  }, [invoiceId]);

  // Handle payment confirmation and start polling
  const handlePaymentConfirm = () => {
    if (!paymentData) return;

    let pollCount = 0;
    const maxPollCount = 180; // 30 minutes at 10-second intervals
    const pollInterval = 10000; // 10 seconds

    const pollStatus = async () => {
      try {
        const response = await getCheckoutDetails(invoiceId);
        console.log("Polling response:", response);
        if (response.success && response.data.status === "success") {
          setPaymentStatus("success");
          return;
        }

        pollCount++;
        if (pollCount >= maxPollCount) {
          setPaymentStatus("timeout");
          return;
        }

        setTimeout(pollStatus, pollInterval);
      } catch (err) {
        setError("Error checking payment status");
        setPaymentStatus("failed");
      }
    };

    pollStatus();
  };

  // Format payment data for PaymentCheckout
  const formattedPaymentData = paymentData
    ? {
        recipientAddress: paymentData.address,
        amount: paymentData.amount,
        currency: paymentData.currency,
        expiryTimeInSeconds: getExpiryTimeInSeconds(paymentData.expires_at),
      }
    : null;

  // Render based on payment status
  return (
    <div className="w-full max-w-md mx-auto">
      {isLoading ? (
        <PaymentLoading />
      ) : error ? (
        <PaymentFailed errorMessage={error} />
      ) : paymentStatus === "pending" && formattedPaymentData ? (
        <PaymentCheckout
          paymentData={formattedPaymentData}
          onPaymentConfirm={handlePaymentConfirm}
        />
      ) : paymentStatus === "success" ? (
        <PaymentSuccess />
      ) : paymentStatus === "failed" ? (
        <PaymentFailed errorMessage={error || "Payment verification failed"} />
      ) : paymentStatus === "timeout" ? (
        <PaymentFailed errorMessage="Payment verification timed out after 30 minutes" />
      ) : (
        <PaymentFailed errorMessage="Something went wrong" />
      )}
    </div>
  );
}
