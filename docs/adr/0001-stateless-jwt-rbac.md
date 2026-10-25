# ADR 0001: 3-Tier Stateless RBAC via JWT

## Context
The system manages three roles (`Student`, `TPO`, `Admin`). We needed a secure and low-latency mechanism to guard endpoints.

## Decision
We implemented stateless JSON Web Tokens (JWT) containing signed role claims (`role: 'TPO'`), decoded in Express middleware.

## Trade-offs
- Pros: Zero database lookups on every incoming API request; horizontal scaling without shared session stores.
- Cons: Cannot immediately revoke a token before expiry. Mitigated with short token lifespans (15 mins) and refresh tokens.