/* Final homepage artwork override. Runs after home-rich-art.js so the approved refined sprites replace the previous generated assets without touching the hero. */
(function(){
  document.querySelectorAll('.gl-img').forEach((el)=>{
    el.style.setProperty('background-image','url("assets/dmt/glimpses-refined.avif?v=20260813c")','important');
  });
  document.querySelectorAll('.pr-img').forEach((el)=>{
    el.style.setProperty('background-image','url("assets/dmt/problems-refined.avif?v=20260813c")','important');
  });
})();
