/* Assemble the high-resolution generated artwork from small JS chunks.
   This avoids the low-resolution traced/vector look while keeping the page copy in HTML. */
(function(){
  const art=window.DMT_ART||{};
  const dataUrl=(b64)=>b64?`url("data:image/avif;base64,${b64}")`:'';

  const hero=document.querySelector('.art-hero');
  if(hero&&art.hero){
    hero.style.setProperty('background-image',dataUrl(art.hero),'important');
  }

  if(art.glimpses){
    document.querySelectorAll('.gl-img').forEach((el)=>{
      el.style.setProperty('background-image',dataUrl(art.glimpses),'important');
    });
  }

  if(art.problems){
    document.querySelectorAll('.pr-img').forEach((el)=>{
      el.style.setProperty('background-image',dataUrl(art.problems),'important');
    });
  }
})();
