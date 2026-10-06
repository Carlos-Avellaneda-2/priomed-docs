# priomed-docs

Documentación del proyecto semestral **PrioMed** — Arquitectura Empresarial y Transformación Digital.

```
paper/          Artículo (Word) con arquitectura empresarial, datos, aplicación y despliegue
figures/        Figuras 1–3 (PNG) y scripts matplotlib para regenerarlas (figures/source)
diagrams/       Diagrama de componentes en PlantUML
presentation/   Presentación (PPTX) y script pptxgenjs que la genera
speech/         Guion de exposición
research/       Estado del arte del foco técnico + ADRs
```

Nota: el .docx en `paper/` aún embebe la versión anterior de la Figura 2 (flecha mal enrutada);
la versión corregida está en `figures/fig2_application.png`.

Regenerar figuras: `cd figures/source && python make_fig1.py && python make_fig2.py && python make_fig3.py`
(requiere matplotlib). Regenerar la presentación: `cd presentation && node build_deck.js` (requiere pptxgenjs).

Repos relacionados: `priomed-classification-service`, `priomed-infra`.
