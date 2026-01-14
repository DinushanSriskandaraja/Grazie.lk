
import { Metadata } from 'next';
import Link from 'next/link';
import {
    ShieldCheck,
    Eye,
    FileText,
    Lock,
    Cookie,
    Scale,
    Link as LinkIcon,
    RefreshCcw,
    Mail,
    Phone,
    Globe
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Privacy Policy | Grazie.lk',
    description: 'Privacy Policy for Grazie.lk - Learn how we collect, use, and protect your information.',
};

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-soft py-16 md:py-24 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <span className="text-gold text-sm tracking-[0.2em] uppercase font-semibold mb-3 block">
                        Transparency & Trust
                    </span>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-dark mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-accent text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Your privacy is at the heart of what we do. Learn how we respect, protect, and handle your personal information.
                    </p>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-gold/5 rounded-full blur-3xl"></div>
                <div className="absolute top-10 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl"></div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-6 md:px-12 lg:px-20 py-16">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* Introduction */}
                    <div className="prose prose-lg text-accent/80 text-justify md:text-left leading-relaxed">
                        <p>
                            Welcome to <strong>Grazie.lk</strong>. Your privacy is very important to us. This Privacy Policy explains how we collect, use, protect, and disclose your information when you visit our website or interact with our services related to return gifts, event gifting, and related products.
                        </p>
                    </div>

                    <div className="grid gap-10">
                        {/* 1. Information We Collect */}
                        <PolicySection
                            number="01"
                            title="Information We Collect"
                            icon={<FileText className="w-6 h-6 text-gold" />}
                        >
                            <p className="mb-4">We may collect the following types of information:</p>
                            <ul className="space-y-3">
                                <ListItem title="Personal Information">
                                    Name, phone number, email address, delivery address, and any other details you provide when placing an order or contacting us.
                                </ListItem>
                                <ListItem title="Order Information">
                                    Product details, quantity, delivery preferences, and payment method (Cash on Delivery or other available options).
                                </ListItem>
                                <ListItem title="Technical Information">
                                    IP address, browser type, device information, and basic website usage data (used only for improving our website experience).
                                </ListItem>
                            </ul>
                        </PolicySection>

                        {/* 2. How We Use Your Information */}
                        <PolicySection
                            number="02"
                            title="How We Use Your Information"
                            icon={<Eye className="w-6 h-6 text-gold" />}
                        >
                            <p className="mb-4">We use your information effectively to:</p>
                            <ul className="grid md:grid-cols-2 gap-3">
                                <CheckItem>Process and deliver your orders efficiently</CheckItem>
                                <CheckItem>Communicate regarding inquiries or support</CheckItem>
                                <CheckItem>Improve our products and website experience</CheckItem>
                                <CheckItem>Share exclusive updates and offers (opt-in only)</CheckItem>
                                <CheckItem>Prevent fraud and unauthorized access</CheckItem>
                            </ul>
                        </PolicySection>

                        {/* 3. Sharing of Information */}
                        <PolicySection
                            number="03"
                            title="Sharing of Information"
                            icon={<ShieldCheck className="w-6 h-6 text-gold" />}
                        >
                            <p className="mb-4">
                                We do not sell or trade your personal information. Your data may only be shared with:
                            </p>
                            <ul className="space-y-3 mb-4">
                                <ListItem title="Delivery Partners">
                                    Courier and transport services strictly for order fulfillment.
                                </ListItem>
                                <ListItem title="Operational Partners">
                                    Payment or business partners strictly for necessary operations.
                                </ListItem>
                                <ListItem title="Legal Authorities">
                                    If explicitly required by law.
                                </ListItem>
                            </ul>
                            <div className="bg-soft/50 p-4 rounded-lg border border-gold/10 text-sm italic">
                                All third parties are expected to respect the confidentiality of your information.
                            </div>
                        </PolicySection>

                        {/* 4. Data Security */}
                        <PolicySection
                            number="04"
                            title="Data Security"
                            icon={<Lock className="w-6 h-6 text-gold" />}
                        >
                            <p>
                                We take reasonable and appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. While no online system is completely secure, we strive to use commercially acceptable means to safeguard your data.
                            </p>
                        </PolicySection>

                        {/* 5. Cookies & Tracking */}
                        <PolicySection
                            number="05"
                            title="Cookies & Tracking"
                            icon={<Cookie className="w-6 h-6 text-gold" />}
                        >
                            <p>
                                Grazie.lk may use basic cookies to enhance user experience and understand website traffic. Cookies do not collect personally identifiable information. You may disable cookies in your browser settings if you prefer.
                            </p>
                        </PolicySection>

                        {/* 6. Your Rights */}
                        <PolicySection
                            number="06"
                            title="Your Rights"
                            icon={<Scale className="w-6 h-6 text-gold" />}
                        >
                            <p className="mb-4">You have the right to:</p>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0"></span>
                                    <span>Request access to the personal data we hold about you</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0"></span>
                                    <span>Request corrections to inaccurate information</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0"></span>
                                    <span>Request deletion of your data (subject to legal/business requirements)</span>
                                </li>
                            </ul>
                            <p className="text-sm">To exercise these rights, please contact us using the details below.</p>
                        </PolicySection>

                        {/* 7. Third-Party Links */}
                        <PolicySection
                            number="07"
                            title="Third-Party Links"
                            icon={<LinkIcon className="w-6 h-6 text-gold" />}
                        >
                            <p>
                                Our website or social media platforms may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.
                            </p>
                        </PolicySection>

                        {/* 8. Changes to Policy */}
                        <PolicySection
                            number="08"
                            title="Changes to This Policy"
                            icon={<RefreshCcw className="w-6 h-6 text-gold" />}
                        >
                            <p>
                                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                            </p>
                        </PolicySection>
                    </div>

                    {/* 9. Contact Us Box */}
                    <div className="mt-16 bg-gradient-to-br from-dark to-[#2c261e] text-soft p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">

                                <h2 className="text-2xl md:text-3xl font-heading font-semibold !text-white">Contact Us</h2>
                            </div>

                            <p className="text-white/80 mb-8 leading-relaxed max-w-2xl">
                                If you have any questions about this Privacy Policy or how we handle your information, please don't hesitate to reach out.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6">
                                <ContactItem
                                    href="mailto:grazie.lk17@gmail.com"
                                    icon={<Mail className="w-5 h-5" />}
                                    label="Email Us"
                                    value="grazie.lk17@gmail.com"
                                />
                                <ContactItem
                                    href="https://wa.me/94767764438"
                                    icon={<Phone className="w-5 h-5" />}
                                    label="Call / WhatsApp"
                                    value="+94 76 776 4438"
                                />
                                <ContactItem
                                    href="/"
                                    icon={<Globe className="w-5 h-5" />}
                                    label="Website"
                                    value="www.grazie.lk"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 text-center border-t border-gold/10 mt-12">
                        <p className="text-accent/60 italic text-sm">
                            By using our website and services, you agree to the terms of this Privacy Policy.
                        </p>
                        <p className="text-gold font-medium mt-3 font-heading">
                            Thank you for trusting Grazie.lk – where every gift is given with care and gratitude.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Sub-components for cleaner code
function PolicySection({ number, title, icon, children }: { number: string; title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="group">
            <div className="flex items-center gap-4 mb-4">
                <span className="text-gold/30 font-heading text-4xl font-bold select-none group-hover:text-gold/50 transition-colors">{number}</span>
                <div className="h-px bg-gold/20 flex-grow"></div>
            </div>
            <div className="pl-2 md:pl-14">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-soft text-gold  group-hover:text-white transition-colors duration-300">
                        {icon}
                    </div>
                    <h2 className="text-2xl font-heading font-semibold text-dark">{title}</h2>
                </div>
                <div className="text-accent leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}

function ListItem({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <li className="flex gap-2">
            <span className="text-gold font-bold flex-shrink-0">›</span>
            <span>
                <strong className="text-dark block sm:inline">{title}: </strong>
                <span className="text-accent/90">{children}</span>
            </span>
        </li>
    );
}

function CheckItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-center gap-3 bg-soft/30 p-3 rounded-lg border border-transparent hover:border-gold/10 transition-colors">
            <div className="w-2 h-2 rounded-full bg-gold"></div>
            <span className="text-dark/90 text-sm md:text-base">{children}</span>
        </li>
    );
}

function ContactItem({ href, icon, label, value }: { href: string; icon: React.ReactNode; label: string; value: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col bg-white/5 hover:bg-white/10 p-5 rounded-xl border border-white/5 hover:border-gold/30 transition-all duration-300 group"
        >
            <div className="flex items-center gap-3 mb-2 text-gold group-hover:text-white transition-colors">
                {icon}
                <span className="text-sm font-medium opacity-80">{label}</span>
            </div>
            <span className="text-white font-medium">{value}</span>
        </a>
    );
}
