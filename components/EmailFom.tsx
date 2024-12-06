"use client";
import { InfoCircledIcon, Crosshair1Icon } from "@radix-ui/react-icons";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import cities from "cities.json";

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

    if (value.length > 1) {
      const filteredCities = (cities as City[])
        .filter(city => 
          city.name.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 suggestions

      setSuggestions(filteredCities);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city: City) => {
    setFormState(prev => ({
      ...prev,
      city: city.name,
      country: city.country,
    }));
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
      toast.success("Location detected!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Could not detect location");
      setFormState(prev => ({ ...prev, isLocating: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "waitlist",
          email: formState.email,
          city: formState.city,
          country: formState.country,
          country_name: formState.country_name,
        }).toString(),
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
        toast.success("Thank you for joining our waitlist! 🚀");
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Oops! Something went wrong!");
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        method="POST" 
        className="mt-2 max-w-sm"
        data-netlify="true"
        name="waitlist"
      >
        <input type="hidden" name="form-name" value="waitlist" />
        <input type="hidden" name="country" value={formState.country} />
        <input type="hidden" name="country_name" value={formState.country_name} />
        
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="sr-only" htmlFor="email-address">
              Email address
            </label>
            <input
              autoComplete="email"
              className="text-accent-500 block h-10 w-full focus:invalid:border-red-400 focus:invalid:text-red-500 focus:invalid:ring-red-500 appearance-none rounded-lg border-2 border-slate-300 px-4 py-2 placeholder-zinc-400 duration-200 focus:outline-none focus:ring-zinc-300 sm:text-sm disabled:opacity-50"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
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

          <div className="flex gap-2">
            <div className="relative flex-grow">
              <label className="sr-only" htmlFor="city">
                City
              </label>
              <input
                className="text-accent-500 block h-10 w-full appearance-none rounded-lg border-2 border-slate-300 pl-4 pr-10 py-2 placeholder-zinc-400 duration-200 focus:outline-none focus:ring-zinc-300 sm:text-sm disabled:opacity-50"
                id="city"
                name="city"
                placeholder="City (optional)"
                required
                type="text"
                value={searchTerm}
                onChange={handleCitySearch}
                disabled={formState.isSubmitting || formState.isLocating}
                autoComplete="off"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div 
                  ref={suggestionsRef}
                  className="absolute z-10 w-full mt-1 bg-white rounded-lg border border-slate-200 shadow-lg max-h-60 overflow-auto"
                >
                  {suggestions.map((city, index) => (
                    <button
                      key={`${city.name}-${city.country}-${index}`}
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none text-sm"
                      onClick={() => handleCitySelect(city)}
                    >
                      {city.name}, {city.country}
                    </button>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={handleLocationClick}
                disabled={formState.isSubmitting || formState.isLocating}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed p-1"
                title="Detect my location"
              >
                <Crosshair1Icon className={`h-5 w-5 ${formState.isLocating ? 'animate-pulse' : ''}`} />
              </button>
            </div>
          </div>

          <button
            className="flex h-10 shrink-0 items-center justify-center gap-1 rounded-lg bg-[#FF6B6B] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#FF5252] disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={formState.isSubmitting || formState.isLocating}
          >
            <span>{formState.isSubmitting ? "Submitting..." : "Join the waitlist"}</span>
          </button>
        </div>
      </form>

      <div className="flex items-start gap-2 text-gray-500">
        <InfoCircledIcon />
        <p className="text-xs -mt-[0.5] max-w-sm">
          We will only use your location to gauge interest in your area.
          <br />
          We will not contact you unless we launch in your area.
        </p>
      </div>
    </>
  );
}
