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
        enabled: true,
        widgetScript: `
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = "your-crisp-website-id";
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

    if (!shouldDisplay()) return

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
