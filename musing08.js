/* Musing 08 — All in one room. All on one board. */
(function(){
  const PATH='/musings/all-in-one-room-all-on-one-board/';
  const TEMPLATE='musing-digital-room';
  const LABEL='All in one room. All on one board.';
  const PLACEHOLDER='data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 9%22%3E%3Crect width=%2216%22 height=%229%22 fill=%22%23fff8e9%22/%3E%3C/svg%3E';

  function ensure(){
    const grid=document.querySelector('.musing-grid');
    if(grid && !grid.querySelector('[data-modal-template="'+TEMPLATE+'"]')){
      const card=document.createElement('article');
      card.className='musing-card musing-card--m08';
      card.setAttribute('role','button');
      card.tabIndex=0;
      card.dataset.modalTemplate=TEMPLATE;
      card.dataset.modalLabel=LABEL;
      card.innerHTML=`<span class="hand">Musing 08</span>
        <div class="musing-thumb musing-thumb--digital-room" role="img" aria-label="Hand-drawn face-to-face workshop using one shared digital whiteboard"><img class="m08-art" src="${PLACEHOLDER}" alt="" aria-hidden="true" /></div>
        <h3>All in one room. All on one board.</h3>
        <p>Everyone was face-to-face, but every meaningful piece of work was captured digitally, live. That gave the room something extra: a shared memory we could interrogate while the workshop was still happening.</p>
        <span class="musing-open">Open the field note →</span>`;
      grid.appendChild(card);
    }

    if(!document.getElementById(TEMPLATE)){
      const template=document.createElement('template');
      template.id=TEMPLATE;
      template.innerHTML=`<article class="field-note field-note--m08">
        <div class="field-note-hero">
          <div>
            <span class="field-note-kicker">Musing 08 · Digital facilitation</span>
            <h2 class="field-note-title">All in one room. <span class="marker">All on one board.</span></h2>
            <p class="field-note-lede">The workshop was 100% face-to-face. The working memory was 100% digital. That combination created a much richer view of what the room was actually thinking.</p>
          </div>
          <div class="field-note-sketch field-note-sketch--digital-room" role="img" aria-label="Hand-drawn workshop room with participants working around a shared digital whiteboard and live AI insights"><img class="m08-art" src="${PLACEHOLDER}" alt="" aria-hidden="true" /></div>
        </div>

        <div class="field-note-body">
          <section class="field-note-section">
            <h3>The thought</h3>
            <p>There is an assumption we sometimes make in workshop design that face-to-face means physical materials. Post-its, butcher's paper, flipcharts, walls covered in outputs. I still like all of those things.</p>
            <p>But recently I helped run a workshop where the sponsor was very clear on two things. First, everyone needed to be physically together. The connection, challenge, side conversations and ability to read the room really mattered. Second, all of the work needed to be captured digitally, live, as the workshop happened.</p>
            <p>So we built the day around a digital whiteboard. Different areas of the board supported different activities. Participants had access. Templates were ready. There were places for vendor input, prioritisation, roadmaps, breakout thinking and sharebacks.</p>
            <div class="m08-lesson"><strong>The people were together physically.</strong><br>The thinking lived digitally.</div>
            <p>During plenary sessions, participants added thoughts and questions directly onto the board. When they moved into physical breakout rooms, the conversation still happened face-to-face, but the work they produced appeared on the same shared board as it developed. When groups came back together, their sharebacks were anchored in the live material they had just created.</p>
            <p>The whiteboard stopped being a digital substitute for a wall. It became a live representation of the workshop.</p>
          </section>

          <section class="field-note-section">
            <h3>Why it helps</h3>
            <p>The most interesting part came when we added AI into that digital layer.</p>
            <p>Instead of waiting until the end of the workshop to work out what had happened, we could focus on the board overall or zoom into the section where a particular activity had taken place and ask questions of it almost immediately.</p>
            <ul>
              <li>What themes are appearing here?</li>
              <li>Where are the groups saying similar things?</li>
              <li>Where are they disagreeing?</li>
              <li>What feels unresolved?</li>
              <li>What assumptions keep appearing?</li>
              <li>What decisions look like they are starting to form?</li>
            </ul>
            <p>That was particularly useful for the sponsor. In a traditional workshop, one person cannot sit in three or four breakout rooms at once. They hear the shareback, but a lot of the nuance that produced it has already disappeared.</p>
            <p>Here, the sponsor could see what was being created across the room and use the digital record to decide where they wanted to dig further. Sometimes the interesting thing was not the answer a group had reached. It was the tension underneath it. Or something one group had raised that another group had ignored. Or a question that kept appearing in different parts of the board.</p>
            <div class="m08-lesson"><strong>One person still couldn't be in every breakout.</strong><br>But the work from every breakout could be visible in one place.</div>
            <p>The transcript added another layer. Because the plenary parts of the session were recorded, we could put what people had <em>said</em> alongside what they had <em>created</em>. The whiteboard gave us the artefacts. The transcript gave us the conversation around them.</p>
            <p>Together, they gave us a much richer record of the day. AI could help connect the two: summarising a particular activity, surfacing friction, pulling out unresolved questions, or helping build a narrative of how the group's thinking shifted over time.</p>
            <p>That felt quite different from simply “using AI in a workshop”. The AI wasn't there to tell participants what to think. It was helping us see more clearly what they had already thought.</p>
          </section>

          <section class="field-note-section">
            <h3>One thing I liked</h3>
            <p>The workshop still felt physical. That mattered.</p>
            <p>People moved. They stood around screens. They went into different rooms. They challenged each other. They came back together. They presented. The technology didn't replace those behaviours. It sat underneath them.</p>
            <p>A room full of people quietly typing into laptops for eight hours would technically create excellent digital capture. It would also be a fairly terrible workshop.</p>
            <p>So part of the design challenge became deciding <strong>when people needed the screen and when they needed each other.</strong></p>
            <p>The digital board was the common workspace. It didn't have to become the activity itself.</p>
          </section>

          <section class="field-note-section">
            <h3>Try it in the room</h3>
            <p>If I were doing this again, I'd think about the digital workspace almost as carefully as the physical room.</p>
            <ul>
              <li><strong>Design the board before the day.</strong> Give each activity an obvious place to happen. Avoid making participants hunt for where their work belongs.</li>
              <li><strong>Sort access early.</strong> Permissions, links, devices and logins should be boring by the time the workshop starts.</li>
              <li><strong>Keep templates simple.</strong> The board should help people think, not make them learn a new interface.</li>
              <li><strong>Keep the breakouts physical.</strong> Move people into different rooms and let them talk face-to-face, even though the capture is digital.</li>
              <li><strong>Create screen-down moments.</strong> Some conversations are better when nobody is typing.</li>
              <li><strong>Synthesise during the day.</strong> After a meaningful activity, zoom into that area of the board and ask what is emerging before moving on.</li>
              <li><strong>Use the insight to change the next conversation.</strong> If a tension, gap or unresolved question appears, bring it back into the room while it still matters.</li>
            </ul>
            <p class="hand">Discuss face-to-face → capture digitally → analyse live → ask better questions.</p>
          </section>

          <section class="field-note-section">
            <h3>Watch for</h3>
            <p>The obvious risk is technology getting in the way of the workshop.</p>
            <ul>
              <li><strong>Tech readiness.</strong> If people can't access the board or don't know where to type, the value disappears quickly.</li>
              <li><strong>Attention drift.</strong> Once a laptop is open, email, messages and the rest of the working day are one tab away.</li>
              <li><strong>Too much screen time.</strong> Digital capture does not mean participants need to stare at a device all day.</li>
              <li><strong>Over-analysis.</strong> Not every cluster of notes needs an AI summary. Use it where the synthesis changes what you do next.</li>
              <li><strong>False authority.</strong> AI summaries are interpretations of the material, not the material itself. Keep the underlying board and transcript visible.</li>
              <li><strong>Consent and privacy.</strong> Be clear about what is being recorded, what is being processed, and how the outputs will be used.</li>
            </ul>
            <p>Movement matters. Breakouts matter. Standing up matters. Changing rooms matters. Talking without typing matters.</p>
            <p>The useful version is not physical <em>or</em> digital. It is physical collaboration with a digital layer underneath it.</p>
          </section>

          <div class="field-note-callout">The room creates the conversation. The digital layer helps us see it.</div>
        </div>
        <div class="field-note-footer"><span class="hand">A field note from Design My Thinking.</span><strong>Physical collaboration → digital capture → live synthesis → better questions</strong></div>
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
    modal.dataset.musing08='open';
    document.body.style.overflow='hidden';
    document.title=LABEL+' — Design My Thinking';
    if(syncRoute && history.pushState && window.location.pathname!==PATH){
      history.pushState({musing:'all-in-one-room-all-on-one-board'},'',PATH);
    }
    const close=modal.querySelector('.modal-close');
    if(close) close.focus();
  }

  function bind(){
    const card=document.querySelector('[data-modal-template="'+TEMPLATE+'"]');
    if(card && !card.dataset.m08Bound){
      card.dataset.m08Bound='1';
      card.addEventListener('click',()=>open(true));
      card.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(true); } });
    }
    const modal=document.getElementById('serviceModal');
    if(!modal || modal.dataset.m08RouteBound) return;
    modal.dataset.m08RouteBound='1';
    const panel=modal.querySelector('.modal-panel');
    const normalize=()=>{
      if(isRoute() && history.replaceState) history.replaceState({},'','/musings/');
      if(modal.dataset.musing08==='open'){
        delete modal.dataset.musing08;
        document.title='Musings — Design My Thinking';
      }
    };
    const close=modal.querySelector('.modal-close');
    if(close) close.addEventListener('click',normalize);
    modal.addEventListener('click',e=>{ if(panel && !panel.contains(e.target)) normalize(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&modal.dataset.musing08==='open') normalize(); });
    window.addEventListener('popstate',()=>{
      if(isRoute()) open(false);
      else if(modal.dataset.musing08==='open'){
        delete modal.dataset.musing08;
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
