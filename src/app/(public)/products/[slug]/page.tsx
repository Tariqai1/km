import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FileText, ChevronRight, ShieldCheck, Truck, Wrench, PhoneCall } from "lucide-react";
import ImageGallery from "@/components/shared/ImageGallery";
import SpecTable from "@/components/shared/SpecTable";
import InquiryForm from "@/components/shared/InquiryForm";
import ProductCard from "@/components/shared/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import "@/models/Category";
import { notFound } from "next/navigation";

// Live Data fetching with fallback
const getProductData = async (slug: string) => {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug }).populate('category').lean() as any;
    if (!product) return null;

    const catName = typeof product.category === 'object' && product.category !== null
      ? product.category.name
      : "Machinery";

    let specsObj: Record<string, string> = {};
    if (product.specifications) {
      if (product.specifications instanceof Map) {
        specsObj = Object.fromEntries(product.specifications);
      } else if (typeof product.specifications === 'object') {
        specsObj = { ...product.specifications };
      }
    }

    const cleanImages = Array.isArray(product.images)
      ? product.images.map((img: any) => ({
          url: String(img?.url || ''),
          cloudinaryId: String(img?.cloudinaryId || ''),
        }))
      : [{ url: "/placeholder.jpg", cloudinaryId: "" }];

    return {
      title: String(product.title || ''),
      slug: String(product.slug || ''),
      categoryName: String(catName || ''),
      description: String(product.description || "High performance industrial machinery manufactured with precision engineering."),
      features: Array.isArray(product.features) ? product.features.map(String) : [],
      specifications: specsObj,
      images: cleanImages.length > 0 ? cleanImages : [{ url: "/placeholder.jpg", cloudinaryId: "" }],
      brochureUrl: String(product.brochureUrl || "")
    };
  } catch (err) {
    console.error("Error fetching product data:", err);
    return null;
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductData(resolvedParams.slug);
  if (!product) {
    return {
      title: "Product Not Found | K.M. Engineering Works"
    };
  }
  return {
    title: `${product.title} | K.M. Engineering Works`,
    description: `High quality ${product.title} manufactured by K.M. Engineering Works. Built for durability and efficiency.`
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductData(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 bg-white py-2.5 px-4 rounded-xl border border-slate-200/60 shadow-xs w-fit">
          <Link href="/" className="hover:text-brand-primary font-medium">Home</Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <Link href="/products" className="hover:text-brand-primary font-medium">Products</Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-brand-primary font-semibold truncate max-w-[200px] sm:max-w-none">{product.title}</span>
        </nav>

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
          
          {/* Left Column: Image Gallery & Trust Features (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Gallery Card */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
              <ImageGallery images={product.images} />
            </div>

            {/* Quality & Trust Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3.5">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Food Grade SS-304/316</div>
                  <div className="text-xs text-slate-500">Built with genuine certified stainless steel</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Pan-India Dispatch</div>
                  <div className="text-xs text-slate-500">Secure packaging & doorstep freight support</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-brand-accent flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">1 Year Warranty & Support</div>
                  <div className="text-xs text-slate-500">Technical guidance and spare parts availability</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Overview, Features, Specs & Quote (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Title & Header Section */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 border-none px-3.5 py-1 text-xs font-semibold rounded-full">
                  {product.categoryName}
                </Badge>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Customizable Capacity
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-brand-dark tracking-tight leading-snug">
                {product.title}
              </h1>

              {/* Description */}
              <div 
                className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm sm:text-base border-t border-slate-100 pt-4"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3.5 pt-2">
                <Button asChild size="lg" className="bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold shadow-md shadow-brand-accent/20">
                  <a href="#quote-form">Get Instant Quote</a>
                </Button>
                {product.brochureUrl && (
                  <Button asChild variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                    <a href={product.brochureUrl} target="_blank" rel="noreferrer">
                      <FileText className="w-4 h-4 mr-2 text-brand-primary" /> Download Brochure
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold font-display text-brand-dark mb-4 flex items-center gap-2">
                  Key Features & Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {product.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications Table */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold font-display text-brand-dark mb-4">
                  Technical Specifications
                </h3>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <SpecTable specifications={product.specifications} />
                </div>
              </div>
            )}

            {/* Inquiry & Quote Form */}
            <div id="quote-form" className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-primary/20 shadow-md ring-1 ring-brand-primary/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-brand-dark">Request a Fast Quotation</h3>
                  <p className="text-xs text-slate-500">Fill in your details below for factory direct pricing.</p>
                </div>
              </div>
              <div className="mt-6">
                <InquiryForm productId={product.slug} productName={product.title} />
              </div>
            </div>

          </div>
        </div>

        {/* Related Machinery Section */}
        <div className="border-t border-slate-200/80 pt-16 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-brand-dark">
                Explore More Machinery
              </h2>
              <p className="text-sm text-slate-500 mt-1">High precision equipment for industrial food & bakery processing.</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex border-slate-300">
              <Link href="/products">View All Machines</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard product={{
              title: "Industrial Peeler Machine",
              slug: "industrial-peeler",
              category: product.categoryName || "Food Processing",
              images: []
            }} />
            <ProductCard product={{
              title: "Fruit Pulper Machine",
              slug: "fruit-pulper",
              category: product.categoryName || "Food Processing",
              images: []
            }} />
          </div>
        </div>

      </div>

      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.title,
            "description": product.description.replace(/<[^>]*>?/gm, ''),
            "brand": {
              "@type": "Brand",
              "name": "K.M. Engineering Works"
            }
          })
        }}
      />
    </div>
  );
}
