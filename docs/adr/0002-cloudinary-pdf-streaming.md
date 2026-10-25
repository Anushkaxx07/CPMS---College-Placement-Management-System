# ADR 0002: Memory-Buffered Streaming to Cloudinary

## Context
Resumes are uploaded as PDF documents. Storing them directly on the server file system causes storage limits to be hit on cloud hosting dynos.

## Decision
Pipe `multer.memoryStorage()` uploads directly into Cloudinary's secure upload stream, saving only the Cloudinary CDN URL and asset metadata in MongoDB.

## Trade-offs
- Pros: Completely eliminates server disk bloat and file loss during redeployments.
- Cons: Dependent on external CDN network availability.