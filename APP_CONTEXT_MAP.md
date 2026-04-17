# APP CONTEXT MAP: Gran Facu Aventura

Este documento sirve como el "ADN" de la aplicación web interactiva **Gran Facu Aventura**, documentando su estructura, componentes, estado y navegación para facilitar su migración o refactorización hacia una nueva plantilla.

## 1. Estructura de Datos (TypeScript)

La aplicación hace un uso intensivo de TypeScript para mantener la seguridad de tipos, especialmente en la configuración del avatar y el estado del juego.

### Modelos del Dominio de Negocio
* **`MissionDetails`** (`src/lib/eventData.ts`): Define los datos estáticos del evento (festejado, lugar, dirección, fecha, horario, fecha objetivo, contactos y notas).
* **Tipos de Avatar** (`src/lib/avatarOptions.ts`):
  * `FurColor`: `'Marrón' | 'Polar' | 'Cósmico' | 'Arcoíris'`
  * `HeadItem`: `'Ninguno' | 'Gorra' | 'Gafas' | 'Pastel' | 'VR'`
  * `TorsoItem`: `'Ninguno' | 'Baloncesto' | 'Héroe' | 'Negocios'`
  * `Backpacker`: `'Ninguno' | 'Shicka' | 'Larry' | 'Pingüino'`
  * `AvatarConfig`: Interfaz que agrupa las selecciones del usuario.

### Modelos de Estado
* **`GameState`** (`src/stores/game-store.ts`): Define el estado global de Zustand persistido (nombre del jugador, monedas, estado de minijuegos, configuración de avatar, biografía y fotos).
* **`MissionStep`** (`src/hooks/use-rewards.tsx`): Define la estructura de cada paso de la misión (id, label, icon, coinReward, completed).
* **`RewardsContextType`** (`src/hooks/use-rewards.tsx`): Define el estado y acciones del contexto de recompensas.

### Tipos de Componentes (Props)
* **Pantallas**: `PasswordScreenProps`, `RegisterScreenProps`, `AvatarDisplayProps`, `MissionDetailsScreenProps`, `PresentationScreenProps`, etc.
* **Secciones de Juego**: `GameFlowProps`, `ChestSectionProps`, `RSVPSectionProps`, `DialogBoxProps`, `MapSectionProps`, `CountdownTimerProps`.
* **Componentes UI Base**: `HeadingProps`, `BodyProps`, `LabelProps`, `SubtitleProps`, `ContainerProps`, `ChartConfig`, `ImagePlaceholder`.

---

## 2. Inventario de Componentes (`src/components/`)

Los componentes siguen una nomenclatura secuencial por carpetas indicando el orden lógico o flujo de pantallas.

### Componentes de Flujo Principal (Pantallas)
* **`01-password-screen`**: Pantalla de bloqueo/acceso inicial. (Dependencias: `lucide-react`)
* **`02-loading-screen`**: Pantalla de carga simulada para inmersión.
* **`03-intro-video-screen`**: Renderiza el video introductorio.
* **`04-presentation-screen`**: Presentación del festejado y la misión.
* **`05-register-screen`**: Formulario donde el invitado ingresa su nombre. (Dependencias: `lucide-react`)
* **`06-arcade-world-screen`**: Pantalla que simula minijuegos/arcade.
* **`07-avatar-creator-screen`**: Interfaz de personalización del avatar interactivo. (Dependencias: `lucide-react`)
* **`08-mission-details-screen`**: Pantalla estructurada con los detalles logísticos del cumpleaños. (Dependencias: `lucide-react`)
* **`09-bio-book-screen`**: "Libro de Biografía" del festejado. (Dependencias: `lucide-react`)
* **`11-game-flow`**: Componente orquestador que contiene las secciones internas (Mapa, Cofre, RSVP) una vez en el juego principal.

### Componentes de UI Ingame (Secciones y Widgets)
* **`10-avatar-display`**: Renderiza visualmente el avatar compuesto según las opciones seleccionadas.
* **`12-game-hud`**: Interfaz superior (Heads-up Display) mostrando monedas e información del usuario.
* **`13-countdown-timer`**: Temporizador que cuenta regresivamente hasta la fecha del evento.
* **`14-dialog-box`**: Caja de diálogo estilo videojuego retro para NPCs (personajes).
* **`15-coin-reward`**: Componente y animación que se muestra al ganar monedas.
* **`16-responsive-container`**: Wrapper de layout base.
* **`18-mission-section`**, **`19-chest-section`**, **`20-map-section`**, **`21-rsvp-section`**, **`22-shop-section`**: Módulos que componen las distintas pestañas de contenido en el mapa/inventario del usuario. (Dependencias: múltiples íconos de `lucide-react`).
* **`23-easter-egg-section`**: Lógica de pantalla secreta (Backrooms).

### Componentes UI Reutilizables (`ui/`)
* **Radix UI (`@radix-ui/react-*`)**: Se utilizan primitivas accesibles para: `accordion`, `dialog` (y `alert-dialog`, `sheet`), `dropdown-menu`, `popover`, `progress`, `select`, `scroll-area`, `tabs`, `checkbox`, `switch`, `radio-group`, `slider`, `avatar`, y `toast`.
* **Shadcn UI**: Los componentes en la carpeta `ui/` están basados en Shadcn, con Tailwind CSS para el estilo y `framer-motion` para animaciones adicionales.

---

## 3. Lógica de Negocio (Estado, Hooks y Servicios)

Dado que la aplicación simula la lógica de un juego del lado del cliente, la persistencia de datos descansa en gran medida sobre el `localStorage` en el navegador.

* **Estado Global (Zustand) - `useGameState`** (`src/stores/game-store.ts`):
  * **Propósito**: Mantiene el estado persistente del usuario (nombre del jugador, monedas acumuladas, estado de minijuegos completados, configuración del avatar seleccionada).
  * **Mecanismo**: Utiliza el middleware `persist` con una implementación `safeLocalStorage` para evitar errores durante el Server-Side Rendering (SSR).
* **Sistema de Recompensas - `useRewards`** (`src/hooks/use-rewards.tsx`):
  * **Propósito**: Contexto de React (`RewardsProvider`) que gestiona el progreso a través de las diferentes "misiones" (Intro, Mapa, Cofre, RSVP, Tienda, ???). Controla el porcentaje de progreso y asigna/computa monedas al completar acciones.
* **Hooks de Utilidad**:
  * `useMobile` / `useMediaQuery`: Detección responsiva de dispositivo para condicionar el renderizado (ej: interfaces móviles vs. de escritorio).
  * `useToast`: Maneja las notificaciones temporales en pantalla.
* **Servicios / API**:
  * En la actualidad, el grueso de la experiencia ocurre en el cliente y mediante Single Page Application (SPA) state.
  * _Consideración Arquitectónica_: Según las directivas del proyecto (Memoria), en entornos productivos se validan passwords críticos a través de variables de entorno y se comunican con `/api/verify-password`, aunque actualmente la lógica parece centrarse en flujos estáticos del cliente.

---

## 4. Mapa de Navegación (Rutas Next.js App Router)

La aplicación tiene ramificaciones diseñadas para soportar la estrategia "Dual-Mode UX" (Modo Aventurero / Modo Guardián).

* **`/`** (`src/app/page.tsx`): Redirige inmediatamente a `/mission`.
* **`/mission`** (`src/app/mission/page.tsx`): **Ruta Principal del flujo de Invitación.**
  * Renderiza dinámicamente (`useState` de 'Screen') una secuencia: `loading` -> `introVideo` -> `presentation` -> `register`.
  * Después de registrarse, el flujo diverge o continúa a: `arcadeWorld` -> `avatarCreator` -> `gameFlow` (este último carga los componentes del mapa y RSVP).
* **`/mission/details`** (`src/app/mission/details/page.tsx`):
  * Ruta que va directamente a `MissionDetailsScreen`. Parte del "Skip/Direct path" o "Modo Guardián".
* **`/mission/bio`** (`src/app/mission/bio/page.tsx`):
  * Ruta que renderiza `BioBookScreen`.
* **Rutas Directas Aisladas**:
  * `/arcade` (`src/app/arcade/page.tsx`)
  * `/avatar` (`src/app/avatar/page.tsx`)
* **Rutas de Administración**:
  * `/admin`, `/admin/guide`, `/02-admin-config`, `/03-admin-guide`: Vistas pensadas para el "Panel del Creador" guiado por el personaje Oso Científico.

---

## 5. Variables de Entorno (.env)

Aunque el proyecto actual puede omitir un `.env` en los archivos expuestos, para la migración y funcionamiento en producción deben configurarse las siguientes variables críticas:

1. **`APP_PASSWORD`**:
   * **Propósito**: Contraseña requerida en las pantallas de validación (e.g. `01-password-screen` o en el panel de `admin`) para autorizar la entrada o configuración del evento.
   * **Seguridad**: Esta clave debe permanecer en el servidor y su verificación debe darse mediante API routes (ej. `/api/verify-password`) para que nunca sea expuesta al bundle del cliente.
2. **Variables de Firebase (Potenciales)**:
   * El `package.json` incluye `"firebase": "^11.10.0"`. Si se activa base de datos en tiempo real (Firestore) para la recolección centralizada del RSVP o analíticas, se requerirán:
   * `NEXT_PUBLIC_FIREBASE_API_KEY`
   * `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   * `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   * `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   * `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   * `NEXT_PUBLIC_FIREBASE_APP_ID`
