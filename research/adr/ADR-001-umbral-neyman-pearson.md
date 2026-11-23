# ADR-001 — Umbral Neyman–Pearson para la clase HIGH

**Estado:** aceptado e implementado (`priomed-classification-service`, `np_threshold.py`) · **Fecha:** 2026-10-05, actualizado 2026-11-23

**Contexto.** El Escenario 1 (Sección 5.4) exige sensibilidad ≥ 95 % en señales de alarma. Un
umbral argmax maximiza la exactitud global, no controla el error en la clase crítica.

**Decisión.** Calibrar el umbral sobre P(HIGH) con un conjunto de calibración *separado* y un método
de estadísticos de orden (ver `np_threshold.py`), de modo que P(tasa de omisión > α) ≤ δ.

**Consecuencias.** (+) garantía estadística explícita y auditable; (−) más falsas alarmas
(más revisión humana); (−) requiere ≥ ln δ / ln(1−α) casos HIGH de calibración (59 para α=δ=0.05);
(−) la garantía vale bajo la distribución de calibración: con cambio de distribución (p. ej. otra IPS)
hay que recalibrar.

**Alternativas descartadas.** Ponderar clases en el entrenamiento (sin garantía); reglas
únicamente (cobertura léxica limitada, ver paráfrasis no vistas en el reporte).
