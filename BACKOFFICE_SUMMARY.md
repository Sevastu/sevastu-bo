# Sevastu Back Office: System Design Document

## 1. Overview
The Sevastu Back Office is the central administrative web portal designed to give operators, moderators, and support staff a holistic view and control over the platform's daily operations. Built with Next.js, it translates the backend orchestration into actionable UI interfaces.

## 1.1 Core Functionalities
The Sevastu Back Office serves several primary business functions:
1. **Worker Moderation & KYC Verification**: The central hub for reviewing worker identities, examining uploaded documents (Aadhaar, PAN, Experience Certificates), and deciding whether to approve, reject, or block workers. This ensures trust and safety on the platform.
2. **Service & Catalog Management**: Allows administrators to define and organize the services offered to customers. This involves managing the three-tier hierarchy (Category → Service → Sub-Service) and pricing structures.
3. **Job Monitoring & Oversight**: Provides real-time visibility into active and historical service requests. Admins can track job statuses, step in to override assignments, and ensure smooth operations.
4. **Analytics & Platform Health**: Aggregates data on platform activity, worker performance, earnings, and completion metrics, enabling data-driven decisions.
5. **Financial & Dispute Resolution (Planned)**: Monitoring global payouts, computing worker commissions, and providing a console for resolving customer/worker disputes.

## 2. Current Implementation (Already Built)
- ✅ **Modular alignment**: Next.js App Router structure aligned with backend domains (workers, jobs, services, auth, customers, leads, etc.).
- ✅ **Service management**: Three-tier catalog (**Category → Service → Sub-Service**) with enhanced CRUD-style admin pages including:
  - **Modern Catalog Tree**: Interactive tree view with expand/collapse functionality, drag-and-drop reordering, and visual hierarchy indicators.
  - **Marketplace Management Drawer**: Detailed management panel for catalog items with pricing, visibility controls, and image uploads.
  - **Catalog Dashboard Cards**: Real-time statistics showing total categories, services, and sub-services.
  - **Reorder Functionality**: API-backed drag-and-drop reordering for categories, services, and sub-services.
- ✅ **Worker Verification & Moderation (Detailed)**:
  - **Comprehensive Filtering**: Workers can be filtered by Search (Name, Email, ID) and `WorkerProfileStatus` (e.g., Under Review, Verified, KYC Pending, Rejected).
  - **Multi-Document Review Modal**: Dedicated `DocumentPreviewModal` supporting the preview and download of multiple KYC documents: **Aadhaar Front, Aadhaar Back, PAN Card, and Experience Certificate**.
  - **Actionable Workflows**: Staff can **Approve**, **Reject** (with mandatory reasoning), and **Block** workers. Actions map to `approveWorker` and `rejectWorker` API endpoints updating both worker and KYC status.
  - **Secure Document Handling**: Document images are accessed securely using **signed private URLs** (`GET /upload/private-url`), reducing exposure of sensitive objects compared to long-lived links.
- ✅ **Worker Profiles (Detailed Drawer)**: The `WorkerDetailsDrawer` provides an in-depth view of a worker's profile, including stats (Total Jobs, Total Earnings based on base price), Expertise & Skills, Professional Summary, and explicit status of uploaded verification documents.
- ✅ **Job management dashboard**: Enhanced job listing with:
  - **Advanced Filtering**: Search by ID/Service, status filtering, date range selection, and reset capabilities.
  - **Job Details Sheet**: Comprehensive job view with detailed information, status management, and admin override capabilities.
  - **Status Visualization**: Color-coded status badges (Open, Assigned, In Progress, Completed, Cancelled) with consistent styling.
- ✅ **Customer Management**: Full customer administration suite including:
  - **Customer Analytics Dashboard**: Real-time metrics for active customers, retention rate, average lifetime value, and total customer count.
  - **Advanced Filtering**: Search by name/email, status filtering (Active/Inactive), and date range selection.
  - **Customer Profile Drawer**: Detailed customer information view with contact details, location data, and activity history.
  - **Status Management**: Toggle customer status between active and inactive with immediate UI updates.
- ✅ **Leads Management**: Lead tracking system with:
  - **Lead Status Tracking**: Toggle between "new" and "contacted" states with visual indicators.
  - **Search and Pagination**: Efficient lead discovery with server-side pagination.
  - **Quick Status Updates**: One-click status changes directly from the data table.
- ✅ **Worker Performance Leaderboard**: Performance analytics page featuring:
  - **Ranking System**: Visual ranking with gold/silver/bronze indicators for top performers.
  - **Performance Metrics**: Total jobs assigned, completion rates, success rate visualization, and revenue tracking.
  - **Admin-Only Access**: Role-based access control with appropriate error messaging for unauthorized users.
  - **Export Capabilities**: Export functionality for performance reports.
- ✅ **Analytics Dashboard**: Comprehensive analytics suite with:
  - **KPI Cards**: Total Revenue, Active Users, Total Jobs, and Average Job Value with trend indicators.
  - **Interactive Charts**: Line charts for revenue trends, pie charts for service distribution, and bar charts for worker performance.
  - **Time Range Selection**: Flexible time filtering (7 days, 30 days, 90 days, 1 year).
  - **Additional Metrics**: Customer acquisition data, job success rates, and revenue by region with visual progress indicators.
- ✅ **Enhanced Dashboard**: Improved main dashboard featuring:
  - **Marketplace Overview**: Real-time stats for total jobs, active jobs, completed jobs, and revenue.
  - **Jobs Over Time Chart**: Visual representation of job trends and patterns.
  - **System Health Monitoring**: Real-time system status and health indicators.
  - **Recent Activity Feed**: Live updates on recent job assignments and platform activities.
- ✅ **Settings Management**: Comprehensive settings interface with:
  - **Appearance Settings**: Theme selection (light/dark/system), accent color customization, font size adjustment, and sidebar toggle.
  - **Notification Settings**: Email notifications, push notifications, job updates, worker updates, and system alerts configuration.
  - **Security Settings**: Two-factor authentication, session timeout, password expiry, and login alerts management.
- ✅ **API client**: `NEXT_PUBLIC_API_URL` (no trailing slash) and optional **`NEXT_PUBLIC_API_TIMEOUT_MS`** for slow cold starts; Axios-based `apiClient` with auth token handling and comprehensive error management.
- ✅ **Modern UI Components**: Enhanced component library with:
  - **KPICard**: Reusable key performance indicator cards with trend visualization.
  - **DataTable**: Advanced data table with pagination, sorting, and custom cell rendering.
  - **Chart Components**: Custom chart components (SimpleLineChart, SimplePieChart, SimpleBarChart, JobsChart) for data visualization.
  - **Status Badges**: Consistent status indicators across the application.
  - **Drawer/Sheet Components**: Slide-out panels for detailed views and forms.
- ✅ **Access Control UI**: Role-based access control with admin vs staff capability differentiation and route guards.

## 3. System Architecture
- **Framework**: Next.js 16.2.1 (App Router) with React 19.2.4
- **UI Framework**: Tailwind CSS v4, shadcn/ui components, Lucide React icons
- **Component Architecture**: Highly responsive shared components including:
  - **Data Tables**: Advanced DataTable with pagination, sorting, filtering, and custom cell rendering
  - **Drawer/Sheet Components**: Slide-out panels for detailed views and forms (WorkerDetailsDrawer, CustomerProfileDrawer, MarketplaceManagementDrawer)
  - **Status Badges**: Consistent status indicators (VerificationStatusBadge, StatusBadge) across the application
  - **KPI Cards**: Reusable key performance indicator cards with trend visualization
  - **Chart Components**: Custom visualization components (SimpleLineChart, SimplePieChart, SimpleBarChart, JobsChart)
- **State Management**: React hooks (useState, useEffect, useCallback, useMemo) for local state management
- **Backend integration**: REST via typed `features/*` helpers and `lib/apiClient`; mirrors Nest **admin** and **worker** read models where exposed.
- **API Client**: Axios-based client with auth token handling, configurable timeout, and comprehensive error management
- **Related backend concepts (not all surfaced in UI yet)**: `verificationAudits` (immutable admin decisions), **`workerOcr`** / **`ocrStatus`** (async Aadhaar OCR—derived fields only on server); backoffice can be extended to show **name match** and **last-four** hints without ever displaying full ID numbers or raw OCR.

## 4. End-to-End Flow
**User Journey:**

**Customer**:
- Login → Select Service → Create Job → Job Assigned → Chat/Call → Job Completed → Payment

**Worker**:
- Login → Get Jobs → Accept Job → Communicate → Complete Job → Earn

**Admin**:
- Manage Services → Monitor Jobs → Override Assignment → Verify Workers (via Document Review Panel) → Analytics

## 5. Communication System (Chat + Call + Video) [Planned]
- 🟡 **Conversation Mechanism**: View/Moderate strictly job-based threads.
- 🟡 **Chat**: Message history audits.
- 🟡 **Audio Call**: Call log monitoring.
- 🟡 **Video Call**: QA and compliance logs structure.

**Rules**:
- Enabled only after a job is assigned.
- Integrated with LiveKit (planned).
- Includes notification triggers for abuse or compliance issues.

## 6. Notification System [Planned]
**Events**:
- 🟡 Job created
- 🟡 Job accepted
- 🟡 Job started
- 🟡 Job completed
- 🟡 Incoming call

**Channels**:
- 🟡 Web portal toast notifications and centralized alerts box.

## 7. Payment & Payout System [Planned]
**Customer**:
- 🟡 Pay after job completion (MVP - dispute controls).

**Worker**:
- 🟡 Earnings per job.
- 🟡 Commission deduction calculation.
- 🟡 Payout cycle coordination monitoring.

**Admin**:
- 🟡 Monitor global payouts and handle disputes/settlements.

## 8. Future Enhancements
- 🟡 Complete visual heat maps based on active customer requests to predict geographic demands.
- 🟡 Add macro-admin capabilities managing push notification broadcasts to specific sub-sectors.
- 🟡 Automated payout verifications.

## 9. Technical Strengths
- **Operational safety on ID review**: Time-bounded signed URLs reduce exposure of private ID objects compared to long-lived direct links. Multi-document handling ensures comprehensive vetting.
- **Composable admin UI**: Reusable table, card (`WorkerVerificationCard`), and drawer/sheet patterns for scalable review workflows. Clean separation of concerns between API features (`features/workers/api.ts`, `features/customers/api.ts`, etc.) and UI components.
- **Configurable API base**: Environment-driven API origin and timeout suit local dev, tunnels, and production hosts. Graceful error handling and fallback UI states (e.g., failed document loads, loading spinners).
- **Modern component architecture**: shadcn/ui integration provides consistent, accessible components with built-in styling and theming support. Custom chart components enable rich data visualization without external dependencies.
- **Enhanced data management**: Advanced DataTable component with server-side pagination, sorting, filtering, and custom cell rendering provides consistent data presentation across all admin interfaces.
- **Role-based access control**: Admin-only features (Worker Performance Leaderboard) with appropriate error messaging and UI feedback for unauthorized access attempts.
- **Responsive design patterns**: Mobile-first approach with Tailwind CSS v4 ensures consistent experience across devices, with adaptive layouts for complex data tables and forms.
- **Real-time analytics integration**: Comprehensive dashboard with live KPI updates, interactive charts, and system health monitoring provides operators with immediate visibility into platform performance.

## 10. Roadmap / Pending Work
- 🟡 **OCR assist panel**: Display `workerOcr` summary (`nameMatch`, `aadhaarLast4`, `confidence`, `ocrStatus`) beside manual review—**no full OCR text** or full UID.
- 🟡 **Verification audit viewer**: Read-only list from `verificationAudits` for compliance exports.
- 🚧 **Dispute management**: UI for the future payment and refunds module.
- 🟡 **Live support**: Operator tooling hooks when backend endpoints exist.
- 🟡 **Advanced role control**: Finer Staff vs Admin feature flags in the UI layer.
