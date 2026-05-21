export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#051912" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0D261C" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#grad1)" />
        
        {/* Animated waves */}
        <path
          fill="rgba(26,76,57,0.15)"
          d="M0,600 C240,500 480,700 720,550 C960,400 1200,650 1440,500 L1440,900 L0,900 Z"
        >
          <animate
            attributeName="d"
            dur="25s"
            repeatCount="indefinite"
            values="
              M0,600 C240,500 480,700 720,550 C960,400 1200,650 1440,500 L1440,900 L0,900 Z;
              M0,550 C240,650 480,450 720,600 C960,750 1200,500 1440,650 L1440,900 L0,900 Z;
              M0,600 C240,500 480,700 720,550 C960,400 1200,650 1440,500 L1440,900 L0,900 Z
            "
          />
        </path>

        <path
          fill="rgba(49,155,114,0.08)"
          d="M0,700 C300,600 600,800 900,650 C1200,500 1400,700 1440,600 L1440,900 L0,900 Z"
        >
          <animate
            attributeName="d"
            dur="30s"
            repeatCount="indefinite"
            values="
              M0,700 C300,600 600,800 900,650 C1200,500 1400,700 1440,600 L1440,900 L0,900 Z;
              M0,650 C300,750 600,550 900,700 C1200,850 1400,600 1440,700 L1440,900 L0,900 Z;
              M0,700 C300,600 600,800 900,650 C1200,500 1400,700 1440,600 L1440,900 L0,900 Z
            "
          />
        </path>

        <path
          fill="rgba(49,155,114,0.05)"
          d="M0,800 C400,750 800,850 1200,780 L1440,800 L1440,900 L0,900 Z"
        >
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
              M0,800 C400,750 800,850 1200,780 L1440,800 L1440,900 L0,900 Z;
              M0,780 C400,850 800,780 1200,830 L1440,820 L1440,900 L0,900 Z;
              M0,800 C400,750 800,850 1200,780 L1440,800 L1440,900 L0,900 Z
            "
          />
        </path>
      </svg>
    </div>
  );
}