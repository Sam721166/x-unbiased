// Toggles classes on <html>; all actual hiding/blurring lives in content.css.
const DEFAULTS = {
  enabled: true,
  hideLikes: true,
  hideComments: true,
  hideImpressions: true,
  hideReposts: true,
  blurName: true,
  blurBadge: true,
  blurAvatar: true,
  blurTime: true,
};

const CLASS_FOR = {
  enabled: "xu-on",
  hideLikes: "xu-hide-likes",
  hideComments: "xu-hide-comments",
  hideImpressions: "xu-hide-impressions",
  hideReposts: "xu-hide-reposts",
  blurName: "xu-blur-name",
  blurBadge: "xu-blur-badge",
  blurAvatar: "xu-blur-avatar",
  blurTime: "xu-blur-time",
};

function apply(settings) {
  const root = document.documentElement;
  for (const key of Object.keys(CLASS_FOR)) {
    root.classList.toggle(CLASS_FOR[key], !!settings[key]);
  }
}

function load() {
  chrome.storage.sync.get(DEFAULTS, apply);
}

load();
chrome.storage.onChanged.addListener((_changes, area) => {
  if (area === "sync") load();
});
