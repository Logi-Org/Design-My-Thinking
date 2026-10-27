/* Musings theme pills: progressively enhance the full article grid. */
(function(){
 const root=document.querySelector('.musing-theme-filters'),grid=document.querySelector('.musing-grid');
 if(!root||!grid)return;
 const buttons=[...root.querySelectorAll('button[data-filter]')];
 const cards=[...grid.querySelectorAll(':scope > .musing-card')];
 const counter=document.getElementById('musing-theme-filter-count');
 function show(theme){
  let visible=0;
  for(const card of cards){const keep=theme==='all'||card.dataset.theme===theme;card.hidden=!keep;if(keep)visible++;}
  for(const btn of buttons)btn.setAttribute('aria-pressed',String(btn.dataset.filter===theme));
  if(counter)counter.textContent='Showing '+visible+' of '+cards.length+' musings';
 }
 root.addEventListener('click',event=>{const btn=event.target.closest('button[data-filter]');if(btn)show(btn.dataset.filter);});
 show('all');
})();
