import PaymentGateway from "@/components/CheckoutPage";
import PromoBanner from "@/components/PromoBanner";
import Image from "next/image";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <>
      <PaymentGateway invoiceId={id} />
      <PromoBanner />
    </>
  );
};

export default Page;
