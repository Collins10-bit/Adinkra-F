import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Navigation,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Clock,
} from 'lucide-react';
import type { ContactFormData, ContactFormErrors, EnquiryType } from '../types.ts';
import { FarmMap } from './FarmMap.tsx';

interface ContactSectionProps {
  initialEnquiryType?: EnquiryType;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialEnquiryType = 'General Enquiry',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    telephone: '',
    email: '',
    subject: '',
    enquiryType: initialEnquiryType,
    message: '',
    consent: false,
    honeypot: '', // Hidden honeypot field to trap automated spambots
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Update enquiry type if initialEnquiryType changes from props
  useEffect(() => {
    if (initialEnquiryType) {
      setFormData((prev) => ({ ...prev, enquiryType: initialEnquiryType }));
    }
  }, [initialEnquiryType]);

  const enquiryOptions: EnquiryType[] = [
    'Egg Order',
    'Bulk Supply',
    'Poultry Products',
    'Farm Supply',
    'General Enquiry',
    'Partnership',
    'Other',
  ];

  // Client-side validation
  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name';
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Telephone number is required';
    } else {
      // Clean digits & check minimum length (allowing Ghana formats e.g. 0244902287, +233244902287)
      const cleanPhone = formData.telephone.replace(/[^\d+]/g, '');
      if (cleanPhone.length < 9) {
        newErrors.telephone = 'Please enter a valid telephone number (minimum 9 digits)';
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to the privacy policy to submit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Honeypot check (if filled by bot, silently reject or abort)
    if (formData.honeypot) {
      // Treat as fake bot submission
      setSubmitSuccess(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const formspreeEndpoint =
      import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xzezjojd';

    try {
      let delivered = false;

      // 1. Submit directly to Formspree endpoint
      try {
        const fsResponse = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.fullName.trim(),
            fullName: formData.fullName.trim(),
            telephone: formData.telephone.trim(),
            email: formData.email.trim(),
            _replyto: formData.email.trim(),
            subject: formData.subject.trim(),
            enquiryType: formData.enquiryType,
            message: formData.message.trim(),
            _subject: `[${formData.enquiryType}] ${formData.subject.trim()} - from ${formData.fullName.trim()}`,
            _gotcha: formData.honeypot || '',
          }),
        });

        if (fsResponse.ok) {
          delivered = true;
        }
      } catch (fsErr) {
        console.warn('Direct Formspree submission failed, attempting backend relay route:', fsErr);
      }

      // 2. If client direct submission did not deliver, use backend route as fallback
      if (!delivered) {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            telephone: formData.telephone.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            enquiryType: formData.enquiryType,
            message: formData.message.trim(),
            consent: formData.consent,
            honeypot: formData.honeypot,
            submittedAt: new Date().toISOString(),
          }),
        });

        const result = await response.json();
        if (response.ok && result.success) {
          delivered = true;
        } else {
          setServerError(
            result.message ||
              'We were unable to deliver your message. Please verify your details or contact us directly on WhatsApp at +233 24 490 2287.'
          );
          return;
        }
      }

      if (delivered) {
        setSubmitSuccess(true);
        // Reset form data on success
        setFormData({
          fullName: '',
          telephone: '',
          email: '',
          subject: '',
          enquiryType: 'General Enquiry',
          message: '',
          consent: false,
          honeypot: '',
        });
        setErrors({});
      }
    } catch {
      // Network or parsing failure
      setServerError(
        'A network connection error occurred while submitting your message. Your information has been preserved. Please try again or reach us on WhatsApp at +233 24 490 2287.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#0738A6] uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B66] mt-2 tracking-tight">
            Contact Adinkra Frontiers Ltd
          </h2>
          <p className="text-base sm:text-lg text-[#172033]/80 mt-3 leading-relaxed">
            Reach out for table egg orders, bulk commercial deliveries, poultry inquiries, or visit our farm facility in Ghana.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Information & Action Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#082B66]">Farm Office &amp; Orders</h3>
              <p className="text-sm text-[#172033]/80 mt-2 leading-relaxed">
                Our farm and office are located at Sanfo/Aduam, behind Manale Rest Stop. You can reach our management team directly through the channels below.
              </p>

              {/* Contact Details List */}
              <div className="mt-8 space-y-6">
                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#FFF8ED] text-[#0738A6] border border-[#0738A6]/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Telephone
                    </span>
                    <p className="text-base font-bold text-[#082B66]">
                      <a href="tel:+233244902287" className="hover:text-[#0738A6] transition-colors">
                        +233 24 490 2287
                      </a>
                    </p>
                    <span className="text-xs text-slate-500">Available Monday – Saturday</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#FFF8ED] text-[#0738A6] border border-[#0738A6]/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Official Email
                    </span>
                    <p className="text-base font-bold text-[#082B66]">
                      <a href="mailto:info@adinkra.biz" className="hover:text-[#0738A6] transition-colors">
                        info@adinkra.biz
                      </a>
                    </p>
                    <span className="text-xs text-slate-500">Direct business inquiries &amp; proposals</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#FFF8ED] text-[#0738A6] border border-[#0738A6]/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#F5A300]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Farm Location
                    </span>
                    <p className="text-base font-bold text-[#082B66]">
                      Sanfo/Aduam, Behind Manale Rest Stop, Ghana
                    </p>
                    <span className="text-xs text-slate-500">Direct farm pickups by arrangement</span>
                  </div>
                </div>
              </div>

              {/* 4 Required Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <span className="text-xs font-bold text-[#082B66] uppercase tracking-wider block mb-3">
                  Quick Actions
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {/* Call Now */}
                  <a
                    href="tel:+233244902287"
                    className="inline-flex items-center justify-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold text-[#082B66] bg-[#FFF8ED] hover:bg-[#0738A6] hover:text-white border border-[#0738A6]/20 rounded-xl transition-all shadow-xs"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>Call Now</span>
                  </a>

                  {/* Send Email */}
                  <a
                    href="mailto:info@adinkra.biz"
                    className="inline-flex items-center justify-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold text-[#082B66] bg-[#FFF8ED] hover:bg-[#0738A6] hover:text-white border border-[#0738A6]/20 rounded-xl transition-all shadow-xs"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>Send Email</span>
                  </a>

                  {/* WhatsApp Us */}
                  <a
                    href="https://wa.me/233244902287"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-xl transition-all shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>WhatsApp Us</span>
                  </a>

                  {/* Get Directions (Google Maps search link without fake GPS) */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Sanfo%2FAduam%2C+Behind+Manale+Rest+Stop%2C+Ghana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold text-[#082B66] bg-slate-100 hover:bg-slate-200 rounded-xl transition-all shadow-xs"
                  >
                    <Navigation className="w-4 h-4 shrink-0 text-[#0738A6]" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Times Note */}
            <div className="bg-[#FFF8ED] p-4 rounded-xl border border-[#F5A300]/25 text-xs text-[#082B66]">
              <div className="flex items-center gap-2 font-bold mb-1">
                <Clock className="w-4 h-4 text-[#F5A300]" />
                <span>Farm Operations &amp; Dispatches</span>
              </div>
              <p className="text-slate-600">
                Fresh egg orders are packed and dispatched in sequence. Bulk orders should be placed 24–48 hours ahead for planned distribution.
              </p>
            </div>
          </div>

          {/* Right Column: Secure Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-lg relative">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#082B66]">Send Us a Message</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill out the form below. Messages are delivered directly to{' '}
                  <span className="font-semibold text-[#0738A6]">info@adinkra.biz</span>.
                </p>
              </div>

              {/* Success Notification */}
              {submitSuccess && (
                <div
                  className="mb-6 p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 animate-in fade-in duration-300"
                  role="alert"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-emerald-900">Message Delivered</h4>
                    <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                      Thank you for contacting Adinkra Frontiers Ltd. Your message has been sent successfully. We will respond as soon as possible.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-3 text-xs font-bold text-emerald-700 underline hover:text-emerald-900"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {serverError && (
                <div
                  className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 animate-in fade-in duration-300"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <h4 className="font-bold text-rose-900">Submission Notice</h4>
                    <p className="mt-0.5 text-rose-800">{serverError}</p>
                  </div>
                </div>
              )}

              <form
                action="https://formspree.io/f/xzezjojd"
                method="POST"
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4"
              >
                {/* Honeypot & Formspree hidden fields for spam protection & routing */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_check_field">Do not fill this field</label>
                  <input
                    type="text"
                    id="website_check_field"
                    name="_gotcha"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <input type="hidden" name="_replyto" value={formData.email} />
                  <input
                    type="hidden"
                    name="_subject"
                    value={`[${formData.enquiryType}] ${formData.subject || 'Website Enquiry'} - from ${formData.fullName}`}
                  />
                </div>

                {/* Row 1: Full Name & Telephone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold text-[#082B66] uppercase tracking-wider mb-1.5"
                    >
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      placeholder="e.g. Kwaku Mensah"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#172033] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0738A6] transition-all ${
                        errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Telephone Number */}
                  <div>
                    <label
                      htmlFor="telephone"
                      className="block text-xs font-bold text-[#082B66] uppercase tracking-wider mb-1.5"
                    >
                      Telephone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      required
                      value={formData.telephone}
                      onChange={(e) => {
                        setFormData({ ...formData, telephone: e.target.value });
                        if (errors.telephone) setErrors({ ...errors, telephone: undefined });
                      }}
                      placeholder="e.g. +233 24 490 2287"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#172033] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0738A6] transition-all ${
                        errors.telephone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.telephone && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.telephone}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email & Enquiry Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-[#082B66] uppercase tracking-wider mb-1.5"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="e.g. kwaku@example.com"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#172033] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0738A6] transition-all ${
                        errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Enquiry Type Dropdown */}
                  <div>
                    <label
                      htmlFor="enquiryType"
                      className="block text-xs font-bold text-[#082B66] uppercase tracking-wider mb-1.5"
                    >
                      Enquiry Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={(e) =>
                        setFormData({ ...formData, enquiryType: e.target.value as EnquiryType })
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0738A6] transition-all"
                    >
                      {enquiryOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-bold text-[#082B66] uppercase tracking-wider mb-1.5"
                  >
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: undefined });
                    }}
                    placeholder="e.g. Weekly egg delivery order for retail shop"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#172033] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0738A6] transition-all ${
                      errors.subject ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-[#082B66] uppercase tracking-wider mb-1.5"
                  >
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Provide details about your required egg quantities, frequency, delivery location, or specific questions..."
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#172033] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0738A6] transition-all resize-y ${
                      errors.message ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">{errors.message}</p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={(e) => {
                        setFormData({ ...formData, consent: e.target.checked });
                        if (errors.consent) setErrors({ ...errors, consent: undefined });
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0738A6] focus:ring-[#0738A6]"
                    />
                    <span className="text-xs text-[#172033]/80 leading-normal">
                      I consent to Adinkra Frontiers Ltd processing my contact information to respond directly to this enquiry regarding poultry and egg supply.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">{errors.consent}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#0738A6] hover:bg-[#082B66] active:scale-[0.99] disabled:opacity-60 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Interactive Google Map of Farm Facility */}
        <div id="map" className="mt-14 pt-8 border-t border-slate-100">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold tracking-widest text-[#0738A6] uppercase">
              Location &amp; Directions
            </span>
            <h3 className="text-2xl font-bold text-[#082B66] mt-1">
              Find Our Farm on Google Maps
            </h3>
            <p className="text-sm text-[#172033]/80 mt-1">
              Located at Sanfo/Aduam, behind Manale Rest Stop, Ghana. Interactive navigation and route planning for visitors, logistics drivers, and commercial buyers.
            </p>
          </div>
          <FarmMap />
        </div>
      </div>
    </section>
  );
};
