function replaceFlagEmojis() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let nodesToReplace = [];

  // Match regional indicator pairs (flags)
  const flagRegex = /([\u{1F1E6}-\u{1F1FF}]{2})/gu;

  while (walker.nextNode()) {
    const node = walker.currentNode;
    let text = node.nodeValue;

    if (flagRegex.test(text)) {
      nodesToReplace.push({ node, text });
    }
  }

  for (const { node, text } of nodesToReplace) {
    const html = twemoji.parse(text, {
      folder: "svg",
      ext: ".svg",
      className: "twemoji",
      size: "72x72",
    });

    const fragment = document.createElement("span");
    fragment.innerHTML = html;

    node.replaceWith(...fragment.childNodes);
  }
}

window.onload = () => {
  replaceFlagEmojis();
  const observer = new MutationObserver(replaceFlagEmojis);
  observer.observe(document.body, { childList: true, subtree: true });
};