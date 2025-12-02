import { useState } from "react";
import { useTheme } from "../ThemeContext";
import emailjs from "@emailjs/browser";

import { INITIAL_EMAILS, CONTACT_INFO } from "../../config/data";
import {
  ChevronLeft,
  Inbox,
  MailOpen,
  Reply,
  Search,
  Send,
  SquarePen,
  X,
} from "lucide-react";

export const ContactApp = () => {
  const [emails, setEmails] = useState(INITIAL_EMAILS);
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [selectedEmailId, setSelectedEmailId] = useState(1);
  const [isComposing, setIsComposing] = useState(false);

  const [draftSubject, setDraftSubject] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [draftEmail, setDraftEmail] = useState("");

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const filteredEmails = emails
    .filter((e) => e.folder === selectedFolder)
    .sort((a, b) => b.id - a.id);
  const selectedEmail = emails.find((e) => e.id === selectedEmailId);

  const handleCompose = () => {
    setIsComposing(true);
    setSelectedEmailId(null);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    // EmailJS に送るデータ
    const templateParams = {
      from_email: draftEmail,
      subject: draftSubject || "(No Subject)",
      message: draftBody,
      to_name: "Jun Hayashi",
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // フロントのUIはそのまま更新（送信済みフォルダに入る）
      const newEmail = {
        id: Date.now(),
        folder: "sent",
        from: "Me",
        to: "Jun Hayashi",
        subject: draftSubject || "(No Subject)",
        date: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "ME",
        avatarColor: "bg-emerald-600",
        read: true,
        body: (
          <div className="whitespace-pre-wrap">
            {draftBody}
            {draftEmail && (
              <div className="mt-6 pt-4 border-t border-dashed opacity-60 text-xs font-mono">
                Sent from: {draftEmail}
              </div>
            )}
          </div>
        ),
      };

      setEmails((prev) => [...prev, newEmail]);
      setIsComposing(false);
      setSelectedFolder("sent");
      setSelectedEmailId(newEmail.id);
      setDraftSubject("");
      setDraftBody("");
      setDraftEmail("");
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Failed to send email. Please try again later.");
    }
  };

  const handleReply = () => {
    setDraftSubject(`Re: ${selectedEmail?.subject}`);
    setDraftBody(
      `\n\n--- On ${selectedEmail?.date}, ${selectedEmail?.from} wrote: ---\n`
    );
    setIsComposing(true);
    setSelectedEmailId(null);
  };

  return (
    <div
      className={`flex h-full font-sans text-sm transition-colors duration-300 overflow-hidden relative ${
        isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-700"
      }`}
    >
      {/* Sidebar - Hidden on Mobile if Email Open */}
      <div
        className={`
        w-full md:w-48 border-r flex flex-col p-3 shrink-0 transition-colors z-20
        ${
          isDark
            ? "bg-slate-950 border-slate-800"
            : "bg-slate-50 border-slate-200"
        }
        ${selectedEmailId || isComposing ? "hidden md:flex" : "flex"}
      `}
      >
        <button
          onClick={handleCompose}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl shadow-sm shadow-indigo-500/30 font-medium transition-all mb-6 active:scale-95"
        >
          <SquarePen className="w-4 h-4" />
          New Mail
        </button>

        <div className="space-y-1">
          <div className="px-3 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Mailboxes
          </div>

          <button
            onClick={() => {
              setSelectedFolder("inbox");
              setIsComposing(false);
              setSelectedEmailId(null);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
              selectedFolder === "inbox"
                ? isDark
                  ? "bg-indigo-500/20 text-indigo-300 font-medium"
                  : "bg-indigo-50 text-indigo-700 font-medium"
                : isDark
                ? "text-slate-400 hover:bg-slate-800"
                : "text-slate-600 hover:bg-slate-200/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span>
                <Inbox className="w-4 h-4" />
              </span>{" "}
              Inbox
            </span>
            <span
              className={`text-xs px-1.5 rounded-md ${
                isDark
                  ? "bg-slate-800 text-slate-400"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {emails.filter((e) => e.folder === "inbox").length}
            </span>
          </button>

          <button
            onClick={() => {
              setSelectedFolder("sent");
              setIsComposing(false);
              setSelectedEmailId(null);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
              selectedFolder === "sent"
                ? isDark
                  ? "bg-indigo-500/20 text-indigo-300 font-medium"
                  : "bg-indigo-50 text-indigo-700 font-medium"
                : isDark
                ? "text-slate-400 hover:bg-slate-800"
                : "text-slate-600 hover:bg-slate-200/50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span>
                <Send className="w-4 h-4" />
              </span>{" "}
              Sent
            </span>
          </button>
        </div>

        {/* Email List */}
        <div className="md:hidden mt-4 border-t pt-4 flex-1 overflow-y-auto">
          <div className="px-3 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Messages
          </div>
          <div
            className={`divide-y ${
              isDark ? "divide-slate-800" : "divide-slate-200"
            }`}
          >
            {filteredEmails.map((email) => (
              <button
                key={email.id}
                onClick={() => {
                  setSelectedEmailId(email.id);
                  setIsComposing(false);
                }}
                className={`w-full text-left py-3 px-2 rounded-lg ${
                  isDark ? "hover:bg-white/5" : "hover:bg-black/5"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`font-semibold ${
                      isDark ? "text-slate-200" : "text-slate-800"
                    }`}
                  >
                    {email.from}
                  </span>
                  <span className="text-xs text-slate-500">{email.date}</span>
                </div>
                <div className="text-xs text-slate-400 truncate">
                  {email.subject}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-auto space-y-1 hidden md:block">
          <div className="px-3 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Socials
          </div>
          {CONTACT_INFO.socials?.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isDark
                  ? "text-slate-400 hover:bg-slate-800"
                  : "text-slate-600 hover:bg-slate-200/50"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${social.color}`}></div>{" "}
              {social.name}
            </a>
          ))}
        </div>
      </div>

      {/* Desktop Email List - Hidden on Mobile */}
      <div
        className={`hidden md:flex w-72 border-r flex-col shrink-0 overflow-y-auto transition-colors ${
          isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}
      >
        <div
          className={`p-3 border-b sticky top-0 z-10 ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-100"
          }`}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className={`w-full px-3 py-1.5 pl-8 rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
                isDark
                  ? "bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:ring-indigo-500/50"
                  : "bg-slate-100 text-slate-700 placeholder:text-slate-400 focus:ring-indigo-100"
              }`}
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          </div>
        </div>

        {filteredEmails.length > 0 ? (
          <div
            className={`divide-y ${
              isDark ? "divide-slate-800" : "divide-slate-50"
            }`}
          >
            {filteredEmails.map((email) => (
              <button
                key={email.id}
                onClick={() => {
                  setSelectedEmailId(email.id);
                  setIsComposing(false);
                }}
                className={`
                  w-full text-left p-4 transition-colors
                  ${
                    selectedEmailId === email.id && !isComposing
                      ? isDark
                        ? "bg-indigo-500/10 border-l-2 border-indigo-500"
                        : "bg-indigo-50/60 border-l-2 border-indigo-500"
                      : isDark
                      ? "border-l-2 border-transparent hover:bg-slate-800/50"
                      : "border-l-2 border-transparent hover:bg-slate-50"
                  }
                `}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span
                    className={`font-semibold truncate pr-2 ${
                      selectedEmailId === email.id && !isComposing
                        ? isDark
                          ? "text-indigo-300"
                          : "text-indigo-900"
                        : isDark
                        ? "text-slate-200"
                        : "text-slate-800"
                    }`}
                  >
                    {email.from}
                  </span>
                  <span className="text-xs text-slate-400 shrink-0">
                    {email.date}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mb-1 truncate">
                  {email.subject}
                </div>
                <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed opacity-80">
                  {typeof email.body === "string"
                    ? email.body
                    : "Click to read detailed content..."}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-2">
            <div className="text-4xl opacity-20">📭</div>
            <div className="text-sm">No messages here</div>
          </div>
        )}
      </div>

      {/* Reading Pane / Compose Pane */}
      <div
        className={`
         absolute inset-0 z-30 md:relative md:flex-1 flex flex-col min-w-0 transition-colors 
         ${isDark ? "bg-slate-900" : "bg-white"}
         ${!selectedEmailId && !isComposing ? "hidden md:flex" : "flex"}
      `}
      >
        {isComposing ? (
          // COMPOSE VIEW
          <div className="flex-1 flex flex-col h-full animate-in fade-in duration-300">
            <div
              className={`h-14 border-b flex items-center px-4 md:px-6 justify-between shrink-0 ${
                isDark ? "border-slate-800" : "border-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Mobile Back Button */}
                <button
                  onClick={() => setIsComposing(false)}
                  className="md:hidden text-blue-500 flex items-center gap-1"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Cancel
                </button>
                <h2
                  className={`font-bold ${
                    isDark ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  New Message
                </h2>
              </div>
              <button
                onClick={() => setIsComposing(false)}
                className="hidden md:block text-slate-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={handleSend}
              className="flex-1 flex flex-col p-4 md:p-8 max-w-3xl mx-auto w-full"
            >
              <div className="space-y-4 mb-6">
                <div
                  className={`flex items-center border-b ${
                    isDark ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span className="w-16 md:w-20 text-slate-400 text-sm">
                    To:
                  </span>
                  <input
                    type="text"
                    value="Jun Hayashi <kevin.jun.hayashi@gmail.com>"
                    disabled
                    className={`flex-1 py-2 bg-transparent outline-none ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  />
                </div>
                <div
                  className={`flex items-center border-b ${
                    isDark ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span className="w-16 md:w-20 text-slate-400 text-sm">
                    From:
                  </span>
                  <input
                    type="email"
                    value={draftEmail}
                    onChange={(e) => setDraftEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={`flex-1 py-2 bg-transparent outline-none ${
                      isDark ? "text-white" : "text-black"
                    } placeholder:opacity-40`}
                    required
                  />
                </div>
                <div
                  className={`flex items-center border-b ${
                    isDark ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span className="w-16 md:w-20 text-slate-400 text-sm">
                    Subject:
                  </span>
                  <input
                    type="text"
                    value={draftSubject}
                    onChange={(e) => setDraftSubject(e.target.value)}
                    placeholder="What's this about?"
                    className={`flex-1 py-2 bg-transparent outline-none ${
                      isDark ? "text-white" : "text-black"
                    } placeholder:opacity-40`}
                    autoFocus
                  />
                </div>
              </div>
              <textarea
                value={draftBody}
                onChange={(e) => setDraftBody(e.target.value)}
                placeholder="Write your message here..."
                className={`flex-1 resize-none outline-none bg-transparent p-2 md:p-4 leading-relaxed ${
                  isDark
                    ? "text-slate-300 placeholder:text-slate-600"
                    : "text-slate-700 placeholder:text-slate-300"
                }`}
              />
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
                >
                  Send Message 🚀
                </button>
              </div>
            </form>
          </div>
        ) : selectedEmail && selectedFolder ? (
          // READING VIEW
          <>
            {/* Toolbar */}
            <div
              className={`h-14 border-b flex items-center px-4 md:px-6 justify-between shrink-0 ${
                isDark ? "border-slate-800" : "border-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedEmailId(null)}
                  className="md:hidden text-blue-500 flex items-center gap-1"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
              </div>
              <div className="flex gap-3 text-slate-400">
                <button
                  className={`p-2 rounded-full transition-colors ${
                    isDark
                      ? "hover:text-slate-200 hover:bg-slate-800"
                      : "hover:text-slate-600 hover:bg-slate-100"
                  }`}
                  title="Reply"
                  onClick={handleReply}
                >
                  <Reply className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Header */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 md:px-8 py-6 md:py-8 max-w-4xl mx-auto">
                <div className="flex justify-between items-start mb-6">
                  <h2
                    className={`text-xl md:text-2xl font-bold leading-tight ${
                      isDark ? "text-slate-100" : "text-slate-800"
                    }`}
                  >
                    {selectedEmail.subject}
                  </h2>
                  <div className="flex gap-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${
                        isDark
                          ? "bg-slate-800 text-slate-400"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {selectedFolder}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-dashed border-opacity-20 border-gray-400">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${selectedEmail.avatarColor} flex items-center justify-center text-white font-bold text-sm md:text-base shadow-md ring-4 ring-opacity-20 ring-white`}
                  >
                    {selectedEmail.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
                      <span
                        className={`font-bold text-base md:text-lg ${
                          isDark ? "text-slate-200" : "text-slate-900"
                        }`}
                      >
                        {selectedEmail.from}
                      </span>
                      <span className="text-xs md:text-sm text-slate-400">
                        &lt;{selectedEmail.from.toLowerCase().replace(" ", "")}
                        @portfolio.os&gt;
                      </span>
                    </div>
                    <div className="text-xs md:text-sm text-slate-500">
                      to {selectedEmail.to}
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {selectedEmail.date}
                  </div>
                </div>

                {/* Body */}
                <div
                  className={`prose max-w-none leading-relaxed ${
                    isDark
                      ? "prose-invert text-slate-300"
                      : "prose-indigo text-slate-700"
                  }`}
                >
                  {selectedEmail.body}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center h-full text-slate-400 opacity-50">
            <MailOpen className="h-16 w-16 mb-4" />
            <p>Select an email to read</p>
          </div>
        )}
      </div>
    </div>
  );
};
