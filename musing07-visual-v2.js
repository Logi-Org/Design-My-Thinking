/* Musing 07 visual v2 — sketch hero + richer Podcast-app storyboard. */
(function(){
  const TEMPLATE='musing-knowledge-podcast';
  const ART='/assets/dmt/musing-07-read-less-hear-more-sketch.jpg?v=20260826e';

  function markup(){
    return `<div class="m07-demo-wrap m07-demo-wrap--app m07-demo-wrap--v2">
      <div class="m07-v2-intro">
        <span class="hand">How it works</span>
        <h3>From a pile of reading to a conversation I can carry with me.</h3>
        <p>This version borrows the visual language of the podcast app itself. The screens below are deliberately closer to the thing I actually built — with one piece of creative licence in the mapping step.</p>
      </div>

      <div class="m07-v2" data-m07-v2>
        <nav class="m07-v2-rail" aria-label="Podcast workflow">
          <button class="is-active" type="button" data-v2-step="0"><b>1</b><span>Add material</span></button>
          <button type="button" data-v2-step="1"><b>2</b><span>Map it</span></button>
          <button type="button" data-v2-step="2"><b>3</b><span>Trace evidence</span></button>
          <button type="button" data-v2-step="3"><b>4</b><span>Shape the talk</span></button>
          <button type="button" data-v2-step="4"><b>5</b><span>Listen</span></button>
          <i class="m07-v2-rail-line" aria-hidden="true"><span></span></i>
        </nav>

        <div class="m07-v2-stage">
          <section class="m07-v2-scene m07-v2-scene--upload is-active" data-v2-scene>
            <div class="m07-v2-handnote m07-v2-handnote--yellow">
              <span class="hand">Start with the source pack</span>
              <p>Reports, PDFs, decks and notes all in one place.</p>
            </div>
            <div class="m07-v2-screen m07-v2-screen--phone">
              <header class="m07-v2-appbar"><div><small>PERSONAL LEARNING</small><strong>Podcast</strong></div><span>Library</span></header>
              <article class="m07-v2-card m07-v2-card--dark">
                <small>1 · ADD MATERIAL</small>
                <h4>What do you want to understand?</h4>
                <p>Upload PDFs, connect ideas across your library, and turn them into an intelligent discussion you can steer.</p>
                <div class="m07-v2-upload"><span>↑</span><strong>Add PDFs</strong><small>Tap to choose files · up to 100 MB each</small><i><b></b></i></div>
              </article>
              <article class="m07-v2-card m07-v2-library">
                <div class="m07-v2-sectionhead"><span><small>YOUR LIBRARY</small><strong>Choose the source material</strong></span><em>3 selected</em></div>
                <div class="m07-v2-librow selected"><span><b>Strategy report</b><small>450 pages · ready</small></span><i>✓</i></div>
                <div class="m07-v2-librow selected"><span><b>Market analysis</b><small>142 pages · ready</small></span><i>✓</i></div>
                <div class="m07-v2-librow"><span><b>Leadership interview notes</b><small>38 pages · ready</small></span><i>+</i></div>
              </article>
            </div>
            <span class="m07-v2-caption hand">Reading stays the source of truth. This just gives me another way in.</span>
          </section>

          <section class="m07-v2-scene m07-v2-scene--map" data-v2-scene>
            <div class="m07-v2-handnote m07-v2-handnote--pink">
              <span class="hand">Map before summarising</span>
              <p>This is the piece worth keeping: themes, tensions, patterns and decisions before a script gets written.</p>
            </div>
            <div class="m07-v2-mapboard">
              <header class="m07-v2-appbar"><div><small>RESEARCHING THE PACK</small><strong>What is showing up?</strong></div><span>3 sources</span></header>
              <div class="m07-v2-mapspace">
                <svg viewBox="0 0 640 330" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M315,167 C240,118 178,97 112,78"/>
                  <path d="M320,165 C397,113 457,94 533,81"/>
                  <path d="M318,171 C230,218 176,248 105,270"/>
                  <path d="M322,171 C400,219 466,245 541,270"/>
                  <path class="soft" d="M112,78 C197,42 431,42 533,81"/>
                  <path class="soft" d="M105,270 C212,303 434,302 541,270"/>
                </svg>
                <div class="m07-v2-mapcore"><small>CENTRAL QUESTION</small><strong>What actually matters for the workshop?</strong></div>
                <article class="m07-v2-mapnote n1"><b>THEMES</b><span>6 recurring ideas</span><small>what keeps appearing?</small></article>
                <article class="m07-v2-mapnote n2"><b>TENSIONS</b><span>4 worth debating</span><small>where does the material disagree?</small></article>
                <article class="m07-v2-mapnote n3"><b>PATTERNS</b><span>across 3 sources</span><small>what connects?</small></article>
                <article class="m07-v2-mapnote n4"><b>DECISIONS</b><span>9 explicit / implied</span><small>what has already been chosen?</small></article>
              </div>
              <footer class="m07-v2-mapfooter"><span>Coverage</span><i></i><i></i><i></i><i></i><i></i><strong>balanced across the pack</strong></footer>
            </div>
            <span class="m07-v2-caption hand">A map of the territory first. The narrative comes later.</span>
          </section>

          <section class="m07-v2-scene m07-v2-scene--evidence" data-v2-scene>
            <div class="m07-v2-screen m07-v2-screen--evidence">
              <header class="m07-v2-appbar"><div><small>EPISODE</small><strong>Sourced transcript</strong></div><span>12 source links</span></header>
              <div class="m07-v2-evidence-grid">
                <article class="m07-v2-card m07-v2-transcript">
                  <div class="m07-v2-transcript-row active"><div><b>HOST A</b><small>00:32</small></div><p>The strongest pattern is a shift in how the problem is framed.</p><span>Strategy report · p.12</span></div>
                  <div class="m07-v2-transcript-row"><div><b>HOST B</b><small>02:15</small></div><p>But the middle of the report introduces a competing constraint.</p><span>Strategy report · p.227</span></div>
                  <div class="m07-v2-transcript-row"><div><b>HOST C</b><small>04:10</small></div><p>And the later evidence changes the implication again.</p><span>Strategy report · p.401</span></div>
                </article>
                <aside class="m07-v2-coverage">
                  <small>PAGE COVERAGE</small>
                  <strong>450 pages</strong>
                  <div class="m07-v2-pagebar">${'<i></i>'.repeat(18)}</div>
                  <p><b>Early test:</b> almost everything came from pages 190–220.</p>
                  <div class="m07-v2-bad-slice"><span>190</span><i></i><span>220</span></div>
                </aside>
              </div>
            </div>
            <div class="m07-v2-handnote m07-v2-handnote--blue m07-v2-handnote--right">
              <span class="hand">Fluent ≠ representative</span>
              <p>Seeing the source pages exposed a polished answer that had looked at far too little of the report.</p>
            </div>
            <span class="m07-v2-caption hand">Traceability changed the design of the tool, not just my confidence in it.</span>
          </section>

          <section class="m07-v2-scene m07-v2-scene--conversation" data-v2-scene>
            <div class="m07-v2-handnote m07-v2-handnote--yellow">
              <span class="hand">Make it sound like thinking</span>
              <p>Shorter turns. Different jobs. Challenge. Interruption. Enough imperfection to keep attention.</p>
            </div>
            <div class="m07-v2-conversation-stack">
              <article class="m07-v2-card m07-v2-brief-card">
                <div class="m07-v2-sectionhead"><span><small>2 · EPISODE BRIEF</small><strong>Shape the conversation</strong></span><em>Deep Dive · 30 min</em></div>
                <label>What are you trying to understand?</label>
                <div class="m07-v2-textarea">Help me understand the strongest ideas, where the argument deserves challenge, and what it means in practice.</div>
                <div class="m07-v2-mode-row"><b>Quick Brief</b><b class="active">Deep Dive</b><b>Expert Discussion</b></div>
              </article>
              <article class="m07-v2-card m07-v2-studio-card">
                <div class="m07-v2-cast"><span class="a">A</span><span class="b">B</span><span class="c">C</span><div><strong>Three different jobs</strong><small>Explain · challenge · apply</small></div></div>
                <div class="m07-v2-talk"><b>A</b><p>So the headline is clear — but I think we are missing why it matters.</p></div>
                <div class="m07-v2-talk"><b>B</b><p>Right, and… hang on. Page 227 complicates that quite a bit.</p></div>
                <div class="m07-v2-talk"><b>C</b><p>Exactly. Which is probably the more useful workshop question.</p></div>
                <div class="m07-v2-wave">${'<i></i>'.repeat(44)}</div>
                <div class="m07-v2-generating"><span>Crafting conversation…</span><i><b></b></i><strong>87%</strong></div>
              </article>
            </div>
            <span class="m07-v2-caption hand">Accuracy mattered. But if I did not want to keep listening, the knowledge transfer still failed.</span>
          </section>

          <section class="m07-v2-scene m07-v2-scene--listen" data-v2-scene>
            <div class="m07-v2-screen m07-v2-player-screen">
              <header class="m07-v2-appbar"><div><small>EPISODE READY</small><strong>Workshop prep</strong></div><span>3 speakers · sourced</span></header>
              <article class="m07-v2-card m07-v2-player-card">
                <div class="m07-v2-player-status"><span><small>NOW PLAYING</small><strong>Host B · 09:41</strong></span><em>Ready</em></div>
                <div class="m07-v2-nowplaying"><p>“The more useful question is not whether speed matters, but where speed changes the quality of the decision.”</p><div><span>Strategy report · p.227</span><span>Interview notes · p.18</span></div></div>
                <div class="m07-v2-player-timeline"><small>09:41</small><i><b></b></i><small>14:52</small></div>
                <div class="m07-v2-player-controls"><button>↶ 10</button><button class="play">▶</button><button>30 ↷</button></div>
                <div class="m07-v2-segments">${'<i></i>'.repeat(11)}<i class="active"></i>${'<i></i>'.repeat(6)}</div>
              </article>
            </div>
            <div class="m07-v2-handnote m07-v2-handnote--pink m07-v2-handnote--right">
              <span class="hand">Listen while life keeps moving</span>
              <p>Walking. Driving. Cooking. Training. Then jump back to the source when something matters.</p>
            </div>
            <span class="m07-v2-caption hand">Read less does not mean trust more. It means find the parts worth reading properly.</span>
          </section>
        </div>

        <div class="m07-v2-loop"><span class="hand">looping…</span><i><b></b></i><small>about 50 seconds · choose any step</small></div>
      </div>
    </div>`;
  }

  function setArt(root){
    root.querySelectorAll('.musing-thumb--knowledge-podcast img, .field-note-sketch--knowledge-podcast img').forEach(img=>{
      img.setAttribute('src',ART);
      img.setAttribute('loading','eager');
    });
  }

  function replaceDemo(root){
    root.querySelectorAll('.m07-demo-wrap:not(.m07-demo-wrap--v2)').forEach(old=>{
      const host=document.createElement('div');
      host.innerHTML=markup().trim();
      old.replaceWith(host.firstElementChild);
    });
  }

  function bind(root){
    root.querySelectorAll('[data-m07-v2]').forEach(demo=>{
      if(demo.dataset.v2Bound) return;
      demo.dataset.v2Bound='1';
      const steps=[...demo.querySelectorAll('[data-v2-step]')];
      const scenes=[...demo.querySelectorAll('[data-v2-scene]')];
      const rail=demo.querySelector('.m07-v2-rail-line span');
      const loop=demo.querySelector('.m07-v2-loop i b');
      const reduced=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let index=0;
      let timer=null;
      function show(n){
        index=(n+scenes.length)%scenes.length;
        steps.forEach((el,i)=>el.classList.toggle('is-active',i===index));
        scenes.forEach((el,i)=>el.classList.toggle('is-active',i===index));
        if(rail) rail.style.height=((index+1)/scenes.length*100)+'%';
        if(loop){ loop.style.animation='none'; void loop.offsetWidth; loop.style.animation='m07v2Loop 10s linear forwards'; }
      }
      function restart(){
        if(timer) clearInterval(timer);
        if(!reduced) timer=setInterval(()=>show(index+1),10000);
      }
      steps.forEach((step,i)=>step.addEventListener('click',()=>{show(i);restart();}));
      show(0); restart();
    });
  }

  function upgrade(root=document){ setArt(root); replaceDemo(root); bind(root); }

  function start(){
    const card=document.querySelector('[data-modal-template="'+TEMPLATE+'"]');
    if(card) setArt(card);
    const template=document.getElementById(TEMPLATE);
    if(template && template.content) upgrade(template.content);
    upgrade(document);
    const observer=new MutationObserver(muts=>{
      for(const mutation of muts){
        for(const node of mutation.addedNodes){
          if(node.nodeType!==1) continue;
          upgrade(node);
        }
      }
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
