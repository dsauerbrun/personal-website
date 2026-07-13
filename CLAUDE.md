# CLAUDE.md

## Deployment security context

This is a static personal/portfolio site (App Router, React 19, no DB, no auth, no user data)
served via Docker + Next.js. **The production host was previously compromised**: an exposed
`next dev` server let an attacker exploit React2Shell (CVE-2025-55182 / CVE-2025-66478, an
unauthenticated RCE in React Server Components) to get root code execution inside the container.
Because the container ran as root with the entire repo bind-mounted read-write, the RCE became
root-owned file writes on the host (webshells, a cryptominer that OOM'd the box).

`next` is patched (>= 15.1.9). The `Dockerfile` and `docker-compose.yml` are hardened to contain
the *next* unknown RCE, not just this one:

- **Never** set `CMD` to `bun run dev` / `next dev` in the production `Dockerfile`. Dev servers
  auto-compile any file dropped on disk — that's what turned this RCE into a persistent webshell.
  Only `next build` + `next start` (or a static export) may ship.
- **Never** bind-mount the repo into the prod container (`volumes: - .:/app/...`). Code is
  `COPY`'d into the image at build time. RCE-with-arbitrary-host-write requires a writable mount;
  don't hand the attacker one.
- The runtime container runs as `USER bun` (non-root), with `read_only: true` root FS,
  `cap_drop: [ALL]`, `no-new-privileges`, and resource limits (`mem_limit`, `cpus`, `pids_limit`)
  so a future RCE can't OOM the host or persist writes.
- The port is published as `127.0.0.1:3000:3000` only — never `0.0.0.0`/bare `3000:3000`. A
  reverse proxy (Caddy/nginx) handles TLS and sits in front; the app must not be directly
  internet-reachable.
- `restart: unless-stopped`, not `restart: always` — so a deliberate stop during an incident
  actually stays stopped instead of a compromised container resurrecting on reboot.
- `docker-compose.dev.yml` (bind mount, `next dev`) is fine for **local development only** —
  it must never be the file used to deploy to the public host.

Before deploying, deploy only from committed, reviewed `main` — the original incident happened
because the dangerous `CMD bun run dev` flip lived only in the server's uncommitted working tree,
invisible to code review. Config drift on the live box is the actual root cause; patching one CVE
without fixing that is not a strategy.

Longer-term direction: consider a static export (`output: 'export'` in `next.config`) served by
Caddy/nginx or a CDN with no Node server at all, which eliminates the RSC/SSR RCE class entirely.
This repo currently ships the hardened containerized `next start` path instead.

See `website-hardening-handoff.md` (untracked, local) for the full incident writeup and
verification checklist to run on the deploy host.
