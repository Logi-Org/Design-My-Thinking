/* Simplified hand-drawn homepage glimpse artwork — 2026-08-18. */
(function(){
  const INK='#2b241e', PINK='#ef93aa', YELLOW='#f6d454', BLUE='#8fcde0', GREEN='#a9d58a', PAPER='#fffaf1', RED='#ee6e68';
  function rng(seed){let s=seed>>>0;return()=>((s=(1664525*s+1013904223)>>>0)/4294967296)}
  function setup(host,label){
    host.style.setProperty('background-image','none','important');
    host.style.setProperty('background-color','transparent','important');
    host.innerHTML='';
    const c=document.createElement('canvas'); c.width=1200;c.height=760;c.className='handdrawn-canvas glimpse-simple-canvas';
    c.setAttribute('role','img');c.setAttribute('aria-label',label);host.appendChild(c);return c.getContext('2d');
  }
  function line(ctx,pts,r,w=8,j=2,passes=2,color=INK){ctx.save();ctx.strokeStyle=color;ctx.lineCap='round';ctx.lineJoin='round';for(let p=0;p<passes;p++){ctx.lineWidth=w-(p?2:0);ctx.beginPath();pts.forEach(([x,y],i)=>{x+=(r()-.5)*j*2;y+=(r()-.5)*j*2;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke()}ctx.restore()}
  function poly(ctx,pts,r,fill=PAPER,w=7){ctx.save();ctx.fillStyle=fill;ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();ctx.restore();line(ctx,[...pts,pts[0]],r,w,2,2)}
  function rect(ctx,x,y,w,h,r,fill=PAPER,rot=0){ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(rot);ctx.translate(-w/2,-h/2);poly(ctx,[[x+3,y+5],[x+w-5,y+1],[x+w,y+h-6],[x+2,y+h]],r,fill,6);ctx.restore()}
  function text(ctx,t,x,y,size=58,align='center'){ctx.save();ctx.fillStyle=INK;ctx.font=`700 ${size}px Caveat, cursive`;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillText(t,x,y);ctx.restore()}
  function sticky(ctx,x,y,w,h,r,fill,rot=0,marks=true){rect(ctx,x,y,w,h,r,fill,rot);if(marks){line(ctx,[[x+w*.28,y+h*.43],[x+w*.72,y+h*.43]],r,6,1,1);line(ctx,[[x+w*.33,y+h*.62],[x+w*.66,y+h*.62]],r,6,1,1)}}
  function arrow(ctx,x1,y1,x2,y2,r,w=10,bend=0){const mx=(x1+x2)/2,my=(y1+y2)/2+bend;line(ctx,[[x1,y1],[mx,my],[x2,y2]],r,w,2,2);const a=Math.atan2(y2-my,x2-mx),s=25;line(ctx,[[x2,y2],[x2-Math.cos(a-.65)*s,y2-Math.sin(a-.65)*s]],r,w,1,1);line(ctx,[[x2,y2],[x2-Math.cos(a+.65)*s,y2-Math.sin(a+.65)*s]],r,w,1,1)}
  function circle(ctx,x,y,rad,r,fill='#fff'){ctx.save();ctx.fillStyle=fill;ctx.beginPath();ctx.arc(x,y,rad,0,Math.PI*2);ctx.fill();ctx.restore();ctx.save();ctx.strokeStyle=INK;ctx.lineWidth=6;ctx.beginPath();ctx.arc(x+(r()-.5)*2,y+(r()-.5)*2,rad,0,Math.PI*2);ctx.stroke();ctx.restore()}
  function person(ctx,x,y,s,r,fill){circle(ctx,x,y,20*s,r,fill);ctx.save();ctx.fillStyle=fill;ctx.strokeStyle=INK;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(x-30*s,y+52*s);ctx.quadraticCurveTo(x,y+16*s,x+30*s,y+52*s);ctx.lineTo(x+30*s,y+70*s);ctx.lineTo(x-30*s,y+70*s);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}
  function check(ctx,x,y,r,scale=1,color=INK){line(ctx,[[x,y],[x+35*scale,y+40*scale],[x+95*scale,y-35*scale]],r,12*scale,2,2,color)}
  function rays(ctx,x,y,r,color=INK){[[0,-44],[34,-30],[44,5],[30,36],[-30,36],[-44,5],[-34,-30]].forEach(([dx,dy])=>line(ctx,[[x+dx*.72,y+dy*.72],[x+dx,y+dy]],r,6,1,1,color))}
  function bulb(ctx,x,y,s,r){circle(ctx,x,y,31*s,r,YELLOW);line(ctx,[[x-10*s,y+28*s],[x-6*s,y+50*s],[x+8*s,y+50*s],[x+12*s,y+28*s]],r,6*s,1,1);line(ctx,[[x-7*s,y+58*s],[x+7*s,y+58*s]],r,6*s,1,1);rays(ctx,x,y,r)}
  function robot(ctx,x,y,s,r){rect(ctx,x-42*s,y-34*s,84*s,68*s,r,'#fff',-.02);circle(ctx,x-17*s,y-2*s,6*s,r,INK);circle(ctx,x+17*s,y-2*s,6*s,r,INK);line(ctx,[[x-16*s,y+15*s],[x,y+23*s],[x+17*s,y+14*s]],r,5*s,1,1);line(ctx,[[x,y-34*s],[x,y-50*s]],r,5*s,1,1);circle(ctx,x,y-56*s,6*s,r,YELLOW)}
  function table(ctx,x,y,w,h,r){ctx.save();ctx.fillStyle='#fff';ctx.strokeStyle=INK;ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(x,y,w/2,h/2,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.restore()}
  function card(ctx,x,y,w,h,r){rect(ctx,x,y,w,h,r,PAPER,-.015);rect(ctx,x+w*.38,y-18,w*.24,38,r,YELLOW,.02)}

  function drawPriorities(host){const r=rng(10),ctx=setup(host,'Several competing priorities converging through trade-offs into one clear choice');
    [[80,150,PINK,-.08],[280,105,YELLOW,.05],[105,380,GREEN,-.04],[315,430,BLUE,.07]].forEach(([x,y,c,rot])=>sticky(ctx,x,y,180,130,r,c,rot));
    [[255,205],[455,165],[280,440],[490,485]].forEach(([x,y])=>arrow(ctx,x,y,625,350,r,8,(r()-.5)*80));
    for(let i=0;i<13;i++){const a=i*.9,b=i*1.27;line(ctx,[[585+Math.cos(a)*85,350+Math.sin(a)*78],[660+Math.cos(b)*70,350+Math.sin(b)*68]],r,8,5,1)}
    arrow(ctx,720,350,850,350,r,12,0);card(ctx,875,175,245,360,r);text(ctx,'CHOOSE',997,265,58);line(ctx,[[940,295],[1052,295]],r,10,1,1,YELLOW);check(ctx,940,405,r,1.1);rays(ctx,1110,350,r,YELLOW)}

  function drawPivot(host){const r=rng(20),ctx=setup(host,'Plan A is replaced by Plan B so the workshop outcome keeps moving');
    card(ctx,80,155,300,410,r);text(ctx,'PLAN A',230,245,68);line(ctx,[[150,275],[310,275]],r,12,1,1,YELLOW);line(ctx,[[145,365],[305,495]],r,20,2,2,RED);line(ctx,[[305,365],[145,495]],r,20,2,2,RED);
    arrow(ctx,410,360,760,330,r,18,-120);rays(ctx,595,205,r);
    card(ctx,790,120,300,355,r);text(ctx,'PLAN B',940,210,68);line(ctx,[[850,240],[1020,240]],r,12,1,1,YELLOW);check(ctx,860,340,r,1.05);
    table(ctx,940,610,300,105,r);person(ctx,835,525,.9,r,PINK);person(ctx,940,560,.9,r,GREEN);person(ctx,1050,525,.9,r,BLUE)}

  function drawAIFutures(host){const r=rng(30),ctx=setup(host,'Current professional services explored through a few AI future scenarios into a new future state');
    card(ctx,55,210,250,315,r);person(ctx,125,355,.8,r,YELLOW);rect(ctx,185,305,70,125,r,'#fff');for(let yy=335;yy<405;yy+=28)for(let xx=205;xx<240;xx+=24)rect(ctx,xx,yy,10,12,r,INK,0);
    arrow(ctx,315,365,470,225,r,8,-40);arrow(ctx,315,365,470,365,r,8,0);arrow(ctx,315,365,470,505,r,8,40);
    sticky(ctx,470,125,220,170,r,PINK,-.03,false);robot(ctx,580,210,.75,r);rays(ctx,645,175,r,YELLOW);
    sticky(ctx,490,295,220,170,r,YELLOW,.02,false);line(ctx,[[555,380],[585,350],[615,380],[645,350]],r,8,1,1);[555,585,615,645].forEach((x,i)=>circle(ctx,x,380-(i%2)*30,9,r,INK));
    sticky(ctx,470,490,220,170,r,GREEN,-.02,false);line(ctx,[[525,610],[525,565],[570,565],[570,535],[615,535],[615,495]],r,9,1,1);arrow(ctx,615,495,650,465,r,8,-10);
    arrow(ctx,700,210,865,320,r,8,30);arrow(ctx,715,380,865,350,r,8,0);arrow(ctx,700,565,865,390,r,8,-30);
    card(ctx,870,190,270,360,r);person(ctx,945,405,.75,r,YELLOW);person(ctx,1035,405,.75,r,BLUE);robot(ctx,1030,295,.68,r);rays(ctx,1110,270,r,YELLOW)}

  function drawSmallGroups(host){const r=rng(40),ctx=setup(host,'A group of seventy people splitting into smaller conversations that create fresh thinking');
    sticky(ctx,70,95,180,135,r,YELLOW,-.08,false);text(ctx,'70',160,162,88);
    const colors=[YELLOW,BLUE,PINK,GREEN];let k=0;for(let row=0;row<4;row++)for(let col=0;col<6;col++){person(ctx,95+col*62+(row%2)*24,290+row*70,.52,r,colors[k++%4])}
    arrow(ctx,440,340,700,185,r,8,-35);arrow(ctx,440,390,700,370,r,8,0);arrow(ctx,440,440,700,555,r,8,35);
    [[800,180],[800,370],[800,555]].forEach(([x,y],idx)=>{table(ctx,x,y,180,70,r);person(ctx,x-62,y-70,.5,r,colors[idx%4]);person(ctx,x,y-78,.5,r,colors[(idx+1)%4]);person(ctx,x+62,y-70,.5,r,colors[(idx+2)%4]);person(ctx,x,y+5,.5,r,colors[(idx+3)%4])});
    ctx.save();ctx.fillStyle='#fff';ctx.strokeStyle=INK;ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(1060,300,95,75,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(995,350);ctx.lineTo(970,385);ctx.lineTo(1020,360);ctx.fill();ctx.stroke();ctx.restore();bulb(ctx,1060,300,.75,r)}

  function drawDecisions(host){const r=rng(50),ctx=setup(host,'A pile of sticky notes narrowing through a funnel into a clearer decision');
    const notes=[[70,190,PINK,-.12],[180,125,YELLOW,.08],[270,200,GREEN,-.06],[95,330,YELLOW,.06],[205,300,BLUE,-.05],[300,355,PINK,.08],[150,440,GREEN,-.04],[270,475,YELLOW,.04]];notes.forEach(([x,y,c,rot])=>sticky(ctx,x,y,150,110,r,c,rot));
    arrow(ctx,420,350,540,350,r,9,0);poly(ctx,[[540,250],[760,250],[685,390],[685,505],[620,505],[620,390]],r,'#fff',8);rect(ctx,540,235,220,42,r,YELLOW,0);
    arrow(ctx,760,350,880,350,r,9,0);card(ctx,900,175,235,360,r);bulb(ctx,1017,345,1.05,r);rays(ctx,1110,345,r,YELLOW)}

  function drawHTML(host){const r=rng(60),ctx=setup(host,'Paper workshop ideas becoming a lightweight digital tool that increases engagement');
    card(ctx,50,170,270,360,r);[[105,260,PINK],[205,260,YELLOW],[105,365,GREEN],[205,365,BLUE]].forEach(([x,y,c])=>rect(ctx,x,y,65,65,r,c));line(ctx,[[105,535],[85,650]],r,8,1,1);line(ctx,[[265,535],[290,650]],r,8,1,1);
    arrow(ctx,335,365,470,365,r,9,0);rect(ctx,465,210,300,230,r,'#fff');[[520,265,PINK],[610,265,YELLOW],[520,350,BLUE],[610,350,GREEN],[700,265,GREEN],[700,350,PINK]].forEach(([x,y,c])=>rect(ctx,x,y,52,52,r,c));poly(ctx,[[445,445],[785,445],[840,525],[390,525]],r,'#d7d7d7',8);rect(ctx,565,465,120,30,r,'#fff');
    arrow(ctx,820,365,905,365,r,9,0);person(ctx,900,485,1.0,r,YELLOW);line(ctx,[[930,520],[1010,405]],r,9,1,1);rect(ctx,960,210,220,240,r,'#fff');[[1000,255,YELLOW],[1080,255,BLUE],[1000,345,GREEN],[1080,345,PINK]].forEach(([x,y,c])=>rect(ctx,x,y,56,56,r,c));rays(ctx,1135,200,r,YELLOW)}

  const scenes={
    'art-glimpse-01':drawPriorities,'art-glimpse-02':drawPivot,'art-glimpse-03':drawAIFutures,
    'art-glimpse-04':drawSmallGroups,'art-glimpse-05':drawDecisions,'art-glimpse-06':drawHTML
  };
  function render(){Object.entries(scenes).forEach(([cls,fn])=>{const host=document.querySelector('.'+cls);if(host)fn(host)})}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(render);else window.addEventListener('load',render,{once:true});
  window.addEventListener('load',render,{once:true});
})();
