/* Musing 11 — Don't close the workshop. Land it. */
(function(){
  const PATH='/musings/dont-close-the-workshop-land-it/';
  const TEMPLATE='musing-land-the-workshop';
  const LABEL="Don't close the workshop. Land it.";
  const PLACEHOLDER='data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 4 3%22%3E%3Crect width=%224%22 height=%223%22 fill=%22%23fff8e9%22/%3E%3C/svg%3E';

  function ensure(){
    const grid=document.querySelector('.musing-grid');
    if(grid && !grid.querySelector('[data-modal-template="'+TEMPLATE+'"]')){
      const card=document.createElement('article');
      card.className='musing-card musing-card--m11';
      card.setAttribute('role','button');
      card.tabIndex=0;
      card.dataset.modalTemplate=TEMPLATE;
      card.dataset.modalLabel=LABEL;
      card.innerHTML=`<span class="hand">Musing 11</span>
        <div class="musing-thumb musing-thumb--land-workshop" role="img" aria-label="Hand-drawn aeroplane landing on a runway, contrasting collaboration debt with a stronger workshop handoff"><img class="m11-art" src="${PLACEHOLDER}" alt="" aria-hidden="true" /></div>
        <h3>Don't close the workshop. Land it.</h3>
        <p>“Next steps” are useful. But going one level deeper can make the handover clearer and give the work a better chance of surviving after the workshop.</p>
        <span class="musing-open">Open the field note →</span>`;
      grid.appendChild(card);
    }

    if(!document.getElementById(TEMPLATE)){
      const template=document.createElement('template');
      template.id=TEMPLATE;
      template.innerHTML=`<article class="field-note field-note--m11">
        <div class="field-note-hero">
          <div>
            <span class="field-note-kicker">Musing 11 · Workshop design</span>
            <h2 class="field-note-title">Don't close the workshop. <span class="marker">Land it.</span></h2>
            <p class="field-note-lede">A workshop can create clarity and alignment in the room, then lose it again on the way out. “Next steps” help. Designing the landing goes one level deeper.</p>
          </div>
          <div class="field-note-sketch field-note-sketch--land-workshop" role="img" aria-label="Hand-drawn aeroplane landing on a runway labelled Decisions, Unresolved, Next, Baton and Context, with collaboration debt to one side"><img class="m11-art" src="${PLACEHOLDER}" alt="" aria-hidden="true" /></div>
        </div>

        <div class="field-note-body">
          <section class="field-note-section">
            <h3>The thought</h3>
            <p>We spend a lot of time designing what happens inside a workshop. We think carefully about the questions, activities, sequence, room and conversations we want people to have. We try to create the conditions for good thinking, useful challenge, alignment and progress.</p>
            <p>But I’m increasingly wondering whether we spend enough time designing what happens immediately after the workshop.</p>
            <p>I’ve been thinking about the idea of <strong>collaboration debt</strong>. It describes the friction that builds when gaps in process, relationships and information are left unresolved. Context gets lost, decisions are revisited, and people leave with different interpretations of what happened. None of these things may feel significant in the moment, but over time they make collaboration slower and harder.</p>
            <p>A well-designed workshop should help reduce some of that debt. It can bring different perspectives into the same room, surface assumptions, build shared context and help people make progress.</p>
            <div class="m11-lesson"><strong>But there is an uncomfortable possibility too: a workshop can also create collaboration debt.</strong></div>
            <p>A group can leave feeling aligned without necessarily being aligned. One person may believe a decision was made, while someone else thinks it was only discussed. The room may have been full of energy and useful thinking, but a week later nobody is quite sure what happened next.</p>
          </section>

          <section class="field-note-section">
            <h3>“Next steps” might not be enough</h3>
            <p>This is where the familiar workshop question of <strong>“what are the next steps?”</strong> starts to matter.</p>
            <p>Most workshops already try to close this way, and rightly so. The challenge is that the answers can still be surprisingly vague. “Sarah will speak to James.” “We’ll socialise this with leadership.” “We’ll come back together in a few weeks.”</p>
            <p>These sound like actions, but they don’t always give the work enough momentum to survive beyond the session. What is Sarah speaking to James about? Is James being asked to decide something, approve something, or simply be informed? What does “socialise” actually mean? Who is responsible for moving things forward?</p>
            <p>So perhaps the opportunity isn’t to replace next steps. It is to go <strong>one level deeper</strong>.</p>
          </section>

          <section class="field-note-section">
            <h3>Go one level deeper</h3>
            <p>Instead of asking only what happens next, we can be more explicit. <strong>What did we actually decide? What remains unresolved? What is the next meaningful movement of the work? Who now has the baton? What context or shared understanding needs to survive once people return to their day jobs?</strong></p>
            <p>These questions are still, in a sense, next steps. They simply force greater precision. They separate decisions from open questions, ownership from activity, and action from intention.</p>
            <p>Importantly, this doesn’t mean the facilitator becomes the project manager. It doesn’t mean chasing actions, running stand-ups or staying attached to the work. Responsibility for delivery should still sit with the sponsor and the team who own it.</p>
            <p>The facilitator’s role is different.</p>
            <div class="m11-question">It is to make the handover stronger.</div>
          </section>

          <section class="field-note-section">
            <h3>From closing to landing</h3>
            <p>That has made me wonder whether <strong>“close” is the wrong way to think about the final stage of a workshop</strong>.</p>
            <p>Closing tells us the session is finished.</p>
            <p>Landing asks whether the work is ready to continue once the session is finished.</p>
            <p>The question shifts from <strong>“Have we finished the workshop?”</strong> to <strong>“Have we designed the work to survive without us?”</strong></p>
            <p>Because the real value of a workshop isn’t the energy in the room, the number of Post-it notes on the wall or even the clarity people feel at 4:30pm. The value is what people are able to do differently afterwards.</p>
            <p>So perhaps the final responsibility of a facilitator isn’t simply to bring the workshop to a good close.</p>
            <p class="hand">Perhaps it is to design the landing.</p>
          </section>

          <section class="field-note-section">
            <h3>Try it in the room</h3>
            <p>Keep asking for next steps, but make the closing conversation more deliberate. Before the room breaks, work through five lenses: <strong>Decisions, Unresolved, Next, Baton and Context.</strong> The aim isn’t to create a detailed delivery plan. It is to make the handover explicit enough that the people who own the work can pick it up without having to reconstruct the workshop a week later.</p>
          </section>

          <section class="field-note-section">
            <h3>Watch for</h3>
            <p>Landing should not become a heavy project-management ritual. The point is not to capture every action or keep the facilitator involved indefinitely. It is to remove the most important ambiguity while the people, context and decisions are still in the room.</p>
          </section>

          <div class="field-note-callout">Don’t just close the workshop. Design the landing.</div>
        </div>
        <div class="field-note-footer"><span class="hand">A field note from Design My Thinking.</span><strong>Decide → clarify → hand over → carry forward</strong></div>
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
    modal.dataset.musing11='open';
    document.body.style.overflow='hidden';
    document.title=LABEL+' — Design My Thinking';
    if(syncRoute && history.pushState && window.location.pathname!==PATH){
      history.pushState({musing:'dont-close-the-workshop-land-it'},'',PATH);
    }
    const close=modal.querySelector('.modal-close');
    if(close) close.focus();
  }

  function bind(){
    const card=document.querySelector('[data-modal-template="'+TEMPLATE+'"]');
    if(card && !card.dataset.m11Bound){
      card.dataset.m11Bound='1';
      card.addEventListener('click',()=>open(true));
      card.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(true); } });
    }
    const modal=document.getElementById('serviceModal');
    if(!modal || modal.dataset.m11RouteBound) return;
    modal.dataset.m11RouteBound='1';
    const panel=modal.querySelector('.modal-panel');
    const normalize=()=>{
      if(isRoute() && history.replaceState) history.replaceState({},'','/musings/');
      if(modal.dataset.musing11==='open'){
        delete modal.dataset.musing11;
        document.title='Musings — Design My Thinking';
      }
    };
    const close=modal.querySelector('.modal-close');
    if(close) close.addEventListener('click',normalize);
    modal.addEventListener('click',e=>{ if(panel && !panel.contains(e.target)) normalize(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&modal.dataset.musing11==='open') normalize(); });
    window.addEventListener('popstate',()=>{
      if(isRoute()) open(false);
      else if(modal.dataset.musing11==='open'){
        delete modal.dataset.musing11;
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
