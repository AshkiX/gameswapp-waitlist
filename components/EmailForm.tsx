"use client";

import { Crosshair1Icon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import ShareSuccess from "./ShareSuccess";
import Link from 'next/link';

interface City {
  name: string;
  country: string;
  lat: string;
  lng: string;
}

interface FormState {
  email: string;
  city: string;
  country: string;
  country_name: string;
  isSubmitting: boolean;
  isLocating: boolean;
}

interface LocationData {
  city: string;
  country: string;
  country_name: string;
  error?: boolean;
}

function debounce<F extends (...args: any[]) => any>(func: F, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default function EmailForm() {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    city: "",
    country: "",
    country_name: "",
    isSubmitting: false,
    isLocating: false
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedCitySearch = useRef(
    debounce(async (value: string) => {
      if (value.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/cities?q=${encodeURIComponent(value)}&limit=5`);
        const data = await response.json();
        setSuggestions(data.cities);
        setShowSuggestions(data.cities.length > 0);
      } catch (error) {
        console.error('City search error:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300)
  ).current;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({ ...prev, email: e.target.value }));
  };

  const handleCitySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedCitySearch(value);
  };

  const handleCitySelect = (city: City) => {
    console.log("city selected:", city);
    setFormState(prev => ({
      ...prev,
      city: city.name,
      country: city.country,
      country_name: city.country
    }));
    console.log("Form state set to:", formState);
    setSearchTerm(`${city.name}, ${city.country}`);
    setShowSuggestions(false);
  };

  const getLocationFromIP = async (): Promise<LocationData> => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.reason || 'Failed to get location');
      }

      return {
        city: data.city,
        country: data.country_code,
        country_name: data.country_name
      };
    } catch (error) {
      console.error('Error getting location:', error);
      throw new Error('Failed to detect location');
    }
  };

  const handleLocationClick = async () => {
    setFormState(prev => ({ ...prev, isLocating: true }));

    try {
      const locationData = await getLocationFromIP();
      setFormState(prev => ({ 
        ...prev, 
        city: locationData.city,
        country: locationData.country,
        country_name: locationData.country_name,
        isLocating: false 
      }));
      setSearchTerm(`${locationData.city}, ${locationData.country}`);
      // toast.success("Location detected!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Could not detect location");
      setFormState(prev => ({ ...prev, isLocating: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true }));

    if (!formState.email) {
      toast.error("Please enter your email address");
      setFormState(prev => ({ ...prev, isSubmitting: false }));
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formState.email,
          city: formState.city || "",
          country: formState.country || "",
          country_name: formState.country_name || "",
        }),
      });

      if (response.ok) {
        setFormState({ 
          email: "", 
          city: "", 
          country: "", 
          country_name: "", 
          isSubmitting: false, 
          isLocating: false 
        });
        setSearchTerm("");
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Oops! Something went wrong!");
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
  };

  if (isSuccess) {
    return <ShareSuccess onReset={handleReset} />;
  }

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        className="mt-8 max-w-md min-h-[400px]"
      >
        <div className="space-y-4">
          <h2 className="text-lg font-light text-[var(--color-text)]">
            Get notified when we launch in your area. We are working to bring this experience to you as soon as possible!
          </h2>

          {/* Email Input */}
          <div className="relative">
            <label className="sr-only" htmlFor="email-address">
              Email address
            </label>
            <input
              autoComplete="email"
              className="block w-full rounded-[var(--radius-md)] border-2 border-slate-200 px-4 py-2.5 text-[var(--color-text)] placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] disabled:opacity-50"
              pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
              id="email-address"
              name="email"
              placeholder="Email Address (johndoe@example.com)"
              required
              type="email"
              value={formState.email}
              onChange={handleEmailChange}
              disabled={formState.isSubmitting}
            />
          </div>

          {/* City Input */}
          <div className="relative">
            <label className="sr-only" htmlFor="city">
              City
            </label>
            <div className="relative">
              <input
                className="block w-full rounded-[var(--radius-md)] border-2 border-slate-200 pl-4 pr-12 py-2.5 text-[var(--color-text)] placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] disabled:opacity-50"
                id="city"
                name="city"
                placeholder="City (optional)"
                type="text"
                value={searchTerm}
                onChange={handleCitySearch}
                disabled={formState.isSubmitting || formState.isLocating}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={handleLocationClick}
                disabled={formState.isSubmitting || formState.isLocating}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[var(--color-primary)] disabled:opacity-50 disabled:cursor-not-allowed"
                title="Detect my location"
              >
                <Crosshair1Icon className={`h-5 w-5 ${formState.isLocating ? 'animate-pulse' : ''}`} />
              </button>
            </div>
            {showSuggestions && (
              <div 
                ref={suggestionsRef}
                className="absolute z-10 w-full mt-1 bg-white rounded-[var(--radius-md)] border border-slate-200 shadow-lg max-h-60 overflow-auto"
              >
                {isLoading ? (
                  <div className="p-4 text-center text-slate-500">
                    Searching cities...
                  </div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((city, index) => (
                    <button
                      key={`${city.name}-${city.country}-${index}`}
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
                      onClick={() => handleCitySelect(city)}
                    >
                      {city.name}, {city.country}
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-500">
                    No cities found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Privacy Policy and Terms & Conditions Links */}
          <div className="text-xs text-gray-500 text-center flex justify-center items-center gap-1">
            By joining our waitlist, you agree to our{' '}
            <Link 
              href="/privacy-policy" 
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--color-primary)] transition-colors flex items-center gap-0.5"
            >
              Privacy Policy
              <ExternalLinkIcon className="w-3 h-3" />
            </Link>{' '}
            and{' '}
            <Link 
              href="/terms-conditions" 
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--color-primary)] transition-colors flex items-center gap-0.5"
            >
              Terms & Conditions
              <ExternalLinkIcon className="w-3 h-3" />
            </Link>
          </div>

          {/* Submit Button */}
          <button
            className="w-full rounded-[var(--radius-md)] bg-[var(--color-primary-dark)] px-6 py-3.5 
            text-base md:text-lg font-semibold text-white transition-all duration-300
            hover:bg-[var(--color-primary-dark)] hover:scale-[1.02] hover:shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            disabled:hover:shadow-none"
            type="submit"
            disabled={formState.isSubmitting || formState.isLocating}
          >
            <span className="flex items-center justify-center gap-2">
              {formState.isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                "Join the waitlist"
              )}
            </span>
          </button>
        </div>
      </form>
    </>
  );
}
