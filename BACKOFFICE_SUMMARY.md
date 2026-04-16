# Sevastu Back Office: System Design Document

## 1. Overview
The Sevastu Back Office is the central administrative web portal designed to give operators, moderators, and support staff a holistic view and control over the platform's daily operations. Built with Next.js, it translates the backend orchestration into actionable UI interfaces.

## 2. Current Implementation (Already Built)
- ✅ **Modular alignment**: Next.js App Router structure aligned with backend domains (workers, jobs, services, auth, etc.).
- ✅ **Service management**: Three-tier catalog (**Category → Service → Sub-Service**) with CRUD-style admin pages.
- ✅ **Worker moderation**: Workers list and **review sheet** for profiles awaiting verification; **approve / reject** drives backend worker + KYC status; **signed private URLs** for ID images via `GET /upload/private-url` (handles `expiresAt` / expiry UX).
- ✅ **Job management dashboard**: Job listing, status visibility, and admin actions where implemented.
- ✅ **Analytics dashboard**: Aggregated views of activity and completion-oriented metrics (as wired to current APIs).
- ✅ **API client**: `NEXT_PUBLIC_API_URL` (no trailing slash) and optional **`NEXT_PUBLIC_API_TIMEOUT_MS`** for slow cold starts; Axios-based `apiClient` with auth token handling.
- 🚧 **Access control UI**: Continued hardening for staff vs admin capabilities and route guards.

## 3. System Architecture
- **Framework**: Next.js (App Router)
- **UI**: Tailwind CSS and shared components (e.g. data tables, layout primitives)
- **Backend integration**: REST via typed `features/*` helpers and `lib/apiClient`; mirrors Nest **admin** and **worker** read models where exposed
- **Related backend concepts (not all surfaced in UI yet)**: `verificationAudits` (immutable admin decisions), **`workerOcr`** / **`ocrStatus`** (async Aadhaar OCR—derived fields only on server); backoffice can be extended to show **name match** and **last-four** hints without ever displaying full ID numbers or raw OCR

## 4. End-to-End Flow
**User Journey:**

**Customer**:
- Login → Select Service → Create Job → Job Assigned → Chat/Call → Job Completed → Payment

**Worker**:
- Login → Get Jobs → Accept Job → Communicate → Complete Job → Earn

**Admin**:
- Manage Services → Monitor Jobs → Override Assignment → Verify Workers → Analytics

## 5. Communication System (Chat + Call + Video) [Planned]
- 🟡 **Conversation Mechanism**: View/Moderate strictly job-आधारित (job-based) threads.
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
- **Operational safety on ID review**: Time-bounded signed URLs reduce exposure of private ID objects compared to long-lived direct links.
- **Composable admin UI**: Reusable table and sheet patterns for review workflows.
- **Configurable API base**: Environment-driven API origin and timeout suit local dev, tunnels, and production hosts.

## 10. Roadmap / Pending Work
- 🟡 **OCR assist panel**: Display `workerOcr` summary (`nameMatch`, `aadhaarLast4`, `confidence`, `ocrStatus`) beside manual review—**no full OCR text** or full UID.
- 🟡 **Verification audit viewer**: Read-only list from `verificationAudits` for compliance exports.
- 🚧 **Dispute management**: UI for the future payment and refunds module.
- 🟡 **Live support**: Operator tooling hooks when backend endpoints exist.
- 🟡 **Advanced role control**: Finer Staff vs Admin feature flags in the UI layer.
