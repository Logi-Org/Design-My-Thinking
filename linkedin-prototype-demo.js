(function(){
  const opportunities=[
    {
      id:'workflow',score:88,title:'AI adoption is becoming a workflow redesign problem',summary:'Teams are moving beyond individual copilots and discovering that the harder work sits between tasks: hand-offs, judgement and accountability.',source:'Demo industry article',theme:'AI & implementation',action:'Thoughtful comment',why:['Strong match with AI implementation and organisational design.','The conversation is specific enough to add something useful rather than generic agreement.','There is room to extend the idea from individual productivity into workflow and decision design.'],angle:'Shift the conversation from “which AI tool?” to “where does judgement, context and accountability sit in the workflow?”',drafts:{
        agree:'The useful extension for me is that workflow redesign is not simply about inserting AI between two existing steps. It is about deciding where judgement should sit, what context the tool needs, and where a person genuinely needs to remain accountable.\n\nThat is often the difference between automating a task and changing how the work actually gets done.',
        challenge:'The assumption I would challenge is that adoption is primarily a capability or training problem. Training matters, but people can become very capable with AI while the surrounding workflow still makes it difficult to use well.\n\nThe more interesting design question is where the work, decisions and hand-offs themselves need to change.',
        reframe:'Perhaps the better question is not “how do we get more people using AI?” but “which parts of this workflow should become easier, different or unnecessary because AI now exists?”\n\nThat reframing tends to move the conversation from tool adoption towards actual operating-model change.'
      }
    },
    {
      id:'review',score:82,title:'Human review should vary with consequence, not be a generic checkpoint',summary:'A discussion about human-in-the-loop AI argues that the same approval pattern should not be used for every decision.',source:'Demo leadership post',theme:'AI & governance',action:'Comment',why:['Clear overlap with responsible AI and decision quality.','A practical contribution can distinguish meaningful human authority from ceremonial approval.','The topic supports a concise point of view rather than a long explainer.'],angle:'Make human review proportional to consequence and ensure the reviewer can actually inspect, challenge and change the outcome.',drafts:{
        agree:'I think the important part is whether the human review can actually change the outcome. A checkbox at the end of an automated process may technically keep a person in the loop while leaving the tool with most of the practical authority.\n\nThe level of review should probably rise with the consequence of the decision, not stay fixed because the workflow happens to contain AI.',
        challenge:'I would be cautious about treating “human in the loop” as a safety mechanism by itself. If the reviewer lacks context, time or authority, the review can become ceremonial.\n\nThe stronger design requirement is that the person can understand the evidence, challenge the recommendation and reverse it when needed.',
        reframe:'A more useful design question may be: what authority must remain meaningfully human at this point in the workflow?\n\nThat forces us to think about consequence, expertise and accountability rather than simply adding another approval step.'
      }
    },
    {
      id:'innovation',score:76,title:'The innovation bottleneck often appears after idea generation',summary:'A practitioner argues that most organisations have plenty of ideas but struggle to select, test and resource them consistently.',source:'Demo innovation newsletter',theme:'Innovation',action:'Agree + extend',why:['Direct match with innovation and facilitation themes.','The post leaves room for a practical operating insight.','Useful opportunity to move from creativity towards selection and experimentation.'],angle:'Explore the organisational mechanisms that turn ideas into experiments, decisions and funded work.',drafts:{
        agree:'This matches what I see as well. Generating more ideas is rarely the difficult part. The harder part is creating a visible route from idea → test → evidence → decision.\n\nWithout that, creativity can feel productive while very little actually changes. The quality of the selection and learning system matters as much as the quality of the ideas.',
        challenge:'I would push slightly on the idea that organisations mainly need to become more creative. Many already generate more possibilities than they can meaningfully pursue.\n\nThe constraint is often downstream: how ideas are compared, tested, sponsored and stopped when the evidence is weak.',
        reframe:'Perhaps the question is not “how do we generate more ideas?” but “what has to be true for a promising idea to earn its next small investment?”\n\nThat makes innovation a learning and allocation system, rather than an ideation event.'
      }
    }
  ];

  const list=document.getElementById('opportunityList');
  const listView=document.getElementById('demoListView');
  const detailView=document.getElementById('demoDetailView');
  const detailTitle=document.getElementById('detailTitle');
  const detailSummary=document.getElementById('detailSummary');
  const detailWhy=document.getElementById('detailWhy');
  const detailAngle=document.getElementById('detailAngle');
  const draft=document.getElementById('demoDraft');
  const formatLabel=document.getElementById('draftModeLabel');
  let selected=null;
  let mode='agree';

  function renderList(){
    list.innerHTML='';
    opportunities.forEach(item=>{
      const button=document.createElement('button');
      button.type='button';
      button.className='opportunity-card';
      button.innerHTML='<div class="opportunity-head"><div><h3>'+item.title+'</h3><p>'+item.summary+'</p></div><span class="score">'+item.score+'</span></div><div class="source-line">'+item.source+' · '+item.theme+' · Suggested: '+item.action+'</div>';
      button.addEventListener('click',()=>openDetail(item));
      list.appendChild(button);
    });
  }

  function setMode(next){
    mode=next;
    document.querySelectorAll('.pov-button').forEach(btn=>btn.classList.toggle('active',btn.dataset.mode===mode));
    if(selected){draft.textContent=selected.drafts[mode];formatLabel.textContent=mode==='agree'?'Agree + extend':mode==='challenge'?'Challenge':'Reframe'}
  }

  function openDetail(item){
    selected=item;
    detailTitle.textContent=item.title;
    detailSummary.textContent=item.summary;
    detailWhy.innerHTML='';
    item.why.forEach(reason=>{const li=document.createElement('li');li.textContent=reason;detailWhy.appendChild(li)});
    detailAngle.textContent=item.angle;
    listView.style.display='none';
    detailView.classList.add('is-open');
    setMode('agree');
    detailView.scrollIntoView({block:'nearest',behavior:'smooth'});
  }

  function closeDetail(){
    selected=null;
    detailView.classList.remove('is-open');
    listView.style.display='block';
  }

  renderList();
  document.getElementById('detailBack').addEventListener('click',closeDetail);
  document.querySelectorAll('.pov-button').forEach(btn=>btn.addEventListener('click',()=>setMode(btn.dataset.mode)));
  document.getElementById('demoReset').addEventListener('click',()=>{closeDetail();window.scrollTo({top:document.getElementById('demo').offsetTop-80,behavior:'smooth'})});
})();