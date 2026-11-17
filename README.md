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

El artículo incluye la sección 7.5 «Referral Portal Prototype», que describe el portal web del
prototipo (Figuras 4 y 5, tomadas del despliegue en EC2), y ya embebe la versión corregida de la
Figura 2.

La presentación (17 diapositivas) incluye el prototipo desplegado: arquitectura real en EC2, el
portal web y los resultados sobre datos sintéticos. El guion de `speech/guion_exposicion.md` se
copia como notas del orador al generar la presentación: cada sección `## N · Título` corresponde a
la diapositiva N, así que si editas el guion vuelve a generar el .pptx.

Regenerar figuras: `cd figures/source && python make_fig1.py && python make_fig2.py && python make_fig3.py`
(requiere matplotlib). Regenerar la presentación: `cd presentation && node build_deck.js` (requiere pptxgenjs).

## Publicación en el portal

El despliegue de `priomed-infra` (`deploy/deploy-ec2.sh`) copia el artículo, la presentación y las
figuras 1 a 3 al portal web de PrioMed, en la sección «Artículo y figuras»
(`http://priomed.<IP>.nip.io/#documentos`). Si regeneras una figura o el artículo, vuelve a correr
el script de despliegue para publicar la versión nueva.

Repos relacionados: `priomed-classification-service` (API de clasificación), `priomed-infra`
(despliegue y portal web).
