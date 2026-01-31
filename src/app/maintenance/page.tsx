import Link from "next/link";
import { Phone } from "lucide-react";

export default function MaintenancePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-dark px-4 text-center">
            <div className="max-w-md w-full space-y-8 bg-black/20 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-gold/30">
                <div className="flex justify-center">
                    <div className="h-24 w-24 bg-gold/20 rounded-full flex items-center justify-center animate-pulse">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-gold"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-heading font-bold tracking-wide text-gold">
                        Site Down
                    </h1>
                    <p className="text-soft text-lg">
                        We're currently performing some maintenance. We'll be back shortly!
                    </p>
                    <div className="w-full border-t border-gold/30 my-6"></div>
                    <p className="text-soft/90 font-medium">
                        For more detailed contact WhatsApp
                    </p>
                </div>

                <div className="pt-4">
                    <Link
                        href="https://wa.me/94767764438"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center w-full px-4 py-4 text-dark font-bold bg-gold hover:bg-[#a38a52] rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <Phone className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                        Connect WhatsApp
                    </Link>
                </div>
            </div>

        </div>
    );
}
