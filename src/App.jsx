import { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Default browser ka prompt rokna
      console.log("📦 beforeinstallprompt fired");

      // Delay se prompt() call karo
      setTimeout(() => {
        e.prompt(); // Yahi pop-up dikhata hai
        e.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("✅ User accepted the install prompt");
          } else {
            console.log("❌ User dismissed the install prompt");
          }
        });
      }, 1000); // 1 second delay for smooth load
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
      <h1>🔥 PWA App</h1>
      <p>Install popup will appear automatically when app is opened.</p>
    </div>
  );
}

export default App;
