const loader=document.querySelector('.loader');window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hide'),500));
const reveals=document.querySelectorAll('.reveal');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});reveals.forEach(el=>io.observe(el));
const tower=document.querySelector('.tower');window.addEventListener('scroll',()=>{const y=window.scrollY,r=Math.min(y/window.innerHeight,1);if(tower){tower.style.transform=`rotateY(${-19-r*28}deg) rotateX(${3+r*7}deg) translateY(${r*90}px) scale(${1+r*.08})`;tower.style.filter=`brightness(${1-r*.22})`}});
const menu=document.querySelector('.menu'),nav=document.querySelector('.nav nav');if(menu)menu.addEventListener('click',()=>nav.classList.toggle('open'));
const cards=[...document.querySelectorAll('.property-card')];const search=document.querySelector('#search'),typeFilter=document.querySelector('#typeFilter'),areaFilter=document.querySelector('#areaFilter'),bhkFilter=document.querySelector('#bhkFilter'),priceFilter=document.querySelector('#priceFilter');
function filterProperties(){const q=(search.value||'').toLowerCase();let count=0;cards.forEach(c=>{const okQ=!q||c.dataset.name.toLowerCase().includes(q)||c.dataset.area.toLowerCase().includes(q)||c.dataset.type.toLowerCase().includes(q);const okT=typeFilter.value==='all'||c.dataset.type===typeFilter.value;const okA=areaFilter.value==='all'||c.dataset.area===areaFilter.value;const okB=bhkFilter.value==='all'||c.dataset.bhk===bhkFilter.value;const max=priceFilter.value==='all'?Infinity:Number(priceFilter.value);const okP=Number(c.dataset.price)<=max;const show=okQ&&okT&&okA&&okB&&okP;c.classList.toggle('hidden',!show);if(show)count++});document.querySelector('#resultCount').textContent=`${count} residence${count===1?'':'s'}`}
[search,typeFilter,areaFilter,bhkFilter,priceFilter].forEach(x=>x.addEventListener('input',filterProperties));function resetFilters(){search.value='';typeFilter.value='all';areaFilter.value='all';bhkFilter.value='all';priceFilter.value='all';filterProperties()}function setArea(area){areaFilter.value=area;filterProperties()}
let favorites=new Set;function saveProperty(btn,e){e.stopPropagation();const card=btn.closest('.property-card');const name=card.dataset.name;if(favorites.has(name)){favorites.delete(name);btn.textContent='♡'}else{favorites.add(name);btn.textContent='♥'}document.querySelector('#favCount').textContent=favorites.size}function toggleFavorites(){cards.forEach(c=>c.classList.toggle('hidden',favorites.size>0&&!favorites.has(c.dataset.name)));document.querySelector('#resultCount').textContent=favorites.size?`${favorites.size} saved residence${favorites.size===1?'':'s'}`:`${cards.length} residences`}
function modal(id){document.getElementById(id).classList.add('open');document.body.style.overflow='hidden'}function closeModal(id){document.getElementById(id).classList.remove('open');document.body.style.overflow=''}document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m.id)}));document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal.open').forEach(m=>closeModal(m.id))});
function openProperty(title,price,meta,area){document.querySelector('#modalTitle').textContent=title;document.querySelector('#modalPrice').textContent=`₹ ${price}`;document.querySelector('#modalMeta').textContent=`${meta} · ${area}`;modal('propertyModal')}
function openVisit(){document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open'));modal('visitModal')}
let floor=20;function openProject(){modal('projectModal');renderFloor(floor)}function setFloor(v){floor=Number(v);renderFloor(floor)}function changeFloor(delta){floor=Math.max(1,Math.min(38,floor+delta));document.querySelector('#floorRange').value=floor;renderFloor(floor)}function renderFloor(f){document.querySelector('#floorLabel').textContent=`Floor ${f}`;const building=document.querySelector('#building3d');building.style.transform=`perspective(900px) rotateY(${-25+f*.25}deg) rotateX(${f%2?1:-1}deg)`;const box=document.querySelector('#apartments');box.innerHTML='';for(let i=1;i<=6;i++){const sold=((f+i)%7===0);const el=document.createElement('button');el.className=`apt ${sold?'sold':'available'}`;el.innerHTML=`<strong>A${f}${String(i).padStart(2,'0')}</strong><span>${sold?'SOLD':'AVAILABLE'} · ${i<3?'2':'3'} BHK</span>`;el.onclick=()=>{if(!sold)openProperty(`The Marquis · A${f}${String(i).padStart(2,'0')}`,`${(2.1+i*.23).toFixed(2)} Cr`,`${i<3?'2':'3'} BHK · Floor ${f}`,'Kokapet')};box.appendChild(el)}}
function submitLead(e){e.preventDefault();const d=new FormData(e.target);const subject=encodeURIComponent('Aurelia Estates — Private Consultation');const body=encodeURIComponent(`Name: ${d.get('name')}\nPhone: ${d.get('phone')}\nInterest: ${d.get('type')}`);window.location.href=`mailto:hello@aureliaestates.in?subject=${subject}&body=${body}`;return false}
function submitVisit(e){e.preventDefault();const d=new FormData(e.target);const subject=encodeURIComponent('Aurelia Estates — Site Visit Request');const body=encodeURIComponent(`Name: ${d.get('name')}\nPhone: ${d.get('phone')}\nProperty: ${d.get('property')}\nPreferred date: ${d.get('date')||'Flexible'}`);window.location.href=`mailto:hello@aureliaestates.in?subject=${subject}&body=${body}`;return false}

/* PREMIUM 3D EXPERIENCE */
(()=>{
 const style=document.createElement('style');style.textContent=`
 .property-grid{perspective:1800px}
 .property-card{transform-style:preserve-3d;will-change:transform;position:relative;transition:transform .16s ease,filter .35s ease}
 .property-card:hover{z-index:5;filter:drop-shadow(0 30px 45px rgba(0,0,0,.18))}
 .property-image{transform-style:preserve-3d;will-change:transform;box-shadow:0 22px 55px rgba(0,0,0,.16)}
 .property-image:before{content:'';position:absolute;inset:-30%;z-index:3;pointer-events:none;background:linear-gradient(110deg,transparent 38%,rgba(255,255,255,.28) 49%,transparent 60%);transform:translateX(-80%) rotate(8deg);transition:transform .9s cubic-bezier(.2,.7,.2,1)}
 .property-card:hover .property-image:before{transform:translateX(80%) rotate(8deg)}
 .property-image:after{transition:opacity .5s ease}.property-card:hover .property-image:after{opacity:.72}
 .tower,.project-building{transform-style:preserve-3d;backface-visibility:hidden}
 .tower:after,.project-building:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.18) 47%,transparent 60%);transform:translateX(-120%);animation:premiumGlassSweep 7s ease-in-out infinite}
 .project-building{animation:premiumBuildingFloat 6s ease-in-out infinite}
 .project-orb{animation:premiumOrb 5s ease-in-out infinite}
 .project-ring{animation:premiumRing 4s ease-in-out infinite}
 .hero .stars{animation:premiumStars 20s linear infinite}
 .hero-copy,.hero-side,.hero-bottom{transform-style:preserve-3d}
 @keyframes premiumGlassSweep{0%,30%{transform:translateX(-120%)}65%,100%{transform:translateX(120%)}}
 @keyframes premiumBuildingFloat{0%,100%{transform:perspective(900px) rotateY(-17deg) translate3d(0,0,0)}50%{transform:perspective(900px) rotateY(-12deg) translate3d(0,-16px,18px)}}
 @keyframes premiumOrb{50%{transform:translate3d(18px,-20px,0) scale(1.08)}}
 @keyframes premiumRing{50%{transform:rotate(-12deg) scale(1.05);opacity:.7}}
 @keyframes premiumStars{to{background-position:110px 220px}}
 @media(prefers-reduced-motion:reduce){.property-card{transform:none!important}.property-image:before,.tower:after,.project-building:after{animation:none!important}}
 `;document.head.appendChild(style);
 const tiltCards=()=>document.querySelectorAll('.property-card').forEach(card=>{
   if(card.dataset.tiltBound)return;card.dataset.tiltBound='1';
   const image=card.querySelector('.property-image');
   card.addEventListener('pointermove',e=>{if(window.matchMedia('(max-width:900px)').matches)return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`rotateX(${(-y*7).toFixed(2)}deg) rotateY(${(x*9).toFixed(2)}deg) translateZ(8px)`;if(image)image.style.transform=`translateZ(22px) scale(1.025) rotateX(${(-y*2).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg)`});
   card.addEventListener('pointerleave',()=>{card.style.transform='';if(image)image.style.transform=''})
 });
 tiltCards();
 const grid=document.querySelector('.property-grid');if(grid)new MutationObserver(tiltCards).observe(grid,{childList:true,subtree:true});
 const project=document.querySelector('.project-visual');
 if(project&&!window.matchMedia('(max-width:900px)').matches){project.addEventListener('pointermove',e=>{const r=project.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;const b=document.querySelector('.project-building');if(b)b.style.marginLeft=`${x*28}px`;const orb=document.querySelector('.project-orb');if(orb)orb.style.marginLeft=`${x*35}px`;project.style.backgroundPosition=`${50+x*5}% ${45+y*5}%`});project.addEventListener('pointerleave',()=>{const b=document.querySelector('.project-building');if(b)b.style.marginLeft='';project.style.backgroundPosition=''})}
 const hero=document.querySelector('.hero');
 if(hero&&!window.matchMedia('(max-width:900px)').matches){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;const copy=document.querySelector('.hero-copy');const wrap=document.querySelector('.tower-wrap');if(copy)copy.style.transform=`translate3d(${x*-10}px,${y*-7}px,0)`;if(wrap)wrap.style.transform=`translate3d(${x*18}px,${y*12}px,0)`});hero.addEventListener('pointerleave',()=>{const copy=document.querySelector('.hero-copy'),wrap=document.querySelector('.tower-wrap');if(copy)copy.style.transform='';if(wrap)wrap.style.transform=''})}
})();
