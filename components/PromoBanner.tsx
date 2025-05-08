import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <div className="w-full mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white/90 text-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">
            Need a Telegram group subscription solution?
          </p>
          <p className="text-white/70 text-xs mt-1">
            Manage members, payments, and access with ease.
          </p>
        </div>
        <Link
          href="https://sync-gram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#A384FF] hover:text-white transition-colors duration-200 text-xs font-medium"
        >
          Learn more <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
