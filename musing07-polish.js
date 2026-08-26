/* Musing 07 visual polish — sketch artwork + podcast-app inspired loop. */
(function(){
  const TEMPLATE='musing-knowledge-podcast';
  const ART='/assets/dmt/musing-07-read-less-hear-more.webp?v=20260826b';

  function demoMarkup(){
    return `<div class="m07-demo-wrap m07-demo-wrap--app">
      <div class="m07-demo-intro">
        <span class="hand">A one-minute loop</span>
        <h3>See what the tool is actually doing.</h3>
        <p>The interaction now borrows directly from the podcast prototype: source material comes in, the pack gets mapped, evidence stays visible, the conversation is shaped, then the episode becomes something I can listen to on the move.</p>
      </div>

      <div class="m07-demo m07-demo--app" data-m07-demo>
        <div class="m07-progress" aria-label="Podcast workflow">
          <button class="m07-step is-active" type="button"><small>01</small><span>Material</span></button>
          <button class="m07-step" type="button"><small>02</small><span>Map</span></button>
          <button class="m07-step" type="button"><small>03</small><span>Evidence</span></button>
          <button class="m07-step" type="button"><small>04</small><span>Conversation</span></button>
          <button class="m07-step" type="button"><small>05</small><span>Listen</span></button>
        </div>
        <div class="m07-progress-line" aria-hidden="true"><span></span></div>

        <div class="m07-stage-shell">
          <section class="m07-stage m07-stage-grid is-active">
            <div class="m07-stage-copy">
              <span class="hand">Step one</span>
              <h4>Bring the reading into one place.</h4>
              <p>PDFs, internal briefs, Word documents and useful web pages become a source pack. It is not a shortcut around the material; it is the raw material for the learning.</p>
            </div>
            <div class="m07-appshot" aria-label="Podcast app add material screen">
              <div class="m07-appbar"><div><small>PERSONAL LEARNING</small><strong>Podcast</strong></div><span>Library</span></div>
              <div class="m07-podcast-card m07-podcast-card--dark">
                <small>1 · ADD MATERIAL</small>
                <h5>What do you want to understand?</h5>
                <p>Upload PDFs, connect ideas across your library, and turn them into an intelligent discussion you can steer.</p>
                <div class="m07-upload-zone"><b>↑</b><strong>Add PDFs</strong><span>Tap to choose files</span></div>
              </div>
              <div class="m07-library-mini">
                <div class="m07-library-row is-selected"><span><strong>Strategy report</strong><small>450 pages · ready</small></span><b>✓</b></div>
                <div class="m07-library-row"><span><strong>Interview notes</strong><small>36 pages · ready</small></span><b>+</b></div>
              </div>
            </div>
          </section>

          <section class="m07-stage m07-stage-grid">
            <div class="m07-stage-copy">
              <span class="hand">Step two</span>
              <h4>Map before summarising.</h4>
              <p>This is the part I most wanted to keep. Before the tool writes anything, it surfaces the themes, tensions, patterns and decisions across the source pack so the later conversation has a map of the territory.</p>
            </div>
            <div class="m07-appshot" aria-label="AI map of themes tensions patterns and decisions">
              <div class="m07-appbar"><div><small>PERSONAL LEARNING</small><strong>Source map</strong></div><span>3 sources</span></div>
              <div class="m07-podcast-card">
                <div class="m07-map-head"><span><small>AI MAP</small><h5>What is showing up?</h5></span><em>ready</em></div>
                <div class="m07-map-grid">
                  <article class="m07-map-card m07-map-card--pink"><span>✦</span><div><strong>Themes</strong><small>6 recurring ideas</small></div></article>
                  <article class="m07-map-card m07-map-card--yellow"><span>↯</span><div><strong>Tensions</strong><small>4 worth debating</small></div></article>
                  <article class="m07-map-card m07-map-card--blue"><span>⇄</span><div><strong>Patterns</strong><small>Across 3 sources</small></div></article>
                  <article class="m07-map-card m07-map-card--green"><span>✓</span><div><strong>Decisions</strong><small>9 explicit / implied</small></div></article>
                </div>
                <div class="m07-map-question"><small>QUESTION TO CARRY FORWARD</small><strong>Where does speed create value — and where does it reduce depth?</strong></div>
              </div>
            </div>
          </section>

          <section class="m07-stage m07-stage-grid">
            <div class="m07-stage-copy">
              <span class="hand">Step three</span>
              <h4>Keep the source attached to the claim.</h4>
              <p>Each important point carries the source and page. That transparency exposed a major failure in an early test: a polished episode that was drawing almost entirely from pages 190–220 of a roughly 450-page report.</p>
            </div>
            <div class="m07-appshot" aria-label="Podcast transcript with source references">
              <div class="m07-appbar"><div><small>EPISODE</small><strong>Evidence view</strong></div><span>12 source links</span></div>
              <div class="m07-podcast-card">
                <div class="m07-evidence-line"><div><b>HOST A</b><span>00:32</span></div><p>The strongest pattern is a shift in how the problem is framed.</p><a>Strategy report · p.12</a></div>
                <div class="m07-evidence-line"><div><b>HOST B</b><span>02:15</span></div><p>But the middle of the report introduces a competing constraint.</p><a>Strategy report · p.227</a></div>
                <div class="m07-evidence-line"><div><b>HOST C</b><span>04:10</span></div><p>And the later evidence changes the implication again.</p><a>Strategy report · p.401</a></div>
                <div class="m07-breadth"><span><strong>Coverage across the document</strong><small>breadth check</small></span><div>${'<i class="hit"></i>'.repeat(3)}${'<i></i>'.repeat(2)}<i class="warn"></i><i class="warn"></i>${'<i></i>'.repeat(2)}${'<i class="hit"></i>'.repeat(3)}</div></div>
              </div>
            </div>
          </section>

          <section class="m07-stage m07-stage-grid">
            <div class="m07-stage-copy">
              <span class="hand">Step four</span>
              <h4>Shape a conversation, not a spoken report.</h4>
              <p>Different roles, shorter turns, challenge, interruption and the occasional “hang on” made the experience dramatically easier to stay with. The information did not change. The interface did.</p>
            </div>
            <div class="m07-appshot" aria-label="Podcast app episode brief and multi-speaker conversation">
              <div class="m07-appbar"><div><small>2 · EPISODE BRIEF</small><strong>Shape the conversation</strong></div><span>Deep Dive · 30 min</span></div>
              <div class="m07-podcast-card">
                <div class="m07-cast"><div class="m07-cast-avatars"><i>A</i><i>B</i><i>C</i></div><span><strong>Three different jobs</strong><small>Explain · challenge · apply</small></span></div>
                <div class="m07-chat-row"><b>A</b><p>So the headline is clear — but I think we're missing why it matters.</p></div>
                <div class="m07-chat-row"><b>B</b><p>Right, and… hang on. Page 227 complicates that quite a bit.</p></div>
                <div class="m07-chat-row"><b>C</b><p>Exactly. Which is probably the more useful workshop question.</p></div>
                <div class="m07-generate"><span>Generating conversation…</span><div><i></i></div><b>87%</b></div>
              </div>
            </div>
          </section>

          <section class="m07-stage m07-stage-grid">
            <div class="m07-stage-copy">
              <span class="hand">Step five</span>
              <h4>Turn the gaps in the day into learning time.</h4>
              <p>The finished episode can come with me on a walk, in the car or between pieces of work. If something matters, the evidence tags tell me exactly where to return to the original material.</p>
            </div>
            <div class="m07-appshot" aria-label="Podcast app audio player">
              <div class="m07-appbar"><div><small>EPISODE READY</small><strong>Workshop prep</strong></div><span>3 speakers</span></div>
              <div class="m07-podcast-card m07-player">
                <div class="m07-player-status"><span><small>NOW PLAYING</small><strong>Host B · 09:41</strong></span><em>Ready</em></div>
                <div class="m07-now-playing"><p>“The more useful question is not whether speed matters, but where speed changes the quality of the decision.”</p><div class="m07-source-tags"><span>Strategy report · p.227</span><span>Interview notes · p.18</span></div></div>
                <div class="m07-timeline"><span>09:41</span><div><i></i></div><span>14:52</span></div>
                <div class="m07-controls"><button>↶ 10</button><button class="play">▶</button><button>30 ↷</button></div>
              </div>
            </div>
          </section>
        </div>
        <span class="m07-loop-note">Looping automatically · choose any step to explore</span>
      </div>
    </div>`;
  }

  function setArt(root){
    root.querySelectorAll('.musing-thumb--knowledge-podcast img, .field-note-sketch--knowledge-podcast img').forEach(img=>{
      if(img.getAttribute('src')!==ART) img.setAttribute('src',ART);
    });
  }

  function replaceDemo(root){
    root.querySelectorAll('.m07-demo-wrap:not(.m07-demo-wrap--app)').forEach(old=>{
      const shell=document.createElement('div');
      shell.innerHTML=demoMarkup().trim();
      old.replaceWith(shell.firstElementChild);
    });
  }

  function initDemo(root){
    root.querySelectorAll('[data-m07-demo]').forEach(demo=>{
      if(demo.dataset.bound) return;
      demo.dataset.bound='1';
      const steps=[...demo.querySelectorAll('.m07-step')];
      const stages=[...demo.querySelectorAll('.m07-stage')];
      const line=demo.querySelector('.m07-progress-line span');
      let index=0;
      let timer=null;
      const reduced=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      function show(next){
        index=(next+stages.length)%stages.length;
        steps.forEach((el,i)=>el.classList.toggle('is-active',i===index));
        stages.forEach((el,i)=>el.classList.toggle('is-active',i===index));
        if(line) line.style.width=((index+1)/stages.length*100)+'%';
      }
      function restart(){
        if(timer) clearInterval(timer);
        if(!reduced) timer=setInterval(()=>show(index+1),11000);
      }
      steps.forEach((step,i)=>step.addEventListener('click',()=>{show(i);restart();}));
      show(0);
      restart();
    });
  }

  function upgradeTemplate(){
    const card=document.querySelector('[data-modal-template="'+TEMPLATE+'"]');
    if(card) setArt(card);
    const template=document.getElementById(TEMPLATE);
    if(template && template.content){
      setArt(template.content);
      replaceDemo(template.content);
    }
  }

  function upgradeLive(root=document){
    setArt(root);
    replaceDemo(root);
    initDemo(root);
  }

  function start(){
    upgradeTemplate();
    upgradeLive();
    const observer=new MutationObserver(muts=>{
      for(const mutation of muts){
        for(const node of mutation.addedNodes){
          if(node.nodeType!==1) continue;
          upgradeLive(node);
        }
      }
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();