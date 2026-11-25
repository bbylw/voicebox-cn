// Wave bars
      const waveBars = document.getElementById('waveBars');
      if (waveBars) {
        for (let i = 0; i < 80; i++) {
          const bar = document.createElement('div');
          bar.className = 'wave-bar';
          const h = Math.sin(i * 0.3) * 12 + Math.random() * 8 + 6;
          bar.style.height = h + 'px';
          waveBars.appendChild(bar);
        }
      }

      // Marquee
      const voices = [
        { name: 'Jarvis', desc: '沉稳英式 AI 助手', bg: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
        { name: 'Morgan Freeman', desc: '温暖浑厚的男中音', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
        { name: 'Bob Ross', desc: '轻柔、令人安心', bg: 'linear-gradient(135deg,#10b981,#06b6d4)' },
        { name: 'Sam Altman', desc: '深思熟虑的硅谷节奏', bg: 'linear-gradient(135deg,#64748b,#475569)' },
        { name: 'Scarlett Johansson', desc: '柔和低沉的女中音', bg: 'linear-gradient(135deg,#ec4899,#f43f5e)' },
        { name: 'David Attenborough', desc: '温暖而充满敬意的叙述', bg: 'linear-gradient(135deg,#3b82f6,#6366f1)' },
        { name: 'Linus Tech Tips', desc: '充满活力的科技解说', bg: 'linear-gradient(135deg,#f97316,#eab308)' },
        { name: 'Fireship', desc: '快节奏、冷面科技幽默', bg: 'linear-gradient(135deg,#ef4444,#f97316)' },
        { name: 'Barack Obama', desc: '有节奏感的沉稳演讲', bg: 'linear-gradient(135deg,#1e40af,#3b82f6)' },
        { name: 'Zendaya', desc: '轻松现代、不费力的酷感', bg: 'linear-gradient(135deg,#d946ef,#a855f7)' },
        { name: 'Dario Amodei', desc: '冷静精确的学术深度', bg: 'linear-gradient(135deg,#06b6d4,#0ea5e9)' },
      ];
      const track = document.getElementById('marqueeTrack');
      if (track) {
        const all = [...voices, ...voices];
        all.forEach(v => {
          const card = document.createElement('div');
          card.className = 'marquee-card';
          card.innerHTML = `<div class="mc-avatar" style="background:${v.bg}">${v.name[0]}</div><div><div class="mc-name">${v.name}</div><div class="mc-desc">${v.desc}</div></div>`;
          track.appendChild(card);
        });
      }

      // Scroll reveal
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

      // Smooth scroll
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const id = this.getAttribute('href');
          if (id === '#') return;
          e.preventDefault();
          const target = document.querySelector(id);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
