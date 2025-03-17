  function getHistory() {
    const savedHistory = localStorage.getItem("calculatorHistory");
    this.calc_history = savedHistory ? JSON.parse(savedHistory) : [];
  }
  function saveHistoryToStorage() {
    localStorage.setItem(
      "calculatorHistory",
      JSON.stringify(this.calc_history)
    );
  }
  function addToHistory(expression, result) {
    this.calc_history.unshift({
      expression,
      result: result.toString(),
    });
    if (this.calc_history.length > this.COUNT) {
      this.calc_history = this.calc_history.slice(
        0,
        this.COUNT
      );
    }
    this.saveHistoryToStorage();
  }

  function clearHistory(){
    this.calc_history = [];
    this.saveHistoryToStorage();
    const historyPanel = document.querySelector(".history-panel");
    if (historyPanel && historyPanel.style.display !== "none") {
      this.renderHistoryPanel();
    }
  }
  toggleHistoryDisplay() {
    const historyPanel = document.querySelector(".history-panel");
    if (historyPanel) {
      if (historyPanel.style.display === "none") {
        historyPanel.style.display = "block";
        this.renderHistoryPanel();
      } else {
        historyPanel.style.display = "none";
      }
    }
  }
  createHistoryPanel(){
    let panel = document.createElement("div");
    panel.className = "history-panel";
    document.querySelector(".calculator").appendChild(panel);
    this.renderHistoryPanel();
  }

  renderHistoryPanel() {
    const panel = document.querySelector(".history-panel");
    if (!panel) return;
    const historyList = panel.querySelector(".history-list");
    historyList.innerHTML = "";
    if (this.calc_history.length === 0) {
      historyList.innerHTML = '<p class="no-history">No calculations yet</p>';
      return;
    }
    this.calc_history.forEach((item) => {
      const listItem = document.createElement("div");
      listItem.className = "history-item";
      listItem.textContent = `${item.expression} = ${item.result}`;
      listItem.addEventListener("click", () => {
        this.evalstr= item.result;
        this.resultstr = item.result;
        this.updateDisplay();
    
        panel.style.display = "none";
      });
      historyList.appendChild(listItem);
    });
  }