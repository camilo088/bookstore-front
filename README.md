Arquitectura: Next.js App Router con TypeScript estricto. Estado global en AuthorsProvider (Context) para autores y favoritos, montado en app/layout.tsx para persistir sólo durante navegación (no storage). useAuthors expone CRUD + favoritos. Páginas /authors, /authors/new, /authors/[id]/edit, /favoritos. UI con Tailwind.

Parte B: Implemente la parte de Accesibilidad (cómo validar: tabulación, aria-pressed, role="alert") 
Navegación con teclado y foco visible

Todos los controles son elementos nativos (<button>, <a>, <input>, <textarea>, <label>).

El foco es visible por defecto y se refuerza con utilidades de Tailwind (focus:ring-2, etc.) en botones de formulario.

Código relevante:

components/AuthorForm.tsx (inputs/botón con estilos de foco)

components/AuthorList.tsx (botones de acciones)


Atributos ARIA en acciones

Botón de favoritos usa aria-pressed="true|false" para anunciar el estado (toggle) y aria-label para describir la acción.

Botones Editar y Eliminar tienen aria-label con el nombre del autor.

Código: components/AuthorList.tsx.


Mensajes de error anunciados y asociación de campos

El formulario usa React Hook Form y expone errores con <p role="alert" id="error-…">.

Cada <input> indica aria-invalid y se asocia al mensaje vía aria-describedby.

Labels conectados con htmlFor/id.

Código: components/AuthorForm.tsx.


Estructura semántica

Encabezados (<h1>, <h2>) y listas (<ul>/<li>) en las páginas.

Errores generales del fetch se muestran con role="alert".

Código: app/authors/page.tsx, components/AuthorList.tsx.



Cómo correr:

Frontend: .env.local con NEXT_PUBLIC_API_BASE=http://127.0.0.1:8080, luego npm run dev 
