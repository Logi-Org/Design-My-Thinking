/* Homepage artwork refinement.
   Keep the approved raster sprite family for the existing scenes, but draw the
   two revised decision concepts as deliberately imperfect canvas sketches so
   they share the loose ink / sticky-note language of the hero. */
(function(){
  const PAPER = '#fdf6ea';
  const INK = '#29231e';
  const YELLOW = '#f5d64e';
  const PINK = '#eca0b8';
  const BLUE = '#9fd4df';
  const MINT = '#b9d7b9';

  document.querySelectorAll('.gl-img').forEach((el)=>{
    if (el.classList.contains('art-glimpse-01')) {
      el.style.setProperty('background-image','none','important');
      return;
    }
    el.style.setProperty('background-image','url("assets/dmt/glimpses-refined.avif?v=20260813d")','important');
  });
  document.querySelectorAll('.pr-img').forEach((el)=>{
    if (el.classList.contains('art-problem-03')) {
      el.style.setProperty('background-image','none','important');
      return;
    }
    el.style.setProperty('background-image','url("assets/dmt/problems-refined.avif?v=20260813d")','important');
  });

  function seeded(seed){
    let s = seed >>> 0;
    return function(){
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function makeSketch(el, label, seed){
    if (!el || el.querySelector('canvas')) return null;
    const c = document.createElement('canvas');
    c.width = 900;
    c.height = 560;
    c.setAttribute('aria-hidden','true');
    c.style.width = '100%';
    c.style.height = '100%';
    c.style.display = 'block';
    c.style.mixBlendMode = 'multiply';
    c.dataset.sketch = label;
    el.appendChild(c);
    const ctx = c.getContext('2d');
    const rnd = seeded(seed);
    return {c,ctx,rnd};
  }

  function j(rnd, n=2.5){ return (rnd()-.5)*n*2; }

  function paper(ctx,rnd){
    ctx.fillStyle = PAPER;
    ctx.fillRect(0,0,900,560);
    ctx.save();
    ctx.globalAlpha = .07;
    ctx.strokeStyle = '#8b725b';
    ctx.lineWidth = 1;
    for(let i=0;i<180;i++){
      const x=rnd()*900, y=rnd()*560, len=8+rnd()*28;
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x+len,y+j(rnd,1.2));
      ctx.stroke();
    }
    ctx.restore();
  }

  function roughLine(ctx,rnd,x1,y1,x2,y2,w=3,alpha=1){
    ctx.save();
    ctx.strokeStyle = INK;
    ctx.globalAlpha = alpha;
    ctx.lineCap = 'round';
    for(let pass=0;pass<2;pass++){
      ctx.lineWidth = Math.max(1,w-(pass*.9));
      ctx.beginPath();
      const mx=(x1+x2)/2+j(rnd,3), my=(y1+y2)/2+j(rnd,3);
      ctx.moveTo(x1+j(rnd,1.6),y1+j(rnd,1.6));
      ctx.quadraticCurveTo(mx,my,x2+j(rnd,1.6),y2+j(rnd,1.6));
      ctx.stroke();
    }
    ctx.restore();
  }

  function roughPoly(ctx,rnd,pts,fill=null,w=3){
    ctx.save();
    if(fill){ ctx.fillStyle=fill; ctx.globalAlpha=.95; }
    ctx.strokeStyle=INK;
    ctx.lineWidth=w;
    ctx.lineJoin='round';
    ctx.beginPath();
    ctx.moveTo(pts[0][0]+j(rnd,2),pts[0][1]+j(rnd,2));
    for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0]+j(rnd,2),pts[i][1]+j(rnd,2));
    ctx.closePath();
    if(fill) ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function roughEllipse(ctx,rnd,cx,cy,rx,ry,w=3){
    ctx.save();
    ctx.strokeStyle=INK;
    ctx.lineWidth=w;
    for(let pass=0;pass<2;pass++){
      ctx.beginPath();
      ctx.ellipse(cx+j(rnd,2),cy+j(rnd,2),rx+j(rnd,2),ry+j(rnd,2),j(rnd,.01),0,Math.PI*2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function arrow(ctx,rnd,x1,y1,x2,y2,w=3){
    roughLine(ctx,rnd,x1,y1,x2,y2,w);
    const a=Math.atan2(y2-y1,x2-x1);
    const s=16;
    roughLine(ctx,rnd,x2,y2,x2-Math.cos(a-.55)*s,y2-Math.sin(a-.55)*s,w);
    roughLine(ctx,rnd,x2,y2,x2-Math.cos(a+.55)*s,y2-Math.sin(a+.55)*s,w);
  }

  function font(ctx,size,weight=700){
    ctx.font = `${weight} ${size}px Caveat, cursive`;
    ctx.fillStyle = INK;
    ctx.textBaseline = 'middle';
  }

  function sticky(ctx,rnd,x,y,w,h,color,text,rotation=0,size=27){
    ctx.save();
    ctx.translate(x+w/2,y+h/2);
    ctx.rotate(rotation);
    ctx.shadowColor='rgba(40,30,20,.18)';
    ctx.shadowBlur=10;
    ctx.shadowOffsetX=5;
    ctx.shadowOffsetY=6;
    const pts=[[-w/2+j(rnd,2),-h/2+j(rnd,2)],[w/2+j(rnd,2),-h/2+j(rnd,2)],[w/2+j(rnd,2),h/2+j(rnd,2)],[-w/2+j(rnd,2),h/2+j(rnd,2)]];
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.moveTo(pts[0][0],pts[0][1]);
    for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0],pts[i][1]);
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor='transparent';
    ctx.strokeStyle='rgba(41,35,30,.42)';
    ctx.lineWidth=1.6;
    ctx.stroke();
    // a couple of imperfect paper fibres
    ctx.globalAlpha=.13;
    ctx.strokeStyle='#725e4d';
    for(let yy=-h/3; yy<h/2; yy+=18){
      ctx.beginPath();ctx.moveTo(-w/2+8,yy+j(rnd,1));ctx.lineTo(w/2-8,yy+j(rnd,1));ctx.stroke();
    }
    ctx.globalAlpha=1;
    font(ctx,size,700);
    ctx.textAlign='center';
    ctx.fillText(text,0,2);
    ctx.restore();
  }

  function person(ctx,rnd,x,y,scale=1){
    roughEllipse(ctx,rnd,x,y-45*scale,13*scale,13*scale,2.6*scale);
    roughLine(ctx,rnd,x,y-32*scale,x,y+10*scale,2.8*scale);
    roughLine(ctx,rnd,x,y-18*scale,x-22*scale,y+1*scale,2.5*scale);
    roughLine(ctx,rnd,x,y-17*scale,x+22*scale,y-2*scale,2.5*scale);
    roughLine(ctx,rnd,x,y+10*scale,x-18*scale,y+42*scale,2.5*scale);
    roughLine(ctx,rnd,x,y+10*scale,x+18*scale,y+42*scale,2.5*scale);
  }

  function scribbleText(ctx,text,x,y,size=31,align='left'){
    font(ctx,size,700);
    ctx.textAlign=align;
    ctx.fillText(text,x,y);
  }

  function drawPriorities(){
    const el=document.querySelector('.art-glimpse-01');
    const s=makeSketch(el,'competing priorities to one decision',8127);
    if(!s) return;
    const {ctx,rnd}=s;
    paper(ctx,rnd);

    const notes=[
      [58,54,PINK,'people',-.045],[196,44,YELLOW,'speed',.035],[337,56,BLUE,'quality',-.025],
      [112,160,YELLOW,'cost',-.025],[270,154,PINK,'risk',.025],[409,152,MINT,'impact',-.02],
      [168,278,PINK,'effort',.025],[340,286,BLUE,'time',-.025]
    ];
    notes.forEach(n=>sticky(ctx,rnd,n[0],n[1],112,60,n[2],n[3],n[4],25));

    roughEllipse(ctx,rnd,470,220,88,84,3.2);
    scribbleText(ctx,'trade-offs',470,225,31,'center');
    // messy paths into the trade-off conversation
    [[112,110],[250,103],[392,113],[165,220],[324,215],[462,210],[220,336],[390,345]].forEach((p,i)=>{
      const tx=435+(i%3)*20, ty=180+(i%4)*22;
      arrow(ctx,rnd,p[0],p[1],tx,ty,2.2);
    });

    // decision sheet
    const sheet=[[625,83],[830,78],[838,369],[612,375]];
    roughPoly(ctx,rnd,sheet,'#fffaf0',3);
    sticky(ctx,rnd,702,50,120,56,PINK,'DECIDE',-.035,25);
    scribbleText(ctx,'one decision',720,131,34,'center');
    [190,250,310].forEach((yy,idx)=>{
      roughPoly(ctx,rnd,[[653,yy-12],[680,yy-12],[680,yy+15],[653,yy+15]],null,2.4);
      roughLine(ctx,rnd,705,yy,800,yy,2,idx===1?1:.5);
    });
    roughLine(ctx,rnd,654,245,665,260,4);
    roughLine(ctx,rnd,665,260,687,225,4);
    arrow(ctx,rnd,558,228,614,230,3.3);

    person(ctx,rnd,92,477,.8);
    person(ctx,rnd,152,485,.72);
    scribbleText(ctx,'make the tensions visible',52,536,31,'left');
    roughLine(ctx,rnd,52,516,314,516,1.4,.55);
  }

  function speechBubble(ctx,rnd,cx,cy,rx,ry){
    roughEllipse(ctx,rnd,cx,cy,rx,ry,2.6);
    roughLine(ctx,rnd,cx-rx*.25,cy+ry*.75,cx-rx*.38,cy+ry+20,2.2);
    for(let i=-1;i<=1;i++) roughLine(ctx,rnd,cx-rx*.45,cy+i*15,cx+rx*.38,cy+i*15,1.5,.7);
  }

  function drawDecision(){
    const el=document.querySelector('.art-problem-03');
    const s=makeSketch(el,'decision not just discussion',4931);
    if(!s) return;
    const {ctx,rnd}=s;
    paper(ctx,rnd);
    scribbleText(ctx,'good discussion',66,46,31,'left');
    speechBubble(ctx,rnd,130,120,78,48);
    speechBubble(ctx,rnd,265,151,72,43);
    speechBubble(ctx,rnd,364,108,72,45);

    person(ctx,rnd,105,420,.78);
    person(ctx,rnd,198,444,.68);
    person(ctx,rnd,286,420,.8);
    person(ctx,rnd,416,452,.68);
    arrow(ctx,rnd,170,248,315,244,2.4);
    arrow(ctx,rnd,315,244,206,276,2.2);

    // a rough choice canvas
    roughPoly(ctx,rnd,[[465,88],[635,91],[632,322],[462,322]],'#fffaf0',3);
    sticky(ctx,rnd,480,118,92,55,YELLOW,'option A',-.025,22);
    sticky(ctx,rnd,545,184,92,55,PINK,'option B',.02,22);
    scribbleText(ctx,'choose',500,280,29,'left');
    arrow(ctx,rnd,635,250,700,250,3);

    // clear decision note with tape
    sticky(ctx,rnd,710,168,145,105,BLUE,'DECISION',-.035,31);
    ctx.save();
    ctx.fillStyle='rgba(213,183,126,.62)';
    ctx.translate(780,165);ctx.rotate(.035);ctx.fillRect(-38,-19,76,22);ctx.restore();
    roughLine(ctx,rnd,754,232,776,254,5);
    roughLine(ctx,rnd,776,254,817,205,5);
    scribbleText(ctx,'clear choice',694,405,31,'left');
    scribbleText(ctx,'clear owner',694,442,31,'left');
    ctx.save();ctx.strokeStyle=PINK;ctx.lineWidth=7;ctx.globalAlpha=.8;ctx.beginPath();ctx.moveTo(690,466);ctx.lineTo(856,461);ctx.stroke();ctx.restore();
  }

  const render=()=>{ drawPriorities(); drawDecision(); };
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(render); }
  else if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',render,{once:true}); }
  else render();
})();
