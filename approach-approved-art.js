/* Approach page — approved Workshop Table artwork, 2026-08-17.
   Four purpose-built hand-drawn canvases matching the approved mock-up:
   hero, before, during and after. Transparent canvas backgrounds let the
   drawings sit directly on the page paper. */
(function(){
  const INK='#2b241f', PINK='#ee9db4', YELLOW='#f4d452', BLUE='#9ecfda', GREEN='#bfd5ae', PAPER='#fff8e9', TAPE='rgba(210,179,123,.62)';

  function rng(seed){let s=seed>>>0;return()=>{s=(1664525*s+1013904223)>>>0;return s/4294967296;};}
  function setup(host,w,h,label){
    host.innerHTML=''; host.style.background='none';
    const c=document.createElement('canvas'); c.className='approach-art-canvas'; c.width=w; c.height=h; c.setAttribute('role','img'); c.setAttribute('aria-label',label); host.appendChild(c); return c.getContext('2d');
  }
  function line(ctx,pts,r,width=3,passes=2,jitter=2){ctx.save();ctx.strokeStyle=INK;ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=width;for(let p=0;p<passes;p++){ctx.beginPath();pts.forEach(([x,y],i)=>{x+=(r()-.5)*jitter*2;y+=(r()-.5)*jitter*2;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();}ctx.restore();}
  function poly(ctx,pts,r,fill=null,width=3,jitter=2){const q=pts.map(([x,y])=>[x+(r()-.5)*jitter*2,y+(r()-.5)*jitter*2]);ctx.save();if(fill){ctx.fillStyle=fill;ctx.beginPath();q.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();}ctx.restore();line(ctx,[...q,q[0]],r,width,2,1.2);}
  function ellipse(ctx,x,y,w,h,r,width=3,passes=2){ctx.save();ctx.strokeStyle=INK;ctx.lineWidth=width;for(let p=0;p<passes;p++){ctx.beginPath();ctx.ellipse(x+(r()-.5)*4,y+(r()-.5)*4,w/2+(r()-.5)*4,h/2+(r()-.5)*4,(r()-.5)*.02,0,Math.PI*2);ctx.stroke();}ctx.restore();}
  function text(ctx,s,x,y,size=28,weight=700,align='center'){ctx.save();ctx.fillStyle=INK;ctx.font=`${weight} ${size}px Caveat, cursive`;ctx.textAlign=align;ctx.textBaseline='middle';const a=String(s).split('\n'),step=size*.86;a.forEach((t,i)=>ctx.fillText(t,x,y+(i-(a.length-1)/2)*step));ctx.restore();}
  function tinyText(ctx,s,x,y,size=21,align='left'){text(ctx,s,x,y,size,600,align);}
  function sticky(ctx,x,y,w,h,color,label,r,rot=0,fs=null){ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(rot);ctx.translate(-w/2,-h/2);ctx.shadowColor='rgba(45,34,25,.14)';ctx.shadowBlur=7;ctx.shadowOffsetX=4;ctx.shadowOffsetY=6;const p=[[3,5],[w-3,1],[w,h-4],[2,h]];ctx.fillStyle=color;ctx.beginPath();p.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.closePath();ctx.fill();ctx.shadowColor='transparent';ctx.strokeStyle='rgba(50,40,32,.48)';ctx.lineWidth=1.7;ctx.stroke();ctx.strokeStyle='rgba(255,255,255,.28)';for(let i=0;i<7;i++){const yy=12+r()*(h-24);ctx.beginPath();ctx.moveTo(10+r()*16,yy);ctx.lineTo(w-10-r()*18,yy+(r()-.5)*2);ctx.stroke();}text(ctx,label,w/2,h/2+1,fs||Math.max(22,h*.28),700);ctx.restore();}
  function tape(ctx,x,y,w,h,r,rot=0){ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(rot);ctx.translate(-w/2,-h/2);ctx.fillStyle=TAPE;ctx.beginPath();ctx.moveTo(2,3);ctx.lineTo(w-2,0);ctx.lineTo(w,h-2);ctx.lineTo(0,h);ctx.closePath();ctx.fill();ctx.strokeStyle='rgba(120,90,45,.15)';ctx.lineWidth=1;for(let i=0;i<5;i++){const yy=4+i*(h-7)/4;ctx.beginPath();ctx.moveTo(5,yy);ctx.lineTo(w-5,yy+(r()-.5)*2);ctx.stroke();}ctx.restore();}
  function paper(ctx,x,y,w,h,r,title=null,rot=0){ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(rot);ctx.translate(-w/2,-h/2);ctx.shadowColor='rgba(45,34,25,.11)';ctx.shadowBlur=8;ctx.shadowOffsetX=4;ctx.shadowOffsetY=6;poly(ctx,[[0,4],[w-4,0],[w,h-5],[w*.8,h],[0,h-2]],r,'rgba(255,250,240,.86)',2,2);ctx.shadowColor='transparent';if(title) text(ctx,title,w/2,35,27,700);ctx.restore();}
  function arrow(ctx,x1,y1,x2,y2,r,width=3){const mx=(x1+x2)/2+(r()-.5)*20,my=(y1+y2)/2+(r()-.5)*18;line(ctx,[[x1,y1],[mx,my],[x2,y2]],r,width,2,2.5);const a=Math.atan2(y2-my,x2-mx),L=14;line(ctx,[[x2-L*Math.cos(a-.55),y2-L*Math.sin(a-.55)],[x2,y2],[x2-L*Math.cos(a+.55),y2-L*Math.sin(a+.55)]],r,width,2,1.5);}
  function person(ctx,x,y,s,r,pose='stand'){ellipse(ctx,x,y,24*s,26*s,r,2,1);line(ctx,[[x,y+13*s],[x,y+48*s]],r,2,1,1);if(pose==='write'){line(ctx,[[x,y+28*s],[x+24*s,y+35*s]],r,2,1,1);line(ctx,[[x,y+28*s],[x-15*s,y+37*s]],r,2,1,1);}else if(pose==='point'){line(ctx,[[x,y+27*s],[x+33*s,y+10*s]],r,2,1,1);line(ctx,[[x,y+27*s],[x-18*s,y+39*s]],r,2,1,1);}else{line(ctx,[[x,y+29*s],[x-19*s,y+41*s]],r,2,1,1);line(ctx,[[x,y+29*s],[x+19*s,y+41*s]],r,2,1,1);}line(ctx,[[x,y+48*s],[x-15*s,y+78*s]],r,2,1,1);line(ctx,[[x,y+48*s],[x+15*s,y+78*s]],r,2,1,1);}
  function tableGroup(ctx,cx,cy,count,r,scale=1){ellipse(ctx,cx,cy,150*scale,70*scale,r,2.5,2);for(let i=0;i<count;i++){const ang=(Math.PI*2*i/count)+.2,px=cx+Math.cos(ang)*100*scale,py=cy+Math.sin(ang)*70*scale;person(ctx,px,py-15*scale,.55*scale,r,'stand');}sticky(ctx,cx-35*scale,cy-15*scale,54*scale,34*scale,YELLOW,'',r,-.05,12);sticky(ctx,cx+16*scale,cy-5*scale,48*scale,30*scale,PINK,'',r,.04,12);}
  function wall(ctx,x,y,w,h,r){paper(ctx,x,y,w,h,r,null,-.01);for(let i=0;i<11;i++){const col=[YELLOW,PINK,BLUE,GREEN][i%4],sx=x+24+(i%4)*((w-80)/4),sy=y+28+Math.floor(i/4)*58;sticky(ctx,sx,sy,46,34,col,'',r,(r()-.5)*.08,12);}}
  function magnifier(ctx,x,y,r){ellipse(ctx,x,y,62,62,r,4,2);line(ctx,[[x+23,y+22],[x+68,y+67]],r,7,2,2);}
  function checkSheet(ctx,x,y,w,h,r){paper(ctx,x,y,w,h,r,'DECISIONS',.015);for(let i=0;i<3;i++){const yy=y+66+i*48;poly(ctx,[[x+20,yy-11],[x+42,yy-11],[x+42,yy+11],[x+20,yy+11]],r,null,2,1);line(ctx,[[x+23,yy],[x+30,yy+8],[x+44,yy-10]],r,3,2,1);line(ctx,[[x+58,yy],[x+w-22,yy]],r,2,1,1);}}

  function hero(host){const ctx=setup(host,1500,530,'Hand-drawn Workshop Table journey from sponsor brief to better decisions');const r=rng(11973);
    // Sponsor brief stack
    for(let i=0;i<4;i++) paper(ctx,40+i*9,170-i*9,220,190,r,null,(i-1.5)*.025);
    sticky(ctx,92,188,150,96,PINK,'SPONSOR\nBRIEF',r,-.04,29); tinyText(ctx,'lots of things\non the table',55,105,23); arrow(ctx,110,127,105,168,r,2);
    ellipse(ctx,230,395,74,44,r,2,2); line(ctx,[[203,397],[257,397]],r,1.4,1,1); tinyText(ctx,'coffee + notes',58,454,18);

    // Interrogate
    sticky(ctx,345,125,164,102,YELLOW,'INTERROGATE\nTHE REAL\nQUESTION',r,-.025,24); magnifier(ctx,422,286,r); tinyText(ctx,'what are we\nreally trying\nto change?',500,290,22); arrow(ctx,278,254,342,233,r,3); arrow(ctx,486,260,575,260,r,3);

    // Design right intervention
    sticky(ctx,590,94,176,108,BLUE,'DESIGN THE\nRIGHT\nINTERVENTION',r,.025,24); tableGroup(ctx,705,342,6,r,.84); tinyText(ctx,'shape the space,\nchoose the methods,\nset the conditions',760,58,20);
    arrow(ctx,770,256,865,250,r,3);

    // Visible thinking
    sticky(ctx,890,98,175,92,YELLOW,'MAKE THINKING\nVISIBLE',r,-.02,25); wall(ctx,876,208,245,192,r); person(ctx,855,334,.7,r,'point'); person(ctx,1128,336,.68,r,'stand'); tinyText(ctx,'clarity\nemerges',1147,220,21); arrow(ctx,1124,260,1208,260,r,3);

    // Decision
    sticky(ctx,1260,84,175,92,PINK,'BETTER\nDECISIONS',r,.035,26); checkSheet(ctx,1235,207,205,235,r); tinyText(ctx,'decisions\npeople own',1268,52,20); tinyText(ctx,'action\nfollows',1435,445,19,'right'); arrow(ctx,1405,420,1458,438,r,2);
  }

  function before(host){const ctx=setup(host,1350,420,'Hand-drawn illustration revealing the question beneath the workshop request');const r=rng(22331);
    for(let i=0;i<3;i++) paper(ctx,45+i*7,82-i*7,280,245,r,null,(i-1)*.022);
    tape(ctx,120,58,110,26,r,-.03);
    sticky(ctx,78,112,220,130,PINK,'WE NEED A\nWORKSHOP\nTO FIX THIS\nPROBLEM',r,-.025,25);
    tinyText(ctx,'on the surface,\nit sounds simple...',70,340,21);
    arrow(ctx,337,204,455,204,r,3);
    magnifier(ctx,430,311,r);
    sticky(ctx,485,148,255,138,BLUE,"WHAT'S THE\nDECISION WE\nACTUALLY NEED\nTO MAKE?",r,.02,25);
    arrow(ctx,760,215,842,215,r,3);
    paper(ctx,855,74,405,278,r,null,.018); tape(ctx,1085,62,92,23,r,.03);
    tinyText(ctx,'Beneath that\nis the real\nquestion.',900,125,27);
    tinyText(ctx,"• What's at stake?\n• What could change?\n• Who needs to be involved?",905,235,24);
    line(ctx,[[880,330],[1200,330]],r,1.5,1,1);
  }

  function during(host){const ctx=setup(host,1500,500,'Hand-drawn participation journey: individual, pair, small group, whole room, making thinking visible');const r=rng(33779);
    const xs=[140,440,780,1185], labels=['INDIVIDUAL','PAIR','SMALL GROUP','WHOLE ROOM'];
    labels.forEach((lab,i)=>text(ctx,lab,xs[i],55,25,700));
    // individual
    person(ctx,140,185,1,r,'write'); line(ctx,[[70,286],[210,286]],r,2,1,1); sticky(ctx,126,248,56,37,YELLOW,'',r,-.04,12);
    // pair
    person(ctx,410,190,.86,r,'stand'); person(ctx,475,190,.86,r,'stand'); line(ctx,[[355,286],[525,286]],r,2,1,1); sticky(ctx,420,250,58,38,BLUE,'',r,.03,12);
    // small group
    ellipse(ctx,780,270,215,85,r,2.5,2); person(ctx,705,168,.78,r,'stand');person(ctx,770,145,.78,r,'stand');person(ctx,845,165,.78,r,'stand');person(ctx,780,338,.72,r,'stand');sticky(ctx,745,250,52,35,PINK,'',r,-.03,12);sticky(ctx,805,260,52,35,YELLOW,'',r,.04,12);
    // whole room
    wall(ctx,1070,115,260,205,r); for(let i=0;i<7;i++)person(ctx,1065+i*42,355,.58,r,i===2?'point':'stand');
    arrow(ctx,235,215,337,215,r,3);arrow(ctx,535,215,655,215,r,3);arrow(ctx,902,215,1045,215,r,3);
    line(ctx,[[105,425],[1320,425]],r,2.4,1,2);arrow(ctx,1270,425,1325,425,r,2.4);text(ctx,'From me   →   to we',712,457,30,700);text(ctx,'Collaboration starts with individual contribution.',750,390,29,700);line(ctx,[[545,410],[875,410]],r,5,1,2);
  }

  function after(host){const ctx=setup(host,1500,500,'Hand-drawn sequence capturing workshop thinking into decisions, actions, owners and next steps so momentum continues beyond the room');const r=rng(48991);
    // wall and people
    wall(ctx,55,100,300,235,r); person(ctx,45,360,.65,r,'point');person(ctx,360,360,.65,r,'stand'); tinyText(ctx,'From energy in\nthe room...',92,453,22);
    arrow(ctx,382,250,520,250,r,3);
    // captured pack
    paper(ctx,550,88,260,300,r,null,-.018);sticky(ctx,605,70,135,72,PINK,'KEY\nINSIGHTS',r,.025,22);text(ctx,'DECISIONS',680,175,23,700);text(ctx,'ACTIONS',680,216,23,700);text(ctx,'OWNERS',680,257,23,700);text(ctx,'NEXT STEPS',680,298,23,700);line(ctx,[[590,195],[615,195]],r,2,1,1);line(ctx,[[590,236],[615,236]],r,2,1,1);line(ctx,[[590,277],[615,277]],r,2,1,1);line(ctx,[[590,318],[615,318]],r,2,1,1);sticky(ctx,745,328,118,70,YELLOW,'SHARE\nBACK',r,-.035,20);tinyText(ctx,'Capture what matters\nin a usable way...',565,452,22);
    arrow(ctx,862,250,985,250,r,3);
    // people leaving with work + carpark hint
    person(ctx,1070,245,.8,r,'stand');person(ctx,1160,258,.76,r,'stand');paper(ctx,1087,298,205,126,r,null,.025);sticky(ctx,1110,315,54,34,PINK,'',r,-.03,12);sticky(ctx,1170,324,54,34,BLUE,'',r,.02,12);sticky(ctx,1228,315,54,34,YELLOW,'',r,-.02,12);
    // tiny car, deliberately secondary
    line(ctx,[[1305,185],[1375,185],[1403,210],[1420,212],[1420,237],[1292,237],[1292,207],[1305,207]],r,2.3,2,2);ellipse(ctx,1320,239,24,24,r,2,1);ellipse(ctx,1390,239,24,24,r,2,1);tinyText(ctx,'...so the work\ncontinues beyond\nthe car park.',1120,455,22);line(ctx,[[1145,471],[1278,471]],r,4,1,2);
  }

  function render(){
    const h=document.querySelector('.approach-hero-art'); if(h) hero(h);
    const b=document.querySelector('.approach-inline-art--brief'); if(b) before(b);
    const d=document.querySelector('.approach-wide-art'); if(d) during(d);
    const a=document.querySelector('.after-work-art'); if(a) after(a);
  }
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(render);else window.addEventListener('load',render,{once:true});
})();
