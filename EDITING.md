# Editing the site text

The site exists in three languages, and all of the wording lives in three files:

| File | Language | URL |
| --- | --- | --- |
| `content/en.json` | English | `mewavalley.com` |
| `content/np.json` | Nepali | `mewavalley.com/np` |
| `content/lt.json` | Lithuanian | `mewavalley.com/lt` |

They all hold the same set of keys, so a phrase has the same name in every
language. Nothing else needs touching to change copy.

## Editing in the browser (no code)

1. Go to **https://www.mewavalley.com/edit**
2. Enter your username and password
3. You land back on the site with editing switched on — every editable phrase
   gets a dashed outline
4. **Pick the language you want to edit** using the EN / NP / LT buttons at
   the left of the bar at the bottom. The highlighted one is what you are
   editing. A gold dot on another language means it has unpublished work
   waiting.
5. Click any text, type over it, press Enter
6. A small toolbar appears above whatever you clicked, with alignment, size
   and (on body text) list buttons
7. Changed text is highlighted and the bar counts your unsaved edits
8. Press **Publish**

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

## Formatting text

Clicking any text brings up a toolbar above it:

- **Alignment** — left, centre, right. Click the active one again to clear it.
- **Size** — a number from 1 to 12, with − and + either side of it. The number
  shown is always the field's current size, so if a heading reads 10 you can
  nudge it to 11 or down to 8 and know what you will get. These are steps on a
  proportioned ramp rather than free pixel values, so nothing you pick can look
  out of place, and large sizes shrink automatically on phones. The number is
  gold once you have overridden it and grey while it is still the design's own.
- **Typeface** — the **Aa** button. Five choices: Newsreader (the site's serif),
  Geist (its sans), Instrument Serif, Cormorant and Space Grotesk. Pick
  **Default** to go back. The three extra faces are only downloaded by visitors
  if a page actually uses one.
- **Bold, italic, underline** — the **B**, *I* and U buttons. These apply to
  the whole field, not to a selected word.
- **Colour** — the circular swatch. Five choices plus Default. Every option is
  legible on the site's dark background, which is why it is a fixed set rather
  than a full colour picker.
- **Lists** — bullet and numbered, on body text only. Clicking bullet while
  already bulleted removes it; clicking numbered while bulleted converts.

### Line breaks and paragraphs

Press Enter in body text for a new line, and Enter twice for a new paragraph
with a gap. What you see while editing is what gets published.

Formatting is **shared across all three languages**, because alignment and
size are design decisions rather than translation decisions — this stops the
three versions drifting apart visually. It is stored separately from the copy,
in `content/format.json`.

### Lists without the toolbar

Lists are plain text, so you can also just type them. Start a line with `- `
for a bullet or `1. ` for a number. Press Enter inside body text to start a
new line — headings commit on Enter instead, since they are single-line.

While you are editing you see the raw text (`- Washed`); visitors see a proper
bulleted list. Nothing you type is ever treated as code, so there is no way an
edit can break the page.

## Moving sections

Go to the **homepage** and press **Move sections** in the editor bar.

The page changes mode. Every section gets a dashed outline and a gold label in
its top-left corner — Hero, Why Nepal, Map, and so on. **Text is deliberately
not editable while you are in this mode**, so clicking a section picks it up
instead of putting a cursor in the words.

Two ways to move a section, and they do exactly the same thing:

- **Drag its label.** Press the label, move, and the section you are hovering
  is outlined in gold — that is where it will land. Let go to drop it. Drag
  near the top or bottom of the window and the page scrolls with you, so you
  can move a section past ones that are off screen.
- **Press the ↑ and ↓ arrows** on the label. Easier on a phone, and they work
  from the keyboard. On a page this tall, they are usually the quicker option.

The page rearranges as you go, so you see the result before committing to it.
Press **Done moving** to get back to editing text, then **Publish** when you
are happy, or **Discard** to put it back.

**Move sections** only appears on the homepage, because that is the only page
assembled from movable sections. The other pages are single pieces.

The page rearranges as you go so you can see the result before committing to
it. Press Publish when you are happy, or Discard to put it back.

The set of sections is fixed — each one is a designed piece of the page — so
you can reorder them but not invent new ones. Reordering applies to all three
languages at once, since it is a layout decision rather than a translation.

## Adding and removing editors

Editors are listed in the `EDITOR_USERS` variable in Railway, as
`username:password` pairs separated by commas:

```
EDITOR_USERS=tom:firstpassword,rasa:secondpassword
```

- **To add someone**, append `,theirname:theirpassword` and press **Deploy**.
  They can sign in straight away at `/edit` — nothing else to set up.
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
