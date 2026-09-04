/* =========================================================================
   SMILEAT · Estrategia de Marca — app.js
   ========================================================================= */

const el = (tag, cls, html) => { const e = document.createElement(tag); if(cls) e.className = cls; if(html!==undefined) e.innerHTML = html; return e; };

function emptyState(message, note){
  return `<div class="empty-state">
    <div class="empty-state-icon">＋</div>
    <p class="empty-state-msg">${message}</p>
    ${note ? `<p class="empty-state-note">${note}</p>` : ''}
  </div>`;
}

let currentCountry = 'ES';

/* ============================================================
   COUNTRY SWITCH
   ============================================================ */
function renderCountrySwitch(){
  const wrap = document.getElementById('country-switch');
  const codes = Object.keys(DATA.countries);
  wrap.innerHTML = codes.map(code=>{
    const c = DATA.countries[code];
    return `<button type="button" class="country-btn ${code===currentCountry?'active':''}" data-country="${code}">
      <span class="flag">${c.flag}</span>${c.label}
    </button>`;
  }).join('');
  wrap.querySelectorAll('.country-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      currentCountry = btn.dataset.country;
      renderAll();
      window.scrollTo({top:0, behavior:'smooth'});
    });
  });
}

/* ============================================================
   1. SITUACIÓN ACTUAL
   ============================================================ */
function kpiCard(k, kind){
  const hasValue = k.value !== null && k.value !== undefined;
  return `<div class="kpi-tile ${kind} ${hasValue?'':'pending'}">
    <div class="kpi-tile-label">${k.label}</div>
    <div class="kpi-tile-value">${hasValue ? k.value : 'Pendiente'}</div>
    ${k.sub ? `<div class="kpi-tile-sub">${k.sub}</div>` : ''}
  </div>`;
}

function renderSituacion(country){
  const s = country.situacionActual;

  document.getElementById('situacion-periodo-wrap').innerHTML = s.periodo
    ? `<p class="situacion-periodo">Periodo analizado: <b>${s.periodo}</b></p>` : '';

  const actualesEl = document.getElementById('kpis-actuales');
  const objetivoEl = document.getElementById('kpis-objetivo');

  actualesEl.innerHTML = s.kpisActuales.length
    ? s.kpisActuales.map(k=>kpiCard(k,'now')).join('')
    : emptyState('Todavía no hay KPI actuales cargados para '+country.label+'.', 'Se añadirán en cuanto tengamos los exports de Meta/Google Ads de este mercado.');

  objetivoEl.innerHTML = s.kpisObjetivo.length
    ? s.kpisObjetivo.map(k=>kpiCard(k,'target')).join('')
    : emptyState('Todavía no hay KPI objetivo definidos para '+country.label+'.', 'En cuanto el equipo defina los objetivos, se sustituyen estos placeholders.');

  document.getElementById('situacion-note').innerHTML = s.note || '';
}

/* ============================================================
   2. COMPETIDORES
   ============================================================ */
function competitorCard(comp){
  return `<div class="competitor-card">
    ${comp.logo ? `<img class="competitor-logo" src="${comp.logo}" alt="${comp.name}">` : `<div class="competitor-logo placeholder">${comp.name.charAt(0)}</div>`}
    <h4>${comp.name}</h4>
    ${comp.positioning ? `<p class="competitor-positioning">${comp.positioning}</p>` : ''}
    <div class="competitor-meta">
      ${comp.price ? `<span class="tag">Precio: ${comp.price}</span>` : ''}
      ${comp.social ? `<span class="tag">${comp.social}</span>` : ''}
    </div>
    ${comp.strengths ? `<div class="comp-row"><b>Fortalezas:</b> ${comp.strengths}</div>` : ''}
    ${comp.weaknesses ? `<div class="comp-row"><b>Debilidades:</b> ${comp.weaknesses}</div>` : ''}
  </div>`;
}

function renderCompetidores(country){
  const wrap = document.getElementById('competidores-content');
  if(country.competidores && country.competidores.length){
    wrap.innerHTML = `<div class="competitor-grid">${country.competidores.map(competitorCard).join('')}</div>`;
  } else {
    wrap.innerHTML = emptyState('Aún no hay competidores cargados para '+country.label+'.', country.competidoresNote);
  }
}

/* ============================================================
   3. ESTRATEGIA ORGÁNICA
   ============================================================ */
function renderOrganico(country){
  const o = country.organico;
  const wrap = document.getElementById('organico-content');
  const hasContent = (o.pilares && o.pilares.length) || (o.canales && o.canales.length) || (o.calendario && o.calendario.length);

  if(!hasContent){
    wrap.innerHTML = emptyState('Aún no hay estrategia orgánica definida para '+country.label+'.', o.note);
    return;
  }

  let html = '';
  if(o.pilares && o.pilares.length){
    html += `<h4 class="subblock-title">Pilares de contenido</h4><div class="pillar-grid">${o.pilares.map(p=>`
      <div class="pillar-card"><div class="pillar-icon">${p.icon||'●'}</div><h5>${p.name}</h5><p>${p.description||''}</p></div>`).join('')}</div>`;
  }
  if(o.canales && o.canales.length){
    html += `<h4 class="subblock-title">Canales</h4><div class="chip-cloud">${o.canales.map(c=>`<span class="chip">${c}</span>`).join('')}</div>`;
  }
  if(o.calendario && o.calendario.length){
    html += `<h4 class="subblock-title">Calendario / cadencia</h4><table class="data-table"><thead><tr><th>Semana</th><th>Contenido</th><th>Canal</th></tr></thead><tbody>${o.calendario.map(row=>`<tr><td>${row.periodo}</td><td>${row.contenido}</td><td>${row.canal}</td></tr>`).join('')}</tbody></table>`;
  }
  wrap.innerHTML = html;
}

/* ============================================================
   4. INFLUENCERS
   ============================================================ */
function renderInfluencers(country){
  const i = country.influencers;
  const wrap = document.getElementById('influencers-content');
  const hasContent = (i.tiers && i.tiers.length) || (i.colaboraciones && i.colaboraciones.length);

  if(!hasContent){
    wrap.innerHTML = emptyState('Aún no hay estrategia de influencers definida para '+country.label+'.', i.note);
    return;
  }

  let html = '';
  if(i.tiers && i.tiers.length){
    html += `<div class="priority-grid">${i.tiers.map(t=>`
      <div class="priority-card"><h3>${t.name}</h3><p style="color:var(--ink-soft);font-size:.92rem;">${t.description||''}</p></div>`).join('')}</div>`;
  }
  if(i.colaboraciones && i.colaboraciones.length){
    html += `<h4 class="subblock-title">Colaboraciones</h4><table class="data-table"><thead><tr><th>Perfil</th><th>Tier</th><th>Formato</th><th>Alcance</th></tr></thead><tbody>${i.colaboraciones.map(c=>`<tr><td>${c.name}</td><td>${c.tier}</td><td>${c.formato}</td><td>${c.alcance||'N/D'}</td></tr>`).join('')}</tbody></table>`;
  }
  wrap.innerHTML = html;
}

/* ============================================================
   SUBNAV — resaltar sección activa al hacer scroll
   ============================================================ */
function initSubnavScrollSpy(){
  const links = document.querySelectorAll('.subnav-link');
  const sections = ['situacion','competidores','organico','influencers'].map(id=>document.getElementById(id));
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        links.forEach(l=> l.classList.toggle('active', l.dataset.section===entry.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s=> s && obs.observe(s));
}

/* ============================================================
   INIT
   ============================================================ */
function renderAll(){
  const country = DATA.countries[currentCountry];
  document.getElementById('hero-country-tag').textContent = country.label;
  renderCountrySwitch();
  renderSituacion(country);
  renderCompetidores(country);
  renderOrganico(country);
  renderInfluencers(country);
}

function safeInit(){
  try{ renderAll(); }
  catch(err){ console.error('Error al renderizar:', err); }
  try{ initSubnavScrollSpy(); }
  catch(err){ console.error('Error en scroll-spy:', err); }
}

safeInit();
