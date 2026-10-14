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

const GROUPS = [
  {
    label: "Hide",
    rows: [
      ["hideLikes", "Likes"],
      ["hideComments", "Comments"],
      ["hideImpressions", "Impressions"],
      ["hideReposts", "Reposts & quotes"],
    ],
  },
  {
    label: "Blur",
    rows: [
      ["blurName", "Username"],
      ["blurBadge", "Badge"],
      ["blurAvatar", "Profile picture"],
      ["blurTime", "Time of post"],
    ],
  },
];

const groupsEl = document.getElementById("groups");
const masterEl = document.getElementById("enabled");

function makeSwitch(key, checked) {
  const label = document.createElement("label");
  label.className = "switch";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.dataset.key = key;
  input.checked = checked;
  const track = document.createElement("span");
  track.className = "track";
  label.append(input, track);
  return label;
}

function render(settings) {
  groupsEl.textContent = "";
  for (const group of GROUPS) {
    const wrap = document.createElement("section");
    wrap.className = "group";

    const label = document.createElement("div");
    label.className = "group-label";
    label.textContent = group.label;

    const card = document.createElement("div");
    card.className = "card";

    for (const [key, name] of group.rows) {
      const row = document.createElement("div");
      row.className = "row";
      const text = document.createElement("span");
      text.textContent = name;
      row.append(text, makeSwitch(key, !!settings[key]));
      card.append(row);
    }

    wrap.append(label, card);
    groupsEl.append(wrap);
  }

  masterEl.checked = !!settings.enabled;
  document.body.classList.toggle("disabled", !settings.enabled);
}

document.addEventListener("change", (e) => {
  const input = e.target;
  if (!(input instanceof HTMLInputElement)) return;
  const key = input.id === "enabled" ? "enabled" : input.dataset.key;
  if (!key) return;
  if (key === "enabled") document.body.classList.toggle("disabled", !input.checked);
  chrome.storage.sync.set({ [key]: input.checked });
});

chrome.storage.sync.get(DEFAULTS, render);
