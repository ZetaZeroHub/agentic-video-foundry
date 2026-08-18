const copyButton = document.querySelector("[data-copy-button]");
const commandElement = document.querySelector("[data-install-command]");
const copyStatus = document.querySelector("#copy-status");
const header = document.querySelector("[data-header]");

const setCopyStatus = (message) => {
  if (copyStatus) copyStatus.textContent = message;
};

const selectCommandText = () => {
  if (!commandElement) return;
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(commandElement);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

copyButton?.addEventListener("click", async () => {
  const command = commandElement?.textContent?.trim();
  if (!command) return;

  try {
    await navigator.clipboard.writeText(command);
    setCopyStatus("安装命令已复制。直接粘贴到终端即可。");
  } catch {
    selectCommandText();
    setCopyStatus("浏览器未允许自动复制，命令已选中，请手动复制。");
  }
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
