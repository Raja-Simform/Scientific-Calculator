
class HistoryManager {
  constructor(calculator) {
    this.calculator = calculator;
    this.calc_history = [];
    this.COUNT = 5;
    

    this.getHistory = this.getHistory.bind(this);
    this.saveHistoryToStorage = this.saveHistoryToStorage.bind(this);
    this.addToHistory = this.addToHistory.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.toggleHistoryDisplay = this.toggleHistoryDisplay.bind(this);
    this.createHistoryPanel = this.createHistoryPanel.bind(this);
    this.renderHistoryPanel = this.renderHistoryPanel.bind(this);
    

    this.getHistory();
    
   
    const historyBtn = document.querySelector(".history-toggle-btn");
    if (historyBtn) {
      historyBtn.addEventListener("click", () => this.toggleHistoryDisplay());
    }
    
    const clearHistoryBtn = document.querySelector(".clear-history-btn");
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener("click", () => this.clearHistory());
    }
  }

  getHistory() {
    const savedHistory = localStorage.getItem("historyKey");
    this.calc_history = savedHistory ? JSON.parse(savedHistory) : [];
  }

  saveHistoryToStorage() {
    localStorage.setItem("historyKey", JSON.stringify(this.calc_history));
  }

  addToHistory(expression, result) {
    this.calc_history.unshift({
      expression,
      result: result.toString(),
    });
    
    if (this.calc_history.length > this.COUNT) {
      this.calc_history = this.calc_history.slice(0, this.COUNT);
    }
    
    this.saveHistoryToStorage();
  }

  clearHistory() {
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

  createHistoryPanel() {
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
        this.calculator.evalstr = item.result;
        this.calculator.resultstr = item.result;
        this.calculator.renderDisplay();
        panel.style.display = "none";
      });
      
      historyList.appendChild(listItem);
    });
  }
}

export default HistoryManager;