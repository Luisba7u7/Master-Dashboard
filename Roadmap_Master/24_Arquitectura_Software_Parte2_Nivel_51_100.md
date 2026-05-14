# MATERIA 8: ARQUITECTURA DE SOFTWARE
**(Parte 2: Niveles 51 al 100 - Sistemas Distribuidos, Redes y Escalamiento)**

---

## Nivel 51-60: Escalamiento Horizontal, Vertical y Balanceadores de Carga

**Objetivo del nivel:**
Entender qué hacer físicamente cuando a tu aplicación ya no entran 100 usuarios, sino 1 millón de usuarios simultáneos, y tu servidor de Node.js se prende en fuego.

**Conceptos exactos:**
*   **Escalamiento Vertical (Scale Up):** Apagar la computadora, ponerle más Memoria RAM y un Procesador más grande, y volver a prenderla. (Fácil, pero tiene un límite físico y económico).
*   **Escalamiento Horizontal (Scale Out):** Comprar 10 computadoras baratas y clonar tu código de Node.js en las 10. (Infinito, pero difícil de configurar).
*   **El Balanceador de Carga (Load Balancer):** Un "Policía de tráfico" en la entrada de tus servidores (ej. Nginx, HAProxy o AWS ELB). Recibe la petición del usuario y decide a cuál de tus 10 computadoras mandarla usando algoritmos como *Round Robin* (uno y uno).
*   **Stateful vs Stateless (Sin Estado):** La regla de oro del escalamiento horizontal: Tus servidores NO PUEDEN guardar datos en su memoria RAM local (ej. la sesión del usuario). Si el usuario se loguea en el Servidor A, y el Balanceador manda su siguiente petición al Servidor B, el Servidor B no sabrá quién es. (Todo el estado debe vivir afuera, en Redis o la Base de Datos).

**Videos recomendados:**
*   *Midudev:* "¿Qué es un Balanceador de Carga?".
*   *Hussein Nasser:* "Load Balancing in 5 Minutes".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 61-70: Caching Distribuido y CDNs

**Objetivo del nivel:**
Acortar distancias físicas. La luz viaja rápido, pero no es instantánea. No hagas que un usuario en España le pida datos a tu base en Estados Unidos si puedes evitarlo.

**Conceptos exactos:**
*   **Caché en Memoria vs Distribuido:** Si tienes 10 servidores de Node, y usas memoria local, tienes 10 cachés desincronizados. La solución es un clúster de Redis centralizado al que los 10 servidores le pregunten.
*   **Estrategias de Caché:**
    *   *Cache-Aside:* La aplicación busca en Redis. Si falla, busca en Postgres y lo guarda en Redis.
    *   *Write-Through:* La app escribe en el Caché y en Postgres al mismo tiempo.
*   **El problema de la Inconsistencia:** "Cache invalidation is one of the two hard things in Computer Science". Aprender a purgar el caché cuando el dato real cambia.
*   **CDN (Content Delivery Network):** Redes de computadoras en todo el mundo (ej. Cloudflare). Tu aplicación guarda imágenes y HTML estático en estas redes. Si un usuario de Japón pide una foto, el CDN le sirve la foto desde Tokio, no desde tu servidor de Node en Nueva York, ahorrando un 90% de la carga de tu servidor central.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 71-80: Mensajería Asíncrona, Colas (Queues) y EDA

**Objetivo del nivel:**
Desacoplar servicios. Si haces un clon de Netflix, cuando un usuario sube un video, no puedes hacer que la petición HTTP se quede colgada 30 minutos esperando a que el video se convierta a 4K.

**Conceptos exactos:**
*   **Event-Driven Architecture (EDA):** Arquitectura Orientada a Eventos. Un microservicio "grita" al aire que algo pasó (ej. "UsuarioRegistrado"), y a quien le importe lo escucha.
*   **Colas de Mensajes (Message Queues - RabbitMQ):** Una tubería. El servicio A le lanza una caja (mensaje) a la tubería y sigue con su vida (Responde 200 OK rápido). Al otro lado, un Worker (o 100 Workers) extraen cajas y procesan el video pesado con calma.
*   **Patrón Pub/Sub (Publish/Subscribe - Kafka):** Un servicio Publica un evento en un "Topic" (Canal). Múltiples servicios están Suscritos y reaccionan al mismo tiempo. Ej. Si compras un vuelo, se publica "VueloComprado". El servicio de Facturas genera el PDF, el servicio de Marketing te manda un mail, y el servicio de Puntos suma tus millas, TODO EN PARALELO sin que el servicio de Compras lo sepa.
*   **Idempotencia:** Asegurarte de que si un mensaje se atasca en la red y llega 2 veces seguidas por error, tu sistema no le cobre 2 veces al usuario (el código detecta que ya se procesó).

**Ejercicios:**
1.  Investiga la diferencia principal entre un "Message Queue" tradicional (RabbitMQ) y un "Event Streaming Log" (Apache Kafka). Entiende por qué Kafka retiene los mensajes después de leídos y RabbitMQ no.

**Videos recomendados:**
*   *Pelado Nerd:* "Qué es RabbitMQ / Qué es Kafka".

**Tiempo estimado:**
*   2 semanas (Es un paradigma completamente nuevo de asincronía de arquitectura).

---

## Nivel 81-90: Serverless Architecture y Cloud Functions

**Objetivo del nivel:**
¿Y si en lugar de rentar 10 servidores 24/7 y pagar un dineral, subes tus funciones a la nube y AWS te cobra solo por los milisegundos que tarden en ejecutarse?

**Conceptos exactos:**
*   **FaaS (Function as a Service):** AWS Lambda, Google Cloud Functions, Vercel Edge Functions. Escribes un archivo de Node.js, lo subes, y la nube gestiona TODO el escalamiento (desde 0 tráfico hasta 100,000 requests de golpe sin que configures nada).
*   **Escalado a Cero (Scale-to-Zero):** Si nadie usa tu app a las 3 AM, tu costo es literalmente $0.00 dólares.
*   **El Problema del Cold Start (Arranque en frío):** Como los servidores se apagan cuando no hay tráfico, si un usuario entra a las 3 AM, AWS tarda unos 2 segundos en prender una computadora y cargar tu código, causando lentitud en la primera petición. (Aprender a mitigar esto).
*   **Lock-in del Proveedor:** Si usas toda la arquitectura Serverless propietaria de AWS, migrarte a Google Cloud será una pesadilla. (Por qué a veces es mejor usar contenedores Docker estandarizados).

**Tiempo estimado:**
*   1 semana.

---

## Nivel 91-100: Resiliencia, API Gateway y Patrones de Fallos

**Objetivo del nivel:**
En los sistemas distribuidos, todo va a fallar en algún momento. Los cables se cortan, los discos se queman. Un Ingeniero Senior diseña sistemas que sobreviven al colapso de sus partes.

**Conceptos exactos:**
*   **El API Gateway:** La única puerta de entrada al parque de diversiones. El cliente de React no se sabe la IP de tus 50 microservicios. Solo le habla al API Gateway, y este enruta la petición, verifica el JWT, limita el Rate Limiting y gestiona el CORS en un solo lugar.
*   **Circuit Breaker (Cortocircuito):** Si tu microservicio de Pagos se cae y empieza a dar error 500, no sigas enviándole peticiones ahogándolo más. El Cortocircuito "salta", bloquea temporalmente el tráfico a ese servicio y devuelve una respuesta de contingencia (ej. "Mantenimiento"), dándole tiempo a que reviva.
*   **Patrón Saga (Transacciones Distribuidas):** Si la creación de un pedido requiere confirmar inventario y procesar tarjeta en servidores separados, y la tarjeta rebota al final... ¿cómo "deshaces" la separación de inventario en la otra máquina? El patrón Saga usa "Eventos de Compensación" para revertir procesos que ya habían pasado.
*   **Trazabilidad Distribuida (Observability):** Ponerle un "ID de Correlación" único a la petición en el API Gateway, de manera que si pasa por 6 microservicios y falla en el número 5, puedas rastrear el log entero de principio a fin en Datadog o Kibana.

**Videos recomendados:**
*   *Hussein Nasser:* "API Gateway Explained".
*   *CodeOpinion:* "Saga Pattern".

**Tiempo estimado:**
*   2 semanas (Arquitectura Cloud Nativa en estado puro).

---
*(Fin de la Materia 8: ARQUITECTURA. Felicidades, estás mirando el software como lo ven los líderes técnicos (Tech Leads) de la industria. Estás a punto de graduarte de esto. Solo nos queda Clean Code, Metodologías e Inglés. ¿Cuál lanzamos ahora?)*
