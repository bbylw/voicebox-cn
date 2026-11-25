(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const announcer = document.getElementById("liveAnnouncer");
  const announce = (msg) => {
    if (!announcer) return;
    announcer.textContent = "";
    requestAnimationFrame(() => {
      announcer.textContent = msg;
    });
  };

  // 1. Native <dialog> navigation drawer with scroll-snap swipe-to-dismiss
  const menuBtn = document.getElementById("mobileMenuBtn");
  const drawer = document.getElementById("mobileDrawer");
  if (menuBtn && drawer instanceof HTMLDialogElement) {
    const scroller = drawer.querySelector(".mobile-drawer-scroller");
    const sheet = drawer.querySelector(".mobile-drawer-sheet");
    const closeBtn = document.getElementById("mobileDrawerClose");

    if (scroller && sheet) {
      const openDrawer = async () => {
        drawer.showModal();
        if (!CSS.supports("scroll-initial-target", "nearest")) {
          scroller.scrollTo({ left: scroller.offsetWidth, behavior: "instant" });
          await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        }
        scroller.scrollTo({ left: 0, behavior: "auto" });
      };

      const closeDrawer = () => {
        if (!drawer.open) return;
        scroller.scrollTo({ left: scroller.offsetWidth, behavior: "auto" });
      };

      const visibleThreshold = 1 / Math.max(window.innerWidth, 1);
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries.at(-1);
          if (!entry || !drawer.open) return;
          if (entry.intersectionRatio < visibleThreshold) {
            drawer.close();
            menuBtn.setAttribute("aria-expanded", "false");
          } else if (entry.intersectionRatio === 1) {
            menuBtn.setAttribute("aria-expanded", "true");
          }
        },
        { root: drawer, threshold: [visibleThreshold, 1] },
      );
      observer.observe(sheet);

      if (!CSS.supports("animation-timeline: scroll()")) {
        scroller.addEventListener(
          "scroll",
          () => {
            const width = sheet.offsetWidth || 1;
            const ratio = Math.max(0, Math.min(1, 1 - scroller.scrollLeft / width));
            drawer.style.setProperty("--drawer-backdrop", String(ratio));
          },
          { passive: true },
        );
      }

      menuBtn.addEventListener("click", openDrawer);
      if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

      drawer.addEventListener("click", (event) => {
        if (!sheet.contains(event.target)) closeDrawer();
      });

      drawer.addEventListener("cancel", (event) => {
        if (event.cancelable) {
          event.preventDefault();
          closeDrawer();
        }
      });

      drawer.addEventListener("close", () => {
        menuBtn.setAttribute("aria-expanded", "false");
      });

      drawer.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          drawer.close();
          menuBtn.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  // 3. Waveform bars & interactive studio transport
  const waveBars = document.getElementById("waveBars");
  const bars = [];
  if (waveBars) {
    const count = 64;
    for (let i = 0; i < count; i++) {
      const bar = document.createElement("div");
      bar.className = "wave-bar";
      const h = Math.round(Math.abs(Math.sin(i * 0.34)) * 18 + ((i * 17) % 10) + 6);
      bar.style.height = `${h}px`;
      waveBars.appendChild(bar);
      bars.push(bar);
    }
  }

  const transportPlay = document.getElementById("transportPlay");
  const transportSpeaker = document.getElementById("transportSpeaker");
  const transportTime = document.getElementById("transportTime");
  const playIcon = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3" /></svg>';
  const pauseIcon = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>';

  let isPlaying = false;
  let durationSec = 9;
  let elapsedSec = 0;
  let lastTick = 0;
  let rafId = 0;
  let activeClipBtn = null;

  const formatSec = (s) => {
    const whole = Math.min(durationSec, Math.floor(s));
    return `0:${String(whole).padStart(2, "0")}`;
  };

  const renderTransport = () => {
    const progress = durationSec > 0 ? Math.min(1, elapsedSec / durationSec) : 0;
    const activeCount = Math.floor(progress * bars.length);
    bars.forEach((bar, idx) => {
      bar.classList.toggle("active", idx < activeCount);
    });
    if (transportTime) {
      transportTime.textContent = `${formatSec(elapsedSec)} / ${formatSec(durationSec)}`;
    }
    if (transportPlay) {
      transportPlay.innerHTML = isPlaying ? pauseIcon : playIcon;
      transportPlay.classList.toggle("playing", isPlaying);
    }
    document.querySelectorAll(".gen-row .gen-play").forEach((btn) => {
      const isThis = isPlaying && btn === activeClipBtn;
      btn.innerHTML = isThis ? pauseIcon : playIcon;
      btn.classList.toggle("playing", isThis);
    });
  };

  const stopPlayback = () => {
    isPlaying = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    renderTransport();
  };

  const tick = (now) => {
    if (!isPlaying) return;
    if (!lastTick) lastTick = now;
    const delta = (now - lastTick) / 1000;
    lastTick = now;
    elapsedSec += delta;
    if (elapsedSec >= durationSec) {
      elapsedSec = 0;
      stopPlayback();
      return;
    }
    renderTransport();
    rafId = requestAnimationFrame(tick);
  };

  const startPlayback = () => {
    isPlaying = true;
    lastTick = 0;
    renderTransport();
    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(tick);
    }
  };

  if (transportPlay) {
    transportPlay.addEventListener("click", () => {
      if (isPlaying) stopPlayback();
      else startPlayback();
    });
  }

  document.querySelectorAll(".gen-row .gen-play").forEach((btn) => {
    btn.addEventListener("click", () => {
      const clipName = btn.getAttribute("data-clip") || "Jarvis";
      const clipDur = Number(btn.getAttribute("data-duration")) || 8;
      if (isPlaying && activeClipBtn === btn) {
        stopPlayback();
        return;
      }
      activeClipBtn = btn;
      durationSec = clipDur;
      elapsedSec = 0;
      if (transportSpeaker) transportSpeaker.textContent = clipName;
      startPlayback();
    });
  });

  // 4. Voice profile selector in workbench
  const wbPrompt = document.getElementById("wbPrompt");
  document.querySelectorAll(".voice-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".voice-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      const name = btn.getAttribute("data-voice") || "Jarvis";
      const prompt = btn.getAttribute("data-prompt") || "";
      if (wbPrompt && prompt) wbPrompt.textContent = prompt;
      if (transportSpeaker) transportSpeaker.textContent = name;
      activeClipBtn = null;
      elapsedSec = 0;
      stopPlayback();
      announce(`已切换声音配置：${name}`);
    });
  });

  // 5. Engine selector in workbench
  const wbEngineStatus = document.getElementById("wbEngineStatus");
  const wbEngineNote = document.getElementById("wbEngineNote");
  document.querySelectorAll("#studioWorkbench .seg-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#studioWorkbench .seg-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      const engine = btn.getAttribute("data-engine");
      const note = btn.getAttribute("data-note");
      if (wbEngineStatus && engine) wbEngineStatus.textContent = engine;
      if (wbEngineNote && note) wbEngineNote.textContent = note;
      if (engine) announce(`已切换本地引擎：${engine}`);
    });
  });

  // 6. Engine matrix filter
  const engineFilter = document.getElementById("engineFilter");
  const engineRows = document.querySelectorAll("#engineList .engine-row");
  if (engineFilter && engineRows.length) {
    engineFilter.querySelectorAll(".seg-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        engineFilter.querySelectorAll(".seg-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        const filter = btn.getAttribute("data-filter") || "all";
        let visibleCount = 0;
        engineRows.forEach((row) => {
          const cats = (row.getAttribute("data-category") || "").split(" ");
          const hidden = filter !== "all" && !cats.includes(filter);
          row.hidden = hidden;
          if (!hidden) visibleCount += 1;
        });
        announce(`已筛选引擎：显示 ${visibleCount} 个引擎`);
      });
    });
  }

  // 7. Voice strip marquee
  const voices = [
    { name: "Jarvis", desc: "沉稳英式 AI 助手", bg: "linear-gradient(135deg,#4f46e5,#7c3aed)" },
    { name: "Morgan Freeman", desc: "温暖浑厚的男中音", bg: "linear-gradient(135deg,#d97706,#dc2626)" },
    { name: "Bob Ross", desc: "轻柔、令人安心", bg: "linear-gradient(135deg,#059669,#0891b2)" },
    { name: "Sam Altman", desc: "深思熟虑的硅谷节奏", bg: "linear-gradient(135deg,#475569,#334155)" },
    { name: "Scarlett Johansson", desc: "柔和低沉的女中音", bg: "linear-gradient(135deg,#db2777,#e11d48)" },
    { name: "David Attenborough", desc: "温暖而充满敬意的叙述", bg: "linear-gradient(135deg,#2563eb,#4f46e5)" },
    { name: "Linus Tech Tips", desc: "充满活力的科技解说", bg: "linear-gradient(135deg,#ea580c,#ca8a04)" },
    { name: "Fireship", desc: "快节奏、冷面科技幽默", bg: "linear-gradient(135deg,#dc2626,#ea580c)" },
    { name: "Barack Obama", desc: "有节奏感的沉稳演讲", bg: "linear-gradient(135deg,#1d4ed8,#2563eb)" },
    { name: "Zendaya", desc: "轻松现代、不费力的酷感", bg: "linear-gradient(135deg,#c026d3,#9333ea)" },
    { name: "Dario Amodei", desc: "冷静精确的学术深度", bg: "linear-gradient(135deg,#0891b2,#0284c7)" },
  ];
  const track = document.getElementById("marqueeTrack");
  if (track) {
    [...voices, ...voices].forEach((v) => {
      const item = document.createElement("div");
      item.className = "marquee-item";
      item.innerHTML = `<span class="mc-avatar" style="background:${v.bg}">${v.name[0]}</span><span class="mc-name">${v.name}</span><span class="mc-desc">${v.desc}</span>`;
      track.appendChild(item);
    });
  }

  renderTransport();
})();
