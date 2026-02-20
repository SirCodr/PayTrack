# Especificaciones Completas del Proyecto TCDebt

## Resumen Ejecutivo
Aplicación web/PWA para seguimiento y planificación de deudas en tarjetas de crédito. MVP offline-first con Next.js + IndexedDB, soporte para 2 tarjetas, cálculos automáticos de amortización mensual sobre saldo decreciente.

## Contexto y Necesidad
Problema: Dificultad para prever impacto presupuestal de compras en cuotas múltiples. Solución: App que calcula y proyecta deudas por periodos, considerando fechas de corte/pago, intereses mensuales y pagos parciales/totales.

## Requisitos Funcionales (MVP)
- **Configuración de Tarjetas**: Nombre, fecha de corte (editable), fecha de pago (auto-calculada), límite.
- **Registro de Compras**: Importe, nº cuotas, tasa interés mensual, fecha compra → calcula primer cargo automáticamente.
- **Vista Calendario**: Deudas por mes/periodo (actual + 12 meses), agrupadas por tarjeta.
- **Pagos**: Totales o parciales (hasta cuota); no pagos por encima.
- **Devoluciones**: Aplicar reembolso, cancelar cuotas pendientes, reversar intereses futuros, mantener registro de intereses pagados.

## Requisitos No Funcionales
- **Privacidad**: Datos locales (IndexedDB); no envío sin consentimiento.
- **Performance**: Carga <3s, responsive mobile-first.
- **Accesibilidad**: WCAG 2.1 AA.
- **Escalabilidad**: Preparado para Supabase en v1.1.

## Modelo de Datos
- **Card**: id, name, cut_date, pay_date, limit.
- **Purchase**: id, card_id, amount, installments, interest_rate, purchase_date, first_charge_date.
- **Payment**: id, purchase_id, amount, date, type (full/partial).
- **Refund**: id, purchase_id, amount, date, applied_to.

## Lógica de Cálculos
- **Primer Cargo**: Si compra día D ≤ corte C → primer cargo en C+15 del mes actual; else C+15 del siguiente mes.
- **Amortización**: Por cuota: interés = saldo * tasa; principal = importe/nº_cuotas; saldo -= principal.
- **Intereses**: Mensuales sobre saldo decreciente; reversados en devoluciones totales.
- **Pagos**: Aplican a cuota actual; no exceden.

## Arquitectura Recomendada (MVP)
### Opción Elegida: PWA Offline-First
- **Descripción**: Todo en cliente (IndexedDB), sincronización opcional con Supabase.
- **Pros**: Privacidad máxima, cero costes iniciales, rápido desarrollo.
- **Cons**: Sin multi-dispositivo nativo, sincronización manual.
- **Coste Estimado**: Bajo (solo hosting estático).

## Librerías de Componentes
- **Chakra UI**: Elegida para componentes accesibles y ricos, integrada con Next.js.

## Estimación de Esfuerzo
- **MVP (v1.0)**: 40-60 horas (1-2 semanas).
- **v1.1 (Sincronización)**: 80-120 horas (4 semanas).
- **Testing/QA**: 20-30 horas.

## Tecnologías Candidatas
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Chakra UI.
- **Local DB**: IndexedDB via Dexie.
- **Cálculos**: Librería custom o finance.js.
- **Testing**: Jest + React Testing Library.
- **Deployment**: Vercel (gratuito).

## Riesgos y Mitigaciones
- **Cálculos Erróneos**: Validar con expertos; tests unitarios.
- **Reglas Bancarias**: Documentar asunciones; ajustes manuales.
- **Privacidad**: Offline-first; cifrado opcional.
- **Escalabilidad**: Monitorear uso; migrar a backend si crece.

## Alcance y Backlog (MVP)
### Historias de Usuario
1. Como usuario, configuro tarjeta con corte/pago.
2. Como usuario, registro compra con cálculos automáticos.
3. Como usuario, veo calendario de deudas.
4. Como usuario, registro pagos y veo impacto.
5. Como usuario, registro devoluciones y ajustes.

### Criterios de Aceptación
- Primer cargo calculado correctamente.
- Intereses sobre saldo decreciente.
- Pagos no exceden cuota.
- Devoluciones cancelan cuotas y reversan intereses.

## Roadmap
- **v1.0 (MVP)**: Config, registro, calendario, pagos, devoluciones.
- **v1.1**: Sincronización Supabase, auth, export CSV.
- **v1.2**: Integración bancaria, alertas, análisis.

## Métricas de Éxito
- Adopción: 50 usuarios en 1 mes.
- Precisión: 99% cálculos correctos.
- UX: Registro <2 min.
- Performance: Carga <3s.
- Retención: 70% semanal.

## Decisiones de Diseño
- Offline-first para privacidad.
- Intereses mensuales sobre saldo.
- UI con Chakra UI, mobile-first.
- Auth opcional en MVP.

## Plan de Testing
- Unit: Cálculos, validaciones.
- Integration: Flujos completos (Cypress).
- Manual: Casos edge (devoluciones parciales).

## Deployment
- Hosting: Vercel.
- DB: IndexedDB local; Supabase para prod.
- CI/CD: GitHub Actions.

## Consideraciones Legales
- Disclaimer: Herramienta de planificación, no asesoría.
- Privacidad: Datos locales; GDPR compliance si escala.
- Propiedad: Open-source MIT.

## FAQ
- **¿Es seguro?** Sí, local; no envía datos.
- **¿Múltiples monedas?** No en MVP; una unidad.
- **¿Cómo intereses?** Mensuales sobre saldo decreciente.
- **¿Importar datos?** Manual por ahora.

## Glosario
- **Corte**: Día cierre ciclo facturación.
- **Pago**: Día límite pago extracto.
- **Cuota**: Pago mensual fijo diferido.
- **Interés**: Cargo sobre saldo pendiente.
- **Amortización**: Reducción deuda con pagos.

## Contacto
- Email: soporte@tcdebt.com
- GitHub: https://github.com/user/tcdebt
- Discord: #tcdebt-support

## Changelog
- [1.0.0] - 2026-02-19: MVP inicial.

## Contributing
1. Fork repo.
2. Crea branch feature.
3. Tests.
4. PR detallado.

## License
MIT License - ver texto completo.

## TODO
- [x] Recolectar requerimientos
- [x] Preguntas & Clarificaciones
- [x] Análisis de viabilidad
- [x] Alternativas arquitectura
- [x] Definir alcance/backlog
- [x] Plan versiones/roadmap
- [x] Documentación proyecto
- [x] Preparación para codificar

## Proyecto Completo
Visión: App web/PWA para tracking deudas TC. Stack: Next.js + Chakra UI + Supabase. MVP offline-first.

## Primeros Pasos para Codificar
1. `npm install`
2. Config Supabase (opcional).
3. `npm run dev`
4. Componentes base: CardForm, PurchaseForm, CalendarView.
5. Cálculos en utils/finance.ts

## Módulos Funcionales (Features)
Estos son los "negocios" de la app — funcionalidades visibles al usuario.

- **Módulo de Tarjetas (Cards Module)**:
  - **Responsabilidades**: CRUD de tarjetas (crear, editar, listar). Configurar fecha de corte/pago, límite.
  - **Componentes**: CardForm, CardList, CardDetail.
  - **Hooks**: useCards (para estado y operaciones).
  - **Por qué**: Core del setup; afecta cálculos de compras.

- **Módulo de Compras (Purchases Module)**:
  - **Responsabilidades**: Registrar compras, calcular primer cargo y amortización. Mostrar detalles de cuotas.
  - **Componentes**: PurchaseForm, PurchaseDetail, AmortizationTable.
  - **Hooks**: usePurchases, useAmortization.
  - **Por qué**: Lógica financiera clave; integra con cálculos.

- **Módulo de Pagos (Payments Module)**:
  - **Responsabilidades**: Registrar pagos totales/parciales, ajustar saldos e intereses.
  - **Componentes**: PaymentForm, PaymentHistory.
  - **Hooks**: usePayments.
  - **Por qué**: Actualiza estado de deudas; valida reglas (no exceder cuota).

- **Módulo de Calendario (Calendar Module)**:
  - **Responsabilidades**: Vista timeline de deudas por mes/tarjeta (actual + 12 meses).
  - **Componentes**: CalendarView, DebtTimeline.
  - **Hooks**: useCalendarData.
  - **Por qué**: Dashboard principal; agrupa datos de compras/pagos.

- **Módulo de Devoluciones (Refunds Module)**:
  - **Responsabilidades**: Registrar reembolsos, cancelar cuotas, reversar intereses.
  - **Componentes**: RefundForm, RefundHistory.
  - **Hooks**: useRefunds.
  - **Por qué**: Maneja excepciones; ajusta cálculos automáticamente.

## Módulos Técnicos (Infra)
Estos soportan los funcionales — no visibles al usuario.

- **Módulo de Storage (Storage Module)**:
  - **Responsabilidades**: Persistencia offline con IndexedDB (via Dexie). CRUD genérico para entidades.
  - **Archivos**: db.ts (config Dexie), storageUtils.ts.
  - **Por qué**: Offline-first; reemplazable por Supabase en v1.1.

- **Módulo de Utils (Utils Module)**:
  - **Responsabilidades**: Helpers financieros (cálculos de amortización, fechas), validaciones, formatters.
  - **Archivos**: finance.ts, dateUtils.ts, validations.ts.
  - **Por qué**: Reutilizable; centraliza lógica compleja.

- **Módulo de UI/Core (UI Module)**:
  - **Responsabilidades**: Componentes base (layouts, providers Chakra), temas, estilos globales.
  - **Componentes**: Layout, ThemeProvider, LoadingSpinner.
  - **Por qué**: Consistencia visual; integra Chakra UI.

- **Módulo de Estado (State Module)**:
  - **Responsabilidades**: Gestión global (Context o Zustand para user prefs, notificaciones).
  - **Hooks**: useAppState.
  - **Por qué**: Para estado cross-módulos (ej. tema dark mode).

- **Módulo de API (API Module)** (Futuro):
  - **Responsabilidades**: Integración con Supabase (auth, sync).
  - **Archivos**: supabaseClient.ts, apiCalls.ts.
  - **Por qué**: Preparado para backend; opcional en MVP.

## Estructura de Carpetas Propuesta
```
src/  # O app/ si usas App Router puro
├── app/  # Next.js pages/layouts
│   ├── layout.tsx  # ChakraProvider aquí
│   ├── page.tsx  # Home/Dashboard
│   └── dashboard/  # Rutas por módulo
├── components/  # UI compartidos
│   ├── ui/  # Base Chakra (Button, etc.)
│   └── shared/  # Layout, Modals
├── features/  # Módulos funcionales
│   ├── cards/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── purchases/
│   ├── payments/
│   ├── calendar/
│   └── refunds/
├── lib/  # Módulos técnicos
│   ├── storage/
│   ├── utils/
│   ├── ui/
│   └── state/
├── types/  # Interfaces TS (Card, Purchase, etc.)
├── styles/  # globals.css, theme overrides
└── tests/  # Unit/integration por módulo
```

## Páginas/Routes (Modelos Funcionales)
Páginas principales en Next.js App Router.

- **Home/Dashboard (`app/page.tsx`)**: Overview con calendario y accesos rápidos.
- **Tarjetas (`app/cards/page.tsx`)**: CRUD tarjetas; sub-ruta `[id]` para editar.
- **Compras (`app/purchases/page.tsx`)**: Registro y lista; sub-ruta `[id]` para amortización.
- **Pagos (`app/payments/page.tsx`)**: Historial y registro de pagos.
- **Devoluciones (`app/refunds/page.tsx`)**: Gestión de reembolsos.

Navegación via Header/Navbar en layout.