# Guion de exposición — PrioMed

19 diapositivas · unos 17 minutos a ritmo tranquilo · más una demostración opcional de 2 minutos.

Cada sección corresponde a una diapositiva. `presentation/build_deck.js` copia este texto como notas
del orador, así que en PowerPoint se ve en la vista del presentador. Las frases entre corchetes son
indicaciones para quien presenta, no se dicen.

## 1 · PrioMed

Buenos días. Mi proyecto se llama PrioMed y trata una pregunta muy concreta: cuando cientos de
pacientes están esperando una cita con un especialista, ¿en qué orden deberían atenderse?

Es, al mismo tiempo, un problema clínico, un problema de recursos escasos y un problema de
arquitectura de información. En los próximos minutos les voy a mostrar el problema, la arquitectura
que propongo y un prototipo que ya está funcionando en la nube.

## 2 · El problema

Empiezo por la evidencia. En Colombia, la espera promedio para una consulta especializada está entre
92 y más de 200 días, según la fuente y el periodo. En los casos más críticos, la entrega de
medicamentos puede tardar 135 días, y en Bogotá los reportes de barreras de acceso crecieron un 83 %
frente a 2023.

El regulador ya reaccionó: el Ministerio de Salud expidió la Circular 038 de 2025 y está
implementando el Modelo de Gestión de Tiempos de Espera, el MGTE, que exige criterios de
priorización explícitos por especialidad. Eso es importante para el proyecto, porque nos da una
referencia oficial contra la cual medir cualquier propuesta.

## 3 · Contexto clínico y actores

¿Quiénes están involucrados? Los pacientes en lista de espera, el médico general que remite, las IPS
con agenda limitada, las EPS, el Ministerio y la Supersalud, y los sistemas de información como RIPS
y SISPRO.

Para entender el problema desde adentro hice una entrevista exploratoria con un médico general. El
hallazgo principal fue este: en un mismo flujo llegan remisiones por dolor de cabeza o rinorrea y
remisiones por dolor torácico o ideación suicida. Equivocarse no cuesta lo mismo en todos los casos.
Subestimar un dolor torácico es mucho más grave que subestimar una rinorrea. Esa asimetría del riesgo
guía todo el diseño que les voy a mostrar.

## 4 · Estado del arte

En la literatura encontré tres familias de soluciones. Las reglas clínicas explícitas, como los
criterios de Queensland en Australia, son interpretables y auditables, pero no escalan bien.

El machine learning clásico logra buena exactitud global, pero falla donde más importa: en cirugía
cardiaca, un estudio reporta 71,6 % de exactitud, con una sensibilidad de solo 54,2 % frente a una
especificidad de 80,1 %. Es decir, descarta bien los casos leves, pero se le escapan los graves.

Y los modelos de lenguaje muestran resultados prometedores, pero todavía sin validar; un sistema de
autotriage digital acertó apenas en el 57 % de los casos.

La brecha es clara: los modelos fallan justo donde equivocarse cuesta más, y ningún estudio los evalúa
contra el MGTE colombiano.

## 5 · Propuesta general

Por eso la propuesta no parte de una tecnología, sino de una capacidad de negocio: priorizar el
acceso a consulta especializada de forma transparente, consistente y clínicamente defendible, con
trazabilidad frente a los umbrales del MGTE.

Para llegar ahí, el proyecto compara tres alternativas: A, reglas explícitas; B, machine learning
clásico con revisión humana obligatoria; y C, un modelo de lenguaje que explique la recomendación.
Cada una tiene una pregunta de investigación propia, que aparece en cada tarjeta.

## 6 · Arquitectura empresarial

Esta es la vista empresarial. El médico envía la remisión; PrioMed la recibe, la clasifica y devuelve
una prioridad con su explicación. Hacia afuera, PrioMed recibe de las IPS la disponibilidad de agenda
y le envía al Ministerio solo señales agregadas de cumplimiento, nunca datos individuales de
pacientes.

## 7 · Gobernanza y roadmap

La arquitectura viene con un modelo de gobierno que deja claro quién toma cada decisión. Por ejemplo,
la incorporación de una nueva institución la aprueba el Comité de Gobierno de Datos, la auditoría de
una decisión la hace el Oficial de Calidad Clínica, y la revocación del consentimiento la ejerce el
propio paciente, de acuerdo con la Ley 1581 de protección de datos.

El roadmap tiene cuatro fases: la fase 0 es un motor de clasificación sobre datos sintéticos; luego
un piloto con una IPS, una expansión a varias instituciones y, al final, la interoperabilidad
nacional. Más adelante les muestro que la fase 0 ya está construida.

## 8 · Escenarios de calidad

Definí cuatro escenarios de calidad medibles. El más importante es la sensibilidad diferencial: al
menos el 95 % de las remisiones con señales de alarma deben terminar en prioridad alta.

Los otros tres son escalabilidad, con latencia p95 por debajo de 5 segundos ante picos de 500
remisiones; explicabilidad, con al menos 90 % de consistencia entre la explicación y lo que realmente
decidió; y seguridad, con el 100 % de los accesos no autorizados bloqueados y alertados en menos de un
minuto.

## 9 · Pipeline de decisión

La decisión de diseño más importante es esta: las tres alternativas no compiten como sistemas
separados, se vuelven capas de un mismo pipeline.

Primero entra la remisión y se buscan señales de alarma en el texto. Si hay una señal activa, el
guardrail de reglas fuerza la prioridad alta, diga lo que diga el modelo. Si no, el modelo de machine
learning estima el riesgo. Después, un modelo de lenguaje explica la decisión, pero no decide. Y al
final siempre valida una persona. Así, comparar alternativas equivale a medir cuánto cambia cada capa
el resultado.

## 10 · Arquitectura de aplicación

En la vista de aplicación, los servicios están desacoplados. Separé clasificación y explicación en
dos servicios porque tienen perfiles de carga distintos: la clasificación llega en picos, cuando una
IPS envía muchas remisiones a la vez, mientras que la explicación depende de la latencia de un
proveedor externo. Separarlos permite escalar cada uno contra su propio cuello de botella.

## 11 · Tecnología y despliegue objetivo

Esta es la arquitectura objetivo en AWS. Solo el balanceador de carga queda en la subred pública; el
cómputo corre en subredes privadas con auto escalado; las bases de datos quedan aisladas, y los
servicios gestionados, como S3, SQS y Secrets Manager, se consumen por VPC Endpoint, sin pasar por
internet.

## 12 · Lo que está desplegado hoy

Ahora paso del plan a lo que ya existe. La fase 0 está desplegada en una instancia EC2 con una
configuración reducida de esa arquitectura objetivo.

Apache recibe el tráfico y sirve el portal web. Las peticiones de la API pasan al servicio de
clasificación, que corre en un contenedor Docker. PostgreSQL y Redis también corren en contenedores,
listos para las siguientes fases, aunque el servicio todavía no los usa.

Desde internet solo están abiertos los puertos de SSH, HTTP y HTTPS; la API, la base de datos y la caché solo
se alcanzan desde la misma máquina. El código tiene 23 pruebas automatizadas que pasan, y comprobé
que todo vuelve a arrancar solo después de reiniciar la máquina.

## 13 · Por dentro: el recorrido de una remisión

Ahora quiero mostrarles qué pasa por dentro cuando llega una remisión. Voy a seguir dos notas reales
del prototipo, las dos con urgencia registrada baja.

Primero, el servicio normaliza el texto: lo pasa a minúsculas, le quita las tildes y convierte la
puntuación en cortes de cláusula. Ese detalle es importante, como verán en un momento.

Segundo, busca señales de alarma. Tiene un diccionario de 16 frases que describen 5 señales: dolor
torácico, ideación suicida, dificultad respiratoria, síncope y herida por arma de fuego. En la remisión
A encuentra la palabra "disnea", que es dificultad respiratoria. En la B no encuentra ninguna.

Tercero, revisa si la señal está negada: busca palabras como "sin", "niega" o "no refiere" justo antes
de la frase, pero solo dentro de la misma cláusula. En la remisión A, el "sin" pertenece a "sin
alergias conocidas", que es otra cláusula, así que la disnea sigue activa.

Cuarto, la regla de alarma: si hay una señal activa, la prioridad es alta y ahí termina la decisión. Es
lo que pasa con la remisión A.

Si no hay señal, decide el modelo. El quinto paso estima la probabilidad de cada prioridad a partir de
las palabras de la nota y de la urgencia registrada. Para la remisión B, la probabilidad de prioridad
media es 0,94 y la de alta apenas 0,03. Y el sexto paso aplica el umbral: como 0,03 está por debajo de
0,169, no se eleva a alta y queda la prioridad más probable, media.

En los dos casos la respuesta trae la prioridad, quién la decidió, las frases encontradas y el aviso
de que una persona debe revisarla.

## 14 · Cómo aprende el modelo y cómo se fija el umbral

¿De dónde salen esas probabilidades y ese 0,169? Todo ocurre cuando el servicio arranca, en unos
segundos.

Primero genera 6000 remisiones sintéticas a partir de 20 motivos de consulta. Les agrega ruido a
propósito para que el problema no sea fácil: un 5 % de etiquetas alteradas, un 30 % de casos graves en
los que el médico registró mal la urgencia, y un 15 % de frases que no están en el diccionario de
alarmas.

Con eso entrena el modelo: convierte cada nota en unos 1700 términos, palabras y pares de palabras, le
suma la urgencia registrada y ajusta una regresión logística de tres clases.

Luego calibra el umbral con un lote distinto: toma los 389 casos graves de 3000 remisiones nuevas y mira
la probabilidad de alta que les da el modelo. Esa es la gráfica de la derecha: la mayoría está cerca de
uno, pero algunos casos graves reciben puntajes bajos. El método Neyman-Pearson elige el corte más alto
que, con 95 % de confianza, deja escapar como máximo el 5 % de los casos graves. Ese corte es el
decimotercer puntaje más bajo, 0,169, y por debajo de él quedan solo 12 casos de 389.

Así, el umbral no es un número que yo escogí a ojo: sale de una garantía estadística que además está
comprobada en las pruebas automatizadas.

## 15 · El portal

Este es el portal. A la izquierda, el médico escribe la nota de la remisión y la urgencia que
registró. A la derecha aparece la prioridad sugerida, en colores de triage, con una frase que dice
por qué.

Lo más importante es que el portal muestra qué leyó el sistema. En este ejemplo, la nota dice
"paciente sin dolor torácico pero con falta de aire". El dolor torácico aparece tachado, porque está
negado, y la falta de aire aparece resaltada, porque es una señal de alarma activa. Por eso la
prioridad es alta.

Debajo se ve el riesgo que estima el modelo frente al umbral, y siempre queda el aviso de que una
persona debe revisar la sugerencia.

[Demostración opcional, 2 minutos: abrir el portal, pegar una nota que diga "Sin fiebre. Disnea
severa", clasificar y mostrar que la disnea sale resaltada. Luego usar el ejemplo de rinorrea con
urgencia alta para mostrar que el modelo sugiere baja.]

## 16 · Resultados con datos sintéticos

¿Funciona? Esta es la sensibilidad para los casos de alta prioridad sobre 3000 remisiones sintéticas
de prueba.

La urgencia que registra el médico, por sí sola, detecta el 75,5 % de los casos graves. Con solo reglas
llegamos a 93,4 % y con machine learning a 89,9 %. Cuando el modelo usa el umbral Neyman-Pearson,
que acabamos de ver, la sensibilidad sube a 97,1 % y cumple
la meta del 95 %. El costo es aceptar 3,2 % de falsas alarmas, que se resuelven en la revisión humana.

Construyendo el portal encontré y corregí un error: una negación como "sin alergias conocidas"
ocultaba la alarma de la frase siguiente. Con la corrección, la sensibilidad de solo reglas subió de
91,5 % a 93,4 %.

Quiero ser honesto con la limitación: los datos son sintéticos, así que esto valida el mecanismo,
no el desempeño clínico real.

## 17 · Seguridad

La seguridad está diseñada como controles técnicos y no solo como políticas: autenticación con JWT y
OAuth2, autorización por institución, cifrado en tránsito y en reposo, auditoría con alertas, y
secretos fuera del código.

Un punto clave es la anonimización: el umbral mínimo de remisiones para reportar datos agregados se
aplica dentro del servicio, de modo que un conteo pequeño, que podría identificar a alguien, nunca
llega al regulador.

## 18 · Próximos pasos

Los próximos pasos son seis. Validar con profesionales clínicos la lista de señales de alarma y
revisar el Anexo Técnico del MGTE para calibrar las reglas. Reemplazar los datos sintéticos por datos
abiertos o anonimizados, como RIPS y SISPRO, y medir la sensibilidad por motivo de consulta, no solo
en total.

Además, agregar el servicio de explicación con el modelo de lenguaje, que ya tiene la evidencia que
necesita gracias al portal. Y llevar el despliegue a la arquitectura objetivo, con balanceador, auto
escalado y HTTPS.

## 19 · Cierre

Para cerrar: PrioMed propone una forma transparente, auditable y clínicamente defendible de priorizar
el acceso a consulta especializada. Las reglas protegen los casos graves, el modelo aporta donde las
reglas no alcanzan, y una persona siempre tiene la última palabra.

Muchas gracias. Quedo atento a sus preguntas.

## Preguntas probables

**¿Por qué no usar solo un modelo de lenguaje?** Porque la literatura muestra que los modelos fallan
más en los casos graves, y en este problema ese es el error más costoso. Por eso el modelo de
lenguaje explica, pero no decide.

**¿Para qué sirven las reglas si el modelo con umbral ya alcanza 97 %?** En los datos sintéticos el
guardrail no sube la métrica, pero es independiente del modelo y es auditable: cualquier persona puede
ver qué frase disparó la prioridad. Su valor real hay que medirlo con datos donde el modelo falle.

**¿Qué es el umbral Neyman-Pearson?** Es una forma de elegir el corte del modelo para garantizar, con
95 % de confianza, que no se escape más del 5 % de los casos graves. Se acepta a cambio un poco más de
falsas alarmas.

**¿Por qué no está en AWS completo, con balanceador y auto escalado?** Por las restricciones de AWS
Academy. Se desplegó la configuración reducida de la fase 0; la arquitectura objetivo está
documentada y es el siguiente paso.

**¿Qué pasa si el médico describe una alarma con otras palabras?** La regla no la ve, porque solo
conoce las frases de su diccionario. Para eso está el modelo: en una prueba con frases que no aparecen
ni en el diccionario ni en el entrenamiento, el pipeline completo mantuvo una sensibilidad de 96 %.

**¿Los datos son reales?** No. Son remisiones sintéticas generadas a partir de la caracterización
clínica preliminar. Validan el mecanismo, no el desempeño clínico.
