# ChatLeg Agent — Execution Steps

This guide translates the transformation plan into concrete steps you can start running today. It keeps the workflow minimal while preparing the workspace for future legal-specific features.

## 1) Install dependencies

```bash
npm ci
```

This installs the pinned toolchain used by the VOID/ChatLeg codebase.

## 2) Bootstrap the ChatLeg workspace folders

Create the local data roots (Cases, Templates, LawRepo, Settings) without touching source code:

```bash
npm run chatleg-bootstrap -- --dry-run  # preview
npm run chatleg-bootstrap               # create chatleg_data/*
```

This generates `chatleg_data/` in the repository root, with a `Settings/README.md` explaining what to place there. You can safely delete/recreate these folders; they are not part of the shipped binaries.

## 3) Build the desktop shell

Compile the client and extensions so the Electron shell can launch:

```bash
npm run compile
```

If you prefer to iterate, use the watch tasks:

```bash
npm run watch-client &
npm run watch-extensions &
```

## 4) Launch the app locally

Once compilation succeeds, start the Electron shell:

```bash
npm run electron
```

This opens the app in development mode with file watcher support.

## 5) Next execution steps

- Point the app to the `chatleg_data` directories as the default storage root.
- Add the new legal UI panels (Cases, Document Editor, ChatLeg Agent) on top of the compiled shell.
- Wire the workspace folders to the agent tools and settings surfaces.

Keep this checklist next to the transformation plan to track incremental progress. For finer-grained actions that fit within a few minutes each, see the micro-task breakdown in [docs/CHATLEG_MICRO_STEPS.md](docs/CHATLEG_MICRO_STEPS.md).
