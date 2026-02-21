import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "rules" | "apply" | "about" | "members" | "cabinet";

interface Player {
  nickname: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

const MOCK_PLAYERS: Player[] = [
  { nickname: "ShadowBlade_X", status: "approved", date: "18.02.2026" },
  { nickname: "NeonCraft99", status: "pending", date: "20.02.2026" },
  { nickname: "VoidHunter", status: "approved", date: "15.02.2026" },
  { nickname: "PixelStorm", status: "rejected", date: "10.02.2026" },
  { nickname: "CryptoMiner", status: "approved", date: "12.02.2026" },
  { nickname: "StarDragon", status: "pending", date: "21.02.2026" },
];

const HERO_IMAGE = "https://cdn.poehali.dev/projects/78ba50e0-61d0-4a29-be41-936bb3c42e3f/files/df3f1fcc-4626-48fd-a5e6-4f46b46f7adc.jpg";

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginNick, setLoginNick] = useState("");
  const [loggedPlayer, setLoggedPlayer] = useState<Player | null>(null);
  const [loginError, setLoginError] = useState("");
  const [applyForm, setApplyForm] = useState({ nickname: "", age: "", videoUrl: "", discord: "" });
  const [applySubmitted, setApplySubmitted] = useState(false);

  const navItems: { id: Page; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "rules", label: "Правила", icon: "ScrollText" },
    { id: "apply", label: "Подать заявку", icon: "Send" },
    { id: "about", label: "О сервере", icon: "Server" },
    { id: "members", label: "Участники", icon: "Users" },
    { id: "cabinet", label: "Кабинет", icon: "User" },
  ];

  const handleLogin = () => {
    const found = MOCK_PLAYERS.find(p => p.nickname.toLowerCase() === loginNick.toLowerCase());
    if (found) {
      setLoggedPlayer(found);
      setLoginError("");
    } else {
      setLoginError("Игрок не найден. Убедись, что ты подавал заявку.");
    }
  };

  const handleApply = () => {
    if (!applyForm.nickname || !applyForm.age || !applyForm.videoUrl || !applyForm.discord) return;
    setApplySubmitted(true);
  };

  const statusLabel = (s: Player["status"]) => {
    if (s === "pending") return "На рассмотрении";
    if (s === "approved") return "Принят";
    return "Отклонён";
  };

  const statusClass = (s: Player["status"]) => {
    if (s === "pending") return "status-pending";
    if (s === "approved") return "status-approved";
    return "status-rejected";
  };

  const navigate = (p: Page) => {
    setPage(p);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 card-glass border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => navigate("home")} className="flex items-center gap-1">
            <span className="text-2xl font-montserrat font-black neon-text-cyan tracking-widest">ONEX</span>
            <span className="text-2xl font-montserrat font-black text-purple-400 tracking-widest">SMP</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`px-3 py-2 rounded-lg font-rubik text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  page === item.id
                    ? "bg-cyan-500/20 neon-text-cyan border border-cyan-500/40"
                    : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                }`}
              >
                <Icon name={item.icon} size={14} />
                {item.label}
              </button>
            ))}
          </div>

          <button className="md:hidden text-cyan-400 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-cyan-500/20 py-2 animate-fade-in">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full text-left px-6 py-3 flex items-center gap-3 font-rubik text-sm transition-all ${
                  page === item.id ? "neon-text-cyan bg-cyan-500/10" : "text-gray-400"
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="pt-16">

        {/* ===== HOME ===== */}
        {page === "home" && (
          <div>
            <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
              <img src={HERO_IMAGE} alt="OnexSMP" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 grid-bg opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent" />

              <div className="relative z-10 text-center px-4 animate-fade-in">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10">
                  <span className="text-cyan-400 text-sm font-rubik font-medium tracking-widest uppercase">
                    🎮 Minecraft Java · SMP Сервер
                  </span>
                </div>
                <h1 className="font-montserrat font-black text-6xl md:text-8xl mb-4 leading-none">
                  <span className="neon-text-cyan">ONEX</span>
                  <span className="text-purple-400" style={{ textShadow: "0 0 20px #a855f7, 0 0 40px #a855f7" }}>SMP</span>
                </h1>
                <p className="text-gray-300 font-rubik text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
                  Элитный Minecraft Java сервер. Только сильнейшие проходят отбор.<br />Ты следующий?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => navigate("apply")} className="neon-btn px-8 py-4 rounded-xl text-base font-montserrat font-bold uppercase tracking-wider">
                    Подать заявку
                  </button>
                  <button onClick={() => navigate("rules")} className="neon-btn-outline px-8 py-4 rounded-xl text-base uppercase tracking-wider font-montserrat font-bold">
                    Правила
                  </button>
                </div>
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
                <Icon name="ChevronDown" size={28} className="text-cyan-400/60" />
              </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Участников", value: "24", icon: "Users" },
                { label: "Заявок", value: "150+", icon: "FileText" },
                { label: "Дней онлайн", value: "90+", icon: "Zap" },
                { label: "Одобрено", value: "16%", icon: "Trophy" },
              ].map((stat) => (
                <div key={stat.label} className="card-glass rounded-2xl p-6 text-center hover-scale animate-glow-pulse">
                  <Icon name={stat.icon} size={28} className="text-cyan-400 mx-auto mb-2" />
                  <div className="font-montserrat font-black text-3xl neon-text-cyan">{stat.value}</div>
                  <div className="text-gray-400 font-rubik text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto px-4 pb-20">
              <div className="neon-border-purple rounded-2xl p-8 text-center card-glass">
                <div className="text-4xl mb-3">🎮</div>
                <h3 className="font-montserrat font-bold text-xl text-purple-300 mb-2">Вступи в Discord сервер</h3>
                <p className="text-gray-400 font-rubik mb-5">После подачи заявки — обязательно присоединяйся к нашему сообществу</p>
                <a
                  href="https://discord.gg/NHj4qGHM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-montserrat font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
                  style={{ background: "#5865F2", boxShadow: "0 0 20px rgba(88,101,242,0.5)" }}
                >
                  <Icon name="MessageCircle" size={18} />
                  Открыть Discord
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ===== RULES ===== */}
        {page === "rules" && (
          <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="font-montserrat font-black text-4xl neon-text-cyan mb-2">Правила заявки</h2>
              <p className="text-gray-400 font-rubik">Прочитай внимательно перед подачей</p>
            </div>
            <div className="space-y-4">
              {[
                { num: "01", title: "Возраст", text: "Вам должно быть минимум 12 лет", icon: "Calendar" },
                { num: "02", title: "Длительность", text: "Заявка должна длиться не более 2-ух минут", icon: "Clock" },
                { num: "03", title: "Только Java", text: "Вы должны играть только на JAVA. Bedrock и Pojavlauncher не принимаются", icon: "Monitor" },
                { num: "04", title: "О себе", text: "Расскажите о себе — ваши главные качества, навыки в игре. Почему мы должны взять именно Вас?", icon: "User" },
                { num: "05", title: "Уникальность", text: "Самое главное — уникальность. Видео должно быть понятным!", icon: "Star" },
                { num: "06", title: "Описание под видео", text: "В описании обязаны быть: #OnexSmp, ссылка на Discord сервер, ссылка на YouTube канал сервера", icon: "Youtube" },
                { num: "07", title: "После публикации", text: "Скиньте видео-заявку админу сервера в Discord", icon: "Send" },
              ].map((rule) => (
                <div key={rule.num} className="card-glass rounded-2xl p-5 flex gap-4 hover-scale border border-transparent hover:border-cyan-500/30 transition-all">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Icon name={rule.icon} size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-cyan-500/50 font-montserrat font-black text-xs">{rule.num}</span>
                      <span className="font-montserrat font-bold text-white text-sm">{rule.title}</span>
                    </div>
                    <p className="text-gray-400 font-rubik text-sm leading-relaxed">{rule.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button onClick={() => navigate("apply")} className="neon-btn px-8 py-4 rounded-xl font-montserrat font-bold uppercase tracking-wider text-sm">
                Подать заявку
              </button>
            </div>
          </div>
        )}

        {/* ===== APPLY ===== */}
        {page === "apply" && (
          <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="font-montserrat font-black text-4xl neon-text-cyan mb-2">Подача заявки</h2>
              <p className="text-gray-400 font-rubik">Заполни форму после загрузки видео на YouTube</p>
            </div>

            {!applySubmitted ? (
              <div className="card-glass neon-border-cyan rounded-2xl p-8 space-y-5">
                {[
                  { key: "nickname", label: "Никнейм в Minecraft", placeholder: "Твой ник в игре", icon: "Gamepad2" },
                  { key: "age", label: "Возраст", placeholder: "Сколько тебе лет?", icon: "Calendar" },
                  { key: "videoUrl", label: "Ссылка на видео-заявку", placeholder: "https://youtube.com/watch?v=...", icon: "Youtube" },
                  { key: "discord", label: "Discord тег", placeholder: "@username", icon: "MessageCircle" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="flex items-center gap-2 font-rubik text-sm font-medium text-cyan-400 mb-2">
                      <Icon name={field.icon} size={14} />
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={applyForm[field.key as keyof typeof applyForm]}
                      onChange={e => setApplyForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-white placeholder:text-gray-600 text-sm outline-none focus:border-cyan-500/60 focus:bg-cyan-500/5 transition-all"
                    />
                  </div>
                ))}
                <div className="pt-2">
                  <button onClick={handleApply} className="w-full neon-btn py-4 rounded-xl font-montserrat font-bold uppercase tracking-wider text-sm">
                    Отправить заявку
                  </button>
                </div>
                <p className="text-center text-gray-500 font-rubik text-xs">
                  После отправки свяжись с админом в{" "}
                  <a href="https://discord.gg/NHj4qGHM" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">Discord</a>
                </p>
              </div>
            ) : (
              <div className="card-glass neon-border-cyan rounded-2xl p-10 text-center animate-scale-in">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="font-montserrat font-black text-2xl neon-text-green mb-3">Заявка отправлена!</h3>
                <p className="text-gray-400 font-rubik mb-6">
                  Мы рассмотрим её в ближайшее время. Следи за статусом в личном кабинете.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={() => navigate("cabinet")} className="neon-btn px-6 py-3 rounded-xl font-montserrat font-bold text-sm uppercase tracking-wider">
                    Мой кабинет
                  </button>
                  <a
                    href="https://discord.gg/NHj4qGHM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neon-btn-outline px-6 py-3 rounded-xl font-montserrat font-bold text-sm uppercase tracking-wider text-center"
                  >
                    Discord сервер
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== ABOUT ===== */}
        {page === "about" && (
          <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="font-montserrat font-black text-4xl neon-text-cyan mb-2">О сервере</h2>
              <p className="text-gray-400 font-rubik">Всё, что нужно знать о OnexSMP</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {[
                { icon: "Shield", title: "Строгий отбор", text: "Мы принимаем только тех, кто прошёл видео-отбор. Только Java Edition игроки.", color: "cyan" },
                { icon: "Swords", title: "SMP формат", text: "Survival Multiplayer — выживание с реальными людьми, война за ресурсы и союзы.", color: "purple" },
                { icon: "Users", title: "Сообщество", text: "Активный Discord сервер, мероприятия и общение между участниками.", color: "cyan" },
                { icon: "Trophy", title: "Достижения", text: "Лучшие игроки получают особый статус и признание внутри сообщества.", color: "purple" },
              ].map((card) => (
                <div key={card.title} className="card-glass rounded-2xl p-6 hover-scale border border-white/5 hover:border-cyan-500/30 transition-all">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color === "cyan" ? "bg-cyan-500/20" : "bg-purple-500/20"}`}>
                    <Icon name={card.icon} size={22} className={card.color === "cyan" ? "text-cyan-400" : "text-purple-400"} />
                  </div>
                  <h3 className="font-montserrat font-bold text-white text-lg mb-2">{card.title}</h3>
                  <p className="text-gray-400 font-rubik text-sm leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
            <div className="card-glass neon-border-purple rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Link" size={22} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-white text-lg mb-3">Ссылки сервера</h3>
                  <div className="space-y-2">
                    <a href="https://discord.gg/NHj4qGHM" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-400 font-rubik text-sm hover:text-purple-300 transition-colors">
                      <Icon name="MessageCircle" size={14} />
                      Discord: discord.gg/NHj4qGHM
                    </a>
                    <div className="flex items-center gap-2 text-gray-500 font-rubik text-sm">
                      <Icon name="Youtube" size={14} />
                      YouTube канал: скоро
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 font-rubik text-sm">
                      <Icon name="Hash" size={14} />
                      #OnexSmp — тег в описании видео
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== MEMBERS ===== */}
        {page === "members" && (
          <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="font-montserrat font-black text-4xl neon-text-cyan mb-2">Участники</h2>
              <p className="text-gray-400 font-rubik">Игроки, прошедшие отбор на OnexSMP</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {MOCK_PLAYERS.filter(p => p.status === "approved").map((player, i) => (
                <div key={player.nickname} className="card-glass rounded-2xl p-5 hover-scale border border-white/5 hover:border-cyan-500/30 transition-all animate-fade-in" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center">
                      <span className="font-montserrat font-black text-sm neon-text-cyan">{player.nickname[0]}</span>
                    </div>
                    <div>
                      <div className="font-montserrat font-bold text-white text-sm">{player.nickname}</div>
                      <div className="text-gray-500 font-rubik text-xs">{player.date}</div>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-rubik font-medium ${statusClass(player.status)}`}>
                    <Icon name="CheckCircle" size={11} />
                    {statusLabel(player.status)}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-montserrat font-bold text-white text-lg mb-4 flex items-center gap-2">
                <Icon name="Clock" size={18} className="text-yellow-400" />
                На рассмотрении
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_PLAYERS.filter(p => p.status === "pending").map((player) => (
                  <div key={player.nickname} className="card-glass rounded-2xl p-5 border border-yellow-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                        <span className="font-montserrat font-black text-sm text-yellow-400">{player.nickname[0]}</span>
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-white text-sm">{player.nickname}</div>
                        <div className="text-gray-500 font-rubik text-xs">{player.date}</div>
                      </div>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-rubik font-medium ${statusClass(player.status)}`}>
                      <Icon name="Clock" size={11} />
                      {statusLabel(player.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== CABINET ===== */}
        {page === "cabinet" && (
          <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="font-montserrat font-black text-4xl neon-text-cyan mb-2">Личный кабинет</h2>
              <p className="text-gray-400 font-rubik">Введи свой игровой никнейм, чтобы проверить статус заявки</p>
            </div>

            {!loggedPlayer ? (
              <div className="card-glass neon-border-cyan rounded-2xl p-8">
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 font-rubik text-sm font-medium text-cyan-400 mb-2">
                      <Icon name="Gamepad2" size={14} />
                      Никнейм в Minecraft
                    </label>
                    <input
                      type="text"
                      placeholder="Введи свой никнейм..."
                      value={loginNick}
                      onChange={e => { setLoginNick(e.target.value); setLoginError(""); }}
                      onKeyDown={e => e.key === "Enter" && handleLogin()}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-white placeholder:text-gray-600 text-sm outline-none focus:border-cyan-500/60 transition-all"
                    />
                    {loginError && (
                      <p className="text-red-400 font-rubik text-xs mt-2 flex items-center gap-1">
                        <Icon name="AlertCircle" size={12} />
                        {loginError}
                      </p>
                    )}
                  </div>
                  <button onClick={handleLogin} className="w-full neon-btn py-3.5 rounded-xl font-montserrat font-bold text-sm uppercase tracking-wider">
                    Проверить статус
                  </button>
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 text-center">
                  <p className="text-gray-500 font-rubik text-sm">Ещё не подавал заявку?</p>
                  <button onClick={() => navigate("apply")} className="text-cyan-400 font-rubik text-sm hover:text-cyan-300 transition-colors mt-1 underline underline-offset-2">
                    Подать заявку
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-scale-in space-y-5">
                <div className="card-glass neon-border-cyan rounded-2xl p-7">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center animate-glow-pulse">
                      <span className="font-montserrat font-black text-2xl neon-text-cyan">{loggedPlayer.nickname[0]}</span>
                    </div>
                    <div>
                      <div className="font-montserrat font-black text-xl text-white">{loggedPlayer.nickname}</div>
                      <div className="text-gray-500 font-rubik text-sm">Дата подачи: {loggedPlayer.date}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                      <span className="text-gray-400 font-rubik text-sm flex items-center gap-2">
                        <Icon name="FileText" size={14} />
                        Статус заявки
                      </span>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-rubik font-bold ${statusClass(loggedPlayer.status)}`}>
                        <Icon name={loggedPlayer.status === "approved" ? "CheckCircle" : loggedPlayer.status === "pending" ? "Clock" : "XCircle"} size={12} />
                        {statusLabel(loggedPlayer.status)}
                      </div>
                    </div>

                    {loggedPlayer.status === "pending" && (
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3">
                        <p className="text-yellow-300 font-rubik text-sm">⏳ Твоя заявка на рассмотрении. Ожидай ответа в Discord.</p>
                      </div>
                    )}
                    {loggedPlayer.status === "approved" && (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                        <p className="text-green-300 font-rubik text-sm">🎉 Поздравляем! Ты принят. Зайди в Discord за инструкциями.</p>
                      </div>
                    )}
                    {loggedPlayer.status === "rejected" && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                        <p className="text-red-300 font-rubik text-sm">К сожалению, твоя заявка не прошла. Попробуй снова через 30 дней.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://discord.gg/NHj4qGHM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-montserrat font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
                    style={{ background: "#5865F2", boxShadow: "0 0 15px rgba(88,101,242,0.4)" }}
                  >
                    <Icon name="MessageCircle" size={16} />
                    Discord сервер
                  </a>
                  <button
                    onClick={() => { setLoggedPlayer(null); setLoginNick(""); }}
                    className="flex-1 neon-btn-outline py-3 rounded-xl font-montserrat font-bold text-sm uppercase tracking-wider"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-white/5 mt-12 py-8 text-center">
          <div className="font-montserrat font-black text-lg mb-1">
            <span className="neon-text-cyan">ONEX</span>
            <span className="text-purple-400">SMP</span>
          </div>
          <p className="text-gray-600 font-rubik text-xs mb-3">Minecraft Java Edition · Только лучшие</p>
          <a href="https://discord.gg/NHj4qGHM" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-400 transition-colors inline-block">
            <Icon name="MessageCircle" size={18} />
          </a>
        </footer>
      </div>
    </div>
  );
}
