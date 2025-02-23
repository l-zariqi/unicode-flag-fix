// Map of flag emojis to their corresponding image URLs
const flagMap = { 
  "🇦🇨": chrome.runtime.getURL("flags/ac.png"),
  "🇦🇩": chrome.runtime.getURL("flags/ad.png"),
  "🇦🇪": chrome.runtime.getURL("flags/ae.png"),
  "🇦🇫": chrome.runtime.getURL("flags/af.png"),
  "🇦🇬": chrome.runtime.getURL("flags/ag.png"),
  "🇦🇮": chrome.runtime.getURL("flags/ai.png"),
  "🇦🇱": chrome.runtime.getURL("flags/al.png"),
  "🇦🇲": chrome.runtime.getURL("flags/am.png"),
  "🇦🇴": chrome.runtime.getURL("flags/ao.png"),
  "🇦🇶": chrome.runtime.getURL("flags/aq.png"),
  "🇦🇷": chrome.runtime.getURL("flags/ar.png"),
  "🇦🇸": chrome.runtime.getURL("flags/as.png"),
  "🇦🇹": chrome.runtime.getURL("flags/at.png"),
  "🇦🇺": chrome.runtime.getURL("flags/au.png"),
  "🇦🇼": chrome.runtime.getURL("flags/aw.png"),
  "🇦🇽": chrome.runtime.getURL("flags/ax.png"),
  "🇦🇿": chrome.runtime.getURL("flags/az.png"),

  "🇧🇦": chrome.runtime.getURL("flags/ba.png"),
  "🇧🇧": chrome.runtime.getURL("flags/bb.png"),
  "🇧🇩": chrome.runtime.getURL("flags/bd.png"),
  "🇧🇪": chrome.runtime.getURL("flags/be.png"),
  "🇧🇫": chrome.runtime.getURL("flags/bf.png"),
  "🇧🇬": chrome.runtime.getURL("flags/bg.png"),
  "🇧🇭": chrome.runtime.getURL("flags/bh.png"),
  "🇧🇮": chrome.runtime.getURL("flags/bi.png"),
  "🇧🇯": chrome.runtime.getURL("flags/bj.png"),
  "🇧🇱": chrome.runtime.getURL("flags/bl.png"),
  "🇧🇲": chrome.runtime.getURL("flags/bm.png"),
  "🇧🇳": chrome.runtime.getURL("flags/bn.png"),
  "🇧🇴": chrome.runtime.getURL("flags/bo.png"),
  "🇧🇶": chrome.runtime.getURL("flags/bq.png"),
  "🇧🇷": chrome.runtime.getURL("flags/br.png"),
  "🇧🇸": chrome.runtime.getURL("flags/bs.png"),
  "🇧🇹": chrome.runtime.getURL("flags/bt.png"),
  "🇧🇻": chrome.runtime.getURL("flags/bv.png"),
  "🇧🇼": chrome.runtime.getURL("flags/bw.png"),
  "🇧🇾": chrome.runtime.getURL("flags/by.png"),
  "🇧🇿": chrome.runtime.getURL("flags/bz.png"),

  "🇨🇦": chrome.runtime.getURL("flags/ca.png"),
  "🇨🇨": chrome.runtime.getURL("flags/cc.png"),
  "🇨🇩": chrome.runtime.getURL("flags/cd.png"),
  "🇨🇫": chrome.runtime.getURL("flags/cf.png"),
  "🇨🇬": chrome.runtime.getURL("flags/cg.png"),
  "🇨🇭": chrome.runtime.getURL("flags/ch.png"),
  "🇨🇮": chrome.runtime.getURL("flags/ci.png"),
  "🇨🇰": chrome.runtime.getURL("flags/ck.png"),
  "🇨🇱": chrome.runtime.getURL("flags/cl.png"),
  "🇨🇲": chrome.runtime.getURL("flags/cm.png"),
  "🇨🇳": chrome.runtime.getURL("flags/cn.png"),
  "🇨🇴": chrome.runtime.getURL("flags/co.png"),
  "🇨🇵": chrome.runtime.getURL("flags/cp.png"),
  "🇨🇷": chrome.runtime.getURL("flags/cr.png"),
  "🇨🇺": chrome.runtime.getURL("flags/cu.png"),
  "🇨🇻": chrome.runtime.getURL("flags/cv.png"),
  "🇨🇼": chrome.runtime.getURL("flags/cw.png"),
  "🇨🇽": chrome.runtime.getURL("flags/cx.png"),
  "🇨🇾": chrome.runtime.getURL("flags/cy.png"),
  "🇨🇿": chrome.runtime.getURL("flags/cz.png"),

  "🇩🇪": chrome.runtime.getURL("flags/de.png"),
  "🇩🇬": chrome.runtime.getURL("flags/dg.png"),
  "🇩🇯": chrome.runtime.getURL("flags/dj.png"),
  "🇩🇰": chrome.runtime.getURL("flags/dk.png"),
  "🇩🇲": chrome.runtime.getURL("flags/dm.png"),
  "🇩🇴": chrome.runtime.getURL("flags/do.png"),
  "🇩🇿": chrome.runtime.getURL("flags/dz.png"),

  "🇺🇸": chrome.runtime.getURL("flags/us.png"),
  "🇬🇧": chrome.runtime.getURL("flags/gb.png"),
  "🇫🇷": chrome.runtime.getURL("flags/fr.png"),
  "🇮🇪": chrome.runtime.getURL("flags/ie.png"),
  "🇪🇺": chrome.runtime.getURL("flags/eu.png"),
  "🇺🇦": chrome.runtime.getURL("flags/ua.png"),
  "🇪🇸": chrome.runtime.getURL("flags/es.png")
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
        img.style.width = "2rem";
        img.style.height = "2rem";
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
