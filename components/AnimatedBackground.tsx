export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-full h-full">
        <path fill="rgba(13,38,28,0.4)" d="M0,300 C240,100 480,500 720,400 C960,300 1200,600 1440,500 L1440,900 L0,900 Z">
          <animate attributeName="d" dur="20s" repeatCount="indefinite"
            values="M0,300 C240,100 480,500 720,400 C960,300 1200,600 1440,500 L1440,900 L0,900 Z;
                    M0,400 C240,200 480,300 720,500 C960,700 1200,400 1440,600 L1440,900 L0,900 Z;
                    M0,300 C240,100 480,500 720,400 C960,300 1200,600 1440,500 L1440,900 L0,900 Z" />
        </path>
        <path fill="rgba(49,155,114,0.2)" d="M0,700 C300,500 600,800 900,600 C1200,400 1400,700 1440,600 L1440,900 L0,900 Z">
          <animate attributeName="d" dur="25s" repeatCount="indefinite"
            values="M0,700 C300,500 600,800 900,600 C1200,400 1400,700 1440,600 L1440,900 L0,900 Z;
                    M0,800 C300,600 600,700 900,500 C1200,300 1400,600 1440,700 L1440,900 L0,900 Z;
                    M0,700 C300,500 600,800 900,600 C1200,400 1400,700 1440,600 L1440,900 L0,900 Z" />
        </path>
      </svg>
    </div>
  );
}