const downstreamResults = [
  { label: "Spatial", task: "lift_pot", base: 88.4, rft: 94.8, spread: "± 0.9 / ± 1.2" },
  { label: "Object", task: "place_container_plate", base: 88.0, rft: 94.4, spread: "± 0.5 / ± 1.0" },
  { label: "Goal", task: "shake_bottle", base: 92.8, rft: 95.2, spread: "± 1.2 / ± 0.7" },
  { label: "Long", task: "turn_switch", base: 77.2, rft: 80.2, spread: "± 0.4 / ± 0.4" },
];

const downstreamTable = [
  {
    method: "Base",
    spatial: "88.4 ± 0.9",
    object: "88.0 ± 0.5",
    goal: "92.8 ± 1.2",
    long: "77.2 ± 0.4",
    overall: "86.6 ± 0.8",
  },
  {
    method: "RFT",
    spatial: "94.8 ± 1.2",
    object: "94.4 ± 1.0",
    goal: "95.2 ± 0.7",
    long: "80.2 ± 0.4",
    overall: "91.2 ± 0.9",
  },
];

const robotwinTable = [
  {
    method: "Base",
    lift_pot: "54.0",
    place_container_plate: "63.0",
    shake_bottle: "96.0",
    turn_switch: "36.0",
    avg: "62.25",
  },
  {
    method: "RFT",
    lift_pot: "59.0",
    place_container_plate: "71.0",
    shake_bottle: "100.0",
    turn_switch: "48.0",
    avg: "69.5",
  },
];

const reconstructionResults = [
  { task: "Spatial", mse: 0.0039, psnr: 24.98, ssim: 0.896, lpips: 0.067, delta: 0.0020, avc: 0.632 },
  { task: "Object", mse: 0.0036, psnr: 25.13, ssim: 0.913, lpips: 0.054, delta: 0.0018, avc: 0.677 },
  { task: "Goal", mse: 0.0024, psnr: 26.99, ssim: 0.929, lpips: 0.040, delta: 0.0011, avc: 0.742 },
  { task: "Long", mse: 0.0056, psnr: 23.83, ssim: 0.885, lpips: 0.074, delta: 0.0031, avc: 0.581 },
  { task: "Avg", mse: 0.0039, psnr: 25.23, ssim: 0.906, lpips: 0.059, delta: 0.0020, avc: 0.658 },
];

const wmScalingResults = [
  {
    wm: "421M",
    mse: "0.0036",
    psnr: "25.18",
    ssim: "0.901",
    lpips: "0.063",
    delta: "0.0019",
    avc: "0.640",
    sr: "95.2",
    featured: true,
  },
  {
    wm: "138M",
    mse: "0.0039",
    psnr: "24.98",
    ssim: "0.896",
    lpips: "0.067",
    delta: "0.0020",
    avc: "0.632",
    sr: "94.8",
    featured: false,
  },
];

function formatMetric(value, digits = 4) {
  if (value === null || value === undefined) {
    return "TBD";
  }

  return Number(value).toFixed(digits);
}

function renderTaskSummary() {
  const host = document.querySelector("#task-summary");
  const template = document.querySelector("#summary-template");

  downstreamResults.forEach((result) => {
    const node = template.content.cloneNode(true);
    const delta = (result.rft - result.base).toFixed(1);

    node.querySelector(".summary-label").textContent = result.label;
    node.querySelector(".summary-delta").textContent = `+${delta} pts`;
    node.querySelector(".base-fill").style.width = `${result.base}%`;
    node.querySelector(".rft-fill").style.width = `${result.rft}%`;
    node.querySelector(".base-value").textContent = `${result.base.toFixed(1)}%`;
    node.querySelector(".rft-value").textContent = `${result.rft.toFixed(1)}%`;

    host.appendChild(node);
  });
}

function renderDownstreamTable() {
  const tbody = document.querySelector("#downstream-table");

  downstreamTable.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.method}</td>
      <td>${row.spatial}</td>
      <td>${row.object}</td>
      <td>${row.goal}</td>
      <td>${row.long}</td>
      <td>${row.overall}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderMetricCards() {
  const host = document.querySelector("#metric-grid");
  const template = document.querySelector("#metric-template");

  reconstructionResults.forEach((result) => {
    const node = template.content.cloneNode(true);
    node.querySelector(".metric-task").textContent = result.task;
    node.querySelector(".metric-mse").textContent = result.mse.toFixed(4);
    node.querySelector(".metric-psnr").textContent = result.psnr.toFixed(2);
    node.querySelector(".metric-ssim").textContent = result.ssim.toFixed(3);
    node.querySelector(".metric-lpips").textContent = result.lpips.toFixed(3);
    node.querySelector(".metric-delta").textContent = result.delta.toFixed(4);
    node.querySelector(".metric-avc").textContent = formatMetric(result.avc, 3);
    host.appendChild(node);
  });
}

function renderRobotWinTable() {
  const tbody = document.querySelector("#robotwin-table");

  robotwinTable.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.method}</td>
      <td>${row.lift_pot}</td>
      <td>${row.place_container_plate}</td>
      <td>${row.shake_bottle}</td>
      <td>${row.turn_switch}</td>
      <td>${row.avg}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderReconstructionTable() {
  const tbody = document.querySelector("#reconstruction-table");

  reconstructionResults.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.task}</td>
      <td>${row.mse.toFixed(4)}</td>
      <td>${row.psnr.toFixed(2)}</td>
      <td>${row.ssim.toFixed(3)}</td>
      <td>${row.lpips.toFixed(3)}</td>
      <td>${row.delta.toFixed(4)}</td>
      <td>${formatMetric(row.avc, 3)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderWmScalingTable() {
  const tbody = document.querySelector("#wm-scaling-table");

  wmScalingResults.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.featured) {
      tr.classList.add("feature-row");
    }

    tr.innerHTML = `
      <td>${row.wm}</td>
      <td>${row.mse}</td>
      <td>${row.psnr}</td>
      <td>${row.ssim}</td>
      <td>${row.lpips}</td>
      <td class="${row.featured ? "best-cell" : ""}">${row.delta}</td>
      <td class="${row.featured ? "best-cell" : ""}">${row.avc}</td>
      <td class="${row.featured ? "best-cell" : ""}">${row.sr}</td>
    `;
    tbody.appendChild(tr);
  });
}

renderTaskSummary();
renderDownstreamTable();
renderRobotWinTable();
renderMetricCards();
renderReconstructionTable();
renderWmScalingTable();
