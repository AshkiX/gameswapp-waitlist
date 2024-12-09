"use client";

import { useState } from "react";

export default function ShareSuccess({ onReset }: { onReset?: () => void }) {
  const shareText = "Hey board game friends! 🎲 I just joined the waitlist for GameSwap - a platform where we can trade board games locally. Join me on the waitlist to be one of the first to try it out!";
  const shareUrl = "https://gamesw.app";

  const handleXShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link");
    }
  };

  return (
    <div className="mt-8 max-w-md">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="heading-lg">You're on the list! 🎉</h2>
          <p className="body-text">
            Know any fellow board game enthusiasts? Invite them to join the waitlist so we can build an amazing community of players ready to swap games!
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleXShare}
            className="flex items-center justify-center gap-2 w-full rounded-[var(--radius-md)] 
            bg-black px-6 py-3 text-white font-medium transition-all duration-300
            hover:opacity-90 hover:scale-[1.02]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X
          </button>

          <button
            onClick={handleFacebookShare}
            className="flex items-center justify-center gap-2 w-full rounded-[var(--radius-md)] 
            bg-[#1877F2] px-6 py-3 text-white font-medium transition-all duration-300
            hover:opacity-90 hover:scale-[1.02]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Share on Facebook
          </button>

          <button
            onClick={handleCopyLink}
            className={`flex items-center justify-center gap-2 w-full rounded-[var(--radius-md)] 
            px-6 py-3 text-white font-medium transition-all duration-300
            hover:opacity-90 hover:scale-[1.02] ${isCopied ? 'bg-green-500' : 'bg-indigo-600'}`}
          >
            {isCopied ? (
              <>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Link
              </>
            )}
          </button>

          <button
            onClick={onReset}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors duration-300 mt-2"
          >
            Add another email
          </button>
        </div>
      </div>
    </div>
  );
} 