# Editing the site text

The site exists in three languages, and all of the wording lives in three files:

| File | Language | URL |
| --- | --- | --- |
| `content/en.json` | English | `mewavalley.com` |
| `content/ne.json` | Nepali | `mewavalley.com/ne` |
| `content/lt.json` | Lithuanian | `mewavalley.com/lt` |

They all hold the same set of keys, so a phrase has the same name in every
language. Nothing else needs touching to change copy.

## Editing in the browser (no code)

1. Go to **https://www.mewavalley.com/edit**
2. Enter your username and password
3. You land back on the site with editing switched on — every editable phrase
   gets a dashed outline
4. **Switch to the language you want to edit first**, using EN / NE / LT in the
   nav. The bar at the bottom shows which one you're editing.
5. Click any text, type over it, press Enter
6. Changed text is highlighted and the bar counts your unsaved edits
7. Press **Publish**

Publishing commits that language's file to GitHub, which triggers a Railway
deploy. The live site updates in roughly 30 seconds.

Notes:

- **Nothing is public until you press Publish.** Edits are held in your
  browser, so you can change your mind, close the tab and come back later.
- **Each language has its own drafts.** Unpublished Lithuanian edits stay put
  while you look at the English page, and publishing one language never
  touches another.
- **Drafts are per-device.** Unpublished edits started on an iPad won't appear
  on a laptop. Published text syncs everywhere, because it lives in the repo.
- **Discard** throws away unpublished edits *for the language you're on*.
- **Exit** signs you out. Sessions also expire by themselves after 12 hours.
- Every publish is a git commit recording who made it, so any change can be
  reviewed or reverted.

## Adding and removing editors

Editors are listed in the `EDITOR_USERS` variable in Railway, as
`username:password` pairs separated by commas:

```
EDITOR_USERS=tom:firstpassword,rasa:secondpassword
```

- **To add someone**, append `,theirname:theirpassword` and press Deploy.
- **To remove someone**, delete their pair and press Deploy. Any session they
  already had stops working immediately.
- Usernames are case-insensitive. Avoid commas and colons in passwords, since
  those separate the entries.

Passwords sit in the Railway dashboard in plain text, so only add people you'd
be comfortable giving dashboard access to. Every published commit records the
username, so you can always see who changed what.

## Translations

The Nepali and Lithuanian text was drafted by Claude and **has not been checked
by a native speaker**. Until it has, those pages carry a `noindex` tag, so
search engines ignore them — they work perfectly for anyone you send a direct
link to, but they won't show up in search results and can't embarrass you
there.

Once a speaker has been through a language in the editor and you're happy with
it, add this variable in Railway to let search engines index it:

```
NEXT_PUBLIC_INDEXED_LOCALES=en,lt
```

List whichever languages are ready, comma-separated. If the variable is absent,
only English is indexed. It's read at build time, so a deploy is needed for a
change to take effect.

## Setup (one time)

Environment variables, set in the Railway dashboard. None belong in the repo.

| Variable | What it is |
| --- | --- |
| `EDITOR_USERS` | `username:password` pairs, comma-separated. |
| `EDITOR_SECRET` | A random string used to sign login cookies. Any 32+ random characters. |
| `GITHUB_TOKEN` | A GitHub fine-grained token scoped to **only** this repo, with **Contents: Read and write**. |
| `GITHUB_REPO` | `tmashworthab/mewavalleycoffee` |
| `NEXT_PUBLIC_INDEXED_LOCALES` | Optional. Languages search engines may index. Defaults to `en`. |
| `GITHUB_BRANCH` | Optional. Defaults to `main`. |

`EDITOR_PASSWORD` from the original single-user setup still works and is
treated as the account `editor`, but `EDITOR_USERS` supersedes it.

Railway stages variable changes rather than applying them — after editing any
of these, press the **Deploy** button that appears at the top of the screen, or
nothing will change.

### Security notes

- Login cookies are `httpOnly` and signed; they cannot be read or forged from
  JavaScript, and they expire after 12 hours.
- Failed sign-ins never reveal whether the username or the password was wrong,
  and always take the same time.
- The publish endpoint only accepts keys that already exist, so a signed-in
  session cannot invent new fields or inject structure.
- Editor code is only downloaded after a successful sign-in. Ordinary visitors
  receive none of it and make no extra requests.
- `/edit` is excluded from `robots.txt` and marked `noindex`.
- If a password is exposed, change it **and** `EDITOR_SECRET` — changing the
  secret invalidates every existing session immediately.

## Adding a new piece of text

The editor only edits text that already exists. To add a new heading or
paragraph, add the key to **all three** content files and render it with a
matching `data-ck`:

```tsx
<p data-ck="premise.body3">{c.premise.body3}</p>
```

It then becomes editable in every language automatically.
