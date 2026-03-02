import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bot, User, Send, Loader2, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AskAI() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: 'Bonjour ! Je suis votre assistant BoM. Posez-moi des questions sur la nomenclature. Ex : "Quelles pièces sont en Inconel 718 ?" ou "Combien d\'aubes sur le disque ?"',
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.answer },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Une erreur est survenue lors de la communication avec l'API.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="flex flex-col h-150">
        {/* Header */}
        <CardHeader className="pb-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-muted">
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">
                  BoM Assistant
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Nomenclature industrielle · Mistral AI
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <Separator />

        {/* Messages */}
        <ScrollArea className="flex-1 px-4">
          <div className="py-4 flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-2.5",
                  msg.role === "user" && "flex-row-reverse",
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "h-7 w-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5",
                    msg.role === "assistant"
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary text-primary-foreground",
                  )}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="h-3.5 w-3.5" />
                  ) : (
                    <User className="h-3.5 w-3.5" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words",
                    msg.role === "assistant"
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground",
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-2.5">
                <div className="h-7 w-7 rounded-md flex items-center justify-center bg-muted text-muted-foreground flex-shrink-0 mt-0.5">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="bg-muted rounded-lg px-3 py-3 flex items-center gap-1">
                  {[0, 150, 300].map((delay, i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        <Separator />

        {/* Input */}
        <CardContent className="pt-3 pb-3 flex-shrink-0">
          <div className="flex gap-2 items-end">
            <Textarea
              placeholder='Ex : "Quelles pièces sont en Inconel 718 ?"'
              className="min-h-[42px] max-h-[120px] resize-none text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={loading}
            />
            <Button
              size="icon"
              className="h-[42px] w-[42px] flex-shrink-0"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Entrée pour envoyer · Shift+Entrée pour saut de ligne
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
