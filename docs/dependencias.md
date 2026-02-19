# Alternativas Arquitecturales

## Opción Elegida: PWA Offline-First (Recomendada para MVP)
- **Descripción**: Todo en cliente (IndexedDB), sincronización opcional con Supabase.
- **Pros**: Privacidad máxima, cero costes iniciales, rápido desarrollo.
- **Cons**: Sin multi-dispositivo nativo, sincronización manual.
- **Coste Estimado**: Bajo (solo hosting estático).

## Librerías de Componentes Recomendadas
Para acelerar desarrollo sin crear componentes desde cero:
- **Shadcn/ui**: Componentes headless con Tailwind; personalizables, accesibles. Instala con `npx shadcn-ui@latest init`.
- **Mantine**: Librería completa con hooks y temas; incluye formularios, tablas, modales. Fácil integración con Next.js.
- **Radix UI + Tailwind**: Primitivos headless (Radix) + estilos custom con Tailwind; máxima flexibilidad.
- **Ant Design**: Componentes ricos, pero más pesado; bueno si necesitas muchos widgets.

Recomendación: **Shadcn/ui** por simplicidad y alineación con Tailwind.</content>
<parameter name="filePath">d:\Desarrollo\tcdebt\docs\arquitecturas.md