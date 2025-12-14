"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface LiveChatSettings {
  enabled: boolean
  widgetScript: string
  displayOn: "all" | "homepage" | "dashboard" | "exclude-dashboard"
  autoReplyMessage: string
  supportEmail: string
}

const CRISP_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID

export function LiveChatWidget() {
  const pathname = usePathname()
  const [settings, setSettings] = useState<LiveChatSettings | null>(null)

  useEffect(() => {
    const savedSettings = localStorage.getItem("liveChatSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    } else {
      // Default settings
      setSettings({
        // Enable only if a valid Crisp ID is provided
        enabled: !!CRISP_ID && CRISP_ID !== "your-crisp-website-id",
        widgetScript: `
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = "${CRISP_ID ?? "your-crisp-website-id"}";
          (function() {
            var d = document;
            var s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = 1;
            d.getElementsByTagName("head")[0].appendChild(s);
          })();
        `,
        displayOn: "all",
        autoReplyMessage: "Thanks for reaching out! We'll get back to you shortly.",
        supportEmail: "support@backlinkse.com",
      })
    }
  }, [])

  useEffect(() => {
    if (!settings || !settings.enabled) return

    const shouldDisplay = () => {
      if (settings.displayOn === "all") return true
      if (settings.displayOn === "homepage") return pathname === "/"
      if (settings.displayOn === "dashboard") return pathname.startsWith("/dashboard")
      if (settings.displayOn === "exclude-dashboard") return !pathname.startsWith("/dashboard")
      return false
    }

    // Skip loading if disabled or placeholder widget ID
    if (!shouldDisplay() || settings.widgetScript.includes("your-crisp-website-id")) return

    const script = document.createElement("script")
    script.innerHTML = settings.widgetScript
    document.body.appendChild(script)

    // Set auto-reply message if Crisp is available
    if (settings.autoReplyMessage && typeof window !== "undefined") {
      setTimeout(() => {
        if ((window as any).$crisp) {
          ;(window as any).$crisp.push(["do", "message:show", ["text", settings.autoReplyMessage]])
        }
      }, 2000)
    }

    return () => {
      // Cleanup: remove script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [settings, pathname])

  return null
}
