import { useEffect, useRef, useState } from "react";

/*
 * Harshit's portfolio — intentionally kept in one component.
 * Edit the data objects below to update content. The visual styles live at
 * the bottom of this file, so the whole site remains easy to customize.
 */

const experience = [
  {
    period: "Sep 2025 — Present",
    role: "Advanced Application Engineering Senior Analyst",
    company: "Accenture · Client: Intuit",
    location: "Bengaluru, Karnataka, India",
    summary:
      "Leading full-stack delivery for Intuit’s enterprise content ecosystem—building high-scale discovery, preview, and platform services used across the organization.",
    wins: [
      "Built cross-catalog Elasticsearch search across 60+ catalogs with advanced filtering and access control, monitored through a 40+ panel Splunk dashboard for 10+ teams.",
      "Owned the User Preview Tool end to end using React, Spring Boot, and AWS, enabling real-time CMS previews for 1,000+ users across 20+ teams.",
      "Reduced HTTP 500 errors by 60% and production alerts by 70% with Resilience4j circuit breakers.",
      "Designed a URL shortener handling 10K+ monthly requests at ~50ms latency.",
      "Led a PHP 8.4 runtime upgrade across three environments with zero feature regressions.",
    ],
    tools: ["React", "Spring Boot", "AWS", "Elasticsearch", "Redis", "Splunk"],
    color: "blue",
  },
  {
    period: "Sep 2023 — Sep 2025",
    role: "Advanced Application Engineering Analyst",
    company: "Accenture · Client: Intuit",
    location: "Bengaluru, Karnataka, India · On-site",
    summary:
      "Delivered product features, quality automation, and platform modernization across Intuit content and QuickBooks engineering teams.",
    wins: [
      "Delivered 100+ React and Redux features for Intuit’s Content Management team.",
      "Resolved 30+ AWS security findings and 20+ client-facing bugs, improving platform reliability.",
      "Built a React and Redux Month-End Closure Dashboard and integrated 10+ REST APIs, replacing manual Excel tracking.",
      "Created Cypress and Jest automation that reduced manual testing by 40%; increased QuickBooks JUnit coverage by 25% and reduced bugs by 30%.",
    ],
    tools: ["React", "Redux", "Java", "REST APIs", "Cypress", "Jest", "JUnit"],
    color: "green",
  },
];

const projects = [
  {
    id: "01",
    title: "Global Search",
    eyebrow: "INTUIT · ENTERPRISE SEARCH",
    description:
      "A cross-catalog discovery platform built for Intuit teams, combining Elasticsearch with advanced filtering, catalog scoping, and access control.",
    outcomes: [
      "Unified content discovery across 60+ independently managed catalogs.",
      "Enforced catalog-level access while supporting filters and scoped search.",
      "Surfaced adoption and search-quality KPIs through a 40+ panel Splunk dashboard.",
    ],
    tools: ["React", "Spring Boot", "Elasticsearch", "AWS"],
    color: "blue",
  },
  {
    id: "02",
    title: "Web Chat",
    eyebrow: "SOCIAL · FRONTEND",
    description:
      "A responsive social interface focused on clear profiles, status sharing, notifications, and an accessible dark experience.",
    outcomes: [
      "Supports profiles, status sharing, and notification-led interactions.",
      "Uses reusable interface components to keep features consistent.",
      "Adapts navigation and content for desktop and mobile layouts.",
    ],
    tools: ["HTML", "CSS", "JavaScript"],
    color: "green",
    link: "https://github.com/Harshit0820/Web-Chat",
  },
  {
    id: "03",
    title: "Car Review",
    eyebrow: "DESKTOP · FULL STACK",
    description:
      "A desktop product for managing vehicle specifications, user authentication, and structured car reviews with persistent storage.",
    outcomes: [
      "Connects an interactive JavaFX interface to persistent MySQL storage.",
      "Supports authenticated access and structured vehicle review workflows.",
      "Implements create, read, update, and delete operations across the application.",
    ],
    tools: ["Java", "JavaFX", "MySQL", "CSS"],
    color: "yellow",
    link: "https://github.com/Harshit0820/Car-Review-JavaFX",
  },
];

const skillGroups = [
  {
    title: "Frontend",
    note: "Interfaces that feel fast and stay maintainable.",
    skills: ["React", "JavaScript", "TypeScript", "Redux", "HTML / CSS", "Material UI"],
    icons: ["react", "javascript", "typescript", "redux"],
    color: "blue",
  },
  {
    title: "Backend",
    note: "APIs and services designed for real traffic.",
    skills: ["Java", "Spring Boot", "Microservices", "Multithreading", "Node.js", "Python", "REST APIs", "GraphQL", "API Management"],
    icons: ["java", "spring", "nodejs", "python"],
    color: "red",
  },
  {
    title: "Data & messaging",
    note: "Reliable storage, search, and async systems.",
    skills: ["MySQL", "PostgreSQL", "Redis", "Elasticsearch", "Kafka", "Amazon DynamoDB", "Amazon RDS", "Amazon SQS"],
    icons: ["mysql", "postgresql", "redis", "elasticsearch"],
    color: "yellow",
  },
  {
    title: "Cloud & delivery",
    note: "From a clean commit to healthy production.",
    skills: ["AWS", "Amazon EC2", "AWS Lambda", "Amazon S3", "CloudWatch", "Docker", "Kubernetes", "CI / CD", "GitHub", "Cloud Security", "Infrastructure Automation"],
    icons: ["amazonwebservices", "docker", "kubernetes", "github"],
    color: "green",
  },
  {
    title: "Engineering Foundations",
    note: "Fundamentals for efficient code, sound design, and reliable systems.",
    skills: ["OOP", "Data Structures", "Algorithms", "Design Concepts", "Design Patterns", "Operating Systems", "DBMS", "Computer Networks"],
    icons: ["leetcode", "cplusplus", "linux", "postgresql"],
    color: "blue",
  },
];

const songs = [
  { title: "Blinding Lights", artist: "The Weeknd", query: "The Weeknd Blinding Lights", duration: 200000 },
  { title: "Instant Crush", artist: "Daft Punk", query: "Daft Punk Instant Crush", duration: 337000 },
  { title: "Lose Yourself", artist: "Eminem", query: "Eminem Lose Yourself", duration: 326000 },
  { title: "Passionfruit", artist: "Drake", query: "Drake Passionfruit", duration: 299000 },
  { title: "Money Trees", artist: "Kendrick Lamar", query: "Kendrick Lamar Money Trees", duration: 386000 },
];

const learningTopicLibrary = [
  {
    category: "SYSTEM DESIGN",
    title: "Multi-region data consistency",
    summary: "Quorum reads and writes trade latency for consistency across regions, while asynchronous replication introduces lag that can expose stale data during regional failover. Conflict resolution via vector clocks or CRDTs must match product semantics, and explicit fencing is required before promoting a secondary region after partition recovery.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Backpressure and graceful degradation",
    summary: "Unbounded queues amplify latency until the entire stack collapses when downstream services saturate. Token-bucket rate limits, bounded thread pools, and priority-based load shedding preserve capacity for critical paths, while degraded modes disable nonessential features instead of returning errors to every caller.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Multi-tenant platform architecture",
    summary: "Shared infrastructure reduces cost but introduces noisy-neighbor risk when one tenant's traffic spikes consume CPU, memory, or I/O. Row-level security, tenant-scoped rate limits, and resource quotas enforce isolation, while schema-per-tenant versus shared-schema decisions affect migration complexity and query performance.",
  },
  {
    category: "BACKEND",
    title: "Transactional outbox and sagas",
    summary: "The transactional outbox pattern writes events in the same database transaction as domain state, then a relay publishes them asynchronously to avoid dual-write inconsistency. Sagas coordinate multi-service workflows with compensating transactions, requiring idempotent handlers and explicit timeout handling when a downstream step fails mid-orchestration.",
  },
  {
    category: "BACKEND",
    title: "Modern Java concurrency",
    summary: "Virtual threads map many lightweight tasks onto fewer platform threads, reducing blocking I/O overhead without callback complexity. Structured concurrency scopes child tasks to parent lifetimes, preventing thread leaks, while pinning issues arise when synchronized blocks or native code block the carrier thread.",
  },
  {
    category: "BACKEND",
    title: "Database performance engineering",
    summary: "EXPLAIN plans reveal sequential scans, missing indexes, and nested loop costs that dominate query latency under load. Connection pool sizing must balance thread count against database max_connections, and query-shape changes often outperform hardware upgrades for hot-path reads.",
  },
  {
    category: "FULL STACK",
    title: "End-to-end observability",
    summary: "OpenTelemetry trace context propagates across browser fetch calls, API gateways, and backend services via W3C traceparent headers. Span attributes link frontend interaction events to backend database queries, enabling root-cause analysis of slow user journeys without correlating logs manually across systems.",
  },
  {
    category: "FULL STACK",
    title: "Backend-for-frontend patterns",
    summary: "A BFF layer aggregates multiple backend calls into one response shaped for a specific client, reducing over-fetching and round trips. Authorization and caching policies live at the BFF boundary, but each client type needs its own BFF to avoid a generic API that serves no interface well.",
  },
  {
    category: "FULL STACK",
    title: "Identity across the stack",
    summary: "OAuth authorization code flow with PKCE secures browser-based token acquisition, while refresh token rotation limits exposure when tokens leak. Backend services validate JWT signatures and claims on every request, and fine-grained authorization must not rely solely on client-side role checks.",
  },
  {
    category: "FRONTEND",
    title: "Core Web Vitals and INP",
    summary: "Interaction to Next Paint measures input delay, processing time, and presentation delay for the slowest interaction in a page visit. Long tasks on the main thread block input handlers, and breaking work into smaller chunks with requestIdleCallback or scheduler.postTask improves responsiveness.",
  },
  {
    category: "FRONTEND",
    title: "Scalable state architecture",
    summary: "Server state managed by TanStack Query handles caching, refetching, and stale-while-revalidate semantics separately from ephemeral UI state in component hooks. URL state encodes shareable navigation context, and conflating these layers causes synchronization bugs when mutations invalidate cached server data.",
  },
  {
    category: "FRONTEND",
    title: "Accessible design systems",
    summary: "Design tokens define color contrast ratios, focus ring styles, and spacing scales that meet WCAG AA requirements by default. Components expose aria attributes and keyboard navigation patterns, and automated axe checks in CI catch regressions that manual review misses across product teams.",
  },
  {
    category: "DEVOPS",
    title: "Platform engineering golden paths",
    summary: "Creating self-service templates that standardize CI/CD, security, observability, and deployment so teams ship safely without repeated infrastructure work.",
  },
  {
    category: "DEVOPS",
    title: "GitOps and progressive delivery",
    summary: "Using declarative environments, automated reconciliation, canaries, feature flags, and fast rollback to reduce deployment risk at enterprise scale.",
  },
  {
    category: "DEVOPS",
    title: "Software supply-chain security",
    summary: "Applying signed artifacts, SBOMs, dependency policies, secret scanning, and least privilege to protect builds from source to production.",
  },
  {
    category: "AI ENGINEERING",
    title: "Reliable RAG evaluation",
    summary: "Measuring retrieval quality, groundedness, latency, and answer usefulness with repeatable datasets before an AI feature reaches enterprise users.",
  },
  {
    category: "AI ENGINEERING",
    title: "Safe agentic workflows",
    summary: "Designing tool permissions, context boundaries, human approvals, auditability, and recovery paths for agents acting on real business systems.",
  },
  {
    category: "AI ENGINEERING",
    title: "LLM observability and guardrails",
    summary: "Monitoring prompts, cost, quality, drift, PII exposure, and prompt-injection risk so production AI remains useful, secure, and explainable.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Consistent hashing and hot partitions",
    summary: "Hash rings with virtual nodes distribute keys evenly across shards, but skewed access patterns can still create hot partitions that bottleneck a single node. Monitoring per-partition throughput and using adaptive resharding or key salting prevents uneven load from degrading tail latency cluster-wide.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Event delivery guarantees",
    summary: "At-least-once delivery requires idempotent consumers and deduplication keys to avoid duplicate side effects, while effectively-once semantics combine transactional outbox with offset tracking. Poison messages need dead-letter queues with replay tooling, and strict ordering constraints limit parallelism within a partition.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Rate limiting and admission control",
    summary: "Token-bucket and sliding-window algorithms enforce per-tenant quotas at the gateway before requests reach overloaded services. Priority lanes reserve capacity for critical operations, but global limits must account for retry amplification when clients back off unevenly across endpoints.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Zero-downtime data migrations",
    summary: "Expand-contract migrations add nullable columns first, backfill asynchronously, then enforce constraints only after dual-write verification completes. Rollback plans require keeping the old schema readable until traffic fully shifts, and long-running backfills need throttling to avoid saturating replication lag.",
  },
  {
    category: "BACKEND",
    title: "Resilience patterns in practice",
    summary: "Circuit breakers halt calls to failing dependencies after a threshold, giving them time to recover while fallbacks serve degraded responses. Retries with exponential backoff and jitter prevent synchronized retry storms, but idempotency keys are mandatory when retries can duplicate side effects.",
  },
  {
    category: "BACKEND",
    title: "Safe API evolution",
    summary: "Additive changes like optional fields preserve backward compatibility, while breaking changes require versioned endpoints or consumer-driven contract tests in CI. Deprecation telemetry tracks remaining callers before removal, and sunset headers give dependent teams measurable migration deadlines.",
  },
  {
    category: "BACKEND",
    title: "JVM profiling and memory",
    summary: "Heap dumps and allocation profiling identify object retention paths causing GC pause spikes under production load. Thread dumps reveal deadlocks and blocked I/O, while GC log analysis distinguishes between throughput-oriented and low-latency collector tuning for containerized workloads.",
  },
  {
    category: "BACKEND",
    title: "Enterprise search architecture",
    summary: "Indexing pipelines transform source documents into analyzed tokens with field-specific boost weights and synonym expansion for relevance tuning. Access-aware filtering applies authorization at query time, and near-real-time indexing via CDC balances freshness against bulk reindex cost during schema changes.",
  },
  {
    category: "FULL STACK",
    title: "Feature flags and experimentation",
    summary: "Feature flags decouple deployment from release, allowing code to ship dark while targeting flags to specific user segments. Kill switches disable broken features instantly without redeployment, but flag proliferation requires cleanup policies and naming conventions to prevent stale toggles from accumulating.",
  },
  {
    category: "FULL STACK",
    title: "Resilient user journeys",
    summary: "Optimistic UI updates show immediate feedback while the server processes asynchronously, with rollback on failure and conflict resolution for concurrent edits. Partial failure states display which steps succeeded and which need retry, preventing users from assuming completion when only half the workflow finished.",
  },
  {
    category: "FULL STACK",
    title: "Schema-driven product development",
    summary: "OpenAPI specifications generate typed client SDKs and server stubs, keeping request and response shapes synchronized between frontend and backend teams. Contract tests in CI fail builds when either side drifts from the shared schema, and shared error models prevent inconsistent failure handling.",
  },
  {
    category: "FULL STACK",
    title: "Modular architecture boundaries",
    summary: "Clear module boundaries with enforced dependency rules prevent a monolith from becoming a distributed system prematurely through tangled imports. Extraction points identified by change frequency and team ownership guide when to split a module into an independent service with its own deployment lifecycle.",
  },
  {
    category: "FRONTEND",
    title: "React concurrency and streaming",
    summary: "useTransition marks state updates as non-urgent, keeping the UI responsive during expensive re-renders by interrupting low-priority work. Suspense boundaries paired with streaming SSR send HTML shell first and hydrate interactive islands progressively as data resolves.",
  },
  {
    category: "FRONTEND",
    title: "Browser rendering internals",
    summary: "The rendering pipeline runs style recalculation, layout, paint, and compositing sequentially, and forced synchronous layout from reading offsetHeight after a write triggers expensive reflows. CSS containment and will-change hints help the compositor skip unnecessary work for off-screen elements.",
  },
  {
    category: "FRONTEND",
    title: "Frontend security engineering",
    summary: "Content Security Policy headers restrict script sources and block inline eval, mitigating XSS even when user input reaches the DOM. HttpOnly and SameSite cookies prevent token theft via JavaScript and cross-site request forgery, and dependency audits catch known vulnerabilities in npm packages.",
  },
  {
    category: "FRONTEND",
    title: "Micro-frontend governance",
    summary: "Module federation shares dependencies at runtime but risks version conflicts when teams deploy independently with incompatible shared library versions. Runtime isolation via iframes or shadow DOM prevents CSS and global state collisions, but adds latency and complicates cross-micro-frontend communication.",
  },
  {
    category: "DEVOPS",
    title: "SLOs and error budgets",
    summary: "Turning reliability goals into measurable indicators and release decisions that balance feature velocity with the user impact of operational risk.",
  },
  {
    category: "DEVOPS",
    title: "Kubernetes capacity and autoscaling",
    summary: "Tuning requests, limits, horizontal and vertical scaling, disruption budgets, and scheduling to improve reliability without wasting cloud capacity.",
  },
  {
    category: "DEVOPS",
    title: "Cloud cost engineering",
    summary: "Connecting service ownership, utilization, storage lifecycle, network cost, and unit economics so teams optimize cloud spend without harming users.",
  },
  {
    category: "DEVOPS",
    title: "Disaster recovery and chaos testing",
    summary: "Validating backups, recovery objectives, dependency failures, regional failover, and operational runbooks before a real incident tests them.",
  },
  {
    category: "AI ENGINEERING",
    title: "Hybrid and vector retrieval",
    summary: "Combining keyword relevance, embeddings, metadata filters, reranking, and access control to retrieve useful enterprise knowledge safely.",
  },
  {
    category: "AI ENGINEERING",
    title: "Context engineering and MCP",
    summary: "Giving AI agents the right tools, instructions, memory, and scoped enterprise context while limiting permissions and irrelevant information.",
  },
  {
    category: "AI ENGINEERING",
    title: "Model routing and AI economics",
    summary: "Routing tasks across models by quality, latency, privacy, and cost while caching safely and measuring value per successful outcome.",
  },
  {
    category: "AI ENGINEERING",
    title: "Human-in-the-loop AI systems",
    summary: "Designing confidence thresholds, review queues, explanations, feedback capture, and escalation paths for high-impact automated decisions.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Consensus and leader election",
    summary: "Raft and Paxos require a quorum of nodes to commit log entries, preventing split-brain when the leader loses contact with followers. Election timeouts must exceed network jitter, and fencing tokens ensure stale leaders cannot overwrite state after partition recovery.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Distributed locks and leases",
    summary: "Redis-based locks without fencing tokens allow a paused process to release another holder's lock after GC stalls. Database advisory locks or etcd leases with heartbeat renewal provide safer coordination, but lease duration must exceed maximum expected pause time.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Change data capture pipelines",
    summary: "CDC connectors stream committed binlog or WAL entries to downstream consumers with at-least-once semantics and monotonic offsets per partition. Schema evolution requires compatible serialization formats, and replay from a checkpoint must handle duplicate events idempotently.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Time and ordering in distributed systems",
    summary: "Physical clocks drift enough that timestamp ordering is unreliable across nodes without synchronization bounds. Lamport clocks, vector clocks, and hybrid logical clocks establish causal ordering for conflict detection, while watermarks bound event-time windows in stream processing.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Storage engine trade-offs",
    summary: "B-trees offer predictable read latency with moderate write amplification, while LSM trees batch writes for higher ingest throughput at the cost of compaction stalls. The choice depends on read-to-write ratio, range query patterns, and tolerance for write amplification during compaction.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Queue capacity and fair scheduling",
    summary: "Unbounded queues hide backpressure until memory exhaustion kills the broker. Bounded queues with per-tenant concurrency caps and weighted fair queuing prevent batch jobs from starving interactive requests, but sizing requires measuring peak enqueue rates and consumer throughput.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "API gateways and service mesh",
    summary: "Gateways centralize TLS termination, authentication, and rate limiting at the edge, while service meshes add sidecar proxies for mTLS and traffic policy between services. Duplicating retry logic at both layers creates retry storms, so each concern should live at one boundary only.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Capacity planning from first principles",
    summary: "Estimating QPS, payload sizes, and concurrent connections from traffic models sets initial fleet sizing before production data exists. Load tests validate assumptions under peak multiplier, and headroom of thirty to fifty percent absorbs growth without emergency scaling during traffic spikes.",
  },
  {
    category: "BACKEND",
    title: "Spring Boot startup and efficiency",
    summary: "Classpath scanning and auto-configuration inflate startup time and memory footprint in container environments where cold starts matter. Lazy initialization, conditional beans, and GraalVM native compilation reduce footprint, but trade debugging convenience and dynamic feature loading for faster boot.",
  },
  {
    category: "BACKEND",
    title: "gRPC and Protobuf contracts",
    summary: "Protobuf schemas enforce typed contracts with backward-compatible field numbering, and HTTP/2 multiplexing reduces connection overhead for service-to-service calls. Streaming RPCs handle large payloads without buffering, but deadline propagation and client-side load balancing require explicit configuration in polyglot environments.",
  },
  {
    category: "BACKEND",
    title: "Durable background job orchestration",
    summary: "Job queues persist task state with at-least-once delivery, requiring idempotent handlers and deduplication keys for safe retries. Checkpoints allow long-running jobs to resume after worker crash, and visibility timeouts must exceed maximum processing duration to prevent duplicate execution.",
  },
  {
    category: "BACKEND",
    title: "Consistent validation and errors",
    summary: "Input validation at the API boundary rejects malformed requests before domain logic runs, using shared schema definitions to keep client and server rules aligned. Structured error responses with correlation IDs and machine-readable codes enable clients to handle failures without parsing free-text messages.",
  },
  {
    category: "BACKEND",
    title: "Policy-based authorization",
    summary: "Policy engines like OPA or Cedar evaluate attribute-based rules outside application code, enabling permission changes without redeployment. Decision logs provide audit trails, and default-deny policies prevent accidental exposure when new resources are created without explicit grants.",
  },
  {
    category: "BACKEND",
    title: "Redis beyond simple caching",
    summary: "Sorted sets power leaderboards and delayed queues, while Redis Streams provide consumer groups with at-least-once delivery semantics. Atomic Lua scripts ensure consistency for counter increments and lock acquisition, but persistence modes and cluster failover can lose recent writes during node transitions.",
  },
  {
    category: "BACKEND",
    title: "Service testing strategy",
    summary: "Unit tests cover domain logic in isolation, while contract tests verify API compatibility between producer and consumer without full integration environments. Testcontainers spin up real databases for integration tests, but end-to-end tests should target critical user paths only to keep CI fast.",
  },
  {
    category: "BACKEND",
    title: "Runtime configuration and secrets",
    summary: "Configuration loaded at startup should be validated against schemas to fail fast on misconfiguration rather than at runtime. Secrets belong in vaults with short-lived tokens injected at deploy time, never committed to images or logged in stack traces during error handling.",
  },
  {
    category: "FULL STACK",
    title: "Real-time product updates",
    summary: "WebSockets provide bidirectional low-latency channels but require connection management, heartbeat keepalives, and horizontal scaling via sticky sessions or pub-sub backplanes. Server-Sent Events suit one-way push with simpler reconnect semantics, while polling remains viable when update frequency is low.",
  },
  {
    category: "FULL STACK",
    title: "Large file processing journeys",
    summary: "Presigned S3 URLs enable direct browser-to-storage uploads, bypassing server memory limits for multi-gigabyte files. Multipart upload with resumable parts handles network interruptions, and background workers validate file contents asynchronously before marking the upload complete in the database.",
  },
  {
    category: "FULL STACK",
    title: "Internationalization and time zones",
    summary: "Store timestamps in UTC and convert to local time at display using the user's IANA timezone, never relying on server locale. ICU message format handles pluralization and gendered grammar, while RTL layout requires mirrored CSS and bidirectional text handling in form inputs.",
  },
  {
    category: "FULL STACK",
    title: "Audit trails users can understand",
    summary: "Audit records capture actor identity, action type, timestamp, and before-after state diffs in human-readable format alongside machine-parseable JSON. Immutable append-only storage prevents tampering, and user-facing audit views filter to relevant events without exposing internal system operations.",
  },
  {
    category: "FULL STACK",
    title: "Search, filtering, and pagination",
    summary: "Cursor-based pagination avoids offset performance degradation on large datasets by encoding the last seen sort key. Filter state serialized into URL query parameters enables shareable and bookmarkable views, and backend query APIs must support the same filter vocabulary the UI exposes.",
  },
  {
    category: "FULL STACK",
    title: "Reliable exports and reporting",
    summary: "Large exports run as background jobs with progress polling, generating snapshots at request time to ensure consistent results even if source data changes mid-export. Download links expire after a configurable TTL, and row-level permissions filter export contents to authorized data only.",
  },
  {
    category: "FULL STACK",
    title: "Product analytics with intent",
    summary: "Event schemas define required properties and naming conventions before instrumentation, preventing inconsistent data that breaks funnel analysis. Consent banners gate tracking per regulation, and data quality checks flag events with missing required fields before they pollute downstream dashboards.",
  },
  {
    category: "FULL STACK",
    title: "Privacy and data lifecycle",
    summary: "Deletion requests must cascade across primary databases, search indexes, caches, analytics stores, and backup retention policies. Pseudonymization masks PII in non-production environments, and data export endpoints assemble user-held information from all storage layers into a portable format.",
  },
  {
    category: "FRONTEND",
    title: "Rendering very large datasets",
    summary: "Virtual scrolling renders only visible rows plus a small overscan buffer, keeping DOM node count constant regardless of dataset size. Stable row keys prevent unnecessary re-mounts during scroll, and server-side sorting and filtering avoid transferring millions of records to the client.",
  },
  {
    category: "FRONTEND",
    title: "Complex form architecture",
    summary: "Field-level validation runs on blur for immediate feedback, while form-level validation checks cross-field constraints on submit. Dependent fields reset downstream values when upstream selections change, and draft autosave to localStorage prevents data loss on accidental navigation.",
  },
  {
    category: "FRONTEND",
    title: "Optimistic interfaces with recovery",
    summary: "Optimistic updates apply mutations to local cache immediately, rolling back on server rejection with a clear error message. Version vectors or ETags detect concurrent edit conflicts, and progress indicators distinguish between pending, confirmed, and failed states for each action.",
  },
  {
    category: "FRONTEND",
    title: "Frontend testing by risk",
    summary: "Component tests with Testing Library verify user-visible behavior and accessibility roles rather than implementation details. Visual regression tests catch unintended CSS changes, and end-to-end tests cover authentication flows and payment paths where failure cost is highest.",
  },
  {
    category: "FRONTEND",
    title: "Durable component API design",
    summary: "Compound components expose subcomponents via context rather than prop drilling, keeping APIs composable as use cases grow. Controlled and uncontrolled modes support both form library integration and simple usage, and deprecation warnings guide consumers through API migrations.",
  },
  {
    category: "FRONTEND",
    title: "Offline and unreliable-network UX",
    summary: "Service workers cache shell assets for offline loading, while IndexedDB stores pending mutations queued for sync on reconnect. Stale data indicators show last-updated timestamps, and conflict resolution prompts users when server state diverged during the offline period.",
  },
  {
    category: "FRONTEND",
    title: "Web Workers for heavy computation",
    summary: "Workers run CPU-intensive parsing and transformation off the main thread, communicating via structured clone or transferable ArrayBuffers. Termination signals cancel long-running tasks on navigation, and SharedArrayBuffer requires cross-origin isolation headers that limit third-party script compatibility.",
  },
  {
    category: "FRONTEND",
    title: "Localization at product scale",
    summary: "ICU message extraction pipelines scan source code for translatable strings and generate locale files for translator workflows. Pseudo-localization expands strings by thirty percent during development to catch layout breakage before translation delivery, and lazy-loaded locale bundles reduce initial bundle size.",
  },
  {
    category: "DEVOPS",
    title: "OpenTelemetry collector design",
    summary: "Routing traces, metrics, and logs through resilient collectors with sampling, enrichment, redaction, backpressure, and cost-aware retention.",
  },
  {
    category: "DEVOPS",
    title: "Infrastructure as code at scale",
    summary: "Structuring Terraform modules, remote state, policy checks, drift detection, review workflows, and ownership so infrastructure changes remain repeatable.",
  },
  {
    category: "DEVOPS",
    title: "Ephemeral preview environments",
    summary: "Creating short-lived environments per change with realistic dependencies, safe data, automatic cleanup, and useful links for product review.",
  },
  {
    category: "DEVOPS",
    title: "Enterprise secrets management",
    summary: "Centralizing secret storage, workload identity, rotation, audit logs, and emergency access while reducing long-lived credentials across environments.",
  },
  {
    category: "DEVOPS",
    title: "Container image security",
    summary: "Building minimal images with pinned dependencies, non-root execution, vulnerability scanning, provenance, and policies that block unsafe releases.",
  },
  {
    category: "DEVOPS",
    title: "Safe database deployments",
    summary: "Coordinating backward-compatible code, schema changes, backfills, validation, and rollback when application and database releases cannot be atomic.",
  },
  {
    category: "DEVOPS",
    title: "Incident command and learning",
    summary: "Defining clear roles, communication, mitigation priorities, timelines, and blameless follow-up so incidents improve systems instead of only creating documents.",
  },
  {
    category: "DEVOPS",
    title: "Multi-account cloud governance",
    summary: "Separating workloads with centralized identity, networking, logging, policy, and budgets while preserving enough autonomy for product teams to deliver.",
  },
  {
    category: "AI ENGINEERING",
    title: "Embedding and chunking strategy",
    summary: "Selecting boundaries, overlap, metadata, models, and update policies that preserve meaning and improve retrieval for real enterprise documents.",
  },
  {
    category: "AI ENGINEERING",
    title: "Evaluation-driven AI development",
    summary: "Turning representative tasks, expected behavior, failure categories, and human judgment into repeatable tests that guide every model or prompt change.",
  },
  {
    category: "AI ENGINEERING",
    title: "Prompt caching and semantic caching",
    summary: "Reducing latency and model cost while defining safe cache keys, freshness, privacy boundaries, invalidation, and quality checks.",
  },
  {
    category: "AI ENGINEERING",
    title: "Fine-tuning and adapter trade-offs",
    summary: "Choosing prompting, retrieval, fine-tuning, or smaller specialized models based on data quality, maintainability, cost, and measurable improvement.",
  },
  {
    category: "AI ENGINEERING",
    title: "Multimodal document intelligence",
    summary: "Combining text, tables, images, layout, and OCR while preserving citations and confidence for complex enterprise document workflows.",
  },
  {
    category: "AI ENGINEERING",
    title: "AI red teaming and abuse testing",
    summary: "Testing prompt injection, data exfiltration, unsafe tools, harmful outputs, and permission bypass before adversarial users discover them.",
  },
  {
    category: "AI ENGINEERING",
    title: "AI feedback data flywheels",
    summary: "Capturing corrections, outcomes, and difficult examples with consent and quality controls so production use creates better evaluations and systems.",
  },
  {
    category: "AI ENGINEERING",
    title: "Workflows versus autonomous agents",
    summary: "Choosing deterministic orchestration when predictability matters and bounded agent autonomy only where flexible reasoning creates measurable additional value.",
  },
  {
    category: "AWS",
    title: "AWS Well-Architected decisions",
    summary: "The six pillars translate into concrete choices like multi-AZ deployment for reliability versus single-AZ cost savings. Operational excellence requires runbooks and automated rollback, while the cost pillar demands tagging strategies and right-sizing reviews rather than treating optimization as a one-time exercise.",
  },
  {
    category: "AWS",
    title: "Lambda, ECS, or EKS",
    summary: "Lambda suits event-driven workloads with unpredictable traffic and sub-second startup tolerance, billing per invocation and duration. ECS Fargate removes node management for containerized services, while EKS adds Kubernetes API compatibility at the cost of control plane fees and operational complexity.",
  },
  {
    category: "AWS",
    title: "DynamoDB access-pattern design",
    summary: "Single-table design colocates related entities using composite partition and sort keys to satisfy access patterns with one query. GSIs project alternate key schemas but consume separate write capacity, and hot partitions require write sharding or on-demand capacity mode to absorb traffic spikes.",
  },
  {
    category: "AWS",
    title: "SQS, SNS, and EventBridge",
    summary: "SQS standard queues guarantee at-least-once delivery with best-effort ordering, while FIFO queues enforce exactly-once processing with five-hundred TPS per queue limit. SNS fan-out decouples publishers from subscribers, and EventBridge routes events with content-based filtering and schema registries.",
  },
  {
    category: "AWS",
    title: "Step Functions orchestration",
    summary: "Standard workflows persist state durably with exactly-once step execution, supporting waits up to one year for human approval tasks. Express workflows handle high-volume short-duration orchestration at lower cost but without execution history retention, making them unsuitable for audit requirements.",
  },
  {
    category: "AWS",
    title: "AWS multi-account foundations",
    summary: "AWS Organizations with Service Control Policies restrict API actions per account, preventing privilege escalation across the org boundary. Control Tower automates baseline account provisioning with guardrails, and centralized CloudTrail logging to a security account provides tamper-evident audit trails.",
  },
  {
    category: "AWS",
    title: "IAM and least privilege",
    summary: "IAM roles with temporary STS credentials replace long-lived access keys, and permission boundaries cap maximum grants even if a role policy is misconfigured. Access Analyzer identifies resources shared externally, and IAM policy conditions restrict actions by source VPC or MFA presence.",
  },
  {
    category: "AWS",
    title: "Edge security and delivery",
    summary: "CloudFront caches static and dynamic content at edge locations, with origin shield reducing origin load from cache misses. WAF rules block common attack patterns at the edge before traffic reaches application servers, and AWS Shield Standard protects against volumetric DDoS automatically.",
  },
  {
    category: "AWS",
    title: "AWS production observability",
    summary: "CloudWatch metrics and alarms trigger on custom application metrics alongside AWS service defaults, with composite alarms reducing alert noise. X-Ray traces show service map dependencies and latency breakdowns, and OpenTelemetry collectors forward spans to CloudWatch or third-party backends.",
  },
  {
    category: "AWS",
    title: "AWS cost-aware architecture",
    summary: "Savings Plans and Reserved Instances reduce compute costs for steady-state workloads but lock in capacity commitments. S3 Intelligent-Tiering moves objects between access tiers automatically, and VPC endpoints eliminate NAT gateway charges for AWS service traffic within the same region.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "CQRS and materialized views",
    summary: "Separating write models from read-optimized projections allows independent scaling, but eventual consistency between them requires explicit staleness budgets. Materialized views rebuilt from event streams need idempotent handlers, and compensating updates become necessary when projection logic changes retroactively.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Probabilistic data structures",
    summary: "Bloom filters answer set membership with no false negatives but tunable false-positive rates controlled by bit array size and hash function count. HyperLogLog estimates cardinalities in fixed memory with roughly two percent error, making both suitable for pre-filtering expensive lookups at scale.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Geo-routing and traffic steering",
    summary: "Latency-based DNS routing directs users to the nearest healthy region, but TTL caching delays failover detection during outages. Active health checks with weighted routing and automatic failover to secondary regions require testing regional isolation to avoid cascading redirect loops.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Service discovery and health",
    summary: "Service registries must distinguish between process alive and ready to accept traffic, using readiness probes that verify dependency connectivity. Connection draining during deploys prevents in-flight requests from failing, and stale registrations need TTL-based eviction when nodes crash without deregistration.",
  },
  {
    category: "SYSTEM DESIGN",
    title: "Data archival and tiering",
    summary: "Hot storage serves active queries with low latency, while warm and cold tiers trade retrieval speed for per-gigabyte cost on aging data. Lifecycle policies automate transitions based on access patterns, and compliance retention requires legal holds that override default expiration rules.",
  },
  {
    category: "BACKEND",
    title: "Domain-driven service boundaries",
    summary: "Aggregates enforce invariants within a consistency boundary, preventing cross-module direct database access that creates hidden coupling. Bounded contexts map to service ownership, and anti-corruption layers translate between upstream models when integrating with legacy or external systems.",
  },
  {
    category: "BACKEND",
    title: "Transaction isolation in practice",
    summary: "Read committed prevents dirty reads but allows non-repeatable reads, while serializable prevents all anomalies at the cost of lock contention and retries. MVCC enables snapshot reads without blocking writers, but long-running transactions hold version chains that increase vacuum or compaction pressure.",
  },
  {
    category: "BACKEND",
    title: "Reactive versus blocking services",
    summary: "Reactive stacks handle high concurrency with fewer threads via non-blocking I/O, but debugging stack traces and backpressure propagation add complexity. Blocking thread-per-request models are simpler to reason about and sufficient when connection counts stay within thread pool limits.",
  },
  {
    category: "BACKEND",
    title: "Idempotency across service boundaries",
    summary: "Idempotency keys stored with operation results let clients safely retry POST requests without creating duplicate resources. Keys must propagate through message queues and downstream service calls, with TTL-based cleanup preventing unbounded storage growth on the deduplication table.",
  },
  {
    category: "BACKEND",
    title: "Secure webhook delivery",
    summary: "HMAC signatures over request body and timestamp prevent tampering and replay attacks when verified within a narrow time window. Exponential backoff retry schedules handle transient endpoint failures, and delivery logs with response codes enable debugging failed integrations without re-sending events.",
  },
  {
    category: "FULL STACK",
    title: "Multi-channel notification systems",
    summary: "Notification preferences stored per user and channel prevent email delivery when the user opted into push only. Template engines render channel-specific formatting, and deduplication keys suppress duplicate alerts when the same event triggers multiple notification rules simultaneously.",
  },
  {
    category: "FULL STACK",
    title: "Permissions users can understand",
    summary: "UI elements hide or disable actions the user cannot perform, with inline explanations and request-access flows instead of opaque forbidden errors. Backend authorization remains authoritative since client-side checks are bypassable, but the interface must mirror permission state accurately.",
  },
  {
    category: "FULL STACK",
    title: "Safe bulk operations",
    summary: "Bulk actions show a preview of affected records with validation errors before execution, allowing users to fix issues without partial application. Asynchronous processing with progress bars handles large batches, and downloadable result reports detail per-row success and failure reasons.",
  },
  {
    category: "FULL STACK",
    title: "Long-running workflow engines",
    summary: "Workflow state machines persist current step, input data, and timeout deadlines so processes resume after server restart. Human approval steps pause execution until acted upon, and compensation handlers undo completed steps when a later stage fails irreversibly.",
  },
  {
    category: "FULL STACK",
    title: "Cross-system data reconciliation",
    summary: "Scheduled reconciliation jobs compare record counts and checksums between systems of record and downstream replicas. Discrepancy reports trigger repair jobs with audit evidence, and source-of-truth rules define which system wins when the same entity exists in multiple stores.",
  },
  {
    category: "FRONTEND",
    title: "JavaScript performance budgets",
    summary: "Bundle analyzers track per-route chunk sizes against CI-enforced thresholds, failing builds when lazy-loaded routes exceed limits. Third-party script tags defer loading until after first paint, and tree-shaking removes unused exports from dependency graphs during production builds.",
  },
  {
    category: "FRONTEND",
    title: "Error boundaries and recovery UX",
    summary: "Error boundaries catch render-phase exceptions in child components, displaying fallback UI while preserving sibling tree state. Error reporting captures component stack and recent user actions, and retry buttons re-mount the failed subtree without full page reload.",
  },
  {
    category: "FRONTEND",
    title: "URL state and deep linking",
    summary: "Query parameters encode filter, sort, and pagination state so users can bookmark and share exact views. Browser history pushState updates URLs without full navigation, and hydration must read URL state on initial load to match server-rendered content.",
  },
  {
    category: "FRONTEND",
    title: "Responsible data visualization",
    summary: "Chart axes start at zero for bar charts to avoid visual distortion, and color palettes meet contrast requirements for colorblind users. Tooltips and data tables provide accessible alternatives to visual encoding, and large datasets aggregate before rendering to maintain frame rate.",
  },
  {
    category: "FRONTEND",
    title: "Cross-tab browser coordination",
    summary: "BroadcastChannel sends lightweight messages between tabs for session logout or notification deduplication without polling localStorage. Storage events fire on cross-tab writes but not same-tab changes, requiring careful handling to avoid infinite update loops between synchronized tabs.",
  },
  {
    category: "DEVOPS",
    title: "Deployment strategy selection",
    summary: "Choosing rolling, blue-green, canary, or feature-based release methods from rollback needs, database compatibility, cost, and user risk.",
  },
  {
    category: "DEVOPS",
    title: "Policy as code",
    summary: "Encoding security, cost, networking, and compliance rules into versioned automated checks that give teams fast feedback before deployment.",
  },
  {
    category: "DEVOPS",
    title: "Log pipelines and retention",
    summary: "Structuring, redacting, routing, sampling, indexing, and expiring logs so investigations remain effective without uncontrolled cost or sensitive-data exposure.",
  },
  {
    category: "DEVOPS",
    title: "Service catalogs and ownership",
    summary: "Maintaining discoverable owners, dependencies, documentation, SLOs, runbooks, and lifecycle status so engineers can operate a growing platform confidently.",
  },
  {
    category: "DEVOPS",
    title: "Automated recovery runbooks",
    summary: "Turning safe diagnostic and remediation steps into tested automation with approval gates, audit logs, limits, and clear human override.",
  },
  {
    category: "AI ENGINEERING",
    title: "Structured AI outputs",
    summary: "Using schemas, constrained decoding, validation, retries, and typed tool calls so model responses can participate safely in software workflows.",
  },
  {
    category: "AI ENGINEERING",
    title: "Synthetic data with quality controls",
    summary: "Generating representative training and evaluation examples while measuring realism, coverage, bias, privacy, and contamination against real requirements.",
  },
  {
    category: "AI ENGINEERING",
    title: "AI privacy and data residency",
    summary: "Controlling prompts, retention, model providers, regions, encryption, redaction, and consent when enterprise information reaches AI systems.",
  },
  {
    category: "AI ENGINEERING",
    title: "Online evaluation and experiments",
    summary: "Combining offline benchmarks with guarded production tests, user outcomes, quality review, and rollback thresholds before scaling an AI change.",
  },
  {
    category: "AI ENGINEERING",
    title: "Small language models",
    summary: "Evaluating compact specialized models for lower latency, private deployment, predictable cost, and focused tasks that do not require frontier-scale reasoning.",
  },
  {
    category: "AWS",
    title: "Aurora and RDS reliability",
    summary: "Aurora replicates storage six ways across three AZs with automatic failover typically under thirty seconds. RDS Proxy pools database connections for Lambda and container workloads, preventing connection exhaustion, and Performance Insights identifies top SQL statements by load.",
  },
  {
    category: "AWS",
    title: "S3 data lifecycle architecture",
    summary: "Versioning retains object history for accidental deletion recovery, while lifecycle rules transition objects to Glacier tiers after defined idle periods. Event notifications trigger Lambda on object creation for processing pipelines, and bucket policies enforce encryption and deny unencrypted uploads.",
  },
  {
    category: "AWS",
    title: "VPC networking foundations",
    summary: "Public subnets route through internet gateways for inbound traffic, while private subnets use NAT gateways for outbound-only internet access. VPC endpoints keep AWS service traffic on the AWS network without traversing the public internet, and security groups act as stateful firewalls at the instance level.",
  },
  {
    category: "AWS",
    title: "KMS and encryption design",
    summary: "Customer-managed KMS keys provide full control over key policies and rotation schedules, while AWS-managed keys simplify setup with less flexibility. Envelope encryption generates data keys per object, encrypting them with the master key to limit KMS API calls during bulk operations.",
  },
  {
    category: "AWS",
    title: "Cognito and federated identity",
    summary: "User pools handle sign-up, MFA, and JWT issuance, while identity pools exchange tokens for temporary AWS credentials. SAML and OIDC federation maps IdP attributes to Cognito groups, but application authorization must evaluate claims server-side rather than trusting client-provided roles.",
  },
  {
    category: "AWS",
    title: "Kinesis and MSK streaming",
    summary: "Kinesis Data Streams shard throughput at one megabyte or one thousand records per second per shard, requiring shard count planning for peak load. MSK provides managed Kafka with ZooKeeper-less mode on newer versions, offering longer retention and richer consumer ecosystem at higher operational cost.",
  },
  {
    category: "AWS",
    title: "ElastiCache production patterns",
    summary: "Redis cluster mode shards data across nodes for horizontal scaling, with replica nodes providing read scaling and automatic failover. Eviction policies like allkeys-lru prevent OOM crashes under memory pressure, but cache stampede during cold start requires probabilistic early expiration or request coalescing.",
  },
  {
    category: "AWS",
    title: "Route 53 and Global Accelerator",
    summary: "Route 53 latency-based routing policies direct traffic to the lowest-latency healthy endpoint, with health checks removing failed targets automatically. Global Accelerator provides static anycast IPs that route to optimal regional endpoints, surviving IP address changes during regional failover.",
  },
  {
    category: "AWS",
    title: "AWS backup and recovery",
    summary: "AWS Backup creates centralized backup plans across services with cross-account and cross-region copy for disaster recovery. Restore testing validates backup integrity on a schedule, and vault lock enforces WORM retention for compliance workloads that cannot delete backups prematurely.",
  },
  {
    category: "AWS",
    title: "Serverless event architecture",
    summary: "EventBridge rules route events to Lambda targets with retry policies and dead-letter queues for failed invocations. Lambda reserved concurrency prevents one function from consuming the entire account concurrency pool, and idempotent handlers with partial batch failure reporting handle SQS trigger duplicates safely.",
  },
];

const learningTopics = learningTopicLibrary.filter(
  (topic) => ["SYSTEM DESIGN", "FRONTEND", "BACKEND", "FULL STACK", "AWS"].includes(topic.category),
);

function createMixedLearningOrder() {
  const groupedTopics = learningTopics.reduce((groups, topic, index) => {
    if (!groups[topic.category]) groups[topic.category] = [];
    groups[topic.category].push(index);
    return groups;
  }, {});
  const shuffle = (items) => {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
  };

  Object.keys(groupedTopics).forEach((category) => {
    groupedTopics[category] = shuffle(groupedTopics[category]);
  });

  const categoryBlocks = {};
  Object.keys(groupedTopics).forEach((category) => {
    categoryBlocks[category] = [];
    while (groupedTopics[category].length > 0) {
      const remaining = groupedTopics[category].length;
      const validSizes = [3, 4, 5, 6].filter(
        (size) => size <= remaining && (remaining - size === 0 || remaining - size >= 3),
      );
      const blockSize = validSizes[Math.floor(Math.random() * validSizes.length)];
      categoryBlocks[category].push(
        Array.from({ length: blockSize }, () => groupedTopics[category].pop()),
      );
    }
  });

  const order = [];
  let previousCategory = null;
  while (order.length < learningTopics.length) {
    const availableCategories = Object.keys(categoryBlocks).filter(
      (category) => categoryBlocks[category].length > 0 && category !== previousCategory,
    );
    const categoryPool = availableCategories.length > 0
      ? availableCategories
      : Object.keys(categoryBlocks).filter((category) => categoryBlocks[category].length > 0);
    const mostBlocksRemaining = Math.max(
      ...categoryPool.map((category) => categoryBlocks[category].length),
    );
    const balancedPool = categoryPool.filter(
      (category) => categoryBlocks[category].length === mostBlocksRemaining,
    );
    const category = balancedPool[Math.floor(Math.random() * balancedPool.length)];
    order.push(...categoryBlocks[category].pop());
    previousCategory = category;
  }
  return order;
}

const greetings = [
  { text: "Hello", code: "EN" },
  { text: "Namaste", code: "HI" },
  { text: "Hola", code: "ES" },
  { text: "Bonjour", code: "FR" },
  { text: "Ciao", code: "IT" },
  { text: "Hallo", code: "DE" },
  { text: "Olá", code: "PT" },
  { text: "Konnichiwa", code: "JP" },
  { text: "Marhaba", code: "AR" },
];

const assistantQuestionBank = [
  {
    id: "fit",
    tier: 1,
    prompts: ["Why should we hire Harshit?", "What makes Harshit a strong fit?", "Give me the recruiter summary"],
    answer:
      "Harshit combines three years of enterprise delivery for Intuit with end-to-end full-stack ownership and measurable production impact. He can move from an ambiguous user need to a clear React experience, dependable Spring Boot services, cloud infrastructure, testing, and production observability.",
  },
  {
    id: "philosophy",
    tier: 1,
    prompts: ["What drives his work?", "What is his product philosophy?", "What does Harshit care about most?"],
    answer:
      "Harshit’s main focus is user ease: fewer unnecessary steps, clear feedback, and workflows people can understand quickly. He enjoys hiding technical complexity behind simple product experiences while ensuring the services, data layers, and cloud systems underneath remain reliable.",
  },
  {
    id: "intuit",
    tier: 1,
    prompts: ["What has he delivered at Intuit?", "Show his Intuit impact", "What changed because of his work?"],
    answer:
      "At Intuit, Harshit has shipped 100+ features, built secure search across 60+ catalogs, and enabled real-time content previews for 1,000+ users across 20+ teams. His resilience work reduced HTTP 500 errors by 60% and production alerts by 70%, while better dashboards made platform behavior easier to understand.",
  },
  {
    id: "stack",
    tier: 2,
    prompts: ["What is his strongest stack?", "Which technologies does he use?", "Summarize his technical toolkit"],
    answer:
      "Harshit’s core stack is React, JavaScript, TypeScript, Redux, Java, Spring Boot, and REST APIs, supported by AWS and container-based delivery. For data-intensive systems, he works across MySQL, PostgreSQL, DynamoDB, Redis, Elasticsearch, and event-driven messaging based on the access pattern.",
  },
  {
    id: "systems",
    tier: 2,
    prompts: ["Can he build distributed systems?", "What backend systems has he built?", "Show his system-design experience"],
    answer:
      "Harshit has built low-latency URL shortening, event-driven publishing, resilient services with circuit breakers, secure search, and cache-backed APIs. His approach considers failure modes, observability, access control, rollback strategies, and the simplest architecture that can scale safely.",
  },
  {
    id: "frontend",
    tier: 2,
    prompts: ["What is his frontend experience?", "Can he own product interfaces?", "How strong is he with React?"],
    answer:
      "Harshit has delivered 100+ React and Redux features, built real-time preview workflows and finance dashboards, and integrated complex REST APIs. He prioritizes performance, responsive behavior, reusable components, predictable state, and clear feedback for users.",
  },
  {
    id: "projects",
    tier: 2,
    prompts: ["Which project should I see first?", "Show his best projects", "Where can I see practical work?"],
    answer:
      "Start with Global Search to see Harshit’s work at enterprise scale across Elasticsearch, access control, and production observability. Web Chat demonstrates responsive frontend engineering, while Car Review shows Java, persistent storage, authentication, and full-stack application foundations with source links.",
  },
  {
    id: "reliability",
    tier: 2,
    prompts: ["How does he improve reliability?", "Show production engineering impact", "Does he work on quality and security?"],
    answer:
      "Harshit reduced HTTP 500s by 60%, production alerts by 70%, and resolved 30+ AWS security findings by treating reliability as a product requirement. He also expanded Cypress, Jest, and JUnit automation, improved coverage, and used production telemetry to prevent regressions.",
  },
  {
    id: "education",
    tier: 3,
    prompts: ["Where did he study?", "Summarize his education", "What is his academic background?"],
    answer:
      "Harshit earned a Bachelor of Engineering in Electronics and Communication from Thapar Institute with an 8.55 CGPA. He completed Classes X and XII at Ryan International School in Chandigarh and continues learning through cloud certification and hands-on engineering projects.",
  },
  {
    id: "leadership",
    tier: 2,
    prompts: ["How does he show leadership?", "What does ownership look like for him?", "Can he lead without a title?"],
    answer:
      "Harshit takes unclear problems from discovery through production, creates structure around them, and keeps product and engineering decisions aligned. He also helps unblock teammates by sharing technical context, surfacing risks early, and leaving systems easier to operate than he found them.",
  },
  {
    id: "decisions",
    tier: 2,
    prompts: ["How does he balance speed and quality?", "What is his delivery approach?", "How does he make engineering trade-offs?"],
    answer:
      "Harshit prefers shipping the smallest safe increment, validating its value with real feedback, and improving it iteratively. He guides each trade-off by user impact and operational risk, so speed never means ignoring security, observability, or a safe rollback path.",
  },
  {
    id: "incidents",
    tier: 2,
    prompts: ["How does he handle production incidents?", "What happens when production behaves unexpectedly?", "How does he debug failures?"],
    answer:
      "Harshit first contains user impact, then uses logs, dashboards, and reproducible evidence to isolate the root cause before changing code. After the fix, he adds regression coverage, verifies production behavior, and documents the learning so the same class of failure is less likely to return.",
  },
  {
    id: "growth",
    tier: 3,
    prompts: ["What is he learning next?", "Where is he growing technically?", "What topics interest him now?"],
    answer:
      "Harshit is deepening his system-design knowledge across distributed caching, idempotency, data access patterns, and resilient service architecture. In parallel, he continues exploring frontend architecture, browser performance, and ways to make responsive products feel faster and easier to use.",
  },
  {
    id: "culture",
    tier: 3,
    prompts: ["What team culture suits him?", "Where does he do his best work?", "What environment is he looking for?"],
    answer:
      "Harshit thrives in teams that combine meaningful ownership, close collaboration, difficult problems at scale, and frequent delivery. His ideal environment gives engineers direct context about users, encourages thoughtful technical debate, and trusts them to carry solutions through production.",
  },
];

function createAssistantSuggestions() {
  return assistantQuestionBank
    .map((question) => ({
      ...question,
      prompt: question.prompts[Math.floor(Math.random() * question.prompts.length)],
      order: Math.random(),
    }))
    .sort((a, b) => a.tier - b.tier || a.order - b.order)
    .slice(0, 7);
}

function compactLearningSummary(summary, wordLimit = 44) {
  const words = summary.trim().split(/\s+/);
  if (words.length <= wordLimit) return summary;
  return `${words.slice(0, wordLimit).join(" ").replace(/[,:;.]$/, "")}…`;
}

const navItems = ["home", "experience", "work", "skills", "education", "contact"];
const mobileNavItems = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "assistant", label: "Ask AI", featured: true },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function EmphasizedText({ text }) {
  const highlightTerms = [
    "three years", "Intuit", "end-to-end full-stack ownership", "production impact",
    "user ease", "clear feedback", "reliable",
    "100+ features", "60+ catalogs", "1,000+ users", "20+ teams", "60%", "70%", "30+", "98%",
    "React", "JavaScript", "TypeScript", "Redux", "Java", "Spring Boot", "REST APIs", "AWS",
    "MySQL", "PostgreSQL", "DynamoDB", "Redis", "Elasticsearch", "event-driven messaging",
    "low-latency", "circuit breakers", "failure modes", "observability", "access control", "rollback strategies",
    "performance", "responsive behavior", "reusable components", "predictable state",
    "Global Search", "enterprise scale",
    "reliability", "Cypress", "Jest", "JUnit", "production telemetry",
    "Accenture", "Bachelor of Engineering", "Thapar Institute",
    "discovery through production", "technical context", "surfacing risks early",
    "smallest safe increment", "user impact", "operational risk", "security", "safe rollback path",
    "root cause", "regression coverage", "production behavior",
    "system-design", "distributed caching", "idempotency", "resilient service architecture",
    "meaningful ownership", "difficult problems at scale", "thoughtful technical debate",
  ];
  const escapedTerms = highlightTerms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const terms = new RegExp(`(${escapedTerms.join("|")})`, "gi");
  const exactTerm = new RegExp(`^(${escapedTerms.join("|")})$`, "i");

  return text.split(terms).map((part, index) =>
    exactTerm.test(part) ? <strong key={`${part}-${index}`}>{part}</strong> : part,
  );
}

function NavIcon({ name }) {
  if (name === "skills") {
    return (
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M1 0 0 1l2.2 3.08a1 1 0 0 0 .82.42h.07a1 1 0 0 1 .7.29l2.68 2.68-2.62 2.65A3 3 0 1 0 5.88 12.15l2.65-2.62.97.97-.3.91a1 1 0 0 0 .24 1.03l3.35 3.35a1 1 0 0 0 1.42 0l1.58-1.58a1 1 0 0 0 0-1.42l-3.35-3.35a1 1 0 0 0-1.03-.24l-.91.3-.96-.96 2.68-2.68A3 3 0 0 0 16 3c0-.27-.04-.53-.1-.78l-2.14 2.14-2.12-2.12L13.78.1a3 3 0 0 0-3.68 3.68L7.46 6.46 4.79 3.79a1 1 0 0 1-.29-.7v-.08a1 1 0 0 0-.42-.81L1 0Z" />
      </svg>
    );
  }

  const paths = {
    home: "M12 3 2 11.5V21h7v-6h6v6h7v-9.5L12 3Z",
    experience: "M20 6h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v4h20V8a2 2 0 0 0-2-2Zm-6 0h-4V4h4v2Zm8 8H2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6Z",
    assistant: "m12 2 1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Zm7 12 .9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14ZM5 14l1.2 3.3L9.5 18l-3.3 1.2L5 22l-1.2-2.8L.5 18l3.3-.7L5 14Z",
    work: "M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM9.4 15.6 5.8 12l3.6-3.6 1.4 1.4L8.6 12l2.2 2.2-1.4 1.4Zm5.2 0-1.4-1.4 2.2-2.2-2.2-2.2 1.4-1.4 3.6 3.6-3.6 3.6Z",
    contact: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z",
  };

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

function TechIcon({ name }) {
  const variants = {
    amazonwebservices: "plain-wordmark",
    github: "original",
  };
  const variant = variants[name] || "original";
  const src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;
  return (
    <img
      src={src}
      alt={`${name} technology icon`}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.parentElement.style.display = "none";
      }}
    />
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark");
  const [songIndex, setSongIndex] = useState(() => Math.floor(Math.random() * songs.length));
  const [learningOrder] = useState(() => {
    try {
      const savedOrder = JSON.parse(localStorage.getItem("learning-topic-order-v5"));
      const isValidOrder =
        Array.isArray(savedOrder) &&
        savedOrder.length === learningTopics.length &&
        new Set(savedOrder).size === learningTopics.length &&
        savedOrder.every(
          (index) => Number.isInteger(index) && index >= 0 && index < learningTopics.length,
        );
      if (isValidOrder) return savedOrder;
    } catch {
      // Create a fresh order if stored data is missing or invalid.
    }
    const nextOrder = createMixedLearningOrder();
    localStorage.setItem("learning-topic-order-v5", JSON.stringify(nextOrder));
    localStorage.removeItem("learning-topic-order");
    localStorage.removeItem("learning-topic-order-v2");
    localStorage.removeItem("learning-topic-order-v3");
    localStorage.removeItem("learning-topic-order-v4");
    return nextOrder;
  });
  const [topicIndex, setTopicIndex] = useState(() => {
    const savedTopic = Number(localStorage.getItem("learning-topic-index"));
    return Number.isInteger(savedTopic) && savedTopic >= 0 && savedTopic < learningTopics.length
      ? savedTopic
      : learningOrder[0];
  });
  const [istTime, setIstTime] = useState("");
  const [assistantReply, setAssistantReply] = useState(
    "Harshit’s work centers on user ease: removing friction from complex workflows while engineering the reliability needed behind the interface. He enjoys owning products end to end—from understanding the problem and shaping the experience to building, observing, and improving the production system.",
  );
  const [assistantQuestions] = useState(createAssistantSuggestions);
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const learningTouchStartRef = useRef(null);
  const learningTopicInitializedRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 3900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) return undefined;
    let rotation;
    const firstGreeting = window.setTimeout(() => {
      setGreetingIndex(1);
      rotation = window.setInterval(() => {
        setGreetingIndex((index) => (index + 1) % greetings.length);
      }, 375);
    }, 850);
    return () => {
      window.clearTimeout(firstGreeting);
      window.clearInterval(rotation);
    };
  }, [loading]);

  useEffect(() => {
    const updateTime = () => {
      setIstTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };
    updateTime();
    const timer = window.setInterval(updateTime, 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const rotation = window.setTimeout(() => {
      setSongIndex((index) => {
        const next = Math.floor(Math.random() * (songs.length - 1));
        return next >= index ? next + 1 : next;
      });
    }, songs[songIndex].duration);
    return () => window.clearTimeout(rotation);
  }, [songIndex]);

  useEffect(() => {
    localStorage.setItem("learning-topic-index", String(topicIndex));
    if (learningTopicInitializedRef.current) {
      localStorage.setItem("learning-topic-updated", String(Date.now()));
    } else {
      learningTopicInitializedRef.current = true;
      if (!localStorage.getItem("learning-topic-updated")) {
        localStorage.setItem("learning-topic-updated", String(Date.now()));
      }
    }
  }, [topicIndex]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 641px)");
    const topicDuration = 6 * 60 * 60 * 1000;
    let rotation;

    const advanceTopic = () => {
      setTopicIndex((index) => {
        const currentPosition = learningOrder.indexOf(index);
        return learningOrder[(currentPosition + 1) % learningOrder.length];
      });
    };

    const scheduleRotation = () => {
      window.clearTimeout(rotation);
      if (!desktopQuery.matches) return;

      const savedAt = Number(localStorage.getItem("learning-topic-updated") || Date.now());
      const elapsed = Math.max(0, Date.now() - savedAt);
      if (elapsed >= topicDuration) {
        rotation = window.setTimeout(advanceTopic, 0);
        return;
      }
      rotation = window.setTimeout(advanceTopic, topicDuration - elapsed);
    };

    scheduleRotation();
    desktopQuery.addEventListener("change", scheduleRotation);
    return () => {
      window.clearTimeout(rotation);
      desktopQuery.removeEventListener("change", scheduleRotation);
    };
  }, [topicIndex, learningOrder]);

  useEffect(() => {
    const moveCursor = (event) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.animate(
          { transform: `translate3d(${event.clientX}px, ${event.clientY}px, 0)` },
          { duration: 350, fill: "forwards" },
        );
      }
    };

    window.addEventListener("pointermove", moveCursor);
    return () => window.removeEventListener("pointermove", moveCursor);
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);

      const marker = window.scrollY + window.innerHeight * 0.38;
      const sectionIds = ["home", "assistant", "experience", "work", "skills", "education", "contact"];
      let current = "home";
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      });
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
        current = "contact";
      }
      setActiveSection(current);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    return () => {
      revealObserver.disconnect();
    };
  }, [loading]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOverviewOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = overviewOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [overviewOpen]);

  const changeLearningTopic = (direction) => {
    setTopicIndex((index) => {
      const currentPosition = learningOrder.indexOf(index);
      const nextPosition =
        (currentPosition + direction + learningOrder.length) % learningOrder.length;
      return learningOrder[nextPosition];
    });
  };

  const handleLearningTouchStart = (event) => {
    if (!window.matchMedia("(max-width: 640px)").matches) return;
    learningTouchStartRef.current = event.touches[0].clientX;
  };

  const handleLearningTouchEnd = (event) => {
    if (!window.matchMedia("(max-width: 640px)").matches) return;
    if (learningTouchStartRef.current === null) return;
    const distance = event.changedTouches[0].clientX - learningTouchStartRef.current;
    learningTouchStartRef.current = null;
    if (Math.abs(distance) < 42) return;
    changeLearningTopic(distance < 0 ? 1 : -1);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>

      <div className={`loader ${loading ? "" : "loader--done"}`} aria-hidden={!loading}>
        <div className="loader__mark">
          <span>H</span>
          <span>B</span>
        </div>
        <div className="loader__text">
          <span
            className={`loader__greeting ${greetingIndex === 0 ? "loader__greeting--first" : ""}`}
            key={greetings[greetingIndex].text}
          >
            {greetings[greetingIndex].text}
          </span>
          <span className="loader__language">{greetings[greetingIndex].code}</span>
        </div>
        <div className="loader__track">
          <span />
        </div>
      </div>

      <div className={`scroll-progress ${loading ? "" : "scroll-progress--visible"}`} aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <div className="cursor-dot" ref={cursorRef} />
      <div className="cursor-ring" ref={cursorRingRef} />
      <div className="mouse-glow" />

      <header className="topbar">
        <button className="brand" onClick={() => scrollTo("home")} aria-label="Go to home">
          HB<span className="brand__dot">.</span>
        </button>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item}
              className={activeSection === item ? "active" : ""}
              onClick={() => scrollTo(item)}
            >
              {item === "work" ? "projects" : item}
            </button>
          ))}
        </nav>
        <div className="topbar__actions">
          <button className="availability" onClick={() => scrollTo("contact")}>
            <span />
            Available to talk
          </button>
          <a
            className="resume-link"
            href="https://drive.google.com/file/d/1BdYIRjepUsdf6_XxTV4MdWhZaE4A5fhJ/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Harshit Bhatia's resume"
            title="Open resume"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14" />
            </svg>
            <span>Resume</span>
          </a>
          <button
            className="theme-toggle"
            onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <button
            className="mobile-availability"
            onClick={() => scrollTo("contact")}
            aria-label="Available to talk — go to contact"
            title="Available to talk"
          >
            <span />
          </button>
        </div>
      </header>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {mobileNavItems.map((item) => (
          <button
            key={item.id}
            className={`${item.featured ? "featured" : ""} ${activeSection === item.id ? "active" : ""}`.trim()}
            onClick={() => scrollTo(item.id)}
          >
            <span aria-hidden="true"><NavIcon name={item.id} /></span>
            <small>{item.label}</small>
          </button>
        ))}
      </nav>

      <main className={loading ? "site-loading" : "site-ready"}>
        <section className="hero section-shell" id="home">
          <div className="hero__status reveal">
            <span className="status-pill">
              <i /> Full Stack Engineer
            </span>
            <span className="hero__location">Bengaluru, India · {istTime} IST</span>
          </div>

          <div className="hero__heading reveal">
            <p className="eyebrow">HELLO, I’M HARSHIT</p>
            <h1>
              I make complex
              <br />
              systems feel <span className="accent-word">simple.</span>
            </h1>
            <p className="hero__intro">
              Full-stack engineer building high-impact products for Intuit. I turn complex
              workflows into simple user experiences, backed by reliable services and scalable
              cloud systems.
            </p>
          </div>

          <div className="widget-grid reveal">
            <button className="name-widget surface" onClick={() => setOverviewOpen(true)}>
              <span className="widget-label">QUICK PROFILE</span>
              <span className="profile-orb" aria-hidden="true">
                <img src={`${import.meta.env.BASE_URL}harshit-avatar.png`} alt="" />
              </span>
              <span className="name-widget__name">Harshit Bhatia</span>
              <span className="name-widget__role">
                AWS Certified · Building enterprise platforms for Intuit
              </span>
              <span className="name-widget__action">
                Tap for the short version <Arrow />
              </span>
              <span className="pixel-orbit pixel-orbit--one" />
              <span className="pixel-orbit pixel-orbit--two" />
            </button>

            <div className="metric-widget metric-widget--experience surface surface--blue">
              <span className="widget-label">EXPERIENCE</span>
              <strong>3+</strong>
              <span className="metric-widget__caption">years shipping enterprise software</span>
              <span className="experience-signal" aria-hidden="true"><i /><i /><i /></span>
            </div>

            <div className="metric-widget metric-widget--focus surface surface--yellow">
              <span className="widget-label">FOCUS</span>
              <strong>Scale</strong>
              <span className="metric-widget__caption">reliable systems and clear product experiences</span>
              <span className="scale-rings" aria-hidden="true"><i /><i /><i /></span>
            </div>

            <div className="now-widget surface">
              <a
                className="now-widget__item now-widget__item--song"
                href={`https://music.youtube.com/search?q=${encodeURIComponent(songs[songIndex].query)}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="now-widget__icon">♫</span>
                <span>
                  <small>ON ROTATION</small>
                  <strong>{songs[songIndex].title}</strong>
                  <em>{songs[songIndex].artist}</em>
                </span>
                <span className="equalizer"><i /><i /><i /><i /></span>
              </a>
              <div
                className="now-widget__item now-widget__item--learning"
                onTouchStart={handleLearningTouchStart}
                onTouchEnd={handleLearningTouchEnd}
              >
                <span className="now-widget__icon">⌁</span>
                <span className="learning-copy" key={topicIndex} aria-live="polite">
                  <small>CURRENTLY LEARNING · {learningTopics[topicIndex].category}</small>
                  <strong>{learningTopics[topicIndex].title}</strong>
                  <em>{compactLearningSummary(learningTopics[topicIndex].summary)}</em>
                </span>
              </div>
            </div>
          </div>

          <button className="scroll-cue" onClick={() => scrollTo("experience")}>
            <span>Scroll to explore</span>
            <i>↓</i>
          </button>
        </section>

        <section className="section-shell impact-strip reveal" aria-label="Professional summary">
          <div>
            <strong>3 years</strong>
            <span>full-time engineering</span>
          </div>
          <i />
          <div>
            <strong>100+</strong>
            <span>features delivered</span>
          </div>
          <i />
          <div>
            <strong>Full stack</strong>
            <span>product to cloud</span>
          </div>
          <i />
          <div>
            <strong>AWS</strong>
            <span>cloud certified</span>
          </div>
        </section>

        <section
          className="section-shell assistant-section reveal"
          id="assistant"
          aria-labelledby="assistant-title"
        >
          <div className="assistant-card">
            <div className="assistant-card__head">
              <span className="assistant-icon">✦</span>
              <div>
                <span>GUIDED PORTFOLIO ASSISTANT</span>
                <h2 id="assistant-title">What would you like to know?</h2>
              </div>
            </div>
            <div className="assistant-card__body">
              <div className="assistant-answer" key={assistantReply}>
                <span aria-hidden="true">✦</span>
                <p><EmphasizedText text={assistantReply} /></p>
              </div>
              <div className="assistant-suggestions-title">
                <span>Suggested questions</span>
                <small>Swipe to explore →</small>
              </div>
              <div className="assistant-options">
                {assistantQuestions.map((question) => (
                  <button
                    key={question.id}
                    className={assistantReply === question.answer ? "active" : ""}
                    aria-pressed={assistantReply === question.answer}
                    onClick={() => setAssistantReply(question.answer)}
                  >
                    {question.prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell content-section" id="experience">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">01 · EXPERIENCE</p>
              <h2>Experience.</h2>
            </div>
          </div>

          <div className="timeline">
            {experience.map((job) => (
              <article className={`job-card reveal job-card--${job.color}`} key={job.period}>
                <div className="company-brand-stack">
                  <div className="company-logo company-logo--accenture" aria-label="Accenture">
                    <span>&gt;</span>
                    <small>accenture</small>
                  </div>
                </div>
                <div className="job-card__meta">
                  <span>{job.period}</span>
                  <span className="job-card__company">
                    Accenture <em>INTUIT · CLIENT</em>
                  </span>
                  <span className="job-card__location">{job.location}</span>
                </div>
                <div className="job-card__content">
                  <h3>{job.role}</h3>
                  <p className="job-card__summary">{job.summary}</p>
                  <ul>
                    {job.wins.map((win) => (
                      <li key={win}>{win}</li>
                    ))}
                  </ul>
                  <div className="tag-row">
                    {job.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell content-section" id="work">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">02 · SELECTED WORK</p>
              <h2>Selected work.</h2>
            </div>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card reveal project-card--${project.color}`} key={project.id}>
                <div className="project-card__top">
                  <span>{project.eyebrow}</span>
                  <span>{project.id}</span>
                </div>
                <div className="project-card__visual" aria-hidden="true">
                  <span className="visual-pill visual-pill--a" />
                  <span className="visual-pill visual-pill--b" />
                  <span className="visual-pill visual-pill--c" />
                  <span className="visual-core">{project.title.slice(0, 1)}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-card__result">
                  <span>WHAT IT DELIVERS</span>
                  <ul>
                    {project.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
                <div className="tag-row">
                  {project.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
                {project.link && (
                  <a className="project-card__link" href={project.link} target="_blank" rel="noreferrer">
                    View on GitHub <Arrow diagonal />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell content-section" id="skills">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">03 · TOOLKIT</p>
              <h2>Technical toolkit.</h2>
            </div>
          </div>

          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className={`skill-card reveal skill-card--${group.color}`} key={group.title}>
                <div className="skill-card__top">
                  <div className="skill-card__number">0{index + 1}</div>
                  <div className="skill-icons">
                    {group.icons.map((icon) => (
                      <span key={icon}><TechIcon name={icon} /></span>
                    ))}
                  </div>
                </div>
                <h3>{group.title}</h3>
                <p>{group.note}</p>
                <div className="skill-list">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="cert-row reveal">
            <span className="cert-row__label">CERTIFICATIONS</span>
            <div>
              <a
                className="cert-badge cert-badge--primary"
                href="https://cp.certmetrics.com/amazon/en/public/verify/credential/8aad1e830aa541bdbaec9d701f484543"
                target="_blank"
                rel="noreferrer"
              >
                AWS Cloud Practitioner <small>2026 · View credential ↗</small>
              </a>
              <a
                className="cert-badge"
                href="https://drive.google.com/file/d/1qpf4BwlZDjISNMkrPN550TH11Xs92Uwo/view"
                target="_blank"
                rel="noreferrer"
              >
                HPE <small>C++ Assessment · View credential ↗</small>
              </a>
            </div>
          </div>
        </section>

        <section className="section-shell content-section" id="education">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">04 · EDUCATION</p>
              <h2>Education.</h2>
            </div>
          </div>

          <div className="education-timeline">
            <article className="education-item education-item--primary reveal">
              <div className="education-item__year">2019—2023</div>
              <div>
                <span className="education-item__type">BACHELOR OF ENGINEERING</span>
                <h3>Electronics & Communication Engineering</h3>
                <p>Thapar Institute of Engineering & Technology · Patiala</p>
              </div>
              <span className="education-item__score">8.55 CGPA</span>
            </article>
            <article className="education-item reveal">
              <div className="education-item__year">2018—2019</div>
              <div>
                <span className="education-item__type">CLASS XII</span>
                <h3>Senior Secondary Education</h3>
                <p>Ryan International School · Chandigarh</p>
              </div>
              <span className="education-item__score">87.8%</span>
            </article>
            <article className="education-item reveal">
              <div className="education-item__year">2016—2017</div>
              <div>
                <span className="education-item__type">CLASS X</span>
                <h3>Secondary Education</h3>
                <p>Ryan International School · Chandigarh</p>
              </div>
              <span className="education-item__score">10 CGPA</span>
            </article>
          </div>
        </section>

        <section className="section-shell contact-section" id="contact">
          <div className="contact-card reveal">
            <div className="contact-card__copy">
              <p className="eyebrow">05 · LET’S TALK</p>
              <h2>Let’s build products<br /><span>people enjoy using.</span></h2>
              <p>
                Open to full-stack engineering opportunities where I can own meaningful
                problems, simplify user experiences, and build reliable systems at scale.
              </p>
            </div>
            <a className="email-button" href="mailto:20harshitbhatia@gmail.com">
              <span>
                <small>START A CONVERSATION</small>
                20harshitbhatia@gmail.com
              </span>
              <Arrow diagonal />
            </a>
            <div className="contact-links">
              <a href="https://www.linkedin.com/in/harshitbhatia0820" target="_blank" rel="noreferrer">
                LinkedIn <Arrow diagonal />
              </a>
              <a href="https://github.com/Harshit0820" target="_blank" rel="noreferrer">
                GitHub <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="section-shell">
        <span>Designed & built by Harshit Bhatia</span>
        <span>© {new Date().getFullYear()} · Bengaluru, India</span>
        <button onClick={() => scrollTo("home")}>Back to top ↑</button>
      </footer>

      <div
        className={`overview ${overviewOpen ? "overview--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Profile overview"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOverviewOpen(false);
        }}
      >
        <div className="overview__card">
          <span className="overview__orb overview__orb--one" aria-hidden="true" />
          <span className="overview__orb overview__orb--two" aria-hidden="true" />
          <button
            className="overview__close"
            onClick={() => setOverviewOpen(false)}
            aria-label="Close overview"
          >
            ×
          </button>
          <div className="overview__identity">
            <span className="overview__avatar">
              <img src={`${import.meta.env.BASE_URL}harshit-avatar.png`} alt="Harshit Bhatia" />
            </span>
            <div>
              <span className="overview__hello">QUICK PROFILE · HELLO 👋</span>
              <h2>Harshit Bhatia</h2>
              <span className="overview__status"><i /> Full Stack Engineer · Bengaluru</span>
            </div>
          </div>
          <p className="overview__lead">
            I’m an AWS-certified full-stack engineer building enterprise products
            for Intuit. I care deeply about making complex workflows effortless for
            users, without compromising the reliability of the systems behind them.
          </p>
          <div className="overview__stats">
            <div><strong>3+</strong><span>years engineering</span></div>
            <div><strong>100+</strong><span>features shipped</span></div>
            <div><strong>10K+</strong><span>platform users</span></div>
          </div>
          <div className="overview__facts">
            <div><strong>Best at</strong><span>Owning products end to end</span></div>
            <div>
              <strong>Core stack</strong>
              <span>React · JavaScript · TypeScript · Java · Spring Boot · AWS · Elasticsearch · Redis · SQL / NoSQL</span>
            </div>
            <div><strong>Care about</strong><span>User ease · Clarity · Reliability</span></div>
          </div>
          <div className="overview__actions">
            <button
              className="overview__cta"
              onClick={() => {
                setOverviewOpen(false);
                window.setTimeout(() => scrollTo("experience"), 250);
              }}
            >
              Explore experience <Arrow />
            </button>
            <button
              className="overview__contact"
              onClick={() => {
                setOverviewOpen(false);
                window.setTimeout(() => scrollTo("contact"), 250);
              }}
            >
              Start a conversation <Arrow />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');

  :root {
    --bg: #17181b;
    --surface: #222428;
    --surface-2: #2a2c31;
    --text: #f1f3f4;
    --muted: #a9adb5;
    --line: rgba(255, 255, 255, 0.1);
    --blue: #8ab4f8;
    --blue-dark: #1d3557;
    --red: #f28b82;
    --yellow: #fdd663;
    --green: #81c995;
    --radius-lg: 38px;
    --radius-md: 26px;
    --mouse-x: 50vw;
    --mouse-y: 50vh;
    font-family: "Manrope", system-ui, sans-serif;
    color: var(--text);
    background: var(--bg);
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }

  :root[data-theme="light"] {
    --bg: #f4f1ea;
    --surface: #ffffff;
    --surface-2: #ece9e2;
    --text: #202124;
    --muted: #555b64;
    --line: rgba(32, 33, 36, 0.15);
    --blue: #79a7eb;
    --blue-dark: #d9e7fb;
    --red: #ea7b72;
    --yellow: #f2c94c;
    --green: #69b57e;
    color-scheme: light;
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-color: #55585f var(--bg);
    max-width: 100%;
    overflow-x: hidden;
    overflow-x: clip;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    background:
      radial-gradient(circle at 15% 0%, rgba(138, 180, 248, 0.08), transparent 32rem),
      var(--bg);
    overflow-x: hidden;
    overflow-x: clip;
  }

  #root {
    max-width: 100%;
    overflow-x: hidden;
    overflow-x: clip;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    opacity: 0.035;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E");
  }

  button, a {
    -webkit-tap-highlight-color: transparent;
  }

  button {
    color: inherit;
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::selection {
    color: #111318;
    background: var(--blue);
  }

  .section-shell {
    width: min(1180px, calc(100% - 48px));
    margin-inline: auto;
  }

  .content-section {
    padding: 132px 0 24px;
    scroll-margin-top: 70px;
  }

  .eyebrow,
  .widget-label {
    margin: 0;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.14em;
  }

  .reveal {
    opacity: 0;
    filter: blur(5px);
    transform: translateY(36px);
    transition: opacity 0.8s ease, filter 0.8s ease, transform 0.8s cubic-bezier(.2,.8,.2,1);
  }

  .reveal.is-visible {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }

  .project-grid .reveal:nth-child(even),
  .skills-grid .reveal:nth-child(even) {
    transition-delay: .1s;
  }

  .loader {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-content: center;
    gap: 34px;
    padding: 32px;
    background: #131416;
    transition: opacity 0.7s ease 0.15s, visibility 0s linear 0.9s;
  }

  .loader--done {
    opacity: 0;
    visibility: hidden;
  }

  .loader__mark {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 108px;
    height: 108px;
    margin: auto;
    overflow: hidden;
    border-radius: 34px;
    color: #17181b;
    background: var(--blue);
    font-size: 25px;
    font-weight: 800;
    box-shadow: 32px 22px 0 -18px var(--yellow), -28px -25px 0 -17px var(--red);
    animation: loader-float 1.7s ease-in-out infinite;
  }

  .loader__mark span:last-child {
    transform: translateY(8px);
    opacity: 0.45;
  }

  .loader__text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .loader__greeting {
    min-width: 155px;
    color: #f1f3f4;
    font-size: 14px;
    text-transform: none;
    animation: greeting-in .375s ease-in-out both;
  }

  .loader__greeting--first { animation-duration: .85s; }

  .loader__language {
    display: inline;
    min-width: 30px;
    color: #d5d8de;
    font-size: 10px;
    letter-spacing: .12em;
  }

  .loader__track {
    width: min(420px, 72vw);
    height: 3px;
    overflow: hidden;
    border-radius: 20px;
    background: rgba(255,255,255,.1);
  }

  .loader__track span {
    display: block;
    width: 100%;
    height: 100%;
    transform-origin: left;
    background: var(--blue);
    animation: load 3.55s cubic-bezier(.7,0,.2,1) forwards;
  }

  .scroll-progress {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 250;
    height: 2px;
    opacity: 0;
    pointer-events: none;
    background: transparent;
    transition: opacity .3s ease;
  }

  .scroll-progress--visible { opacity: 1; }

  .scroll-progress span {
    display: block;
    width: 100%;
    height: 100%;
    transform-origin: left;
    background: linear-gradient(90deg, var(--blue), var(--green));
    transition: transform .08s linear;
  }

  @keyframes load { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes loader-float { 50% { transform: translateY(-8px) rotate(2deg); } }
  @keyframes greeting-in {
    0% { opacity: 0; transform: translateY(3px); }
    15%, 82% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-2px); }
  }

  .site-ready .hero__status.is-visible { animation: hero-rise .7s ease both; }
  .site-ready .hero__heading.is-visible { animation: hero-rise .8s .08s ease both; }
  .site-ready .widget-grid.is-visible { animation: hero-rise .9s .16s ease both; }
  .site-ready .scroll-cue { animation: hero-rise .7s .4s ease both; }

  @keyframes hero-rise {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cursor-dot,
  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    pointer-events: none;
    border-radius: 50%;
    translate: -50% -50%;
  }

  .cursor-dot {
    width: 7px;
    height: 7px;
    background: var(--text);
  }

  .cursor-ring {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(255,255,255,.4);
  }

  .mouse-glow {
    position: fixed;
    left: var(--mouse-x);
    top: var(--mouse-y);
    z-index: -1;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    background: rgba(138, 180, 248, .045);
    filter: blur(8px);
  }

  .topbar {
    position: fixed;
    top: 18px;
    left: 50%;
    z-index: 100;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    width: min(1180px, calc(100% - 32px));
    min-height: 60px;
    padding: 8px 10px 8px 20px;
    transform: translateX(-50%);
    border: 1px solid var(--line);
    border-radius: 22px;
    background: rgba(34, 36, 40, 0.8);
    box-shadow: 0 14px 35px rgba(0,0,0,.2);
    backdrop-filter: blur(18px);
  }

  .mobile-nav { display: none; }

  .brand {
    justify-self: start;
    padding: 0;
    border: 0;
    background: transparent;
    font-size: 17px;
    font-weight: 800;
    cursor: pointer;
  }

  .brand__dot { color: var(--blue); }

  .topbar nav {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .topbar nav button {
    padding: 9px 13px;
    border: 0;
    border-radius: 13px;
    color: var(--muted);
    background: transparent;
    font-size: 13px;
    text-transform: capitalize;
    cursor: pointer;
    transition: color .2s ease, background .2s ease;
  }

  .topbar nav button:hover,
  .topbar nav button.active {
    color: var(--text);
    background: rgba(255,255,255,.07);
  }

  .topbar__actions {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .resume-link {
    display: flex;
    align-items: center;
    gap: 7px;
    height: 40px;
    padding: 0 12px;
    border: 1px solid var(--line);
    border-radius: 14px;
    color: var(--text);
    background: rgba(138,180,248,.08);
    font-size: 12px;
    font-weight: 650;
    text-decoration: none;
    transition: border-color .2s ease, background .2s ease, transform .2s ease;
  }

  .resume-link svg {
    width: 17px;
    height: 17px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .resume-link:hover {
    border-color: rgba(138,180,248,.42);
    background: rgba(138,180,248,.15);
    transform: translateY(-1px);
  }

  .theme-toggle {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 1px solid var(--line);
    border-radius: 14px;
    color: var(--text);
    background: rgba(255,255,255,.04);
    font-size: 16px;
    cursor: pointer;
    transition: transform .25s ease, background .25s ease;
  }

  .theme-toggle:hover {
    transform: rotate(12deg);
    background: rgba(255,255,255,.09);
  }

  .availability {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border: 0;
    border-radius: 14px;
    color: #d5f2dc;
    background: rgba(129, 201, 149, .11);
    font-size: 12px;
    cursor: pointer;
  }

  .availability > span,
  .status-pill i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 0 5px rgba(129,201,149,.1);
  }

  .mobile-availability {
    display: none;
  }

  .mobile-availability span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 0 5px rgba(129,201,149,.12);
    animation: availability-pulse 2s ease-in-out infinite;
  }

  @keyframes availability-pulse {
    50% { box-shadow: 0 0 0 8px rgba(129,201,149,.04); transform: scale(.92); }
  }

  .hero {
    min-height: 100vh;
    padding-top: 136px;
    padding-bottom: 70px;
    scroll-margin-top: 100px;
  }

  .hero__status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 54px;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 9px 14px;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: #d9dde3;
    font-size: 12px;
  }

  .hero__location {
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .hero__heading h1 {
    max-width: 970px;
    margin: 16px 0 24px;
    font-size: clamp(58px, 8.4vw, 120px);
    font-weight: 600;
    letter-spacing: -.065em;
    line-height: .91;
  }

  .accent-word {
    color: var(--blue);
    position: relative;
    white-space: nowrap;
  }

  .accent-word::after {
    content: "";
    position: absolute;
    right: -24px;
    bottom: 8%;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--yellow);
  }

  .hero__intro {
    max-width: 690px;
    margin: 0 0 55px auto;
    color: #c9ccd2;
    font-size: clamp(18px, 2vw, 24px);
    line-height: 1.55;
  }

  .widget-grid {
    display: grid;
    grid-template-columns: 1.6fr .75fr .75fr;
    grid-template-rows: 185px 150px;
    gap: 14px;
  }

  .surface {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    background: var(--surface);
  }

  .name-widget {
    grid-row: 1 / 3;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 32px;
    text-align: left;
    cursor: pointer;
    transition: transform .35s ease, background .35s ease;
  }

  .name-widget:hover {
    transform: translateY(-5px);
    background: #27292e;
  }

  .name-widget__name {
    z-index: 1;
    margin: auto 0 3px;
    font-size: clamp(32px, 4vw, 56px);
    font-weight: 700;
    letter-spacing: -.045em;
  }

  .profile-orb {
    position: absolute;
    top: 27px;
    right: 32px;
    z-index: 3;
    width: 106px;
    height: 106px;
    overflow: hidden;
    border: 5px solid #f5f7fa;
    border-radius: 34px;
    background: var(--blue);
    box-shadow: 0 14px 32px rgba(0,0,0,.3), 8px 6px 0 -2px var(--blue);
    transition: transform .35s cubic-bezier(.2,.8,.2,1);
    animation: profile-float 3.2s ease-in-out infinite;
  }

  .profile-orb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 18%;
    transform: scale(1.08);
  }

  .name-widget:hover .profile-orb { transform: translateY(-4px) rotate(3deg); }

  @keyframes profile-float {
    50% { translate: 0 -7px; box-shadow: 0 20px 36px rgba(0,0,0,.34), 8px 9px 0 -2px var(--blue); }
  }

  .name-widget__role {
    z-index: 1;
    color: var(--muted);
    font-size: 14px;
  }

  .name-widget__action {
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 25px;
    color: var(--blue);
    font-size: 13px;
  }

  .name-widget__action span {
    animation: profile-arrow 1.8s ease-in-out infinite;
  }

  .name-widget:hover .name-widget__action span { transform: translateX(5px); }

  @keyframes profile-arrow { 50% { translate: 5px 0; } }

  .pixel-orbit {
    position: absolute;
    border-radius: 999px;
    pointer-events: none;
  }

  .pixel-orbit--one {
    top: 24px;
    right: -78px;
    width: 270px;
    height: 112px;
    background: var(--blue);
    transform: rotate(-18deg);
    opacity: .75;
    animation: orbit-drift 7s ease-in-out infinite;
  }

  .pixel-orbit--two {
    top: 132px;
    right: 72px;
    width: 94px;
    height: 94px;
    background: var(--red);
    opacity: .82;
    animation: orbit-drift 5s 1s ease-in-out infinite reverse;
  }

  @keyframes orbit-drift {
    50% { translate: 0 -9px; scale: 1.04; }
  }

  .metric-widget {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px;
    color: #15171b;
  }

  .surface--blue { background: var(--blue); }
  .surface--yellow { background: var(--yellow); }
  .metric-widget .widget-label { color: rgba(20,22,26,.55); }
  .metric-widget strong { font-size: 52px; letter-spacing: -.06em; line-height: .8; }
  .metric-widget__caption { z-index: 1; max-width: 165px; font-size: 12px; line-height: 1.45; }

  .metric-widget--experience strong {
    animation: experience-pulse 3s ease-in-out infinite;
    transform-origin: left bottom;
  }

  .experience-signal {
    position: absolute;
    right: 20px;
    bottom: 19px;
    display: flex;
    align-items: flex-end;
    gap: 4px;
    height: 33px;
    opacity: .55;
  }

  .experience-signal i {
    width: 5px;
    height: 12px;
    border-radius: 4px;
    background: #15171b;
    animation: experience-grow 2.2s ease-in-out infinite alternate;
    transform-origin: bottom;
  }

  .experience-signal i:nth-child(2) { height: 22px; animation-delay: -.7s; }
  .experience-signal i:nth-child(3) { height: 32px; animation-delay: -1.4s; }

  @keyframes experience-pulse { 50% { transform: scale(1.06); } }
  @keyframes experience-grow { 50% { transform: scaleY(.55); opacity: .55; } }

  .metric-widget--focus strong {
    z-index: 1;
    animation: focus-breathe 3.6s ease-in-out infinite;
  }

  .scale-rings {
    position: absolute;
    right: -20px;
    bottom: -34px;
    width: 118px;
    height: 118px;
    pointer-events: none;
  }

  .scale-rings i {
    position: absolute;
    inset: 36px;
    border: 2px solid rgba(20,22,26,.28);
    border-radius: 50%;
    animation: scale-out 3s ease-out infinite;
  }

  .scale-rings i:nth-child(2) { animation-delay: 1s; }
  .scale-rings i:nth-child(3) { animation-delay: 2s; }

  @keyframes focus-breathe { 50% { letter-spacing: -.02em; transform: translateX(3px); } }
  @keyframes scale-out {
    0% { opacity: .7; transform: scale(.4); }
    85%, 100% { opacity: 0; transform: scale(2.3); }
  }

  .now-widget {
    grid-column: 2 / 4;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0;
  }

  .now-widget__item {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    padding: 14px 18px;
  }

  .now-widget__item:first-child {
    border-right: 1px solid var(--line);
    transition: background .2s ease;
  }

  .now-widget__item:first-child:hover { background: rgba(138,180,248,.07); }

  .now-widget__item--song .now-widget__icon {
    border-radius: 50%;
    animation: record-spin 4s linear infinite;
  }

  .now-widget__item--learning {
    position: relative;
    overflow: hidden;
    background: rgba(138,180,248,.025);
    touch-action: pan-y;
  }

  .now-widget__item--learning::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--blue), transparent);
    animation: learning-scan 3.2s ease-in-out infinite;
    transform: translateX(-100%);
  }

  .now-widget__item--learning .now-widget__icon {
    animation: learning-think 2.4s ease-in-out infinite;
  }

  @keyframes record-spin { to { transform: rotate(360deg); } }
  @keyframes learning-scan { 50%, 100% { transform: translateX(100%); } }
  @keyframes learning-think { 50% { color: var(--yellow); transform: translateY(-3px) rotate(8deg); } }

  .now-widget__icon {
    display: grid;
    place-items: center;
    flex: 0 0 36px;
    width: 36px;
    height: 36px;
    border: 1px solid var(--line);
    border-radius: 12px;
    color: var(--blue);
    background: var(--surface-2);
    font-size: 15px;
  }

  .now-widget__item > span:nth-child(2) {
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  .now-widget__item small {
    margin-bottom: 4px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 8px;
    letter-spacing: .1em;
  }

  .now-widget__item strong {
    overflow: hidden;
    font-size: 13px;
    font-weight: 650;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .now-widget__item em {
    overflow: hidden;
    margin-top: 2px;
    color: var(--muted);
    font-size: 10px;
    font-style: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .now-widget__item--learning em {
    display: -webkit-box;
    line-height: 1.35;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }

  .now-widget__item--learning .learning-copy small {
    font-size: 8.5px;
  }

  .now-widget__item--learning .learning-copy strong {
    font-size: 14px;
    line-height: 1.3;
  }

  .now-widget__item--learning .learning-copy em {
    color: #c3cad5;
    font-size: 10.75px;
    line-height: 1.45;
  }

  .learning-copy {
    animation: learning-copy-in .28s ease both;
  }

  @keyframes learning-copy-in {
    from { opacity: 0; transform: translateX(7px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .equalizer {
    display: flex;
    align-items: center;
    gap: 2px;
    height: 18px;
    margin-left: auto;
  }

  .equalizer i {
    width: 2px;
    height: 5px;
    border-radius: 2px;
    background: var(--green);
    animation: equalize .8s ease-in-out infinite alternate;
  }

  .equalizer i:nth-child(2) { height: 13px; animation-delay: -.3s; }
  .equalizer i:nth-child(3) { height: 9px; animation-delay: -.55s; }
  .equalizer i:nth-child(4) { height: 16px; animation-delay: -.15s; }

  @keyframes equalize { to { transform: scaleY(.35); } }

  .scroll-cue {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 36px auto 0;
    padding: 0;
    border: 0;
    color: var(--muted);
    background: transparent;
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: .08em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .scroll-cue i {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid var(--line);
    border-radius: 50%;
    font-style: normal;
    animation: bob 1.8s ease-in-out infinite;
  }

  @keyframes bob { 50% { transform: translateY(5px); } }

  .impact-strip {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
    align-items: center;
    min-height: 130px;
    margin-top: 40px;
    padding: 24px 40px;
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: #1d1f23;
  }

  .impact-strip div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 7px;
  }

  .impact-strip strong { font-size: 29px; letter-spacing: -.04em; }
  .impact-strip span { color: var(--muted); font-size: 12px; }
  .impact-strip > i { width: 1px; height: 38px; background: var(--line); }

  .section-heading {
    display: block;
    margin-bottom: 38px;
  }

  .section-heading h2 {
    margin: 13px 0 0;
    font-size: clamp(38px, 5.2vw, 68px);
    font-weight: 600;
    letter-spacing: -.055em;
    line-height: .98;
  }

  #assistant,
  #experience,
  #work,
  #skills,
  #education {
    position: relative;
    isolation: isolate;
  }

  #assistant > *,
  #experience > *,
  #work > *,
  #skills > *,
  #education > * {
    position: relative;
    z-index: 1;
  }

  #assistant::before,
  #experience::before,
  #work::before,
  #skills::before,
  #education::before,
  #assistant::after,
  #experience::after,
  #work::after,
  #skills::after,
  #education::after {
    content: "";
    position: absolute;
    z-index: 0;
    filter: brightness(.74) saturate(.86);
    pointer-events: none;
  }

  #assistant::before,
  #experience::before,
  #work::before,
  #skills::before,
  #education::before {
    top: var(--section-orbit-top, 82px);
    right: var(--section-orbit-right, 12px);
    width: var(--section-orbit-width, 190px);
    height: var(--section-orbit-height, 72px);
    border: 2px solid var(--section-orbit-color, var(--blue));
    border-radius: var(--section-orbit-radius, 999px);
    opacity: .28;
    rotate: var(--section-orbit-rotate, -9deg);
    animation: section-orbit-drift 8s ease-in-out infinite;
  }

  #assistant::after,
  #experience::after,
  #work::after,
  #skills::after,
  #education::after {
    top: var(--section-dot-top, 128px);
    right: var(--section-dot-right, 76px);
    width: var(--section-dot-size, 42px);
    height: var(--section-dot-size, 42px);
    border-radius: var(--section-dot-radius, 50%);
    background: var(--section-orbit-color, var(--blue));
    opacity: .14;
    animation: section-dot-float 6s ease-in-out infinite;
  }

  #assistant {
    --section-orbit-color: var(--yellow);
    --section-orbit-width: 230px;
    --section-orbit-height: 82px;
    --section-orbit-top: 18px;
    --section-orbit-right: 54px;
    --section-orbit-rotate: 7deg;
    --section-dot-top: 49px;
    --section-dot-right: 30px;
    --section-dot-size: 34px;
  }

  #experience {
    --section-orbit-width: 202px;
    --section-orbit-height: 68px;
    --section-orbit-top: 92px;
    --section-orbit-right: 34px;
    --section-orbit-rotate: -7deg;
    --section-dot-top: 137px;
    --section-dot-right: 196px;
    --section-dot-size: 48px;
  }

  #work {
    --section-orbit-color: var(--red);
    --section-orbit-width: 124px;
    --section-orbit-height: 124px;
    --section-orbit-top: 78px;
    --section-orbit-right: 52px;
    --section-orbit-radius: 50%;
    --section-orbit-rotate: 0deg;
    --section-dot-top: 171px;
    --section-dot-right: 22px;
    --section-dot-size: 36px;
  }

  #skills {
    --section-orbit-color: var(--green);
    --section-orbit-width: 220px;
    --section-orbit-height: 54px;
    --section-orbit-top: 104px;
    --section-orbit-right: 28px;
    --section-orbit-rotate: 5deg;
    --section-dot-top: 73px;
    --section-dot-right: 58px;
    --section-dot-size: 40px;
  }

  #education {
    --section-orbit-color: var(--yellow);
    --section-orbit-width: 158px;
    --section-orbit-height: 78px;
    --section-orbit-top: 88px;
    --section-orbit-right: 22px;
    --section-orbit-radius: 46px 999px 999px 999px;
    --section-orbit-rotate: -6deg;
    --section-dot-top: 151px;
    --section-dot-right: 158px;
    --section-dot-size: 34px;
  }

  #experience::before, #experience::after { animation-delay: -1.5s; }
  #work::before, #work::after { animation-delay: -3.2s; }
  #skills::before, #skills::after { animation-delay: -4.7s; }
  #education::before, #education::after { animation-delay: -2.4s; }

  @keyframes section-orbit-drift {
    50% { translate: -7px 6px; }
  }

  @keyframes section-dot-float {
    50% { translate: 4px -8px; scale: .84; }
  }

  .section-heading > p {
    max-width: 410px;
    margin: 0 0 5px;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.7;
  }

  .timeline {
    display: grid;
    gap: 16px;
  }

  .job-card {
    display: grid;
    grid-template-columns: 104px 230px 1fr;
    gap: 22px;
    padding: 34px;
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: var(--surface);
  }

  .company-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: start;
    flex-direction: column;
    width: 88px;
    height: 70px;
    border-radius: 17px;
    color: #fff;
    background: #080808;
  }

  .company-brand-stack {
    display: flex;
    align-items: center;
    align-self: start;
    flex-direction: column;
  }

  .company-logo span {
    height: 20px;
    color: #a100ff;
    font-family: Arial, sans-serif;
    font-size: 36px;
    font-weight: 800;
    line-height: .5;
  }

  .company-logo small {
    margin-top: 8px;
    font-family: Arial, sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: -.02em;
  }

  .job-card__meta {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 6px;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.5;
  }

  .job-card__meta span:first-child {
    color: var(--text);
    font-family: "DM Mono", monospace;
  }

  .job-card__company {
    color: #d6d9df;
    font-weight: 600;
  }

  .job-card__company em {
    display: table;
    margin-top: 7px;
    padding: 5px 8px;
    border-radius: 8px;
    color: #a8c7fa;
    background: rgba(138,180,248,.12);
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
  }

  .job-card__location {
    color: var(--muted);
    font-size: 11px;
  }

  .job-card__content h3 {
    max-width: 690px;
    margin: 0;
    font-size: clamp(22px, 3vw, 34px);
    font-weight: 600;
    letter-spacing: -.035em;
  }

  .job-card__summary {
    max-width: 720px;
    margin: 16px 0 22px;
    color: #c5c8ce;
    font-size: 15px;
    line-height: 1.65;
  }

  .job-card ul {
    display: grid;
    gap: 10px;
    margin: 0 0 25px;
    padding: 0;
    list-style: none;
  }

  .job-card li {
    position: relative;
    padding-left: 21px;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.6;
  }

  .job-card li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--blue);
  }

  .job-card--green li::before { color: var(--green); }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .tag-row span {
    padding: 7px 10px;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: #c7cad0;
    background: rgba(255,255,255,.025);
    font-family: "DM Mono", monospace;
    font-size: 10px;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .project-card:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }

  .project-card {
    position: relative;
    overflow: hidden;
    min-height: 690px;
    padding: 28px;
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: var(--surface);
    transition: transform .35s ease, border-color .35s ease;
  }

  .project-card:hover {
    transform: translateY(-6px);
    border-color: rgba(255,255,255,.2);
  }

  .project-card__top {
    display: flex;
    justify-content: space-between;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 11px;
    letter-spacing: .09em;
  }

  .project-card__visual {
    position: relative;
    display: grid;
    place-items: center;
    height: 250px;
    margin: 26px 0;
    overflow: hidden;
    border-radius: 26px;
    background: #1a1c1f;
  }

  .visual-core {
    z-index: 2;
    display: grid;
    place-items: center;
    width: 90px;
    height: 90px;
    border-radius: 30px;
    color: #15171a;
    background: var(--yellow);
    font-size: 34px;
    font-weight: 800;
    box-shadow: 0 25px 50px rgba(0,0,0,.28);
    transition: transform .45s cubic-bezier(.2,.8,.2,1);
  }

  .project-card--blue .visual-core { background: var(--blue); }
  .project-card--red .visual-core { background: var(--red); }
  .project-card--green .visual-core { background: var(--green); }
  .project-card:hover .visual-core { transform: scale(1.08) rotate(-4deg); }
  .project-card.is-visible .visual-core { animation: project-float 5s ease-in-out infinite; }

  @keyframes project-float {
    50% { translate: 0 -6px; }
  }

  .visual-pill {
    position: absolute;
    border-radius: 999px;
    background: var(--yellow);
    opacity: .38;
    transition: transform .5s ease;
  }

  .project-card--blue .visual-pill { background: var(--blue); }
  .project-card--red .visual-pill { background: var(--red); }
  .project-card--green .visual-pill { background: var(--green); }
  .visual-pill--a { width: 240px; height: 66px; transform: rotate(22deg) translate(-65px, -52px); }
  .visual-pill--b { width: 180px; height: 56px; transform: rotate(-35deg) translate(90px, 75px); opacity: .2; }
  .visual-pill--c { width: 45px; height: 45px; transform: translate(132px, -70px); opacity: .7; }
  .project-card:hover .visual-pill--a { transform: rotate(15deg) translate(-50px, -55px); }
  .project-card:hover .visual-pill--b { transform: rotate(-28deg) translate(72px, 68px); }

  .project-card h3 {
    margin: 0 0 12px;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -.04em;
  }

  .project-card > p {
    min-height: 65px;
    margin: 0;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.65;
  }

  .project-card__result {
    min-height: 150px;
    margin: 20px 0;
    padding-left: 16px;
    border-left: 2px solid var(--yellow);
    color: #c9ccd1;
    font-size: 12px;
    line-height: 1.6;
  }

  .project-card--blue .project-card__result { border-color: var(--blue); }
  .project-card--red .project-card__result { border-color: var(--red); }
  .project-card--green .project-card__result { border-color: var(--green); }
  .project-card__result span {
    display: block;
    margin-bottom: 4px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: .1em;
  }

  .project-card__result ul {
    display: grid;
    gap: 7px;
    margin: 8px 0 0;
    padding: 0;
    list-style: none;
  }

  .project-card__result li {
    position: relative;
    padding-left: 14px;
  }

  .project-card__result li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--blue);
  }

  .project-card--red .project-card__result li::before { color: var(--red); }
  .project-card--green .project-card__result li::before { color: var(--green); }
  .project-card--yellow .project-card__result li::before { color: var(--yellow); }

  .project-card__link {
    position: absolute;
    right: 28px;
    bottom: 28px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--blue);
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: .06em;
  }

  .project-card__link span { transition: transform .2s ease; }
  .project-card__link:hover span { transform: translate(3px, -3px); }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .skill-card {
    min-height: 300px;
    padding: 28px;
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    background: var(--surface);
  }

  .skill-card:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    min-height: 260px;
  }

  .skill-card__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 35px;
  }

  .skill-card__number {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    margin-bottom: 0;
    border-radius: 13px;
    color: #16181b;
    background: var(--blue);
    font-family: "DM Mono", monospace;
    font-size: 10px;
  }

  .skill-icons {
    display: flex;
    align-items: center;
    padding-left: 8px;
  }

  .skill-icons span {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    margin-left: -8px;
    overflow: hidden;
    border: 2px solid var(--surface);
    border-radius: 50%;
    background: #f7f8fa;
  }

  .skill-icons img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  .skill-card--red .skill-card__number { background: var(--red); }
  .skill-card--yellow .skill-card__number { background: var(--yellow); }
  .skill-card--green .skill-card__number { background: var(--green); }
  .skill-card h3 { margin: 0; font-size: 25px; letter-spacing: -.035em; }
  .skill-card > p { margin: 7px 0 24px; color: var(--muted); font-size: 13px; }

  .skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-list span {
    padding: 9px 12px;
    border-radius: 12px;
    background: var(--surface-2);
    color: #d9dce0;
    font-size: 12px;
  }

  .cert-row {
    display: grid;
    grid-template-columns: 270px 1fr;
    gap: 20px;
    margin-top: 18px;
    padding: 25px;
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    background: var(--surface);
  }

  .cert-row__label {
    display: flex;
    align-items: center;
    align-self: start;
    gap: 11px;
    color: var(--text);
    font-size: 20px;
    font-weight: 650;
    letter-spacing: -.025em;
    line-height: 1.15;
  }

  .cert-row__label::before {
    content: "";
    flex: 0 0 10px;
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background: var(--blue);
    box-shadow: 5px 5px 0 -1px var(--yellow);
  }

  .cert-row > div {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
  }

  .cert-badge {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 180px;
    padding: 12px 14px;
    border: 1px solid var(--line);
    border-radius: 14px;
    color: var(--text);
    background: var(--surface-2);
    font-size: 12px;
    font-weight: 700;
    transition: transform .2s ease, border-color .2s ease;
  }

  .cert-badge:hover {
    transform: translateY(-2px);
    border-color: rgba(138,180,248,.5);
  }

  .cert-badge--primary {
    color: #15171a;
    background: #a8c7fa;
  }

  .cert-badge small {
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 9px;
    font-weight: 400;
  }

  .cert-badge--primary small { color: rgba(20,22,25,.6); }

  .education-timeline {
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: var(--surface);
  }

  .education-item {
    display: grid;
    grid-template-columns: 170px 1fr auto;
    align-items: center;
    gap: 32px;
    min-height: 155px;
    padding: 30px 36px;
    border-bottom: 1px solid var(--line);
  }

  .education-item:last-child { border-bottom: 0; }

  .education-item--primary {
    min-height: 195px;
    background: linear-gradient(110deg, rgba(138,180,248,.11), transparent 55%);
  }

  .education-item__year {
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 13px;
  }

  .education-item__type {
    color: var(--blue);
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: .12em;
  }

  .education-item h3 {
    margin: 8px 0 5px;
    font-size: clamp(20px, 2.8vw, 31px);
    font-weight: 600;
    letter-spacing: -.035em;
  }

  .education-item p {
    margin: 0;
    color: var(--muted);
    font-size: 13px;
  }

  .education-item__score {
    padding: 9px 13px;
    border: 1px solid var(--line);
    border-radius: 13px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 10px;
    white-space: nowrap;
  }

  .assistant-section {
    padding-top: 82px;
    scroll-margin-top: 72px;
  }

  .assistant-card {
    display: grid;
    grid-template-columns: .9fr 1.1fr;
    min-height: 410px;
    overflow: hidden;
    border: 1px solid rgba(138,180,248,.22);
    border-radius: var(--radius-lg);
    background: #1d2430;
  }

  .assistant-card__head {
    display: flex;
    align-items: flex-start;
    gap: 18px;
    padding: 38px;
    background: linear-gradient(140deg, rgba(138,180,248,.13), transparent);
  }

  .assistant-icon {
    display: grid;
    place-items: center;
    flex: 0 0 45px;
    width: 45px;
    height: 45px;
    border-radius: 16px;
    color: #17202e;
    background: var(--blue);
  }

  .assistant-card__head span:not(.assistant-icon) {
    color: var(--blue);
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: .12em;
  }

  .assistant-card h2 {
    max-width: 330px;
    margin: 14px 0 0;
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 600;
    letter-spacing: -.045em;
    line-height: 1.08;
  }

  .assistant-card__body {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 38px;
    border-left: 1px solid rgba(138,180,248,.14);
  }

  .assistant-answer {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    min-height: 88px;
    margin: 0 0 22px;
    padding: 16px;
    border: 1px solid rgba(138,180,248,.14);
    border-left: 3px solid var(--blue);
    border-radius: 18px 18px 18px 6px;
    background: rgba(138,180,248,.055);
    min-width: 0;
    animation: assistantAnswerIn .35s ease both;
  }

  .assistant-answer > span {
    display: grid;
    place-items: center;
    flex: 0 0 28px;
    width: 28px;
    height: 28px;
    border-radius: 10px;
    color: #17202e;
    background: var(--blue);
    font-size: 10px;
  }

  .assistant-answer p {
    min-width: 0;
    margin: 1px 0 0;
    color: #d8e2f2;
    font-size: 17px;
    font-weight: 500;
    line-height: 1.65;
    overflow-wrap: anywhere;
  }

  .assistant-answer p strong {
    padding: 0 .12em;
    color: #a9cbff;
    font-weight: 750;
    background: rgba(138,180,248,.09);
    border-radius: 4px;
  }

  @keyframes assistantAnswerIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .assistant-suggestions-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 0 1px 10px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: .06em;
    text-transform: uppercase;
  }

  .assistant-suggestions-title small { display: none; font-size: 8px; font-weight: 400; }

  .assistant-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .assistant-options button {
    padding: 10px 13px;
    border: 1px solid rgba(138,180,248,.25);
    border-radius: 13px;
    color: #c7d8ee;
    background: rgba(138,180,248,.06);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background .2s ease;
  }

  .assistant-options button:hover { background: rgba(138,180,248,.15); }
  .assistant-options button.active {
    color: #17202e;
    border-color: var(--blue);
    background: var(--blue);
  }

  .contact-section {
    padding-top: 132px;
    scroll-margin-top: 60px;
  }

  .contact-card {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 50px;
    padding: clamp(34px, 6vw, 74px);
    border-radius: 50px;
    color: #141619;
    background: var(--blue);
  }

  .contact-card .eyebrow { color: rgba(20,22,25,.55); }
  .contact-card h2 {
    margin: 17px 0 22px;
    font-size: clamp(44px, 7vw, 82px);
    font-weight: 650;
    letter-spacing: -.065em;
    line-height: .94;
  }

  .contact-card h2 span { color: rgba(20,22,25,.5); }
  .contact-card__copy > p:last-child { max-width: 570px; margin: 0; color: rgba(20,22,25,.67); font-size: 14px; line-height: 1.65; }

  .email-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: center;
    gap: 30px;
    min-width: 320px;
    padding: 18px 20px;
    border-radius: 18px;
    color: var(--text);
    background: #202226;
    font-size: 13px;
    transition: transform .25s ease;
  }

  .email-button:hover { transform: translateY(-4px); }
  .email-button small {
    display: block;
    margin-bottom: 6px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 8px;
    letter-spacing: .1em;
  }
  .email-button > span:last-child { font-size: 22px; }

  .contact-links {
    grid-column: 1 / 3;
    display: flex;
    gap: 8px;
    padding-top: 26px;
    border-top: 1px solid rgba(20,22,25,.18);
  }

  .contact-links a {
    display: flex;
    justify-content: space-between;
    min-width: 150px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(20,22,25,.35);
    font-size: 12px;
  }

  footer {
    display: flex;
    justify-content: space-between;
    padding-top: 34px;
    padding-bottom: 34px;
    color: var(--muted);
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: .04em;
  }

  footer button {
    padding: 0;
    border: 0;
    color: var(--muted);
    background: transparent;
    font-size: 10px;
    cursor: pointer;
  }

  .overview {
    position: fixed;
    inset: 0;
    z-index: 500;
    display: grid;
    place-items: center;
    padding: 20px;
    opacity: 0;
    visibility: hidden;
    background: rgba(8, 9, 11, .7);
    backdrop-filter: blur(16px);
    transition: opacity .3s ease, visibility 0s linear .3s;
  }

  .overview--open {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  }

  .overview__card {
    position: relative;
    width: min(720px, 100%);
    max-height: calc(100vh - 40px);
    padding: clamp(30px, 5vw, 48px);
    overflow-x: hidden;
    overflow-y: auto;
    border: 1px solid rgba(255,255,255,.13);
    border-radius: 42px;
    background:
      radial-gradient(circle at 90% 0%, rgba(138,180,248,.17), transparent 270px),
      #24262a;
    box-shadow: 0 30px 90px rgba(0,0,0,.45);
    opacity: 0;
    transform: perspective(900px) rotateX(7deg) scale(.88) translateY(45px);
    transition: opacity .35s ease, transform .55s cubic-bezier(.16,1,.3,1);
  }

  .overview--open .overview__card {
    opacity: 1;
    transform: perspective(900px) rotateX(0) scale(1) translateY(0);
  }

  .overview__close {
    position: absolute;
    top: 20px;
    right: 20px;
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border: 1px solid var(--line);
    border-radius: 50%;
    background: rgba(255,255,255,.04);
    font-size: 20px;
    cursor: pointer;
    z-index: 4;
  }

  .overview__orb {
    position: absolute;
    z-index: 0;
    border-radius: 999px;
    pointer-events: none;
    filter: blur(.2px);
  }

  .overview__orb--one {
    top: -45px;
    right: 85px;
    width: 150px;
    height: 70px;
    background: rgba(138,180,248,.24);
    transform: rotate(-24deg);
  }

  .overview__orb--two {
    top: 55px;
    right: 38px;
    width: 40px;
    height: 40px;
    background: rgba(253,214,99,.75);
  }

  .overview__identity {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 22px;
    padding-right: 50px;
  }

  .overview--open .overview__identity { animation: modal-rise .55s .12s both; }

  .overview__avatar {
    flex: 0 0 104px;
    width: 104px;
    height: 104px;
    overflow: hidden;
    border: 4px solid #f5f7fa;
    border-radius: 32px;
    background: var(--blue);
    box-shadow: 7px 7px 0 -2px var(--blue);
  }

  .overview--open .overview__avatar { animation: avatar-pop .7s .18s cubic-bezier(.16,1,.3,1) both; }

  .overview__avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 18%;
    transform: scale(1.08);
  }

  .overview__hello {
    color: var(--blue);
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: .12em;
  }

  .overview__card h2 { margin: 9px 0 7px; font-size: clamp(36px, 6vw, 55px); letter-spacing: -.06em; line-height: 1; }

  .overview__status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--muted);
    font-size: 10px;
  }

  .overview__status i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 0 4px rgba(129,201,149,.1);
  }

  .overview__lead {
    position: relative;
    z-index: 1;
    margin: 26px 0 20px;
    color: #d0d3d8;
    font-size: 15px;
    line-height: 1.7;
  }

  .overview--open .overview__lead { animation: modal-rise .55s .2s both; }

  .overview__stats {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 9px;
  }

  .overview__stats div {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 15px;
    border: 1px solid var(--line);
    border-radius: 17px;
    background: rgba(255,255,255,.035);
  }

  .overview--open .overview__stats div { animation: stat-pop .5s .28s both; }
  .overview--open .overview__stats div:nth-child(2) { animation-delay: .36s; }
  .overview--open .overview__stats div:nth-child(3) { animation-delay: .44s; }

  .overview__stats strong { font-size: 24px; letter-spacing: -.04em; }
  .overview__stats span { color: var(--muted); font-size: 9px; }

  .overview__facts {
    display: grid;
    gap: 0;
    margin: 20px 0;
    border-top: 1px solid var(--line);
  }

  .overview--open .overview__facts { animation: modal-rise .5s .42s both; }

  .overview__facts div {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid var(--line);
    font-size: 12px;
  }

  .overview__facts strong { color: var(--muted); font-weight: 500; }

  .overview__cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;
    padding: 16px 18px;
    border: 0;
    border-radius: 16px;
    color: #16181b;
    background: var(--blue);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .overview__actions {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
  }

  .overview--open .overview__actions { animation: modal-rise .5s .5s both; }

  .overview__contact {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 18px;
    border: 1px solid var(--line);
    border-radius: 16px;
    color: #d8dbe0;
    background: rgba(255,255,255,.035);
    font-size: 11px;
    cursor: pointer;
  }

  @keyframes modal-rise {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes avatar-pop {
    from { opacity: 0; transform: scale(.65) rotate(-10deg); }
    70% { transform: scale(1.08) rotate(3deg); }
    to { opacity: 1; transform: scale(1) rotate(0); }
  }

  @keyframes stat-pop {
    from { opacity: 0; transform: scale(.8) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  :root[data-theme="light"] body {
    background:
      radial-gradient(circle at 15% 0%, rgba(69, 120, 194, 0.12), transparent 32rem),
      var(--bg);
  }

  :root[data-theme="light"] .topbar {
    background: rgba(255, 255, 255, .78);
    box-shadow: 0 14px 35px rgba(68, 61, 46, .1);
  }

  :root[data-theme="light"] .topbar nav button:hover,
  :root[data-theme="light"] .topbar nav button.active,
  :root[data-theme="light"] .theme-toggle {
    background: rgba(32, 33, 36, .055);
  }

  :root[data-theme="light"] .availability {
    color: #316e43;
    background: rgba(70, 150, 93, .12);
  }

  :root[data-theme="light"] .status-pill,
  :root[data-theme="light"] .hero__intro,
  :root[data-theme="light"] .job-card__summary,
  :root[data-theme="light"] .project-card__result {
    color: #4f535b;
  }

  :root[data-theme="light"] .eyebrow,
  :root[data-theme="light"] .widget-label,
  :root[data-theme="light"] .now-widget__item small,
  :root[data-theme="light"] .cert-badge small {
    color: #4d535c;
  }

  :root[data-theme="light"] .now-widget__item--learning {
    background: rgba(55,105,174,.025);
  }

  :root[data-theme="light"] .now-widget__item--learning .learning-copy em {
    color: #485568;
  }

  :root[data-theme="light"] .job-card__company { color: #34373d; }
  :root[data-theme="light"] .job-card__company em { color: #174ea6; background: #d7e6ff; }

  :root[data-theme="light"] .name-widget:hover { background: #f9fafc; }
  :root[data-theme="light"] .impact-strip { background: #fff; }
  :root[data-theme="light"] .project-card:hover { border-color: rgba(32,33,36,.24); }
  :root[data-theme="light"] .project-card__visual { background: #e8e8e4; }
  :root[data-theme="light"] .tag-row span { color: #52565d; background: rgba(32,33,36,.025); }
  :root[data-theme="light"] .skill-list span { color: #3e4249; }

  :root[data-theme="light"] #assistant::before,
  :root[data-theme="light"] #experience::before,
  :root[data-theme="light"] #work::before,
  :root[data-theme="light"] #skills::before,
  :root[data-theme="light"] #education::before {
    filter: brightness(.52) saturate(.7);
    opacity: .16;
  }

  :root[data-theme="light"] #assistant::after,
  :root[data-theme="light"] #experience::after,
  :root[data-theme="light"] #work::after,
  :root[data-theme="light"] #skills::after,
  :root[data-theme="light"] #education::after {
    filter: brightness(.52) saturate(.7);
    opacity: .075;
  }

  :root[data-theme="light"] .assistant-card {
    border-color: rgba(55,105,174,.2);
    background: #e8f0fc;
  }

  :root[data-theme="light"] .assistant-card__body {
    border-color: rgba(55,105,174,.13);
  }

  :root[data-theme="light"] .assistant-answer {
    border-color: rgba(55,105,174,.16);
    border-left-color: var(--blue);
    background: rgba(55,105,174,.05);
  }
  :root[data-theme="light"] .assistant-answer p { color: #35475e; }
  :root[data-theme="light"] .assistant-answer p strong {
    color: #174f91;
    background: rgba(55,105,174,.09);
  }
  :root[data-theme="light"] .assistant-options button { color: #315278; }
  :root[data-theme="light"] .email-button { color: #f1f3f4; }

  :root[data-theme="light"] .overview {
    background: rgba(40, 42, 46, .36);
  }

  :root[data-theme="light"] .overview__card {
    border-color: rgba(32,33,36,.12);
    background: #fff;
    box-shadow: 0 30px 90px rgba(60,55,45,.22);
  }

  :root[data-theme="light"] .overview__lead { color: #4d5158; }
  :root[data-theme="light"] .overview__stats div,
  :root[data-theme="light"] .overview__contact { background: rgba(32,33,36,.025); }
  :root[data-theme="light"] .overview__contact { color: #34373d; }

  :root[data-theme="light"] .loader {
    color: #f1f3f4;
    background: #131416;
  }

  :root[data-theme="light"] .loader__text { color: #a9adb5; }

  @media (max-width: 860px) {
    .cursor-dot, .cursor-ring, .mouse-glow { display: none; }
    #assistant::before,
    #experience::before,
    #work::before,
    #skills::before,
    #education::before,
    #assistant::after,
    #experience::after,
    #work::after,
    #skills::after,
    #education::after {
      scale: .84;
      transform-origin: right top;
    }
    .topbar { grid-template-columns: auto 1fr auto; padding-left: 16px; }
    .topbar nav { justify-self: center; }
    .topbar nav button { padding: 9px 8px; font-size: 10px; }
    .topbar nav button:nth-child(5) { display: none; }
    .availability { display: none; }
    .hero { padding-top: 125px; }
    .hero__intro { margin-left: 0; }
    .widget-grid { grid-template-columns: 1fr 1fr; grid-template-rows: 270px 150px 145px; }
    .name-widget { grid-column: 1 / 3; grid-row: auto; }
    .now-widget { grid-column: 1 / 3; }
    .job-card { grid-template-columns: 100px 1fr; }
    .job-card__meta { grid-column: 2; }
    .job-card__content { grid-column: 2; }
    .education-item { grid-template-columns: 130px 1fr auto; gap: 22px; }
    .assistant-card { grid-template-columns: 1fr; min-height: 0; }
    .assistant-card__head { padding: 30px; }
    .assistant-card__body {
      min-width: 0;
      padding: 28px;
      border-top: 1px solid rgba(138,180,248,.14);
      border-left: 0;
    }
    .assistant-answer {
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr);
      min-height: 0;
    }
    .assistant-options {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .assistant-options button {
      width: 100%;
      min-width: 0;
      min-height: 50px;
      text-align: left;
      white-space: normal;
      overflow-wrap: anywhere;
    }
    .contact-card { grid-template-columns: 1fr; }
    .email-button { min-width: 0; width: 100%; }
    .contact-links { grid-column: auto; }
  }

  @media (max-width: 640px) {
    body { padding-bottom: calc(74px + env(safe-area-inset-bottom)); }
    .section-shell { width: min(100% - 24px, 1180px); }
    .content-section, .assistant-section, .contact-section { padding-top: 58px; scroll-margin-top: 70px; }
    #assistant, #experience, #work, #skills, #education {
      overflow-x: hidden;
      overflow-x: clip;
    }
    #assistant::before,
    #experience::before,
    #work::before,
    #skills::before,
    #education::before,
    #assistant::after,
    #experience::after,
    #work::after,
    #skills::after,
    #education::after {
      display: block;
      scale: .52;
      transform-origin: right top;
    }
    #assistant::before { top: 19px; right: -16px; }
    #assistant::after { top: 48px; right: 28px; }
    #experience::before { top: 30px; right: -18px; }
    #experience::after { top: 61px; right: 72px; }
    #work::before { top: 27px; right: 2px; }
    #work::after { top: 78px; right: 12px; }
    #skills::before { top: 34px; right: -22px; }
    #skills::after { top: 23px; right: 40px; }
    #education::before { top: 30px; right: -8px; }
    #education::after { top: 66px; right: 72px; }

    .topbar {
      top: 10px;
      grid-template-columns: auto auto;
      justify-content: space-between;
      width: calc(100% - 20px);
      min-height: 52px;
      padding: 6px 7px 6px 16px;
      border-radius: 17px;
    }
    .brand { display: block; }
    .topbar > nav { display: none; }
    .topbar__actions { justify-self: end; }
    .resume-link {
      width: 38px;
      padding: 0;
      justify-content: center;
      border-radius: 12px;
    }
    .resume-link span { display: none; }
    .theme-toggle { width: 38px; height: 38px; border-radius: 12px; }
    .mobile-availability {
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      padding: 0;
      border: 1px solid rgba(129,201,149,.2);
      border-radius: 12px;
      background: rgba(129,201,149,.09);
      cursor: pointer;
    }

    .mobile-nav {
      position: fixed;
      right: 10px;
      bottom: calc(9px + env(safe-area-inset-bottom));
      left: 10px;
      z-index: 110;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      min-height: 68px;
      padding: 6px 5px;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: rgba(34,36,40,.9);
      box-shadow: 0 14px 40px rgba(0,0,0,.32);
      backdrop-filter: blur(20px);
    }

    .mobile-nav button {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
      padding: 5px 2px;
      border: 0;
      border-radius: 16px;
      color: var(--muted);
      background: transparent;
      cursor: pointer;
    }

    .mobile-nav button > span {
      display: grid;
      place-items: center;
      width: 34px;
      height: 28px;
      border-radius: 999px;
      transition: width .2s ease, color .2s ease, background .2s ease;
    }

    .mobile-nav button svg {
      width: 20px;
      height: 20px;
    }

    .mobile-nav button small {
      max-width: 100%;
      overflow: hidden;
      font-size: 9px;
      font-weight: 600;
      text-overflow: ellipsis;
    }

    .mobile-nav button.active { color: var(--text); }
    .mobile-nav button.active > span {
      width: 42px;
      color: #15171a;
      background: var(--blue);
    }

    .mobile-nav button:nth-child(1).active > span { background: var(--green); }
    .mobile-nav button:nth-child(2).active > span { background: var(--blue); }
    .mobile-nav button:nth-child(4).active > span { background: var(--red); }
    .mobile-nav button:nth-child(5).active > span { background: var(--green); }

    .mobile-nav button.featured > span {
      width: 46px;
      height: 36px;
      margin-top: -10px;
      color: #17202e;
      background: var(--yellow);
      box-shadow: 0 7px 18px rgba(253,214,99,.25);
    }

    .mobile-nav button.featured small {
      color: var(--text);
      font-weight: 700;
    }

    :root[data-theme="light"] .mobile-nav {
      background: rgba(255,255,255,.9);
      box-shadow: 0 14px 40px rgba(60,55,45,.16);
    }

    .hero { min-height: auto; padding-top: 88px; padding-bottom: 20px; }
    .hero__status { margin-bottom: 24px; }
    .hero__location { display: none; }
    .hero__heading h1 { margin-top: 12px; font-size: clamp(42px, 13.5vw, 62px); line-height: .96; }
    .hero__intro { margin-bottom: 24px; font-size: 16px; line-height: 1.6; }
    .accent-word::after { right: -13px; width: 9px; height: 9px; }
    .widget-grid { display: grid; grid-template-rows: 218px 118px auto; gap: 8px; }
    .name-widget { padding: 19px; }
    .profile-orb { top: 18px; right: 18px; width: 80px; height: 80px; border-width: 4px; border-radius: 25px; }
    .pixel-orbit--one { top: 20px; right: -58px; width: 194px; height: 82px; }
    .pixel-orbit--two { top: 104px; right: 46px; width: 68px; height: 68px; }
    .name-widget__name { font-size: 34px; }
    .name-widget__role { max-width: 230px; font-size: 12px; line-height: 1.45; }
    .name-widget__action { font-size: 12px; }
    .metric-widget { min-width: 0; padding: 15px; }
    .metric-widget strong { font-size: 38px; }
    .metric-widget .widget-label { font-size: 9px; }
    .metric-widget__caption { max-width: 125px; font-size: 10px; line-height: 1.45; }
    .experience-signal { right: 12px; bottom: 14px; transform: scale(.75); transform-origin: right bottom; }
    .scale-rings { right: -35px; bottom: -44px; transform: scale(.75); }
    .now-widget {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, minmax(76px, auto));
      padding: 0;
    }
    .now-widget__item { gap: 11px; min-width: 0; min-height: 76px; padding: 12px 16px; }
    .now-widget__item:first-child {
      border-right: 0;
      border-bottom: 1px solid var(--line);
    }
    .now-widget__icon { display: grid; flex-basis: 34px; width: 34px; height: 34px; }
    .equalizer { display: flex; }
    .now-widget__item small { font-size: 8px; }
    .now-widget__item strong {
      font-size: 13px;
      text-overflow: unset;
      white-space: normal;
    }
    .now-widget__item em {
      font-size: 10px;
      line-height: 1.35;
    }
    .now-widget__item--learning em {
      display: block;
      overflow: visible;
      text-overflow: unset;
      white-space: normal;
      -webkit-line-clamp: unset;
    }
    .now-widget__item--learning .learning-copy strong { font-size: 14px; }
    .now-widget__item--learning .learning-copy em { font-size: 11px; line-height: 1.5; }
    .impact-strip { grid-template-columns: 1fr 1fr; gap: 18px 10px; padding: 22px 18px; }
    .impact-strip > i { display: none; }
    .impact-strip strong { font-size: 21px; }
    .impact-strip span { font-size: 11px; text-align: center; }
    .section-heading { margin-bottom: 20px; }
    .section-heading h2 { font-size: 40px; }
    .timeline, .project-grid, .skills-grid { gap: 10px; }
    .job-card { grid-template-columns: 1fr; gap: 13px; padding: 18px; border-radius: 23px; }
    .job-card__meta, .job-card__content { grid-column: 1; }
    .job-card__meta { flex-direction: column; gap: 6px; padding-top: 0; }
    .company-brand-stack { align-items: flex-start; }
    .company-logo { width: 88px; }
    .job-card__content h3 { font-size: 25px; }
    .job-card__meta { font-size: 12px; }
    .job-card__location { font-size: 11px; }
    .job-card__summary { margin: 11px 0 14px; font-size: 14px; line-height: 1.55; }
    .job-card ul { gap: 7px; margin-bottom: 16px; }
    .job-card li { font-size: 13px; line-height: 1.5; }
    .project-grid, .skills-grid { grid-template-columns: 1fr; }
    .project-card { min-height: auto; padding: 18px; border-radius: 23px; }
    .project-card:last-child:nth-child(odd) { grid-column: auto; }
    .project-card__visual { height: 150px; margin: 14px 0; }
    .project-card h3 { font-size: 28px; }
    .project-card > p { min-height: auto; font-size: 14px; }
    .project-card__result { min-height: auto; margin: 14px 0; font-size: 12px; }
    .project-card__result ul { gap: 5px; margin-top: 6px; }
    .tag-row span { font-size: 10px; }
    .project-card__link { position: static; margin-top: 14px; }
    .skill-card { min-height: auto; padding: 18px; }
    .skill-card:last-child:nth-child(odd) { grid-column: auto; min-height: auto; }
    .skill-card__top { margin-bottom: 16px; }
    .skill-card > p { margin-bottom: 16px; font-size: 13px; line-height: 1.5; }
    .skill-list { gap: 6px; }
    .skill-list span { padding: 7px 9px; font-size: 12px; }
    .cert-row { grid-template-columns: 1fr; gap: 14px; padding: 17px; }
    .cert-row__label { gap: 9px; font-size: 18px; }
    .cert-row__label::before { flex-basis: 9px; width: 9px; height: 9px; }
    .cert-row > div { display: grid; grid-template-columns: 1fr; gap: 7px; }
    .cert-badge { width: 100%; min-width: 0; }
    .education-item,
    .education-item--primary {
      grid-template-columns: 78px minmax(0, 1fr) auto;
      gap: 12px;
      min-height: 0;
      padding: 16px;
    }
    .education-item__type { font-size: 8px; letter-spacing: .09em; }
    .education-item h3 { margin: 5px 0 4px; font-size: 18px; line-height: 1.22; }
    .education-item p { font-size: 11px; line-height: 1.4; }
    .education-item__year { font-size: 10px; }
    .education-item__score { padding: 7px 8px; font-size: 9px; }
    .assistant-card { min-height: 0; border-radius: 27px; }
    .assistant-section { padding-top: 54px; }
    .assistant-card__head {
      align-items: center;
      gap: 13px;
      padding: 18px;
    }
    .assistant-icon { flex-basis: 40px; width: 40px; height: 40px; border-radius: 14px; }
    .assistant-card__head span:not(.assistant-icon) { font-size: 8px; }
    .assistant-card h2 { max-width: 260px; margin-top: 7px; font-size: 27px; }
    .assistant-card__body { padding: 18px; }
    .assistant-answer {
      display: grid;
      grid-template-columns: 25px minmax(0, 1fr);
      min-height: 0;
      margin-bottom: 14px;
      padding: 12px;
      border-radius: 17px 17px 17px 5px;
    }
    .assistant-answer > span { flex-basis: 25px; width: 25px; height: 25px; border-radius: 9px; }
    .assistant-answer p { font-size: 14px; line-height: 1.6; }
    .assistant-suggestions-title { margin-bottom: 9px; font-size: 8px; }
    .assistant-suggestions-title small { display: none; }
    .assistant-options {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      overflow: visible;
      margin: 0;
      padding: 0;
    }
    .assistant-options button {
      width: 100%;
      min-width: 0;
      min-height: 50px;
      padding: 9px 11px;
      border-radius: 15px;
      font-size: 12px;
      line-height: 1.4;
      text-align: left;
      white-space: normal;
      overflow-wrap: anywhere;
    }
    .contact-card { gap: 20px; padding: 23px 18px; border-radius: 25px; }
    .contact-card h2 { font-size: 42px; }
    .contact-card__copy > p:last-child { font-size: 14px; }
    .email-button { gap: 12px; padding: 16px; font-size: 11px; word-break: break-all; }
    .contact-links { flex-flow: row wrap; gap: 7px; }
    .contact-links a { flex: 1 1 120px; min-width: 120px; }
    footer { flex-wrap: wrap; gap: 10px; padding-bottom: 18px; }
    footer span:nth-child(2) { display: none; }
    .overview { padding: 10px; }
    .overview__card { max-height: calc(100dvh - 20px); padding: 28px 22px; border-radius: 30px; }
    .overview__identity { align-items: flex-start; gap: 15px; padding-right: 35px; }
    .overview__avatar { flex-basis: 78px; width: 78px; height: 78px; border-width: 3px; border-radius: 24px; }
    .overview__card h2 { font-size: 33px; }
    .overview__hello { font-size: 8px; }
    .overview__status { font-size: 9px; }
    .overview__lead { margin-top: 22px; font-size: 14px; }
    .overview__stats { gap: 6px; }
    .overview__stats div { padding: 12px 9px; }
    .overview__stats strong { font-size: 20px; }
    .overview__stats span { font-size: 8px; }
    .overview__facts div { grid-template-columns: 1fr; gap: 5px; }
    .overview__actions { grid-template-columns: 1fr; }
    .overview__cta, .overview__contact { width: 100%; }
  }

  @media (max-width: 390px) {
    .mobile-nav button small { font-size: 8px; }
    .hero__heading h1 { font-size: 41px; }
    .widget-grid { grid-template-rows: 212px 114px auto; }
    .name-widget__name { max-width: 230px; font-size: 31px; }
    .profile-orb { width: 74px; height: 74px; }
    .metric-widget strong { font-size: 34px; }
    .now-widget__item strong { font-size: 11px; }
    .impact-strip { padding-inline: 14px; }
    .section-heading h2 { font-size: 37px; }
    .contact-card h2 { font-size: 38px; }
  }

  @media (max-width: 340px) {
    .now-widget__item { justify-content: center; padding: 9px; }
    .now-widget__item > span:nth-child(2) { display: none; }
    .now-widget__icon { flex-basis: 40px; width: 40px; height: 40px; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .01ms !important;
    }
  }
`;

export default App;
