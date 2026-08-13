/* Reassemble the generated artwork from separately base64-encoded binary chunks.
   Each source chunk was encoded independently, so simply concatenating the base64
   text creates an invalid data URL. Decode each padded segment first, then join the
   binary bytes into one AVIF Blob before applying it to the page. */
(function(){
  const art=window.DMT_ART||{};
  const objectUrls=[];

  function artworkUrl(encoded,mime='image/avif'){
    if(!encoded) return '';
    try{
      // A chunk boundary is visible wherever base64 padding (= or ==) is followed
      // immediately by the next chunk's base64 data.
      const parts=encoded.split(/(?<==)(?=[A-Za-z0-9+/])/g).filter(Boolean);
      const bytes=parts.map((part)=>{
        const binary=atob(part);
        const array=new Uint8Array(binary.length);
        for(let i=0;i<binary.length;i++) array[i]=binary.charCodeAt(i);
        return array;
      });
      const url=URL.createObjectURL(new Blob(bytes,{type:mime}));
      objectUrls.push(url);
      return `url("${url}")`;
    }catch(error){
      console.error('Design My Thinking artwork decode failed',error);
      return '';
    }
  }

  function apply(selector,encoded,extra){
    if(!encoded) return;
    const url=artworkUrl(encoded);
    if(!url) return;
    document.querySelectorAll(selector).forEach((el)=>{
      el.style.setProperty('background-image',url,'important');
      if(extra){
        Object.entries(extra).forEach(([name,value])=>el.style.setProperty(name,value,'important'));
      }
    });
  }

  apply('.hero-paper-v3',art.hero,{
    'background-size':'contain',
    'background-position':'center',
    'background-repeat':'no-repeat'
  });
  apply('.gl-img',art.glimpses);
  apply('.pr-img',art.problems);

  window.addEventListener('pagehide',()=>objectUrls.forEach((url)=>URL.revokeObjectURL(url)),{once:true});
})();
