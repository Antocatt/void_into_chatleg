# ChatLeg Agent — Micro Execution Steps

This checklist breaks the transformation work into tiny, repeatable actions that Codex-style automation can execute safely. Follow the steps in order; each item should complete in a few minutes or less.

## A. Preflight (local setup)
1. **Verify Node.js**
   - Command: `node -v`
   - Expectation: matches the version in `.nvmrc` (or use `nvm use` if present).
2. **Verify npm**
   - Command: `npm -v`
   - Expectation: prints a version without errors.
3. **Install dependencies**
   - Command: `npm ci`
   - Expectation: completes without audit prompts.

## B. Workspace bootstrap (data roots)
1. **Preview folder creation**
   - Command: `npm run chatleg-bootstrap -- --dry-run`
   - Expectation: logs planned directories under `chatleg_data/`.
2. **Create folders**
   - Command: `npm run chatleg-bootstrap`
   - Expectation: creates `chatleg_data/Cases`, `chatleg_data/Templates`, `chatleg_data/LawRepo`, `chatleg_data/Settings` with README guidance.
3. **Point the app to the data root (manual for now)**
   - Action: set your local settings (once UI wiring exists) to use `<repo>/chatleg_data` as the base path.

## C. Build and run shell
1. **Compile once**
   - Command: `npm run compile`
   - Expectation: builds client and extensions.
2. **Launch Electron**
   - Command: `npm run electron`
   - Expectation: opens the desktop shell.
3. **Iterate with watches (optional)**
   - Command: `npm run watch-client &` and `npm run watch-extensions &`
   - Expectation: background rebuilds on file changes.

## D. Phase 1 (Rebrand + remove dev UI) — micro tasks
1. **Rename surface strings**
   - Files: `product.json`, `resources/**/product.json`
   - Action: replace “Void” wording with “ChatLeg Agent” labels.
2. **Hide/remove coding-only actions**
   - Files: `src/vs/workbench/**` menus/toolbars
   - Action: remove Run/Debug/Test/Terminal entry points from menus and quick actions.
3. **Update icons/branding**
   - Files: `void_icons/`, `resources/win32/*`, `resources/linux/*`
   - Action: swap logos/ico files with ChatLeg assets (placeholder allowed).
4. **Homepage/Welcome updates**
   - Files: `src/vs/workbench/contrib/welcome/**`
   - Action: replace code-centric welcome text with legal workspace intro + links to Cases/Templates/Settings.

## E. Phase 2 (Three-pane legal workspace) — micro tasks
1. **Layout scaffold**
   - Files: `src/vs/workbench/browser/parts/**`
   - Action: define left (Case Explorer), center (Document Editor), right (ChatLeg Agent) panes using existing viewlet/panel abstractions.
2. **Case Explorer view**
   - Files: `src/vs/workbench/contrib/files/**`
   - Action: repurpose Explorer to show `Casi in corso`, `Casi chiusi`, `Template` roots mapped to `chatleg_data` folders.
3. **Document Editor swap**
   - Files: `src/vs/editor/**` (consider Markdown mode)
   - Action: default to markdown/rich-text toolbar; hide coding intellisense/diagnostics.
4. **ChatLeg Agent panel**
   - Files: `src/vs/workbench/contrib/chat/**`
   - Action: keep chat plumbing; add tabs for Chat, Tasks, Notifications with status indicators.

## F. Phase 3 (File/Folder tools + templates) — micro tasks
1. **Add template apply command**
   - Files: `src/vs/workbench/contrib/files/browser/fileActions.ts`
   - Action: new command to copy `/Templates/<name>` into selected case folder.
2. **Expose CRUD commands**
   - Files: same as above
   - Action: ensure create/rename/delete file/folder actions are wired to the `chatleg_data` roots.
3. **Agent tool wiring**
   - Files: `src/vs/workbench/contrib/chat/browser/contrib/tools/**`
   - Action: register create/read/update/delete file/folder tool endpoints calling existing file services.

## G. Phase 4 (Upload Bin + law search) — micro tasks
1. **Bin folder convention**
   - Files: `src/vs/workbench/contrib/files/**`
   - Action: ensure `Bin/` subfolder is created per case and visible in the explorer.
2. **Bin tools**
   - Files: `src/vs/workbench/contrib/chat/browser/contrib/tools/**`
   - Action: add `list_bin_files` and `read_bin_file` commands restricted to `<case>/Bin`.
3. **Law repo search UI**
   - Files: `src/vs/workbench/contrib/search/**` or new view
   - Action: add search bar pointing to configurable law repo path.

## H. Phase 5 (Tasks + vector store) — micro tasks
1. **Task queue model**
   - Files: `src/vs/workbench/contrib/chat/common/chatModel.ts`
   - Action: add states Planned/Running/Awaiting confirmation/Completed/Failed per message.
2. **Structured plan rendering**
   - Files: `src/vs/workbench/contrib/chat/browser/chatWidget.ts`
   - Action: render tool execution plans and status chips inline in chat.
3. **Vector store adapter**
   - Files: `src/vs/workbench/contrib/chat/browser/contrib/tools/**`
   - Action: add `query_vector_store` tool with endpoint/credential settings.

## I. Phase 6 (Polish) — micro tasks
1. **Case dashboard**
   - Files: `src/vs/workbench/contrib/notebook/**` or custom webview
   - Action: generate timeline, document summaries, checklists from case metadata.
2. **Versioning light**
   - Files: `src/vs/workbench/contrib/files/**`
   - Action: simple diff + restore for documents stored under `chatleg_data`.
3. **Privacy mode toggle**
   - Files: `src/vs/workbench/contrib/chat/common/chatConfiguration.ts`
   - Action: config flag to disable external calls and force local tools.

Keep this checklist alongside the execution guide; each micro task is designed for quick, deterministic implementation.
