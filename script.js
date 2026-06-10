/* ============================================================
   ROCCO MONTELEONE — roccomonteleone.it
   Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────
     CUSTOM CURSOR
  ────────────────────────────────────────────── */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // ring follows with lerp for fluid lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // ring expands on interactive elements
  document.querySelectorAll('a, button, .cert-block, .tl-item-cin').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  // hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });


  /* ──────────────────────────────────────────────
     PARALLAX — hero background RM text
  ────────────────────────────────────────────── */
  const parallaxEl = document.getElementById('p1Parallax');
  const hero       = document.getElementById('p1');

  if (parallaxEl && hero) {
    window.addEventListener('scroll', () => {
      const scrollY      = window.scrollY;
      const heroHeight   = hero.offsetHeight;
      if (scrollY > heroHeight) return; // only while hero is visible
      const progress     = scrollY / heroHeight;       // 0 → 1
      const translateY   = progress * 80;              // moves 80px down
      const translateX   = progress * -30;             // drifts slightly left
      const scale        = 1 + progress * 0.08;        // grows slightly
      parallaxEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }, { passive: true });
  }


  /* ──────────────────────────────────────────────
     HERO — staggered entrance on load
  ────────────────────────────────────────────── */
  setTimeout(() => {
    const ol = document.getElementById('p1ol');
    if (ol) ol.classList.add('in');

    setTimeout(() => { document.getElementById('w1')?.classList.add('in'); }, 300);
    setTimeout(() => { document.getElementById('w2')?.classList.add('in'); }, 480);
    setTimeout(() => { document.getElementById('w3')?.classList.add('in'); }, 560);
    setTimeout(() => { document.getElementById('p1sub')?.classList.add('in'); }, 800);
  }, 120);


  /* ──────────────────────────────────────────────
     SHARED — generic reveal-up observer
  ────────────────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-up').forEach(el => revealObs.observe(el));


  /* ──────────────────────────────────────────────
     STATEMENT — word-by-word reveal
  ────────────────────────────────────────────── */
  const hlIds = ['hl1','hl2','hl3','hl4','hl5','hl6','hl7'];
  const p2    = document.getElementById('p2');

  if (p2) {
    const p2Obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        hlIds.forEach((id, i) => {
          setTimeout(() => {
            document.getElementById(id)?.classList.add('in');
          }, i * 160);
        });
        p2Obs.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    p2Obs.observe(p2);
  }


  /* ──────────────────────────────────────────────
     NUMBERS — counter animation
  ────────────────────────────────────────────── */
  const p3 = document.getElementById('p3');

  if (p3) {
    const numObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;

        ['nb1','nb2','nb3'].forEach((id, i) => {
          const block = document.getElementById(id);
          if (!block) return;

          setTimeout(() => {
            block.classList.add('in');

            const counter   = block.querySelector('.nb-count');
            if (!counter) return;

            const target    = parseInt(counter.dataset.target, 10);
            const duration  = 1000;
            const steps     = 40;
            const increment = target / steps;
            let current     = 0;

            const timer = setInterval(() => {
              current = Math.min(current + increment, target);
              counter.textContent = Math.floor(current);
              if (current >= target) clearInterval(timer);
            }, duration / steps);

          }, i * 200);
        });

        numObs.unobserve(e.target);
      });
    }, { threshold: 0.25 });

    numObs.observe(p3);
  }


  /* ──────────────────────────────────────────────
     TIMELINE — cascade in
  ────────────────────────────────────────────── */
  const tl0 = document.getElementById('tl0');

  if (tl0) {
    const tlObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;

        for (let i = 0; i < 5; i++) {
          const node = document.getElementById('tl' + i);
          if (node) setTimeout(() => node.classList.add('in'), i * 150);
        }

        tlObs.unobserve(e.target);
      });
    }, { threshold: 0.1 });

    tlObs.observe(tl0);
  }


  /* ──────────────────────────────────────────────
     SKILLS — staggered word reveal
  ────────────────────────────────────────────── */
  const pSkills = document.getElementById('pSkills');

  if (pSkills) {
    const skObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;

        const words = e.target.querySelectorAll('.sw');
        words.forEach((el, i) => {
          setTimeout(() => {
            el.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), color 0.25s ease';
            el.style.opacity    = '1';
            el.style.transform  = 'translateY(0)';
          }, i * 80);
        });

        skObs.unobserve(e.target);
      });
    }, { threshold: 0.2 });

    skObs.observe(pSkills);
  }


  /* ──────────────────────────────────────────────
     CHAPTER INTRO — cinematic reveal
     1. linea dorata si estende da sx a dx
     2. numero sale dal basso
     3. label + titolo appaiono in sequenza
  ────────────────────────────────────────────── */
  document.querySelectorAll('.chapter-intro').forEach(ch => {
    const line = document.createElement('div');
    line.className = 'ch-reveal-line';
    ch.insertBefore(line, ch.firstChild);

    const num   = ch.querySelector('.ch-num');
    const label = ch.querySelector('.ch-label');
    const title = ch.querySelector('.ch-title');

    if (num)   { num.style.opacity   = '0'; num.style.transform   = 'translateY(20px)'; }
    if (label) { label.style.opacity = '0'; label.style.transform = 'translateY(10px)'; }
    if (title) { title.style.opacity = '0'; title.style.transform = 'translateY(10px)'; }
  });

  const chObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;

      const ch    = e.target;
      const line  = ch.querySelector('.ch-reveal-line');
      const num   = ch.querySelector('.ch-num');
      const label = ch.querySelector('.ch-label');
      const title = ch.querySelector('.ch-title');

      if (line) {
        line.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        line.style.transform  = 'scaleX(1)';
      }
      setTimeout(() => {
        if (num) {
          num.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
          num.style.opacity    = '1';
          num.style.transform  = 'translateY(0)';
        }
      }, 300);
      setTimeout(() => {
        if (label) {
          label.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          label.style.opacity    = '1';
          label.style.transform  = 'translateY(0)';
        }
      }, 520);
      setTimeout(() => {
        if (title) {
          title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          title.style.opacity    = '1';
          title.style.transform  = 'translateY(0)';
        }
      }, 660);

      chObs.unobserve(ch);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.chapter-intro').forEach(ch => chObs.observe(ch));


  /* ──────────────────────────────────────────────
     FOOTER ROWS — stagger in
  ────────────────────────────────────────────── */
  const pFooter = document.getElementById('pFooter');

  if (pFooter) {
    pFooter.querySelectorAll('.fc').forEach(el => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(8px)';
    });

    const footerObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;

        e.target.querySelectorAll('.fc').forEach((el, i) => {
          setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity    = '1';
            el.style.transform  = 'translateY(0)';
          }, i * 80);
        });

        footerObs.unobserve(e.target);
      });
    }, { threshold: 0.3 });

    footerObs.observe(pFooter);
  }

});
