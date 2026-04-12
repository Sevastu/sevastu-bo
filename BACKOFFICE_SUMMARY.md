# Sevastu Back Office: System Design Document

## 1. Overview
The Sevastu Back Office is the central administrative web portal designed to give operators, moderators, and support staff a holistic view and control over the platform's daily operations. Built with Next.js, it translates the backend orchestration into actionable UI interfaces.

## 2. Current Implementation (Already Built)
- ✅ **Modular Alignment**: Refactored to seamlessly digest the unified user and modular hierarchy of the backend.
- ✅ **Service Management System**: 3-tier hierarchical catalog (Category → Service → Sub-Service) creation and administration.
- ✅ **Worker Moderation**: Review queue and approval workflows executing verification (`KYC`) state transitions.
- ✅ **Job Management Dashboard**: Deep integration providing visual job tracking, live status timelines, and manual assignment overrides.
- ✅ **Analytics Dashboard**: Real-time telemetry surveying active statuses, aggregated throughputs, and overarching completion rates.
- 🚧 **Access Control UI**: Hardened access routes protecting admin features.

## 3. System Architecture
- **Framework**: Next.js
- **UI System**: Tailwind CSS with custom built high-fidelity modular components.
- **Integration**: Specialized internal Axios clients adapting backend REST standard.
- **Modules**: auth, user, worker, customer, kyc, service, job, matching, admin, analytics, chat, notification, payment

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
- **Custom UI Library**: Implemented robust primitive components escaping environmental compilation errors of third-party libraries.
- **Deep Filter Queries**: Performant local-state management allowing operators to execute multi-dimensional matrix queries on massive datatables.

## 10. Roadmap / Pending Work
- 🚧 **Dispute Management Panel**: Interface for the upcoming payment module.
- 🟡 **Live Support Integration**: Operator intervention endpoints.
- 🟡 **Advanced Role Control**: Limit capabilities within the Back Office between Staff vs Executive operators.
