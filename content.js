// Map of flag emojis to their corresponding image URLs
const flagMap = { 
  "🇺🇸": chrome.runtime.getURL("flags/us.png"),
  "🇬🇧": chrome.runtime.getURL("flags/gb.png")
};

// Function to replace flag emojis with images
function replaceFlagEmojis() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let nodesToReplace = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    let text = node.nodeValue;
    let hasEmoji = false;

    for (const [emoji, url] of Object.entries(flagMap)) {
      if (text.includes(emoji)) {
        hasEmoji = true;
      }
    }

    if (hasEmoji) {
      nodesToReplace.push({ node, text });
    }
  }

  for (const { node, text } of nodesToReplace) {
    // Create a new span to hold the modified content
    const span = document.createElement("span");

    // Split the text by emojis and process each part
    let remainingText = text;
    for (const [emoji, url] of Object.entries(flagMap)) {
      if (remainingText.includes(emoji)) {
        // Add text before the emoji
        const textBefore = remainingText.split(emoji)[0];
        if (textBefore) {
          span.appendChild(document.createTextNode(textBefore));
        }

        // Add the flag image
        const img = document.createElement("img");
        img.src = url;
        img.alt = emoji;
        img.style.width = "1.2rem";
        img.style.height = "1.2rem";
        img.style.verticalAlign = "middle";
        span.appendChild(img);

        // Update remaining text
        remainingText = remainingText.split(emoji)[1];
      }
    }

    // Add any remaining text after the last emoji
    if (remainingText) {
      span.appendChild(document.createTextNode(remainingText));
    }

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
