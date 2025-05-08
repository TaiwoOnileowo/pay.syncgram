import PaymentGateway from "@/components/CheckoutPage";
import PromoBanner from "@/components/PromoBanner";

const Page = async ({ params }: any) => {
  const { id } = await params;

  return (
    <>
      <PaymentGateway invoiceId={id} />
      <PromoBanner />
    </>
  );
};

export default Page;
