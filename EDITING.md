# Editing the site text

All of the site's wording lives in one file: [`content/en.json`](content/en.json).
Nothing else needs touching to change copy.

There are two ways to edit it.

## 1. In the browser (no code)

1. Go to **https://www.mewavalley.com/edit**
2. Enter the editor password
3. You land back on the site with editing switched on — every editable phrase
   gets a dashed outline
4. Click any text, type over it, press Enter
5. Changed text is highlighted and the bar at the bottom counts your unsaved edits
6. When you're happy, press **Publish**

Publishing commits `content/en.json` to GitHub, which triggers a Railway
deploy. The live site updates in roughly 30 seconds.

Notes:

- **Nothing is public until you press Publish.** Edits are held in your
  browser, so you can change your mind, close the tab, come back later and they
  will still be waiting.
- **Drafts are per-device.** Unpublished edits started on an iPad won't appear
  on a laptop. Published text syncs everywhere, because it lives in the repo.
- **Discard** throws away all unpublished edits and restores the live text.
- **Exit** signs you out. The session also expires by itself after 12 hours.
- Every publish is an ordinary git commit, so any change can be reviewed or
  reverted like any other.

## 2. In the repo

Edit `content/en.json` directly and commit. Same result — the editor and the
repo write to exactly the same file.

## Setup (one time)

The editor needs four environment variables set in the Railway dashboard
(Variables tab). None of them belong in the repo.

| Variable | What it is |
| --- | --- |
| `EDITOR_PASSWORD` | The password for `/edit`. Pick something long. |
| `EDITOR_SECRET` | A random string used to sign the login cookie. Any 32+ random characters. |
| `GITHUB_TOKEN` | A GitHub fine-grained personal access token, scoped to **only** the `mewavalleycoffee` repo, with **Contents: Read and write**. Nothing else. |
| `GITHUB_REPO` | `tmashworthab/mewavalleycoffee` |

`GITHUB_BRANCH` is optional and defaults to `main`.

Until `EDITOR_PASSWORD` is set, `/edit` reports that the editor is not
configured and no one can sign in. Until `GITHUB_TOKEN` is set, editing works
but Publish reports that publishing is not configured.

### Security notes

- The login cookie is `httpOnly` and signed; it cannot be read or forged from
  JavaScript, and it expires after 12 hours.
- The publish endpoint only accepts keys that already exist in
  `content/en.json`, so a signed-in session cannot invent new fields or inject
  structure.
- Editor code is only downloaded after a successful sign-in. Ordinary visitors
  receive none of it and make no extra requests.
- `/edit` is excluded from `robots.txt` and marked `noindex`.
- If the password is ever exposed, change `EDITOR_PASSWORD` **and**
  `EDITOR_SECRET` in Railway — changing the secret invalidates every existing
  session immediately.

## Adding a new piece of text

The editor only edits text that already exists. To add a new heading or
paragraph, add the key to `content/en.json` and render it in the relevant
component with a matching `data-ck` attribute, e.g.

```tsx
<p data-ck="premise.body3">{content.premise.body3}</p>
```

It then becomes editable in the browser automatically.
