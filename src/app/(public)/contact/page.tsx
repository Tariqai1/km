"use client";

import { MapPin, Phone, Mail, Clock, User } from "lucide-react";
import InquiryForm from "@/components/shared/InquiryForm";

export default function ContactPage() {
  return (
    <div className="bg-brand-light min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-dark mb-4">
            Get In Touch
          </h1>
          <div className="w-16 h-1 bg-brand-accent mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Whether you need a custom machinery quote or have questions about our products, our team is ready to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left: Company Info Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-brand-primary p-8 text-white">
              <h3 className="text-2xl font-bold font-display mb-2">K.M. Engineering Works</h3>
              <p className="text-brand-light/80">Precision-Engineered Food Processing Machinery</p>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-dark text-lg">Founder & MD</h4>
                  <p className="text-gray-600">Abdulkaleem Abdulkadar Sayyed</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-dark text-lg">Factory Address</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Gala No.58, Azmi Compound,<br/>
                    Near Kwality Bakery,<br/>
                    Mumbai - 400072, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-dark text-lg">Phone Numbers</h4>
                  <div className="flex flex-col gap-1 mt-1">
                    <a href="tel:+919876543210" className="text-gray-600 hover:text-brand-primary transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-dark text-lg">Email Address</h4>
                  <a href="mailto:info@kmengineering.com" className="text-gray-600 hover:text-brand-primary transition-colors">
                    info@kmengineering.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-dark text-lg">Business Hours</h4>
                  <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold font-display text-brand-dark mb-6">Send us a Message</h3>
            <InquiryForm />
          </div>

        </div>

      </div>

      {/* Full-width Map */}
      <div className="w-full h-[400px] md:h-[500px] bg-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0!2d72.9!3d19.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA2JzAwLjAiTiA3MsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="K.M. Engineering Works Location on Google Maps"
        ></iframe>
      </div>
    </div>
  );
}
