/* Musing 07 — Read less. Hear more. */
(function(){
  const PATH='/musings/read-less-hear-more/';
  const TEMPLATE='musing-knowledge-podcast';
  const LABEL='Read less. Hear more.';
  const ART='assets/dmt/musing-07-read-less-hear-more.svg?v=20260826a';

  function demoMarkup(){
    return `<div class="m07-demo-wrap">
      <div class="m07-demo-intro">
        <h3>How the podcast works</h3>
        <p>A one-minute HTML loop: bring in the source material, map it, make the evidence traceable, turn it into conversation, then listen while the rest of the day keeps moving.</p>
      </div>
      <div class="m07-demo" data-m07-demo>
        <div class="m07-progress">
          <button class="m07-step is-active" type="button"><small>01</small>Upload</button>
          <button class="m07-step" type="button"><small>02</small>Map</button>
          <button class="m07-step" type="button"><small>03</small>Reference</button>
          <button class="m07-step" type="button"><small>04</small>Narrate</button>
          <button class="m07-step" type="button"><small>05</small>Listen</button>
        </div>
        <div class="m07-progress-line" aria-hidden="true"><span></span></div>
        <div class="m07-stage-shell">
          <section class="m07-stage m07-stage-grid is-active">
            <div class="m07-stage-copy"><span class="hand">Step one</span><h4>Bring in what I need to learn.</h4><p>PDFs, internal briefs, Word documents and useful web pages go into one source pack. The point is not to skip the material; it is to give the learning somewhere to start.</p></div>
            <div class="m07-ui"><div class="m07-ui-bar"><i class="m07-dot"></i><i class="m07-dot"></i><i class="m07-dot"></i></div><div class="m07-drop"><div class="m07-file"><strong>PDF</strong><br>Research report<br>450 pages</div><div class="m07-file"><strong>WEB</strong><br>Industry insights<br>6 pages</div><div class="m07-file"><strong>DOC</strong><br>Strategy brief<br>Internal</div></div><div class="m07-uploadbar"><span></span></div></div>
          </section>

          <section class="m07-stage m07-stage-grid">
            <div class="m07-stage-copy"><span class="hand">Step two</span><h4>Map before summarising.</h4><p>The AI first looks across the pack for themes, patterns, tensions and decisions. That gives the later conversation a map of the whole territory rather than letting the first interesting section dominate.</p></div>
            <div class="m07-ui"><div class="m07-ui-bar"><i class="m07-dot"></i><i class="m07-dot"></i><i class="m07-dot"></i></div><div class="m07-theme-list"><div class="m07-theme m07-map-pulse"><i>✦</i><b>Themes</b><span>6 recurring</span></div><div class="m07-theme"><i>↯</i><b>Tensions</b><span>4 worth debating</span></div><div class="m07-theme"><i>⇄</i><b>Patterns</b><span>across 3 sources</span></div><div class="m07-theme"><i>✓</i><b>Decisions</b><span>9 explicit / implied</span></div></div></div>
          </section>

          <section class="m07-stage m07-stage-grid">
            <div class="m07-stage-copy"><span class="hand">Step three</span><h4>Make the transcript inspectable.</h4><p>Each important claim carries its source and page. That small transparency layer exposed my biggest problem: one early podcast sounded comprehensive but was drawing almost entirely from about pages 190–220 of a roughly 450-page PDF.</p></div>
            <div class="m07-ui"><div class="m07-ui-bar"><i class="m07-dot"></i><i class="m07-dot"></i><i class="m07-dot"></i></div><div class="m07-transcript"><div class="m07-line"><b>Host A · 00:32</b>The strongest pattern is a shift in how the problem is framed.<span class="m07-tag">p.12</span></div><div class="m07-line"><b>Host B · 02:15</b>But the middle of the report introduces a competing constraint.<span class="m07-tag">p.227</span></div><div class="m07-line"><b>Host C · 04:10</b>And the later evidence changes the implication again.<span class="m07-tag">p.401</span></div></div><div class="m07-coverage"><div class="m07-coverage-title"><span>Coverage across the document</span><span>breadth check</span></div><div class="m07-pages">${'<span class="hit"></span>'.repeat(3)}${'<span></span>'.repeat(2)}<span class="narrow"></span><span class="narrow"></span>${'<span></span>'.repeat(2)}${'<span class="hit"></span>'.repeat(3)}</div></div></div>
          </section>

          <section class="m07-stage m07-stage-grid">
            <div class="m07-stage-copy"><span class="hand">Step four</span><h4>Turn the material into an actual conversation.</h4><p>Shorter turns, different voices, challenge, interruption and the occasional “um” or “hang on” made a surprising difference. The information did not change. My willingness to stay with it did.</p></div>
            <div class="m07-ui"><div class="m07-ui-bar"><i class="m07-dot"></i><i class="m07-dot"></i><i class="m07-dot"></i></div><div class="m07-speakers"><div class="m07-speaker"><div class="m07-avatar">A</div><div class="m07-bubble">So the headline is clear — but I think we're missing why it matters.</div></div><div class="m07-speaker"><div class="m07-avatar">B</div><div class="m07-bubble">Right, and… hang on. Page 227 complicates that quite a bit.</div></div><div class="m07-speaker"><div class="m07-avatar">C</div><div class="m07-bubble">Exactly. Which is probably the more useful workshop question.</div></div></div><div class="m07-wave">${'<i></i>'.repeat(38)}</div></div>
          </section>

          <section class="m07-stage m07-stage-grid">
            <div class="m07-stage-copy"><span class="hand">Step five</span><h4>Use the gaps in the day as learning time.</h4><p>The finished episode can come with me on a walk, in the car or between pieces of work. When something matters, the source tags tell me exactly where to return to the original material.</p></div>
            <div class="m07-ui m07-listen"><div class="m07-phone"><div class="m07-phone-screen"><strong>WORKSHOP PREP</strong><div class="m07-play">▶</div><span>18:42</span><small>3 speakers · sourced</small></div></div><div class="m07-notes"><div class="m07-note">New insight → change the opening question.</div><div class="m07-note">Tension worth testing with the sponsor.</div><div class="m07-note">Go back to p.401 before designing activity 2.</div></div></div>
          </section>
        </div>
        <span class="m07-loop-note">60 second loop · click a step to explore</span>
      </div>
    </div>`;
  }

  function ensure(){
    const grid=document.querySelector('.musing-grid');
    if(grid && !grid.querySelector('[data-modal-template="'+TEMPLATE+'"]')){
      const card=document.createElement('article');
      card.className='musing-card';
      card.setAttribute('role','button');
      card.tabIndex=0;
      card.dataset.modalTemplate=TEMPLATE;
      card.dataset.modalLabel=LABEL;
      card.innerHTML=`<span class="hand">Musing 07</span>
        <div class="musing-thumb musing-thumb--knowledge-podcast" role="img" aria-label="Hand-drawn Read less Hear more flow from workshop source materials to a sourced AI podcast"><img src="${ART}" alt="" aria-hidden="true" /></div>
        <h3>Read less. Hear more.</h3>
        <p>Workshop prep is knowledge transfer as much as logistics. I built a small AI podcast tool to turn dense source material into a traceable conversation I could listen to on the move.</p>
        <span class="musing-open">Open the field note →</span>`;
      grid.appendChild(card);
    }

    if(!document.getElementById(TEMPLATE)){
      const template=document.createElement('template');
      template.id=TEMPLATE;
      template.innerHTML=`<article class="field-note field-note--m07">
        <div class="field-note-hero">
          <div>
            <span class="field-note-kicker">Musing 07 · Workshop preparation</span>
            <h2 class="field-note-title">Read less. <span class="marker">Hear more.</span></h2>
            <p class="field-note-lede">Workshop preparation is not only logistics, agendas and activities. Sometimes the hardest part is becoming useful enough in someone else's world, quickly enough to design a good room.</p>
          </div>
          <div class="field-note-sketch field-note-sketch--knowledge-podcast" role="img" aria-label="Hand-drawn sketch showing source documents becoming a traceable multi-speaker podcast"><img src="${ART}" alt="" aria-hidden="true" /></div>
        </div>

        ${demoMarkup()}

        <div class="field-note-body">
          <section class="field-note-section">
            <h3>The thought</h3>
            <p>There is a part of workshop preparation that rarely appears on the run sheet: learning the problem space. Before I can design useful questions, activities or decisions, I often need to get far enough inside somebody else's context to understand the language, the tensions and the things that are genuinely difficult.</p>
            <p>That can mean a lot of material. A sponsor or design team might send internal strategy papers, technical reports, previous workshop outputs, websites, Word documents or books. The content can be unfamiliar and dense, and the expectation is often that I absorb it quickly while still doing the rest of the job — delivering other workshops, preparing the room, working through logistics and, like most people, having a life outside work.</p>
            <p>I kept finding the same bottleneck: the material was useful, but the uninterrupted hours needed to read it properly were hard to find.</p>
            <span class="m07-minihead">So I built a different way into the material.</span>
            <p>Over a couple of days I built a small AI podcast tool. I can give it PDFs, web pages and documents and ask it to first understand the source pack: identify themes, patterns, points of tension, decisions, competing arguments and areas worth questioning. From there it creates a conversation between two or three speakers and turns that conversation into audio.</p>
            <p>The intention was never “450 pages become 20 minutes, therefore I have read the report.” That would be a dangerous shortcut. The intention was to create another learning surface — something that could help me build a map of unfamiliar territory while walking, driving or doing the less cognitively demanding parts of my day, and then tell me where to go back into the original source when something deserved more attention.</p>
            <p>I know tools that create podcasts from source material already exist. Building my own was partly curiosity, but control mattered too. I wanted to experiment with the roles the speakers played, the kinds of questions they asked, the voices and accents, the rhythm of the discussion, how much challenge appeared in the conversation and, eventually, whether every important point could show me the source it came from.</p>
          </section>

          <section class="field-note-section">
            <h3>Why it helps</h3>
            <p>The obvious benefit is time. Audio lets some knowledge transfer happen in parts of the day where reading simply will not. But the more interesting benefit was that a conversation did something a conventional summary did not.</p>
            <p>One speaker could state the apparent conclusion. Another could question it. A third could connect it to a different source or ask what it might mean in practice. That small amount of friction made the material feel less like compressed information and more like thinking I could participate in.</p>
            <span class="m07-minihead">The interface was the conversation.</span>
            <p>My earliest versions were technically fine and surprisingly unpleasant to listen to. Speaker one would talk for close to a minute. Pause. Speaker two would take a turn. Pause. Speaker three would follow. It was orderly, clear and completely lifeless.</p>
            <p>Shorter turns made a difference. So did different voice qualities, occasional overlap, a challenge arriving before the previous thought had completely settled, and small natural imperfections — an “um”, a “right”, a “hang on”. I did not need the speakers to pretend to be human. I did need the listening experience to have enough rhythm and variation that my attention stayed with it.</p>
            <div class="m07-lesson"><strong>One useful lesson:</strong> accuracy is not the only design problem. If the delivery makes good information difficult to stay with, the knowledge transfer still fails.</div>
            <span class="m07-minihead">Then source transparency exposed a much bigger problem.</span>
            <p>I tested the tool with a roughly 450-page PDF. The podcast sounded informed. It had detail, examples and a coherent narrative. As an experiment, I changed the tool so I could see the generated transcript alongside the exact source pages supporting each part.</p>
            <p>That changed everything. Almost the entire episode was being built from a narrow part of the document — roughly pages 190 to 220. The tool had depth, but nowhere near enough breadth. And because the output sounded fluent, I could easily have mistaken “detailed” for “representative”.</p>
            <p>That led to a redesign of the ingestion step. Instead of finding useful chunks and immediately writing from them, the tool first maps the document, deliberately allocates attention across sections, checks coverage and balances multiple uploaded sources before the script is written.</p>
            <div class="m07-lesson"><strong>The bigger lesson:</strong> AI can sound complete long before it has looked broadly enough. Traceability gave me a way to see the difference.</div>
          </section>

          <section class="field-note-section">
            <h3>Try it in the room</h3>
            <p>For this one, the useful work happens before anybody walks into the room. I would treat it as a learning loop rather than a document-to-podcast conversion.</p>
            <ul>
              <li><strong>Build the source pack deliberately.</strong> Include the documents the sponsor thinks matter, but also the material that brings another perspective: previous decisions, external context, contradictory evidence or the source everyone keeps referring to.</li>
              <li><strong>Map before you summarise.</strong> Ask for the major themes, tensions, decisions, unanswered questions and structure of the material before generating a narrative from it.</li>
              <li><strong>Make evidence visible.</strong> Keep the transcript and attach source names and page references to important claims. The ability to inspect the answer is more useful than a confident voice telling you it is correct.</li>
              <li><strong>Audit breadth.</strong> With a long document, look at which pages or sections are actually being used. With several documents, check whether one source is quietly dominating the others.</li>
              <li><strong>Design the speakers.</strong> Give them different jobs. One might explain, another challenge assumptions, another keep asking “so what does this mean for the workshop?” Different roles are more useful than three voices simply taking turns summarising.</li>
              <li><strong>Design for listening.</strong> Shorter exchanges, changes in pace and enough conversational texture can make dense material easier to stay with. Natural does not have to mean theatrical.</li>
              <li><strong>Capture questions, not just answers.</strong> While listening, note the things you want to test with the sponsor, the words you need clarified and the tensions that might deserve space in the workshop.</li>
              <li><strong>Go back to the source.</strong> When something matters, use the reference and read that section properly. The podcast is an entry point, not permission to stop reading altogether.</li>
            </ul>
            <p class="hand">Source material → conversation → better questions → better room.</p>
          </section>

          <section class="field-note-section">
            <h3>Watch for</h3>
            <p>The main danger is not that the podcast will obviously fail. It is that it will sound good enough to trust too quickly.</p>
            <ul>
              <li><strong>Fluency can disguise missing coverage.</strong> A polished episode built from 30 pages of a 450-page document is still built from 30 pages.</li>
              <li><strong>Compression has a cost.</strong> Twenty minutes of audio cannot preserve every nuance, caveat or argument in a large source pack. Decide what the podcast is for and what it is allowed to leave out.</li>
              <li><strong>References need checking.</strong> A page tag is useful only if it genuinely supports what the speaker is saying. Sampling the links back to source is part of the quality check.</li>
              <li><strong>Internal material needs appropriate handling.</strong> Confidentiality, permissions and where content is processed matter just as much here as they do with any other AI workflow.</li>
              <li><strong>Naturalness can become noise.</strong> A few interruptions and hesitations can make audio feel alive. Too many become an affectation and get between the listener and the material.</li>
              <li><strong>There is a real generation cost.</strong> My version is deliberately not public at this point. Creating multi-speaker audio uses paid AI services, and I do not want an experiment accidentally becoming an open-ended compute bill.</li>
            </ul>
            <p>The most useful outcome for me has not been a podcast library. It has been a better way of thinking about workshop preparation. Knowledge uplift is part of the design work. If I can make that learning more accessible without losing the ability to interrogate the source, I arrive in the room with better questions — and usually a much better sense of what the room actually needs to do.</p>
          </section>

          <div class="field-note-callout">The useful shift wasn't turning documents into audio. It was turning workshop preparation into a traceable learning loop.</div>
        </div>
        <div class="field-note-footer"><span class="hand">A field note from Design My Thinking.</span><strong>Learn the space → question the source → design a better room</strong></div>
      </article>`;
      document.body.appendChild(template);
    }
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
        if(!reduced) timer=setInterval(()=>show(index+1),12000);
      }
      steps.forEach((step,i)=>step.addEventListener('click',()=>{show(i);restart();}));
      show(0);
      restart();
    });
  }

  function isRoute(){ return window.location.pathname.toLowerCase()===PATH; }

  function open(syncRoute){
    const modal=document.getElementById('serviceModal');
    const host=document.getElementById('serviceModalContent');
    const template=document.getElementById(TEMPLATE);
    if(!modal || !host || !template) return;
    host.replaceChildren(template.content.cloneNode(true));
    const panel=modal.querySelector('.modal-panel');
    if(panel){panel.setAttribute('aria-label',LABEL);panel.scrollTop=0;}
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    modal.dataset.musing07='open';
    document.body.style.overflow='hidden';
    document.title=LABEL+' — Design My Thinking';
    initDemo(host);
    if(syncRoute && history.pushState && window.location.pathname!==PATH){
      history.pushState({musing:'read-less-hear-more'},'',PATH);
    }
    const close=modal.querySelector('.modal-close');
    if(close) close.focus();
  }

  function bind(){
    const card=document.querySelector('[data-modal-template="'+TEMPLATE+'"]');
    if(card && !card.dataset.m07Bound){
      card.dataset.m07Bound='1';
      card.addEventListener('click',()=>open(true));
      card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(true);}});
    }
    const modal=document.getElementById('serviceModal');
    if(!modal || modal.dataset.m07RouteBound) return;
    modal.dataset.m07RouteBound='1';
    const panel=modal.querySelector('.modal-panel');
    const normalize=()=>{
      if(isRoute() && history.replaceState) history.replaceState({},'','/musings/');
      if(modal.dataset.musing07==='open'){
        delete modal.dataset.musing07;
        document.title='Musings — Design My Thinking';
      }
    };
    const close=modal.querySelector('.modal-close');
    if(close) close.addEventListener('click',normalize);
    modal.addEventListener('click',e=>{if(panel && !panel.contains(e.target)) normalize();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.dataset.musing07==='open') normalize();});
    window.addEventListener('popstate',()=>{
      if(isRoute()) open(false);
      else if(modal.dataset.musing07==='open'){
        delete modal.dataset.musing07;
        document.title='Musings — Design My Thinking';
      }
    });
  }

  function start(){
    ensure();
    bind();
    if(isRoute()) open(false);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
