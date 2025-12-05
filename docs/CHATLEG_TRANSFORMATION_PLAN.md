# ChatLeg Agent — Transformation Plan

## Overview
This document outlines how to evolve the current VOID-based application into **ChatLeg Agent**, a dedicated desktop workspace for legal professionals. The plan focuses on replacing developer-oriented workflows with legal-centric features while reusing the underlying agent, file tooling, and application shell.

## Vision
ChatLeg Agent will provide:
- A central legal document editor instead of a code editor.
- A legal AI agent capable of executing tasks, manipulating files and folders, reading uploaded documents, and querying legal knowledge bases.
- Structured spaces for managing cases, templates, documents, and legislative sources.
- Optional integration with local law repositories or remote vector stores for contextual grounding.

## High-Level Architecture
- **UI Layer:** Three-pane layout with a case explorer (left), legal document editor (center), and ChatLeg Agent chat/tasks (right).
- **Agent Layer:** Tools for file and folder operations, template application, upload bin access, and legislative search via local repositories or remote vector stores.
- **Storage Layer:** Local directories for cases, templates, an optional law repository, and settings.
- **Config Layer:** Settings for model access, legislative repository paths, vector store credentials, and templates.

## Mapping VOID to ChatLeg Agent
- **Remove or hide** coding-oriented UI such as run-code buttons, terminal views, and test viewers; Git integration can return later as a simple versioning feature.
- **Reuse** core chat/agent loop, file operation tools, settings architecture, and file explorer logic.
- **Add or modify** the UI with a rich legal editor, legal terminology, templates, upload bins, and law repository search tooling.

## UI / UX Blueprint
- **Left panel — Case Explorer:** Root folders for open/closed cases and templates with context actions (new case, from template, rename, delete, upload documents, open on disk).
- **Center panel — Document Editor:** Markdown or rich text with basic formatting, legal AI actions (review, reformulate, summarize, add argument), and a raw/preview toggle.
- **Right panel — ChatLeg Agent:** Chat history plus task tabs (chat, queue, notifications) that reflect task status.

## Document Upload System (Bin)
- Upload documents per case into `/Cases/<CaseName>/Bin/`.
- Agent tools to list and read bin files for extraction, summarization, or analysis.

## Agent Tools and Behavior
- File tools: create, read, write, update, and delete files.
- Folder tools: create, delete, list, and rename folders.
- Template tools: apply folder templates.
- Upload bin tools: list and read uploaded files.
- Legislative tools: search a local law repository and query a vector store.
- System behavior: act as an Italian legal assistant focused on penal, civil, and procedural law; prefer tool-driven document manipulation with grounding in law repositories, vector stores, and uploaded documents.

## Templates
- Stored under `/Templates/<template_name>/`.
- Applying a template copies the directory into `/Cases/<CaseName>/` when creating a case from a template.
- Agent can recommend templates based on the case description.

## Legislative Repository Access
- **Local repository:** Configurable path (e.g., `/Users/antonio/LeggiItalia/`) with search returning article numbers, snippets, and references.
- **Remote vector store:** Queryable with optional case context, returning structured matches with metadata.

## Task System
- User instructions can become tasks with planned, running, awaiting confirmation, completed, or failed states.
- Workflow: user message → structured plan → tool execution → UI updates → confirmations/previews returned to chat.

## Additional Features
- Case dashboard with timeline, document summaries, key questions, and checklist status.
- Document versioning with diff and restore options.
- Privacy mode to restrict model calls to local resources.
- Document tagging (Atto, Nota difensiva, Verbale, Ricerca) to tailor agent output.

## Implementation Phases
1. **Phase 1 — Fork + Rebrand:** Rename the app to ChatLeg Agent, remove coding-specific UI, and update branding.
2. **Phase 2 — New Workspace UI:** Implement the three-pane layout with a legal document editor and updated terminology.
3. **Phase 3 — File/Folder Tools + Templates:** Expand file and folder manipulation and add template workflows.
4. **Phase 4 — Upload Bin + Legislative Access:** Add bin management, legislative search tools, and settings for repository paths.
5. **Phase 5 — Tasks + Vector Store:** Implement task queueing, structured plans, vector store integration, and case dashboards.
6. **Phase 6 — Polishing:** UX refinements, error handling, wording consistency, and draft improvements.

## Acceptance Criteria (Developer Focus)
- UI reflects the three-pane design with markdown/rich-text editing and task-aware chat.
- Agent supports full file/folder CRUD, template application, and bin operations.
- Legislative search works with local repositories and configured vector stores.
- Tasks surface deterministically with clear error reporting.

## Next Steps for the Dev Team
1. Clone the repository and audit file system APIs, agent tooling, and UI components.
2. Select the editor component (e.g., Monaco in text mode, Quill, or a Markdown engine), template copying strategy, and search tooling approach.
3. Deliver Phase 1 (rebranding and base UI) before progressing to subsequent phases.
4. Keep the UX lawyer-friendly with concise labels such as “Nuovo caso”, “Aggiungi documento”, and “Genera memoria”.
