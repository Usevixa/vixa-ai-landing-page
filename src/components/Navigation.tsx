import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "AI Demo", href: "#demo" },
    { label: "For Users", href: "#users" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="relative z-50 glass-card border-b border-border/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-heading font-bold text-gradient-primary transition-all tracking-tight">
              VIXA AI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm hover-bold-smooth text-muted-foreground hover:text-primary transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-border hover:border-primary hover:text-primary transition-all"
            >
              Back to VIXA Wallet
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-border/50">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 hover-bold-smooth text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <Button
                variant="outline"
                className="w-full border-border hover:border-primary hover:text-primary"
              >
                Back to VIXA Wallet
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
