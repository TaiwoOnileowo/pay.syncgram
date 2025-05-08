"use server";

import axios from "axios";

const backendUrl = process.env.BACKEND_URL;
const apiSecret = process.env.API_SECRET;
export const getCheckoutDetails = async (invoiceId: string) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/v1/invoices/${invoiceId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "api-secret": apiSecret,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch checkout details");
    }
  } catch (err) {
    console.error("Error fetching checkout details:", err);
    throw new Error("Error fetching checkout details");
  }
};
