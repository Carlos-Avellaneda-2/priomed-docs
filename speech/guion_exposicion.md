# Guion de exposición — PrioMed (14 diapositivas, ~8–9 min)

**1 · Portada.** Mi proyecto se llama PrioMed y aborda la priorización inteligente del acceso a consulta especializada en el sistema de salud colombiano. Es, al mismo tiempo, un problema clínico, un problema de escasez de recursos y un problema de arquitectura de información.

**2 · El problema.** Entre 92 y 210 días de espera promedio según la fuente y el periodo; hasta 135 días para la entrega de medicamentos en los casos más críticos; +83 % en casos reportados de barreras de acceso en Bogotá. El Ministerio emitió la Circular 038 de 2025 e implementa el MGTE, que exige priorización explícita y medible: ya existe una referencia normativa contra la cual evaluar cualquier propuesta.

**3 · Contexto clínico y actores.** Pacientes en lista de espera, médicos que remiten, IPS con agenda limitada, EPS, Ministerio y sistemas RIPS/MIPRES/SISPRO. Una entrevista exploratoria con un médico general mostró que el triage mezcla desde rinorrea hasta dolor torácico e ideación suicida: un error no cuesta lo mismo en todos los casos. Esa asimetría de riesgo es central en todo el diseño.

**4 · Estado del arte.** Reglas explícitas (Queensland): interpretables, pero no escalan. ML clásico: 71.6 % de exactitud en cirugía cardiaca, pero sensibilidad 54.2 % frente a especificidad 80.1 %. LLM: resultados prometedores sin validar; autotriage digital con 57 % de acierto, peor en urgencia intermedia. Los modelos fallan donde más cuesta equivocarse, y ningún estudio lo evalúa contra el MGTE.

**5 · Propuesta general.** Capacidad: priorizar el acceso de forma transparente, consistente y clínicamente defendible. Tres alternativas a investigar: A reglas, B ML clásico, C LLM con explicación.

**6 · Arquitectura empresarial.** El médico o paciente envía la remisión; PrioMed la captura, clasifica y devuelve prioridad con explicación; envía señales agregadas al Ministerio y recibe disponibilidad de agenda de la IPS.

**7 · Gobernanza y roadmap.** Quién decide qué (p. ej., la revocación de consentimiento la ejerce el paciente, Ley 1581). Cuatro fases: motor de clasificación sobre datos sintéticos, piloto con una IPS, expansión multi-tenant, interoperabilidad nacional.

**8 · Atributos de calidad.** Sensibilidad diferencial ≥ 95 %; latencia p95 < 5 s sin solicitudes perdidas; ≥ 90 % de consistencia en la explicación; 100 % de accesos no autorizados bloqueados.

**9 · Datos e inteligencia.** Las tres alternativas se vuelven capas de un mismo pipeline: intake, extracción NLP, guardrail de reglas, scoring ML, explicación LLM (explica, no decide) y validación humana.

**10 · Arquitectura de aplicación.** Servicios desacoplados; Clasificación y Explicación se separan porque tienen perfiles de carga distintos.

**11 · Tecnología y despliegue.** AWS con subred pública (solo ALB), cómputo privado con Auto Scaling, datos aislados y servicios gestionados vía VPC Endpoint.

**12 · Seguridad.** JWT/OAuth2, autorización por tenant, cifrado, anonimización como control técnico, auditoría y gestión de secretos.

**13 · Próximos pasos.** Profundizar estado del arte, revisar el Anexo Técnico del MGTE, completar el Digital Opportunity Canvas, explorar datos abiertos y construir el prototipo de la Fase 0.

**14 · Cierre.** PrioMed propone una forma transparente, auditable y clínicamente defendible de priorizar el acceso a consulta especializada. Gracias.
