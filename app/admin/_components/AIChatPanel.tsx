"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Send, Sparkles } from "lucide-react";
import { adminApi, MetricsResponse } from "@/lib/admin-api";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
  error?: string;
};

type Props = {
  // Snapshot of the current dashboard payload — passed to the model
  // so its answers cite the actual numbers on screen.
  context?: MetricsResponse | null;
};

const PROMPT_FALLBACK = [
  "Analyse la performance d'aujourd'hui",
  "Pourquoi le taux de livraison est bas ?",
  "Suggère une offre gagnante pour les sacs",
  "Génère 5 copies pub Meta pour le Tabby Cognac",
  "Donne-moi 3 hooks TikTok pour le Marmont Noir",
];

export default function AIChatPanel({ context }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const [suggested, setSuggested] = useState<string[]>(PROMPT_FALLBACK);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Fetch backend-declared capabilities once
  useEffect(() => {
    let cancelled = false;
    adminApi
      .aiCapabilities()
      .then((r) => {
        if (cancelled) return;
        setConfigured(r.configured);
        if (Array.isArray(r.suggested_prompts) && r.suggested_prompts.length) {
          setSuggested(r.suggested_prompts);
        }
      })
      .catch(() => {
        if (!cancelled) setConfigured(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Clean up any in-flight stream on unmount
  useEffect(() => {
    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  const send = useCallback(
    (question: string) => {
      if (!question.trim() || busy) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        content: question,
      };
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: "",
        streaming: true,
      };
      setMessages((m) => [...m, userMsg, assistantMsg]);
      setInput("");
      setBusy(true);

      // Use EventSource on the streaming endpoint. The session cookie
      // travels with the request thanks to withCredentials.
      const url = adminApi.aiStreamUrl(question, context || undefined);
      const es = new EventSource(url, { withCredentials: true });
      eventSourceRef.current = es;

      es.onmessage = (e) => {
        if (e.data === "[DONE]") {
          es.close();
          eventSourceRef.current = null;
          setMessages((m) =>
            m.map((msg) =>
              msg.id === assistantMsg.id
                ? { ...msg, streaming: false }
                : msg
            )
          );
          setBusy(false);
          return;
        }
        try {
          const payload = JSON.parse(e.data) as {
            text?: string;
            error?: string;
          };
          if (payload.error) {
            setMessages((m) =>
              m.map((msg) =>
                msg.id === assistantMsg.id
                  ? { ...msg, error: payload.error, streaming: false }
                  : msg
              )
            );
            es.close();
            eventSourceRef.current = null;
            setBusy(false);
            return;
          }
          if (payload.text) {
            setMessages((m) =>
              m.map((msg) =>
                msg.id === assistantMsg.id
                  ? { ...msg, content: msg.content + payload.text }
                  : msg
              )
            );
          }
        } catch {
          /* skip malformed frame */
        }
      };

      es.onerror = () => {
        setMessages((m) =>
          m.map((msg) =>
            msg.id === assistantMsg.id
              ? {
                  ...msg,
                  error: msg.content
                    ? undefined
                    : "Erreur de connexion à l'assistant",
                  streaming: false,
                }
              : msg
          )
        );
        es.close();
        eventSourceRef.current = null;
        setBusy(false);
      };
    },
    [busy, context]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="bg-white border border-[#F0E9E1] rounded-2xl flex flex-col h-[520px] sm:h-[560px]">
      {/* Header */}
      <div className="px-5 sm:px-6 py-4 border-b border-[#F0E9E1] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#FAF6F2] text-[#810B38]">
            <Sparkles size={14} />
          </span>
          <div>
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
              Assistant
            </p>
            <p className="font-cormorant text-charcoal text-base leading-none mt-0.5">
              Analyste maison.
            </p>
          </div>
        </div>
        {configured === false && (
          <span className="text-[10px] tracking-[0.18em] uppercase text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
            Non configuré
          </span>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollerRef}
        className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 flex flex-col gap-3"
      >
        {messages.length === 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-[12px] text-charcoal/55">
              Pose une question sur le store, les commandes, ou demande des
              copies pub. L&apos;assistant lit les chiffres du dashboard pour
              répondre.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {suggested.slice(0, 5).map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  disabled={busy || configured === false}
                  className="text-[11px] text-charcoal/70 bg-[#FAF6F2] hover:bg-[#810B38] hover:text-white border border-[#F0E9E1] hover:border-[#810B38] rounded-full px-3 py-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </div>

      {/* Composer */}
      <form
        onSubmit={onSubmit}
        className="border-t border-[#F0E9E1] px-3 sm:px-4 py-3 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            configured === false
              ? "Définis ANTHROPIC_API_KEY pour activer l'assistant"
              : "Pose ta question…"
          }
          disabled={busy || configured === false}
          className="flex-1 bg-[#FAF6F2] border border-[#F0E9E1] rounded-full px-4 py-2.5 text-[13px] text-charcoal focus:border-[#810B38] focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={busy || !input.trim() || configured === false}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#810B38] text-white disabled:opacity-50 hover:bg-[#5c0828] transition-colors"
          aria-label="Envoyer"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-[#810B38] text-white"
            : "bg-[#FAF6F2] text-charcoal border border-[#F0E9E1]"
        }`}
      >
        {message.error ? (
          <span className="text-rose-600">{message.error}</span>
        ) : (
          <>
            {message.content}
            {message.streaming && (
              <span className="inline-block w-1.5 h-3 ml-0.5 align-middle bg-charcoal/40 animate-pulse" />
            )}
          </>
        )}
      </div>
    </div>
  );
}
