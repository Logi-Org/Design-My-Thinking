/* Musing 10 — If all you're doing is presenting, do you really need a workshop? */
(function(){
  const PATH='/musings/do-you-really-need-a-workshop/';
  const TEMPLATE='musing-workshop-vs-presentation';
  const LABEL="If all you're doing is presenting, do you really need a workshop?";
  const PLACEHOLDER='data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 4 5%22%3E%3Crect width=%224%22 height=%225%22 fill=%22%23fff8e9%22/%3E%3C/svg%3E';

  function ensure(){
    const grid=document.querySelector('.musing-grid');
    if(grid && !grid.querySelector('[data-modal-template="'+TEMPLATE+'"]')){
      const card=document.createElement('article');
      card.className='musing-card musing-card--m10';
      card.setAttribute('role','button');
      card.tabIndex=0;
      card.dataset.modalTemplate=TEMPLATE;
      card.dataset.modalLabel=LABEL;
      card.innerHTML=`<span class="hand">Musing 10</span>
        <div class="musing-thumb musing-thumb--workshop-vs-presentation" role="img" aria-label="Hand-drawn comparison between a one-way presentation and a collaborative workshop"><img class="m10-art" src="${PLACEHOLDER}" alt="" aria-hidden="true" /></div>
        <h3>If all you're doing is presenting, do you really need a workshop?</h3>
        <p>If the goal is simply to inform people, there are easier ways. Workshops earn their keep when people need to discuss, challenge, shape and align together.</p>
        <span class="musing-open">Open the field note →</span>`;
      grid.appendChild(card);
    }

    if(!document.getElementById(TEMPLATE)){
      const template=document.createElement('template');
      template.id=TEMPLATE;
      template.innerHTML=`<article class="field-note field-note--m10">
        <div class="field-note-hero">
          <div>
            <span class="field-note-kicker">Musing 10 · Workshop design</span>
            <h2 class="field-note-title">If all you're doing is presenting, <span class="marker">do you really need a workshop?</span></h2>
            <p class="field-note-lede">If the objective is simply to inform people, a workshop may be an expensive way to do something an email, a deck or a short call could do. The value starts when people are there to shape, challenge and align together.</p>
          </div>
          <div class="field-note-sketch field-note-sketch--workshop-vs-presentation" role="img" aria-label="Hand-drawn sketch contrasting presentation mode with workshop mode"><img class="m10-art" src="${PLACEHOLDER}" alt="" aria-hidden="true" /></div>
        </div>

        <div class="field-note-body">
          <section class="field-note-section">
            <h3>The thought</h3>
            <p>I've seen this a few times.</p>
            <p>A workshop sponsor, usually with very good intentions, has already put together the agenda before we really get into the design.</p>
            <p>And on first inspection, it looks pretty good.</p>
            <p>There's a logical sequence. Clear sections. Sensible timings. Breaks in the right places. Often quite a lot of thought and effort has gone into it.</p>
            <p>But then you look a little closer.</p>
            <p>Twenty minutes of context. Thirty minutes of research findings. Another presentation on the proposed approach. A project update. A presentation from another team. Questions at the end.</p>
            <p>And you realise something.</p>
            <div class="m10-lesson"><strong>It isn't really a workshop. It's a series of presentations.</strong></div>
            <p>Which raises a fairly simple question: <strong>if all you're doing is presenting, why do you need a workshop at all?</strong></p>
            <p>If the objective is simply to inform people, there are much easier ways to do it.</p>
            <p>Send the deck. Write an email. Record a video. Run a short Teams call.</p>
            <p>Do the research, make the decision, explain the logic and tell people where you're heading.</p>
            <p>There is absolutely a place for that. But it's worth being clear about what it is.</p>
            <p><strong>It's communication, not co-creation.</strong></p>
          </section>

          <section class="field-note-section">
            <h3>Workshops should create something that wouldn't happen otherwise</h3>
            <p>Bringing a group of people together is expensive.</p>
            <p>Not just in venue costs, travel or accommodation, but in the collective time of everyone sitting in the room.</p>
            <p>Ten senior people spending half a day together is a significant investment.</p>
            <p>So the question I increasingly find useful is:</p>
            <div class="m10-question">What are we going to achieve by having these people together that we couldn't achieve by simply sending them the information?</div>
            <p>That is where the value of a workshop starts to become clearer.</p>
            <p>A good workshop creates space for people to:</p>
            <ul>
              <li>challenge assumptions</li>
              <li>hear different perspectives</li>
              <li>build on one another's thinking</li>
              <li>expose disagreements and tensions</li>
              <li>understand why others see the problem differently</li>
              <li>explore possibilities together</li>
              <li>make trade-offs</li>
              <li>gradually build alignment</li>
              <li>leave with some sense of shared ownership</li>
            </ul>
            <p>Most of that doesn't happen while somebody is standing at the front of the room clicking through slides.</p>
            <p>It happens in the conversations between people.</p>
          </section>

          <section class="field-note-section">
            <h3>The presentation is often the smallest part</h3>
            <p>That doesn't mean workshops shouldn't contain presentations.</p>
            <p>They often should.</p>
            <p>People need context. They need evidence. They need to understand the problem they are being asked to work on.</p>
            <p>But the presentation should usually be there <strong>in service of the conversation</strong>, rather than becoming the conversation.</p>
            <p>Five or ten minutes of context might unlock forty minutes of valuable discussion.</p>
            <p>A simple provocation might be more useful than twenty slides of explanation.</p>
            <p>A piece of research might be introduced briefly, then handed over to participants to interrogate, challenge and build upon.</p>
            <p>The aim isn't to demonstrate how much work has already been done.</p>
            <p>The aim is to give people enough to work with.</p>
          </section>

          <section class="field-note-section">
            <h3>There is also a difference between consultation and co-creation</h3>
            <p>Another version of this appears when a small team has already done a lot of excellent work.</p>
            <p>They've conducted the research. They've analysed the options. They've developed the recommendation. They've mapped out the direction.</p>
            <p>Then everyone else is invited into a workshop and walked through the answer.</p>
            <p>Again, none of that work is inherently wrong.</p>
            <p>Sometimes that's exactly what needs to happen.</p>
            <p>But if we then describe the session as co-creation, we should probably challenge ourselves.</p>
            <p>Because people can tell the difference between being invited to <strong>shape something</strong> and being invited to <strong>react to something that has already been decided</strong>.</p>
            <p>If we genuinely want people to have their fingerprints on the outcome, there has to be something meaningful left for them to influence.</p>
            <p>That might mean shaping the direction. Testing assumptions. Working through trade-offs. Identifying risks. Challenging the research. Prioritising options. Or simply surfacing tensions that haven't yet been resolved.</p>
            <p>Without that space, participation can become theatre.</p>
          </section>

          <section class="field-note-section">
            <h3>So perhaps the starting question isn't “What's the agenda?”</h3>
            <p>It might be:</p>
            <div class="m10-question">Why are we bringing these people together?</div>
            <p>If the answer is: <strong>“We need them to understand what we've decided.”</strong></p>
            <p>You may not need a workshop.</p>
            <p>If the answer is:</p>
            <ul>
              <li>“We need their perspectives.”</li>
              <li>“We need to work through some difficult trade-offs.”</li>
              <li>“We need to expose disagreement.”</li>
              <li>“We need to build something together.”</li>
              <li>“We need people to leave with genuine ownership of the outcome.”</li>
            </ul>
            <p>Then a workshop may be exactly the right tool.</p>
            <p>And the agenda should reflect that.</p>
            <p>Less time presenting conclusions. More time working things through together.</p>
            <p>Because workshops aren't valuable simply because people are in the same room.</p>
            <p>They're valuable because of what becomes possible when those people actually get involved.</p>
          </section>

          <section class="field-note-section">
            <h3>Try it in the room</h3>
            <p>Before building the agenda, ask one question: <strong>what genuinely needs the room?</strong></p>
            <p>Put the information transfer elsewhere where you can. Pre-reading, a short deck, a recording or a concise opening can carry the context. Protect the face-to-face or live time for the parts that need interaction: sense-making, challenge, trade-offs, tension, decision-making and alignment.</p>
            <p>If the important decisions are already fixed, say so. Consultation can still be useful, but don't design participation that implies people have influence they do not actually have.</p>
            <p class="hand">Inform outside the room where you can. Use the room for the thinking that needs other people.</p>
          </section>

          <section class="field-note-section">
            <h3>Watch for</h3>
            <ul>
              <li><strong>Presentation creep.</strong> Ten minutes of useful context quietly becomes forty-five minutes of slides.</li>
              <li><strong>Participation theatre.</strong> People are asked for input even though the answer is effectively locked.</li>
              <li><strong>Over-correction.</strong> Not every presentation is bad. Sometimes the room genuinely needs a shared fact base before it can work.</li>
              <li><strong>False consensus.</strong> The goal isn't to remove disagreement; it is to make the important disagreements visible enough to work with.</li>
              <li><strong>Activity for activity's sake.</strong> A workshop isn't made participative by adding Post-its. The interaction has to change the thinking or the outcome.</li>
            </ul>
          </section>

          <div class="field-note-callout">The presentation should be there in service of the conversation — rather than becoming the conversation.</div>
        </div>
        <div class="field-note-footer"><span class="hand">A field note from Design My Thinking.</span><strong>Context → conversation → challenge → alignment</strong></div>
      </article>`;
      document.body.appendChild(template);
    }
  }

  function isRoute(){ return window.location.pathname.toLowerCase()===PATH; }

  function open(syncRoute){
    const modal=document.getElementById('serviceModal');
    const host=document.getElementById('serviceModalContent');
    const template=document.getElementById(TEMPLATE);
    if(!modal || !host || !template) return;
    host.replaceChildren(template.content.cloneNode(true));
    const panel=modal.querySelector('.modal-panel');
    if(panel){ panel.setAttribute('aria-label',LABEL); panel.scrollTop=0; }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    modal.dataset.musing10='open';
    document.body.style.overflow='hidden';
    document.title=LABEL+' — Design My Thinking';
    if(syncRoute && history.pushState && window.location.pathname!==PATH){
      history.pushState({musing:'do-you-really-need-a-workshop'},'',PATH);
    }
    const close=modal.querySelector('.modal-close');
    if(close) close.focus();
  }

  function bind(){
    const card=document.querySelector('[data-modal-template="'+TEMPLATE+'"]');
    if(card && !card.dataset.m10Bound){
      card.dataset.m10Bound='1';
      card.addEventListener('click',()=>open(true));
      card.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(true); } });
    }
    const modal=document.getElementById('serviceModal');
    if(!modal || modal.dataset.m10RouteBound) return;
    modal.dataset.m10RouteBound='1';
    const panel=modal.querySelector('.modal-panel');
    const normalize=()=>{
      if(isRoute() && history.replaceState) history.replaceState({},'','/musings/');
      if(modal.dataset.musing10==='open'){
        delete modal.dataset.musing10;
        document.title='Musings — Design My Thinking';
      }
    };
    const close=modal.querySelector('.modal-close');
    if(close) close.addEventListener('click',normalize);
    modal.addEventListener('click',e=>{ if(panel && !panel.contains(e.target)) normalize(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&modal.dataset.musing10==='open') normalize(); });
    window.addEventListener('popstate',()=>{
      if(isRoute()) open(false);
      else if(modal.dataset.musing10==='open'){
        delete modal.dataset.musing10;
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
