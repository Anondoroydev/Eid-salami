import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 p-8">
        <h1 className="text-4xl font-bold text-foreground">প্রোফাইল পাওয়া যায়নি</h1>
        <p className="text-muted-foreground">
          এই পেমেন্ট প্রোফাইলটি বিদ্যমান নেই বা মুছে ফেলা হয়েছে।
        </p>
        <Button asChild>
          <Link href="/">নিজের প্রোফাইল তৈরি করুন</Link>
        </Button>
      </div>
    </div>
  );
}
