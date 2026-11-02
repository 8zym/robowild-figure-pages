(() => {
  'use strict';
  const {versions, updated} = window.FIGURES;
  const $ = id => document.getElementById(id);
  $('count').textContent = versions.length;
  $('updated').textContent = '更新于 ' + new Date(updated).toLocaleString('zh-CN', {timeZone:'Asia/Hong_Kong',hour12:false}) + ' · UTC+8';
  const buttons = new Map();
  versions.forEach(v => {
    const b=document.createElement('button');b.className='version';b.type='button';b.dataset.slide=v.slide_id;
    const img=document.createElement('img');img.src=v.thumbnail;img.alt='';img.width=60;img.height=64;
    const text=document.createElement('div'),label=document.createElement('small'),title=document.createElement('strong');
    label.textContent=`SLIDE ${String(v.number).padStart(2,'0')}${v.current ? ' · A' : ''}`;title.textContent=v.title;
    text.append(label,title);b.append(img,text);b.onclick=()=>select(v);$('versions').append(b);buttons.set(v.slide_id,b);
  });
  function select(v, update=true) {
    $('title').textContent=v.title;$('page-label').textContent=`SLIDE ${String(v.number).padStart(2,'0')} / ${String(versions.length).padStart(2,'0')}`;
    $('dimensions').textContent=`${v.width} × ${v.height} px · PNG`;
    $('position').textContent=`${v.number} / ${versions.length}`;
    $('figure').src=v.preview;$('figure').alt=v.title;$('figure').width=v.width;$('figure').height=v.height;
    for (const id of ['open','download','image-link']) $(id).href=v.png;
    $('download').download=`RoboWild-${v.slide_id}.png`;
    buttons.forEach((button,id)=>button.setAttribute('aria-pressed',String(id===v.slide_id)));
    if(update){const url=new URL(location.href);url.searchParams.set('slide',v.slide_id);history.replaceState(null,'',url);}
  }
  function fromUrl(){const params=new URLSearchParams(location.search);return versions.find(v=>v.slide_id===params.get('slide')||v.id===params.get('version'))||versions.find(v=>v.current)||versions[0];}
  select(fromUrl());window.addEventListener('popstate',()=>select(fromUrl(),false));
})();
