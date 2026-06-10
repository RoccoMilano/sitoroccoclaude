/* ============================================================
   ROCCO MONTELEONE — roccomonteleone.it
   Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

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
  const p2 = document.getElementById('p2');

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

            const counter = block.querySelector('.nb-count');
            if (!counter) return;

            const target = parseInt(counter.dataset.target, 10);
            const duration = 1000;
            const steps = 40;
            const increment = target / steps;
            let current = 0;

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
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, i * 80);
        });

        skObs.unobserve(e.target);
      });
    }, { threshold: 0.2 });

    skObs.observe(pSkills);
  }


  /* ──────────────────────────────────────────────
     FOOTER ROWS — stagger in
  ────────────────────────────────────────────── */
  const pFooter = document.getElementById('pFooter');

  if (pFooter) {
    const footerObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;

        e.target.querySelectorAll('.fc').forEach((el, i) => {
          setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, i * 80);
        });

        footerObs.unobserve(e.target);
      });
    }, { threshold: 0.3 });

    footerObs.observe(pFooter);

    // init footer contact rows as hidden
    pFooter.querySelectorAll('.fc').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
    });
  }

});
