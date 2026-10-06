# Estado del arte — foco: control del subtriaje en casos críticos

**Foco acordado:** sensibilidad diferencial en casos de alta severidad. Pregunta técnica: *¿cómo
garantizar, con respaldo estadístico, que la tasa de casos HIGH clasificados como no-HIGH sea ≤ α,
y qué rol tienen reglas, ML y LLM en lograrlo?*

> Nota de verificación: los resúmenes de la sección 2 salen de los *abstracts* en arXiv leídos
> durante la sesión. No se leyeron los textos completos; antes de citar, léelos y confirma
> detalles (métricas, datasets, año de publicación).

## 1. Ya estaba en el artículo (Sección 3)
Reglas clínicas (Queensland CPC), ML clásico en remisiones (otorrino, cirugía cardiaca,
musculoesquelético) y LLM en triage. Patrón: peor desempeño donde el error es más costoso.

## 2. Nuevo — fuentes para el foco técnico

| Tema | Fuente | Idea aprovechable |
|---|---|---|
| Clasificación Neyman–Pearson jerárquica para priorizar categorías severas | Wang, Wang, Li & Tong. *Hierarchical Neyman-Pearson Classification for Prioritizing Severe Disease Categories in COVID-19 Patient Data* (2023). https://arxiv.org/abs/2210.02197 | Controla con alta probabilidad los errores de "sub-clasificación" de las clases más severas con un algoritmo de selección de umbral sobre clasificadores existentes. Base conceptual del umbral NP de `np_threshold.py`. |
| NP multiclase vía aprendizaje sensible al costo | Tian & Feng. *Neyman-Pearson Multi-class Classification via Cost-sensitive Learning* (2024). https://arxiv.org/abs/2111.04597 | Dualidad fuerte entre NP multiclase y aprendizaje sensible al costo: minimizar pérdida global sujeto a cotas de error en clases críticas. Camino para extender de HIGH-vs-resto a 3 clases. |
| Priorización de colas con reclasificación dinámica | Gupta, Kumar & Dang. *Agentic AI for Clinical Urgency Mapping and Queue Optimization in High-Volume Outpatient Departments* (2026). https://arxiv.org/abs/2604.00215 | Simulación (368 pacientes sintéticos): 94.2 % de críticos atendidos en < 10 min vs. 30.8 % con orden de llegada; subtriaje del 16.6 % global pero cero críticos omitidos. Referencia para la métrica de cola, no solo de clasificación. |
| Fidelidad vs. plausibilidad de explicaciones LLM | Agarwal, Tanneru & Lakkaraju. *Faithfulness vs. Plausibility: On the (Un)Reliability of Explanations from Large Language Models*. https://arxiv.org/abs/2402.04614 | Las explicaciones de LLM suelen ser plausibles pero no fieles al razonamiento real; en medicina se exige fidelidad. Justifica que la capa LLM solo *explique* una decisión ya tomada por reglas/ML y que se mida la consistencia (Escenario 3). |
| Algoritmo "NP umbrella" | Tong, Feng & Li. *Neyman-Pearson classification algorithms and NP receiver operating characteristics*. Science Advances (2018). | Origen del método de orden estadístico usado en `np_threshold.py`. **Citado de memoria, no verificado en esta sesión: confirma la referencia.** |

## 3. Brecha que ataca este repo
Ninguna de las fuentes anteriores combina (i) garantía NP sobre la clase crítica, (ii) un guardrail
de reglas independiente del modelo, y (iii) evaluación frente a los umbrales del MGTE colombiano.

## 4. Pendiente
- Buscar literatura **indexada** (PubMed/Scopus) sobre subtriaje y sobre-triaje en remisiones
  ambulatorias; las fuentes arriba son preprints.
- Revisar el Anexo Técnico del MGTE (Resolución 2117 de 2025) para fijar α por especialidad.
