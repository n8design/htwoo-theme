# htwoo-theme

The skin of the [htwoo.io](https://htwoo.io/) website: its layouts, partials and components, written as a
[Pattern Dump](https://www.npmjs.com/package/pattern-dump) pattern package with a workbench of its own.
The website (`website/` in [n8design/htwoo](https://github.com/n8design/htwoo)) uses it as a git submodule
through a `file:` dependency; it has no design of its own.

## Use

```bash
npm ci            # also builds the helpers (prepare)
npm run dev       # the workbench at http://localhost:4000/
npm run build     # the workbench snapshot in dist/workbench
npm run audit     # the components' static checks
npm run typecheck
```

Node 24. Pattern Dump is pinned at an exact version in `package.json`.

## What's in it

| Folder | |
|---|---|
| `src/patterns/layouts/` | `page`, `listing`, `home`, `supporters`: the layouts a page names with `layout:` |
| `src/patterns/partials/` | `base` (the frame), `header`, `nav`, `head` |
| `src/patterns/components/` | `cover`, `figure`, `supporter`, `supporters`, `list-card` |
| `src/patterns/views/` | `list`: how a folder's listing shows its pages |
| `src/styles/` | the Sass, one file per component; `document/` is the base layer every page shares |
| `src/scripts/site.ts` | swup page transitions and the menu button |
| `helpers/` | Handlebars helpers in TypeScript, built to `dist/helpers.js` (a package's helpers ship compiled) |
| `assets/htwoo-theme/` | the logo and the workbench's sample images, served at `/assets/htwoo-theme/` |
| `site-root/` | files served at the site's root: icons, `site.webmanifest`, the typography.com font package `889032` |
| `themes/` | the workbench's preview theme |

`package.json` `patternDump` names these folders once, for the workbench and for the website.

While working on the theme inside the website, run `npm run watch:helpers` here beside the website's `pd dev`
when you change a helper.

## How a change reaches htwoo.io

1. A pull request here, merged with a merge commit (no squash, no rebase): htwoo pins this repository by SHA.
2. In [n8design/htwoo](https://github.com/n8design/htwoo), bump the pin to the new commit on `main`, in its own
   commit, as a pull request merged with a merge commit: `chore(deps): Bump htwoo-theme to <short sha>`. Merging
   it deploys the site. The steps are in htwoo's [CONTRIBUTING.md](https://github.com/n8design/htwoo/blob/main/CONTRIBUTING.md#website).

To see a change in the website before that: in an htwoo checkout, `website/theme` is this repository; check out
your branch there, run `npm ci` here, and the website's `pd dev` (`cd website && npm run dev`) shows it.
