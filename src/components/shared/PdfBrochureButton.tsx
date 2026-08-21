"use client";

import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PdfBrochureButtonProps {
  product: {
    title: string;
    slug: string;
    categoryName?: string;
    description?: string;
    features?: string[];
    specifications?: Record<string, string>;
    images?: { url: string }[];
  };
}

export default function PdfBrochureButton({ product }: PdfBrochureButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAndDownloadPdf = () => {
    setIsGenerating(true);

    try {
      const docCode = `KM-SPEC-${product.slug.toUpperCase().slice(0, 8)}-${new Date().getFullYear()}`;
      const generatedDate = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      // User Specs & Merged Baseline
      const userSpecs = product.specifications && Object.keys(product.specifications).length > 0
        ? Object.entries(product.specifications)
        : [];

      const defaultBaseline: [string, string][] = [
        ["Contact Metallurgy", "Certified Food-Grade SS-304 / SS-316 Stainless Steel"],
        ["Drive Mechanism", "Heavy-Duty Copper Wound Induction Motor with Gearbox"],
        ["Electrical Supply", "415V 3-Phase / 230V 1-Phase, 50Hz"],
        ["Structural Chassis", "Heavy Cast Vibration-Damping Rigid Industrial Frame"],
        ["Operational Rating", "Continuous 12 to 16 Hours Industrial Duty Cycle"],
        ["Safety Systems", "Emergency Stop Push-Button & Thermal Overload Protection"],
        ["Warranty & Spares", "1-Year On-Site Comprehensive Warranty on Motor & Drives"],
      ];

      const mergedSpecsMap = new Map<string, string>();
      userSpecs.forEach(([k, v]) => {
        if (k && v && v !== "test") mergedSpecsMap.set(k.trim(), v.trim());
      });
      defaultBaseline.forEach(([k, v]) => {
        if (!mergedSpecsMap.has(k)) mergedSpecsMap.set(k, v);
      });

      const specRowsHtml = Array.from(mergedSpecsMap.entries())
        .map(
          ([key, val], idx) => `
          <tr style="background: ${idx % 2 === 0 ? "#ffffff" : "#f1f5f9"}; border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 9px 14px; font-weight: 700; color: #0f172a; font-size: 11.5px; width: 38%; border-right: 1px solid #e2e8f0;">
              ${key}
            </td>
            <td style="padding: 9px 14px; color: #334155; font-size: 11.5px; font-weight: 600;">
              ${val}
            </td>
          </tr>
        `
        )
        .join("");

      const cleanFeatures = product.features && product.features.length > 0 && product.features.some(f => f && !f.startsWith("test"))
        ? product.features.filter(f => f && f.trim().length > 0)
        : [
            "100% Certified Food-Grade SS-304 product contact surfaces for hygienic processing",
            "Dynamically balanced rotary assembly ensuring whisper-quiet and zero-vibration operation",
            "Heavy cast iron foundation engineered for high load and continuous industrial endurance",
            "Easy CIP (Clean-In-Place) washdown design with smooth sanitizable weld seams",
            "Precision transmission gearbox delivering maximum torque with minimal power consumption",
            "Comprehensive 100% pre-dispatch factory trial and quality inspection before shipping"
          ];

      const featureCardsHtml = cleanFeatures
        .map(
          (f) => `
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #E8590C; border-radius: 8px; padding: 8px 12px; display: flex; align-items: flex-start; gap: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
            <span style="color: #16a34a; font-weight: 900; font-size: 14px; line-height: 1;">✓</span>
            <span style="font-size: 11px; color: #1e293b; font-weight: 500; line-height: 1.35;">${f}</span>
          </div>
        `
        )
        .join("");

      const imageUrl = product.images && product.images.length > 0 && !product.images[0].url.includes("placeholder")
        ? product.images[0].url
        : "https://km-inky.vercel.app/placeholder-product.jpg";

      const cleanDesc = product.description && product.description.replace(/<[^>]*>?/gm, "").trim().length > 10 && !product.description.includes("test")
        ? product.description.replace(/<[^>]*>?/gm, "").slice(0, 240) + "..."
        : `Precision-engineered ${product.title} manufactured by K.M. Engineering Works. Built with food-grade SS-304 stainless steel, high-efficiency motor drive, and heavy vibration-damping foundation for maximum operational productivity.`;

      const htmlDocument = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <title>${product.title} - Technical Data Sheet | K.M. Engineering Works</title>
          <meta charset="utf-8" />
          <style>
            @page {
              size: A4 portrait;
              margin: 0;
            }
            * {
              box-sizing: border-box;
            }
            body {
              font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
              color: #0f172a;
              margin: 0;
              padding: 0;
              background: #f8fafc;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .page-container {
              padding: 12mm 15mm 12mm 15mm;
              background: #f8fafc;
              min-height: 297mm;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            
            /* Premium Banner Header */
            .header-banner {
              background: linear-gradient(135deg, #0a192f 0%, #1B365D 65%, #0f2b48 100%);
              color: #ffffff;
              border-radius: 12px;
              padding: 16px 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              box-shadow: 0 4px 12px rgba(11, 30, 54, 0.15);
              border-bottom: 4px solid #E8590C;
              margin-bottom: 14px;
            }
            .brand-group h1 {
              font-size: 23px;
              font-weight: 900;
              margin: 0;
              letter-spacing: 0.5px;
              color: #ffffff;
              text-transform: uppercase;
            }
            .brand-group p {
              font-size: 10px;
              font-weight: 600;
              color: #94a3b8;
              margin: 3px 0 0 0;
              letter-spacing: 0.8px;
              text-transform: uppercase;
            }
            .header-right {
              text-align: right;
            }
            .tag-pill {
              background: #E8590C;
              color: #ffffff;
              font-size: 10px;
              font-weight: 800;
              text-transform: uppercase;
              padding: 5px 12px;
              border-radius: 6px;
              display: inline-block;
              letter-spacing: 0.5px;
              box-shadow: 0 2px 6px rgba(232, 89, 12, 0.3);
            }
            .doc-meta {
              font-size: 9.5px;
              color: #cbd5e1;
              margin-top: 4px;
              font-family: monospace;
              font-weight: 700;
            }

            /* Product Showcase Hero */
            .hero-card {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 14px 18px;
              display: flex;
              gap: 18px;
              align-items: center;
              margin-bottom: 14px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.03);
            }
            .img-frame {
              width: 155px;
              height: 155px;
              background: linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%);
              border: 2px solid #e2e8f0;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              flex-shrink: 0;
              padding: 8px;
              box-shadow: inset 0 2px 4px rgba(0,0,0,0.04);
            }
            .img-frame img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }
            .hero-content {
              flex: 1;
            }
            .category-badge {
              background: #eff6ff;
              color: #1d4ed8;
              border: 1px solid #bfdbfe;
              font-size: 9.5px;
              font-weight: 800;
              padding: 3px 10px;
              border-radius: 999px;
              display: inline-block;
              margin-bottom: 6px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .product-name {
              font-size: 20px;
              font-weight: 900;
              color: #0f172a;
              margin: 0 0 5px 0;
              line-height: 1.2;
            }
            .product-summary {
              font-size: 11px;
              color: #475569;
              line-height: 1.45;
              margin-bottom: 10px;
            }
            .pills-grid {
              display: flex;
              gap: 6px;
              flex-wrap: wrap;
            }
            .feature-pill {
              font-size: 9.5px;
              font-weight: 700;
              background: #f1f5f9;
              border: 1px solid #cbd5e1;
              color: #1e293b;
              padding: 3px 8px;
              border-radius: 6px;
            }

            /* Section Headers with Accent Line */
            .section-bar {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin: 12px 0 8px 0;
              padding-bottom: 4px;
              border-bottom: 2px solid #1B365D;
            }
            .section-bar-title {
              font-size: 12px;
              font-weight: 900;
              color: #1B365D;
              text-transform: uppercase;
              letter-spacing: 0.6px;
              display: flex;
              align-items: center;
              gap: 6px;
            }
            .section-bar-sub {
              font-size: 9.5px;
              font-weight: 700;
              color: #E8590C;
              text-transform: uppercase;
            }

            /* Specs Table */
            .specs-box {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 1px 4px rgba(0,0,0,0.03);
            }
            .specs-table {
              width: 100%;
              border-collapse: collapse;
            }

            /* Features Grid */
            .features-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px;
            }

            /* 4-Pillar Trust Banner */
            .trust-banner {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 8px;
              margin-top: 12px;
            }
            .trust-card {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-top: 3px solid #1B365D;
              border-radius: 8px;
              padding: 8px 6px;
              text-align: center;
              box-shadow: 0 1px 3px rgba(0,0,0,0.03);
            }
            .trust-title {
              font-size: 10px;
              font-weight: 800;
              color: #1B365D;
              margin-bottom: 1px;
            }
            .trust-desc {
              font-size: 8.5px;
              color: #64748b;
              font-weight: 600;
            }

            /* Footer Corporate Block */
            .footer-block {
              background: #0a192f;
              color: #ffffff;
              border-radius: 10px;
              padding: 12px 18px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 14px;
              font-size: 9.5px;
              border-top: 3px solid #E8590C;
            }
            .footer-left {
              line-height: 1.45;
              color: #cbd5e1;
            }
            .footer-left strong {
              color: #ffffff;
              font-size: 10px;
            }
            .footer-right {
              text-align: right;
              line-height: 1.45;
              color: #cbd5e1;
            }
            .footer-right strong {
              color: #ffffff;
              font-size: 10px;
            }
            .hotline-highlight {
              color: #38bdf8;
              font-weight: 800;
            }

            /* Floating Print Action */
            .print-btn-float {
              position: fixed;
              bottom: 20px;
              right: 20px;
              background: #E8590C;
              color: #ffffff;
              padding: 10px 22px;
              border-radius: 999px;
              font-weight: 800;
              font-size: 13px;
              cursor: pointer;
              box-shadow: 0 6px 20px rgba(232, 89, 12, 0.4);
              z-index: 9999;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            @media print {
              .print-btn-float {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          
          <div class="print-btn-float" onclick="window.print()">
            🖨️ Click to Print / Save as PDF
          </div>

          <div class="page-container">
            
            <div>
              <!-- 1. Deep Blue Corporate Header -->
              <div class="header-banner">
                <div class="brand-group">
                  <h1>K.M. ENGINEERING WORKS</h1>
                  <p>Industrial Food Processing & Bakery Machinery Specialist • Mumbai, India</p>
                </div>
                <div class="header-right">
                  <div class="tag-pill">Technical Data Sheet</div>
                  <div class="doc-meta">${docCode}</div>
                </div>
              </div>

              <!-- 2. Product Showcase Card -->
              <div class="hero-card">
                <div class="img-frame">
                  <img 
                    src="${imageUrl}" 
                    alt="${product.title}" 
                    onerror="this.src='https://km-inky.vercel.app/placeholder-product.jpg'" 
                  />
                </div>
                <div class="hero-content">
                  <div class="category-badge">${product.categoryName || "Commercial Machinery"}</div>
                  <div class="product-name">${product.title}</div>
                  <div class="product-summary">${cleanDesc}</div>
                  
                  <div class="pills-grid">
                    <div class="feature-pill">🛡️ 100% SS-304 Food Grade</div>
                    <div class="feature-pill">⚡ 1-Year Comprehensive Warranty</div>
                    <div class="feature-pill">🇮🇳 Made in Mumbai Works</div>
                    <div class="feature-pill">⚙️ Continuous Heavy Duty Rating</div>
                  </div>
                </div>
              </div>

              <!-- 3. Technical Specifications Matrix -->
              <div class="section-bar">
                <div class="section-bar-title">
                  <span>1. Verified Technical Specifications</span>
                </div>
                <div class="section-bar-sub">Standard & Custom Configurations</div>
              </div>
              <div class="specs-box">
                <table class="specs-table">
                  <tbody>
                    ${specRowsHtml}
                  </tbody>
                </table>
              </div>

              <!-- 4. Key Engineering Highlights -->
              <div class="section-bar">
                <div class="section-bar-title">
                  <span>2. Engineering & Metallurgy Highlights</span>
                </div>
                <div class="section-bar-sub">ISO 9001:2015 Standards</div>
              </div>
              <div class="features-grid">
                ${featureCardsHtml}
              </div>

              <!-- 5. 4 Trust Pillars -->
              <div class="trust-banner">
                <div class="trust-card">
                  <div class="trust-title">100% SS-304 Grade</div>
                  <div class="trust-desc">Certified Food-Contact</div>
                </div>
                <div class="trust-card">
                  <div class="trust-title">Zero Vibration Base</div>
                  <div class="trust-desc">Rigid Cast Iron Chasis</div>
                </div>
                <div class="trust-card">
                  <div class="trust-title">Pre-Dispatch Trial</div>
                  <div class="trust-desc">Live Factory Video Test</div>
                </div>
                <div class="trust-card">
                  <div class="trust-title">Pan-India Support</div>
                  <div class="trust-desc">On-Site Spares & Tech</div>
                </div>
              </div>
            </div>

            <!-- 6. Executive Corporate Footer -->
            <div class="footer-block">
              <div class="footer-left">
                <strong>Manufacturing Works:</strong> Gala No.58, Azmi Compound, Near Kwality Bakery, Mumbai - 400072<br />
                <strong>Sales Hotline:</strong> <span class="hotline-highlight">+91 98765 43210</span> / +91 98765 43211 | <strong>Email:</strong> info@kmengineering.com
              </div>
              <div class="footer-right">
                <strong>Managing Director:</strong> Abdulkaleem Abdulkadar Sayyed<br />
                <strong>Official Portal:</strong> www.kmengineering.com | <strong>Date:</strong> ${generatedDate}
              </div>
            </div>

          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 250);
            };
          </script>
        </body>
        </html>
      `;

      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(htmlDocument);
        printWindow.document.close();
      } else {
        alert("Please allow popups to open and print your Tech Specs PDF.");
      }
    } catch (err) {
      console.error("Failed to generate PDF brochure:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={generateAndDownloadPdf}
      disabled={isGenerating}
      variant="outline"
      size="lg"
      className="border-slate-300 hover:bg-slate-50 font-semibold text-slate-700 shadow-xs h-11 px-5 rounded-xl transition-all"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin text-brand-primary" /> Building PDF...
        </>
      ) : (
        <>
          <FileDown className="w-4 h-4 mr-2 text-brand-primary" /> Download Tech Specs PDF
        </>
      )}
    </Button>
  );
}
