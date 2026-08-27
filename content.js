(function () {
  // Use surrogate pairs so matching also works in older JavaScript engines.
  const flagRegex = /(?:\uD83C[\uDDE6-\uDDFF]){2}/g;
  const ignoredElements = new Set([
    "SCRIPT",
    "STYLE",
    "NOSCRIPT",
    "TEXTAREA",
    "INPUT",
    "OPTION",
    "SELECT",
  ]);

  function shouldIgnore(node) {
    const parent = node.parentElement;
    return (
      !parent ||
      ignoredElements.has(parent.tagName) ||
      parent.isContentEditable
    );
  }

  function replaceFlagInTextNode(node) {
    const text = node.nodeValue;
    flagRegex.lastIndex = 0;

    if (shouldIgnore(node) || !flagRegex.test(text)) {
      flagRegex.lastIndex = 0;
      return;
    }

    flagRegex.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match;

    while ((match = flagRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, match.index))
        );
      }

      const wrapper = document.createElement("span");
      wrapper.innerHTML = twemoji.parse(match[0], {
        folder: "svg",
        ext: ".svg",
        className: "twemoji",
        size: "72x72",
      });
      fragment.appendChild(wrapper.firstChild);
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(
        document.createTextNode(text.slice(lastIndex))
      );
    }

    node.replaceWith(fragment);
    flagRegex.lastIndex = 0;
  }

  function processNode(root) {
    if (!root || !document.body) {
      return;
    }

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          return shouldIgnore(node)
            ? NodeFilter.FILTER_REJECT
            : NodeFilter.FILTER_ACCEPT;
        },
      }
    );
    const textNodes = [];
    let node;

    while ((node = walker.nextNode()) !== null) {
      textNodes.push(node);
    }

    textNodes.forEach(replaceFlagInTextNode);
  }

  function start() {
    processNode(document.body);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            replaceFlagInTextNode(node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            processNode(node);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.body) {
    start();
  } else {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  }
})();