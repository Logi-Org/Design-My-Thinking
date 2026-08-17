/* Homepage AI transformation sketch — approved supplied artwork, 2026-08-18.
   Replaces the generated straight-line canvas treatment with the hand-drawn image. */
(function(){
  const ART_URL='assets/dmt/ai-levels-handdrawn-transparent.webp?v=20260818c';

  function renderAI(host){
    host.style.setProperty('background-image','none','important');
    host.style.setProperty('background-color','transparent','important');
    host.style.setProperty('display','flex','important');
    host.style.setProperty('align-items','center','important');
    host.style.setProperty('justify-content','center','important');
    host.style.setProperty('overflow','hidden','important');
    host.innerHTML='';

    const img=document.createElement('img');
    img.src=ART_URL;
    img.alt='Hand-drawn four-step AI transformation ladder from task level to workflow level, function level and company level';
    img.className='ai-levels-handdrawn';
    img.decoding='async';
    img.style.width='100%';
    img.style.height='100%';
    img.style.objectFit='contain';
    img.style.display='block';
    host.appendChild(img);
  }

  function showAIForVerification(){
    if(new URLSearchParams(location.search).get('verify-ai')!=='1') return;
    const section=document.querySelector('#problems');
    const next=section&&section.querySelector('.dmt-slider__button--next');
    if(!next) return;
    let guard=0;
    while(!next.disabled&&guard<10){
      next.click();
      guard+=1;
    }
  }

  function boot(){
    const host=document.querySelector('.art-problem-05');
    if(host) renderAI(host);
    showAIForVerification();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',boot,{once:true});
  }else{
    boot();
  }
})();
