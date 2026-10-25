# Database Design & Indexing Strategy

## Schema Overview: Polymorphic Single-Collection Pattern
We adopted a unified `User` model housing role-specific subdocuments (`studentProfile`, `tpoProfile`, `managementProfile`).

## Indexing Strategy

### 1. Automated Shortlisting Compound Index
- **Index**: `{ role: 1, "studentProfile.department": 1, "studentProfile.year": 1, "studentProfile.liveKT": 1, "studentProfile.isApproved": 1 }`
- **Purpose**: Eliminates full collection scans when TPOs run eligibility filtering based on branch, graduation year, and live backlogs (KTs).

### 2. Fast Job Application Verification Index
- **Index**: `{ _id: 1, "studentProfile.appliedJobs.jobId": 1 }`
- **Purpose**: Instantly validates whether a student has already applied to a drive before appending to the `appliedJobs` array.
