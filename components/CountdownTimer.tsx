"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialTimeInSeconds: number;
  onExpire: () => void;
}

export default function CountdownTimer({
  initialTimeInSeconds,
  onExpire,
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTimeInSeconds);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onExpire]);

  const formatMessage = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    if (minutes >= 2) {
      return `Expiring in ${minutes} minutes`;
    } else if (minutes === 1) {
      return `Expiring in 1 minute${
        seconds > 0 ? ` and ${seconds} seconds` : ""
      }`;
    } else if (seconds > 30) {
      return `Expiring in ${seconds} seconds`;
    } else if (seconds > 0) {
      return `Expiring soon! ${seconds} seconds left`;
    } else {
      return "Payment expired";
    }
  };

  const getColorClass = () => {
    if (timeRemaining > 60) {
      return "text-[#5e19b3]";
    } else if (timeRemaining > 30) {
      return "text-[#A384FF]";
    } else {
      return "text-red-600 font-medium";
    }
  };

  return <p className={`text-sm mt-1 ${getColorClass()}`}>{formatMessage()}</p>;
}
