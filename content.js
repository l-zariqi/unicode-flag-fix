function replaceFlagEmojis() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let nodesToReplace = [];

  // Regular expression to match flag emojis
  const flagRegex = /[\u{1F1E6}-\u{1F1FF}]{2}/gu;

  while (walker.nextNode()) {
    const node = walker.currentNode;
    let text = node.nodeValue;

    // Check if the text contains any flag emoji
    if (flagRegex.test(text)) {
      nodesToReplace.push({ node, text });
    }
  }

  for (const { node, text } of nodesToReplace) {
    // Create a new span to hold the modified content
    const span = document.createElement("span");

    // Use Twemoji to parse the text and replace flag emojis with images
    span.innerHTML = twemoji.parse(text, {
      folder: 'svg',
      ext: '.svg',
      className: 'twemoji',
      size: '72x72', // Adjust size as needed
    });

    // Replace the original node with the new span
    node.replaceWith(span);
  }
}

// Run after page load
window.onload = () => {
  replaceFlagEmojis();
  const observer = new MutationObserver(replaceFlagEmojis);
  observer.observe(document.body, { childList: true, subtree: true });
};