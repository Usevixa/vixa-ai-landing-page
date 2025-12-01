interface Message {
  sender: "user" | "ai";
  text: string;
}

interface ChatDemoProps {
  messages: Message[];
  title?: string;
}

const ChatDemo = ({ messages, title }: ChatDemoProps) => {
  return (
    <div className="glass-card rainbow-border rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto hover:shadow-elevation transition-all duration-300">
      {title && (
        <h4 className="text-lg font-heading font-semibold mb-4 text-center text-muted-foreground">
          {title}
        </h4>
      )}
      <div className="space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                message.sender === "user"
                  ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-sm"
                  : "bg-gradient-to-br from-card to-muted text-foreground rounded-bl-sm border border-border"
              }`}
            >
              {message.sender === "ai" && (
                <span className="text-xs font-semibold text-primary mb-1 block">
                  VIXA AI
                </span>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatDemo;
