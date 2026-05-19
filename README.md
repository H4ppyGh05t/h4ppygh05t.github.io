# eugene.sec — Cybersecurity Blog

A clean, dark-themed static website built with pure HTML, CSS, and JavaScript.
Designed for cybersecurity blogging with a live Apple vulnerability feed powered by SOFA.

## 🚀 Deploy to GitHub Pages

1. Create a new repo called `yourusername.github.io`
2. Upload all these files to the repo
3. Go to **Settings → Pages → Source** and select `main` branch
4. Your site will be live at `https://yourusername.github.io/`

## 📁 Structure

```
├── index.html                      # Main page (blog + SOFA vuln feed)
├── css/
│   └── style.css                   # Cyber green dark theme
├── js/
│   └── script.js                   # SOFA feed fetcher + nav logic
├── posts/
│   └── zero-day-analysis.html      # Sample blog post
└── README.md
```

## ✍️ Adding New Posts

1. Copy `posts/zero-day-analysis.html` as a template
2. Edit the title, content, and meta info
3. Add a new blog card in `index.html` under the blog grid

## 📡 Live Vulnerability Feed

The site automatically fetches live data from `sofa.macadmins.io/v1/macos_data_feed.json`
and displays the latest macOS security patch info, CVE counts, and actively exploited vulnerabilities.

## 🎨 Customisation

- Edit colours in the `:root` CSS variables in `style.css`
- Update your name, bio, and social links in `index.html`
- Add/remove tool tags in the About section
- Change `--accent: #00e88f` to any colour you like

## License

MIT — use it however you like.
