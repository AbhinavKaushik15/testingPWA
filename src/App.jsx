import { useEffect, useState } from "react";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Default browser install prompt ko block karo
      setDeferredPrompt(e); // Store the prompt

      // Automatically trigger the install popup
      setTimeout(() => {
        e.prompt();
        e.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("✅ User accepted the install prompt");
          } else {
            console.log("❌ User dismissed the install prompt");
          }
          setDeferredPrompt(null);
        });
      }, 1000); // Thoda delay dena (1 sec) for smoother UX
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return (
    <div>
      <h1>🚀 My PWA App</h1>
      <p>
        The install prompt will appear automatically on page load (if eligible).
      </p>
    </div>
  );
}

export default App;
