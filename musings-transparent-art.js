/* Musings transparent artwork pass — 2026-08-25.
   Removes baked cream paper from approved illustrations at runtime. Musing 06
   is rendered directly from its approved image asset for maximum browser compatibility. */
(function(){
  const M06_ART='/assets/dmt/musing-06-let-the-workshop-remember.webp?v=20260825c';
  const ART = [
    {cls:'musing-thumb--scenarios', url:'assets/dmt/musings-approved-scenarios.webp?v=20260816b'},
    {cls:'musing-thumb--questions', url:'assets/dmt/musings-approved-seed.webp?v=20260816b'},
    {cls:'musing-thumb--canvas', url:'assets/dmt/musings-approved-canvas.webp?v=20260816b'},
    {cls:'musing-thumb--html', url:'assets/dmt/musings-approved-wallpaper.webp?v=20260816b'},
    {cls:'musing-thumb--reverse-flow', url:'assets/dmt/musing-05-start-big-then-go-deep.webp?v=20260825d'},
    {cls:'field-note-sketch--scenarios', url:'assets/dmt/musings-approved-scenarios.webp?v=20260816b'},
    {cls:'field-note-sketch--questions', url:'assets/dmt/musings-approved-seed.webp?v=20260816b'},
    {cls:'field-note-sketch--canvas', url:'assets/dmt/musings-approved-canvas.webp?v=20260816b'},
    {cls:'field-note-sketch--html', url:'assets/dmt/musings-approved-wallpaper.webp?v=20260816b'},
    {cls:'field-note-sketch--reverse-flow', url:'assets/dmt/musing-05-start-big-then-go-deep.webp?v=20260825d'}
  ];

  const cache = new Map();

  function averageBackground(data,w,h){
    const samples=[];
    const padX=Math.max(8,Math.floor(w*.08));
    const padY=Math.max(8,Math.floor(h*.08));
    const areas=[[0,padX,0,padY],[w-padX,w,0,padY],[0,padX,h-padY,h],[w-padX,w,h-padY,h]];
    for(const [x0,x1,y0,y1] of areas){
      for(let y=y0;y<y1;y+=2){
        for(let x=x0;x<x1;x+=2){
          const i=(y*w+x)*4, r=data[i], g=data[i+1], b=data[i+2];
          const max=Math.max(r,g,b), min=Math.min(r,g,b), sat=max-min;
          const lum=.2126*r+.7152*g+.0722*b;
          if(lum>165 && sat<70) samples.push([r,g,b]);
        }
      }
    }
    if(!samples.length) return [247,233,207];
    samples.sort((a,b)=>(a[0]+a[1]+a[2])-(b[0]+b[1]+b[2]));
    const mid=samples.slice(Math.floor(samples.length*.2),Math.ceil(samples.length*.8));
    const sum=mid.reduce((s,p)=>[s[0]+p[0],s[1]+p[1],s[2]+p[2]],[0,0,0]);
    return sum.map(v=>v/mid.length);
  }

  function transparentDataURL(img){
    const c=document.createElement('canvas');
    c.width=img.naturalWidth; c.height=img.naturalHeight;
    const ctx=c.getContext('2d',{willReadFrequently:true});
    ctx.drawImage(img,0,0);
    const image=ctx.getImageData(0,0,c.width,c.height), d=image.data;
    const bg=averageBackground(d,c.width,c.height);
    for(let i=0;i<d.length;i+=4){
      const r=d[i],g=d[i+1],b=d[i+2];
      const max=Math.max(r,g,b), min=Math.min(r,g,b), sat=max-min;
      const lum=.2126*r+.7152*g+.0722*b;
      const dr=r-bg[0],dg=g-bg[1],db=b-bg[2],dist=Math.sqrt(dr*dr+dg*dg+db*db);
      let a=255;
      if(dist<22 && lum>145 && sat<72) a=0;
      else if(dist<68 && lum>155 && sat<62) a=Math.round(255*((dist-22)/(68-22)));
      else if(lum>238 && sat<34) a=0;
      else if(lum>220 && sat<48 && dist<90) a=Math.min(a,Math.round(255*((dist-35)/55)));
      d[i+3]=Math.max(0,Math.min(255,a));
    }
    ctx.clearRect(0,0,c.width,c.height);
    ctx.putImageData(image,0,0);
    return c.toDataURL('image/png');
  }

  function load(url){
    if(cache.has(url)) return cache.get(url);
    const p=new Promise((resolve,reject)=>{
      const img=new Image();
      img.decoding='async';
      img.onload=()=>{ try{ resolve(transparentDataURL(img)); }catch(err){ reject(err); } };
      img.onerror=reject;
      img.src=url;
    });
    cache.set(url,p);
    return p;
  }

  function renderHost(host,url){
    if(host.dataset.transparentArt==='done') return;
    host.dataset.transparentArt='pending';
    load(url).then(src=>{
      host.style.setProperty('background-image','none','important');
      host.style.setProperty('background-color','transparent','important');
      host.innerHTML='';
      const img=document.createElement('img');
      img.className='musing-transparent-art musing-runtime-art';
      img.alt=''; img.setAttribute('aria-hidden','true'); img.src=src;
      host.appendChild(img);
      host.dataset.transparentArt='done';
    }).catch(()=>{ host.dataset.transparentArt='failed'; });
  }

  function renderAll(root=document){
    ART.forEach(({cls,url})=>root.querySelectorAll('.'+cls).forEach(host=>renderHost(host,url)));
  }

  const M06_PATH='/musings/let-the-workshop-remember/';
  const M06_TEMPLATE='musing-workshop-memory';

  function ensureMusing06(){
    const grid=document.querySelector('.musing-grid');
    if(grid && !grid.querySelector('[data-modal-template="'+M06_TEMPLATE+'"]')){
      const card=document.createElement('article');
      card.className='musing-card';
      card.setAttribute('role','button');
      card.tabIndex=0;
      card.dataset.modalTemplate=M06_TEMPLATE;
      card.dataset.modalLabel='Let the workshop remember';
      card.innerHTML='<span class="hand">Musing 06</span>'+ 
        '<div class="musing-thumb musing-thumb--workshop-memory" role="img" aria-label="Hand-drawn workshop flow moving from selective recording to AI summary and a visible wall of the day\'s story">'+
          '<img class="musing-m06-art" src="'+M06_ART+'" alt="" aria-hidden="true" />'+
        '</div>'+ 
        '<h3>Let the workshop remember</h3>'+ 
        '<p>Selective recording and quick AI summaries can preserve more than the final output — they can make the journey of the workshop visible.</p>'+ 
        '<span class="musing-open">Open the field note →</span>';
      grid.appendChild(card);
    }

    if(!document.getElementById(M06_TEMPLATE)){
      const template=document.createElement('template');
      template.id=M06_TEMPLATE;
      template.innerHTML=`<article class="field-note">
        <div class="field-note-hero">
          <div>
            <span class="field-note-kicker">Musing 06 · Workshop memory</span>
            <h2 class="field-note-title">Let the workshop <span class="marker">remember.</span></h2>
            <p class="field-note-lede">Most workshop outputs capture where the room landed. In a recent face-to-face session, selective recording and fast AI summaries created a visible memory of how the thinking developed.</p>
          </div>
          <div class="field-note-sketch field-note-sketch--workshop-memory" role="img" aria-label="Hand-drawn flow showing plenary recording, breakouts off-record, sharebacks, an AI summary and the story building on the workshop wall"><img class="musing-m06-art" src="${M06_ART}" alt="" aria-hidden="true" /></div>
        </div>
        <div class="field-note-body">
          <section class="field-note-section"><h3>The thought</h3><p>A lot of useful workshop thinking disappears almost as quickly as it happens. We remember the Post-its and the final decisions, but the thread connecting one conversation to the next is harder to hold onto.</p><p>With the group's permission, we selectively recorded plenary conversations, activity instructions and participant sharebacks. We switched recording off for breakout discussions. After each recorded section, we used the transcript to create a short AI summary, printed it, and added it to the wall.</p><p>Over the day, the wall became a visible memory of the workshop — not a verbatim transcript, but a trace of how the thinking developed.</p></section>
          <section class="field-note-section"><h3>Why it helps</h3><ul><li>Gives participants a quick way to revisit earlier conversations.</li><li>Makes the thread between activities and decisions easier to see.</li><li>Helps later reflection build on what the room has already discussed.</li><li>Gives sponsors a clearer narrative of how the group moved from the opening conversation to the eventual outcomes and next steps.</li></ul></section>
          <section class="field-note-section"><h3>Try it in the room</h3><ul><li><strong>Be selective.</strong> Record plenary conversations, activity briefs and sharebacks — not everything.</li><li><strong>Switch off for breakouts.</strong> Those conversations are simultaneous, messy and difficult to capture cleanly.</li><li><strong>Distil while it is fresh.</strong> After each recording, generate the transcript and ask AI for the main themes and useful points.</li><li><strong>Keep it short.</strong> The summary needs to be scannable, not another transcript.</li><li><strong>Print it and add it to the wall.</strong> Let the workshop's memory build while the workshop is still happening.</li></ul><p class="hand">Record selectively → distil quickly → make the thinking visible.</p></section>
          <section class="field-note-section"><h3>Watch for</h3><ul><li><strong>Consent first.</strong> Be explicit about what is being recorded, why and how it will be used.</li><li><strong>AI summaries are interpretations.</strong> They can miss nuance or flatten disagreement, so treat them as a memory aid rather than the authoritative record.</li><li><strong>More recording is not necessarily better.</strong> Capture the moments that help the room remember.</li><li><strong>Protect the human conversation.</strong> The recording should support the workshop, never become the reason people hold back.</li></ul></section>
          <div class="field-note-callout">Most workshop artefacts show where we finished. There is real value in leaving behind a trace of how we got there.</div>
        </div>
        <div class="field-note-footer"><span class="hand">A field note from Design My Thinking.</span><strong>Conversation → summary → shared memory</strong></div>
      </article>`;
      document.body.appendChild(template);
    }
  }

  function isM06Route(){
    return window.location.pathname.toLowerCase()===M06_PATH;
  }

  function openMusing06(syncRoute){
    const modal=document.getElementById('serviceModal');
    const host=document.getElementById('serviceModalContent');
    const template=document.getElementById(M06_TEMPLATE);
    if(!modal || !host || !template) return;
    host.replaceChildren(template.content.cloneNode(true));
    const panel=modal.querySelector('.modal-panel');
    if(panel){ panel.setAttribute('aria-label','Let the workshop remember'); panel.scrollTop=0; }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    modal.dataset.musing06='open';
    document.body.style.overflow='hidden';
    document.title='Let the workshop remember — Design My Thinking';
    if(syncRoute && window.history && window.history.pushState && window.location.pathname!==M06_PATH){
      window.history.pushState({musing:'let-the-workshop-remember'},'',M06_PATH);
    }
    renderAll(host);
    const close=modal.querySelector('.modal-close');
    if(close) close.focus();
  }

  function bindMusing06(){
    const card=document.querySelector('[data-modal-template="'+M06_TEMPLATE+'"]');
    if(card && !card.dataset.m06Bound){
      card.dataset.m06Bound='1';
      const open=()=>openMusing06(true);
      card.addEventListener('click',open);
      card.addEventListener('keydown',e=>{
        if(e.key==='Enter' || e.key===' '){ e.preventDefault(); open(); }
      });
    }

    const modal=document.getElementById('serviceModal');
    if(!modal || modal.dataset.m06RouteBound) return;
    modal.dataset.m06RouteBound='1';
    const panel=modal.querySelector('.modal-panel');
    const normalize=()=>{
      if(isM06Route() && window.history && window.history.replaceState){
        window.history.replaceState({},'','/musings/');
      }
      if(modal.dataset.musing06==='open'){
        delete modal.dataset.musing06;
        document.title='Musings — Design My Thinking';
      }
    };
    const close=modal.querySelector('.modal-close');
    if(close) close.addEventListener('click',normalize);
    modal.addEventListener('click',e=>{ if(panel && !panel.contains(e.target)) normalize(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape' && modal.dataset.musing06==='open') normalize(); });
    window.addEventListener('popstate',()=>{
      if(isM06Route()) openMusing06(false);
      else if(modal.dataset.musing06==='open'){
        delete modal.dataset.musing06;
        document.title='Musings — Design My Thinking';
      }
    });
  }

  function start(){
    ensureMusing06();
    renderAll();
    bindMusing06();
    if(isM06Route()) openMusing06(false);
    const observer=new MutationObserver(muts=>{
      for(const m of muts){
        for(const node of m.addedNodes){
          if(node.nodeType===1){
            if(node.matches && ART.some(a=>node.classList.contains(a.cls))) renderAll(node.parentNode||document);
            else if(node.querySelector) renderAll(node);
          }
        }
      }
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
