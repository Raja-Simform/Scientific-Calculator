// Calculator constants
const ERROR_MESSAGE = "Error";

// History constants
const HISTORY_MAX_COUNT = 5;
const HISTORY_STORAGE_KEY = "historyKey";
const DISPLAY_BLOCK = "block";
const DISPLAY_NONE = "none";

// Memory constants
const MEMORY_STORAGE_KEY = "memoryKey";
const MEMORY_BTN_SELECTOR = ".memory-btn";
const BTN_MC = "MC";
const BTN_MR = "MR";
const BTN_MPLUS = "M+";
const BTN_MMINUS = "M-"; 
const BTN_MS = "MS";
const DISABLED_CLASS = "disabled";

// Mode constants
const TOGGLE_BTN_SELECTOR = ".toggle-btn";
const UNIT_SELECTOR = ".unit";
const BTN_DEGREE = "degree";
const BTN_FE = "F-E";
const MODE_DEG = "DEG";
const MODE_RAD = "RAD";
const CUBE_DISPLAY = "x³";
const SQUARE_DISPLAY = "x²";
const CUBE_ROOT_DISPLAY = "∛x";
const SQUARE_ROOT_DISPLAY = "√x";

// Dropdown constants
const TRIGNO_DROPDOWN_ID = "trigno-myDropdown";
const FUNC_DROPDOWN_ID = "func-myDropdown";
const TRIGNO_DROPBTN_SELECTOR = ".trigno-dropbtn";
const FUNC_DROPBTN_SELECTOR = ".func-dropbtn";
const SHOW_TRIGNO_CLASS = "show-trigno";
const SHOW_FUNC_CLASS = "show-func";

// CSS Classes and Selectors
const CALCULATOR_SELECTOR = ".calculator";
const HISTORY_PANEL_SELECTOR = ".history-panel";
const HISTORY_TOGGLE_BTN_SELECTOR = ".history-toggle-btn";
const CLEAR_HISTORY_BTN_SELECTOR = ".clear-history-btn";
const HISTORY_LIST_SELECTOR = ".history-list";
const NO_HISTORY_CLASS = "no-history";
const HISTORY_ITEM_CLASS = "history-item";
const KEYPAD_SELECTOR = ".keypad";
const TRIGNO_DROPDOWN_SELECTOR = ".trigno-dropdown";
const FUNC_DROPDOWN_SELECTOR = ".func-dropdown";

// Key constants
const ENTER_KEY = "Enter";
const BACKSPACE_KEY = "Backspace";
const EQUALS_KEY = "=";

// Button values
const BTN_EQUALS = "=";
const BTN_BACKSPACE = "backspace";
const BTN_2ND = "2nd";
const BTN_SIN = "sin";
const BTN_COS = "cos";
const BTN_TAN = "tan";
const BTN_CLEAR = "C";
const BTN_E = "e";
const BTN_FLOOR = "floor";
const BTN_CEIL = "ceil";
const BTN_LOG = "log";
const BTN_LN = "ln";
const BTN_ABS = "abs";
const BTN_SQUARE = "square";
const BTN_SQUAREROOT = "squareroot";
const BTN_TENX = "10^x";
const BTN_XY = "xy";
const BTN_INVERSE = "inverse";
const BTN_SIGN_CHANGE = "+/-";
const BTN_FACTORIAL = "factorial";
const BTN_PI = "pi";
const BTN_EXPONENTIAL = "exponential";

// Allowed keys set
const ALLOWED_KEYS = ["Enter", "Backspace", "(", ")", "*", "-", "+", "/", ".", "="];

// Math operations constants
const REGEX_NUMBER_END = /(-?\d+(\.\d+)?)$/;
const REGEX_NUMBER_DECIMAL_END = /(\d+(\.\d+)?)$/;
const REGEX_POWER_2_OR_3 = /\*\*3$|\*\*2$/;
const REGEX_SUPERSCRIPT_2_OR_3 = /[²³]$/;
const REGEX_OPERATOR_END = /[*+\-/^]$/;
const REGEX_OPERATOR_OR_OPEN_PAREN = /[\+\-\*\/\(]$/;

// Math symbols and operations
const SQUARE_POWER = "**2";
const CUBE_POWER = "**3";
const SUPERSCRIPT_2 = "²";
const SUPERSCRIPT_3 = "³";
const POWER_10 = "10**";
const DISPLAY_POWER_10 = "10^";
const POWER_OPERATOR = "**";
const DISPLAY_POWER = "^";
const MATH_PI = "Math.PI";
const DISPLAY_PI = "π";
const MATH_E = "Math.E";
const DISPLAY_E = "e";
const SINE_DEG = "Math.sin((Math.PI/180)*";
const SINE = "Math.sin(";
const DISPLAY_SINE = "sin(";
const COSINE_DEG = "Math.cos((Math.PI/180)*";
const COSINE = "Math.cos(";
const DISPLAY_COSINE = "cos(";
const TANGENT_DEG = "Math.tan((Math.PI/180)*";
const TANGENT = "Math.tan(";
const DISPLAY_TANGENT = "tan(";
const FLOOR = "Math.floor(";
const DISPLAY_FLOOR = "floor(";
const CEIL = "Math.ceil(";
const DISPLAY_CEIL = "ceil(";
const LOG10 = "Math.log10(";
const DISPLAY_LOG = "log(";
const LN = "Math.log(";
const DISPLAY_LN = "ln(";
const ABS = "Math.abs(";
const DISPLAY_ABS = "abs(";
const CUBE_ROOT = "Math.cbrt(";
const DISPLAY_CUBE_ROOT = "∛(";
const SQUARE_ROOT = "Math.sqrt(";
const DISPLAY_SQUARE_ROOT = "√(";
const EMPTY_STRING = "";

export { 
  ERROR_MESSAGE,
  HISTORY_MAX_COUNT,
  HISTORY_STORAGE_KEY,
  DISPLAY_BLOCK,
  DISPLAY_NONE,
  MEMORY_STORAGE_KEY,
  MEMORY_BTN_SELECTOR,
  BTN_MC,
  BTN_MR,
  BTN_MPLUS,
  BTN_MMINUS,
  BTN_MS,
  DISABLED_CLASS,
  TOGGLE_BTN_SELECTOR,
  UNIT_SELECTOR,
  BTN_DEGREE,
  BTN_FE,
  MODE_DEG,
  MODE_RAD,
  CUBE_DISPLAY,
  SQUARE_DISPLAY,
  CUBE_ROOT_DISPLAY,
  SQUARE_ROOT_DISPLAY,
  TRIGNO_DROPDOWN_ID,
  FUNC_DROPDOWN_ID,
  TRIGNO_DROPBTN_SELECTOR,
  FUNC_DROPBTN_SELECTOR,
  SHOW_TRIGNO_CLASS,
  SHOW_FUNC_CLASS,
  CALCULATOR_SELECTOR,
  HISTORY_PANEL_SELECTOR,
  HISTORY_TOGGLE_BTN_SELECTOR,
  CLEAR_HISTORY_BTN_SELECTOR,
  HISTORY_LIST_SELECTOR,
  NO_HISTORY_CLASS,
  HISTORY_ITEM_CLASS,
  KEYPAD_SELECTOR,
  TRIGNO_DROPDOWN_SELECTOR,
  FUNC_DROPDOWN_SELECTOR,
  ENTER_KEY,
  BACKSPACE_KEY,
  EQUALS_KEY,
  BTN_EQUALS,
  BTN_BACKSPACE,
  BTN_2ND,
  BTN_SIN,
  BTN_COS,
  BTN_TAN,
  BTN_CLEAR,
  BTN_E,
  BTN_FLOOR,
  BTN_CEIL,
  BTN_LOG,
  BTN_LN,
  BTN_ABS,
  BTN_SQUARE,
  BTN_SQUAREROOT,
  BTN_TENX,
  BTN_XY,
  BTN_INVERSE,
  BTN_SIGN_CHANGE,
  BTN_FACTORIAL,
  BTN_PI,
  BTN_EXPONENTIAL,
  ALLOWED_KEYS,
  REGEX_NUMBER_END,
  REGEX_NUMBER_DECIMAL_END,
  REGEX_POWER_2_OR_3,
  REGEX_SUPERSCRIPT_2_OR_3,
  REGEX_OPERATOR_END,
  REGEX_OPERATOR_OR_OPEN_PAREN,
  SQUARE_POWER,
  CUBE_POWER,
  SUPERSCRIPT_2,
  SUPERSCRIPT_3,
  POWER_10,
  DISPLAY_POWER_10,
  POWER_OPERATOR,
  DISPLAY_POWER,
  MATH_PI,
  DISPLAY_PI,
  MATH_E,
  DISPLAY_E,
  SINE_DEG,
  SINE,
  DISPLAY_SINE,
  COSINE_DEG,
  COSINE,
  DISPLAY_COSINE,
  TANGENT_DEG,
  TANGENT,
  DISPLAY_TANGENT,
  FLOOR,
  DISPLAY_FLOOR,
  CEIL,
  DISPLAY_CEIL,
  LOG10,
  DISPLAY_LOG,
  LN,
  DISPLAY_LN,
  ABS,
  DISPLAY_ABS,
  CUBE_ROOT,
  DISPLAY_CUBE_ROOT,
  SQUARE_ROOT,
  DISPLAY_SQUARE_ROOT,
  EMPTY_STRING
};