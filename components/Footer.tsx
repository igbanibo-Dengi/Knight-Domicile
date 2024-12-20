import { Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black">Knight  <span className="text-[#e8c248]">Domicile</span></h2>
            <p className="text-sm">
              Your trusted partner in finding the perfect property. With years
              of experience and a commitment to excellence, we&apos;re here to
              make your real estate dreams a reality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Properties
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Agents
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              Property Types
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Residential
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Commercial
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Industrial
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Land
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Luxury
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              Our Services
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Property Valuation
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Property Management
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Mortgage Services
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Investment Consulting
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Interior Design
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact, Social, and Newsletter */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              Contact Us
            </h3>
            <address className="not-italic">
              <p>123 Real Estate Avenue</p>
              <p>Cityville, State 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@knightrealestate.com</p>
            </address>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              Follow Us
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a href="#" className="transition-colors hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                <Linkedin />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              Newsletter
            </h3>
            <p className="mb-2">
              Stay updated with our latest properties and news
            </p>
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-grow"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-muted-foreground/20 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Knight Real Estate. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
