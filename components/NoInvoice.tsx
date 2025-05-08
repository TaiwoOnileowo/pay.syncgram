import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NoInvoice() {
  return (
    <Card className="shadow-xl border-0 p-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="py-4 bg-[#0075FF] text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-full">
            <Image src="/icon.png" alt="SyncGram" width={20} height={20} />
          </div>
          <CardTitle className="text-2xl font-bold poppins">
            Invoice Not Found
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-8 pb-6 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#1A1F37]/10 flex items-center justify-center mb-6">
          <AlertCircle className="h-8 w-8 text-[#5e19b3]" />
        </div>

        <h2 className="text-xl font-bold text-[#1A1F37] mb-2">
          Missing Invoice ID
        </h2>
        <p className="text-gray-600 text-center mb-6">
          No invoice ID was provided. Please check your payment link or contact
          support for assistance.
        </p>

        <div className="bg-[#1A1F37]/10 p-4 rounded-lg w-full mb-6">
          <h3 className="text-sm font-medium text-[#1A1F37] mb-1">
            What happened?
          </h3>
          <p className="text-sm text-gray-600">
            The payment link you're trying to access is incomplete or invalid.
            You need a valid invoice ID to proceed with payment.
          </p>
        </div>

        <Link href="https://sync-gram.com">
          <Button className=" bg-[#0075FF] hover:bg--[#0075FF]/90 gap-2">
            <Home className="h-4 w-4" />
            Go to Homepage
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
