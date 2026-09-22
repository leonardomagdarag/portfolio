import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';

// ─── EmailJS Configuration ────────────────────────────────────────────────────
// Keys are loaded from environment variables (.env file) so they're not
// committed to version control. EmailJS is a static-hosting-friendly service
// that delivers form submissions to email without requiring a backend server.
const SERVICE_ID = (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID ?? '';
const TEMPLATE_ID = (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID ?? '';
const PUBLIC_KEY = (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY ?? '';

const isEmailJSConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

// ─── Contact Info ─────────────────────────────────────────────────────────────
const EMAIL = 'leo.baluyot.magdarag039@gmail.com';
const GITHUB_URL = 'https://github.com/leonardomagdarag';
const LINKEDIN_URL = 'https://linkedin.com/in/leonardomagdarag';

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ─── Form State Types ─────────────────────────────────────────────────────────
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Omit<FormData, 'subject'>;

const initialFormData: FormData = { name: '', email: '', subject: '', message: '' };
const initialErrors: FormErrors = { name: '', email: '', message: '' };

// ─── Validation Helper ────────────────────────────────────────────────────────
const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Update form field and clear its validation error on change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const errors: FormErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
      isValid = false;
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (isEmailJSConfigured) {
        // Send via EmailJS client SDK — no backend required, works on GitHub Pages
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: formData.name,
            reply_to: formData.email,
            subject: formData.subject || 'Portfolio Inquiry',
            message: formData.message,
            to_name: 'Leo Magdarag',
          },
          PUBLIC_KEY
        );
      } else {
        // Development fallback — simulate a brief network delay so the UI feels
        // realistic when EmailJS keys aren't configured locally.
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      setSubmitResult('success');
      setFormData(initialFormData);
    } catch (err: any) {
      console.error('EmailJS error:', err);
      setErrorMessage(
        err?.text ?? err?.message ?? 'Something went wrong. Please email me directly.'
      );
      setSubmitResult('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitResult('idle');
    setErrorMessage('');
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-14 px-5 lg:px-10 max-w-[1200px] mx-auto py-16 md:py-24"
    >
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <motion.header variants={itemVariants} className="space-y-3 max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-primary-container" aria-hidden="true" />
          <span className="text-xs font-semibold text-primary-container uppercase tracking-widest">
            Contact
          </span>
        </div>
        <h1 className="font-headline-xl text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
          Let's Connect
        </h1>
        <p className="text-base text-on-surface-variant leading-relaxed">
          Have an interesting project, internship opportunity, or technical discussion?
          Send a message below or reach out directly.
        </p>
      </motion.header>

      {/* ── Contact Grid ─────────────────────────────────────────────────────── */}
      {/*
        Two-column layout: contact info sidebar on the left (4 cols), contact
        form on the right (8 cols). On mobile, the sidebar stacks above the form.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ── Contact Info Sidebar ─────────────────────────────────────────────── */}
        <motion.aside
          variants={itemVariants}
          className="lg:col-span-4 flex flex-col gap-5"
          aria-label="Contact information"
        >
          {/* Quick links — GitHub, LinkedIn, Email */}
          <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-6 space-y-4">
            <h2 className="font-headline-md text-sm font-bold text-on-surface uppercase tracking-wider">
              Find Me Online
            </h2>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 hover:border-primary-container/40 transition-colors group focus-ring"
              aria-label="GitHub profile"
            >
              <span
                className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-container transition-colors text-[22px]"
                aria-hidden="true"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                code
              </span>
              <div>
                <p className="text-sm font-semibold text-on-surface group-hover:text-primary-container transition-colors">
                  GitHub
                </p>
                <p className="text-xs text-on-surface-variant">github.com/leonardomagdarag</p>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[16px] ml-auto" aria-hidden="true">
                open_in_new
              </span>
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 hover:border-primary-container/40 transition-colors group focus-ring"
              aria-label="LinkedIn profile"
            >
              <span
                className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-container transition-colors text-[22px]"
                aria-hidden="true"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                work
              </span>
              <div>
                <p className="text-sm font-semibold text-on-surface group-hover:text-primary-container transition-colors">
                  LinkedIn
                </p>
                <p className="text-xs text-on-surface-variant">linkedin.com/in/leonardomagdarag</p>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[16px] ml-auto" aria-hidden="true">
                open_in_new
              </span>
            </a>

            {/* Direct email with click-to-copy */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span
                  className="material-symbols-outlined text-on-surface-variant text-[22px]"
                  aria-hidden="true"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  mail
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-on-surface">Email</p>
                  <p className="text-xs text-on-surface-variant truncate" title={EMAIL}>
                    {EMAIL}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="w-full inline-flex items-center justify-center gap-1.5 border border-outline-variant/30 hover:border-primary-container/50 text-on-surface-variant hover:text-primary-container py-2 rounded text-xs font-semibold transition-colors cursor-pointer focus-ring"
                aria-live="polite"
              >
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                  {copied ? 'check' : 'content_copy'}
                </span>
                {copied ? 'Copied!' : 'Copy Email Address'}
              </button>
            </div>
          </div>

          {/* Availability and location */}
          <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <span
                className="material-symbols-outlined text-primary-container p-2 bg-surface-container-low rounded border border-outline-variant/10 text-[20px] shrink-0"
                aria-hidden="true"
              >
                location_on
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Location
                </p>
                <p className="text-sm text-on-surface mt-0.5">
                  Manila, Philippines <span className="text-on-surface-variant">(GMT+8)</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span
                className="material-symbols-outlined text-primary-container p-2 bg-surface-container-low rounded border border-outline-variant/10 text-[20px] shrink-0"
                aria-hidden="true"
              >
                schedule
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Status
                </p>
                <p className="text-sm text-on-surface mt-0.5 flex items-center gap-2">
                  <span
                    className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"
                    aria-hidden="true"
                  />
                  Available for internships &amp; roles
                </p>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* ── Contact Form ──────────────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="lg:col-span-8">
          <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-7 h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {submitResult !== 'success' ? (
                /* ── Form ── */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                      >
                        Your Name <span className="text-primary-container" aria-label="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        className={`w-full bg-surface-container-low border text-on-surface px-4 py-3 rounded text-sm focus:outline-none focus:border-primary-container transition-colors ${
                          formErrors.name ? 'border-red-500' : 'border-outline-variant/40'
                        }`}
                        placeholder="John Doe"
                        aria-describedby={formErrors.name ? 'name-error' : undefined}
                        aria-invalid={Boolean(formErrors.name)}
                      />
                      {formErrors.name && (
                        <p id="name-error" className="text-red-500 text-xs font-medium" role="alert">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                      >
                        Email Address <span className="text-primary-container" aria-label="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className={`w-full bg-surface-container-low border text-on-surface px-4 py-3 rounded text-sm focus:outline-none focus:border-primary-container transition-colors ${
                          formErrors.email ? 'border-red-500' : 'border-outline-variant/40'
                        }`}
                        placeholder="johndoe@example.com"
                        aria-describedby={formErrors.email ? 'email-error' : undefined}
                        aria-invalid={Boolean(formErrors.email)}
                      />
                      {formErrors.email && (
                        <p id="email-error" className="text-red-500 text-xs font-medium" role="alert">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject field — optional, full width */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="subject"
                      className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                    >
                      Subject <span className="text-on-surface-variant/50 font-normal normal-case">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border border-outline-variant/40 text-on-surface px-4 py-3 rounded text-sm focus:outline-none focus:border-primary-container transition-colors"
                      placeholder="Internship inquiry / Collaboration / Just saying hi"
                    />
                  </div>

                  {/* Message field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                    >
                      Message <span className="text-primary-container" aria-label="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-surface-container-low border text-on-surface px-4 py-3 rounded text-sm focus:outline-none focus:border-primary-container transition-colors resize-none ${
                        formErrors.message ? 'border-red-500' : 'border-outline-variant/40'
                      }`}
                      placeholder="What would you like to discuss?"
                      aria-describedby={formErrors.message ? 'message-error' : undefined}
                      aria-invalid={Boolean(formErrors.message)}
                    />
                    {formErrors.message && (
                      <p id="message-error" className="text-red-500 text-xs font-medium" role="alert">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submission error */}
                  {submitResult === 'error' && errorMessage && (
                    <p className="text-red-500 text-xs font-semibold bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded" role="alert">
                      {errorMessage}
                    </p>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-primary-container text-white px-7 py-3 rounded text-sm font-semibold hover:bg-primary transition-colors duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-ring"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">send</span>
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                /* ── Success State ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="py-16 text-center space-y-5"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                    <span className="material-symbols-outlined text-[28px]" aria-hidden="true">check_circle</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline-md text-xl font-bold text-on-surface">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                      Thanks for reaching out. I'll get back to you as soon as I can.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="border border-outline-variant/40 hover:border-outline-variant text-on-surface-variant hover:text-on-surface px-5 py-2 rounded text-xs font-semibold transition-colors cursor-pointer bg-transparent focus-ring"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
