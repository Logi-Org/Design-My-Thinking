/* Final homepage artwork override. Runs after home-rich-art.js so the approved refined sprites replace the previous generated assets without touching the hero. */
(function(){
  document.querySelectorAll('.gl-img').forEach((el)=>{
    const image = el.classList.contains('art-glimpse-01')
      ? 'url("assets/dmt/glimpse-priorities-decision.svg?v=20260816a")'
      : 'url("assets/dmt/glimpses-refined.avif?v=20260813d")';
    el.style.setProperty('background-image', image, 'important');
  });
  document.querySelectorAll('.pr-img').forEach((el)=>{
    const image = el.classList.contains('art-problem-03')
      ? 'url("assets/dmt/problem-decision-over-discussion.svg?v=20260816a")'
      : 'url("assets/dmt/problems-refined.avif?v=20260813d")';
    el.style.setProperty('background-image', image, 'important');
  });
})();
