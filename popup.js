document.getElementById('collectContent').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Inject content.js into the active tab
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js'],
  });

  chrome.tabs.sendMessage(tab.id, { message: 'collectContent' }, (response) => {
    if (response && response.text) {
      console.log(response.text);
    } else {
      console.error('Error: No response received from content script.');
    }
  });
});
