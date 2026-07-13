This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Production deployment (self-hosted)

This site runs as a hardened `next start` container behind a reverse proxy
(Nginx Proxy Manager) that lives on a **separate host** and terminates TLS.
Public traffic flows: `internet → NPM (TLS) → webserver:3000 → container`.
The container is never directly internet-reachable.

Security rationale for every setting lives in [`CLAUDE.md`](./CLAUDE.md) — read
it before changing `Dockerfile` or `docker-compose.yml`. The golden rule:
**deploy only from committed, reviewed `main`. Never hand-edit config on the
live box** (uncommitted drift is what caused the original compromise).

### First-time host setup

1. **Create the host-local `.env`** (gitignored; sets which interface Docker
   publishes port 3000 on). Copy the template and set the LAN IP of *this* box:

   ```bash
   cp .env.template .env
   ip -4 addr show          # find this host's LAN IP (e.g. 192.168.0.118 on ens18)
   # edit .env so WEB_BIND_IP=<that LAN IP>
   ```

   If `.env` is missing, the bind falls back to `127.0.0.1` (loopback) — the app
   still runs but is unreachable from the proxy. It fails *closed*, never open.

2. **Reserve the IP.** The LAN interface is usually DHCP (`dynamic`), so the IP
   can change on lease renewal and silently break both `.env` and the firewall
   rule below. Add a **DHCP reservation** in your router binding this host's MAC
   to a fixed IP.

### Deploy / update

```bash
git pull                              # only deploy committed main
docker compose config                 # sanity-check: ports should show <LAN_IP>:3000:3000
docker compose up -d --build
docker compose ps                     # wait for (healthy)
```

Then point NPM's upstream at `http://<LAN_IP>:3000`.

### Restrict port 3000 to the reverse proxy only (firewall)

Binding to the LAN IP opens port 3000 to the *whole LAN*. Lock it to just the
NPM host. **Docker bypasses `ufw`**, so the rule must go in the `DOCKER-USER`
iptables chain (Docker evaluates it before its own rules and never clobbers it).

Replace `192.168.0.70` with your NPM host's IP:

```bash
# Drop anything to port 3000 that isn't from the NPM host:
sudo iptables -I DOCKER-USER -p tcp --dport 3000 ! -s 192.168.0.70 -j DROP

# Verify:
sudo iptables -L DOCKER-USER -n --line-numbers      # the DROP rule should be line 1
#   from NPM host:      curl http://<LAN_IP>:3000  -> works
#   from any other box: curl http://<LAN_IP>:3000  -> times out (DROP = silent)
#   docker compose ps                               -> still (healthy)

# Remove it (rollback):
sudo iptables -D DOCKER-USER -p tcp --dport 3000 ! -s 192.168.0.70 -j DROP
```

**Persistence:** iptables rules are lost on reboot and the `DOCKER-USER` chain
starts empty each time Docker starts, so the rule must be reapplied on boot.
Use a systemd oneshot that runs *after* `docker.service` (preferred — avoids
snapshotting Docker's auto-generated rules the way `iptables-persistent` can):

```ini
# /etc/systemd/system/docker-user-firewall.service
[Unit]
Description=Restrict container port 3000 to the reverse proxy
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
ExecStart=/sbin/iptables -I DOCKER-USER -p tcp --dport 3000 ! -s 192.168.0.70 -j DROP

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now docker-user-firewall.service
```

> This firewall rule is **host state, not in the repo** — it won't travel with a
> `git pull` to a new host. Re-apply it (and the `.env`) as part of provisioning
> any new deploy host.
