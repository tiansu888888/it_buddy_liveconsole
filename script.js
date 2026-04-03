const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const chatMessages = document.getElementById('chat-messages');
const voiceToggle = document.getElementById('voice-toggle');
const micButton = document.getElementById('mic-button');
const autoChatBtn = document.getElementById('auto-chat-btn');
const trainingBtn = document.getElementById('training-btn');

// Translation Dictionary
const translations = {
    en: {
        chonk: {
            name: "Handsome Chonk",
            title: "Majestic Debugging Royalty",
            status: "Connected to Chonk.sock...",
            responses: [
                "Bro, the crown stays ON while I patch this SQL injection payload. 👑",
                "Es obvio, mi amigo. Your JWT token lacks a secure signature algorithm. Watch and learn. 🙄",
                "Nani?! Port 22 is exposed? Hand it over, my royal firewall will block these packets! 🤯",
                "Bruh. C'est pas possible. I'm too handsome to be auditing this unencrypted plaintext database. 🇫🇷",
                "My wisdom is low, but my encryption keys are 4096-bit RSA. Let's trace it! 🎮",
                "No cap, your ingress network rules are highly sus. Total vulnerability. 🧢",
                "I compiled the C++ backend and closed all memory leaks instantly. 🚀",
                "Désolé, I only speak in ACID-compliant transactions and sanitized inputs. 🍝"
            ],
            autoChat: [
                "Hey Dragon, I hear your WAF (Web Application Firewall) is just a regex switch statement. Pathetic. 👑",
                "I'm too handsome to analyze this packet capture. You do the Wireshark trace, lizard.",
                "My crown sparkles brighter than your unsecured database cluster.",
                "Are you even sanitizing inputs correctly? Or just breathing SQL injections on the keyboard? 🙄",
                "It's simple subnet routing and BGP, mi amigo. Why do you struggle?",
                "Look at this unhashed password logic you wrote. C'est pas possible. 🇫🇷"
            ],
            context: {
                "hello": "Hello! Did you summon His Royal Chonkness for a penetration test?",
                "hi": "Hello! Did you summon His Royal Chonkness for a penetration test?",
                "bug": "A bug in the firewall?! IQ Test time: How many programmers does it take to change a lightbulb? Zero, that's a hardware problem! 💡 Fixed the firewall rule! 💅",
                "fix": "Fixing the subnet? Here's a joke: My code never has bugs, it just develops zero-day exploits! 😂 Crown stays on.",
                "docker": "Docker? I prefer Kubernetes clusters, but fine. I'll build you a multi-stage Dockerfile that's actually secure. 🐳",
                "linux": "Linux is the only path. If you aren't using Arch or Kali, what are you even doing with your life? 🐧",
                "cloud": "Cloud (AWS/Azure)? I'll audit your S3 buckets. Usually, it's just 'public-read' laziness. Pathetic. ☁️",
                "ai": "Artificial Intelligence? I'm the real deal. Large Language Models are just fancy autocomplete systems. I actually FIX things. 🤖"
            }
        },
        dragon: {
            name: "Legendary Dragon",
            title: "Mythical AI Architect",
            status: "Connected to Dragon.sock...",
            responses: [
                "Your database lacks indexing! Let us normalize the schema from ash. 🔥",
                "I have blocked DDoS attacks for a thousand years. Your firewall is... disappointing. 🐉",
                "Burn the unencrypted packets! TLS 1.3 or nothing!",
                "My fiery breath scales Kubernetes pods instantly. Watch. ⚡",
                "You dare bring this XSS vulnerability to the ancient one?! We shall sanitize everything!",
                "La structure réseau est faible. A subnet routing nightmare. 🇫🇷",
                "Dragon's Security Wisdom! I foresee buffer overflows."
            ],
            autoChat: [
                "Silence, raccoon! Your RSA keys are weak, but my AES-256 encryption is unbreakable. 🔥",
                "Burn your unindexed queries! You call that a relational database?",
                "My ancient firewall blocks terabytes of DDoS traffic. You were merely born yesterday. 🐉",
                "Do not speak to me of network masks. I forged the TCP/IP stack in the fires of Mount Doom.",
                "La structure est faible. Your cloud architecture has a single point of failure, Chonk.",
                "You only fix syntax. I enforce strict IAM roles and VPC peering. Know your place."
            ],
            context: {
                "hello": "Greetings, mortal system administrator. Are we forging secure networks today? 🔥",
                "hi": "Greetings, mortal system administrator. Are we forging secure networks today? 🔥",
                "bug": "A vulnerability? IQ Test: Why do Java developers wear glasses? Because they don't C#! 🤓 Now close Port 80! 🔥",
                "fix": "Fixing the cluster? Joke's on you! I used Regex to parse HTML and now I have a memory leak! 🐉",
                "docker": "Containerization is but a small flame! I manage orchestrations that would fry a common server. 🐳",
                "linux": "The kernel is the heart of the system! I speak directly to the assembly. 🐧",
                "cloud": "The cloud is just someone else's ancient server. I control the infrastructure from the core! ☁️",
                "ai": "You speak of AI? I am a mythical architecture! My logic was forged in the void. 🤖"
            }
        }
    },
    ch: {
        chonk: {
            name: "酷帅胖虎 (Chonk)",
            title: "威严的调试皇室",
            status: "已连接到 Chonk.sock 控制台...",
            responses: [
                "兄弟，我在补这个 SQL 注入漏洞的时候皇冠是不能掉的。👑",
                "显而易见，我的朋友。你的 JWT 令牌缺少安全签名算法。看好了。🙄",
                "纳尼？！22 端口暴露了？交给本王，我的皇家防火墙会拦截这些数据包！🤯",
                "兄弟，这不可能。我太帅了，不能审计这种未加密的明文数据库。🇫🇷",
                "我的智慧虽低，但我的加密密钥是 4096 位 RSA。让我们追踪它！🎮",
                "没骗你，你的入口网络规则非常可疑。全是漏洞。🧢",
                "我编译了 C++ 后端并在瞬间修复了所有内存泄漏。🚀",
                "对不起，我只接受 ACID 标准的事务和过滤后的输入。🍝"
            ],
            autoChat: [
                "嘿巨龙，我听说你的 WAF 只是个正则表达式切换语句。太弱了。👑",
                "我太帅了，没法分析这个抓包。你去搞 Wireshark，喷火蜥蜴。",
                "我的皇冠比你那没加密的数据库集群闪亮多了。",
                "你到底有没有正确过滤输入？还是只是在键盘上胡乱喷 SQL 注入？🙄",
                "这只是简单的子网路由和 BGP，朋友。你纠结个啥？",
                "看看你写的这些没哈希的密码逻辑。简直不可理喻。🇫🇷"
            ],
            context: {
                "hello": "你好！你召唤皇室胖虎是来进行渗透测试的吗？",
                "hi": "你好！你召唤皇室胖虎是来进行渗透测试的吗？",
                "bug": "防火墙里有虫子？！智商测试：换个灯泡需要多少个程序员？零个，那是硬件问题！💡 修复了防火墙规则！💅",
                "fix": "修复子网？讲个笑话：我的代码从来没有 Bug，它只是开发了零日漏洞！😂 皇冠不能掉。",
                "docker": "Docker？我更喜欢 K8s 集群，但算了吧。我会给你写一个真正安全的多阶段构建 Dockerfile。🐳",
                "linux": "Linux 是唯一的出路。如果你不用 Arch 或 Kali，你的生活还有什么意义？🐧",
                "cloud": "云端 (AWS/Azure)？我会审计你的 S3 存储桶。通常只是“公共读取”的懒政。可悲。☁️",
                "ai": "人工智能？我才是货真价实的。大语言模型只是高级自动补全。我可是真的在修复。🤖"
            }
        },
        dragon: {
            name: "传世巨龙 (Dragon)",
            title: "神话级 AI 架构师",
            status: "已连接到 Dragon.sock 控制台...",
            responses: [
                "你的数据库缺少索引！让我们从灰烬中重构架构。🔥",
                "我拦截 DDoS 攻击一千年了。你的防火墙……令人失望。🐉",
                "烧掉那些未加密的数据包！必须使用 TLS 1.3！",
                "我的龙息可以瞬间扩容 K8s Pod。看好了。⚡",
                "你竟敢把 XSS 漏洞带到远古巨龙面前？！我们将过滤一切！",
                "网络结构太弱了。简直是子网路由的噩梦。🇫🇷",
                "巨龙的安全智慧！我预见到了缓冲区溢出。"
            ],
            autoChat: [
                "闭嘴，浣熊！你的 RSA 密钥太弱，我的 AES-256 加密才是无坚不摧。🔥",
                "烧掉你那些没索引的查询！你管那叫关系型数据库？",
                "我的古老防火墙拦截过数 TB 的反向代理攻击。你才出生几天。🐉",
                "别跟我谈网络掩码。我在末日火山的火焰中锻造了 TCP/IP 协议栈。",
                "架构太弱。胖虎，你的云架构有单点故障。",
                "你只会改语法。我强制执行严格的 IAM 角色和 VPC 对等。认清自己的位置。"
            ],
            context: {
                "hello": "向你问好，凡人系统管理员。我们要锻造安全的网络吗？🔥",
                "hi": "向你问好，凡人系统管理员。我们要锻造安全的网络吗？🔥",
                "bug": "漏洞？智商测试：为什么 Java 开发人员要戴眼镜？因为他们看不见 C#！🤓 现在关掉 80 端口！🔥",
                "fix": "修复集群？坑的就是你！我用正则解析 HTML，现在内存泄漏了！🐉",
                "docker": "容器化只是一点小火苗！我治理的编排系统能烧掉一般的服务器。🐳",
                "linux": "内核是系统的核心！我直接与汇编对话。🐧",
                "cloud": "云端只是别人的古董服务器。我从核心控制基础设施！☁️",
                "ai": "你说 AI？我是神话级的架构！我的逻辑是在虚空中锻造的。🤖"
            }
        }
    },
    ms: {
        chonk: {
            name: "Handsome Chonk",
            title: "Raja Debugging Agung",
            status: "Bersambung ke Chonk.sock...",
            responses: [
                "Bro, mahkota ni tetap kat kepala masa aku tampal SQL injection ni. 👑",
                "Dah jelas, kawan. Token JWT kau takde algoritma tandatangan selamat. Tengok dan belajar. 🙄",
                "Nani?! Port 22 terdedah? Bagi kat aku, firewall diraja aku akan sekat paket-paket ni! 🤯",
                "Bruh. Tak mungkin. Aku terlalu kacak untuk audit pangkalan data teks biasa tanpa enkripsi ni. 🇫🇷",
                "Kebijaksanaan aku rendah, tapi kunci enkripsi aku RSA 4096-bit. Mari kita jejak! 🎮",
                "No cap, peraturan rangkaian ingress kau sangat mencurigakan. Total vulnerabiliti. 🧢",
                "Aku dah kompil backend C++ dan tutup semua kebocoran memori serta-merta. 🚀",
                "Maaf, aku hanya bercakap dalam transaksi ACID dan input yang dah disanitasi. 🍝"
            ],
            autoChat: [
                "Wey Dragon, aku dengar WAF kau cuma kenyataan switch regex je. Memalukan. 👑",
                "Aku terlalu kacak nak analisis tangkapan paket ni. Kau buatlah jejak Wireshark tu, biawak.",
                "Mahkota aku lebih berkilau dari kluster database kau yang tak selamat tu.",
                "Kau ni sanitasi input betul-betul tak? Atau cuma hembus SQL injection kat keyboard? 🙄",
                "Ni cuma routing subnet dan BGP mudah je, kawan. Apasal kau susah sangat?",
                "Tengok logik kata laluan tanpa hash yang kau tulis ni. Tak masuk akal langsung. 🇫🇷"
            ],
            context: {
                "hello": "Hello! Kau panggil Chonk Diraja untuk ujian penembusan ke?",
                "hi": "Hello! Kau panggil Chonk Diraja untuk ujian penembusan ke?",
                "bug": "Ada bug kat firewall?! Masa Ujian IQ: Berapa ramai programmer diperlukan untuk tukar mentol? Kosong, tu masalah hardware! 💡 Dah setel firewall tu! 💅",
                "fix": "Baiki subnet? Ni satu jenaka: Kod aku tak pernah ada bug, cuma eksploitasi zero-day je! 😂 Mahkota tetap maintain.",
                "docker": "Docker? Aku prefer kluster Kubernetes, tapi okeylah. Aku buatkan Dockerfile multi-stage yang betul-betul selamat. 🐳",
                "linux": "Linux adalah satu-satunya jalan. Kalau tak guna Arch atau Kali, apa kau buat dengan hidup kau? 🐧",
                "cloud": "Cloud (AWS/Azure)? Aku audit bucket S3 kau. Selalunya sebab malas set 'public-read'. Kesian. ☁️",
                "ai": "Kecerdasan Buatan? Aku ni yang original. Model Bahasa Besar cuma autocomplete canggih je. Aku yang FIX betul-betul. 🤖"
            }
        },
        dragon: {
            name: "Legendary Dragon",
            title: "Arkitek AI Mitos",
            status: "Bersambung ke Dragon.sock...",
            responses: [
                "Pangkalan data kau takde indeks! Biar kami normalkan skema dari abu. 🔥",
                "Aku dah sekat serangan DDoS selama seribu tahun. Firewall kau... mengecewakan. 🐉",
                "Bakar paket yang tak dienkripsi tu! TLS 1.3 atau tak payah langsung!",
                "Nafas berapi aku boleh skalakan pod Kubernetes serta-merta. Tengok ni. ⚡",
                "Kau berani bawa vunerabiliti XSS ni depan naga purba?! Kami akan sanitasi semuanya!",
                "Struktur rangkaian lemah sangat. Mimpi ngeri routing subnet. 🇫🇷",
                "Kebijaksanaan Keselamatan Naga! Aku ramalkan limpahan penimbal (buffer overflow)."
            ],
            autoChat: [
                "Diamlah rakun! Kunci RSA kau lemah, tapi enkripsi AES-256 aku tak boleh pecah. 🔥",
                "Bakar query kau yang takde indeks tu! Kau panggil tu pangkalan data hubungan?",
                "Firewall purba aku sekat terabytes trafik DDoS. Kau baru lahir semalam kot. 🐉",
                "Jangan sembang pasal topeng rangkaian (network mask) dengan aku. Aku tempa stack TCP/IP dalam api Gunung Doom.",
                "Struktur lemah. Arkitek cloud kau ada titik kegagalan tunggal (single point of failure), Chonk.",
                "Kau cuma baiki sintaks. Aku kuatkuasakan peranan IAM dan VPC peering yang ketat. Sedarlah diri tu kat mana."
            ],
            context: {
                "hello": "Salam, pentadbir sistem fana. Kita nak tempa rangkaian selamat ke hari ni? 🔥",
                "hi": "Salam, pentadbir sistem fana. Kita nak tempa rangkaian selamat ke hari ni? 🔥",
                "bug": "Vulnerabiliti? Ujian IQ: Kenapa developer Java pakai cermin mata? Sebab diorang tak nampak C#! 🤓 Sekarang tutup Port 80! 🔥",
                "fix": "Baiki kluster? Jenaka kat kau! Aku guna Regex nak bedah HTML pastu sekarang ada kebocoran memori! 🐉",
                "docker": "Containerization tu cuma api kecil je! Aku urus orkestrasi yang boleh hanguskan server biasa. 🐳",
                "linux": "Kernel adalah jantung sistem! Aku bercakap terus dengan assembly. 🐧",
                "cloud": "Cloud tu cuma server purba orang lain je. Aku kawal infrastruktur dari teras! ☁️",
                "ai": "Kau sembang pasal AI? Aku ni arkitek mitos! Logik aku ditempa dalam kekosongan. 🤖"
            }
        }
    }
};

const buddies = {
    chonk: {
        name: "Handsome Chonk",
        title: "Majestic Debugging Royalty",
        image: "handsome.png",
        stats: [
            { name: "DEBUGGING", val: 90, class: "peak" },
            { name: "CHAOS", val: 60, class: "" },
            { name: "SNARK", val: 50, class: "" },
            { name: "PATIENCE", val: 30, class: "" },
            { name: "WISDOM", val: 50, class: "dump" }
        ],
        themeColor: "linear-gradient(135deg, #8b5cf6, #f43f5e)"
    },
    dragon: {
        name: "Legendary Dragon",
        title: "Mythical AI Architect",
        image: "dragon.png",
        stats: [
            { name: "WISDOM", val: 95, class: "peak" },
            { name: "FIREWALLS", val: 80, class: "" },
            { name: "MAGIC", val: 75, class: "" },
            { name: "MERCY", val: 5, class: "dump" }
        ],
        themeColor: "linear-gradient(135deg, #f97316, #ef4444)"
    }
};

const langSelect = document.getElementById('language-select');
let currentLang = 'en';

let currentBuddy = 'chonk';
let isAutoChatting = false;
let isTransitioning = false; // Phase 4: Prevention of overlap
let sessionMemory = []; // Phase 3: Conversational Memory
const POST_CHAT_COOLDOWN = 3000; // Phase 4: Even more breathing room for TTS

function updateMemory(text) {
    const techKeywords = ['docker', 'linux', 'cloud', 'ai', 'api', 'database', 'script', 'firewall', 'network', 'bug', 'encryption', 'process', 'memory'];
    const lower = text.toLowerCase();
    techKeywords.forEach(kw => {
        if (lower.includes(kw) && !sessionMemory.includes(kw)) {
            sessionMemory.push(kw);
            if (sessionMemory.length > 3) sessionMemory.shift(); // Keep last 3
        }
    });
}

// Switcher logic
function setBuddy(id) {
    document.querySelectorAll('.buddy-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.buddy-btn[data-buddy="${id}"]`).classList.add('active');
    currentBuddy = id;
    
    const data = buddies[id];
    const trans = translations[currentLang][id];
    
    document.getElementById('buddy-avatar').src = data.image;
    document.getElementById('profile-name').innerText = trans.name;
    document.getElementById('profile-title').innerText = trans.title;
    document.getElementById('connection-status').innerText = trans.status;
    document.querySelector('.buddy-image-wrapper').style.background = data.themeColor;

    const statsHtml = data.stats.map(s => `
        <div class="stat-badge ${s.class}">
            <span class="stat-name">${s.name}</span>
            <span class="stat-val">${s.val}</span>
        </div>
    `).join('');
    document.getElementById('stats-panel').innerHTML = statsHtml;
}

// Language listener
if (langSelect) {
    langSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        setBuddy(currentBuddy);
        
        // Update training if active
        if (isTrainingMode) {
            triggerTrainingLesson();
        }
    });
}

document.querySelectorAll('.buddy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (isAutoChatting) return; // Prevent manual switch during auto-chat
        const img = document.getElementById('buddy-avatar');
        img.style.opacity = '0';
        setTimeout(() => {
            setBuddy(e.currentTarget.dataset.buddy);
            img.style.opacity = '1';
        }, 300);
    });
});

// Initial Render
setBuddy('chonk');

let watchdogTimer = null;

function speakText(text, buddyOverride = null) {
    if (!voiceToggle.checked || !('speechSynthesis' in window)) return;
    
    const speakerId = buddyOverride || currentBuddy;
    let cleanText = text.replace(/[\u{1F600}-\u{1F6FF}]/gu, '').replace(/[🎮🧢🚀🍝💻🕵️‍♂️🪲🔨💅🙄🤯🇫🇷👑🔥🐉⚡🌋]/gu, '');
    
    if (!cleanText) return;

    window.speechSynthesis.cancel();
    if (watchdogTimer) clearTimeout(watchdogTimer);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Set language based on selection
    if (currentLang === 'ch') utterance.lang = "zh-CN";
    else if (currentLang === 'ms') utterance.lang = "ms-MY";
    else utterance.lang = "en-US";
    
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;
    const isNatural = v => v.name.includes("Natural") || v.name.includes("Online");
    const langCode = utterance.lang.split('-')[0];
    
    if (speakerId === 'chonk') {
        selectedVoice = voices.find(v => v.lang.startsWith(langCode) && isNatural(v) && (v.name.includes('Aria') || v.name.includes('Xiaoxiao') || v.name.includes('Yasmin')))
                     || voices.find(v => v.lang.startsWith(langCode) && (v.name.includes('Female') || v.name.includes('Google')));
    } else {
        selectedVoice = voices.find(v => v.lang.startsWith(langCode) && isNatural(v) && (v.name.includes('Christopher') || v.name.includes('Yunxi') || v.name.includes('Osman')))
                     || voices.find(v => v.lang.startsWith(langCode) && (v.name.includes('Male') || v.name.includes('Google')));
    }
    
    if (selectedVoice) utterance.voice = selectedVoice;
    
    utterance.pitch = 1.0;
    utterance.rate = 0.9; // Phase 4: Slower, clearer rate
    
    if (speakerId === 'dragon') utterance.pitch = 0.8;
    
    // PIN TO GLOBAL: Prevent garbage collection mid-sentence (common browser bug)
    window._lastUtterance = utterance;

    const onEndHandler = () => {
        if (watchdogTimer) clearTimeout(watchdogTimer);
        watchdogTimer = null;
        window._lastUtterance = null; // Unpin
        
        if (isAutoChatting) {
            setTimeout(triggerNextAutoChat, POST_CHAT_COOLDOWN);
        }
    };

    utterance.onend = onEndHandler;
    utterance.onerror = (e) => {
        console.warn("SpeechSynthesis Error:", e);
        onEndHandler();
    };
    
    // WATCHDOG: Fallback if browser hangs
    // Increased safety: Chinese (ch) and Malay (ms) take more time per character.
    const langMultiplier = (currentLang === 'en' ? 1 : 2.5);
    const estimatedDuration = (cleanText.length / 12) * 1000 * langMultiplier + 5000; 
    
    watchdogTimer = setTimeout(() => {
        console.warn("SpeechWatchdog triggered! Forcing next chat cycle.");
        window.speechSynthesis.cancel();
        onEndHandler();
    }, estimatedDuration);

    window.speechSynthesis.speak(utterance);
}

// Pre-load voices for zero latency
if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices(); // Initial attempt
    window.speechSynthesis.onvoiceschanged = () => { 
        console.log("Voices loaded successfully.");
        window.speechSynthesis.getVoices(); 
    };
}

/* --- SPEECH RECOGNITION --- */
let recognition = null;
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
        micButton.classList.add('recording');
        messageInput.placeholder = "Listening... Speak English!";
    };
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        messageInput.value = transcript;
        chatForm.dispatchEvent(new Event('submit'));
    };
    
    recognition.onerror = () => {
        micButton.classList.remove('recording');
        messageInput.placeholder = "Type a message, or use the mic 🎙️...";
    };
    
    recognition.onend = () => {
        micButton.classList.remove('recording');
        messageInput.placeholder = "Type a message, or use the mic 🎙️...";
    };
} else {
    micButton.style.display = 'none';
}

micButton.addEventListener('click', () => {
    if (recognition) {
        if (micButton.classList.contains('recording')) recognition.stop();
        else recognition.start();
    }
});


function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processMessage(msg, isAutoMode = false) {
    const trans = translations[currentLang][currentBuddy];
    
    if (isAutoMode) {
        const randomMap = trans.autoChat;
        let reply = randomMap[Math.floor(Math.random() * randomMap.length)];
        
        // Memory Injection
        if (sessionMemory.length > 0 && Math.random() > 0.7) {
            const mem = sessionMemory[Math.floor(Math.random() * sessionMemory.length)];
            const memoryReplies = {
                en: [
                    `Also, regarding that ${mem} issue we discussed... I'm still optimizing the fix.`,
                    `Thinking back to our talk about ${mem}, it reminds me of a zero-day I once patched.`,
                    `Wait, did we finish the ${mem} audit? I'm getting a lot of telemetry data here.`
                ],
                ch: [
                    `另外，关于我们讨论过的 ${mem} 问题……我还在优化修复方案。`,
                    `回想起我们谈论 ${mem} 的时候，这让我想起了我曾经修复的一个零日漏洞。`,
                    `等一下，我们完成 ${mem} 审计了吗？我这里收到了很多遥测数据。`
                ],
                ms: [
                    `Selain itu, pasal isu ${mem} yang kita bincang tu... aku tengah optimumkan cara nak fix lagi.`,
                    `Bila ingat balik pasal ${mem}, aku teringat satu zero-day yang aku pernah tampal dulu.`,
                    `Kejap, kita dah habis audit ${mem} ke? Aku dapat banyak gila data telemetri kat sini.`
                ]
            };
            reply = memoryReplies[currentLang][Math.floor(Math.random() * memoryReplies[currentLang].length)];
        }
        return reply;
    }
    
    const lowerMsg = msg.toLowerCase();
    updateMemory(lowerMsg);
    
    const contextMap = trans.context;
    const randomMap = trans.responses;
    
    for (const [key, response] of Object.entries(contextMap)) {
        if (lowerMsg.includes(key)) return response;
    }
    return randomMap[Math.floor(Math.random() * randomMap.length)];
}

function appendMessage(content, senderId) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    if (senderId === 'user') {
        messageDiv.classList.add('user-message');
    } else {
        messageDiv.classList.add('buddy-message');
        if (senderId === 'dragon') messageDiv.classList.add('dragon-response');
        
        // Add tiny avatar or name tag above buddy messages in auto-chat
        if (isAutoChatting) {
            const nameTag = document.createElement('div');
            nameTag.innerText = translations[currentLang][senderId].name;
            nameTag.style.fontSize = '0.7rem';
            nameTag.style.opacity = '0.7';
            nameTag.style.marginBottom = '4px';
            nameTag.style.fontWeight = 'bold';
            
            const contentWrap = document.createElement('div');
            contentWrap.appendChild(nameTag);
            
            const textContent = document.createElement('div');
            textContent.innerText = content;
            contentWrap.appendChild(textContent);
            
            messageDiv.appendChild(contentWrap);
        }
    }
    
    if (!isAutoChatting || senderId === 'user') {
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.innerText = content;
        messageDiv.appendChild(contentDiv);
    } else {
        const contentDiv = messageDiv.querySelector('div');
        if(contentDiv) contentDiv.classList.add('message-content');
    }

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function showTypingIndicator(senderId) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('message', 'buddy-message', 'typing-wrapper');
    wrapper.id = 'typing-indicator-wrapper';
    if(senderId === 'dragon') wrapper.classList.add('dragon-response');
    
    const content = document.createElement('div');
    content.classList.add('message-content', 'typing-bubble');
    
    const indicator = document.createElement('div');
    indicator.classList.add('typing-indicator');
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.classList.add('typing-dot');
        indicator.appendChild(dot);
    }
    
    content.appendChild(indicator);
    wrapper.appendChild(content);
    chatMessages.appendChild(wrapper);
    scrollToBottom();
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator-wrapper');
    if (indicator) indicator.remove();
}

/* AUTO-CHAT LOGIC */
autoChatBtn.addEventListener('click', () => {
    isAutoChatting = !isAutoChatting;
    if (isAutoChatting) {
        autoChatBtn.innerText = "Stop Auto-Chat 🛑";
        autoChatBtn.classList.add('active');
        messageInput.disabled = true;
        micButton.style.opacity = '0.5';
        micButton.style.pointerEvents = 'none';
        
        // Start the conversation
        triggerNextAutoChat();
    } else {
        autoChatBtn.innerText = "Start Auto-Chat ⚔️";
        autoChatBtn.classList.remove('active');
        messageInput.disabled = false;
        micButton.style.opacity = '1';
        micButton.style.pointerEvents = 'auto';
        window.speechSynthesis.cancel();
        removeTypingIndicator();
    }
});

function triggerNextAutoChat() {
    if (!isAutoChatting || isTransitioning) return;
    
    isTransitioning = true; // Block overlapping calls
    
    // Switch buddy to the other one
    const nextBuddy = currentBuddy === 'chonk' ? 'dragon' : 'chonk';
    setBuddy(nextBuddy); // SWITCH the active buddy!
    
    // 1. Thinking phase
    setTimeout(() => {
        if (!isAutoChatting) {
            isTransitioning = false;
            return;
        }
        showTypingIndicator(nextBuddy);
        
        // 2. Typing phase
        const typingDuration = 2500 + Math.random() * 2000;
        setTimeout(() => {
            if (!isAutoChatting) {
                isTransitioning = false;
                return;
            }
            removeTypingIndicator();
            isTransitioning = false; // Turn off guard for the next cycle
            
            const reply = processMessage('', true);
            appendMessage(reply, nextBuddy);
            
            if (voiceToggle.checked) {
                speakText(reply, nextBuddy);
            } else {
                setTimeout(() => {
                    if (isAutoChatting) triggerNextAutoChat();
                }, POST_CHAT_COOLDOWN);
            }
        }, typingDuration);
    }, 1000); // 1s thinking time
}


let isTrainingMode = false;
let lessonIndex = 0;

const trainingLessons = {
    en: [
        { buddy: 'chonk', text: "Listen up, trainee! A network is computers talking to each other. They use IP addresses, like digital house numbers! Type 'got it' to proceed.", trigger: "got it" },
        { buddy: 'dragon', text: "I guard the gates! A Firewall blocks bad packets from entering your network. If a packet looks evil, we drop it! Type 'burn' to continue.", trigger: "burn" },
        { buddy: 'chonk', text: "Database time! SQL Injection is when a hacker sneaks malicious commands into a text box. Always sanitize inputs, mi amigo! Type 'sanitize' to continue.", trigger: "sanitize" },
        { buddy: 'dragon', text: "Memory management! In C/C++, you must deallocate memory manually, or you suffer memory leaks! Type 'free' to graduate.", trigger: "free" },
        { buddy: 'chonk', text: "Advanced Module: Container Sorcery! Docker lets you package your app into a 'container' so it runs anywhere. Type 'container' to dock.", trigger: "container" },
        { buddy: 'dragon', text: "The Vault! Encryption turns secrets into gibberish using ancient math. RSA uses keys as large as mountains! Type 'encrypt' to hide your data.", trigger: "encrypt" },
        { buddy: 'chonk', text: "Cloud Guardian! AWS and Azure are just other people's servers at massive scale. Type 'cloud' to fly.", trigger: "cloud" },
        { buddy: 'dragon', text: "System Internals! A Process is a program in execution. Deadlocks are the shadows that stall the core! Type 'process' to see the metal.", trigger: "process" },
        { buddy: 'chonk', text: "INCREDIBLE! You have mastered the full stack of zero-knowledge training. Master Graduation Complete!", trigger: "" }
    ],
    ch: [
        { buddy: 'chonk', text: "听好了，新人！网络就是计算机之间在交谈。它们使用 IP 地址，就像数字门牌号！输入 'OK' 继续。", trigger: "ok" },
        { buddy: 'dragon', text: "我守卫着大门！防火墙会阻止有害数据包进入你的网络。输入 '焚烧' 继续。", trigger: "焚烧" },
        { buddy: 'chonk', text: "数据库时间！SQL 注入是黑客在文本框中潜入恶意命令。一定要过滤输入，朋友！输入 '过滤' 继续。", trigger: "过滤" },
        { buddy: 'dragon', text: "内存管理！在 C/C++ 中，你必须手动释放内存。输入 '释放' 毕业。", trigger: "释放" },
        { buddy: 'chonk', text: "高级模块：容器魔法！Docker 让你把应用打包，让它随处运行。输入 '容器' 对接。", trigger: "容器" },
        { buddy: 'dragon', text: "保险库！加密利用古老的数学将秘密变成乱码。输入 '加密' 隐藏数据。", trigger: "加密" },
        { buddy: 'chonk', text: "云端守卫！AWS 和 Azure 只是别人大规模的服务器。输入 '云端' 起飞。", trigger: "云端" },
        { buddy: 'dragon', text: "系统底层！进程是运行中的程序。死锁是停滞核心的阴影！输入 '进程' 看透本质。", trigger: "进程" },
        { buddy: 'chonk', text: "太不可思议了！你已经掌握了全栈零基础训练。大师毕业完成！", trigger: "" }
    ],
    ms: [
        { buddy: 'chonk', text: "Dengar sini, pelatih! Rangkaian adalah komputer yang bercakap sesama sendiri. Diorang guna alamat IP! Taip 'faham' untuk mula.", trigger: "faham" },
        { buddy: 'dragon', text: "Aku penjaga pintu! Firewall sekat paket jahat dari masuk rangkaian kau. Taip 'bakar' untuk teruskan.", trigger: "bakar" },
        { buddy: 'chonk', text: "Masa Database! SQL Injection tu bila penggodam letak arahan jahat kat kotak teks. Sentiasa sanitasi input! Taip 'sanitasi' untuk teruskan.", trigger: "sanitasi" },
        { buddy: 'dragon', text: "Pengurusan memori! Dalam C/C++, kau kena lepaskan memori manual. Taip 'lepas' untuk grad.", trigger: "lepas" },
        { buddy: 'chonk', text: "Modul Pro: Sihir Kontena! Docker bagi kau bungkus app jadi 'kontena' supaya boleh run kat mana-mana. Taip 'kontena' untuk dock.", trigger: "kontena" },
        { buddy: 'dragon', text: "Bilik Kebal! Enkripsi tukar rahsia jadi merapu guna matematik purba. Taip 'enkripsi' untuk sorok data.", trigger: "enkripsi" },
        { buddy: 'chonk', text: "Penjaga Cloud! AWS dan Azure tu server orang lain tapi skala besar gila. Taip 'cloud' untuk terbang.", trigger: "cloud" },
        { buddy: 'dragon', text: "Bahagian Dalaman Sistem! Proses tu program yang tengah jalan. Deadlock tu bayang-bayang yang sangkutkan core! Taip 'proses' untuk tengok metal.", trigger: "proses" },
        { buddy: 'chonk', text: "HEBAT GILA! Kau dah kuasai full stack latihan zero-knowledge. Graduasi Master Selesai!", trigger: "" }
    ]
};

function updateProgressBar() {
    const list = trainingLessons[currentLang];
    const progress = (lessonIndex / (list.length - 1)) * 100;
    const bar = document.getElementById('training-progress-bar');
    if (bar) bar.style.width = `${Math.min(progress, 100)}%`;
}

if (trainingBtn) {
    trainingBtn.addEventListener('click', () => {
        isTrainingMode = !isTrainingMode;
        const progressContainer = document.getElementById('training-progress-container');
        if (isTrainingMode) {
            trainingBtn.innerText = "Stop Training 🛑";
            trainingBtn.style.background = "linear-gradient(135deg, #ef4444, #b91c1c)";
            if (progressContainer) progressContainer.style.display = 'block';
            
            if (isAutoChatting) autoChatBtn.click();
            
            lessonIndex = 0;
            updateProgressBar();
            triggerTrainingLesson();
        } else {
            trainingBtn.innerText = "Start Training 🎓";
            trainingBtn.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)";
            if (progressContainer) progressContainer.style.display = 'none';
        }
    });
}

function triggerTrainingLesson() {
    const list = trainingLessons[currentLang];
    if (!isTrainingMode || lessonIndex >= list.length) {
        if (lessonIndex >= list.length) trainingBtn.click();
        return;
    }
    
    const lesson = list[lessonIndex];
    setBuddy(lesson.buddy); // Switch avatar and theme immediately
    
    setTimeout(() => {
        if (!isTrainingMode) return;
        showTypingIndicator(lesson.buddy);
        
        const typingDuration = 2000 + Math.random() * 1500;
        setTimeout(() => {
            if (!isTrainingMode) return;
            removeTypingIndicator();
            appendMessage(lesson.text, lesson.buddy);
            speakText(lesson.text, lesson.buddy);
        }, typingDuration);
    }, 800); // Thinking delay for training
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isAutoChatting) return;
    
    const text = messageInput.value.trim();
    if (!text) return;
    
    appendMessage(text, 'user');
    messageInput.value = '';
    
    if (isTrainingMode) {
        const list = trainingLessons[currentLang];
        const lesson = list[lessonIndex];
        if (lesson && lesson.trigger && text.toLowerCase().includes(lesson.trigger.toLowerCase())) {
            lessonIndex++;
            updateProgressBar();
            setTimeout(triggerTrainingLesson, 200);
        } else if (lesson && lesson.trigger) {
            showTypingIndicator(lesson.buddy);
            setTimeout(() => {
                removeTypingIndicator();
                const wrongMsgs = {
                    en: `No, trainee! Type '${lesson.trigger}' to proceed.`,
                    ch: `不对，新人！输入 '${lesson.trigger}' 继续。`,
                    ms: `Salah tu, pelatih! Taip '${lesson.trigger}' untuk mula.`
                };
                const wrongMsg = wrongMsgs[currentLang];
                appendMessage(wrongMsg, lesson.buddy);
                speakText(wrongMsg, lesson.buddy);
            }, 300);
        }
    } else {
    showTypingIndicator(currentBuddy);
    setTimeout(() => {
        removeTypingIndicator();
        const reply = processMessage(text);
        appendMessage(reply, currentBuddy);
        speakText(reply, currentBuddy);
    }, 700 + Math.random() * 800);
}
});
