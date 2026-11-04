# Setting up the event portal backend on Cloudflare (no terminal needed)

About 15 minutes, all in the Cloudflare website. You need a free Cloudflare account (use the business's email) and the file
`worker/dashboard/worker.js` from this project (open it on GitHub and use "Copy raw file").

1. **Log in** at https://dash.cloudflare.com.
2. **Create the storage.** Left menu: *Storage & databases* > *Workers KV* > *Create* (or *Create instance*). Name it `spinpix-events`, then *Add*.
3. **Create the Worker.** Left menu: *Workers & pages* > *Create* > *Create Worker* (or *Start with Hello World*). Name it `spinpix-events`, then *Deploy*.
4. **Paste the code.** Click *Edit code*. Select everything in the editor, delete it, paste the whole of `worker.js`, then click *Deploy*.
5. **Connect the storage.** Open the Worker, then *Settings* > *Bindings* > *Add* > *KV namespace*. Set the variable name to exactly `EVENTS`
   (capitals), choose the `spinpix-events` namespace, and save/deploy.
6. **Add the two secrets.** In the Worker: *Settings* > *Variables and secrets* > *Add*. Choose type **Secret** each time:
   - `ADMIN_PASSWORD`: the password the team will use at `/admin`. Make it long and keep it in a password manager.
   - `TOKEN_SECRET`: any long random string (40+ characters; a password manager's generator is ideal). Nobody has to remember it.
   Save/deploy after adding them.
7. **Find the address.** On the Worker's main page, copy its `workers.dev` address (like `https://spinpix-events.your-name.workers.dev`).
   Open that address followed by `/api/health`. You should see `{"ok":true}`.
8. **Connect the website.** Put the address (not the secrets) in `apiUrl` in `src/config/site.ts` and merge. The site updates in a couple of minutes.
9. **Test.** Go to `/admin`, log in, create a test event, then log in at `/my-event` with the code and password it gives you.

Never put the two secrets in a chat, an email or GitHub. Menu names in Cloudflare change from time to time; if one looks different, the
same words (Workers, KV, Bindings, Variables and secrets) will still be nearby.

To change the admin password later: Worker > *Settings* > *Variables and secrets*, edit `ADMIN_PASSWORD`. Changing `TOKEN_SECRET` just logs everyone out.
If the website's address ever changes, add a text variable `ALLOWED_ORIGINS` listing the allowed addresses, comma separated.

The terminal route (for developers) is in the README.
