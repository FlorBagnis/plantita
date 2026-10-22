# 🌸 Plantita · Cumplí tus metas y hacé crecer tu planta

<p align="center">
  <img width="100%" alt="Plantita Banner" src="https://plantita.vercel.app/og.png" />
</p>

> **Plantita** es una Progressive Web App (PWA) interactiva diseñada para transformar pequeños hábitos diarios en un progreso visual motivador. Combina el seguimiento de metas, la técnica Pomodoro, mascotas virtuales y sincronización en la nube en tiempo real.

<p align="center">
  <a href="https://plantita.vercel.app/">
    <img src="https://img.shields.io/badge/Ver_Demo-Abrir_Plantita-ec4a95?style=for-the-badge&logo=vercel&logoColor=white" alt="Ver Demo" />
  </a>
</p>

---

## ✨ Características Principales

* 🍅 **Hábitos + Pomodoro:** Registro de metas diarias con frecuencias personalizadas (todos los días, días específicos o 3 veces por semana) y temporizador de enfoque (25 y 50 minutos).
* 🌱 **Evolución y Descanso:** Tu planta evoluciona con tu constancia a lo largo de 12 etapas hasta convertirse en un gran árbol. Además, entra automáticamente en modo reposo por la noche 🌙.
* 🐱 **Mascotas de Compañía Interactivas:** Elegí tu mascota de bienvenida (Gatito 🐱, Ranita 🐸, Tortuga 🐢 o Mariquita 🐞). Podés acariciarla, darle mimos, verla caminar por el jardín, alimentarla y jugar a tirarle una pelotita interactiva con físicas.
* 🎁 **Tienda y Recompensas:** Ganá monedas cumpliendo metas y misiones diarias, desbloqueá accesorios (lazos, anteojos, coronas, collares), congeladores de racha ❄️ y fondos animados gratuitos.
* 📊 **Estadísticas y Reportes:** Gráficos de calor mensuales, métricas de constancia, mejor horario de rendimiento y la posibilidad de descargar tu historial completo en **PDF** y **CSV**.
* 🧘 **Modo Calma:** Un espacio diseñado para disfrutar de la aplicación sin ruidos, distracciones ni animaciones.
* 🌤️ **Clima en Tiempo Real:** Integración opcional con geolocalización y la API de Open-Meteo para reflejar el clima real de tu zona en el entorno visual.
* ☁️ **Sincronización Segura:** Conexión entre dispositivos mediante un código secreto en la nube (JSONBlob) o respaldos manuales portables.
* 📱 **PWA & Offline:** Instalable en dispositivos móviles y de escritorio con soporte de Service Workers y notificaciones push.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** HTML5 semántico, CSS3 moderno (Variables CSS, Flexbox, Grid, Animaciones avanzadas), JavaScript (Vanilla ES6+).
* **APIs & Librerías:** jsPDF (v2.5.1 para generación de reportes en PDF), Open-Meteo API (Clima), JSONBlob & Restful-API (Sincronización cloud).
* **Entorno & Deploy:** Git, GitHub, Vercel, Progressive Web App (PWA).

---

### 🎯 Objetivo del proyecto

El objetivo principal es consolidar conceptos avanzados de **desarrollo frontend**, **lógica de negocio reactiva** y **gestión de estado en el cliente**, aplicando habilidades técnicas clave para roles como:

* **Frontend Developer**
* **Technical Support Specialist / Analyst**
* **Customer Support / Customer Experience**
* **Product Operations / Operations Support**

El proyecto profundiza en la interacción entre una interfaz altamente dinámica e intuitiva, el manejo de eventos tácticos y de mouse (como físicas de la mascota y la pelotita), la renderización en Canvas/SVG, y la persistencia de datos offline/online, garantizando una experiencia de usuario fluida y libre de fricciones.

---

## 🗄️ Estructura de Datos y Sincronización

Los datos del usuario (metas, historial de riegos, configuración y jardín) se almacenan localmente mediante `localStorage` para un rendimiento instantáneo y offline-first. 

Cuando se activa la sincronización, la aplicación empaqueta el estado estructurado en un objeto JSON versionado por marcas de tiempo (`mod`), permitiendo la persistencia y actualización en tiempo real entre múltiples dispositivos sin necesidad de bases de datos complejas o registros de usuario tradicionales.

---

## 📝 Historial de Actualizaciones (Changelog)

### 🐾 Mascotas interactivas, Pelotita y Clima (Octubre 2026)
* **Mascotas con comportamiento autónomo:** Las mascotas caminan por la pantalla, se duermen de noche, reaccionan a las caricias con corazones flotantes y piden atención interactiva.
* **Minijuego de la Pelotita:** Sistema de arrastrar y soltar (*drag & drop*) o toque en pantalla para lanzar la pelota; la mascota corre a buscarla y te la devuelve.
* **Selector de Fondos Gratuitos:** Incorporación de múltiples escenarios estéticos (Cielo, Campo, Jardín, Bosque, Playa, Montaña, Arcoíris, Noche, Espacio, Fiesta) accesibles desde la interfaz principal.
* **Regadera Animada:** Animación realista de la regadera viajando y regando la planta al completar las metas requeridas.
* **Optimización PWA:** Mejoras en Service Workers, notificaciones y soporte multiplataforma.

---

¿Te gustó el proyecto? Dejale una ⭐ al repositorio.

---

## 📄 Licencia

Distribuido bajo licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👩‍💻 Autora

**Florencia Bagnis**

* 💼 [LinkedIn](https://www.linkedin.com/in/florencia-bagnis)
* 💻 [Portfolio](https://florbagnis.github.io/Portfolio-FlorBagnis/)
* 📧 [florenciasoledadbagnis@gmail.com](mailto:florenciasoledadbagnis@gmail.com)

<br>

> 🌸 Proyecto personal desarrollado para el seguimiento de **hábitos y crecimiento personal**, enfocado en **JavaScript moderno**, interfaces limpias con **HTML5/CSS3**, animaciones fluidas y una experiencia de usuario totalmente **responsive**.
