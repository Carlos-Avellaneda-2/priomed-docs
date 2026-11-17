const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");

const TEAL = "028090";
const SEA = "00A896";
const ORANGE = "E85D04";
const DARK = "032B32";
const INK = "18292A";
const MUTE = "5B7275";
const BORDER = "CFE0E0";
const WHITE = "FFFFFF";
const OFFWHITE = "F5FAFA";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
const W = 13.33, H = 7.5;

// Registro de diapositivas: numeración automática y notas del orador desde el guion.
const slides = [];
function newSlide() {
  const s = pres.addSlide();
  slides.push(s);
  return s;
}

function darkBg(slide) {
  slide.background = { color: DARK };
}
function lightBg(slide) {
  slide.background = { color: WHITE };
}
function pageNum(slide) {
  slide.addText(String(slides.indexOf(slide) + 1), {
    x: W - 0.7, y: H - 0.5, w: 0.4, h: 0.3,
    fontFace: "Calibri", fontSize: 10, color: MUTE, align: "right",
  });
}
function kicker(slide, text, color = SEA, dark = false) {
  slide.addText(text.toUpperCase(), {
    x: 0.6, y: 0.45, w: 8, h: 0.35,
    fontFace: "Calibri", fontSize: 13, bold: true, color: color,
    charSpacing: 2,
  });
}
function title(slide, text, opts = {}) {
  slide.addText(text, {
    x: 0.6, y: opts.y || 0.78, w: opts.w || 11.8, h: opts.h || 0.9,
    fontFace: "Cambria", fontSize: opts.size || 30, bold: true,
    color: opts.color || DARK, align: "left",
  });
}

// ---------- Slide 1: Title ----------
{
  const s = newSlide();
  darkBg(s);
  s.addShape("rect", { x: 0, y: 0, w: 5.3, h: H, fill: { color: "052F35" }, line: { type: "none" } });
  s.addShape("ellipse", { x: 3.6, y: 4.6, w: 3.4, h: 3.4, fill: { color: TEAL, transparency: 70 }, line: { type: "none" } });
  s.addShape("ellipse", { x: -1.4, y: -1.4, w: 3.0, h: 3.0, fill: { color: SEA, transparency: 75 }, line: { type: "none" } });

  s.addText("PROYECTO DE SEMESTRE · ARQUITECTURA EMPRESARIAL Y TRANSFORMACIÓN DIGITAL", {
    x: 0.7, y: 2.0, w: 4.3, h: 0.7, fontFace: "Calibri", fontSize: 11, bold: true,
    color: SEA, charSpacing: 1.5,
  });
  s.addText("PrioMed", {
    x: 0.7, y: 2.55, w: 4.3, h: 1.2, fontFace: "Cambria", fontSize: 54, bold: true, color: WHITE,
  });
  s.addText("Priorización inteligente del acceso a consulta especializada", {
    x: 0.7, y: 3.75, w: 4.3, h: 1.1, fontFace: "Calibri", fontSize: 16, color: "CADCE0",
  });
  s.addText("Carlos Andrés Avellaneda Franco", {
    x: 0.7, y: 6.55, w: 4.3, h: 0.4, fontFace: "Calibri", fontSize: 12, color: "8FB0B4",
  });

  s.addText("Un problema clínico, un problema de escasez de recursos\ny un problema de arquitectura de información.", {
    x: 6.0, y: 3.0, w: 6.6, h: 1.6, fontFace: "Calibri", fontSize: 17, italic: true, color: "DDEDEE",
    lineSpacingMultiple: 1.3,
  });
}

// ---------- Slide 2: El problema (evidencia) ----------
{
  const s = newSlide();
  lightBg(s);
  kicker(s, "El problema");
  title(s, "El acceso a especialista en Colombia se está deteriorando");

  const stats = [
    { n: "92–210", u: "días", d: "de espera promedio para consulta especializada, según fuente y periodo" },
    { n: "135", u: "días", d: "hasta la entrega de medicamentos en los casos más críticos" },
    { n: "+83%", u: "vs. 2023", d: "en casos reportados de barreras de acceso en Bogotá" },
  ];
  const cardW = 3.7, gap = 0.35, startX = 0.6, y = 2.1;
  stats.forEach((st, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape("roundRect", { x, y, w: cardW, h: 2.6, rectRadius: 0.08, fill: { color: OFFWHITE }, line: { color: BORDER, width: 1 } });
    s.addText(st.n, { x: x + 0.25, y: y + 0.25, w: cardW - 0.5, h: 1.0, fontFace: "Cambria", fontSize: 40, bold: true, color: TEAL });
    s.addText(st.u, { x: x + 0.25, y: y + 1.05, w: cardW - 0.5, h: 0.4, fontFace: "Calibri", fontSize: 13, bold: true, color: SEA });
    s.addText(st.d, { x: x + 0.25, y: y + 1.5, w: cardW - 0.5, h: 1.0, fontFace: "Calibri", fontSize: 12.5, color: INK, lineSpacingMultiple: 1.15 });
  });

  s.addShape("roundRect", {
    x: 0.6, y: 5.05, w: 12.1, h: 1.6, rectRadius: 0.08, fill: { color: DARK }, line: { type: "none" },
  });
  s.addText([
    { text: "El regulador ya está interviniendo. ", options: { bold: true, color: SEA } },
    { text: "El Ministerio de Salud emitió la Circular 038 de 2025 e implementa el Modelo de Gestión de Tiempos de Espera (MGTE), exigiendo umbrales y algoritmos de priorización explícitos por especialidad. Ya existe una referencia normativa contra la cual medir cualquier propuesta.", options: { color: "DDEDEE" } },
  ], { x: 0.95, y: 5.25, w: 11.4, h: 1.2, fontFace: "Calibri", fontSize: 13, lineSpacingMultiple: 1.25, valign: "middle" });

  pageNum(s);
}

// ---------- Slide 3: Stakeholders y hallazgo clínico ----------
{
  const s = newSlide();
  lightBg(s);
  kicker(s, "Contexto clínico y actores");
  title(s, "Un mismo flujo de triage mezcla síntomas de severidad muy distinta");

  const left = [
    "Pacientes en lista de espera (niveles III–V de triage)",
    "Médicos generales que remiten al especialista",
    "IPS y especialistas, con capacidad de agenda limitada",
    "EPS, responsables contractuales del acceso oportuno",
    "Ministerio de Salud y Supersalud, reguladores del MGTE",
    "Sistemas RIPS, MIPRES, SISPRO, fuente de datos",
  ];
  s.addText("Partes interesadas", { x: 0.6, y: 2.0, w: 5.6, h: 0.4, fontFace: "Calibri", fontSize: 14, bold: true, color: TEAL });
  left.forEach((t, i) => {
    const y = 2.5 + i * 0.62;
    s.addShape("ellipse", { x: 0.6, y: y + 0.06, w: 0.14, h: 0.14, fill: { color: SEA }, line: { type: "none" } });
    s.addText(t, { x: 0.9, y: y - 0.08, w: 5.3, h: 0.5, fontFace: "Calibri", fontSize: 12.5, color: INK, valign: "top" });
  });

  s.addShape("roundRect", { x: 6.9, y: 2.0, w: 5.8, h: 4.6, rectRadius: 0.08, fill: { color: DARK }, line: { type: "none" } });
  s.addText("Hallazgo de la caracterización clínica preliminar", {
    x: 7.25, y: 2.3, w: 5.1, h: 0.7, fontFace: "Calibri", fontSize: 14, bold: true, color: SEA,
  });
  s.addText([
    { text: "Desde dolor de cabeza y rinorrea hasta dolor torácico e ", options: {} },
    { text: "ideación suicida", options: { bold: true, color: ORANGE } },
    { text: ": el triage combina, bajo un mismo flujo de intake, casos de severidad radicalmente distinta.", options: {} },
  ], { x: 7.25, y: 3.05, w: 5.15, h: 1.5, fontFace: "Calibri", fontSize: 13.5, color: "DDEDEE", lineSpacingMultiple: 1.3 });
  s.addText([
    { text: "Implicación de diseño:  ", options: { bold: true, color: ORANGE } },
    { text: "un error de clasificación no cuesta lo mismo en todos los casos. Subestimar la severidad de un dolor torácico es cualitativamente más grave que subestimarla en una rinorrea.", options: { color: "DDEDEE" } },
  ], { x: 7.25, y: 4.7, w: 5.15, h: 1.7, fontFace: "Calibri", fontSize: 13, lineSpacingMultiple: 1.3 });

  pageNum(s);
}

// ---------- Slide 4: Estado del arte comparativo ----------
{
  const s = newSlide();
  lightBg(s);
  kicker(s, "Estado del arte");
  title(s, "Tres familias de enfoques — y un patrón de riesgo que se repite");

  const cols = [
    { h: "Reglas clínicas explícitas", sub: "Ej. Clinical Prioritization Criteria, Queensland", pts: ["Interpretable y auditable", "No escala bien ante el volumen creciente de remisiones"], c: TEAL },
    { h: "Machine learning clásico", sub: "Sobre texto/variables estructuradas de la remisión", pts: ["71.6% exactitud en cirugía cardiaca, pero sensibilidad 54.2% < especificidad 80.1%", "Mejor descartando casos leves que detectando los graves"], c: SEA },
    { h: "Modelos de lenguaje (LLM)", sub: "Asistencia en triage y autotriage", pts: ["Resultados \"prometedores\" pero aún no validados", "Autotriage digital: solo 57% de acierto, peor en casos de urgencia intermedia"], c: ORANGE },
  ];
  const cardW = 3.9, gap = 0.2, startX = 0.6, y = 2.0;
  cols.forEach((col, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape("roundRect", { x, y, w: cardW, h: 3.7, rectRadius: 0.08, fill: { color: OFFWHITE }, line: { color: BORDER, width: 1 } });
    s.addShape("rect", { x, y, w: cardW, h: 0.09, fill: { color: col.c }, line: { type: "none" } });
    s.addText(col.h, { x: x + 0.25, y: y + 0.3, w: cardW - 0.5, h: 0.7, fontFace: "Cambria", fontSize: 16, bold: true, color: DARK });
    s.addText(col.sub, { x: x + 0.25, y: y + 0.95, w: cardW - 0.5, h: 0.5, fontFace: "Calibri", fontSize: 10.5, italic: true, color: MUTE });
    s.addText(col.pts.map((p, j) => ({ text: p, options: { bullet: { code: "2022" }, breakLine: j < col.pts.length - 1, paraSpaceAfter: 10 } })), {
      x: x + 0.25, y: y + 1.55, w: cardW - 0.5, h: 2.0, fontFace: "Calibri", fontSize: 11.5, color: INK, lineSpacingMultiple: 1.2,
    });
  });

  s.addText([
    { text: "Brecha identificada:  ", options: { bold: true, color: TEAL } },
    { text: "los modelos automatizados fallan más justo en los casos de urgencia intermedia y alta severidad — los más costosos de clasificar mal — y ningún estudio evalúa esto contra los umbrales oficiales del MGTE colombiano.", options: { color: INK } },
  ], { x: 0.6, y: 5.95, w: 12.1, h: 0.9, fontFace: "Calibri", fontSize: 13, lineSpacingMultiple: 1.25 });

  pageNum(s);
}

// ---------- Slide 5: Propuesta general ----------
{
  const s = newSlide();
  lightBg(s);
  kicker(s, "Propuesta general");
  title(s, "Capacidad de negocio y alternativas a investigar");

  s.addShape("roundRect", { x: 0.6, y: 2.0, w: 12.1, h: 1.35, rectRadius: 0.08, fill: { color: TEAL }, line: { type: "none" } });
  s.addText([
    { text: "Capacidad: ", options: { bold: true, color: WHITE } },
    { text: "priorizar el acceso a consulta especializada de forma transparente, consistente y clínicamente defendible, minimizando el riesgo de deterioro clínico evitable y manteniendo trazabilidad frente a los umbrales del MGTE.", options: { color: "E9F6F5" } },
  ], { x: 0.95, y: 2.2, w: 11.4, h: 1.0, fontFace: "Calibri", fontSize: 13.5, lineSpacingMultiple: 1.25, valign: "middle" });

  const alts = [
    { l: "A", h: "Reglas explícitas", d: "Protocolos estructurados alineados al MGTE, sin componente predictivo. ¿Escala sin perder consistencia?", c: TEAL },
    { l: "B", h: "ML clásico", d: "Modelo sobre variables estructuradas y texto, con revisión humana obligatoria. ¿Qué representación mejora la sensibilidad en casos graves?", c: SEA },
    { l: "C", h: "LLM generativo", d: "Recomendación explicada en lenguaje natural, auditable antes de confirmar. ¿La explicación es consistente con la clasificación?", c: ORANGE },
  ];
  const cardW = 3.9, gap = 0.2, startX = 0.6, y = 3.7;
  alts.forEach((a, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape("roundRect", { x, y, w: cardW, h: 3.0, rectRadius: 0.08, fill: { color: OFFWHITE }, line: { color: BORDER, width: 1 } });
    s.addShape("ellipse", { x: x + 0.25, y: y + 0.25, w: 0.55, h: 0.55, fill: { color: a.c }, line: { type: "none" } });
    s.addText(a.l, { x: x + 0.25, y: y + 0.25, w: 0.55, h: 0.55, fontFace: "Cambria", fontSize: 20, bold: true, color: WHITE, align: "center", valign: "middle" });
    s.addText(a.h, { x: x + 0.95, y: y + 0.27, w: cardW - 1.2, h: 0.55, fontFace: "Cambria", fontSize: 15, bold: true, color: DARK, valign: "middle" });
    s.addText(a.d, { x: x + 0.25, y: y + 1.05, w: cardW - 0.5, h: 1.8, fontFace: "Calibri", fontSize: 11.5, color: INK, lineSpacingMultiple: 1.2 });
  });

  pageNum(s);
}

// ---------- Slide 6: Arquitectura empresarial (Figura 1) ----------
{
  const s = newSlide();
  lightBg(s);
  kicker(s, "Sección 5 · Arquitectura empresarial");
  title(s, "PrioMed: intermediario transparente entre remisión y agenda");

  s.addImage({ path: "fig1_enterprise.png", x: 0.6, y: 1.9, w: 8.0, h: 4.29 });
  s.addShape("roundRect", { x: 0.6, y: 6.35, w: 8.0, h: 0.04, fill: { color: BORDER }, line: { type: "none" } });

  const roles = [
    { h: "Médico / paciente", d: "Envía la remisión y recibe prioridad + explicación." },
    { h: "IPS / especialista", d: "Recibe la cola priorizada y reporta disponibilidad de agenda." },
    { h: "Ministerio", d: "Audita cumplimiento agregado del MGTE, sin ver datos identificables." },
  ];
  roles.forEach((r, i) => {
    const y = 2.0 + i * 1.55;
    s.addShape("roundRect", { x: 8.95, y, w: 3.8, h: 1.3, rectRadius: 0.07, fill: { color: OFFWHITE }, line: { color: BORDER, width: 1 } });
    s.addText(r.h, { x: 9.2, y: y + 0.12, w: 3.3, h: 0.4, fontFace: "Calibri", fontSize: 12.5, bold: true, color: TEAL });
    s.addText(r.d, { x: 9.2, y: y + 0.5, w: 3.3, h: 0.7, fontFace: "Calibri", fontSize: 11, color: INK, lineSpacingMultiple: 1.15 });
  });

  pageNum(s);
}

// ---------- Slide 7: Gobernanza y Roadmap ----------
{
  const s = newSlide();
  lightBg(s);
  kicker(s, "Sección 5 · Gobernanza y hoja de ruta");
  title(s, "Quién decide, y en qué orden se construye");

  s.addText("Gobernanza (selección)", { x: 0.6, y: 1.95, w: 5.9, h: 0.4, fontFace: "Calibri", fontSize: 14, bold: true, color: TEAL });
  const gov = [
    { d: "Onboarding de tenant", w: "Comité de Gobierno de Datos" },
    { d: "Revocación de consentimiento", w: "Paciente (Ley 1581 de 2012)" },
    { d: "Auditoría de una decisión", w: "Comité / Oficial de Calidad Clínica" },
  ];
  gov.forEach((g, i) => {
    const y = 2.5 + i * 0.95;
    s.addShape("roundRect", { x: 0.6, y, w: 5.9, h: 0.78, rectRadius: 0.06, fill: { color: OFFWHITE }, line: { color: BORDER, width: 1 } });
    s.addText(g.d, { x: 0.8, y: y + 0.08, w: 5.5, h: 0.35, fontFace: "Calibri", fontSize: 12, bold: true, color: DARK });
    s.addText(g.w, { x: 0.8, y: y + 0.4, w: 5.5, h: 0.32, fontFace: "Calibri", fontSize: 11, color: MUTE });
  });

  s.addText("Hoja de ruta por fases", { x: 6.9, y: 1.95, w: 5.9, h: 0.4, fontFace: "Calibri", fontSize: 14, bold: true, color: TEAL });
  const phases = [
    { p: "Fase 0", d: "Motor de clasificación y portal sobre datos sintéticos (desplegada)" },
    { p: "Fase 1", d: "Piloto con una IPS/EPS socia" },
    { p: "Fase 2", d: "Multi-tenant, explicación LLM y reporte de cumplimiento" },
    { p: "Fase 3", d: "Interoperabilidad con RIPS, MIPRES, SISPRO" },
  ];
  phases.forEach((ph, i) => {
    const y = 2.5 + i * 0.72;
    s.addShape("ellipse", { x: 6.9, y: y + 0.06, w: 0.32, h: 0.32, fill: { color: i === 0 ? ORANGE : SEA }, line: { type: "none" } });
    s.addText(String(i), { x: 6.9, y: y + 0.06, w: 0.32, h: 0.32, fontFace: "Calibri", fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle" });
    s.addText([
      { text: ph.p + "  ", options: { bold: true, color: DARK } },
      { text: ph.d, options: { color: INK } },
    ], { x: 7.4, y: y - 0.02, w: 5.3, h: 0.6, fontFace: "Calibri", fontSize: 11.5, lineSpacingMultiple: 1.15, valign: "top" });
  });

  pageNum(s);
}

// ---------- Slide 8: Escenarios de calidad ----------
{
  const s = newSlide();
  darkBg(s);
  s.addText("SECCIÓN 5.4 · ATRIBUTOS DE CALIDAD", {
    x: 0.6, y: 0.45, w: 8, h: 0.35, fontFace: "Calibri", fontSize: 13, bold: true, color: SEA, charSpacing: 2,
  });
  s.addText("Cuatro escenarios que la arquitectura debe garantizar", {
    x: 0.6, y: 0.78, w: 11.8, h: 0.9, fontFace: "Cambria", fontSize: 28, bold: true, color: WHITE,
  });

  const scen = [
    { t: "Sensibilidad diferencial", m: "≥ 95%", d: "de señales de alarma escaladas correctamente a alta prioridad, vía guardrail de reglas.", c: ORANGE },
    { t: "Escalabilidad", m: "< 5 s", d: "de latencia p95 y 0% de solicitudes descartadas ante picos de carga (500 remisiones simultáneas).", c: SEA },
    { t: "Explicabilidad", m: "≥ 90%", d: "de consistencia entre la explicación generada y las variables/reglas que realmente decidieron.", c: TEAL },
    { t: "Seguridad / privacidad", m: "100%", d: "de intentos de acceso no autorizado bloqueados, con alerta en menos de 1 minuto.", c: "8FB0B4" },
  ];
  const cardW = 2.95, gap = 0.18, startX = 0.6, y = 2.0;
  scen.forEach((sc, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape("roundRect", { x, y, w: cardW, h: 3.9, rectRadius: 0.08, fill: { color: "052F35" }, line: { color: "0E4A50", width: 1 } });
    s.addText(sc.m, { x: x + 0.2, y: y + 0.3, w: cardW - 0.4, h: 0.8, fontFace: "Cambria", fontSize: 26, bold: true, color: sc.c });
    s.addText(sc.t, { x: x + 0.2, y: y + 1.1, w: cardW - 0.4, h: 0.6, fontFace: "Calibri", fontSize: 13, bold: true, color: WHITE });
    s.addText(sc.d, { x: x + 0.2, y: y + 1.75, w: cardW - 0.4, h: 2.0, fontFace: "Calibri", fontSize: 10.5, color: "C7DCDD", lineSpacingMultiple: 1.25 });
  });

  pageNum(s);
}

// ---------- Slide 9: Datos + Pipeline inteligente ----------
{
  const s = newSlide();
  lightBg(s);
  kicker(s, "Sección 6 · Datos e inteligencia");
  title(s, "Las tres alternativas, unidas en un solo pipeline por capas");

  s.addText([
    { text: "Cada alternativa (A/B/C) se convierte en una capa, no en un sistema aparte — así la evaluación comparativa de la Sección 4.3 equivale a medir cuánto cambia cada capa el resultado.", options: {} },
  ], { x: 0.6, y: 1.95, w: 12.1, h: 0.6, fontFace: "Calibri", fontSize: 12.5, italic: true, color: MUTE });

  const steps = [
    { n: "1", h: "Intake estructurado", d: "Formulario + notas de texto libre" },
    { n: "2", h: "Extracción NLP", d: "Detecta señales de alarma en texto libre" },
    { n: "3", h: "Guardrail de reglas (A)", d: "Alarma detectada → alta prioridad forzada" },
    { n: "4", h: "Scoring ML clásico (B)", d: "Puntaje sobre variables + revisión humana" },
    { n: "5", h: "Explicación LLM (C)", d: "Explica la decisión ya tomada, no decide" },
    { n: "6", h: "Validación humana", d: "Confirma la prioridad antes de persistir" },
  ];
  const cols3 = 3, cardW = 3.9, cardH = 1.55, gapX = 0.2, gapY = 0.25, startX = 0.6, startY = 2.75;
  steps.forEach((st, i) => {
    const col = i % cols3, row = Math.floor(i / cols3);
    const x = startX + col * (cardW + gapX), y = startY + row * (cardH + gapY);
    const c = i < 2 ? MUTE : i === 2 ? ORANGE : i === 3 ? SEA : i === 4 ? TEAL : MUTE;
    s.addShape("roundRect", { x, y, w: cardW, h: cardH, rectRadius: 0.07, fill: { color: OFFWHITE }, line: { color: BORDER, width: 1 } });
    s.addShape("ellipse", { x: x + 0.2, y: y + 0.2, w: 0.45, h: 0.45, fill: { color: c }, line: { type: "none" } });
    s.addText(st.n, { x: x + 0.2, y: y + 0.2, w: 0.45, h: 0.45, fontFace: "Cambria", fontSize: 15, bold: true, color: WHITE, align: "center", valign: "middle" });
    s.addText(st.h, { x: x + 0.78, y: y + 0.17, w: cardW - 1.0, h: 0.45, fontFace: "Calibri", fontSize: 12, bold: true, color: DARK, valign: "middle" });
    s.addText(st.d, { x: x + 0.2, y: y + 0.75, w: cardW - 0.4, h: 0.7, fontFace: "Calibri", fontSize: 10.5, color: INK, lineSpacingMultiple: 1.15 });
  });

  pageNum(s);
}

// ---------- Slide 10: Arquitectura de aplicación (Figura 2) ----------
{
  const s = newSlide();
  lightBg(s);
  kicker(s, "Sección 7.1 · Arquitectura de aplicación");
  title(s, "Servicios desacoplados, con perfiles de carga distintos");

  s.addImage({ path: "fig2_application.png", x: 0.6, y: 1.9, w: 8.3, h: 4.6 });

  s.addText([
    { text: "Por qué dos servicios separados\n\n", options: { bold: true, color: TEAL, fontSize: 13 } },
    { text: "Clasificación", options: { bold: true } }, { text: " llega en picos concentrados (muchas remisiones de una IPS a la vez).\n\n", options: {} },
    { text: "Explicación", options: { bold: true } }, { text: " depende de la latencia de un proveedor LLM externo.\n\n", options: {} },
    { text: "Separarlos permite escalar cada uno contra su propio cuello de botella.", options: { italic: true, color: MUTE } },
  ], {
    x: 9.15, y: 2.1, w: 3.6, h: 4.3, fontFace: "Calibri", fontSize: 12.5, color: INK, lineSpacingMultiple: 1.2, valign: "top",
  });

  pageNum(s);
}

// ---------- Slide 11: Tecnología y despliegue en la nube (Figura 3) ----------
{
  const s = newSlide();
  lightBg(s);
  kicker(s, "Sección 7.2–7.3 · Tecnología y despliegue");
  title(s, "AWS con separación de subredes según el nivel de exposición");

  s.addImage({ path: "fig3_deployment.png", x: 0.6, y: 1.85, w: 8.4, h: 4.68 });

  const notes = [
    { h: "Subred pública", d: "Solo el balanceador de carga (ALB) recibe tráfico de internet." },
    { h: "Cómputo privado", d: "Auto Scaling de los 4 servicios de aplicación, sin acceso directo a internet." },
    { h: "Datos privados", d: "PostgreSQL (RDS) y Redis (ElastiCache), aislados." },
    { h: "Servicios gestionados", d: "S3, SQS y Secrets Manager vía VPC Endpoint." },
  ];
  notes.forEach((n, i) => {
    const y = 2.0 + i * 1.15;
    s.addShape("ellipse", { x: 9.25, y: y + 0.03, w: 0.13, h: 0.13, fill: { color: SEA }, line: { type: "none" } });
    s.addText(n.h, { x: 9.5, y: y - 0.1, w: 3.3, h: 0.35, fontFace: "Calibri", fontSize: 12, bold: true, color: TEAL });
    s.addText(n.d, { x: 9.5, y: y + 0.22, w: 3.3, h: 0.7, fontFace: "Calibri", fontSize: 10.5, color: INK, lineSpacingMultiple: 1.15 });
  });

  pageNum(s);
}

// ---------- Slide 12: Lo que está desplegado hoy ----------
{
  const s = newSlide();
  lightBg(s);
  kicker(s, "Prototipo Fase 0 · Despliegue real");
  title(s, "Del plan al prototipo: lo que está desplegado hoy");

  // Navegador
  s.addShape("roundRect", { x: 0.6, y: 2.45, w: 2.1, h: 0.9, rectRadius: 0.07, fill: { color: WHITE }, line: { color: DARK, width: 1.25 } });
  s.addText("Revisor\n(navegador)", { x: 0.6, y: 2.45, w: 2.1, h: 0.9, fontFace: "Calibri", fontSize: 12, bold: true, color: DARK, align: "center", valign: "middle" });
  s.addShape("line", { x: 2.7, y: 2.9, w: 0.75, h: 0, line: { color: DARK, width: 1.5, endArrowType: "triangle" } });
  s.addText("HTTP :80", { x: 2.62, y: 2.45, w: 0.95, h: 0.3, fontFace: "Calibri", fontSize: 10, color: MUTE, align: "center" });

  // Instancia EC2
  s.addShape("roundRect", { x: 3.45, y: 1.95, w: 5.35, h: 4.75, rectRadius: 0.06, fill: { color: OFFWHITE }, line: { color: BORDER, width: 1 } });
  s.addText("Instancia EC2 · Amazon Linux 2023", { x: 3.65, y: 2.0, w: 5.0, h: 0.4, fontFace: "Calibri", fontSize: 11.5, bold: true, color: MUTE });
  s.addShape("roundRect", { x: 3.7, y: 2.5, w: 4.85, h: 0.8, rectRadius: 0.06, fill: { color: TEAL }, line: { type: "none" } });
  s.addText([
    { text: "Apache httpd", options: { bold: true, breakLine: true } },
    { text: "VirtualHost priomed.<IP>.nip.io", options: { fontSize: 10.5 } },
  ], { x: 3.7, y: 2.5, w: 4.85, h: 0.8, fontFace: "Calibri", fontSize: 12.5, color: WHITE, align: "center", valign: "middle" });
  s.addShape("line", { x: 4.83, y: 3.3, w: 0, h: 0.4, line: { color: DARK, width: 1.25, endArrowType: "triangle" } });
  s.addShape("line", { x: 7.42, y: 3.3, w: 0, h: 0.4, line: { color: DARK, width: 1.25, endArrowType: "triangle" } });
  s.addShape("roundRect", { x: 3.7, y: 3.7, w: 2.25, h: 1.05, rectRadius: 0.06, fill: { color: WHITE }, line: { color: TEAL, width: 1.25 } });
  s.addText([
    { text: "Portal web", options: { bold: true, breakLine: true } },
    { text: "index.html + documentación", options: { fontSize: 10, color: MUTE } },
  ], { x: 3.7, y: 3.7, w: 2.25, h: 1.05, fontFace: "Calibri", fontSize: 12, color: DARK, align: "center", valign: "middle" });
  s.addShape("roundRect", { x: 6.3, y: 3.7, w: 2.25, h: 1.05, rectRadius: 0.06, fill: { color: DARK }, line: { type: "none" } });
  s.addText([
    { text: "Classification Service", options: { bold: true, breakLine: true } },
    { text: "FastAPI · /classify", options: { fontSize: 10, color: "C7DCDD" } },
  ], { x: 6.3, y: 3.7, w: 2.25, h: 1.05, fontFace: "Calibri", fontSize: 12, color: WHITE, align: "center", valign: "middle" });

  s.addText("Contenedores Docker (puertos solo en 127.0.0.1)", { x: 3.7, y: 4.95, w: 4.85, h: 0.35, fontFace: "Calibri", fontSize: 10.5, italic: true, color: MUTE });
  [["PostgreSQL", 3.7], ["Redis", 6.3]].forEach(([name, x]) => {
    s.addShape("roundRect", { x, y: 5.35, w: 2.25, h: 0.75, rectRadius: 0.06, fill: { color: "E3F1F0" }, line: { color: BORDER, width: 1, dashType: "dash" } });
    s.addText(name, { x, y: 5.35, w: 2.25, h: 0.75, fontFace: "Calibri", fontSize: 12, bold: true, color: TEAL, align: "center", valign: "middle" });
  });
  s.addText("Listos para las fases siguientes; el servicio aún no los usa.", { x: 3.7, y: 6.15, w: 4.85, h: 0.4, fontFace: "Calibri", fontSize: 10, color: MUTE });

  // Datos clave
  const facts = [
    { n: "23", d: "pruebas automatizadas pasan, incluida la garantía estadística del umbral" },
    { n: "3 / 3", d: "contenedores sanos, con reinicio automático tras reiniciar la VM" },
    { n: "2", d: "puertos abiertos a internet (SSH y HTTP); API, base de datos y caché son internas" },
  ];
  facts.forEach((f, i) => {
    const y = 2.0 + i * 1.5;
    s.addText(f.n, { x: 9.2, y, w: 3.5, h: 0.65, fontFace: "Cambria", fontSize: 30, bold: true, color: TEAL, margin: 0 });
    s.addText(f.d, { x: 9.2, y: y + 0.65, w: 3.5, h: 0.7, fontFace: "Calibri", fontSize: 11.5, color: INK, lineSpacingMultiple: 1.15, margin: 0, valign: "top" });
  });

  pageNum(s);
}

// ---------- Slide 13: El portal ----------
{
  const s = newSlide();
  lightBg(s);
  kicker(s, "Prototipo Fase 0 · Portal web");
  title(s, "El revisor ve por qué se priorizó cada remisión");

  s.addImage({ path: "portal_decision.png", x: 0.6, y: 1.9, w: 6.61, h: 5.0 });
  s.addShape("rect", { x: 0.6, y: 1.9, w: 6.61, h: 5.0, fill: { type: "none" }, line: { color: BORDER, width: 1 } });

  const pts = [
    { h: "Prioridad en colores de triage", d: "Rojo, ámbar o verde, con una frase que explica la decisión y quién la tomó: la regla o el modelo.", c: ORANGE },
    { h: "La nota, releída", d: "Frases de alarma resaltadas y negadas tachadas: «sin dolor torácico» no cuenta, «falta de aire» sí.", c: TEAL },
    { h: "Riesgo frente al umbral", d: "P(alta) del modelo comparada con el umbral Neyman-Pearson calibrado (0,169).", c: SEA },
    { h: "Siempre revisión humana", d: "La sugerencia nunca se aplica sola: un profesional la confirma o la corrige.", c: MUTE },
  ];
  pts.forEach((pt, i) => {
    const y = 1.95 + i * 1.18;
    s.addShape("ellipse", { x: 7.65, y: y + 0.08, w: 0.22, h: 0.22, fill: { color: pt.c }, line: { type: "none" } });
    s.addText(pt.h, { x: 8.05, y, w: 4.7, h: 0.38, fontFace: "Calibri", fontSize: 13.5, bold: true, color: DARK, margin: 0, valign: "middle" });
    s.addText(pt.d, { x: 8.05, y: y + 0.4, w: 4.7, h: 0.7, fontFace: "Calibri", fontSize: 11.5, color: INK, lineSpacingMultiple: 1.15, margin: 0, valign: "top" });
  });
  s.addText([
    { text: "Nuevo en la API: ", options: { bold: true, color: TEAL } },
    { text: "evidence (frases encontradas y si están negadas) y high_threshold.", options: { color: INK } },
  ], { x: 7.65, y: 6.55, w: 5.1, h: 0.35, fontFace: "Calibri", fontSize: 10.5, margin: 0 });

  pageNum(s);
}

// ---------- Slide 14: Resultados con datos sintéticos ----------
{
  const s = newSlide();
  lightBg(s);
  kicker(s, "Prototipo Fase 0 · Evaluación");
  title(s, "Con el umbral Neyman-Pearson se cumple la meta del 95 %");

  s.addChart(pres.charts.BAR, [{
    name: "Sensibilidad en prioridad alta",
    labels: ["Urgencia registrada (S0)", "Solo reglas (S1)", "ML con argmax (S2)", "ML + umbral NP (S3)", "Reglas + ML (S4)", "PrioMed completo (S5)"],
    values: [0.755, 0.934, 0.899, 0.971, 0.918, 0.971],
  }], {
    x: 0.6, y: 1.85, w: 7.7, h: 4.6, barDir: "bar",
    chartColors: [TEAL],
    showTitle: true, title: "Sensibilidad en remisiones de alta prioridad", titleFontSize: 12, titleColor: DARK, titleFontFace: "Calibri",
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "0.000", dataLabelFontSize: 10, dataLabelColor: INK, dataLabelFontFace: "Calibri",
    valAxisMinVal: 0.5, valAxisMaxVal: 1.0, valAxisMajorUnit: 0.1, valAxisLabelFormatCode: "0.0", valAxisLabelFontSize: 10, valAxisLabelColor: MUTE, valAxisLabelFontFace: "Calibri",
    catAxisLabelFontSize: 11, catAxisLabelColor: INK, catAxisLabelFontFace: "Calibri", catAxisOrientation: "maxMin",
    valGridLine: { color: "E3ECEC", size: 0.75 }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 60,
  });
  s.addText("3000 remisiones sintéticas de prueba · α = δ = 0,05", { x: 0.6, y: 6.5, w: 7.7, h: 0.35, fontFace: "Calibri", fontSize: 10, color: MUTE, margin: 0 });

  const kpis = [
    { n: "0,971", d: "sensibilidad de PrioMed en prioridad alta (meta ≥ 0,95)", c: TEAL },
    { n: "3,2 %", d: "de falsas alarmas: el costo aceptado, resuelto en la revisión humana", c: ORANGE },
    { n: "0,915 → 0,934", d: "solo reglas, tras corregir el alcance de la negación", c: SEA },
  ];
  kpis.forEach((k, i) => {
    const y = 1.95 + i * 1.4;
    s.addText(k.n, { x: 8.75, y, w: 4.0, h: 0.62, fontFace: "Cambria", fontSize: 28, bold: true, color: k.c, margin: 0 });
    s.addText(k.d, { x: 8.75, y: y + 0.62, w: 4.0, h: 0.65, fontFace: "Calibri", fontSize: 11.5, color: INK, lineSpacingMultiple: 1.15, margin: 0, valign: "top" });
  });
  s.addShape("roundRect", { x: 8.75, y: 6.15, w: 4.0, h: 0.7, rectRadius: 0.06, fill: { color: OFFWHITE }, line: { color: BORDER, width: 1 } });
  s.addText("Datos sintéticos: validan el mecanismo, no el desempeño clínico.", { x: 8.9, y: 6.15, w: 3.75, h: 0.7, fontFace: "Calibri", fontSize: 10.5, italic: true, color: MUTE, valign: "middle", margin: 0 });

  pageNum(s);
}

// ---------- Slide 15: Seguridad ----------
{
  const s = newSlide();
  darkBg(s);
  s.addText("SECCIÓN 6.4 · SEGURIDAD Y PRIVACIDAD", {
    x: 0.6, y: 0.45, w: 8, h: 0.35, fontFace: "Calibri", fontSize: 13, bold: true, color: SEA, charSpacing: 2,
  });
  s.addText("Controles técnicos, no solo políticas", {
    x: 0.6, y: 0.78, w: 11.8, h: 0.9, fontFace: "Cambria", fontSize: 28, bold: true, color: WHITE,
  });

  const items = [
    { h: "Autenticación", d: "JWT de sesión para médicos; OAuth2 client-credentials por tenant IPS/EPS." },
    { h: "Autorización", d: "Cada token lleva tenant_id o patient_id; el API Gateway filtra fuera de alcance con 401/403." },
    { h: "Cifrado", d: "TLS 1.2+ en tránsito; AES-256 en reposo para base de datos y adjuntos." },
    { h: "Anonimización técnica", d: "Umbral mínimo de conteo aplicado dentro del servicio, no como regla externa — evita re-identificación." },
    { h: "Auditoría", d: "Log append-only de accesos y fallos de autenticación, con alerta en < 1 minuto." },
    { h: "Gestión de secretos", d: "Credenciales de NLP/LLM en AWS Secrets Manager, nunca embebidas en código." },
  ];
  const cols3 = 3, cardW = 3.9, cardH = 2.0, gapX = 0.2, gapY = 0.25, startX = 0.6, startY = 2.0;
  items.forEach((it, i) => {
    const col = i % cols3, row = Math.floor(i / cols3);
    const x = startX + col * (cardW + gapX), y = startY + row * (cardH + gapY);
    s.addShape("roundRect", { x, y, w: cardW, h: cardH, rectRadius: 0.07, fill: { color: "052F35" }, line: { color: "0E4A50", width: 1 } });
    s.addText(it.h, { x: x + 0.25, y: y + 0.22, w: cardW - 0.5, h: 0.45, fontFace: "Calibri", fontSize: 13, bold: true, color: SEA });
    s.addText(it.d, { x: x + 0.25, y: y + 0.75, w: cardW - 0.5, h: 1.15, fontFace: "Calibri", fontSize: 11, color: "C7DCDD", lineSpacingMultiple: 1.2 });
  });

  pageNum(s);
}

// ---------- Slide 16: Próximos pasos ----------
{
  const s = newSlide();
  lightBg(s);
  kicker(s, "Sección 8 · Próximos pasos");
  title(s, "Del prototipo sintético a un piloto con datos reales");

  const steps = [
    "Validar con profesionales clínicos la lista de señales de alarma y su severidad",
    "Revisar el Anexo Técnico del MGTE para calibrar el guardrail de reglas",
    "Reemplazar los datos sintéticos por datos abiertos o anonimizados (RIPS, SISPRO)",
    "Medir la sensibilidad por motivo de consulta, no solo en total",
    "Agregar el servicio de explicación (LLM) sobre la evidencia que ya expone la API",
    "Llevar el despliegue a la arquitectura objetivo: ALB, Auto Scaling, RDS y HTTPS",
  ];
  steps.forEach((t, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 6.05, y = 2.0 + row * 1.45;
    s.addShape("roundRect", { x, y, w: 5.75, h: 1.2, rectRadius: 0.07, fill: { color: OFFWHITE }, line: { color: BORDER, width: 1 } });
    s.addShape("ellipse", { x: x + 0.22, y: y + 0.42, w: 0.36, h: 0.36, fill: { color: i === 4 ? ORANGE : TEAL }, line: { type: "none" } });
    s.addText(String(i + 1), { x: x + 0.22, y: y + 0.42, w: 0.36, h: 0.36, fontFace: "Calibri", fontSize: 13, bold: true, color: WHITE, align: "center", valign: "middle" });
    s.addText(t, { x: x + 0.75, y: y + 0.14, w: 4.85, h: 0.95, fontFace: "Calibri", fontSize: 12, color: INK, valign: "middle", lineSpacingMultiple: 1.15 });
  });

  pageNum(s);
}

// ---------- Slide 17: Cierre ----------
{
  const s = newSlide();
  darkBg(s);
  s.addShape("ellipse", { x: 9.5, y: -1.5, w: 4.5, h: 4.5, fill: { color: TEAL, transparency: 72 }, line: { type: "none" } });

  s.addText("PrioMed", { x: 0.9, y: 2.5, w: 8, h: 1.0, fontFace: "Cambria", fontSize: 42, bold: true, color: WHITE });
  s.addText("Priorización transparente, auditable y clínicamente defendible\ndel acceso a consulta especializada.", {
    x: 0.9, y: 3.5, w: 9.5, h: 1.1, fontFace: "Calibri", fontSize: 16, color: "CADCE0", lineSpacingMultiple: 1.3,
  });
  s.addText("Gracias.", { x: 0.9, y: 5.1, w: 6, h: 0.6, fontFace: "Cambria", fontSize: 18, italic: true, color: SEA });
}

// ---------- Notas del orador: secciones "## N · Título" de speech/guion_exposicion.md ----------
{
  const guion = fs.readFileSync(path.join(__dirname, "..", "speech", "guion_exposicion.md"), "utf8").replace(/\r\n/g, "\n");
  const notes = {};
  for (const block of guion.split(/^## /m).slice(1)) {
    const m = block.match(/^(\d+) · [^\n]*\n([\s\S]*)$/);
    if (!m) continue;
    notes[Number(m[1])] = m[2].trim().split(/\n{2,}/).map((p) => p.replace(/\n/g, " ")).join("\n\n");
  }
  slides.forEach((s, i) => {
    if (!notes[i + 1]) throw new Error(`Falta el guion de la diapositiva ${i + 1}`);
    s.addNotes(notes[i + 1]);
  });
}

pres
  .writeFile({ fileName: path.join(__dirname, "PrioMed_Presentacion.pptx") })
  .then(() => console.log(`done: ${slides.length} diapositivas`));
