module.exports = {
  "update_url": "https://clients2.google.com/service/update2/crx",
  "version": "8.15.1",
  "content_scripts": [
    {
      "matches": [
        "<all_urls>"
      ]
    },
    {
      "match_about_blank": true,
      "all_frames": true,
      "matches": [
        "<all_urls>"
      ]
    }
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "assets/icon.png",
      "19": "assets/icon.png",
      "24": "assets/icon.png",
      "38": "assets/icon.png",
      "48": "assets/icon.png",
      "128": "assets/icon.png"
    }
  },
  "options_ui": {
    "page": "options.html",
    "open_in_tab": true
  },
  "background": {
    "service_worker": "background.js"
  },
  "manifest_version": 3,
  "homepage_url": "https://saladict.aichatone.com/",
  "minimum_chrome_version": "88",
  "name": "__MSG_extension_name__",
  "short_name": "__MSG_extension_short_name__",
  "description": "__MSG_extension_description__",
  "default_locale": "en",
  "icons": {
    "16": "assets/icon.png",
    "48": "assets/icon.png",
    "128": "assets/icon.png"
  },
  "commands": {
    "toggle-active": {
      "description": "__MSG_command_toggle_active__"
    },
    "toggle-instant": {
      "description": "__MSG_command_toggle_instant__"
    },
    "search-clipboard": {
      "description": "__MSG_command_search_clipboard__"
    },
    "open-pdf": {
      "description": "__MSG_command_open_pdf__"
    },
    "open-quick-search": {
      "description": "__MSG_command_open_quick_search__"
    },
    "open-google": {
      "description": "__MSG_command_open_google__"
    },
    "open-caiyun": {
      "description": "__MSG_command_open_caiyun__"
    },
    "next-history": {
      "description": "__MSG_command_next_history__"
    },
    "prev-history": {
      "description": "__MSG_command_prev_history__"
    },
    "next-profile": {
      "description": "__MSG_command_next_profile__"
    },
    "prev-profile": {
      "description": "__MSG_command_prev_profile__"
    },
    "profile-1": {
      "description": "__MSG_command_profile_1__"
    },
    "profile-2": {
      "description": "__MSG_command_profile_2__"
    },
    "profile-3": {
      "description": "__MSG_command_profile_3__"
    },
    "profile-4": {
      "description": "__MSG_command_profile_4__"
    },
    "profile-5": {
      "description": "__MSG_command_profile_5__"
    },
    "add-notebook": {
      "description": "__MSG_command_add_notebook__"
    }
  },
  "web_accessible_resources": [
    {
      "resources": [
        "assets/*",
        "audio-control.html",
        "quick-search.html"
      ],
      "matches": [
        "<all_urls>"
      ]
    }
  ],
  "permissions": [
    "alarms",
    "contextMenus",
    "notifications",
    "storage",
    "tabs",
    "declarativeNetRequestWithHostAccess",
    "scripting",
    "unlimitedStorage",
    "webRequest",
    "cookies",
    "offscreen"
  ],
  "optional_permissions": [
    "clipboardWrite",
    "clipboardRead"
  ],
  "declarative_net_request": {
    "rule_resources": [
      {
        "id": "ruleset",
        "enabled": true,
        "path": "assets/net_request_rules.json"
      }
    ]
  },
  "host_permissions": [
    "<all_urls>"
  ],
  "content_security_policy": {
    "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';"
  },
  "incognito": "split"
}
