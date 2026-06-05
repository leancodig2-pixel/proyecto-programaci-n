# proyecto-programaci-n
tareas universitarias
#Proyecto de Conectividad e Infraestructura - Liceo "José Antonio Abreu"

## Descripción General
Este repositorio documenta el diseño, instalación y puesta en marcha de la infraestructura de conectividad, cableado estructurado y servicios centralizados de servidor en el laboratorio del Centro Bolivariano de Informática y Telemática (CBIT) del Liceo "José Antonio Abreu" (Trujillo, Venezuela). 

El objetivo principal es resolver la inestabilidad de la señal inalámbrica empírica y la pérdida de ancho de banda mediante una arquitectura de red normalizada bajo estándares internacionales de telecomunicaciones y normativas legales vigentes.

## Lógica de Negocio del Sistema
La lógica de negocio define las reglas operativas, flujos de datos y restricciones técnicas que garantizan que la inversión tecnológica se traduzca en valor educativo, estabilidad y seguridad para la institución.

### 1. Reglas de Arquitectura y Topología de Red
* Topología en Estrella Obligatoria: La distribución física debe ser centralizada desde el switch principal. El fallo o desconexión de una estación de trabajo individual no debe alterar ni degradar el rendimiento del resto de los nodos de la red.
* Normalización del Cableado: Toda la infraestructura física implementada debe utilizar cables UTP Categoría 6 o superior, ponchados y certificados estrictamente bajo la norma ANSI/TIA/EIA-568. Esto garantiza transmisiones estables de hasta 1 Gbps, minimizando la atenuación y la diafonía (*crosstalk*).

### 2. Gestión y Políticas del Servidor Centralizado
El servidor central opera como el núcleo lógico del sistema. Administra la red bajo las siguientes políticas:
* Control de Acceso Perimetral (QoS): El tráfico se prioriza dinámicamente para asegurar que las herramientas pedagógicas tengan garantizado el ancho de banda necesario, evitando cuellos de botella por descargas masivas o conexiones recreativas.
* Centralización de Autenticación: La gestión de permisos de usuarios y perfiles (docentes, estudiantes y administrativos) se valida de forma unificada desde el servidor para mitigar riesgos de seguridad interna.
* Políticas de Software Libre: Siguiendo el marco legal nacional, los servicios del servidor deben implementarse sobre sistemas operativos abiertos de nivel empresarial (ej. Linux/Ubuntu Server), eliminando la dependencia y costos de licencias comerciales privativas.


## Marco Legal y Cumplimiento de Negocio

El proyecto opera bajo las normativas legales de la República Bolivariana de Venezuela, las cuales dictan las directrices de adopción tecnológica:

* Constitución de la RBV (Artículo 110): Reconocimiento de la tecnología y la innovación como instrumentos de interés público para el desarrollo social y político.
* Ley de Infogobierno (Artículo 4): Uso obligatorio de Tecnologías de Información Libres para asegurar la transparencia de los datos y consolidar la soberanía tecnológica.
* Ley Orgánica de Ciencia, Tecnología e Innovación (LOCTI): Enfoque práctico y transferible del conocimiento para solventar problemas reales en el sector público educativo.
