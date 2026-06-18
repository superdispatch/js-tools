# Agents Guide

> Comprehensive guide for AI coding agents working on this codebase.
> Documents existing conventions only. `CLAUDE.md` is a symlink to this file.

---

## 0. Navigation Contract

Agents MUST traverse context in this order:

1. **This file** (`AGENTS.md`) — workflow, structure, key rules
2. **Per-package `README.md`** under `packages/*/` — package-specific detail
3. **Source under `packages/*/src/`** — read on demand for the package you touch

---

## 1. Project Overview

`js-tools` is a public monorepo of shared front-end tooling published under the
`@superdispatch` npm scope. It bundles the configs and CLI Super Dispatch repos
consume for linting, formatting, transpiling, and TypeScript setup.

Published packages (see `README.md`):

| Package                          | Purpose                                        |
| -------------------------------- | ---------------------------------------------- |
| `@superdispatch/babel-preset`    | Shared Babel preset                            |
| `@superdispatch/eslint-plugin`   | Shared ESLint config + custom rules            |
| `@superdispatch/js-tools`        | CLI utilities (`js-tools` binary, oclif-based) |
| `@superdispatch/prettier-config` | Shared Prettier config                         |
| `@superdispatch/tsconfig`        | Shared TypeScript config                       |
| `@superdispatch/renovate-config` | Shared Renovate config                         |

### Prerequisites

- **Node.js >= 24** (pinned via `engines` in every `package.json`; CI uses 24)
- **pnpm** (workspace package manager; CI uses pnpm 10.25)
- **TypeScript 4.8.x** (repo devDependency)

### Key Commands

```bash
pnpm install                  # Install workspace dependencies
pnpm build                    # Build all packages (lerna run build --parallel)
pnpm lint                     # Lint via the js-tools CLI (runs prebuild first)
pnpm tsc                      # TypeScript build / type check
pnpm test                     # Jest with coverage (experimental VM modules)
pnpm tdd                      # Jest in watch mode
pnpm release                  # Publish via lerna publish
```

> `pnpm lint` has a `prelint` hook that runs `pnpm build` first, because it
> depends on the freshly built `@superdispatch/js-tools` CLI.

### Directory Structure

```
.
├── packages/
│   ├── babel-preset/         # @superdispatch/babel-preset (src/, README)
│   ├── eslint-plugin/        # @superdispatch/eslint-plugin
│   │   ├── src/configs/      # base, node, react, typescript, jest, cypress configs (+ .spec)
│   │   ├── src/rules/        # custom ESLint rules (+ .spec)
│   │   └── types/            # local type declarations
│   ├── js-tools/             # @superdispatch/js-tools CLI (oclif)
│   │   └── src/              # bin.ts, index.ts, base/, commands/lint
│   ├── prettier-config/      # @superdispatch/prettier-config
│   ├── tsconfig/             # @superdispatch/tsconfig
│   └── renovate-config/      # @superdispatch/renovate-config
├── .github/workflows/        # CI (check.yml)
├── .husky/                   # Git hooks (pre-commit)
├── package.json              # Workspace root (scripts, jest config, devDeps)
├── lerna.json                # Lerna config (npmClient: pnpm)
├── pnpm-workspace.yaml        # pnpm workspace globs (packages/*)
├── tsconfig*.json            # Root, build, and test TS configs
└── jest-resolver.js          # Custom Jest resolver
```

### Workspace & Build

- **Monorepo:** pnpm workspaces (`pnpm-workspace.yaml` and `workspaces` in
  `package.json`, both globbing `packages/*`). Versioning/publishing via **Lerna**
  (`lerna.json`, `npmClient: pnpm`).
- **Cross-package linking:** the root consumes the local CLI as
  `"@superdispatch/js-tools": "workspace:*"`.
- **Per-package build:** each package's `build` script is `rimraf dist && tsc -b`
  (the `js-tools` CLI additionally runs `oclif-dev manifest` on `prepack`).
- **`.npmrc`:** `shamefully-hoist=true`; `@superdispatch` resolves from the public
  npm registry.

---

## 2. Code Conventions (Key Rules)

This repo lints itself with its own ESLint plugin and formats with its own
Prettier config. Follow what the configs enforce — do not add new tooling.

| Rule          | Detail                                                                   |
| ------------- | ------------------------------------------------------------------------ |
| Formatting    | Prettier via `./packages/prettier-config` (set as root `prettier` field) |
| Linting       | `js-tools lint` (the repo's own CLI); `--fix` for autofix                |
| TS source     | `*.ts` extends `plugin:@superdispatch/ts-node`                           |
| JS source     | `*.js` extends `plugin:@superdispatch/node`                              |
| Config files  | `eslint-plugin/src/configs/*.ts` enforce `sort-keys` ascending (natural) |
| Custom rules  | `eslint-plugin/src/rules/*.ts` follow `eslint-plugin/rules-recommended`  |
| Module system | Root tsconfig compiles to CommonJS, target/lib ES2022                    |
| Engines       | Every package pins `node >= 24`                                          |

ESLint behavior is governed by the root `.eslintrc.js` overrides (per file glob)
plus the configs shipped in `packages/eslint-plugin/src/configs/`.

---

## 3. Testing Rules (Key Rules)

- **Framework:** **Jest** (via `ts-jest`, `preset: ts-jest`), not Vitest.
- **Run:** `pnpm test` (coverage, `coverageProvider: v8`); `pnpm tdd` to watch.
- **Roots:** Jest only runs tests under `babel-preset`, `eslint-plugin`, and
  `prettier-config` (`jest.roots` in `package.json`).
- **File naming:** `*.spec.ts`, colocated next to the source it covers.
- **Test utilities:** shared helpers live in `__testutils__/` directories.
- **Snapshots:** `snapshot-diff/serializer` is registered as a snapshot serializer;
  config tests assert serialized ESLint config output.
- **TS for tests:** `tsconfig.test.json`, `isolatedModules: true`.
- **Snapshot updates:** `pnpm test -u` (CI uses `superdispatch/actions/update-snapshots`).

---

## 4. CI

`.github/workflows/check.yml` (**Check**) runs on push to `master` and on every
pull request:

1. `superdispatch/actions/prepare-node-repo@v2` (Node 24, pnpm 10.25)
2. `pnpm tsc`
3. `pnpm lint`
4. `pnpm test` via `superdispatch/actions/update-snapshots`
5. Coverage upload via `codecov/codecov-action`

Match these locally before pushing: `pnpm tsc && pnpm lint && pnpm test`.
This mirrors the root `prerelease` script (`pnpm install && pnpm tsc && pnpm lint && pnpm test`).

---

## 5. Agent Workflow

1. **Create a branch** — never commit directly to `master`; one branch per logical change.
2. **Identify the package** — almost all changes live under a single `packages/*`;
   read that package's `README.md` and `package.json` before editing.
3. **Read & gather context** — this file first, then the target package source.
4. **Find similar code** — match existing patterns (config shape, rule structure,
   spec layout); the ESLint configs and custom rules are the most pattern-heavy areas.
5. **Generate** — follow existing conventions exactly; keep `sort-keys` ordering in
   config files; commit incrementally so each commit builds and tests pass.
6. **Test & verify** — `pnpm build` (CLI/configs must be built before lint), then
   `pnpm tsc && pnpm lint && pnpm test`. Update snapshots with `pnpm test -u` only
   when an intended config/output change causes the diff.
7. **Review & submit** — self-review with `git diff`, then open a pull request.
   Never use `--no-verify` (the `pre-commit` hook runs `lint-staged` → `js-tools lint --fix`).

---

## 6. Git Conventions

This repo does not document a commit-message format, ticket convention, or PR
template. Use a minimal, conventional flow:

- **Never commit directly to `master`** — work on a dedicated branch.
- **Descriptive commit messages** — clear summary of what changed and why.
- **Open a PR** — all changes merge through pull requests; CODEOWNERS
  (`.github/CODEOWNERS`) are requested automatically as reviewers.
- **Pre-commit hook:** `.husky/pre-commit` runs `pnpm lint-staged`, which runs
  `js-tools lint --fix` over staged files. Do not bypass it with `--no-verify`.

---

## Quick Links

| Location                                               | Content                               |
| ------------------------------------------------------ | ------------------------------------- |
| `README.md`                                            | Package list + npm links              |
| `packages/*/README.md`                                 | Per-package documentation             |
| `.github/workflows/check.yml`                          | CI pipeline                           |
| `.eslintrc.js` / `packages/eslint-plugin/src/configs/` | Lint configuration                    |
| `package.json`                                         | Scripts, Jest config, devDependencies |
| `lerna.json` / `pnpm-workspace.yaml`                   | Monorepo / publishing config          |
