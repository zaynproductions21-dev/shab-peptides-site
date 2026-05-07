"use client";

import { useState } from "react";

export default function ReconstitutionCalculator() {
  const [accepted, setAccepted] = useState(false);
  const [peptideMg, setPeptideMg] = useState("");
  const [solventMl, setSolventMl] = useState("");
  const [desiredMcg, setDesiredMcg] = useState("");
  const [penUnitsPerMl, setPenUnitsPerMl] = useState("100"); // IU pen = 100 units per mL

  const peptide = parseFloat(peptideMg) || 0;
  const solvent = parseFloat(solventMl) || 0;
  const desired = parseFloat(desiredMcg) || 0;
  const unitsPerMl = parseFloat(penUnitsPerMl) || 100;

  const concentrationMcgPerMl = solvent > 0 ? (peptide * 1000) / solvent : 0;
  const volumePerDoseMl = concentrationMcgPerMl > 0 ? desired / concentrationMcgPerMl : 0;
  const penClicks = volumePerDoseMl * unitsPerMl;

  if (!accepted) {
    return (
      <div className="rounded-2xl border border-editorial-border bg-editorial-surface p-8 text-center">
        <div className="mx-auto max-w-md">
          <div className="text-3xl mb-4">🔬</div>
          <h3 className="font-serif text-xl font-bold text-editorial-text mb-3">
            Research Use Acknowledgement
          </h3>
          <p className="text-sm text-editorial-muted leading-relaxed mb-6">
            This calculator is a reference tool for qualified researchers working in controlled laboratory environments.
            All values are for in-vitro research protocols only and do not constitute medical or therapeutic guidance.
          </p>
          <button
            onClick={() => setAccepted(true)}
            className="inline-flex items-center rounded-lg bg-editorial-accent px-6 py-3 text-sm font-semibold text-white hover:bg-editorial-accent-dark transition-colors"
          >
            I confirm this is for research use only
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Input fields */}
      <div className="rounded-2xl border border-editorial-border bg-white p-6 sm:p-8 space-y-6">
        <h3 className="font-serif text-lg font-bold text-editorial-text">Input Parameters</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-editorial-text mb-2">
              Peptide Amount (mg)
            </label>
            <input
              type="number"
              value={peptideMg}
              onChange={(e) => setPeptideMg(e.target.value)}
              placeholder="e.g. 5"
              min="0"
              step="0.1"
              className="w-full rounded-xl border border-editorial-border bg-editorial-surface px-4 py-3 text-sm text-editorial-text placeholder:text-editorial-muted focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent"
            />
            <p className="mt-1 text-xs text-editorial-muted">Total peptide mass in the vial</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-editorial-text mb-2">
              Solvent Volume (mL)
            </label>
            <input
              type="number"
              value={solventMl}
              onChange={(e) => setSolventMl(e.target.value)}
              placeholder="e.g. 2"
              min="0"
              step="0.1"
              className="w-full rounded-xl border border-editorial-border bg-editorial-surface px-4 py-3 text-sm text-editorial-text placeholder:text-editorial-muted focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent"
            />
            <p className="mt-1 text-xs text-editorial-muted">Bacteriostatic water to add</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-editorial-text mb-2">
              Desired Amount per Administration (mcg)
            </label>
            <input
              type="number"
              value={desiredMcg}
              onChange={(e) => setDesiredMcg(e.target.value)}
              placeholder="e.g. 250"
              min="0"
              step="1"
              className="w-full rounded-xl border border-editorial-border bg-editorial-surface px-4 py-3 text-sm text-editorial-text placeholder:text-editorial-muted focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent"
            />
            <p className="mt-1 text-xs text-editorial-muted">Target amount per research administration</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-editorial-text mb-2">
              Pen/Syringe Scale (units per mL)
            </label>
            <select
              value={penUnitsPerMl}
              onChange={(e) => setPenUnitsPerMl(e.target.value)}
              className="w-full rounded-xl border border-editorial-border bg-editorial-surface px-4 py-3 text-sm text-editorial-text focus:outline-none focus:ring-2 focus:ring-editorial-accent/30 focus:border-editorial-accent"
            >
              <option value="100">100 units/mL (standard insulin syringe)</option>
              <option value="50">50 units/mL</option>
              <option value="40">40 units/mL</option>
            </select>
            <p className="mt-1 text-xs text-editorial-muted">Calibration of your delivery device</p>
          </div>
        </div>
      </div>

      {/* Results */}
      {peptide > 0 && solvent > 0 && (
        <div className="rounded-2xl border-2 border-editorial-accent/20 bg-editorial-accent/5 p-6 sm:p-8">
          <h3 className="font-serif text-lg font-bold text-editorial-accent mb-6">Results</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white border border-editorial-border p-5 text-center">
              <p className="text-xs font-semibold text-editorial-muted uppercase tracking-wider mb-2">Concentration</p>
              <p className="text-2xl font-bold text-editorial-accent">
                {concentrationMcgPerMl.toFixed(1)}
              </p>
              <p className="text-xs text-editorial-muted mt-1">mcg per mL</p>
            </div>

            {desired > 0 && (
              <>
                <div className="rounded-xl bg-white border border-editorial-border p-5 text-center">
                  <p className="text-xs font-semibold text-editorial-muted uppercase tracking-wider mb-2">Volume per Administration</p>
                  <p className="text-2xl font-bold text-editorial-accent">
                    {volumePerDoseMl < 0.01 ? volumePerDoseMl.toFixed(4) : volumePerDoseMl.toFixed(3)}
                  </p>
                  <p className="text-xs text-editorial-muted mt-1">mL</p>
                </div>

                <div className="rounded-xl bg-white border border-editorial-border p-5 text-center">
                  <p className="text-xs font-semibold text-editorial-muted uppercase tracking-wider mb-2">Pen Clicks / Units</p>
                  <p className="text-2xl font-bold text-editorial-accent">
                    {penClicks < 1 ? penClicks.toFixed(2) : penClicks.toFixed(1)}
                  </p>
                  <p className="text-xs text-editorial-muted mt-1">units on {unitsPerMl} U/mL scale</p>
                </div>
              </>
            )}
          </div>

          {desired > 0 && solvent > 0 && (
            <div className="mt-6 rounded-xl bg-white border border-editorial-border p-5">
              <p className="text-sm text-editorial-text leading-relaxed">
                <strong>Summary:</strong> Adding{" "}
                <strong>{solvent} mL</strong> of bacteriostatic water to{" "}
                <strong>{peptide} mg</strong> of peptide gives a concentration of{" "}
                <strong>{concentrationMcgPerMl.toFixed(1)} mcg/mL</strong>.
                To administer <strong>{desired} mcg</strong>, draw{" "}
                <strong>{volumePerDoseMl < 0.01 ? volumePerDoseMl.toFixed(4) : volumePerDoseMl.toFixed(3)} mL</strong>{" "}
                ({penClicks < 1 ? penClicks.toFixed(2) : penClicks.toFixed(1)} units on a {unitsPerMl} U/mL syringe).
              </p>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-[10px] text-editorial-muted text-center leading-relaxed">
        For research reference only. Not medical, therapeutic, or dosing advice. All Premio Peptides products are for in-vitro research. Not for human or animal use.
      </p>
    </div>
  );
}
