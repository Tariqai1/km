import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FileText, ChevronRight, ShieldCheck, Truck, Wrench, PhoneCall } from "lucide-react";
import ImageGallery from "@/components/shared/ImageGallery";
import SpecTable from "@/components/shared/SpecTable";
import InquiryForm from "@/components/shared/InquiryForm";
import ProductCard from "@/components/shared/ProductCard";
import MachineReviews from "@/components/shared/MachineReviews";
import PdfBrochureButton from "@/components/shared/PdfBrochureButton";
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
    const product = await Product.findOne({ slug }).populate("category").lean() as any;
    if (!product) return null;

    const catName =
      typeof product.category === "object" && product.category !== null
        ? product.category.name
        : "Machinery";

    let specsObj: Record<string, string> = {};
    if (product.specifications) {
      if (product.specifications instanceof Map) {
        specsObj = Object.fromEntries(product.specifications);
      } else if (typeof product.specifications === "object") {
        specsObj = { ...product.specifications };
      }
    }

    const cleanImages = Array.isArray(product.images)
      ? product.images.map((img: any) => ({
          url: String(img?.url || ""),
          cloudinaryId: String(img?.cloudinaryId || ""),
        }))
      : [{ url: "/placeholder.jpg", cloudinaryId: "" }];

    return {
      title: String(product.title || ""),
      slug: String(product.slug || ""),
      categoryName: String(catName || ""),
      description: String(
        product.description ||
          "High performance industrial machinery manufactured with precision engineering."
      ),
      features: Array.isArray(product.features) ? product.features.map(String) : [],
      specifications: specsObj,
      images: cleanImages.length > 0 ? cleanImages : [{ url: "/placeholder.jpg", cloudinaryId: "" }],
      brochureUrl: String(product.brochureUrl || ""),
    };
  } catch (err) {
    console.error("Error fetching product data:", err);
    return null;
  }
};

// Enable ISR (Incremental Static Regeneration) - Cache for 60 seconds
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductData(resolvedParams.slug);
  if (!product) {
    return {
      title: "Product Not Found | K.M. Engineering Works",
    };
  }

  const cleanDescription = product.description
    ? product.description.replace(/<[^>]*>?/gm, "").slice(0, 160)
    : `High quality ${product.title} manufactured by K.M. Engineering Works with SS-304 food-grade stainless steel. Direct factory pricing in Mumbai.`;

  const imageUrl = product.images && product.images.length > 0 && !product.images[0].url.includes("placeholder")
    ? product.images[0].url
    : "https://km-inky.vercel.app/placeholder-product.jpg";

  return {
    title: `${product.title} Manufacturer | K.M. Engineering Works Mumbai`,
    description: cleanDescription,
    keywords: [
      product.title,
      `${product.title} manufacturer Mumbai`,
      `${product.title} price India`,
      `${product.categoryName} machine`,
      "K.M. Engineering Works",
      "food processing machinery"
    ],
    openGraph: {
      title: `${product.title} | K.M. Engineering Works`,
      description: cleanDescription,
      url: `https://km-inky.vercel.app/products/${product.slug}`,
      siteName: "K.M. Engineering Works",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | K.M. Engineering Works`,
      description: cleanDescription,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductData(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description.replace(/<[^>]*>?/gm, ""),
    brand: {
      "@type": "Brand",
      name: "K.M. Engineering Works",
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 bg-white py-2.5 px-4 rounded-xl border border-slate-200/60 shadow-xs w-fit">
          <Link href="/" className="hover:text-brand-primary font-medium">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <Link href="/products" className="hover:text-brand-primary font-medium">
            Products
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-brand-primary font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
          {/* Left Column: Image Gallery & Trust Features */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
              <ImageGallery images={product.images} />
            </div>

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
                  <div className="text-xs text-slate-500">Safe packaging and verified logistics delivery</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-brand-accent flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">1-Year Warranty & Service</div>
                  <div className="text-xs text-slate-500">Comprehensive warranty with full spare parts support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Quote Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Title & Badge Header Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-300 px-2.5 py-1 rounded">
                  {product.categoryName}
                </span>
                <span className="font-mono text-xs text-slate-500">
                  MODEL: KM-{product.slug.toUpperCase().slice(0, 8)}
                </span>
                <span className="font-mono text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded ml-auto">
                  SS-304 CERTIFIED
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                {product.title}
              </h1>

              {/* Action Buttons: Industrial Hierarchy */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <Button
                  asChild
                  size="default"
                  className="bg-[#162A45] hover:bg-[#0F1D30] text-white font-semibold px-5 h-10 rounded-lg shadow-2xs text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-[#162A45]"
                >
                  <a href="#quote-form">
                    <PhoneCall className="w-4 h-4 mr-1.5" /> Request Equipment BOM / Quote
                  </a>
                </Button>

                {/* Dynamic Tech Specs PDF Generator */}
                <PdfBrochureButton product={product} />

                {product.brochureUrl && (
                  <Button
                    asChild
                    variant="outline"
                    size="default"
                    className="border-slate-300 hover:bg-slate-50 font-medium h-10 text-xs sm:text-sm rounded-lg focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    <a href={product.brochureUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-1.5 text-slate-600" /> Download Brochure
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3.5">
              <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 pb-2 border-b border-slate-100">
                Machine Overview &amp; Description
              </h3>
              <div
                className="prose max-w-none text-slate-600 text-xs sm:text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            {/* Key Features & Benefits */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3.5">
                <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 pb-2 border-b border-slate-100">
                  Key Technical Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {product.features.map((feature: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications Table */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3.5">
                <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 pb-2 border-b border-slate-100">
                  Technical Specifications
                </h3>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <SpecTable specifications={product.specifications} />
                </div>
              </div>
            )}

            {/* Inquiry & Quote Form */}
            <div
              id="quote-form"
              className="bg-white p-5 sm:p-7 rounded-2xl border border-brand-primary/20 shadow-xs ring-1 ring-brand-primary/5"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-slate-900">
                    Request a Fast Quotation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill in your details below for factory direct pricing.
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <InquiryForm productId={product.slug} productName={product.title} />
              </div>
            </div>
          </div>
        </div>

        {/* Related Machinery Section */}
        <div className="border-t border-slate-200/80 pt-12 sm:pt-16 mb-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                Explore More Machinery
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                High precision equipment for industrial food &amp; bakery processing.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex border-slate-300">
              <Link href="/products">View All Machines</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
              product={{
                title: "Industrial Peeler Machine",
                slug: "industrial-peeler",
                category: product.categoryName || "Food Processing",
                images: [],
              }}
            />
            <ProductCard
              product={{
                title: "Fruit Pulper Machine",
                slug: "fruit-pulper",
                category: product.categoryName || "Food Processing",
                images: [],
              }}
            />
          </div>
        </div>

        {/* Verified Customer Reviews for Machinery */}
        <div className="mt-16">
          <MachineReviews />
        </div>
      </div>

      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </div>
  );
}