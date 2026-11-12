# THEATRE/LAB — The Gods Are Not to Blame

A GitHub-ready, static interactive theatre project inspired by Ola Rotimi's play. It is designed as a starting point for an IB CAS project: you can edit the writing, visuals, sound, timing and branching structure.

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Click **Enter the story**.
4. The story has 12 chapters. Each chapter runs for five minutes, then pauses and presents three choices (about 60 minutes total).
5. Choices affect later scene text, unlock some alternative responses, build character/kingdom themes and influence the final ending. Progress is saved in the browser's local storage.

### Test mode
For quick testing, add `?test=1` to the URL, for example:
`http://localhost:8000/?test=1`

Test mode uses 15-second chapters. Remove `?test=1` to restore the five-minute experience.

## Publish with GitHub Pages
1. Create a new GitHub repository (for example, `interactive-theatre-gods-not-to-blame`).
2. Upload all files and folders from this project to the repository root. Do not upload only the ZIP.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for GitHub Pages to publish. The public website URL will appear in the Pages section.

The project is plain HTML, CSS and JavaScript; no build tools, server or API keys are required.

## Edit the story
- `index.html` — page structure and visible labels.
- `styles.css` — colours, typography, layout and transitions.
- `script.js` — chapter writing, choices, branching scene variations, timer, narration and endings.
- `assets/audio/` — place audio files you record or have permission to use. See the folder README.

### Change the chapter timer
At the top of `script.js`, edit:
`const CHAPTER_SECONDS = new URLSearchParams(location.search).has("test") ? 15 : 300;`
`300` means five minutes. Keep `15` as the testing duration if useful.

### Add your own actor recordings
The current voice option uses the browser's built-in speech synthesis. It is a temporary narration feature, not a real actor recording. To use actor recordings, add licensed/consented `.mp3` or `.ogg` files to `assets/audio/` and update the scene renderer in `script.js` to play them. Get clear permission from performers before publishing their voices.

### Add or change story paths
Each chapter has three `choices`. Each choice has:
- `title`, `desc`, and `tag` — what the audience sees.
- `effects` — values that build the audience's story profile.
- `branch` — a route marker.
- `ending` — only used for the final chapter.

`sceneVariant()` checks earlier choices' accumulated effects and changes later scene text. Extend that function or add new route-specific scenes to make branches more distinct.

## Important notes
- This is an original educational adaptation inspired by the play; it does not reproduce the original script or dialogue.
- The current sound option creates a subtle ambient drone with Web Audio. It is not a recording of traditional music.
- This is a single-player prototype. Each visitor makes their own choices in their own browser; there is no shared live audience vote or account system yet.
- Saved progress is local to the browser and device. Clearing browser storage will clear progress.
- Use only original or properly licensed images, music, sound effects and actor recordings.
- For your CAS evidence, document your research, scriptwriting, collaboration, rehearsals, accessibility choices, audience testing and revisions. Confirm your CAS plan with your coordinator.

## Suggested project roadmap
1. **Story research:** check the play's plot, characters, context and themes using your school copy and reliable sources.
2. **Script adaptation:** write original narration and dialogue; keep a clear record of what you changed and why.
3. **Branch design:** draw a flowchart of choices and outcomes before adding more routes.
4. **Performance:** recruit collaborators and record short character performances with consent.
5. **Design:** create original scene artwork, sound and accessible captions.
6. **Audience testing:** invite a small group to try different paths, gather feedback and improve the experience.
7. **Reflection:** evaluate how audience choices changed their understanding of fate, free will and responsibility.

## Credits
Project scaffold: THEATRE/LAB. Adaptation concept inspired by *The Gods Are Not to Blame* by Ola Rotimi. All newly written website text is original.
