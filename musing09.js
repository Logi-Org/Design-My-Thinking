/* Musing 09 — Don't just photograph the wall. */
(function(){
  const PATH='/musings/dont-just-photograph-the-wall/';
  const TEMPLATE='musing-output-pack';
  const LABEL="Don't just photograph the wall.";
  const PLACEHOLDER='data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 4 3%22%3E%3Crect width=%224%22 height=%223%22 fill=%22%23fcf4e3%22/%3E%3C/svg%3E';

  function ensure(){
    const grid=document.querySelector('.musing-grid');
    if(grid && !grid.querySelector('[data-modal-template="'+TEMPLATE+'"]')){
      const card=document.createElement('article');
      card.className='musing-card musing-card--m09';
      card.setAttribute('role','button');
      card.tabIndex=0;
      card.dataset.modalTemplate=TEMPLATE;
      card.dataset.modalLabel=LABEL;
      card.innerHTML=`<span class="hand">Musing 09</span>
        <div class="musing-thumb musing-thumb--output-pack" role="img" aria-label="Hand-drawn workshop output pack bringing activities, outputs, conversations and decisions into one useful story"><img class="m09-art" src="${PLACEHOLDER}" alt="" aria-hidden="true" /></div>
        <h3>Don't just photograph the wall.</h3>
        <p>A workshop output pack should do more than prove the workshop happened. Done well, it becomes a readable record of the conversation, the thinking and the decisions — and something people and AI can actually use afterwards.</p>
        <span class="musing-open">Open the field note →</span>`;
      grid.appendChild(card);
    }

    if(!document.getElementById(TEMPLATE)){
      const template=document.createElement('template');
      template.id=TEMPLATE;
      template.innerHTML=`<article class="field-note field-note--m09">
        <div class="field-note-hero">
          <div>
            <span class="field-note-kicker">Musing 09 · Workshop outputs</span>
            <h2 class="field-note-title">Don't just <span class="marker">photograph the wall.</span></h2>
            <p class="field-note-lede">The workshop shouldn't finish when everyone walks out of the room. And the output pack shouldn't be a collection of happy snaps, unreadable Post-its and photos of people standing beside flipcharts.</p>
          </div>
          <div class="field-note-sketch field-note-sketch--output-pack" role="img" aria-label="Hand-drawn workshop output pack showing an upfront summary, agenda flow, activities, outputs, conversations, quotes, insights and next steps"><img class="m09-art" src="${PLACEHOLDER}" alt="" aria-hidden="true" /></div>
        </div>

        <div class="field-note-body">
          <section class="field-note-section">
            <h3>The thought</h3>
            <p>I've seen plenty of workshop output packs that are really just photo albums.</p>
            <p>A title slide. A copy of the agenda. Photos of the activities. Photos of the walls. Maybe a few pictures of participants looking suitably collaborative. Then fifty slides of Post-its that nobody can actually read.</p>
            <p>There is nothing particularly wrong with keeping those things. They are part of the record. But I think the output pack can do much more.</p>
            <p>For me, it is an opportunity to pull the workshop back together after the room has emptied: a little bit of the activities, a little bit of what people produced, a little bit of what they actually said, and some of the thinking that shaped the design in the first place.</p>
            <div class="m09-lesson"><strong>The pack should feel like the workshop has been distilled — not dumped.</strong></div>
            <p>My preference is simple. Start with a short summary, then follow the workshop agenda. If activity one led to activity two, which changed the conversation going into activity three, the output pack should make that journey visible.</p>
            <p>If it was a two-day workshop, I want to be able to see the two days. If there was an important conversation before lunch that influenced a decision after lunch, I want that thread to survive.</p>
          </section>

          <section class="field-note-section">
            <h3>Why it helps</h3>
            <p>The most useful output packs combine a few different kinds of evidence.</p>
            <p>There are the artefacts people made: Post-its, canvases, roadmaps, prioritisation exercises and drawings. There are the conversations around those artefacts. There are the facilitator's observations and notes. And sometimes there is a transcript from parts of the workshop that were recorded.</p>
            <p>Those things become much more useful when they are brought together.</p>
            <p>A photo of a prioritisation activity is useful context. The actual priorities written underneath it are more useful. A picture of a wall covered in Post-its shows the energy in the room. A short synthesis of the themes on that wall tells me what the room was thinking.</p>
            <p>This is one place where AI has made the work noticeably easier. Modern OCR can often take handwritten or printed material visible in workshop photos and turn it into usable text.</p>
            <p>That matters for readability. But there is another benefit that is becoming increasingly important.</p>
            <p>In many organisations, internal AI tools will have a much easier time working with properly structured text in a PowerPoint or document than they will trying to interpret dozens of photographs buried inside it.</p>
            <p>If I want to ask later what the recurring themes were, where tensions appeared, how this workshop compares with another one, or what decisions were made, machine-readable text gives me a much better starting point than a folder full of wall photographs.</p>
            <div class="m09-lesson"><strong>The output pack becomes useful to the sponsor today — and potentially useful to the organisation's knowledge systems tomorrow.</strong></div>
          </section>

          <section class="field-note-section">
            <h3>When the handwriting wins</h3>
            <p>There is an obvious problem with all of this: workshop handwriting.</p>
            <p>Sharpies, rushed Post-its, strange angles, half-finished sentences and handwriting that even the person who wrote it struggles to recognise an hour later.</p>
            <p>OCR is improving, but it is not magic.</p>
            <p>One of the simplest habits I value happens after everyone has left. Before pulling down the walls, walk the room. Activity by activity. Cluster by cluster. Post-it by Post-it.</p>
            <p>And simply read the content aloud into your phone.</p>
            <p>It sounds laborious. It really isn't. You can move through a wall surprisingly quickly. Now you have a transcript.</p>
            <p>That transcript can sit beside the photographs, which means the visual record stays intact while the content becomes searchable, readable and much easier to synthesise.</p>
            <p>You can keep important comments verbatim, group similar ideas, produce a cleaner summary, or hand the transcript and the images to AI together and ask it to help reconstruct the activity.</p>
            <p>For a few extra minutes at the end of the day, you have rescued a lot of thinking that might otherwise disappear into an unreadable JPEG.</p>
          </section>

          <section class="field-note-section">
            <h3>Structure before polish</h3>
            <p>I also think it helps to separate two jobs.</p>
            <p><strong>First: capture the story.</strong></p>
            <p>Get the photographs in. Get the activities in the right order. Add the transcript. Pull out the quotes. Add the decisions. Summarise the themes. Make sure the story is basically right.</p>
            <p><strong>Then: make it look good.</strong></p>
            <p>This is another area where tools like ChatGPT, Claude and Copilot have changed the effort involved. A rough PowerPoint can now become a reasonably polished one very quickly.</p>
            <p>The starting point does not need to be beautiful. It needs to contain the right material and a sensible structure.</p>
            <p>Then you can ask for help tightening the hierarchy, reducing clutter, improving consistency, making the slides more readable and turning something functional into something you would actually want to send to a sponsor.</p>
            <p>That feels like a much better use of time than spending hours manually nudging text boxes around while the actual workshop content is still sitting untranslated on the wall.</p>
          </section>

          <section class="field-note-section">
            <h3>Try it in the room</h3>
            <ul>
              <li><strong>Design the output pack before the workshop.</strong> Create the basic sections around the agenda so you already know where the outputs will go.</li>
              <li><strong>Capture selectively.</strong> Take clear photographs of the outputs, not just photographs of people doing the activity.</li>
              <li><strong>Keep the sequence.</strong> Label activities, walls and photographs so you can reconstruct the journey later.</li>
              <li><strong>Record important plenary moments where appropriate.</strong> Quotes and short summaries bring the conversation back into the pack.</li>
              <li><strong>Use OCR early.</strong> Turn readable workshop artefacts into text while the context is still fresh.</li>
              <li><strong>Read the wall aloud when OCR struggles.</strong> Ten minutes with your phone can save an hour of guessing later.</li>
              <li><strong>Keep both image and text.</strong> The photograph gives context; the transcription gives usability.</li>
              <li><strong>Summarise for the sponsor.</strong> Put the main outcomes, tensions, decisions and next steps near the front.</li>
              <li><strong>Let the agenda tell the story.</strong> The pack should broadly follow the journey participants actually experienced.</li>
              <li><strong>Polish last.</strong> Get the content right first, then use AI to help with layout and presentation.</li>
            </ul>
            <p class="hand">Photo → transcription → synthesis → story.</p>
          </section>

          <section class="field-note-section">
            <h3>Watch for</h3>
            <p>The biggest risk is confusing <strong>more content</strong> with a better output pack.</p>
            <p>Nobody wants a 140-slide forensic record of every Post-it produced during the day. The sponsor needs enough detail to trust the summary and enough structure to find the deeper material when they need it.</p>
            <ul>
              <li><strong>Don't let AI invent the story.</strong> Use it to organise and synthesise what actually happened.</li>
              <li><strong>Check OCR.</strong> Handwriting recognition can quietly turn one idea into another.</li>
              <li><strong>Be careful with verbatim quotes.</strong> Make sure the wording is accurate and appropriate to attribute.</li>
              <li><strong>Preserve disagreements.</strong> A neat summary can accidentally make a messy workshop look more aligned than it really was.</li>
              <li><strong>Keep originals.</strong> Photos, transcripts and raw outputs are useful evidence even if they don't all belong in the final pack.</li>
              <li><strong>Think about future use.</strong> If the pack might later feed internal search or AI, structured text and sensible headings become much more valuable.</li>
              <li><strong>Don't over-design it.</strong> A beautiful pack that hides the thinking is still a bad output pack.</li>
            </ul>
            <p>If a slide deck still feels too static, the same material can always become something more interactive — including the sort of simple click-through HTML format I've written about elsewhere.</p>
          </section>

          <div class="field-note-callout">The output pack isn't proof that the workshop happened. It's the workshop made useful afterwards.</div>
        </div>
        <div class="field-note-footer"><span class="hand">A field note from Design My Thinking.</span><strong>Capture the room → recover the thinking → tell the story → make it reusable</strong></div>
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
    modal.dataset.musing09='open';
    document.body.style.overflow='hidden';
    document.title=LABEL+' — Design My Thinking';
    if(syncRoute && history.pushState && window.location.pathname!==PATH){
      history.pushState({musing:'dont-just-photograph-the-wall'},'',PATH);
    }
    const close=modal.querySelector('.modal-close');
    if(close) close.focus();
  }

  function bind(){
    const card=document.querySelector('[data-modal-template="'+TEMPLATE+'"]');
    if(card && !card.dataset.m09Bound){
      card.dataset.m09Bound='1';
      card.addEventListener('click',()=>open(true));
      card.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(true); } });
    }
    const modal=document.getElementById('serviceModal');
    if(!modal || modal.dataset.m09RouteBound) return;
    modal.dataset.m09RouteBound='1';
    const panel=modal.querySelector('.modal-panel');
    const normalize=()=>{
      if(isRoute() && history.replaceState) history.replaceState({},'','/musings/');
      if(modal.dataset.musing09==='open'){
        delete modal.dataset.musing09;
        document.title='Musings — Design My Thinking';
      }
    };
    const close=modal.querySelector('.modal-close');
    if(close) close.addEventListener('click',normalize);
    modal.addEventListener('click',e=>{ if(panel && !panel.contains(e.target)) normalize(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&modal.dataset.musing09==='open') normalize(); });
    window.addEventListener('popstate',()=>{
      if(isRoute()) open(false);
      else if(modal.dataset.musing09==='open'){
        delete modal.dataset.musing09;
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
