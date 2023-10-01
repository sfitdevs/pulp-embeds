(() => {
  const sourceURL = new URL(document.currentScript.src);
  const params = sourceURL.searchParams;
  const target = new URL(params.get("target"));
  const type = params.get("type") || 'code';
  const style = params.get("style");
  const styleClassName = `hljs-style-${style.replace(/[^a-zA-Z0-9]/g, '-')}`;
  const lightStyles = ['default', 'a11y-light', 'arduino-light', 'ascetic', 'atom-one-light', 'brown-paper', 'color-brewer', 'docco', 'foundation', 'github', 'googlecode', 'gradient-light', 'grayscale', 'idea', 'intellij-light', 'isbl-editor-light', 'kimbie-light', 'lightfair', 'magula', 'mono-blue', 'nnfx-light', 'panda-syntax-light', 'paraiso-light', 'purebasic', 'qtcreator-light', 'routeros', 'school-book', 'stackoverflow-light', 'tokyo-night-light', 'vs', 'xcode', 'base16/atelier-cave-light', 'base16/atelier-dune-light', 'base16/atelier-estuary-light', 'base16/atelier-forest-light', 'base16/atelier-heath-light', 'base16/atelier-lakeside-light', 'base16/atelier-plateau-light', 'base16/atelier-savanna-light', 'base16/atelier-seaside-light', 'base16/atelier-sulphurpool-light', 'base16/brush-trees', 'base16/classic-light', 'base16/cupcake', 'base16/cupertino', 'base16/default-light', 'base16/dirtysea', 'base16/edge-light', 'base16/equilibrium-gray-light', 'base16/equilibrium-light', 'base16/fruit-soda', 'base16/github', 'base16/google-light', 'base16/grayscale-light', 'base16/gruvbox-light-hard', 'base16/gruvbox-light-medium', 'base16/gruvbox-light-soft', 'base16/harmonic16-light', 'base16/heetch-light', 'base16/horizon-light', 'base16/humanoid-light', 'base16/ia-light', 'base16/material-lighter', 'base16/mexico-light', 'base16/one-light', 'base16/papercolor-light', 'base16/ros-pine-dawn', 'base16/sagelight', 'base16/shapeshifter', 'base16/silk-light', 'base16/solar-flare-light', 'base16/solarized-light', 'base16/summerfruit-light', 'base16/synth-midnight-terminal-light', 'base16/tomorrow', 'base16/unikitty-light', 'base16/windows-10-light', 'base16/windows-95-light', 'base16/windows-high-contrast-light', 'base16/windows-nt-light'];
  const isDarkStyle = !lightStyles.includes(style);
  const showBorder = params.get("showBorder") === "on";
  const showLineNumbers = params.get("showLineNumbers") === "on";
  const showFileMeta = params.get("showFileMeta") === "on";
  const showCopy = params.get("showCopy") === "on";
  const bold = params.get("showBold") === "on";
  const lineSplit = target.hash.split("-");
  const startLine = target.hash !== "" && lineSplit[0].replace("#l", "") || -1;
  const endLine = target.hash !== "" && lineSplit.length > 1 && lineSplit[1].replace("l", "") || startLine;
  const tabSize = target.searchParams.get("ts") || 8;
  const pathSplit = target.pathname.split("/");
  const key = pathSplit[1];
  const fileURL = target.href;
  const rawFileURL = `https://p.aadi.lol/api/${key}`;
  const pulpUrl = "https://p.aadi.lol/";
  const containerId = Math.random().toString(36).substring(2);
  document.currentScript.insertAdjacentHTML('afterend', `
<style>
  pre {
    font-weight: ${bold ? "bold" : "normal"};
  }
  .lds-ring {
    margin: 3rem auto;
    position: relative;
    width: 60px;
    height: 60px
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 48px;
    height: 48px;
    margin: 6px;
    border: 6px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #888 transparent transparent transparent
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -.45s
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -.3s
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -.15s
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  .emgithub-file {
    border-radius: 6px;
    overflow: hidden;
    margin: 1em 0;
  }
  .emgithub-file-light {
    border: 1px solid #ccc;
  }
  .emgithub-file-dark {
    border: 1px solid #555;
    background-color: #0d1117;
  }
  .emgithub-file .file-meta {
    padding: 10px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  }
  .emgithub-file .file-meta-light {
    color: #586069;
    background-color: #f7f7f7;
    border-top: 1px solid #ccc;
  }
  .emgithub-file .file-meta-dark {
    color: #f7f7f7;
    background-color: #586069;
    border-top: 1px solid #555;
  }
  .emgithub-file .file-meta a {
    font-weight: 600;
    text-decoration: none;
    border: 0;
  }
  .emgithub-file .file-meta-light a {
    color: #666;
  }
  .emgithub-file .file-meta-dark a {
    color: #fff;
  }
  @media (max-width: 575.98px) {
    .emgithub-file .hide-in-phone {
      display: none;
    }
  }
  .emgithub-file .code-area {
    position: relative;
  }
  .emgithub-file .code-area .copy-btn {
    display: none;
    border-radius: 3px;
    font: bold 13px monospace;
    text-decoration: none;
    position: absolute;
    top: 0px;
    right: 0px;
    margin: 0.4rem;
    padding: 0.3rem;
  }
  .emgithub-file:hover .code-area .copy-btn {
    display: block;
  }
  .emgithub-file .code-area .copy-btn-light {
    color: #586069;
    background-color: #f7f7f7;
    border: 1px solid #ccc;
  }
  .emgithub-file .code-area .copy-btn-dark {
    color: #f7f7f7;
    background-color: #586069;
    border: 1px solid #555;
  }
  .emgithub-file .code-area .copy-btn-light:hover {
    color: #f7f7f7;
    background-color: #586069;
  }
  .emgithub-file .code-area .copy-btn-dark:hover {
    color: #586069;
    background-color: #f7f7f7;
  }
  .emgithub-file .code-area .copy-btn-light:active {
    background-color: #252d36;
  }
  .emgithub-file .code-area .copy-btn-dark:active {
    background-color: #c4c4c4;
  }
  .emgithub-file .code-area pre {
    margin: 0;
    padding: 0;
    tab-size: ${tabSize};
  }
  .emgithub-file .code-area .hljs-ln-numbers {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: right;
    color: #aaa;
    vertical-align: top;
  }
  .emgithub-file .code-area td.hljs-ln-numbers {
    padding-right: 1rem;
  }
  .emgithub-file .code-area td.hljs-ln-line {
    line-height: 21px;
    font-size: 12px;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    border: 0;
  }
  .emgithub-file .code-area table.hljs-ln {
    border: 0;
    margin: 0;
  }
  .emgithub-file .code-area pre code.hljs {
    padding: 0.8em;
  }
  .emgithub-file .code-area .hide-line-numbers .hljs-ln-numbers {
    display: none;
  }
  .emgithub-file .html-area pre {
    padding: 0;
  }
  .emgithub-file .html-area .nb-output pre {
    padding: 16px;
  }
  .emgithub-file .html-area .nb-cell {
    position: relative;
  }
  .emgithub-file .html-area .nb-output:before,
  .emgithub-file .html-area .nb-input:before {
    position: absolute;
    font-family: monospace;
    color: #999;
    left: -7.5em;
    width: 7em;
    text-align: right;
    font-size: 13px;
  }
  .emgithub-file .html-area .nb-input:before {
    content: "In [" attr(data-prompt-number) "]:";
  }
  .emgithub-file .html-area .nb-output:before {
    content: "Out [" attr(data-prompt-number) "]:";
  }
  .emgithub-file .html-area.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }
  .emgithub-file .html-area.markdown-body .nb-notebook {
    padding-left: 65px;
  }
  @media (max-width: 767px) {
    .emgithub-file .html-area.markdown-body {
      padding: 15px;
    }
  }
</style>
<div id="${containerId}" class="emgithub-container">
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="emgithub-file emgithub-file-${isDarkStyle ? 'dark' : 'light'}"
    style="display:none;${showBorder ? '' : 'border:0'}">
    <div class="file-data ${styleClassName}">
      ${type === 'code' ? `<div class="code-area">
        ${showCopy ? `<a class="copy-btn copy-btn-${isDarkStyle ? 'dark' : 'light'}" href="javascript:void(0)">Copy</a>`
        : ''}
        <pre><code class="${showLineNumbers ? '' : 'hide-line-numbers'}"></code></pre>
      </div>`: ''}
      ${type === 'markdown' || type === 'ipynb' ? `
      <div class="html-area markdown-body"></div>` : ''}
    </div>
    ${showFileMeta ? `<div class="file-meta file-meta-${isDarkStyle ? 'dark' : 'light'}"
      style="${showBorder ? '' : 'border:0'}">
      <a target="_blank" href="${fileURL}!" style="float:right">view raw</a>
      <a id="filename" target="_blank" href="${fileURL}">${key}</a>
      delivered <span class="hide-in-phone">with ❤ </span>by <a target="_blank" href="${pulpUrl}">pulp</a>
    </div>`: ''
    }
  </div>
</div>`);
  const promises = [];
  const fetchFile = fetch(rawFileURL).then((response) => {
    if (!response.ok) return Promise.reject(`${response.status}\nFailed to download ${rawFileURL}`);
    return response.json();
  }).then(({ key, content, language }) => {
    document.getElementById("filename").innerText = `${key}.${language}`;
    return content;
  });

  promises.push(fetchFile);
  const HLJSURL = "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/highlight.min.js";
  const HLJSNumURL = "https://cdn.jsdelivr.net/npm/highlightjs-line-numbers.js@2.8.0/dist/highlightjs-line-numbers.min.js";
  const loadHLJS = typeof hljs != "undefined" && typeof hljs.highlightElement != "undefined" ? Promise.resolve() : loadScript(HLJSURL);
  const loadHLJSNum = loadHLJS.then(() => (typeof hljs.lineNumbersBlock != "undefined" ? Promise.resolve() : loadScript(HLJSNumURL)));
  fetch(`https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/${style}.min.css`).then((response) => response.text()).then((text) => {
    insertStyle(scopeCss(text, '.' + styleClassName));
  });
  promises.push(loadHLJSNum);
  Promise.allSettled(promises).then((result) => {
    const targetDiv = document.getElementById(containerId);
    const fetchSuccess = result[0].status === "fulfilled";
    let codeText;
    if (fetchSuccess) {
      codeText = result[0].value;
      if (codeText[codeText.length - 1] === "\n") {
        codeText = codeText.slice(0, -1);
      }
      let codeTextSplit = codeText.split("\n");
      if (startLine > 0) {
        codeTextSplit = codeTextSplit.slice(startLine - 1, endLine);
      }
      while (true) {
        const firstChars = codeTextSplit.filter(s => s.length > 0).map(s => s[0]);
        if (new Set(firstChars).size == 1 && [' ', '\t'].includes(firstChars[0])) {
          codeTextSplit = codeTextSplit.map(s => s.slice(1));
        } else {
          break;
        }
      }
      codeText = codeTextSplit.join("\n");
      codeText = codeText + "\n";
    } else {
      codeText = result[0].reason;
    }
    const codeTag = targetDiv.querySelector("code");
    codeTag.textContent = codeText;
    if (showCopy) {
      targetDiv.querySelector(".copy-btn").addEventListener('click', function (e) {
        e.preventDefault();
        e.cancelBubble = true;
        copyTextToClipboard(codeText);
      });
    }
    hljs.highlightElement(codeTag);
    hljs.lineNumbersBlock(codeTag, {
      singleLine: true,
      startFrom: (startLine > 0 && fetchSuccess) ? Number.parseInt(startLine) : 1
    });
    targetDiv.querySelector(".lds-ring").style.display = "none";
    targetDiv.querySelector(".emgithub-file").style.display = "block";
  });
})();

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function insertStyle(text) {
  const styleElement = document.createElement('style');
  styleElement.textContent = text;
  document.head.appendChild(styleElement);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text);
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('fallbackCopyTextToClipboard: Oops, unable to copy', err);
  }
  document.body.removeChild(textArea);
}

function scopeCss(styleText, scopeSelector) {
  const doc = document.implementation.createHTMLDocument("");
  const styleElement = document.createElement("style");
  styleElement.textContent = styleText;
  doc.head.appendChild(styleElement);
  const rules = [];
  for (const rule of styleElement.sheet.cssRules) {
    if (rule.constructor.name === 'CSSStyleRule') {
      const cssText = rule.cssText;
      const delimiterIndex = cssText.indexOf('{');
      const cssSelector = cssText.slice(0, delimiterIndex);
      const cssBody = cssText.slice(delimiterIndex);
      const cssSelectorPrepended = cssSelector.split(',').map(s => `${scopeSelector} ${s.trim()}`).join(',');
      rules.push(`${cssSelectorPrepended} ${cssBody}`);
    } else if (rule.constructor.name === 'CSSMediaRule') {
      console.error("NotImplementedError", rule);
    } else {
      console.error("NotImplementedError", rule);
    }
  }
  return rules.join('\n');
}
