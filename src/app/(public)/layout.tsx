import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import dbConnect from "@/lib/db";
import { Settings } from "@/models/Settings";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings: any = null;
  try {
    await dbConnect();
    settings = await Settings.findOne().lean();
  } catch (err) {
    console.error("Failed to fetch settings in public layout", err);
  }

  const companyName = settings?.companyName || "K.M. Engineering Works";
  const logoUrl = settings?.logoUrl || "";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar companyName={companyName} logoUrl={logoUrl} />
      <main className="flex-grow pt-[72px]">
        {children}
      </main>
      <WhatsAppCTA />
      <Footer companyName={companyName} settings={JSON.stringify(settings)} />
    </div>
  );
}
