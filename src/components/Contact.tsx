import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';

// Retrieve EmailJS configuration from environment variables
const SERVICE_ID = (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY || '';

const isEmailJSConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Validate Email
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Handle Form Change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors on change
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle click-to-copy email
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('leo.baluyot.magdarag039@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Submit Handler using EmailJS with simulation fallback
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    const errors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      errors.name = 'Please tell me your name.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'An email address is required.';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please provide a valid email address.';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'Please input your message details.';
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('');
    
    try {
      if (isEmailJSConfigured) {
        // Send real email using EmailJS client-side SDK
        const templateParams = {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message,
          to_name: 'Leo Magdarag',
        };

        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Sandbox Simulation mode for immediate feedback in preview environments
        console.log('EmailJS variables not set in .env. Running sandbox high-fidelity local simulator.');
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err: any) {
      console.error('EmailJS transmission failed:', err);
      setStatusMessage(err?.text || err?.message || 'Transmission failed. Please use direct email copying instead!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      {/* Header Section */}
      <header className="text-center md:text-left space-y-4">
        <h1 className="font-headline-xl text-4xl md:text-5xl font-bold text-on-surface">
          Let's Connect
        </h1>
        <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Have an interesting project, internship, or technical challenge you'd like to discuss? Send an automated message or reach out directly.
        </p>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact info list card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-8 space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-6">
              <h3 className="font-headline-md text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-4">
                Contact Details
              </h3>

              <div className="space-y-6">
                {/* Email copier option */}
                <div className="space-y-2">
                  <h4 className="font-label-md text-xs uppercase tracking-wider text-on-surface-variant font-bold">Email</h4>
                  <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant/20 rounded p-3 text-sm font-code-sm text-primary break-all select-all">
                    <span>leo.baluyot.magdarag039@gmail.com</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="w-full inline-flex items-center justify-center gap-1.5 border border-outline-variant/30 hover:border-primary text-on-surface-variant hover:text-primary py-2 rounded text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    {copied ? 'Copied to Clipboard!' : 'Copy Email Address'}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 pt-2">
                  <span className="material-symbols-outlined text-primary-container p-2 bg-surface-container-low rounded border border-outline-variant/10">
                    location_on
                  </span>
                  <div>
                    <h4 className="font-label-md text-xs uppercase tracking-wider text-on-surface-variant font-bold">Location</h4>
                    <p className="font-body-md text-sm text-on-surface mt-1">
                      Manila, Philippines (GMT+8)
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container p-2 bg-surface-container-low rounded border border-outline-variant/10">
                    schedule
                  </span>
                  <div>
                    <h4 className="font-label-md text-xs uppercase tracking-wider text-on-surface-variant font-bold">Active Status</h4>
                    <p className="font-body-md text-sm text-on-surface mt-1 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block animate-pulse"></span>
                      Available for Internships &amp; Roles
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* EmailJS integration state badge indicator */}
            <div className="pt-6 border-t border-outline-variant/20 text-xs text-on-surface-variant space-y-1 bg-transparent">
              <span className="font-semibold block uppercase tracking-wider text-[10px] text-tertiary">
                Form Routing Channel:
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${isEmailJSConfigured ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></span>
                <span className="font-medium">
                  {isEmailJSConfigured ? 'Direct EmailJS Active' : 'High-Fidelity Sandbox Preview'}
                </span>
              </div>
              {!isEmailJSConfigured && (
                <p className="mt-2 text-[11px] leading-relaxed italic text-on-surface-variant/70">
                  Tip: Configure EmailJS keys in .env to send real messages straight to your inbox without any backend servers.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contact form card */}
        <div className="lg:col-span-8">
          <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-8 relative overflow-hidden h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-surface-container-low border text-on-surface px-4 py-3 rounded text-sm focus:outline-none focus:border-primary transition-all duration-300 ${
                          formErrors.name ? 'border-red-500' : 'border-outline-variant/40'
                        }`}
                        placeholder="John Doe"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-xs font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-surface-container-low border text-on-surface px-4 py-3 rounded text-sm focus:outline-none focus:border-primary transition-all duration-300 ${
                          formErrors.email ? 'border-red-500' : 'border-outline-variant/40'
                        }`}
                        placeholder="johndoe@example.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-xs font-medium">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border border-outline-variant/40 text-on-surface px-4 py-3 rounded text-sm focus:outline-none focus:border-primary transition-all duration-300"
                      placeholder="Collaboration opportunity / Internship inquiry"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-surface-container-low border text-on-surface px-4 py-3 rounded text-sm focus:outline-none focus:border-primary transition-all duration-300 resize-none ${
                        formErrors.message ? 'border-red-500' : 'border-outline-variant/40'
                      }`}
                      placeholder="Write your message details here..."
                    />
                    {formErrors.message && (
                      <p className="text-red-500 text-xs font-medium">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Status transmission error message */}
                  {statusMessage && (
                    <p className="text-red-500 text-xs font-semibold bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded">
                      {statusMessage}
                    </p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto bg-primary-container text-white px-8 py-3 rounded font-label-md text-sm font-semibold hover:bg-primary-container/80 transition-all duration-300 active:scale-95 shadow-md shadow-primary-container/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Transmitting Message...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm">send</span>
                          <span>
                            {isEmailJSConfigured ? 'Transmit message via EmailJS' : 'Send Message'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                    <span className="material-symbols-outlined text-3xl font-bold">check_circle</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline-md text-2xl font-bold text-on-surface">
                      Message Dispatched!
                    </h3>
                    <p className="font-body-md text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                      {isEmailJSConfigured 
                        ? "Thank you for reaching out! Your message was transmitted securely via EmailJS, and is headed straight to my inbox." 
                        : "Thank you for trying out the simulation! Once EmailJS credentials are fully defined in the system settings, this form transmits real-time messages directly without requiring any background servers."
                      }
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="border border-outline-variant/40 hover:border-primary-container text-on-surface-variant hover:text-primary px-6 py-2 rounded font-label-md text-xs font-semibold transition-colors cursor-pointer bg-transparent"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
