const STORAGE_KEY = "absensi-pro-v2";
const APP_BASE = window.location.pathname.includes("/website-pertama") ? "/website-pertama" : "";
const API_BASE = `${APP_BASE}/api`;
const AUTH_API_BASE = `${API_BASE}/auth`;

const ACCOUNT_LABELS = {
  admin: "Guru Halaqoh",
  manager: "Guru Halaqoh",
  staff: "Guru Halaqoh",
  guru: "Guru Halaqoh"
};

const LEGACY_ACCOUNT_USERNAMES = {
  "admin@kantor.id": "guruhalaqoh01",
  "manager@kantor.id": "guruhalaqoh02",
  "staff@kantor.id": "guruhalaqoh03"
};

const accountsSeed = [
  { role: "admin", username: "guruhalaqoh01", password: "admin123", name: "Nadia Putra", label: "Guru Halaqoh" },
  { role: "manager", username: "guruhalaqoh02", password: "manager123", name: "Bagas Mahendra", label: "Guru Halaqoh" },
  { role: "staff", username: "guruhalaqoh03", password: "staff123", name: "Citra Lestari", label: "Guru Halaqoh" }
];

const employeesSeed = [
  { id: "EMP-001", name: "Rina Putri", division: "Halaqoh Tahsin Akhwat", role: "Santri Tahsin" },
  { id: "EMP-002", name: "Bima Saputra", division: "Halaqoh Tahfizh Putra", role: "Santri Tahfizh" },
  { id: "EMP-003", name: "Dina Maharani", division: "Halaqoh Tahsin Akhwat", role: "Santri Tahsin" },
  { id: "EMP-004", name: "Yoga Pratama", division: "Halaqoh Tahfizh Putra", role: "Santri Tahfizh" },
  { id: "EMP-005", name: "Siska Lestari", division: "Halaqoh Adab Akhwat", role: "Santri Pembinaan" },
  { id: "EMP-006", name: "Adi Nugroho", division: "Halaqoh Tahfizh Putra", role: "Santri Tahfizh" }
];

const attendanceSeed = [
  { id: "ATT-001", employeeId: "EMP-001", date: "2026-05-13", checkIn: "07:23", status: "Hadir", note: "Hadir tepat waktu" },
  { id: "ATT-002", employeeId: "EMP-002", date: "2026-05-13", checkIn: "08:12", status: "Terlambat", note: "Datang setelah muraja'ah dimulai" },
  { id: "ATT-003", employeeId: "EMP-003", date: "2026-05-13", checkIn: "07:12", status: "Hadir", note: "Kehadiran paling awal" },
  { id: "ATT-004", employeeId: "EMP-004", date: "2026-05-13", checkIn: "-", status: "Sakit", note: "Tidak hadir karena sakit" },
  { id: "ATT-005", employeeId: "EMP-005", date: "2026-05-13", checkIn: "-", status: "Izin", note: "Izin karena sakit" },
  { id: "ATT-006", employeeId: "EMP-006", date: "2026-05-13", checkIn: "07:51", status: "Hadir", note: "Siap mengikuti setoran hafalan" },
  { id: "ATT-007", employeeId: "EMP-001", date: "2026-04-12", checkIn: "07:27", status: "Hadir", note: "Arsip bulan lalu" },
  { id: "ATT-008", employeeId: "EMP-002", date: "2026-03-12", checkIn: "07:58", status: "Hadir", note: "Arsip Maret" },
  { id: "ATT-009", employeeId: "EMP-003", date: "2026-02-15", checkIn: "07:35", status: "Hadir", note: "Arsip Februari" },
  { id: "ATT-010", employeeId: "EMP-004", date: "2026-01-18", checkIn: "-", status: "Sakit", note: "Arsip Januari" }
];

const reportsSeed = [
  { id: "REP-001", title: "Rekap kehadiran halaqoh tahfizh", type: "PDF", note: "Laporan rutin pekanan santri", createdAt: "2026-05-12 14:12" },
  { id: "REP-002", title: "Evaluasi ketepatan hadir bulanan", type: "XLS", note: "Ditinjau musyrif halaqoh", createdAt: "2026-05-11 10:05" },
  { id: "REP-003", title: "Daftar izin dan berhalangan aktif", type: "DOC", note: "Monitoring kehadiran santri berjalan", createdAt: "2026-05-10 09:40" }
];

const monthlySeed = [
  { month: "Jan", presentRate: 88 },
  { month: "Feb", presentRate: 91 },
  { month: "Mar", presentRate: 86 },
  { month: "Apr", presentRate: 93 },
  { month: "Mei", presentRate: 90 },
  { month: "Jun", presentRate: 94 }
];

const defaultState = {
  accounts: accountsSeed,
  employees: employeesSeed,
  attendance: attendanceSeed,
  reports: reportsSeed,
  monthlyStats: monthlySeed,
  activityLog: [
    { id: "LOG-001", text: "12 permintaan izin menunggu validasi", badge: "Perlu cek" },
    { id: "LOG-002", text: "Rekap kehadiran halaqoh subuh selesai diperbarui", badge: "Selesai" },
    { id: "LOG-003", text: "Data santri sakit hari ini sudah diperbarui", badge: "Stabil" }
  ]
};

const statusKeyMap = {
  hadir: "hadir",
  izin: "izin",
  sakit: "sakit",
  terlambat: "terlambat",
  wfh: "sakit",
  "halaqoh online": "sakit"
};

const statusClassMap = {
  Hadir: "hadir",
  Izin: "izin",
  Sakit: "sakit",
  Terlambat: "telat",
  "Halaqoh Online": "sakit"
};

const legacyDivisionMap = {
  Finance: "Halaqoh Tahsin Akhwat",
  Operasional: "Halaqoh Tahfizh Putra",
  Teknologi: "Halaqoh Tahfizh Putra",
  HR: "Halaqoh Adab Akhwat",
  Marketing: "Halaqoh Tahfizh Putra",
  "Customer Success": "Halaqoh Tahsin Akhwat"
};

const legacyRoleMap = {
  "Analis Keuangan": "Santri Tahsin",
  "Supervisor Lapangan": "Santri Tahfizh",
  "Staf Pajak": "Santri Tahsin",
  "Frontend Developer": "Santri Tahfizh",
  "HR Officer": "Santri Pembinaan",
  "Campaign Lead": "Santri Tahfizh",
  "Team Lead": "Santri Pembinaan"
};

const legacyNoteMap = {
  "Tepat waktu": "Hadir tepat waktu",
  "Macet perjalanan": "Datang setelah muraja'ah dimulai",
  "Check-in tercepat": "Kehadiran paling awal",
  "Remote project sprint": "Tidak hadir karena sakit",
  "Mengikuti halaqoh online": "Tidak hadir karena sakit",
  "Izin keluarga": "Izin karena sakit",
  "Briefing klien pagi": "Siap mengikuti setoran hafalan",
  "Validasi QA pagi": "Menyetorkan hafalan pagi"
};

let state = loadState();
let currentUser = null;

function isAdminRole(role) {
  return String(role || "").toLowerCase() === "admin";
}

function isCurrentUserAdmin() {
  return isAdminRole(currentUser?.role);
}

function canManageProtectedData() {
  return isCurrentUserAdmin();
}

const loginScreen = document.getElementById("login-screen");
const dashboardScreen = document.getElementById("dashboard-screen");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const loginSuccess = document.getElementById("login-success");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const forgotForm = document.getElementById("forgot-form");
const forgotMessage = document.getElementById("forgot-message");
const forgotUsernameInput = document.getElementById("forgot-username");
const forgotPasswordInput = document.getElementById("forgot-password");
const forgotPasswordConfirmInput = document.getElementById("forgot-password-confirm");
const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("signup-message");
const signupNameInput = document.getElementById("signup-name");
const signupRoleInput = document.getElementById("signup-role");
const signupUsernameInput = document.getElementById("signup-username");
const signupPasswordInput = document.getElementById("signup-password");
const signupPasswordConfirmInput = document.getElementById("signup-password-confirm");
const authPanels = document.querySelectorAll(".auth-panel");
const authSwitchLabel = document.getElementById("auth-switch-label");
const authSwitchButton = document.getElementById("auth-switch-button");
const authTargetButtons = document.querySelectorAll("[data-auth-target]");
const adminToolsCard = document.getElementById("admin-tools-card");
const adminAccountForm = document.getElementById("admin-account-form");
const adminAccountNameInput = document.getElementById("admin-account-name");
const adminAccountUsernameInput = document.getElementById("admin-account-username");
const adminAccountPasswordInput = document.getElementById("admin-account-password");
const adminAccountPasswordConfirmInput = document.getElementById("admin-account-password-confirm");
const adminAccountMessage = document.getElementById("admin-account-message");
const adminResetForm = document.getElementById("admin-reset-form");
const adminResetUsernameInput = document.getElementById("admin-reset-username");
const adminResetPasswordInput = document.getElementById("admin-reset-password");
const adminResetPasswordConfirmInput = document.getElementById("admin-reset-password-confirm");
const adminResetMessage = document.getElementById("admin-reset-message");
const adminEditPanel = document.getElementById("admin-edit-panel");
const adminEditForm = document.getElementById("admin-edit-form");
const adminEditIdInput = document.getElementById("admin-edit-id");
const adminEditNameInput = document.getElementById("admin-edit-name");
const adminEditUsernameInput = document.getElementById("admin-edit-username");
const adminEditMessage = document.getElementById("admin-edit-message");
const adminEditHint = document.getElementById("admin-edit-hint");
const adminEditCancelButton = document.getElementById("admin-edit-cancel");
const changePasswordForm = document.getElementById("change-password-form");
const changeCurrentPasswordInput = document.getElementById("change-current-password");
const changeNewPasswordInput = document.getElementById("change-new-password");
const changeNewPasswordConfirmInput = document.getElementById("change-new-password-confirm");
const changePasswordMessage = document.getElementById("change-password-message");
const userName = document.getElementById("user-name");
const userRole = document.getElementById("user-role");
const navButtons = document.querySelectorAll(".nav-button");
const pages = document.querySelectorAll(".page");
const logoutButton = document.getElementById("logout-btn");
const reportForm = document.getElementById("report-form");
const reportMessage = document.getElementById("report-message");
const employeeForm = document.getElementById("employee-form");
const attendanceForm = document.getElementById("attendance-form");
const employeeMessage = document.getElementById("employee-message");
const attendanceMessage = document.getElementById("attendance-message");
const employeeNameInput = document.getElementById("employee-name");
const employeeDivisionInput = document.getElementById("employee-division");
const employeeRoleInput = document.getElementById("employee-role");
const employeeSubmitButton = document.getElementById("employee-submit-button");
const employeeCancelButton = document.getElementById("employee-cancel-button");
const employeeList = document.getElementById("employee-list");
const reportExportCsv = document.getElementById("export-csv");
const reportExportJson = document.getElementById("export-json");
const attendanceEmployeeSelect = document.getElementById("attendance-employee");
const attendanceDateInput = document.getElementById("attendance-date");
const attendanceTimeInput = document.getElementById("attendance-time");
const attendanceStatusInput = document.getElementById("attendance-status");
const attendanceNoteInput = document.getElementById("attendance-note");
const attendanceSubmitButton = document.getElementById("attendance-submit-button");
const attendanceCancelButton = document.getElementById("attendance-cancel-button");
const dashboardDate = document.getElementById("dashboard-date");
const reportStudentSelect = document.getElementById("report-student");
const reportPeriodSelect = document.getElementById("report-period");
const reportReferenceDateInput = document.getElementById("report-reference-date");
const reportFatherNameInput = document.getElementById("report-father-name");
const reportMotherNameInput = document.getElementById("report-mother-name");
const reportLetterNumberInput = document.getElementById("report-letter-number");
const reportPreview = document.getElementById("report-preview");
const whatsappNumberInput = document.getElementById("whatsapp-number");
const downloadReportDocButton = document.getElementById("download-report-doc");
const printReportPdfButton = document.getElementById("print-report-pdf");
const sendWhatsappMobileButton = document.getElementById("send-whatsapp-mobile");
const sendWhatsappWebButton = document.getElementById("send-whatsapp-web");
const whatsappMessage = document.getElementById("whatsapp-message");
const whatsappShareNote = document.getElementById("whatsapp-share-note");
const dashboardDonutChart = document.getElementById("dashboard-donut-chart");
const dashboardDonutLegend = document.getElementById("dashboard-donut-legend");
const dashboardMonthlyBars = document.getElementById("dashboard-monthly-bars");

const dashboardTotals = {
  totalEmployees: document.getElementById("metric-total-employees"),
  todayPresent: document.getElementById("metric-present"),
  leave: document.getElementById("metric-leave"),
  late: document.getElementById("metric-late")
};

const employeeStats = {
  fastest: document.getElementById("employee-fastest"),
  wfh: document.getElementById("employee-wfh"),
  followUp: document.getElementById("employee-follow-up")
};

const attendanceTableBody = document.getElementById("attendance-body");
const reportList = document.getElementById("report-list");
const activityList = document.getElementById("activity-list");
const accountList = document.getElementById("account-list");
const accountFilterBar = document.getElementById("account-filter-bar");
let currentAccountFilter = "all";
const dashboardSummary = document.getElementById("dashboard-summary");
const monthlyBars = document.getElementById("monthly-bars");
const donutChart = document.getElementById("donut-chart");
const donutLegend = document.getElementById("donut-legend");
const recentPresenceList = document.getElementById("recent-presence-list");
const employeeCountNode = document.getElementById("employee-count");

let editingEmployeeId = "";
let editingAttendanceId = "";

function loadState() {
  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    return structuredClone(defaultState);
  }

  try {
    const normalized = normalizeState({ ...structuredClone(defaultState), ...JSON.parse(saved) });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    return structuredClone(defaultState);
  }
}

function normalizeAccount(account) {
  if (!account || !account.role) {
    return account;
  }

  const legacyEmail = String(account.email || "").trim().toLowerCase();
  const usernameSource = account.username || LEGACY_ACCOUNT_USERNAMES[legacyEmail] || (legacyEmail.includes("@") ? legacyEmail.split("@")[0] : legacyEmail) || account.name || account.label || "guruhalaqoh";
  const username = String(usernameSource)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "");

  return {
    ...account,
    username: username || "guruhalaqoh",
    isActive: account.isActive !== false && Number(account.is_active ?? 1) !== 0,
    label: ACCOUNT_LABELS[account.role] || account.label
  };
}

function normalizeAttendanceRecord(record) {
  if (!record) {
    return record;
  }

  const nextRecord = { ...record };

  if (nextRecord.status === "WFH" || nextRecord.status === "Halaqoh Online") {
    nextRecord.status = "Sakit";
  }

  if (legacyNoteMap[nextRecord.note]) {
    nextRecord.note = legacyNoteMap[nextRecord.note];
  }

  return nextRecord;
}

function normalizeEmployeeRecord(employee) {
  if (!employee) {
    return employee;
  }

  const nextEmployee = { ...employee };

  if (legacyDivisionMap[nextEmployee.division]) {
    nextEmployee.division = legacyDivisionMap[nextEmployee.division];
  }

  if (legacyRoleMap[nextEmployee.role]) {
    nextEmployee.role = legacyRoleMap[nextEmployee.role];
  }

  return nextEmployee;
}

function normalizeState(rawState) {
  return {
    ...rawState,
    accounts: (rawState.accounts || []).map(normalizeAccount),
    employees: (rawState.employees || []).map(normalizeEmployeeRecord),
    attendance: (rawState.attendance || []).map(normalizeAttendanceRecord),
    activityLog: (rawState.activityLog || defaultState.activityLog).map((item) => {
      if (item.id === "LOG-002") {
        return { ...item, text: "Rekap kehadiran halaqoh subuh selesai diperbarui" };
      }

      if (item.id === "LOG-003") {
        return { ...item, text: "Data santri sakit hari ini sudah diperbarui" };
      }

      return item;
    })
  };
}

function getStatusKey(status) {
  return statusKeyMap[String(status || "").toLowerCase()] || String(status || "").toLowerCase().replace(/\s+/g, "");
}

function getStatusClass(status) {
  return statusClassMap[status] || getStatusKey(status);
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function isFileMode() {
  return window.location.protocol === "file:";
}

function isLocalhostMode() {
  const host = (window.location.hostname || "").toLowerCase();
  return host === "localhost" || host === "127.0.0.1";
}

function getPreferredAppUrl() {
  return "http://localhost/website-pertama/";
}

function ensureHttpMode() {
  if (isFileMode()) {
    throw new Error("Aplikasi harus dibuka lewat http://localhost/website-pertama/ (bukan file langsung).");
  }

  if (!isLocalhostMode()) {
    throw new Error("Aplikasi lokal ini harus dibuka lewat http://localhost/website-pertama/.");
  }
}

function resetLoginForm(options = {}) {
  const { preserveUsername = false } = options;
  const nextUsername = preserveUsername ? usernameInput.value.trim().toLowerCase() : "";

  loginForm.reset();
  usernameInput.value = nextUsername;
  passwordInput.value = "";
}

async function authRequest(path, options = {}) {
  ensureHttpMode();

  const response = await fetch(`${AUTH_API_BASE}/${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(payload?.message || "Permintaan autentikasi gagal.");
  }

  return payload;
}

async function loginWithBackend(username, password) {
  const payload = await authRequest("login.php", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });

  return normalizeAccount(payload.user);
}

async function loadBackendSession() {
  try {
    const payload = await authRequest("session.php");
    return normalizeAccount(payload.user);
  } catch {
    return null;
  }
}

async function logoutFromBackend() {
  await authRequest("logout.php");
}

function applyCurrentUser(user) {
  currentUser = user;

  if (!currentUser) {
    userName.textContent = "-";
    userRole.textContent = "-";
    return;
  }

  userName.textContent = currentUser.name;
  userRole.textContent = currentUser.label;
}

async function initializeAuthState() {
  const sessionUser = await loadBackendSession();

  if (sessionUser) {
    applyCurrentUser(sessionUser);
    try {
      await syncBackendData();
    } catch (error) {
      console.error(error);
    }
    showScreen(dashboardScreen);
    setActivePage("dashboard");
    renderAll();
    return;
  }

  applyCurrentUser(null);
  resetLoginForm();
  clearAuthMessages();
  setAuthView("login");
  showScreen(loginScreen);
}

async function apiRequest(path, options = {}) {
  ensureHttpMode();

  const response = await fetch(`${API_BASE}/${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(payload?.message || "Permintaan data gagal.");
  }

  return payload;
}

async function loadBackendAccounts() {
  if (!isCurrentUserAdmin()) {
    return currentUser ? [normalizeAccount(currentUser)] : [];
  }

  const payload = await apiRequest("users/list.php");
  return (payload.users || []).map((user) => normalizeAccount({
    ...user,
    label: ACCOUNT_LABELS[user.role] || user.label || "Guru Halaqoh"
  }));
}

async function loadBackendStudents() {
  const payload = await apiRequest("students/list.php");
  return (payload.students || []).map(normalizeEmployeeRecord);
}

async function loadBackendAttendance() {
  const payload = await apiRequest("attendance/list.php");
  return (payload.attendance || []).map(normalizeAttendanceRecord);
}

async function loadBackendReports() {
  const payload = await apiRequest("reports/list.php");
  return payload.reports || [];
}

async function bootstrapBackendData() {
  await apiRequest("bootstrap.php", { method: "POST" });
}

async function syncBackendData() {
  let [accounts, employees, attendance, reports] = await Promise.all([
    loadBackendAccounts(),
    loadBackendStudents(),
    loadBackendAttendance(),
    loadBackendReports()
  ]);

  if ((!employees.length || !attendance.length || !reports.length) && isCurrentUserAdmin()) {
    await bootstrapBackendData();
    [accounts, employees, attendance, reports] = await Promise.all([
      loadBackendAccounts(),
      loadBackendStudents(),
      loadBackendAttendance(),
      loadBackendReports()
    ]);
  }

  if (accounts.length) {
    state.accounts = accounts;
  }

  if (employees.length) {
    state.employees = employees;
  }

  if (attendance.length) {
    state.attendance = attendance;
  }

  if (reports.length) {
    state.reports = reports;
  }

  saveState();
}

async function createBackendAccount(payload) {
  const response = await authRequest("signup.php", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return normalizeAccount({
    ...response.user,
    label: ACCOUNT_LABELS[response.user.role] || "Guru Halaqoh"
  });
}

async function setBackendAccountStatus(id, isActive) {
  return apiRequest("users/status.php", {
    method: "POST",
    body: JSON.stringify({ id, isActive })
  });
}

async function editBackendAccount(payload) {
  return apiRequest("users/edit.php", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

async function resetBackendPassword(payload) {
  return authRequest("reset-password.php", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

async function changeBackendPassword(payload) {
  return authRequest("change-password.php", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

async function createBackendStudent(payload) {
  const response = await apiRequest("students/create.php", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return normalizeEmployeeRecord(response.student);
}

async function updateBackendStudent(payload) {
  const response = await apiRequest("students/update.php", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return normalizeEmployeeRecord(response.student);
}

async function deleteBackendStudent(id) {
  return apiRequest("students/delete.php", {
    method: "POST",
    body: JSON.stringify({ id })
  });
}

async function createBackendAttendance(payload) {
  const response = await apiRequest("attendance/create.php", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return normalizeAttendanceRecord(response.attendance);
}

async function updateBackendAttendance(payload) {
  const response = await apiRequest("attendance/update.php", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return normalizeAttendanceRecord(response.attendance);
}

async function deleteBackendAttendance(id) {
  return apiRequest("attendance/delete.php", {
    method: "POST",
    body: JSON.stringify({ id })
  });
}

async function createBackendReport(payload) {
  const response = await apiRequest("reports/create.php", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return response.report;
}

async function deleteBackendReport(id) {
  return apiRequest("reports/delete.php", {
    method: "POST",
    body: JSON.stringify({ id })
  });
}

async function initializeApplication() {
  if (isFileMode() || !isLocalhostMode()) {
    clearAuthMessages();
    setAuthView("login");
    showScreen(loginScreen);
    setMessage(loginError, "error", "Buka aplikasi lewat http://localhost/website-pertama/. Sedang diarahkan otomatis...");
    window.setTimeout(() => {
      window.location.href = getPreferredAppUrl();
    }, 900);
    return;
  }

  clearEditForm();
  renderAll();
  document.getElementById("attendance-date").value = "2026-05-13";
  await initializeAuthState();
}

function setMessage(element, type, text) {
  if (!element) {
    return;
  }

  element.textContent = text || "";
  element.classList.remove("hidden", "error", "success");

  if (!text) {
    element.classList.add("hidden");
    return;
  }

  element.classList.add(type);
}

function clearAuthMessages() {
  [loginError, loginSuccess, forgotMessage, signupMessage].forEach((element) => setMessage(element, "", ""));
}

function setAuthView(view) {
  authPanels.forEach((panel) => {
    const isActive = panel.dataset.authView === view;
    panel.classList.toggle("hidden", !isActive);
    panel.classList.toggle("active", isActive);
  });

  const switchCopy = {
    login: {
      label: "Belum punya akun?",
      action: "Buat akun baru",
      target: "signup"
    },
    signup: {
      label: "Sudah punya akun?",
      action: "Masuk",
      target: "login"
    },
    forgot: {
      label: "Sudah ingat kata sandi?",
      action: "Kembali ke login",
      target: "login"
    }
  };

  const nextCopy = switchCopy[view] || switchCopy.login;
  if (authSwitchLabel) {
    authSwitchLabel.textContent = nextCopy.label;
  }
  if (authSwitchButton) {
    authSwitchButton.textContent = nextCopy.action;
    authSwitchButton.dataset.authTarget = nextCopy.target;
  }
}

function showScreen(screenToShow) {
  [loginScreen, dashboardScreen].forEach((screen) => {
    screen.classList.toggle("active", screen === screenToShow);
  });
}

function setActivePage(pageId) {
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.page === pageId);
  });

  pages.forEach((page) => {
    page.classList.toggle("active", page.id === `page-${pageId}`);
  });
}

function createId(prefix, collection) {
  return `${prefix}-${String(collection.length + 1).padStart(3, "0")}`;
}

function getEmployeeById(employeeId) {
  return state.employees.find((employee) => employee.id === employeeId);
}

function getTodayRecords() {
  return state.attendance.filter((item) => item.date === "2026-05-13");
}

function getMergedRecords(records = state.attendance) {
  return records
    .map((record) => {
      const employee = getEmployeeById(record.employeeId);
      return {
        ...record,
        employeeName: employee ? employee.name : "Santri tidak ditemukan",
        division: employee ? employee.division : "-",
        role: employee ? employee.role : "-"
      };
    })
    .sort((left, right) => `${right.date} ${right.checkIn}`.localeCompare(`${left.date} ${left.checkIn}`));
}

function countByStatus(records) {
  return records.reduce((accumulator, record) => {
    const key = getStatusKey(record.status);
    accumulator[key] = (accumulator[key] || 0) + 1;
    return accumulator;
  }, {});
}

function renderDashboard() {
  const todayRecords = getTodayRecords();
  const statusCount = countByStatus(todayRecords);
  const presentTotal = statusCount.hadir || 0;
  const leaveTotal = (statusCount.izin || 0) + (statusCount.sakit || 0);
  const lateTotal = (statusCount.terlambat || 0);
  const fastestRecord = [...todayRecords]
    .filter((record) => record.checkIn && record.checkIn !== "-")
    .sort((left, right) => left.checkIn.localeCompare(right.checkIn))[0];

  dashboardTotals.totalEmployees.textContent = state.employees.length;
  dashboardTotals.todayPresent.textContent = presentTotal;
  dashboardTotals.leave.textContent = leaveTotal;
  dashboardTotals.late.textContent = lateTotal;
  employeeCountNode.textContent = state.employees.length;

  employeeStats.fastest.textContent = fastestRecord
    ? `${fastestRecord.checkIn} - ${getEmployeeById(fastestRecord.employeeId)?.name || "-"}`
    : "Belum ada data";
  employeeStats.wfh.textContent = statusCount.sakit || 0;
  employeeStats.followUp.textContent = Math.max(state.employees.length - todayRecords.length, 0) + lateTotal;

  dashboardSummary.textContent = `${presentTotal} dari ${state.employees.length} santri tercatat hadir hari ini.`;
  recentPresenceList.innerHTML = "";

  getMergedRecords(todayRecords).slice(0, 5).forEach((record) => {
    const item = document.createElement("div");
    item.className = "activity-item";
    item.innerHTML = `
      <div>
        <strong>${record.employeeName}</strong>
        <p class="report-meta">${record.division} · ${record.checkIn} · ${record.note}</p>
      </div>
      <span class="status ${getStatusClass(record.status)}">${record.status}</span>
    `;
    recentPresenceList.appendChild(item);
  });

  if (!recentPresenceList.children.length) {
    recentPresenceList.innerHTML = '<div class="empty-state">Belum ada absensi hari ini.</div>';
  }
}

function renderReports() {
  reportList.innerHTML = "";
  const sortedReports = [...state.reports].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  const canManageReports = canManageProtectedData();

  sortedReports.forEach((report) => {
    const item = document.createElement("div");
    item.className = "report-item";
    item.innerHTML = `
      <div>
        <strong>${report.title}</strong>
        <p class="report-meta">${report.note} · ${report.createdAt}</p>
      </div>
      <div class="item-actions">
        <span class="badge success">${report.type}</span>
        ${canManageReports ? `<button class="btn-inline danger" type="button" data-action="delete-report" data-report-id="${report.id}">Hapus</button>` : ""}
      </div>
    `;
    reportList.appendChild(item);
  });
}

function renderEmployeeList() {
  if (!employeeList) {
    return;
  }

  employeeList.innerHTML = "";
  const canManageStudents = canManageProtectedData();

  [...state.employees]
    .sort((left, right) => left.name.localeCompare(right.name))
    .forEach((employee) => {
      const item = document.createElement("div");
      item.className = "employee-item";
      item.innerHTML = `
        <div>
          <strong>${employee.name}</strong>
          <p class="report-meta">${employee.division} · ${employee.role}</p>
        </div>
        ${canManageStudents ? `<div class="item-actions">
          <button class="btn-inline" type="button" data-action="edit-employee" data-employee-id="${employee.id}">Edit</button>
          <button class="btn-inline danger" type="button" data-action="delete-employee" data-employee-id="${employee.id}">Hapus</button>
        </div>` : ""}
      `;
      employeeList.appendChild(item);
    });

  if (!employeeList.children.length) {
    employeeList.innerHTML = '<div class="empty-state">Belum ada data santri.</div>';
  }
}

function populateEmployeeForm(employee) {
  if (!employee) {
    return;
  }

  editingEmployeeId = employee.id;
  employeeNameInput.value = employee.name;
  employeeDivisionInput.value = employee.division;
  employeeRoleInput.value = employee.role;
  if (employeeSubmitButton) {
    employeeSubmitButton.textContent = "Update Santri";
  }
  employeeCancelButton?.classList.remove("hidden");
}

function resetEmployeeForm() {
  editingEmployeeId = "";
  employeeForm.reset();
  if (employeeSubmitButton) {
    employeeSubmitButton.textContent = "Tambah Santri";
  }
  employeeCancelButton?.classList.add("hidden");
}

function populateAttendanceForm(record) {
  if (!record) {
    return;
  }

  editingAttendanceId = record.id;
  attendanceEmployeeSelect.value = record.employeeId;
  attendanceDateInput.value = record.date;
  attendanceTimeInput.value = record.checkIn === "-" ? "" : record.checkIn;
  attendanceStatusInput.value = record.status;
  attendanceNoteInput.value = record.note === "Tidak ada catatan" ? "" : record.note;
  if (attendanceSubmitButton) {
    attendanceSubmitButton.textContent = "Update Kehadiran";
  }
  attendanceCancelButton?.classList.remove("hidden");
}

function resetAttendanceForm() {
  editingAttendanceId = "";
  attendanceForm.reset();
  if (attendanceDateInput) {
    attendanceDateInput.value = "2026-05-13";
  }
  if (attendanceSubmitButton) {
    attendanceSubmitButton.textContent = "Simpan Kehadiran";
  }
  attendanceCancelButton?.classList.add("hidden");
}

function getSelectedReportEmployeeId() {
  return reportStudentSelect?.value || state.employees[0]?.id || "";
}

function getSelectedReportPeriod() {
  return reportPeriodSelect?.value || "weekly";
}

function getReferenceDate() {
  const value = reportReferenceDateInput?.value;
  return value ? new Date(`${value}T00:00:00`) : new Date("2026-05-13T00:00:00");
}

function formatRecordDate(dateText) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${dateText}T00:00:00`));
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getPeriodBoundaries(period) {
  const referenceDate = getReferenceDate();
  const endDate = new Date(referenceDate);
  let startDate = new Date(referenceDate);

  if (period === "monthly") {
    startDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
  } else {
    const dayIndex = referenceDate.getDay();
    const mondayOffset = dayIndex === 0 ? 6 : dayIndex - 1;
    startDate.setDate(referenceDate.getDate() - mondayOffset);
  }

  return { startDate, endDate };
}

function isRecordInPeriod(record, period) {
  const { startDate, endDate } = getPeriodBoundaries(period);
  const recordDate = new Date(`${record.date}T00:00:00`);
  return recordDate >= startDate && recordDate <= endDate;
}

function getPeriodLabel(period) {
  const { startDate, endDate } = getPeriodBoundaries(period);

  if (period === "monthly") {
    return new Intl.DateTimeFormat("id-ID", {
      month: "long",
      year: "numeric"
    }).format(startDate);
  }

  return `${formatRecordDate(formatDateKey(startDate))} - ${formatRecordDate(formatDateKey(endDate))}`;
}

function getParentName(parentType, employee) {
  const manualName = parentType === "father"
    ? (reportFatherNameInput?.value || "").trim()
    : (reportMotherNameInput?.value || "").trim();

  if (manualName) {
    return manualName;
  }

  return parentType === "father"
    ? `Ayah ${employee?.name || "ananda"}`
    : `Ibu ${employee?.name || "ananda"}`;
}

function getLetterNumber(employee, period, referenceDate) {
  const manualNumber = (reportLetterNumberInput?.value || "").trim();

  if (manualNumber) {
    return manualNumber;
  }

  const periodCode = period === "monthly" ? "BLN" : "MGG";
  const month = String(referenceDate.getMonth() + 1).padStart(2, "0");
  const year = referenceDate.getFullYear();
  const studentCode = (employee?.id || "SANTRI").replace(/[^A-Z0-9-]/gi, "").toUpperCase();
  return `B-${periodCode}/${studentCode}/${month}/${year}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function hexToRgb(hexColor) {
  const normalized = String(hexColor || "").replace("#", "").trim();

  if (normalized.length !== 6) {
    return [0, 0, 0];
  }

  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16)
  ];
}

function getReportContext(employeeId = getSelectedReportEmployeeId(), period = getSelectedReportPeriod()) {
  const employee = getEmployeeById(employeeId);
  const allEmployeeRecords = getMergedRecords(state.attendance.filter((record) => record.employeeId === employeeId));
  const periodRecords = allEmployeeRecords.filter((record) => isRecordInPeriod(record, period));
  const latestRecord = allEmployeeRecords[0];
  const statusCount = countByStatus(periodRecords);
  const periodTitle = period === "monthly" ? "Bulanan" : "Mingguan";
  const referenceDate = getReferenceDate();
  const preparedBy = currentUser?.name || "Pengelola Halaqoh";
  const preparedRole = currentUser?.label || "Guru Halaqoh";
  const fatherName = getParentName("father", employee);
  const motherName = getParentName("mother", employee);
  const letterNumber = getLetterNumber(employee, period, referenceDate);

  return {
    employee,
    allEmployeeRecords,
    periodRecords,
    latestRecord,
    statusCount,
    period,
    periodTitle,
    periodLabel: getPeriodLabel(period),
    referenceDateLabel: new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(referenceDate),
    fatherName,
    motherName,
    studentNumber: employee?.id || "-",
    letterNumber,
    preparedBy,
    preparedRole
  };
}

function getAttendanceRate(records) {
  if (!records.length) {
    return 0;
  }

  const statusCount = countByStatus(records);
  return Math.round(((statusCount.hadir || 0) / records.length) * 100);
}

function getMonthWeekProgress(employeeId = getSelectedReportEmployeeId()) {
  const referenceDate = getReferenceDate();
  const monthStart = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
  const monthEnd = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 0);
  const employeeRecords = getMergedRecords(
    state.attendance.filter((record) => {
      const recordDate = new Date(`${record.date}T00:00:00`);
      return record.employeeId === employeeId && recordDate >= monthStart && recordDate <= monthEnd;
    })
  );
  const totalDays = monthEnd.getDate();
  const totalWeeks = Math.ceil(referenceDate.getDate() / 7);

  return Array.from({ length: totalWeeks }, (_, index) => {
    const startDay = (index * 7) + 1;
    const endDay = Math.min(startDay + 6, totalDays);
    const weekStart = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), startDay);
    const weekEnd = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), endDay);
    const records = employeeRecords.filter((record) => {
      const recordDate = new Date(`${record.date}T00:00:00`);
      return recordDate >= weekStart && recordDate <= weekEnd;
    });
    const statusCount = countByStatus(records);
    const attendanceRate = getAttendanceRate(records);

    return {
      label: `Minggu ${index + 1}`,
      rangeLabel: `${formatRecordDate(formatDateKey(weekStart))} - ${formatRecordDate(formatDateKey(weekEnd))}`,
      records,
      statusCount,
      attendanceRate
    };
  });
}

function getWeeklyTrendLabel(currentWeek, previousWeek) {
  if (!currentWeek.records.length && !previousWeek?.records.length) {
    return "Belum ada perkembangan";
  }

  if (!previousWeek || !previousWeek.records.length) {
    return currentWeek.records.length ? "Data awal pekan" : "Belum ada catatan";
  }

  if (currentWeek.attendanceRate > previousWeek.attendanceRate) {
    return `Naik ${currentWeek.attendanceRate - previousWeek.attendanceRate}% dari pekan sebelumnya`;
  }

  if (currentWeek.attendanceRate < previousWeek.attendanceRate) {
    return `Turun ${previousWeek.attendanceRate - currentWeek.attendanceRate}% dari pekan sebelumnya`;
  }

  return "Stabil dari pekan sebelumnya";
}

function getWeeklyHighlight(week) {
  if (!week.records.length) {
    return "Belum ada catatan kehadiran pada pekan ini.";
  }

  if ((week.statusCount.terlambat || 0) > 0) {
    return `Perlu tindak lanjut pada ${week.statusCount.terlambat} catatan terlambat.`;
  }

  if ((week.statusCount.sakit || 0) > 0 || (week.statusCount.izin || 0) > 0) {
    return `Ada ${((week.statusCount.sakit || 0) + (week.statusCount.izin || 0))} catatan berhalangan pada pekan ini.`;
  }

  if ((week.statusCount.hadir || 0) === week.records.length) {
    return "Kehadiran penuh pada seluruh catatan pekan ini.";
  }

  return "Kehadiran pekan ini tercatat stabil.";
}

function getWeeklyBarsHtml(weeklyProgress) {
  if (!weeklyProgress.length) {
    return '<div class="week-bars-empty">Belum ada data mingguan.</div>';
  }

  return `
    <div class="week-bars">
      ${weeklyProgress.map((week) => `
        <div class="week-bar-item">
          <div class="week-bar-track">
            <div class="week-bar-fill" style="height: ${Math.max(week.attendanceRate, 6)}%;"></div>
          </div>
          <strong>${week.attendanceRate}%</strong>
          <span>${escapeHtml(week.label)}</span>
          <small>${escapeHtml(week.rangeLabel)}</small>
        </div>
      `).join("")}
    </div>
  `;
}

function getPresenceLegendItems(statusCount, totalRecords) {
  const safeTotal = totalRecords || 1;
  return [
    {
      label: "Hadir",
      arabicLabel: "حاضر",
      value: statusCount.hadir || 0,
      percent: Math.round(((statusCount.hadir || 0) / safeTotal) * 100),
      color: "#4b6a39"
    },
    {
      label: "Izin",
      arabicLabel: "إذن",
      value: statusCount.izin || 0,
      percent: Math.round(((statusCount.izin || 0) / safeTotal) * 100),
      color: "#b38a36"
    },
    {
      label: "Sakit",
      arabicLabel: "مريض",
      value: statusCount.sakit || 0,
      percent: Math.round(((statusCount.sakit || 0) / safeTotal) * 100),
      color: "#8a5a4a"
    },
    {
      label: "Terlambat",
      arabicLabel: "متأخر",
      value: statusCount.terlambat || 0,
      percent: Math.round(((statusCount.terlambat || 0) / safeTotal) * 100),
      color: "#6b7280"
    }
  ];
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeSvgArc(centerX, centerY, radius, startAngle, endAngle) {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function getPresenceDonutHtml(statusCount, totalRecords) {
  if (!totalRecords) {
    return '<div class="week-bars-empty">Belum ada data presensi untuk dibuat diagram.</div>';
  }

  const items = getPresenceLegendItems(statusCount, totalRecords);
  const centerLabel = `${Math.round(((statusCount.hadir || 0) / totalRecords) * 100)}%`;
  let currentAngle = 0;
  const segments = items.map((item) => {
    const sweepAngle = (item.value / totalRecords) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sweepAngle;
    currentAngle = endAngle;

    if (!item.value) {
      return "";
    }

    return `<path d="${describeSvgArc(90, 90, 62, startAngle, endAngle)}" stroke="${item.color}" stroke-width="24" fill="none" stroke-linecap="butt"></path>`;
  }).join("");

  return `
    <div class="presence-donut-layout">
      <div class="presence-donut-card">
        <svg viewBox="0 0 180 180" class="presence-donut-svg" aria-hidden="true">
          <circle cx="90" cy="90" r="62" fill="none" stroke="#ede6da" stroke-width="24"></circle>
          ${segments}
        </svg>
        <div class="presence-donut-center">
          <strong>${centerLabel}</strong>
          <span>Hadir</span>
        </div>
      </div>
      <div class="presence-donut-legend">
        ${items.map((item) => `
          <div class="presence-legend-item">
            <span class="presence-legend-label"><span class="presence-color-dot" style="background:${item.color};"></span>${item.arabicLabel} / ${item.label}</span>
            <strong>${item.value} catatan</strong>
            <small>${item.percent}% dari total presensi</small>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function getPresenceDiagramHtml(statusCount, totalRecords) {
  if (!totalRecords) {
    return '<div class="week-bars-empty">Belum ada data presensi untuk dibuat diagram.</div>';
  }

  const items = getPresenceLegendItems(statusCount, totalRecords);
  return `
    <div class="presence-diagram">
      ${getPresenceDonutHtml(statusCount, totalRecords)}
      ${items.map((item) => `
        <div class="presence-row">
          <div class="presence-label-row">
            <span>${item.arabicLabel} / ${item.label}</span>
            <strong>${item.value} catatan (${item.percent}%)</strong>
          </div>
          <div class="presence-bar-track">
            <div class="presence-bar-fill" style="width: ${Math.max(item.percent, item.value ? 6 : 0)}%; background: ${item.color};"></div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function drawPdfDonutChart(doc, centerX, centerY, outerRadius, innerRadius, items, totalRecords) {
  const baseColor = hexToRgb("#ede6da");
  doc.setFillColor(...baseColor);

  for (let angle = 0; angle < 360; angle += 6) {
    const start = angle;
    const end = Math.min(angle + 6, 360);
    drawPdfDonutSlice(doc, centerX, centerY, outerRadius, innerRadius, start, end, baseColor);
  }

  let currentAngle = 0;
  items.forEach((item) => {
    if (!item.value) {
      return;
    }

    const sweepAngle = (item.value / totalRecords) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sweepAngle;
    currentAngle = endAngle;
    drawPdfDonutSlice(doc, centerX, centerY, outerRadius, innerRadius, startAngle, endAngle, hexToRgb(item.color));
  });
}

function drawPdfDonutSlice(doc, centerX, centerY, outerRadius, innerRadius, startAngle, endAngle, rgbColor) {
  const step = 6;
  for (let angle = startAngle; angle < endAngle; angle += step) {
    const nextAngle = Math.min(angle + step, endAngle);
    const outerStart = polarToCartesian(centerX, centerY, outerRadius, angle);
    const outerEnd = polarToCartesian(centerX, centerY, outerRadius, nextAngle);
    const innerStart = polarToCartesian(centerX, centerY, innerRadius, angle);
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, nextAngle);

    doc.setFillColor(...rgbColor);
    doc.triangle(outerStart.x, outerStart.y, outerEnd.x, outerEnd.y, innerStart.x, innerStart.y, "F");
    doc.triangle(innerStart.x, innerStart.y, outerEnd.x, outerEnd.y, innerEnd.x, innerEnd.y, "F");
  }
}

function getGuardianProgressSummary(employee, weeklyProgress, statusText) {
  const latestWeek = weeklyProgress[weeklyProgress.length - 1];
  const previousWeek = weeklyProgress[weeklyProgress.length - 2];
  const trendText = latestWeek ? getWeeklyTrendLabel(latestWeek, previousWeek) : "Belum ada perkembangan mingguan.";
  const highlightText = latestWeek ? getWeeklyHighlight(latestWeek) : "Belum ada catatan kehadiran pada minggu berjalan.";

  return `Berdasarkan pemantauan terakhir, ananda ${employee?.name || "santri"} berada pada status ${statusText}. Pada ${latestWeek?.label?.toLowerCase() || "minggu berjalan"}, tingkat kehadiran tercatat ${latestWeek?.attendanceRate ?? 0}%. ${trendText}. ${highlightText}`;
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getAcademicYearLabel(referenceDate) {
  const year = referenceDate.getFullYear();
  return `${year - 1}/${year}`;
}

function getSemesterLabel(referenceDate) {
  return referenceDate.getMonth() >= 6 ? "Ganjil" : "Genap";
}

function buildRaporAssessmentRows(context, weeklyProgress) {
  const attendanceRate = getAttendanceRate(context.periodRecords);
  const lateCount = context.statusCount.terlambat || 0;
  const sickCount = context.statusCount.sakit || 0;
  const leaveCount = context.statusCount.izin || 0;
  const presentCount = context.statusCount.hadir || 0;
  const latestWeek = weeklyProgress[weeklyProgress.length - 1];
  const previousWeek = weeklyProgress[weeklyProgress.length - 2];
  const trendDelta = latestWeek && previousWeek ? latestWeek.attendanceRate - previousWeek.attendanceRate : 0;
  const activeWeeks = weeklyProgress.filter((week) => week.records.length > 0).length;

  return [
    {
      title: "Jumlah Kehadiran",
      score: attendanceRate,
      note: `${presentCount} hadir dari ${context.periodRecords.length} catatan absensi pada periode ${context.periodTitle.toLowerCase()}.`
    },
    {
      title: "Keterlambatan",
      score: clampScore(100 - (lateCount * 8)),
      note: lateCount ? `Tercatat ${lateCount} kali terlambat pada data absensi.` : "Tidak ada catatan terlambat pada data absensi."
    },
    {
      title: "Izin dan Sakit",
      score: clampScore(100 - ((sickCount + leaveCount) * 10)),
      note: `Izin: ${leaveCount} catatan, sakit: ${sickCount} catatan pada periode ini.`
    },
    {
      title: "Tren Pekanan",
      score: clampScore(84 + trendDelta),
      note: latestWeek ? (trendDelta > 0 ? `Naik ${trendDelta}% dibanding pekan sebelumnya.` : trendDelta < 0 ? `Turun ${Math.abs(trendDelta)}% dibanding pekan sebelumnya.` : "Stabil dibanding pekan sebelumnya.") : "Belum ada data pekanan yang bisa dibandingkan."
    },
    {
      title: "Sebaran Absensi Pekanan",
      score: clampScore(activeWeeks ? attendanceRate : 0),
      note: activeWeeks ? `Data absensi muncul pada ${activeWeeks} pekan di bulan berjalan.` : "Belum ada data absensi pekanan."
    }
  ];
}

function buildRaporAverage(assessmentRows) {
  if (!assessmentRows.length) {
    return 0;
  }

  return (assessmentRows.reduce((total, row) => total + row.score, 0) / assessmentRows.length).toFixed(2);
}

function buildStudentNote(context, assessmentRows) {
  const strongestRow = [...assessmentRows].sort((left, right) => right.score - left.score)[0];
  const weakestRow = [...assessmentRows].sort((left, right) => left.score - right.score)[0];
  return `Berdasarkan data absensi, ananda ${context.employee?.name || "santri"} paling baik pada aspek ${strongestRow?.title?.toLowerCase() || "kehadiran"}. Perlu perhatian lebih pada aspek ${weakestRow?.title?.toLowerCase() || "yang masih rendah"} agar catatan absensi pada periode berikutnya lebih baik.`;
}

function buildParentNote(context, weeklyProgress) {
  const latestWeek = weeklyProgress[weeklyProgress.length - 1];
  const weekLabel = latestWeek?.label?.toLowerCase() || "minggu berjalan";
  const rateLabel = latestWeek?.attendanceRate ?? getAttendanceRate(context.periodRecords);
  return `Mohon bimbingan ayah dan bunda agar ananda menjaga konsistensi kehadiran halaqoh. Pada ${weekLabel}, persentase kehadiran berdasarkan data absensi tercatat ${rateLabel}%, sehingga pendampingan dari rumah penting untuk memperbaiki kedisiplinan hadir.`;
}

function buildPeriodReportSummary(employeeId = getSelectedReportEmployeeId(), period = getSelectedReportPeriod()) {
  const context = getReportContext(employeeId, period);
  const { employee, allEmployeeRecords, latestRecord, periodRecords, statusCount, periodTitle, periodLabel, fatherName, motherName, studentNumber, letterNumber, preparedBy, preparedRole } = context;
  const statusText = latestRecord ? latestRecord.status : "Belum ada catatan";
  const attendanceRate = getAttendanceRate(periodRecords);
  const weeklyProgress = getMonthWeekProgress(employeeId);

  const lines = [
    `Laporan Pemantauan Kehadiran Santri ${periodTitle}`,
    "Ma'had Ta'limul Qur'an Utsman Bin Affan Lhokseumawe",
    `Periode: ${periodLabel}`,
    `Nomor surat: ${letterNumber}`,
    "",
    `Nomor induk santri: ${studentNumber}`,
    `Nama santri: ${employee?.name || "Santri tidak ditemukan"}`,
    `Nama ayah: ${fatherName}`,
    `Nama ibu: ${motherName}`,
    `Halaqoh/Kelas: ${employee?.division || "-"}`,
    `Kategori: ${employee?.role || "-"}`,
    `Status terakhir: ${statusText}`,
    "",
    "Ikhtisar kehadiran:",
    `Total pertemuan tercatat: ${periodRecords.length}`,
    `Persentase hadir: ${attendanceRate}%`,
    `Hadir: ${statusCount.hadir || 0}`,
    `Sakit: ${statusCount.sakit || 0}`,
    `Izin: ${statusCount.izin || 0}`,
    `Terlambat: ${statusCount.terlambat || 0}`,
    "",
    `Uraian perkembangan mingguan ${new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(getReferenceDate())}:`
  ];

  weeklyProgress.forEach((week, index) => {
    lines.push(
      `${week.label} (${week.rangeLabel})`,
      `- Statistik: ${week.records.length} catatan | Hadir ${week.statusCount.hadir || 0} | Sakit ${week.statusCount.sakit || 0} | Izin ${week.statusCount.izin || 0} | Terlambat ${week.statusCount.terlambat || 0}`,
      `- Persentase hadir: ${week.attendanceRate}%`,
      `- Perkembangan: ${getWeeklyTrendLabel(week, weeklyProgress[index - 1])}`,
      `- Catatan: ${getWeeklyHighlight(week)}`
    );
  });

  lines.push("", `Rincian riwayat kehadiran ${period === "monthly" ? "pada bulan ini" : "pada minggu ini"}:`);

  periodRecords.slice(0, 12).forEach((record, index) => {
    lines.push(`${index + 1}. ${formatRecordDate(record.date)} | ${record.checkIn} | ${record.status} | ${record.note}`);
  });

  if (!allEmployeeRecords.length) {
    lines.push("Belum terdapat data kehadiran untuk santri ini.");
  } else if (!periodRecords.length) {
    lines.push(`Belum terdapat data kehadiran pada periode ${period === "monthly" ? "bulanan" : "mingguan"} ini.`);
  }

  lines.push("", `Disusun oleh: ${preparedBy} (${preparedRole})`, "Laporan ini dapat diunduh sebagai dokumen resmi dan disampaikan kepada wali santri melalui WhatsApp.");

  return lines.join("\n");
}

function buildReportDocumentHtml(employeeId = getSelectedReportEmployeeId(), period = getSelectedReportPeriod()) {
  const context = getReportContext(employeeId, period);
  const { employee, latestRecord, periodRecords, statusCount, periodTitle, periodLabel, referenceDateLabel, fatherName, motherName, studentNumber, letterNumber, preparedBy, preparedRole } = context;
  const statusText = latestRecord ? latestRecord.status : "Belum ada catatan";
  const attendanceRate = getAttendanceRate(periodRecords);
  const weeklyProgress = getMonthWeekProgress(employeeId);
  const guardianSummary = getGuardianProgressSummary(employee, weeklyProgress, statusText);
  const summaryLines = buildPdfSummaryLines(context, weeklyProgress);
  const assessmentRows = buildRaporAssessmentRows(context, weeklyProgress);
  const averageScore = buildRaporAverage(assessmentRows);
  const studentNote = buildStudentNote(context, assessmentRows);
  const parentNote = buildParentNote(context, weeklyProgress);
  const logoMarkup = reportLogoDataUrl
    ? `<img class="letterhead-logo" src="${reportLogoDataUrl}" alt="Logo MataQu">`
    : '<div class="mark-badge">MQ</div>';
  const rowsHtml = periodRecords.length
    ? periodRecords.map((record, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(formatRecordDate(record.date))}</td>
          <td>${escapeHtml(record.checkIn)}</td>
          <td>${escapeHtml(record.status)}</td>
          <td>${escapeHtml(record.note)}</td>
        </tr>
      `).join("")
    : '<tr><td colspan="5">Belum ada data kehadiran pada periode ini.</td></tr>';
  const assessmentRowsHtml = assessmentRows.map((row, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(row.title)}</td>
        <td>${row.score}</td>
        <td>${escapeHtml(row.note)}</td>
      </tr>
    `).join("");

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Pemantauan Kehadiran Santri ${escapeHtml(periodTitle)}</title>
      <style>
        @page { margin: 28px; }
        * { box-sizing: border-box; }
        body { font-family: "Times New Roman", serif; color: #1f1b17; margin: 0; background: #f7f4ec; }
        .page { border: 1px solid #d9d0c0; border-radius: 18px; padding: 28px 28px 38px; background: #fffdfa; box-shadow: inset 0 0 0 1px #f3ebdf; }
        .letterhead-shell { background: linear-gradient(180deg, #fcf9f3 0%, #f6f0e5 100%); padding: 12px 14px 16px; border: 1px solid #ded3c0; border-radius: 18px; }
        .letterhead { display: table; width: 100%; margin-bottom: 8px; }
        .letterhead-mark, .letterhead-copy, .letterhead-meta { display: table-cell; vertical-align: middle; }
        .letterhead-mark { width: 90px; }
        .letterhead-meta { width: 132px; text-align: right; }
        .letterhead-logo {
          display: block;
          width: 62px;
          height: 62px;
          object-fit: contain;
        }
        .mark-badge {
          width: 68px;
          height: 68px;
          border: 2px solid #0c8d3a;
          border-radius: 50%;
          text-align: center;
          line-height: 64px;
          font-size: 26px;
          font-weight: 700;
          color: #0c8d3a;
          background: #f4f9e7;
        }
        .letterhead-logo-frame {
          width: 72px;
          height: 72px;
          padding: 4px;
          border: 1px solid #c1b094;
          border-radius: 50%;
          background: #fffdfa;
          box-shadow: inset 0 0 0 1px #efe4d0;
        }
        .letterhead-copy { text-align: center; }
        .letterhead-copy p, .letterhead-copy h1, .letterhead-copy h2 { margin: 0; }
        .letterhead-copy .org-top { font-size: 17px; font-weight: 700; color: #1f1b17; line-height: 1.15; }
        .letterhead-copy h1 { font-size: 23px; margin-top: 2px; letter-spacing: 0.03em; }
        .letterhead-copy h2 { font-size: 16px; margin-top: 3px; font-weight: 700; letter-spacing: 0.08em; }
        .letterhead-copy .org-subtitle { font-size: 12px; margin-top: 5px; color: #4a4338; font-style: italic; }
        .letterhead-copy .org-address { font-size: 11px; margin-top: 5px; color: #5c5447; line-height: 1.45; }
        .letterhead-copy .org-contact { font-size: 10px; margin-top: 7px; color: #6f675b; }
        .arabic-line { font-family: "Traditional Arabic", "Times New Roman", serif; font-size: 23px; font-weight: 700; direction: rtl; }
        .arabic-line.small { font-size: 19px; }
        .arabic-label { display: inline-block; min-width: 120px; font-family: "Traditional Arabic", "Times New Roman", serif; font-size: 18px; direction: rtl; }
        .arabic-heading { font-family: "Traditional Arabic", "Times New Roman", serif; font-size: 20px; direction: rtl; }
        .letterhead-meta-badge {
          display: inline-block;
          padding: 8px 12px;
          border: 1px solid #d0c3ab;
          background: #fffdfa;
          color: #6b5b3e;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .letterhead-meta-note {
          margin-top: 10px;
          font-size: 10px;
          line-height: 1.5;
          color: #6a6257;
        }
        .header-rule { border-top: 2px solid #6f5d3f; border-bottom: 1px solid #bfae91; height: 5px; margin: 12px 0 20px; }
        .document-title { text-align: center; margin-bottom: 20px; padding: 14px 12px; background: #f7f2e8; border: 1px solid #e1d6c4; border-radius: 14px; }
        .document-title h3, .document-title p { margin: 0; }
        .document-title h3 { font-size: 18px; text-transform: uppercase; letter-spacing: 0.04em; }
        .document-title p { margin-top: 8px; font-size: 13px; color: #5d5448; }
        .section-panel { border: 1px solid #c1b094; border-radius: 14px; background: #fffdf8; padding: 14px 16px; margin-bottom: 18px; box-shadow: inset 0 0 0 1px #f2eadf; }
        .section-panel-title { margin: 0 0 12px; font-size: 14px; font-weight: 700; color: #4d4338; letter-spacing: 0.03em; }
        .summary-lines { margin: 0 0 18px; padding: 14px 18px; border: 1px solid #c1b094; border-radius: 12px; background: #fcf8f1; box-shadow: inset 0 0 0 1px #f2eadf; }
        .summary-lines p { margin: 0 0 8px; font-size: 13px; color: #4f463c; line-height: 1.55; }
        .summary-lines p:last-child { margin-bottom: 0; }
        .identity-grid { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 0; }
        .identity-grid td { width: 50%; border: 1px solid #cdbfa9; padding: 10px 12px; vertical-align: top; background: #fffdfa; }
        .identity-grid strong { display: inline-block; min-width: 120px; }
        .meta, .recap { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
        .meta td { padding: 6px 4px; vertical-align: top; }
        .recap td { border: 1px solid #d2c6b3; padding: 10px 12px; background: #fbf8f2; }
        table.score-table { width: 100%; border-collapse: collapse; margin-top: 10px; border: 1px solid #c1b094; }
        table.score-table th, table.score-table td { border: 1px solid #d0c5b4; padding: 9px 11px; text-align: left; vertical-align: top; }
        table.score-table th { background: #efe7d9; text-align: center; color: #4b4338; }
        table.score-table tr:nth-child(even) td { background: #fcfaf6; }
        .score-average { margin-top: 10px; text-align: right; font-weight: 700; color: #5f533f; }
        table.report { width: 100%; border-collapse: collapse; margin-top: 12px; border: 1px solid #c1b094; }
        table.report th, table.report td { border: 1px solid #d0c5b4; padding: 9px 11px; text-align: left; }
        table.report th { background: #ece1d1; color: #4b4338; }
        table.report tr:nth-child(even) td { background: #fcfaf6; }
        .section-title { margin: 24px 0 12px; font-size: 16px; text-align: center; color: #4d4338; letter-spacing: 0.03em; }
        .section-box { border: 1px solid #c1b094; margin-top: 12px; background: #fffdfa; border-radius: 12px; overflow: hidden; box-shadow: inset 0 0 0 1px #f2eadf; }
        .section-box h4 { margin: 0; padding: 11px 14px; text-align: center; border-bottom: 1px solid #ddd1bf; font-size: 15px; background: #f4eee3; color: #4e4338; }
        .section-box p { margin: 0; padding: 15px 18px; line-height: 1.72; color: #433c34; }
        .week-bars { display: flex; align-items: end; justify-content: center; gap: 14px; min-height: 188px; margin: 12px 0 20px; padding: 14px 10px 8px; background: #fbf8f2; border: 1px solid #c1b094; border-radius: 12px; }
        .week-bar-item { width: 78px; text-align: center; font-size: 12px; }
        .week-bar-track { height: 124px; margin-bottom: 8px; border: 1px solid #cfc3b0; background: linear-gradient(180deg, #ffffff, #f1eadf); position: relative; }
        .week-bar-fill { position: absolute; inset: auto 0 0 0; background: linear-gradient(180deg, #95b36f, #5c7750); }
        .week-bar-item strong { color: #4f4538; }
        .week-bar-item small { display: block; margin-top: 4px; line-height: 1.35; color: #6b6259; }
        .week-bars-empty { padding: 14px 16px; background: #faf7f1; border: 1px solid #c1b094; border-radius: 12px; margin-bottom: 18px; color: #655b50; }
        .presence-diagram { display: grid; gap: 12px; margin: 12px 0 18px; padding: 14px 16px; background: #fbf8f2; border: 1px solid #c1b094; border-radius: 12px; }
        .presence-donut-layout { display: grid; grid-template-columns: 210px 1fr; gap: 18px; align-items: center; margin-bottom: 6px; }
        .presence-donut-card { position: relative; width: 180px; height: 180px; margin: 0 auto; }
        .presence-donut-svg { display: block; width: 180px; height: 180px; transform: rotate(-90deg); }
        .presence-donut-center {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          align-content: center;
          text-align: center;
          color: #4a4137;
        }
        .presence-donut-center strong { font-size: 1.4rem; line-height: 1; }
        .presence-donut-center span { font-size: 0.82rem; letter-spacing: 0.08em; text-transform: uppercase; color: #7a6f60; }
        .presence-donut-legend { display: grid; gap: 10px; }
        .presence-legend-item { padding: 10px 12px; border: 1px solid #ddd0be; border-radius: 10px; background: #fffdfa; }
        .presence-legend-label { display: flex; align-items: center; gap: 8px; color: #4a4137; }
        .presence-color-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .presence-legend-item strong { display: block; margin-top: 6px; color: #5a4d3d; }
        .presence-legend-item small { display: block; margin-top: 3px; color: #7a6f60; }
        .presence-label-row { display: flex; justify-content: space-between; gap: 16px; font-size: 13px; color: #4a4137; }
        .presence-bar-track { height: 16px; border: 1px solid #cfc3b0; background: linear-gradient(180deg, #ffffff, #efe8dc); }
        .presence-bar-fill { height: 100%; }
        .weekly-table { width: 100%; border-collapse: collapse; margin-top: 12px; border: 1px solid #c1b094; }
        .weekly-table th, .weekly-table td { border: 1px solid #d0c5b4; padding: 9px 11px; text-align: left; vertical-align: top; }
        .weekly-table th { background: #efe7d9; color: #4b4338; }
        .weekly-table tr:nth-child(even) td { background: #fcfaf6; }
        .signature-table { width: 100%; border-collapse: collapse; margin-top: 28px; border-top: 1px solid #c1b094; }
        .signature-table td { width: 50%; text-align: center; vertical-align: top; padding: 12px 18px 0; }
        .signature-table .signature-date { text-align: left; color: #5e5448; }
        .signature-label { margin: 0; color: #4d4338; }
        .signature-role { margin: 8px 0 0; color: #5e5448; }
        .signature-space { height: 72px; }
        .signature-name { display: inline-block; min-width: 180px; padding-top: 4px; border-top: 1px solid #7b6a51; color: #3f372f; }
      </style>
    </head>
    <body>
      <div class="page">
        <div class="letterhead-shell">
          <div class="letterhead">
            <div class="letterhead-mark">
              <div class="letterhead-logo-frame">
                ${logoMarkup}
              </div>
            </div>
            <div class="letterhead-copy">
              <p class="arabic-line small">المرحلة السلفية العليا</p>
              <p class="arabic-line">معهد عثمان بن عفان لتعليم القرآن لهوكسيماوي</p>
              <h1>MA'HAD UTSMAN BIN AFFAN</h1>
              <h2>Lhokseumawe</h2>
              <p class="org-subtitle">Template rapor santri mengikuti contoh rapor Farhan</p>
              <p class="org-address">Jln. Line Pipa, Desa Alue Lim, Kec. Blang Mangat, Lhokseumawe</p>
              <p class="org-contact">Dokumen pembinaan santri dan perkembangan halaqoh</p>
            </div>
            <div class="letterhead-meta">
              <div class="letterhead-meta-badge">Rapor Santri</div>
              <div class="letterhead-meta-note">
                Tahun ajaran ${escapeHtml(getAcademicYearLabel(getReferenceDate()))}<br>
                Semester ${escapeHtml(getSemesterLabel(getReferenceDate()))}
              </div>
            </div>
          </div>
          <div class="header-rule"></div>
        </div>

        <div class="document-title">
          <h3>TAQRIR NATIJAH AS-SANTRI / RAPOR SANTRI</h3>
          <p>Nomor: ${escapeHtml(letterNumber)} | Periode pemantauan: ${escapeHtml(periodLabel)} | Tanggal cetak: ${escapeHtml(referenceDateLabel)}</p>
        </div>

        <div class="section-panel">
          <h3 class="section-panel-title">AL-HUWIYYAH / Identitas Santri</h3>
          <table class="identity-grid">
            <tr>
              <td><span class="arabic-label">الاسم :</span> ${escapeHtml(employee?.name || "Santri tidak ditemukan")}</td>
              <td><span class="arabic-label">المستوى :</span> ${escapeHtml(employee?.role || "Santri")}</td>
            </tr>
            <tr>
              <td><span class="arabic-label">رقم القيد :</span> ${escapeHtml(studentNumber)}</td>
              <td><span class="arabic-label">العام الدراسي :</span> ${escapeHtml(getAcademicYearLabel(getReferenceDate()))}</td>
            </tr>
            <tr>
              <td><span class="arabic-label">الفصل :</span> ${escapeHtml(getSemesterLabel(getReferenceDate()))}</td>
              <td><span class="arabic-label">الحلقة :</span> ${escapeHtml(employee?.division || "-")}</td>
            </tr>
            <tr>
              <td><span class="arabic-label">اسم الأب :</span> ${escapeHtml(fatherName)}</td>
              <td><span class="arabic-label">اسم الأم :</span> ${escapeHtml(motherName)}</td>
            </tr>
            <tr>
              <td><span class="arabic-label">الحالة الأخيرة :</span> ${escapeHtml(statusText)}</td>
              <td><span class="arabic-label">المحفّظ :</span> ${escapeHtml(preparedBy)}</td>
            </tr>
          </table>
        </div>

        <div class="summary-lines">
          ${summaryLines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
        </div>

        <h3 class="section-title">KASHF AD-DARAJAT / Penilaian Perkembangan</h3>
        <table class="score-table">
          <thead>
            <tr>
              <th width="52">الرقم</th>
              <th>البند / Komponen Penilaian</th>
              <th width="90">الدرجة</th>
              <th>البيان / Keterangan</th>
            </tr>
          </thead>
          <tbody>
            ${assessmentRowsHtml}
          </tbody>
        </table>
        <div class="score-average">المعدل التراكمي / Rata-rata capaian: ${averageScore}</div>

        <div class="section-box">
          <h4>AL-MULAHADZAH LIL WALAD / Catatan untuk Ananda</h4>
          <p>${escapeHtml(studentNote)}</p>
        </div>

        <div class="section-box">
          <h4>AL-MULAHADZAH LIL WALIDAIN / Catatan untuk Wali Santri</h4>
          <p>${escapeHtml(parentNote)}</p>
        </div>

        <h3 class="section-title">BAYAN AT-TATAWWUR AL-USBU'I / Diagram Mingguan</h3>
        ${getWeeklyBarsHtml(weeklyProgress)}
        <table class="weekly-table">
          <thead>
            <tr>
              <th>الأسبوع</th>
              <th>الفترة</th>
              <th>النسبة</th>
              <th>الملاحظة</th>
            </tr>
          </thead>
          <tbody>
            ${weeklyProgress.map((week, index) => `
              <tr>
                <td>${escapeHtml(week.label)}</td>
                <td>${escapeHtml(week.rangeLabel)}</td>
                <td>${week.attendanceRate}%</td>
                <td>${escapeHtml(getWeeklyTrendLabel(week, weeklyProgress[index - 1]))}. ${escapeHtml(getWeeklyHighlight(week))}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <table class="recap">
          <tr>
            <td>Jumlah catatan / عدد السجلات: ${periodRecords.length}</td>
            <td>Persentase hadir / نسبة الحضور: ${attendanceRate}%</td>
            <td>Rata-rata / المعدل: ${averageScore}</td>
          </tr>
          <tr>
            <td>حاضر / Hadir: ${statusCount.hadir || 0}</td>
            <td>مريض / Sakit: ${statusCount.sakit || 0}</td>
            <td>إذن / Izin: ${statusCount.izin || 0}</td>
            <td>متأخر / Terlambat: ${statusCount.terlambat || 0}</td>
          </tr>
        </table>

        <div class="section-box">
          <h4>Mulakhkhas Al-Muhafizh / Ringkasan Musyrif</h4>
          <p>${escapeHtml(guardianSummary)}</p>
        </div>

        <h3 class="section-title">DIAGRAM PRESENSI / KASHF AL-HUDHUR</h3>
        ${getPresenceDiagramHtml(statusCount, periodRecords.length)}

        <h3 class="section-title">KASHF AL-HUDHUR / Rekap Kehadiran</h3>
        <table class="recap">
          <tr>
            <td>Total catatan: ${periodRecords.length}</td>
            <td>Persentase hadir: ${attendanceRate}%</td>
            <td>Hadir: ${statusCount.hadir || 0}</td>
            <td>Sakit: ${statusCount.sakit || 0}</td>
          </tr>
          <tr>
            <td>Izin: ${statusCount.izin || 0}</td>
            <td>Terlambat: ${statusCount.terlambat || 0}</td>
            <td>Rata-rata: ${averageScore}</td>
            <td>Nomor surat: ${escapeHtml(letterNumber)}</td>
          </tr>
        </table>

        <h3 class="section-title">Tarikh Al-Hudhurr / Riwayat Kehadiran</h3>
        <table class="report">
          <thead>
            <tr>
              <th>الرقم</th>
              <th>التاريخ</th>
              <th>وقت الحضور</th>
              <th>الحالة</th>
              <th>البيان</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>

        <table class="signature-table">
          <tr>
            <td>
              <p class="signature-label">الوالد / الوليّ</p>
              <p class="signature-role">Orang Tua / Wali</p>
              <div class="signature-space"></div>
              <strong class="signature-name">(................................)</strong>
            </td>
            <td>
              <p class="signature-date">Lhokseumawe, ${escapeHtml(referenceDateLabel)}</p>
              <p class="signature-role">المحفّظ / ${escapeHtml(preparedRole)}</p>
              <div class="signature-space"></div>
              <strong class="signature-name">${escapeHtml(preparedBy)}</strong>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;
}

function renderDashboardReportPreview() {
  if (reportPreview) {
    reportPreview.srcdoc = buildReportDocumentHtml();
  }
}

function renderWhatsappShareHint() {
  if (!whatsappShareNote) {
    return;
  }

  const canDirectShare = Boolean(navigator.share && navigator.canShare);
  whatsappShareNote.textContent = canDirectShare
    ? "Gunakan 'Bagikan PDF ke WhatsApp' di HP/perangkat yang mendukung share file. Untuk desktop, gunakan 'Buka WhatsApp Web' lalu lampirkan PDF yang sudah diunduh."
    : "Gunakan 'Buka WhatsApp Web' di desktop, atau unduh PDF lebih dulu lalu lampirkan ke chat wali santri.";
}

function renderReportStudentOptions() {
  if (!reportStudentSelect) {
    return;
  }

  const currentValue = reportStudentSelect.value;
  reportStudentSelect.innerHTML = "";

  [...state.employees]
    .sort((left, right) => left.name.localeCompare(right.name))
    .forEach((employee) => {
      const option = document.createElement("option");
      option.value = employee.id;
      option.textContent = `${employee.name} - ${employee.division}`;
      reportStudentSelect.appendChild(option);
    });

  const nextValue = state.employees.some((employee) => employee.id === currentValue)
    ? currentValue
    : state.employees[0]?.id;

  if (nextValue) {
    reportStudentSelect.value = nextValue;
  }
}

function renderActivity() {
  activityList.innerHTML = "";
  state.activityLog.forEach((itemData, index) => {
    const item = document.createElement("div");
    item.className = "activity-item";
    item.innerHTML = `
      <span>${itemData.text}</span>
      <span class="badge ${index === 0 ? "warning" : "success"}">${itemData.badge}</span>
    `;
    activityList.appendChild(item);
  });
}

function renderAccounts() {
  accountList.innerHTML = "";

  if (!state.accounts.length && currentUser) {
    state.accounts = [normalizeAccount(currentUser)];
  }

  const filtered = state.accounts.filter((account) => {
    if (currentAccountFilter === "active") return account.isActive !== false;
    if (currentAccountFilter === "inactive") return account.isActive === false;
    return true;
  });

  filtered.forEach((account) => {
    const isAccountActive = account.isActive !== false;
    const canManageAccount = isCurrentUserAdmin()
      && !isAdminRole(account.role)
      && account.username !== currentUser?.username;

    const item = document.createElement("div");
    item.className = "account-item";
    item.innerHTML = `
      <div class="account-copy">
        <strong>${account.name || account.label}</strong>
        <p class="report-meta">${account.username}</p>
      </div>
      <div class="account-actions">
        <span class="badge ${isAccountActive ? "success" : "warning"} account-badge">${isAccountActive ? "Akun aktif" : "Akun nonaktif"}</span>
        ${canManageAccount ? `
          <button class="btn-ghost account-edit-button" type="button" data-account-id="${account.id}" data-account-username="${account.username}" data-account-name="${account.name || account.label}">Edit akun</button>
          <button class="${isAccountActive ? "btn-ghost danger" : "btn-secondary"} account-status-button" type="button" data-account-id="${account.id}" data-account-username="${account.username}" data-next-active="${(!isAccountActive).toString()}">${isAccountActive ? "Nonaktifkan akun" : "Aktifkan akun"}</button>` : ""}
      </div>
    `;
    accountList.appendChild(item);
  });

  if (!accountList.children.length) {
    const emptyMsg = currentAccountFilter === "inactive"
      ? "Tidak ada akun yang dinonaktifkan."
      : currentAccountFilter === "active"
        ? "Tidak ada akun aktif."
        : "Akun pengelola akan tampil di sini setelah login.";
    accountList.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
  }
}

function renderAdminTools() {
  if (!adminToolsCard) {
    return;
  }

  adminToolsCard.classList.toggle("hidden", !isCurrentUserAdmin());
}

function renderMonthlyBars() {
  monthlyBars.innerHTML = "";
  state.monthlyStats.forEach((itemData) => {
    const group = document.createElement("div");
    group.className = "bar-group";
    group.innerHTML = `
      <span class="bar-value">${itemData.presentRate}%</span>
      <div class="bar" style="height: ${itemData.presentRate}%;"></div>
      <span class="bar-label">${itemData.month}</span>
    `;
    monthlyBars.appendChild(group);
  });
}

function renderDashboardMiniBars() {
  if (!dashboardMonthlyBars) {
    return;
  }

  dashboardMonthlyBars.innerHTML = "";
  state.monthlyStats.forEach((itemData) => {
    const group = document.createElement("div");
    group.className = "mini-bar-group";
    group.innerHTML = `
      <div class="mini-bar" style="height: ${itemData.presentRate}%;"></div>
    `;
    dashboardMonthlyBars.appendChild(group);
  });
}

function renderDonutInto(chartNode, legendNode) {
  if (!chartNode || !legendNode) {
    return;
  }

  const todayRecords = getTodayRecords();
  const total = todayRecords.length || 1;
  const statusCount = countByStatus(todayRecords);
  const hadir = Math.round(((statusCount.hadir || 0) / total) * 100);
  const sakit = Math.round(((statusCount.sakit || 0) / total) * 100);
  const izin = Math.round(((statusCount.izin || 0) / total) * 100);
  const terlambat = Math.max(100 - hadir - sakit - izin, 0);

  chartNode.style.background = `conic-gradient(
    var(--success) 0 ${hadir}%,
    #e7d7c2 ${hadir}% ${Math.min(hadir + sakit, 100)}%,
    var(--warning) ${Math.min(hadir + sakit, 100)}% ${Math.min(hadir + sakit + izin, 100)}%,
    var(--danger) ${Math.min(hadir + sakit + izin, 100)}% 100%
  )`;
  chartNode.dataset.center = `${hadir}%`;

  const legendItems = [
    { label: "Hadir", color: "var(--success)", value: `${hadir}%` },
    { label: "Sakit", color: "#e7d7c2", value: `${sakit}%` },
    { label: "Izin", color: "var(--warning)", value: `${izin}%` },
    { label: "Terlambat", color: "var(--danger)", value: `${terlambat}%` }
  ];

  legendNode.innerHTML = "";
  legendItems.forEach((item) => {
    const row = document.createElement("div");
    row.className = "legend-item";
    row.innerHTML = `
      <span class="legend-label"><span class="dot" style="background: ${item.color};"></span>${item.label}</span>
      <strong>${item.value}</strong>
    `;
    legendNode.appendChild(row);
  });
}

function renderDonut() {
  renderDonutInto(donutChart, donutLegend);
  renderDonutInto(dashboardDonutChart, dashboardDonutLegend);
}

function renderAttendanceTable() {
  attendanceTableBody.innerHTML = "";
  const mergedRecords = getMergedRecords();
  const canManageAttendanceRecords = canManageProtectedData();

  mergedRecords.forEach((record) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${record.employeeName}</td>
      <td>${record.division}</td>
      <td>${record.date}</td>
      <td>${record.checkIn}</td>
      <td><span class="status ${getStatusClass(record.status)}">${record.status}</span></td>
      <td>${record.note}</td>
      <td>
        ${canManageAttendanceRecords ? `<div class="table-actions">
          <button class="btn-inline" type="button" data-action="edit-attendance" data-attendance-id="${record.id}">Edit</button>
          <button class="btn-inline danger" type="button" data-action="delete-attendance" data-attendance-id="${record.id}">Hapus</button>
        </div>` : `<span class="report-meta">Terkunci</span>`}
      </td>
    `;
    attendanceTableBody.appendChild(row);
  });
}

function renderAttendanceEmployeeOptions() {
  attendanceEmployeeSelect.innerHTML = '<option value="">Pilih santri</option>';

  [...state.employees]
    .sort((left, right) => left.name.localeCompare(right.name))
    .forEach((employee) => {
      const option = document.createElement("option");
      option.value = employee.id;
      option.textContent = `${employee.name} - ${employee.division}`;
      attendanceEmployeeSelect.appendChild(option);
    });
}

function renderDateText() {
  dashboardDate.textContent = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date("2026-05-13"));
}

function renderAll() {
  if (reportReferenceDateInput && !reportReferenceDateInput.value) {
    reportReferenceDateInput.value = "2026-05-13";
  }
  renderDateText();
  renderDashboard();
  renderReports();
  renderEmployeeList();
  renderActivity();
  renderAccounts();
  renderAdminTools();
  renderReportStudentOptions();
  renderMonthlyBars();
  renderDashboardMiniBars();
  renderDonut();
  renderAttendanceTable();
  renderAttendanceEmployeeOptions();
  renderDashboardReportPreview();
  renderWhatsappShareHint();
  renderRoleAccess();
  ensureReportLogoReady();
}

function renderRoleAccess() {
  const canManage = canManageProtectedData();

  employeeForm?.closest(".card")?.classList.toggle("hidden", !canManage);
  reportForm?.closest(".card")?.classList.toggle("hidden", !canManage);

  if (!canManage && editingEmployeeId) {
    resetEmployeeForm();
  }

  if (!canManage && editingAttendanceId) {
    resetAttendanceForm();
  }
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadBlobFile(filename, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportCsv() {
  const rows = [
    ["ID Santri", "Nama", "Kelompok", "Tanggal", "Jam Masuk", "Status", "Catatan"]
  ];

  getMergedRecords().forEach((record) => {
    rows.push([
      record.employeeId,
      record.employeeName,
      record.division,
      record.date,
      record.checkIn,
      record.status,
      record.note
    ]);
  });

  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll("\"", '""')}"`).join(",")).join("\n");
  downloadFile("laporan-absensi.csv", csv, "text/csv;charset=utf-8");
}

function exportJson() {
  const payload = JSON.stringify({
    exportedAt: new Date().toISOString(),
    employees: state.employees,
    attendance: getMergedRecords(),
    reports: state.reports
  }, null, 2);

  downloadFile("laporan-absensi.json", payload, "application/json;charset=utf-8");
}

async function exportReportDoc() {
  await ensureReportLogoReady();
  const employee = getEmployeeById(getSelectedReportEmployeeId());
  const period = getSelectedReportPeriod();
  const documentHtml = buildReportDocumentHtml();
  const fileSlug = (employee?.name || "santri").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  downloadFile(`laporan-${period === "monthly" ? "bulanan" : "mingguan"}-${fileSlug}.doc`, documentHtml, "application/msword;charset=utf-8");
}

function getReportFileName(extension = "doc") {
  const employee = getEmployeeById(getSelectedReportEmployeeId());
  const period = getSelectedReportPeriod();
  const fileSlug = (employee?.name || "santri").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `laporan-${period === "monthly" ? "bulanan" : "mingguan"}-${fileSlug}.${extension}`;
}

function getPdfConstructor() {
  return window.jspdf?.jsPDF || null;
}

let pdfLogoDataUrlPromise = null;
let reportLogoDataUrl = "";

function loadPdfLogoDataUrl() {
  if (pdfLogoDataUrlPromise) {
    return pdfLogoDataUrlPromise;
  }

  pdfLogoDataUrlPromise = fetch("logo mataqu .png")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal memuat logo PDF.");
      }

      return response.blob();
    })
    .then((blob) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Gagal membaca logo PDF."));
      reader.readAsDataURL(blob);
    }))
    .catch(() => null);

  return pdfLogoDataUrlPromise;
}

function ensureReportLogoReady() {
  return loadPdfLogoDataUrl().then((dataUrl) => {
    if (dataUrl && reportLogoDataUrl !== dataUrl) {
      reportLogoDataUrl = dataUrl;
      renderDashboardReportPreview();
    }

    return reportLogoDataUrl;
  });
}

function getWhatsappTargetUrl(rawNumber) {
  const localNumber = String(rawNumber || "").trim().replace(/[^\d]/g, "").replace(/^0+/, "").replace(/^62/, "");
  const whatsappNumber = localNumber ? `62${localNumber}` : "";
  return whatsappNumber ? `https://wa.me/${whatsappNumber}` : "https://wa.me/";
}

function getWhatsappWebTargetUrl(rawNumber, text = "") {
  const localNumber = String(rawNumber || "").trim().replace(/[^\d]/g, "").replace(/^0+/, "").replace(/^62/, "");
  const phoneParam = localNumber ? `phone=62${localNumber}` : "";
  const textParam = text ? `text=${encodeURIComponent(text)}` : "";
  const params = [phoneParam, textParam].filter(Boolean).join("&");
  return `https://web.whatsapp.com/send${params ? `?${params}` : ""}`;
}

function buildWhatsappCaption() {
  const context = getReportContext();
  return [
    "Assalamu'alaikum warahmatullahi wabarakatuh,",
    "",
    `Dengan hormat, bersama pesan ini kami sampaikan laporan PDF perkembangan kehadiran ananda ${context.employee?.name || "santri"}.`,
    `Nomor surat: ${context.letterNumber}`,
    `Periode laporan: ${context.periodLabel}`,
    `Kelas halaqoh: ${context.employee?.division || "-"}`,
    "Mohon kiranya Bapak/Ibu berkenan meninjau dokumen PDF terlampir sebagai bahan pemantauan perkembangan ananda.",
    "",
    `Hormat kami, ${context.preparedBy}`,
    context.preparedRole
  ].join("\n");
}

function showWhatsappMessage(text, timeout = 4000) {
  if (!whatsappMessage) {
    return;
  }

  whatsappMessage.textContent = text;
  whatsappMessage.classList.remove("hidden");
  window.setTimeout(() => whatsappMessage.classList.add("hidden"), timeout);
}

function buildPdfSummaryLines(context, weeklyProgress) {
  const latestWeek = weeklyProgress[weeklyProgress.length - 1];
  const assessmentRows = buildRaporAssessmentRows(context, weeklyProgress);
  const averageScore = buildRaporAverage(assessmentRows);
  return [
    `Nomor surat: ${context.letterNumber}`,
    `Periode rapor / الفترة: ${context.periodLabel}`,
    `Tahun ajaran / العام الدراسي: ${getAcademicYearLabel(getReferenceDate())} | Semester / الفصل: ${getSemesterLabel(getReferenceDate())}`,
    `Status terakhir / الحالة الأخيرة: ${context.latestRecord ? context.latestRecord.status : "Belum ada catatan"}`,
    `Persentase hadir / نسبة الحضور: ${getAttendanceRate(context.periodRecords)}% | Rata-rata capaian / المعدل: ${averageScore}`,
    `Ringkasan musyrif / ملخص المحفّظ: ${getGuardianProgressSummary(context.employee, weeklyProgress, context.latestRecord ? context.latestRecord.status : "Belum ada catatan")}`,
    latestWeek
      ? `Minggu berjalan: ${latestWeek.label} (${latestWeek.rangeLabel}) dengan persentase hadir ${latestWeek.attendanceRate}%`
      : "Minggu berjalan: Belum ada data"
  ];
}

function addPdfWrappedText(doc, text, x, y, maxWidth, lineHeight = 14) {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + (lines.length * lineHeight);
}

function ensurePdfPageSpace(doc, cursorY, requiredHeight) {
  const pageHeight = doc.internal.pageSize.getHeight();

  if (cursorY + requiredHeight <= pageHeight - 40) {
    return cursorY;
  }

  doc.addPage();
  return 40;
}

async function buildReportPdfBlob() {
  const PdfCtor = getPdfConstructor();

  if (!PdfCtor) {
    return null;
  }

  const context = getReportContext();
  const weeklyProgress = getMonthWeekProgress();
  const statusCount = context.statusCount;
  const attendanceRate = getAttendanceRate(context.periodRecords);
  const assessmentRows = buildRaporAssessmentRows(context, weeklyProgress);
  const averageScore = buildRaporAverage(assessmentRows);
  const studentNote = buildStudentNote(context, assessmentRows);
  const parentNote = buildParentNote(context, weeklyProgress);
  const doc = new PdfCtor({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 80;
  const logoDataUrl = await loadPdfLogoDataUrl();
  let cursorY = 40;

  doc.setFillColor(252, 249, 243);
  doc.roundedRect(28, 28, pageWidth - 56, 104, 16, 16, "F");
  doc.setDrawColor(111, 93, 63);
  doc.setLineWidth(1.2);
  doc.line(40, 122, pageWidth - 40, 122);
  doc.setLineWidth(0.6);
  doc.line(40, 127, pageWidth - 40, 127);

  if (logoDataUrl) {
    doc.addImage(logoDataUrl, "PNG", 44, 42, 62, 62);
  }

  doc.setFont("helvetica", "bold");
  doc.setTextColor(64, 50, 33);
  doc.setFontSize(11);
  doc.text("AL-MARHALAH AS-SALAFIYYAH AL-'ULYA", 118, 52);
  doc.setFontSize(18);
  doc.text("MA'HAD UTSMAN BIN AFFAN LI TA'LIMIL QUR'AN", 118, 74);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(103, 91, 75);
  doc.setFontSize(10);
  doc.text("Lhokseumawe | Jln. Line Pipa, Desa Alue Lim, Kec. Blang Mangat", 118, 94);
  doc.text("Rapor perkembangan santri mengikuti format contoh rapor Farhan.", 118, 109);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(64, 50, 33);
  doc.setFontSize(15);
  doc.text("TAQRIR NATIJAH AS-SANTRI / RAPOR SANTRI", pageWidth / 2, 154, { align: "center" });
  cursorY = 180;

  cursorY = ensurePdfPageSpace(doc, cursorY, 122);
  doc.setFillColor(255, 253, 248);
  doc.setDrawColor(193, 176, 148);
  doc.roundedRect(40, cursorY, contentWidth, 108, 10, 10, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("AL-HUWIYYAH / Identitas Santri", 54, cursorY + 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Nomor induk santri: ${context.studentNumber}`, 54, cursorY + 38);
  doc.text(`Nama santri: ${context.employee?.name || "Santri tidak ditemukan"}`, 54, cursorY + 54);
  doc.text(`Nama ayah: ${context.fatherName}`, 54, cursorY + 70);
  doc.text(`Nama ibu: ${context.motherName}`, 300, cursorY + 70);
  doc.text(`Kelas halaqoh: ${context.employee?.division || "-"}`, 300, cursorY + 38);
  doc.text(`Kategori: ${context.employee?.role || "-"}`, 300, cursorY + 54);
  doc.text(`Tahun ajaran: ${getAcademicYearLabel(getReferenceDate())}`, 54, cursorY + 86);
  doc.text(`Semester: ${getSemesterLabel(getReferenceDate())}`, 300, cursorY + 86);
  cursorY += 126;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  buildPdfSummaryLines(context, weeklyProgress).forEach((line) => {
    cursorY = ensurePdfPageSpace(doc, cursorY, 24);
    cursorY = addPdfWrappedText(doc, line, 40, cursorY, contentWidth, 14) + 2;
  });

  cursorY += 8;
  cursorY = ensurePdfPageSpace(doc, cursorY, 170);
  doc.setFillColor(248, 243, 235);
  doc.setDrawColor(193, 176, 148);
  doc.roundedRect(40, cursorY, contentWidth, 146, 10, 10, "FD");
  doc.setFont("helvetica", "bold");
  doc.text("KASHF AD-DARAJAT / Penilaian Perkembangan", 54, cursorY + 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  let tableY = cursorY + 34;
  doc.setFont("helvetica", "bold");
  doc.text("Komponen", 58, tableY);
  doc.text("Darajah", 300, tableY);
  doc.text("Bayan", 356, tableY);
  doc.line(54, tableY + 6, pageWidth - 54, tableY + 6);
  tableY += 20;
  doc.setFont("helvetica", "normal");
  assessmentRows.forEach((row) => {
    doc.text(row.title, 58, tableY);
    doc.text(String(row.score), 304, tableY);
    const noteLines = doc.splitTextToSize(row.note, 180);
    doc.text(noteLines, 356, tableY);
    tableY += Math.max(18, noteLines.length * 11 + 6);
  });
  doc.setFont("helvetica", "bold");
  doc.text(`Al-Mi'dal / Rata-rata: ${averageScore}`, pageWidth - 54, cursorY + 130, { align: "right" });
  cursorY += 162;

  cursorY = ensurePdfPageSpace(doc, cursorY, 138);
  doc.setFillColor(255, 252, 246);
  doc.setDrawColor(193, 176, 148);
  doc.roundedRect(40, cursorY, contentWidth, 54, 8, 8, "FD");
  doc.setFont("helvetica", "bold");
  doc.text("AL-MULAHADZAH LIL WALAD / Catatan untuk Ananda", 54, cursorY + 18);
  doc.setFont("helvetica", "normal");
  addPdfWrappedText(doc, studentNote, 54, cursorY + 34, contentWidth - 28, 12);
  cursorY += 68;

  doc.roundedRect(40, cursorY, contentWidth, 54, 8, 8, "FD");
  doc.setFont("helvetica", "bold");
  doc.text("AL-MULAHADZAH LIL WALIDAIN / Catatan untuk Wali", 54, cursorY + 18);
  doc.setFont("helvetica", "normal");
  addPdfWrappedText(doc, parentNote, 54, cursorY + 34, contentWidth - 28, 12);
  cursorY += 76;

  cursorY = ensurePdfPageSpace(doc, cursorY, 220);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("BAYAN AT-TATAWWUR AL-USBU'I / Diagram Mingguan", 40, cursorY);
  cursorY += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  cursorY = addPdfWrappedText(doc, "Diagram berikut memperlihatkan perkembangan persentase kehadiran santri pada tiap pekan berdasarkan data absensi yang tersimpan.", 40, cursorY, contentWidth, 13) + 8;

  const chartX = 56;
  const chartBaseY = cursorY + 128;
  const chartHeight = 108;
  const barWidth = 52;
  const barGap = 18;
  doc.setDrawColor(206, 194, 174);
  doc.line(chartX - 6, chartBaseY, pageWidth - 56, chartBaseY);
  doc.setFontSize(8.5);
  [0, 25, 50, 75, 100].forEach((mark) => {
    const y = chartBaseY - ((mark / 100) * chartHeight);
    doc.setDrawColor(234, 228, 218);
    doc.line(chartX - 6, y, pageWidth - 56, y);
    doc.setTextColor(124, 113, 97);
    doc.text(`${mark}%`, chartX - 28, y + 3);
  });

  weeklyProgress.forEach((week, index) => {
    const x = chartX + (index * (barWidth + barGap));
    const barHeight = Math.max((week.attendanceRate / 100) * chartHeight, 8);
    doc.setFillColor(239, 233, 223);
    doc.rect(x, chartBaseY - chartHeight, barWidth, chartHeight, "F");
    doc.setFillColor(112, 137, 87);
    doc.rect(x, chartBaseY - barHeight, barWidth, barHeight, "F");
    doc.setTextColor(64, 50, 33);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(`${week.attendanceRate}%`, x + (barWidth / 2), chartBaseY - barHeight - 8, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(week.label, x + (barWidth / 2), chartBaseY + 14, { align: "center" });
    const rangeLines = doc.splitTextToSize(week.rangeLabel, barWidth + 14);
    doc.setFontSize(8.5);
    doc.text(rangeLines, x + (barWidth / 2), chartBaseY + 26, { align: "center" });
  });
  cursorY = chartBaseY + 46;

  const presenceItems = getPresenceLegendItems(statusCount, context.periodRecords.length);
  cursorY = ensurePdfPageSpace(doc, cursorY, 200);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("DIAGRAM PRESENSI / KASHF AL-HUDHUR", 40, cursorY);
  cursorY += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  drawPdfDonutChart(doc, 126, cursorY + 72, 52, 30, presenceItems, context.periodRecords.length || 1);
  doc.setTextColor(64, 50, 33);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(`${Math.round(((statusCount.hadir || 0) / (context.periodRecords.length || 1)) * 100)}%`, 126, cursorY + 76, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Hadir", 126, cursorY + 90, { align: "center" });

  let legendY = cursorY + 18;
  presenceItems.forEach((item) => {
    doc.setFillColor(...hexToRgb(item.color));
    doc.circle(230, legendY - 3, 4, "F");
    doc.setTextColor(64, 50, 33);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`${item.arabicLabel} / ${item.label}`, 242, legendY);
    doc.setFont("helvetica", "normal");
    doc.text(`${item.value} catatan`, 395, legendY);
    doc.text(`${item.percent}%`, pageWidth - 40, legendY, { align: "right" });
    doc.setDrawColor(206, 194, 174);
    doc.setFillColor(243, 238, 230);
    doc.rect(242, legendY + 8, 240, 10, "FD");
    if (item.value) {
      doc.setFillColor(...hexToRgb(item.color));
      doc.rect(242, legendY + 8, Math.max((240 * item.percent) / 100, 10), 10, "F");
    }
    legendY += 30;
  });
  cursorY += 170;

  cursorY = ensurePdfPageSpace(doc, cursorY, 90);
  doc.setFont("helvetica", "bold");
  doc.text("KASHF AL-HUDHUR / Rekap Kehadiran", 40, cursorY);
  cursorY += 18;
  doc.setFont("helvetica", "normal");
  doc.text(`Total catatan: ${context.periodRecords.length}`, 40, cursorY);
  doc.text(`Persentase hadir: ${attendanceRate}%`, 180, cursorY);
  doc.text(`Hadir: ${statusCount.hadir || 0}`, 320, cursorY);
  doc.text(`Sakit: ${statusCount.sakit || 0}`, 400, cursorY);
  doc.text(`Izin: ${statusCount.izin || 0}`, 470, cursorY);
  doc.text(`Terlambat: ${statusCount.terlambat || 0}`, 40, cursorY + 18);
  cursorY += 40;

  cursorY += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Tarikh Al-Hudhurr / Riwayat Kehadiran", 40, cursorY);
  cursorY += 16;
  doc.setFont("helvetica", "normal");
  const recordLines = context.periodRecords.length
    ? context.periodRecords.map((record, index) => `${index + 1}. ${formatRecordDate(record.date)} | ${record.checkIn} | ${record.status} | ${record.note}`)
    : ["Belum ada data kehadiran pada periode ini."];

  recordLines.forEach((line) => {
    cursorY = ensurePdfPageSpace(doc, cursorY, 22);
    cursorY = addPdfWrappedText(doc, line, 40, cursorY, contentWidth, 13) + 2;
  });

  cursorY = ensurePdfPageSpace(doc, cursorY + 12, 80);
  doc.setDrawColor(193, 176, 148);
  doc.line(40, cursorY + 2, pageWidth - 40, cursorY + 2);
  doc.setFont("helvetica", "normal");
  doc.text("Al-Walid / Wali", 80, cursorY + 18);
  doc.text(`Lhokseumawe, ${context.referenceDateLabel}`, pageWidth - 200, cursorY + 18);
  doc.text(context.preparedRole, pageWidth - 200, cursorY + 34);
  doc.text("(................................)", 80, cursorY + 78);
  doc.setFont("helvetica", "bold");
  doc.text(context.preparedBy, pageWidth - 200, cursorY + 78);

  return doc.output("blob");
}

async function createWhatsappReportFile() {
  const pdfBlob = await buildReportPdfBlob();

  if (!pdfBlob) {
    return null;
  }

  const filename = getReportFileName("pdf");
  return new File([pdfBlob], filename, { type: "application/pdf" });
}

async function printReportPdf() {
  const pdfBlob = await buildReportPdfBlob();

  if (!pdfBlob) {
    if (whatsappMessage) {
      whatsappMessage.textContent = "Generator PDF belum tersedia. Muat ulang halaman lalu coba lagi.";
      whatsappMessage.classList.remove("hidden");
      window.setTimeout(() => whatsappMessage.classList.add("hidden"), 4000);
    }
    return;
  }

  downloadBlobFile(getReportFileName("pdf"), pdfBlob);
}

async function sendReportToWhatsapp() {
  const reportFile = await createWhatsappReportFile();
  const target = getWhatsappTargetUrl(whatsappNumberInput?.value || "");
  const shareText = buildWhatsappCaption();

  if (!reportFile) {
    showWhatsappMessage("Generator PDF belum tersedia. Muat ulang halaman lalu coba lagi.");
    return;
  }

  if (navigator.share && navigator.canShare && navigator.canShare({ files: [reportFile] })) {
    try {
      await navigator.share({
        title: "Laporan Kehadiran Santri",
        text: shareText,
        files: [reportFile]
      });

      showWhatsappMessage("File PDF laporan berhasil dibagikan. Pilih WhatsApp pada menu berbagi perangkat Anda.", 3000);

      return;
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }
    }
  }

  downloadBlobFile(reportFile.name, reportFile);
  const mobileTarget = `${target}?text=${encodeURIComponent(shareText)}`;

  const openedWindow = window.open(mobileTarget, "_blank", "noopener,noreferrer");

  if (!openedWindow) {
    window.location.href = mobileTarget;
  }

  showWhatsappMessage("File PDF laporan sudah diunduh. Chat WhatsApp dibuka dengan caption, lalu lampirkan file PDF tersebut.");
}

async function sendReportToWhatsappWeb() {
  const reportFile = await createWhatsappReportFile();
  const caption = buildWhatsappCaption();
  const target = getWhatsappWebTargetUrl(whatsappNumberInput?.value || "", caption);

  if (!reportFile) {
    showWhatsappMessage("Generator PDF belum tersedia. Muat ulang halaman lalu coba lagi.");
    return;
  }

  downloadBlobFile(reportFile.name, reportFile);

  const openedWindow = window.open(target, "_blank", "noopener,noreferrer");

  if (!openedWindow) {
    window.location.href = target;
  }

  showWhatsappMessage("WhatsApp Web dibuka dan caption siap dipakai. Lampirkan file PDF yang baru diunduh ke chat wali santri.");
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    setMessage(loginSuccess, "", "");
    setMessage(loginError, "error", "Nama pengguna dan password wajib diisi.");
    return;
  }

  setMessage(loginError, "", "");
  setMessage(loginSuccess, "success", "Memproses login...");

  try {
    const account = await loginWithBackend(username, password);
    applyCurrentUser(account);
    await syncBackendData();
    clearAuthMessages();
    showScreen(dashboardScreen);
    setActivePage("dashboard");
    renderAll();
  } catch (error) {
    passwordInput.value = "";
    setMessage(loginSuccess, "", "");
    setMessage(loginError, "error", error.message || "Nama pengguna atau password tidak cocok.");
  }
});

forgotForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = forgotUsernameInput.value.trim().toLowerCase();
  const password = forgotPasswordInput.value.trim();
  const passwordConfirm = forgotPasswordConfirmInput.value.trim();

  if (!username || !password) {
    setMessage(forgotMessage, "error", "Nama pengguna dan password baru wajib diisi.");
    return;
  }

  if (password.length < 6) {
    setMessage(forgotMessage, "error", "Password baru minimal 6 karakter.");
    return;
  }

  if (password !== passwordConfirm) {
    setMessage(forgotMessage, "error", "Ulangi password baru dengan sama.");
    return;
  }

  resetBackendPassword({ username, password })
    .then(() => {
      forgotForm.reset();
      usernameInput.value = username;
      passwordInput.value = password;
      clearAuthMessages();
      setAuthView("login");
      setMessage(loginSuccess, "success", "Password berhasil diperbarui. Silakan masuk dengan password baru.");
    })
    .catch((error) => {
      setMessage(forgotMessage, "error", error.message || "Gagal memperbarui password.");
    });
});

signupForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = signupNameInput.value.trim();
  const role = signupRoleInput.value;
  const username = signupUsernameInput.value.trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "");
  const password = signupPasswordInput.value.trim();
  const passwordConfirm = signupPasswordConfirmInput.value.trim();

  if (!name || !role || !username || !password) {
    setMessage(signupMessage, "error", "Lengkapi semua data akun baru.");
    return;
  }

  if (password.length < 6) {
    setMessage(signupMessage, "error", "Password minimal 6 karakter.");
    return;
  }

  if (password !== passwordConfirm) {
    setMessage(signupMessage, "error", "Ulangi password dengan sama.");
    return;
  }

  try {
    const nextAccount = await createBackendAccount({ name, role, username, password });
    state.accounts = [...state.accounts, nextAccount];
    saveState();
    signupForm.reset();
    usernameInput.value = nextAccount.username;
    passwordInput.value = password;
    clearAuthMessages();
    setAuthView("login");
    setMessage(loginSuccess, "success", `Akun ${nextAccount.label} berhasil dibuat. Silakan masuk.`);
    renderAccounts();
  } catch (error) {
    setMessage(signupMessage, "error", error.message || "Gagal membuat akun baru.");
  }
});

adminAccountForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = adminAccountNameInput.value.trim();
  const username = adminAccountUsernameInput.value.trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "");
  const password = adminAccountPasswordInput.value.trim();
  const passwordConfirm = adminAccountPasswordConfirmInput.value.trim();

  if (!name || !username || !password) {
    setMessage(adminAccountMessage, "error", "Lengkapi semua data akun guru baru.");
    return;
  }

  if (password.length < 6) {
    setMessage(adminAccountMessage, "error", "Password minimal 6 karakter.");
    return;
  }

  if (password !== passwordConfirm) {
    setMessage(adminAccountMessage, "error", "Ulangi password dengan sama.");
    return;
  }

  try {
    const nextAccount = await createBackendAccount({ name, role: "guru", username, password });
    state.accounts = [...state.accounts.filter((account) => account.username !== nextAccount.username), nextAccount];
    saveState();
    renderAccounts();
    adminAccountForm.reset();
    setMessage(adminAccountMessage, "success", `Akun ${nextAccount.username} berhasil dibuat.`);
  } catch (error) {
    setMessage(adminAccountMessage, "error", error.message || "Gagal membuat akun guru baru.");
  }
});

adminResetForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = adminResetUsernameInput.value.trim().toLowerCase();
  const password = adminResetPasswordInput.value.trim();
  const passwordConfirm = adminResetPasswordConfirmInput.value.trim();

  if (!username || !password) {
    setMessage(adminResetMessage, "error", "Nama pengguna dan password baru wajib diisi.");
    return;
  }

  if (password.length < 6) {
    setMessage(adminResetMessage, "error", "Password baru minimal 6 karakter.");
    return;
  }

  if (password !== passwordConfirm) {
    setMessage(adminResetMessage, "error", "Ulangi password baru dengan sama.");
    return;
  }

  try {
    await resetBackendPassword({ username, password });
    adminResetForm.reset();
    setMessage(adminResetMessage, "success", `Password akun ${username} berhasil diperbarui.`);
  } catch (error) {
    setMessage(adminResetMessage, "error", error.message || "Gagal mereset password akun.");
  }
});

function fillEditForm(id, name, username) {
  if (!adminEditForm) return;
  adminEditIdInput.value = id;
  adminEditNameInput.value = name;
  adminEditUsernameInput.value = username;
  if (adminEditHint) adminEditHint.classList.add("hidden");
  adminEditForm.classList.remove("hidden");
  if (adminEditMessage) adminEditMessage.classList.add("hidden");
  adminEditPanel?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function clearEditForm() {
  if (!adminEditForm) return;
  adminEditIdInput.value = "";
  adminEditForm.reset();
  adminEditForm.classList.add("hidden");
  if (adminEditHint) adminEditHint.classList.remove("hidden");
  if (adminEditMessage) adminEditMessage.classList.add("hidden");
}

adminEditCancelButton?.addEventListener("click", () => {
  clearEditForm();
});

adminEditForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = Number(adminEditIdInput.value);
  const name = adminEditNameInput.value.trim();
  const username = adminEditUsernameInput.value.trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "");

  if (!id || !name || !username) {
    setMessage(adminEditMessage, "error", "Nama dan nama pengguna wajib diisi.");
    return;
  }

  try {
    const result = await editBackendAccount({ id, name, username });
    state.accounts = state.accounts.map((account) => {
      if (account.id !== id) return account;
      return { ...account, name: result.updatedUser.name, username: result.updatedUser.username };
    });
    saveState();
    clearEditForm();
    renderAccounts();
    setMessage(adminAccountMessage, "success", `Akun ${result.updatedUser.username} berhasil diperbarui.`);
  } catch (error) {
    setMessage(adminEditMessage, "error", error.message || "Gagal memperbarui akun.");
  }
});

changePasswordForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const currentPassword = changeCurrentPasswordInput.value.trim();
  const newPassword = changeNewPasswordInput.value.trim();
  const newPasswordConfirm = changeNewPasswordConfirmInput.value.trim();

  if (!currentPassword || !newPassword) {
    setMessage(changePasswordMessage, "error", "Password lama dan password baru wajib diisi.");
    return;
  }

  if (newPassword.length < 8) {
    setMessage(changePasswordMessage, "error", "Password baru minimal 8 karakter.");
    return;
  }

  if (newPassword !== newPasswordConfirm) {
    setMessage(changePasswordMessage, "error", "Ulangi password baru dengan sama.");
    return;
  }

  try {
    await changeBackendPassword({ currentPassword, newPassword });
    changePasswordForm.reset();
    setMessage(changePasswordMessage, "success", "Password berhasil diganti. Gunakan password baru saat login berikutnya.");
  } catch (error) {
    setMessage(changePasswordMessage, "error", error.message || "Gagal mengganti password.");
  }
});

accountFilterBar?.addEventListener("click", (event) => {
  const pill = event.target.closest("[data-filter]");
  if (!pill) return;

  currentAccountFilter = pill.dataset.filter;
  accountFilterBar.querySelectorAll(".account-filter-pill").forEach((p) => {
    p.classList.toggle("active", p.dataset.filter === currentAccountFilter);
  });
  renderAccounts();
});

accountList?.addEventListener("click", async (event) => {
  // Edit button
  const editTrigger = event.target.closest(".account-edit-button");
  if (editTrigger && isCurrentUserAdmin()) {
    const { accountId, accountUsername, accountName } = editTrigger.dataset;
    fillEditForm(Number(accountId), accountName, accountUsername);
    return;
  }

  const trigger = event.target.closest("[data-account-id]");

  if (!trigger || !isCurrentUserAdmin()) {
    return;
  }

  const { accountId, accountUsername, nextActive } = trigger.dataset;

  if (!accountId) {
    return;
  }

  const shouldActivate = nextActive === "true";

  const confirmed = window.confirm(
    shouldActivate
      ? `Aktifkan kembali akun ${accountUsername || "ini"}?`
      : `Nonaktifkan akun ${accountUsername || "ini"}? Akun tidak bisa login sampai diaktifkan kembali.`
  );

  if (!confirmed) {
    return;
  }

  try {
    await setBackendAccountStatus(Number(accountId), shouldActivate);
    state.accounts = state.accounts.map((account) => {
      if (String(account.id) !== accountId) {
        return account;
      }

      return {
        ...account,
        isActive: shouldActivate
      };
    });
    saveState();
    renderAccounts();
    setMessage(adminAccountMessage, "success", `Akun ${accountUsername || "terpilih"} berhasil ${shouldActivate ? "diaktifkan kembali" : "dinonaktifkan"}.`);
  } catch (error) {
    setMessage(adminAccountMessage, "error", error.message || "Gagal mengubah status akun.");
  }
});

authTargetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    clearAuthMessages();
    setAuthView(button.dataset.authTarget);
  });
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActivePage(button.dataset.page);
  });
});

logoutButton.addEventListener("click", async () => {
  try {
    await logoutFromBackend();
  } catch {
    // Tetap keluarkan user dari UI walau endpoint logout bermasalah.
  }

  currentUser = null;
  resetLoginForm();
  forgotForm?.reset();
  signupForm?.reset();
  clearAuthMessages();
  setAuthView("login");
  showScreen(loginScreen);
});

window.addEventListener("pageshow", () => {
  if (currentUser || !loginScreen.classList.contains("active")) {
    return;
  }

  resetLoginForm();
  clearAuthMessages();
});

reportForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!canManageProtectedData()) {
    setMessage(reportMessage, "error", "Hanya admin yang dapat menyimpan laporan.");
    return;
  }

  const title = document.getElementById("report-title").value.trim();
  const type = document.getElementById("report-type").value;
  const note = document.getElementById("report-note").value.trim() || "Tanpa catatan";

  if (!title) {
    return;
  }

  try {
    const nextReport = await createBackendReport({
      title,
      type,
      note,
      studentId: getSelectedReportEmployeeId(),
      periodType: getSelectedReportPeriod(),
      referenceDate: formatDateKey(getReferenceDate()),
      letterNumber: getLetterNumber(getEmployeeById(getSelectedReportEmployeeId()), getSelectedReportPeriod(), getReferenceDate()),
      createdBy: currentUser?.id || null
    });

    state.reports.unshift(nextReport);
    saveState();
    renderReports();
    reportMessage.classList.remove("hidden");
    reportForm.reset();
    window.setTimeout(() => reportMessage.classList.add("hidden"), 2500);
  } catch (error) {
    reportMessage.textContent = error.message || "Gagal menyimpan laporan.";
    reportMessage.classList.remove("hidden");
    window.setTimeout(() => reportMessage.classList.add("hidden"), 3000);
  }
});

employeeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!canManageProtectedData()) {
    setMessage(employeeMessage, "error", "Hanya admin yang dapat mengelola data santri.");
    return;
  }

  const name = employeeNameInput.value.trim();
  const division = employeeDivisionInput.value.trim();
  const role = employeeRoleInput.value.trim();

  if (!name || !division || !role) {
    return;
  }

  try {
    if (editingEmployeeId) {
      const updatedEmployee = await updateBackendStudent({ id: editingEmployeeId, name, division, role });
      state.employees = state.employees.map((employee) => (employee.id === editingEmployeeId ? updatedEmployee : employee));
      employeeMessage.textContent = `Santri ${name} berhasil diperbarui.`;
    } else {
      const nextEmployee = await createBackendStudent({ name, division, role });
      state.employees.unshift(nextEmployee);
      employeeMessage.textContent = `Santri ${name} berhasil ditambahkan.`;
    }

    saveState();
    renderAll();
    employeeMessage.classList.remove("hidden");
    resetEmployeeForm();
    window.setTimeout(() => employeeMessage.classList.add("hidden"), 2500);
  } catch (error) {
    employeeMessage.textContent = error.message || `Gagal menambahkan santri ${name}.`;
    employeeMessage.classList.remove("hidden");
    window.setTimeout(() => employeeMessage.classList.add("hidden"), 3000);
  }
});

attendanceForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const employeeId = attendanceEmployeeSelect.value;
  const date = attendanceDateInput.value;
  const checkIn = attendanceTimeInput.value || "-";
  const status = attendanceStatusInput.value;
  const note = attendanceNoteInput.value.trim() || "Tidak ada catatan";

  if (!employeeId || !date) {
    return;
  }

  try {
    if (editingAttendanceId) {
      if (!canManageProtectedData()) {
        setMessage(attendanceMessage, "error", "Hanya admin yang dapat mengubah data absensi lama.");
        return;
      }

      const updatedAttendance = await updateBackendAttendance({ id: editingAttendanceId, employeeId, date, checkIn, status, note });
      state.attendance = state.attendance.map((record) => (record.id === editingAttendanceId ? updatedAttendance : record));
      attendanceMessage.textContent = "Data absensi berhasil diperbarui.";
    } else {
      const nextAttendance = await createBackendAttendance({ employeeId, date, checkIn, status, note });
      state.attendance.unshift(nextAttendance);
      attendanceMessage.textContent = "Data absensi berhasil disimpan.";
    }

    saveState();
    renderAll();
    attendanceMessage.classList.remove("hidden");
    resetAttendanceForm();
    window.setTimeout(() => attendanceMessage.classList.add("hidden"), 2500);
  } catch (error) {
    attendanceMessage.textContent = error.message || "Gagal menyimpan data absensi.";
    attendanceMessage.classList.remove("hidden");
    window.setTimeout(() => attendanceMessage.classList.add("hidden"), 3000);
  }
});

reportExportCsv.addEventListener("click", exportCsv);
reportExportJson.addEventListener("click", exportJson);
downloadReportDocButton?.addEventListener("click", exportReportDoc);
printReportPdfButton?.addEventListener("click", printReportPdf);
sendWhatsappMobileButton?.addEventListener("click", sendReportToWhatsapp);
sendWhatsappWebButton?.addEventListener("click", sendReportToWhatsappWeb);
reportStudentSelect?.addEventListener("change", renderDashboardReportPreview);
reportPeriodSelect?.addEventListener("change", renderDashboardReportPreview);
reportReferenceDateInput?.addEventListener("change", renderDashboardReportPreview);
reportFatherNameInput?.addEventListener("input", renderDashboardReportPreview);
reportMotherNameInput?.addEventListener("input", renderDashboardReportPreview);
reportLetterNumberInput?.addEventListener("input", renderDashboardReportPreview);

employeeCancelButton?.addEventListener("click", resetEmployeeForm);
attendanceCancelButton?.addEventListener("click", resetAttendanceForm);

employeeList?.addEventListener("click", async (event) => {
  if (!canManageProtectedData()) {
    return;
  }

  const actionButton = event.target.closest("button[data-action]");

  if (!actionButton) {
    return;
  }

  const employeeId = actionButton.dataset.employeeId;
  const employee = getEmployeeById(employeeId);

  if (actionButton.dataset.action === "edit-employee" && employee) {
    populateEmployeeForm(employee);
    return;
  }

  if (actionButton.dataset.action === "delete-employee" && employeeId) {
    const employeeRecords = state.attendance.filter((record) => record.employeeId === employeeId).length;
    const confirmed = window.confirm(`Hapus santri ini? ${employeeRecords ? `Semua ${employeeRecords} data absensinya juga akan ikut terhapus.` : ""}`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteBackendStudent(employeeId);
      state.employees = state.employees.filter((item) => item.id !== employeeId);
      state.attendance = state.attendance.filter((item) => item.employeeId !== employeeId);
      saveState();
      if (editingEmployeeId === employeeId) {
        resetEmployeeForm();
      }
      renderAll();
      employeeMessage.textContent = "Santri berhasil dihapus.";
      employeeMessage.classList.remove("hidden");
      window.setTimeout(() => employeeMessage.classList.add("hidden"), 2500);
    } catch (error) {
      employeeMessage.textContent = error.message || "Gagal menghapus santri.";
      employeeMessage.classList.remove("hidden");
      window.setTimeout(() => employeeMessage.classList.add("hidden"), 3000);
    }
  }
});

attendanceTableBody?.addEventListener("click", async (event) => {
  if (!canManageProtectedData()) {
    return;
  }

  const actionButton = event.target.closest("button[data-action]");

  if (!actionButton) {
    return;
  }

  const attendanceId = actionButton.dataset.attendanceId;
  const record = state.attendance.find((item) => item.id === attendanceId);

  if (actionButton.dataset.action === "edit-attendance" && record) {
    populateAttendanceForm(record);
    return;
  }

  if (actionButton.dataset.action === "delete-attendance" && attendanceId) {
    const confirmed = window.confirm("Hapus data absensi ini?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteBackendAttendance(attendanceId);
      state.attendance = state.attendance.filter((item) => item.id !== attendanceId);
      saveState();
      if (editingAttendanceId === attendanceId) {
        resetAttendanceForm();
      }
      renderAll();
      attendanceMessage.textContent = "Data absensi berhasil dihapus.";
      attendanceMessage.classList.remove("hidden");
      window.setTimeout(() => attendanceMessage.classList.add("hidden"), 2500);
    } catch (error) {
      attendanceMessage.textContent = error.message || "Gagal menghapus data absensi.";
      attendanceMessage.classList.remove("hidden");
      window.setTimeout(() => attendanceMessage.classList.add("hidden"), 3000);
    }
  }
});

reportList?.addEventListener("click", async (event) => {
  if (!canManageProtectedData()) {
    return;
  }

  const actionButton = event.target.closest("button[data-action]");

  if (!actionButton || actionButton.dataset.action !== "delete-report") {
    return;
  }

  const reportId = actionButton.dataset.reportId;
  const confirmed = window.confirm("Hapus laporan ini?");

  if (!confirmed) {
    return;
  }

  try {
    await deleteBackendReport(reportId);
    state.reports = state.reports.filter((report) => report.id !== reportId);
    saveState();
    renderReports();
    reportMessage.textContent = "Laporan berhasil dihapus.";
    reportMessage.classList.remove("hidden");
    window.setTimeout(() => reportMessage.classList.add("hidden"), 2500);
  } catch (error) {
    reportMessage.textContent = error.message || "Gagal menghapus laporan.";
    reportMessage.classList.remove("hidden");
    window.setTimeout(() => reportMessage.classList.add("hidden"), 3000);
  }
});

initializeApplication();
