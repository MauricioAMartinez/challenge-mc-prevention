# 🛡️ Challenge MC Prevention

Este proyecto simula un paso de verificación de datos dentro de un flujo de checkout, enfocado en **prevención de fraude**. El objetivo principal es garantizar **performance**, **accesibilidad**, **compatibilidad sin JavaScript** y **soporte internacionalizado**.

---

## 📁 Estructura del proyecto

src/
├── app/
│ ├── previous-step/ # Página del formulario (flujo principal)
│ ├── confirmation/ # Página final de confirmación
│ ├── api/ # APIs internas simuladas
│ ├── components/ # Componentes del formulario
│ ├── hooks/ # Hooks personalizados
│ ├── services/ # Lógica de fetch para APIs
│ ├── ui/ # Elementos UI reutilizables
│ ├── page.tsx # Página principal de bienvenida
│ ├── layout.tsx # Layout global
│ ├── i18n.ts # Archivo de traducciones
│ └── middleware.ts # Detección de idioma por dominio

2. Instalar dependencias
   npm install

3. Configurar variables de entorno
   Crea un archivo .env
   API_BASE_URL=http://localhost:3000/api
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
   RECAPTCHA_SECRET_KEY=
   NODE_ENV =development
   PORT=3000
4. Ejecutar el servidor de Next.js

npm run dev

5. Ejecutar servidor Express (en otro terminal)

node server.js

🌐 Rutas principales
Ruta Descripción
/ Página de bienvenida
/previous-step Formulario principal (SSR)
/confirmation Confirmación final
http://localhost:3001/external Redirección desde servidor Express

🧩 Características técnicas
✅ SSR con soporte para fallback sin JavaScript

🌐 Soporte multi-idioma (es, pt, en) por dominio

🔐 Validación robusta en backend y frontend

🧠 Persistencia del formulario en localStorage

🧪 CAPTCHA reCAPTCHA v3 con fallback <noscript>

⚙️ API interna simulada (meli-users y meli-countries)

🔁 Flujo del servidor Express

GET /external
→ redirige a: /previous-step?referrer=/previous-step&token=123

| Endpoint           | Descripción                        |
| ------------------ | ---------------------------------- |
| `/api/user-data`   | Retorna datos simulados de usuario |
| `/api/countries`   | Lista de países simulados          |
| `/api/submit-step` | Valida y guarda el formulario      |


## 🐳 Ejecutar con Docker

Puedes levantar la aplicación con Docker sin necesidad de instalar Node.js localmente.

### ✅ Build y ejecución

```bash
docker build -t challenge-mc-prevention .
docker run -p 3000:3000 --env-file .env challenge-mc-prevention
```

### 🧪 Con Docker Compose (incluye Express)

```bash
docker-compose up --build
```

La app quedará accesible en:

- http://localhost:3000 — Aplicación Next.js
- http://localhost:3001/external — Simulación del paso anterior vía Express
