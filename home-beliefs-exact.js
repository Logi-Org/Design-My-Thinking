/* Exact approved Things I believe illustrations — enlarged 2026-08-21. */
(function(){
  const sources=[
    'assets/dmt/belief-exact/belief-01.webp?v=20260819beliefs1',
    'assets/dmt/belief-exact/belief-02.webp?v=20260819beliefs1',
    'assets/dmt/belief-exact/belief-03.webp?v=20260819beliefs1',
    'assets/dmt/belief-exact/belief-04.webp?v=20260819beliefs1'
  ];
  const labels=[
    'Hand-drawn clipboard showing a flexible agenda with room to adapt',
    'Hand-drawn contrast between participation and real progress',
    'Hand-drawn sticky notes becoming one clear decision',
    'Hand-drawn discarded exercise leading to a useful insight'
  ];

  function addStyles(){
    if(document.getElementById('belief-exact-styles')) return;
    const style=document.createElement('style');
    style.id='belief-exact-styles';
    style.textContent=`
      .belief-icon{flex:0 0 126px!important;height:126px!important;background:none!important;mix-blend-mode:normal!important;overflow:visible!important}
      .belief-exact-image{width:100%;height:100%;object-fit:contain;display:block;mix-blend-mode:normal}
      @media(max-width:700px){.belief-icon{flex-basis:112px!important;height:112px!important}}
    `;
    document.head.appendChild(style);
  }

  function install(host,index){
    const src=sources[index];
    if(!host||!src) return;
    const existing=host.querySelector('img.belief-exact-image');
    if(existing?.dataset.beliefExact===String(index+1) && existing.getAttribute('src')===src) return;
    host.style.setProperty('background-image','none','important');
    host.style.setProperty('background-color','transparent','important');
    host.style.setProperty('display','flex','important');
    host.style.setProperty('align-items','center','important');
    host.style.setProperty('justify-content','center','important');
    host.replaceChildren();
    const img=document.createElement('img');
    img.className='belief-exact-image';
    img.dataset.beliefExact=String(index+1);
    img.src=src;
    img.alt=labels[index];
    img.decoding='async';
    img.draggable=false;
    host.appendChild(img);
  }

  function render(){
    addStyles();
    document.querySelectorAll('.belief-icon').forEach((host,index)=>install(host,index));
  }

  function protect(){
    document.querySelectorAll('.belief-icon').forEach((host,index)=>{
      if(host.dataset.beliefExactObserver==='1') return;
      host.dataset.beliefExactObserver='1';
      new MutationObserver(()=>install(host,index)).observe(host,{childList:true});
    });
  }

  render();
  protect();
  requestAnimationFrame(()=>{render();protect();});
  window.addEventListener('load',()=>{render();protect();setTimeout(render,250);setTimeout(render,1200);},{once:true});
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{render();protect();});
})();
