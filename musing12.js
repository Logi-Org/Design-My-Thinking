/* Musing 12 — To chair or not to chair? */
(function(){
  const PATH='/musings/to-chair-or-not-to-chair/';
  const TEMPLATE='musing-chair-sensemaking';
  const LABEL='To chair or not to chair?';
  const ART='/assets/dmt/musing-12-to-chair-or-not-to-chair.svg?v=20261003a';

  function ensure(){
    const grid=document.querySelector('.musing-grid');
    if(grid && !grid.querySelector('[data-modal-template="'+TEMPLATE+'"]')){
      const card=document.createElement('article');
      card.className='musing-card musing-card--m12';
      card.setAttribute('role','button');
      card.tabIndex=0;
      card.dataset.modalTemplate=TEMPLATE;
      card.dataset.modalLabel=LABEL;
      card.innerHTML=`<span class="hand">Musing 12</span>
        <div class="musing-thumb musing-thumb--chair-sensemaking" role="img" aria-label="Hand-drawn loop from senior conversation to transcript, synthesis, artefact and a better next conversation"><img class="m12-art" src="${ART}" alt="" aria-hidden="true" /></div>
        <h3>To chair or not to chair?</h3>
        <p>Not every useful session needs activities and breakouts. Sometimes the facilitator's value is helping a room understand itself while the conversation is still happening.</p>
        <span class="musing-open">Open the field note →</span>`;
      grid.appendChild(card);
    }

    if(!document.getElementById(TEMPLATE)){
      const template=document.createElement('template');
      template.id=TEMPLATE;
      template.innerHTML=`<article class="field-note field-note--m12">
        <div class="field-note-hero">
          <div>
            <span class="field-note-kicker">Musing 12 · Facilitation</span>
            <h2 class="field-note-title">To chair or <span class="marker">not to chair?</span></h2>
            <p class="field-note-lede">A recent senior meeting reminded me that facilitation does not always need to look like a workshop. Sometimes the value comes from turning the conversation back into something useful while it is still happening.</p>
          </div>
          <div class="field-note-sketch field-note-sketch--chair-sensemaking" role="img" aria-label="Hand-drawn live sense-making loop"><img class="m12-art" src="${ART}" alt="" aria-hidden="true" /></div>
        </div>

        <div class="field-note-body">
          <section class="field-note-section">
            <h3>A different kind of session</h3>
            <p>I recently ran a session where the sponsor was very clear from the outset: this was less of a workshop and more like chairing a senior meeting.</p>
            <p>That distinction mattered. There was no tightly designed agenda, no breakout activities, no canvases waiting to be filled in and no carefully engineered outputs. We had a handful of broad questions, a room of around 15 senior participants, and a significant amount of dense legal material to work through.</p>
            <p>The lawyers in the room were comfortable with that. In fact, the supporting material was intentionally substantial: thick PowerPoints, lots of reading, lots of detail, and plenty for people to absorb before and during the conversation.</p>
            <p>My initial concern was that I wasn't quite sure where I was going to add value. My normal world is more deliberately designed. I'm usually thinking about the shape of a workshop, the activities, the sequencing, the artefacts people will create, and the moments where we diverge and converge.</p>
            <p>This session was going to be much looser.</p>
          </section>

          <section class="field-note-section">
            <h3>Keep the transcript running</h3>
            <p>What I discovered was a different way of adding value — one that probably would not have been available to us even six to twelve months ago.</p>
            <p>The meeting was entirely face-to-face, but I still set up Microsoft Teams and ran a live transcript throughout the session. Because everyone was physically in the same room, Teams could not reliably distinguish who was speaking. Most of the transcript effectively appeared under my name.</p>
            <p>That turned out not to matter very much.</p>
            <p>As the conversation unfolded, I kept a very light set of notes. I captured emerging themes and questions. When somebody said something particularly sharp, useful or memorable, I wrote down three things: who had said it, roughly when they had said it, and one or two words to remind me what the comment was about.</p>
            <p>That was enough to find it again later.</p>
          </section>

          <section class="field-note-section">
            <h3>Use the break for live synthesis</h3>
            <p>During the breaks, I could go back to the transcript and use Copilot to interrogate the conversation that had just happened.</p>
            <p>I could ask for the main themes from the previous hour. I could ask it to summarise a particular part of the discussion. I could ask for the arguments or tensions sitting underneath one topic. And if I wanted to recover a particular comment, I could point it towards the approximate time and the keyword I had written down.</p>
            <p>Suddenly, a fairly messy live conversation became much easier to work with.</p>
            <div class="m12-lesson"><strong>The important part wasn't creating a perfect record. It was creating enough structure to make the conversation useful again, quickly.</strong></div>
          </section>

          <section class="field-note-section">
            <h3>Turn the synthesis into something tangible</h3>
            <p>The next step was equally simple. I would take the output from Copilot — perhaps four emerging themes and a short explanation of each — and paste it roughly into four PowerPoint slides. There was nothing elegant about the first draft. It was genuinely rough and ready.</p>
            <p>Then I would use Copilot inside PowerPoint with a very basic instruction: clean these slides up and make them suitable for printing.</p>
            <p>A few minutes later, I would do a quick accuracy check, make sure the summaries genuinely reflected the discussion and that nothing strange or invented had crept in, and send them to the printer.</p>
            <p>By the time the participants came back from the break, there was a fresh summary sitting in the room waiting for them.</p>
          </section>

          <section class="field-note-section">
            <h3>What came back into the room</h3>
            <p>That turned out to be incredibly useful. People could look at the pages and immediately reorient themselves. Yes, that is what we were talking about. Yes, those were the tensions. Yes, that captures the point we were trying to make.</p>
            <p>Several participants commented on how accurate and helpful the summaries were.</p>
            <p>What I found interesting was that these pages were not really minutes. They were not a comprehensive record of everything that had been said. They were also not a polished deliverable produced after the event.</p>
            <p>They were something in between.</p>
            <p><strong>They were a live sense-making device.</strong></p>
            <div class="m12-loop">Conversation → transcript → synthesis → artefact → better conversation.</div>
            <p>The conversation happened. The transcript captured it. AI helped me compress and interrogate it. I turned that into something visual and tangible. And then that artefact went back into the room and helped shape the next part of the conversation.</p>
          </section>

          <section class="field-note-section">
            <h3>Where the facilitator still adds value</h3>
            <p>For facilitators, I think this opens up another way of thinking about the value we can provide.</p>
            <p>Sometimes our value comes from designing the activity. Sometimes it comes from asking the difficult question, managing the dynamics or helping a group make a decision. And sometimes, particularly in a looser senior conversation, our value may be in helping the room understand itself while the conversation is still happening.</p>
            <p>There is another important point here: this did not require a production team. I was running the session alone.</p>
            <p>Because there were no breakouts, complicated templates or moving pieces to coordinate, I had enough capacity during the breaks to do this myself. The technology did most of the mechanical work. My role was to listen, notice what mattered, ask the right questions of the transcript and make a judgement about what was worth putting back in front of the group.</p>
            <p><strong>AI was not facilitating the meeting. It was giving me more leverage as the person facilitating — or perhaps, in this case, chairing — the conversation.</strong></p>
          </section>

          <section class="field-note-section">
            <h3>The learning I'll carry forward</h3>
            <p>Not every session needs to become a highly designed workshop. Sometimes the right format genuinely is a senior conversation around a table with good material and good questions.</p>
            <p>But even in those sessions, we now have new ways to create structure, memory and momentum around the conversation as it unfolds.</p>
            <p class="hand">What new forms of value can we now add to a room that simply were not practical a year ago?</p>
          </section>

          <div class="field-note-callout">Listen deeply. Capture lightly. Feed the thinking back into the room while it can still change the conversation.</div>
        </div>
        <div class="field-note-footer"><span class="hand">A field note from Design My Thinking.</span><strong>Conversation → sense-making → momentum</strong></div>
      </article>`;
      document.body.appendChild(template);
    }
  }

  function isRoute(){ return window.location.pathname.toLowerCase()===PATH; }
  function open(syncRoute){
    const modal=document.getElementById('serviceModal');
    const host=document.getElementById('serviceModalContent');
    const template=document.getElementById(TEMPLATE);
    if(!modal||!host||!template) return;
    host.replaceChildren(template.content.cloneNode(true));
    const panel=modal.querySelector('.modal-panel');
    if(panel){ panel.setAttribute('aria-label',LABEL); panel.scrollTop=0; }
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false');
    modal.dataset.musing12='open'; document.body.style.overflow='hidden';
    document.title=LABEL+' — Design My Thinking';
    if(syncRoute&&history.pushState&&window.location.pathname!==PATH){history.pushState({musing:'to-chair-or-not-to-chair'},'',PATH);}
    const close=modal.querySelector('.modal-close'); if(close) close.focus();
  }
  function bind(){
    const card=document.querySelector('[data-modal-template="'+TEMPLATE+'"]');
    if(card&&!card.dataset.m12Bound){
      card.dataset.m12Bound='1';
      card.addEventListener('click',()=>open(true));
      card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(true);}});
    }
    const modal=document.getElementById('serviceModal');
    if(!modal||modal.dataset.m12RouteBound) return;
    modal.dataset.m12RouteBound='1';
    const panel=modal.querySelector('.modal-panel');
    const normalize=()=>{
      if(isRoute()&&history.replaceState) history.replaceState({},'','/musings/');
      if(modal.dataset.musing12==='open'){delete modal.dataset.musing12;document.title='Musings — Design My Thinking';}
    };
    const close=modal.querySelector('.modal-close'); if(close) close.addEventListener('click',normalize);
    modal.addEventListener('click',e=>{if(panel&&!panel.contains(e.target)) normalize();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.dataset.musing12==='open') normalize();});
    window.addEventListener('popstate',()=>{if(isRoute())open(false);else if(modal.dataset.musing12==='open'){delete modal.dataset.musing12;document.title='Musings — Design My Thinking';}});
  }
  function start(){ensure();bind();if(isRoute())open(false);}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
})();