/* Exact approved simplified glimpse illustrations — 2026-08-18.
   These are the actual image-generation outputs approved in chat. */
(function(){
  const sources=[
    'assets/dmt/glimpse-exact/g1.webp?v=20260818exact3',
    window.DMT_G2 ? 'data:image/webp;base64,'+window.DMT_G2 : '',
    window.DMT_G3 ? 'data:image/webp;base64,'+window.DMT_G3 : '',
    window.DMT_G4 ? 'data:image/webp;base64,'+window.DMT_G4 : '',
    'assets/dmt/glimpse-exact/g5.webp?v=20260818exact3',
    'assets/dmt/glimpse-exact/g6.webp?v=20260818exact3'
  ];
  const labels=[
    'Competing priorities converging through a trade-off knot into one clear choice',
    'Plan A crossed out, pivoting to Plan B and a working group',
    'Current professional services branching through AI scenarios into a future team',
    'A crowd of 70 people splitting into several small-group conversations',
    'A pile of sticky notes narrowing through a funnel into one clear idea',
    'A paper workshop board moving to a lightweight digital tool and active participation'
  ];

  function install(host,index){
    const src=sources[index];
    if(!host||!src) return;
    const existing=host.querySelector('img.glimpse-exact-image');
    if(existing?.dataset.glimpseExact===String(index+1) && existing.getAttribute('src')===src) return;
    host.style.setProperty('background-image','none','important');
    host.style.setProperty('background-color','transparent','important');
    host.style.setProperty('display','flex','important');
    host.style.setProperty('align-items','center','important');
    host.style.setProperty('justify-content','center','important');
    host.style.setProperty('overflow','visible','important');
    host.replaceChildren();
    const img=document.createElement('img');
    img.className='glimpse-exact-image';
    img.dataset.glimpseExact=String(index+1);
    img.src=src;
    img.alt=labels[index];
    img.decoding='async';
    img.draggable=false;
    img.style.width='100%';
    img.style.height='100%';
    img.style.maxWidth='100%';
    img.style.maxHeight='100%';
    img.style.objectFit='contain';
    img.style.display='block';
    host.appendChild(img);
  }

  function render(){
    document.querySelectorAll('#glimpses .gl-img').forEach((host,index)=>install(host,index));
  }

  function protect(){
    document.querySelectorAll('#glimpses .gl-img').forEach((host,index)=>{
      if(host.dataset.exactObserver==='1') return;
      host.dataset.exactObserver='1';
      new MutationObserver(()=>install(host,index)).observe(host,{childList:true});
    });
  }

  render();
  protect();
  requestAnimationFrame(()=>{render();protect();});
  window.addEventListener('load',()=>{render();protect();setTimeout(render,250);setTimeout(render,1200);},{once:true});
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{render();protect();});
})();
