# High-Level System Architecture (HLD)

## Overview
The College Placement Management System (CPMS) decouples user interaction, business logic, asynchronous file handling, and persistence into distinct tiers.

```mermaid
flowchart TD
    subgraph Clients["Presentation Layer"]
        S["Student Portal (React.js)"]
        T["TPO Dashboard (React.js)"]
        A["Admin Console (React.js)"]
    end

    subgraph Gateway["API & Security Layer"]
        Proxy["Express.js Server / Routing"]
        AuthMiddleware["Stateless JWT & RBAC Guard"]
        UploadMiddleware["Multer Stream Buffer"]
    end

    subgraph CoreBackend["Application Logic Tier"]
        AuthService["Auth Service (bcrypt + JWT)"]
        JobService["Drive & Posting Engine"]
        ShortlistEngine["Candidate Shortlisting Engine (CGPA / Branch / Backlogs)"]
        AppTracker["Applicant State Machine (Applied -> Shortlisted -> Interview -> Placed)"]
    end

    subgraph DataStorage["Data & Storage Tier"]
        MongoDB[("MongoDB Atlas (Users, Drives, Applications)")]
        Cloudinary["Cloudinary CDN (Encrypted PDF Resumes)"]
    end

    Clients -->|REST / HTTPS| Proxy
    Proxy --> AuthMiddleware
    AuthMiddleware --> AuthService
    AuthMiddleware --> JobService
    AuthMiddleware --> ShortlistEngine
    AuthMiddleware --> AppTracker

    JobService --> MongoDB
    ShortlistEngine --> MongoDB
    AppTracker --> MongoDB

    Clients -->|Resume Upload| UploadMiddleware
    UploadMiddleware --> Cloudinary
    Cloudinary -.->|Secure URL & Metadata| MongoDB
```

## Architectural Layers
1. Presentation Layer: React Single Page Application (SPA) with role-guarded routes.
2. Security & Middleware: Stateless JWT verification and 3-tier Role-Based Access Control (Student, TPO, Admin).
3. Application Tier: Node.js & Express REST services handling placement business rules.
4. Persistence Tier: MongoDB Atlas with compound indexes for fast query execution and unique constraints.
5. Asset Storage: Cloudinary CDN for offloading PDF storage and delivery.