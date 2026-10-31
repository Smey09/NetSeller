"use client";

import * as React from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { InternetPackage, Promotion } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Lock,
  Wifi,
  Package,
  Gift,
  Plus,
  Edit2,
  Trash2,
  Save,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  LogOut,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Zap,
  Tag,
  Clock,
  Code,
} from "lucide-react";
import defaultPackages from "@/data/packages.json";
import defaultPromotions from "@/data/promotions.json";

export default function AdminPage() {
  const locale = useLocale();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [pinInput, setPinInput] = React.useState("");
  const [pinError, setPinError] = React.useState("");
  const [adminPin, setAdminPin] = React.useState("seller2026");

  // Data State
  const [packages, setPackages] = React.useState<InternetPackage[]>(
    defaultPackages as InternetPackage[]
  );
  const [promotions, setPromotions] = React.useState<Promotion[]>(
    defaultPromotions as Promotion[]
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"packages" | "promotions" | "json">("packages");
  const [toastMessage, setToastMessage] = React.useState<{ text: string; type: "success" | "error" } | null>(null);

  // Edit Package Modal State
  const [isPkgModalOpen, setIsPkgModalOpen] = React.useState(false);
  const [editingPkg, setEditingPkg] = React.useState<Partial<InternetPackage> | null>(null);
  const [isNewPkg, setIsNewPkg] = React.useState(false);

  // Edit Promotion Modal State
  const [isPromoModalOpen, setIsPromoModalOpen] = React.useState(false);
  const [editingPromo, setEditingPromo] = React.useState<Partial<Promotion> | null>(null);
  const [isNewPromo, setIsNewPromo] = React.useState(false);

  // JSON view state
  const [jsonInput, setJsonInput] = React.useState("");

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchLiveWebsiteData = React.useCallback(async (pin?: string) => {
    try {
      const res = await fetch("/api/admin/data", {
        headers: { "x-admin-pin": pin || adminPin },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.packages) setPackages(data.packages);
        if (data.promotions) setPromotions(data.promotions);
      }
    } catch {
      // Fallback already populated
    }
  }, [adminPin]);

  // Check existing session
  React.useEffect(() => {
    const savedPin = sessionStorage.getItem("netseller_admin_pin");
    if (savedPin) {
      setAdminPin(savedPin);
      setIsAuthenticated(true);
      fetchLiveWebsiteData(savedPin);
    }
  }, [fetchLiveWebsiteData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setPinError("Please enter your Owner PIN");
      return;
    }
    // Authenticate with server
    fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminPin: pinInput, packages, promotions }),
    })
      .then((res) => {
        if (res.status === 401) {
          setPinError("Incorrect Owner PIN. (Default: seller2026)");
        } else {
          setAdminPin(pinInput);
          setIsAuthenticated(true);
          sessionStorage.setItem("netseller_admin_pin", pinInput);
          setPinError("");
          showToast("Welcome back, Owner! Data loaded.");
        }
      })
      .catch(() => {
        if (pinInput === "seller2026") {
          setIsAuthenticated(true);
          sessionStorage.setItem("netseller_admin_pin", pinInput);
        } else {
          setPinError("Could not authenticate. Please verify PIN.");
        }
      });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("netseller_admin_pin");
    setPinInput("");
  };

  // ==========================================
  // PACKAGE ACTIONS
  // ==========================================
  const handleOpenAddPackage = () => {
    const newId = `pkg-custom-${Date.now().toString().slice(-4)}`;
    setEditingPkg({
      id: newId,
      key: `custom_${Date.now().toString().slice(-4)}`,
      name: "New Home Wi-Fi Package",
      speedMbps: 50,
      monthlyPriceUsd: 20,
      originalPriceUsd: 25,
      installationFeeUsd: 0,
      isFreeInstallation: true,
      routerIncluded: "High-Performance Dual-Band Wi-Fi 6 Router Included (Free Loan)",
      category: "home",
      badge: "Special Offer",
      badgeKm: "ការផ្ដល់ជូនពិសេស",
      availabilityStatus: "available",
      isPopular: false,
      isPromoted: false,
      features: [
        "High-Speed Optical Fiber Internet",
        "Unlimited Data - No speed throttling",
        "Free Wi-Fi 6 Router (Free Loan)",
        "$0 Free Standard Installation",
      ],
      featuresKm: [
        "ល្បឿនលឿនខ្សែកាបអុបទិកពិតៗ",
        "ប្រើប្រាស់ទិន្នន័យមិនកំណត់ គ្មានការទម្លាក់ល្បឿន",
        "ផ្ដល់ជូនរ៉ោតទ័រ Wi-Fi 6 ឥតគិតថ្លៃ",
        "ដំឡើងសេវាឥតគិតថ្លៃ ($0)",
      ],
      descriptionEn: "High-speed optical fiber package suitable for homes and families.",
      descriptionKm: "កញ្ចប់អ៊ីនធឺណិតខ្សែកាបអុបទិកល្បឿនលឿនសម្រាប់គេហដ្ឋាន។",
      suitableForEn: "3 - 5 Persons • 8-12 Devices",
      suitableForKm: "សមាជិក ៣-៥ នាក់ • ឧបករណ៍ ៨-១២ គ្រឿង",
      equipmentTermsEn: "Free router loan while subscription is active.",
      equipmentTermsKm: "ខ្ចីរ៉ោតទ័រឥតគិតថ្លៃពេលគណនីដំណើរការ។",
    });
    setIsNewPkg(true);
    setIsPkgModalOpen(true);
  };

  const handleOpenEditPackage = (pkg: InternetPackage) => {
    setEditingPkg(JSON.parse(JSON.stringify(pkg)));
    setIsNewPkg(false);
    setIsPkgModalOpen(true);
  };

  const handleSavePackageModal = () => {
    if (!editingPkg || !editingPkg.id || !editingPkg.name) {
      showToast("Package Name and ID are required", "error");
      return;
    }

    const updatedPackage = editingPkg as InternetPackage;
    if (isNewPkg) {
      setPackages([...packages, updatedPackage]);
    } else {
      setPackages(packages.map((p) => (p.id === updatedPackage.id ? updatedPackage : p)));
    }
    setHasUnsavedChanges(true);
    setIsPkgModalOpen(false);
    showToast(`Package "${updatedPackage.name}" updated! Don't forget to click Save to Website.`);
  };

  const handleDeletePackage = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete package "${name}"?`)) {
      setPackages(packages.filter((p) => p.id !== id));
      setHasUnsavedChanges(true);
      showToast(`Package "${name}" deleted.`);
    }
  };

  const handleMovePackage = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= packages.length) return;
    const reordered = [...packages];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    setPackages(reordered);
    setHasUnsavedChanges(true);
  };

  // ==========================================
  // PROMOTION ACTIONS
  // ==========================================
  const handleOpenAddPromotion = () => {
    const newId = `promo-custom-${Date.now().toString().slice(-4)}`;
    setEditingPromo({
      id: newId,
      titleEn: "Special Discount Campaign",
      titleKm: "ប្រូម៉ូសិនបញ្ចុះតម្លៃពិសេស",
      descriptionEn: "Sign up today via Telegram to unlock extra speed and free installation.",
      descriptionKm: "ចុះឈ្មោះថ្ងៃនេះតាម Telegram ទទួលបានការដំឡើងឥតគិតថ្លៃ។",
      badgeEn: "Limited Time",
      badgeKm: "រយៈពេលកំណត់",
      validUntil: "End of this month",
      validUntilKm: "ដំណាច់ខែនេះ",
      highlightEn: "Save Instantly",
      highlightKm: "ចំណេញភ្លាមៗ",
      code: "PROMO2026",
      isExpired: false,
    });
    setIsNewPromo(true);
    setIsPromoModalOpen(true);
  };

  const handleOpenEditPromotion = (promo: Promotion) => {
    setEditingPromo(JSON.parse(JSON.stringify(promo)));
    setIsNewPromo(false);
    setIsPromoModalOpen(true);
  };

  const handleSavePromotionModal = () => {
    if (!editingPromo || !editingPromo.id || !editingPromo.titleEn) {
      showToast("Promotion Title and ID are required", "error");
      return;
    }

    const updatedPromo = editingPromo as Promotion;
    if (isNewPromo) {
      setPromotions([...promotions, updatedPromo]);
    } else {
      setPromotions(promotions.map((p) => (p.id === updatedPromo.id ? updatedPromo : p)));
    }
    setHasUnsavedChanges(true);
    setIsPromoModalOpen(false);
    showToast(`Promotion "${updatedPromo.titleEn}" updated! Don't forget to click Save to Website.`);
  };

  const handleDeletePromotion = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete promotion "${title}"?`)) {
      setPromotions(promotions.filter((p) => p.id !== id));
      setHasUnsavedChanges(true);
      showToast(`Promotion "${title}" deleted.`);
    }
  };

  const handleTogglePromoExpired = (id: string) => {
    setPromotions(
      promotions.map((p) => (p.id === id ? { ...p, isExpired: !p.isExpired } : p))
    );
    setHasUnsavedChanges(true);
  };

  // ==========================================
  // GLOBAL SAVE & SYNC TO WEBSITE
  // ==========================================
  const handleSaveAllToWebsite = async () => {
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": adminPin,
        },
        body: JSON.stringify({
          adminPin,
          packages,
          promotions,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setHasUnsavedChanges(false);
        showToast("✓ All packages & promotions saved to JSON! Website is now updated live.");
      } else {
        showToast(data.message || "Failed to save data", "error");
      }
    } catch (err) {
      showToast("Error connecting to server to save data", "error");
    }
  };

  const handleDownloadBackup = () => {
    const payload = {
      exportDate: new Date().toISOString(),
      packages,
      promotions,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `netseller-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Backup JSON file downloaded!");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.packages && Array.isArray(parsed.packages)) {
          setPackages(parsed.packages);
        }
        if (parsed.promotions && Array.isArray(parsed.promotions)) {
          setPromotions(parsed.promotions);
        }
        setHasUnsavedChanges(true);
        showToast("Data imported successfully! Review and click Save to Website.");
      } catch (err) {
        showToast("Invalid JSON file format.", "error");
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefaults = async () => {
    if (confirm("Reset all packages and promotions to default factory data? This cannot be undone.")) {
      setPackages(defaultPackages as InternetPackage[]);
      setPromotions(defaultPromotions as Promotion[]);
      setHasUnsavedChanges(true);
      showToast("Reset to defaults. Click Save to Website to apply.");
    }
  };

  // ==========================================
  // RENDER: LOGIN FORM
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-white/85 bg-white/85 backdrop-blur-3xl p-6 sm:p-8 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.95),0_20px_40px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 mb-3 border border-white/20">
              <Lock className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Owner Portal Login</h1>
            <p className="text-xs text-slate-500 mt-1">
              Enter your secret PIN to edit Internet Packages, Pricing & Promotions.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="pin" className="text-xs font-bold text-slate-700">
                Owner PIN Key
              </Label>
              <Input
                id="pin"
                type="password"
                placeholder="Enter PIN (Default: seller2026)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="mt-1 font-mono tracking-widest text-center"
                autoFocus
              />
              {pinError && <p className="text-[11px] text-red-600 mt-1 font-medium">{pinError}</p>}
            </div>

            <Button type="submit" className="w-full font-bold shadow-md shadow-primary-500/25">
              Unlock Management Dashboard
            </Button>

            <div className="text-center pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to NetSeller Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen pb-24 pt-4 sm:pt-8 container mx-auto px-3.5 sm:px-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl backdrop-blur-xl border shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 text-xs font-bold ${
            toastMessage.type === "error"
              ? "bg-red-500/90 text-white border-red-400"
              : "bg-slate-900/95 text-white border-white/20"
          }`}
        >
          {toastMessage.type === "error" ? (
            <AlertCircle className="h-4 w-4 text-red-200 shrink-0" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-4 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/85 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9)]">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="outline" size="sm" className="rounded-xl gap-1.5 font-semibold text-xs">
              <ArrowLeft className="h-3.5 w-3.5" />
              View Website
            </Button>
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              Website Owner Portal
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Live Data Mode
              </span>
            </h1>
            <p className="text-[11px] text-slate-500">
              Manage JSON packages, speed, pricing, and active promotions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={handleDownloadBackup}
            variant="outline"
            size="sm"
            className="rounded-xl gap-1.5 text-xs font-semibold"
          >
            <Download className="h-3.5 w-3.5" />
            Backup JSON
          </Button>

          <label className="cursor-pointer">
            <span className="inline-flex items-center justify-center h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold gap-1.5 active:scale-95 transition-all">
              <Upload className="h-3.5 w-3.5" />
              Import JSON
            </span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="rounded-xl text-xs text-slate-600 gap-1"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Floating Save Actions Banner when changes exist */}
      {hasUnsavedChanges && (
        <div className="sticky top-20 z-30 mb-6 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 border border-primary-500/50">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold">
              You have unsaved changes! Apply them to your live website?
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSaveAllToWebsite}
              className="bg-primary-500 hover:bg-primary-600 text-slate-950 font-black rounded-xl text-xs sm:text-sm gap-1.5 shadow-md shadow-primary-500/30"
            >
              <Save className="h-4 w-4 text-slate-950" />
              Save to Website
            </Button>
          </div>
        </div>
      )}

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 mb-6 p-1.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/85 max-w-md shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab("packages")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "packages"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-white/60"
          }`}
        >
          <Package className="h-4 w-4" />
          <span>Packages ({packages.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("promotions")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "promotions"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-white/60"
          }`}
        >
          <Gift className="h-4 w-4" />
          <span>Promotions ({promotions.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setJsonInput(JSON.stringify({ packages, promotions }, null, 2));
            setActiveTab("json");
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "json"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-white/60"
          }`}
        >
          <Code className="h-4 w-4" />
          <span>JSON</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: INTERNET PACKAGES & PRICING                          */}
      {/* ============================================================ */}
      {activeTab === "packages" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span>Internet Packages Catalog</span>
              <span className="text-xs text-slate-500 font-normal">
                (Changes save directly into `packages.json`)
              </span>
            </h2>
            <Button
              onClick={handleOpenAddPackage}
              className="font-bold rounded-xl text-xs sm:text-sm gap-1.5 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Add New Package
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className="relative rounded-2xl border border-white/85 bg-white/80 backdrop-blur-xl p-4 sm:p-5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_4px_16px_rgba(15,23,42,0.04)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {pkg.category}
                      </span>
                      {pkg.isPopular && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-primary-500 text-slate-950 font-black">
                          Popular
                        </span>
                      )}
                      {pkg.badge && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-200 text-slate-800">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMovePackage(index, "up")}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-800 disabled:opacity-30"
                        title="Move Up"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={index === packages.length - 1}
                        onClick={() => handleMovePackage(index, "down")}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-800 disabled:opacity-30"
                        title="Move Down"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    {pkg.name}
                  </h3>

                  {/* Pricing and Speed Box */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 my-3">
                    <div className="flex items-center gap-2">
                      <span className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary-600 via-primary-500 to-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        <Zap className="h-4 w-4 fill-slate-950" />
                      </span>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Speed</span>
                        <p className="text-base font-black text-slate-900 leading-none">
                          {pkg.speedMbps} Mbps
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Price</span>
                      <p className="text-base font-black text-slate-900 leading-none">
                        ${pkg.monthlyPriceUsd}
                        <span className="text-[10px] text-slate-500 font-semibold">/mo</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {pkg.descriptionEn || pkg.descriptionKm}
                  </p>

                  <div className="text-[11px] text-slate-500 space-y-1">
                    <p>• {pkg.features?.[0] || "Fast optical fiber"}</p>
                    <p>• {pkg.features?.[1] || "Unlimited Data"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 mt-3 border-t border-slate-100">
                  <Button
                    onClick={() => handleOpenEditPackage(pkg)}
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-xs gap-1 font-semibold"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    Edit Package
                  </Button>
                  <Button
                    onClick={() => handleDeletePackage(pkg.id, pkg.name)}
                    variant="ghost"
                    size="sm"
                    className="rounded-xl text-xs text-red-600 hover:bg-red-50 gap-1 font-semibold"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: PROMOTIONS & CAMPAIGNS                                */}
      {/* ============================================================ */}
      {activeTab === "promotions" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span>Promotions & Bonus Offers</span>
              <span className="text-xs text-slate-500 font-normal">
                (Changes save directly into `promotions.json`)
              </span>
            </h2>
            <Button
              onClick={handleOpenAddPromotion}
              className="font-bold rounded-xl text-xs sm:text-sm gap-1.5 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Add New Promo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className={`relative rounded-2xl border border-white/85 bg-white/80 backdrop-blur-xl p-4 sm:p-5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_4px_16px_rgba(15,23,42,0.04)] flex flex-col justify-between ${
                  promo.isExpired ? "opacity-60" : ""
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {promo.badgeEn}
                    </span>
                    {promo.highlightEn && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-primary-500 text-slate-950">
                        {promo.highlightEn}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-black text-slate-900 tracking-tight mb-1">
                    {promo.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {promo.descriptionEn}
                  </p>

                  <div className="text-[11px] text-slate-500 space-y-1 border-t border-slate-100 pt-2">
                    <p className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-slate-400" />
                      Valid: <strong className="text-slate-700">{promo.validUntil}</strong>
                    </p>
                    {promo.code && (
                      <p className="flex items-center gap-1.5 font-mono">
                        <Tag className="h-3 w-3 text-slate-400" />
                        Code: <strong className="text-slate-900">{promo.code}</strong>
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleTogglePromoExpired(promo.id)}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors ${
                      promo.isExpired
                        ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                    }`}
                  >
                    {promo.isExpired ? "Status: Ended" : "Status: Active"}
                  </button>

                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => handleOpenEditPromotion(promo)}
                      variant="outline"
                      size="sm"
                      className="rounded-lg text-xs font-semibold px-2"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      onClick={() => handleDeletePromotion(promo.id, promo.titleEn)}
                      variant="ghost"
                      size="sm"
                      className="rounded-lg text-xs text-red-600 hover:bg-red-50 px-2"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: RAW JSON CODE VIEW & RESTORE                          */}
      {/* ============================================================ */}
      {activeTab === "json" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">Raw JSON Data Editor</h2>
              <p className="text-xs text-slate-500">
                Directly inspect or paste full JSON payload.
              </p>
            </div>
            <Button
              onClick={handleResetToDefaults}
              variant="outline"
              size="sm"
              className="text-xs text-amber-700 hover:bg-amber-50 border-amber-200 gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Factory Defaults
            </Button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4">
            <textarea
              rows={20}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full bg-transparent font-mono text-xs text-emerald-400 focus:outline-none resize-y selection:bg-primary-500"
            />
          </div>

          <Button
            onClick={() => {
              try {
                const parsed = JSON.parse(jsonInput);
                if (parsed.packages && parsed.promotions) {
                  setPackages(parsed.packages);
                  setPromotions(parsed.promotions);
                  setHasUnsavedChanges(true);
                  showToast("JSON parsed successfully! Click Save to Website.");
                } else {
                  showToast("JSON must have { packages, promotions } root keys", "error");
                }
              } catch {
                showToast("Invalid JSON syntax", "error");
              }
            }}
            className="w-full font-bold shadow-md"
          >
            Apply JSON Changes
          </Button>
        </div>
      )}

      {/* ============================================================ */}
      {/* EDIT PACKAGE DIALOG MODAL                                    */}
      {/* ============================================================ */}
      <Dialog open={isPkgModalOpen} onOpenChange={setIsPkgModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-black">
              {isNewPkg ? "Create New Internet Package" : `Edit Package: ${editingPkg?.name}`}
            </DialogTitle>
          </DialogHeader>

          {editingPkg && (
            <div className="space-y-4 py-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold">Package Name (English)</Label>
                  <Input
                    value={editingPkg.name || ""}
                    onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold">Unique ID / Key</Label>
                  <Input
                    value={editingPkg.id || ""}
                    disabled={!isNewPkg}
                    onChange={(e) =>
                      setEditingPkg({
                        ...editingPkg,
                        id: e.target.value,
                        key: e.target.value.replace(/^pkg-/, ""),
                      })
                    }
                    className="mt-1 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <Label className="text-xs font-bold">Speed (Mbps)</Label>
                  <Input
                    type="number"
                    value={editingPkg.speedMbps || 0}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, speedMbps: Number(e.target.value) })
                    }
                    className="mt-1 font-bold"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold">Monthly Price ($)</Label>
                  <Input
                    type="number"
                    value={editingPkg.monthlyPriceUsd || 0}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, monthlyPriceUsd: Number(e.target.value) })
                    }
                    className="mt-1 font-bold text-emerald-600"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold">Original Price ($)</Label>
                  <Input
                    type="number"
                    placeholder="Optional"
                    value={editingPkg.originalPriceUsd || ""}
                    onChange={(e) =>
                      setEditingPkg({
                        ...editingPkg,
                        originalPriceUsd: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold">Category</Label>
                  <select
                    value={editingPkg.category || "home"}
                    onChange={(e) =>
                      setEditingPkg({
                        ...editingPkg,
                        category: e.target.value as "home" | "business" | "fiber",
                      })
                    }
                    className="mt-1 flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs"
                  >
                    <option value="home">Home</option>
                    <option value="business">Business</option>
                    <option value="fiber">Fiber</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold">Badge Text (English)</Label>
                  <Input
                    placeholder="e.g. Most Popular"
                    value={editingPkg.badge || ""}
                    onChange={(e) => setEditingPkg({ ...editingPkg, badge: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold">Badge Text (Khmer)</Label>
                  <Input
                    placeholder="e.g. ពេញនិយមបំផុត"
                    value={editingPkg.badgeKm || ""}
                    onChange={(e) => setEditingPkg({ ...editingPkg, badgeKm: e.target.value })}
                    className="mt-1 font-khmer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 py-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!editingPkg.isPopular}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, isPopular: e.target.checked })
                    }
                    className="rounded text-primary-500 h-4 w-4"
                  />
                  <span className="font-bold text-slate-800">Mark as Popular Plan</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.isFreeInstallation ?? true}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, isFreeInstallation: e.target.checked })
                    }
                    className="rounded text-primary-500 h-4 w-4"
                  />
                  <span className="font-bold text-slate-800">Free Setup ($0)</span>
                </label>
              </div>

              <div>
                <Label className="text-xs font-bold">Router Included Specification</Label>
                <Input
                  value={editingPkg.routerIncluded || ""}
                  onChange={(e) => setEditingPkg({ ...editingPkg, routerIncluded: e.target.value })}
                  className="mt-1"
                />
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold">Description (English)</Label>
                  <Textarea
                    rows={2}
                    value={editingPkg.descriptionEn || ""}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, descriptionEn: e.target.value })
                    }
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold">Description (Khmer)</Label>
                  <Textarea
                    rows={2}
                    value={editingPkg.descriptionKm || ""}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, descriptionKm: e.target.value })
                    }
                    className="mt-1 text-xs font-khmer"
                  />
                </div>
              </div>

              {/* Suitable For */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold">Suitable For (English)</Label>
                  <Input
                    placeholder="e.g. 3 - 5 Persons • 8-12 Devices"
                    value={editingPkg.suitableForEn || ""}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, suitableForEn: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold">Suitable For (Khmer)</Label>
                  <Input
                    placeholder="e.g. សមាជិក ៣-៥ នាក់ • ឧបករណ៍ ៨-១២ គ្រឿង"
                    value={editingPkg.suitableForKm || ""}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, suitableForKm: e.target.value })
                    }
                    className="mt-1 font-khmer"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsPkgModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePackageModal} className="font-bold">
              Update Package
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ============================================================ */}
      {/* EDIT PROMOTION DIALOG MODAL                                  */}
      {/* ============================================================ */}
      <Dialog open={isPromoModalOpen} onOpenChange={setIsPromoModalOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-black">
              {isNewPromo ? "Create Promotion" : `Edit Promo: ${editingPromo?.titleEn}`}
            </DialogTitle>
          </DialogHeader>

          {editingPromo && (
            <div className="space-y-3.5 py-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold">Title (English)</Label>
                  <Input
                    value={editingPromo.titleEn || ""}
                    onChange={(e) => setEditingPromo({ ...editingPromo, titleEn: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold">Title (Khmer)</Label>
                  <Input
                    value={editingPromo.titleKm || ""}
                    onChange={(e) => setEditingPromo({ ...editingPromo, titleKm: e.target.value })}
                    className="mt-1 font-khmer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold">Corner Highlight Tag (English)</Label>
                  <Input
                    placeholder="e.g. Save $45 Instantly"
                    value={editingPromo.highlightEn || ""}
                    onChange={(e) =>
                      setEditingPromo({ ...editingPromo, highlightEn: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold">Corner Highlight Tag (Khmer)</Label>
                  <Input
                    placeholder="e.g. ចំណេញភ្លាមៗ $45"
                    value={editingPromo.highlightKm || ""}
                    onChange={(e) =>
                      setEditingPromo({ ...editingPromo, highlightKm: e.target.value })
                    }
                    className="mt-1 font-khmer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold">Promo Code</Label>
                  <Input
                    placeholder="e.g. FREEINSTALL"
                    value={editingPromo.code || ""}
                    onChange={(e) => setEditingPromo({ ...editingPromo, code: e.target.value })}
                    className="mt-1 font-mono font-bold"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold">Valid Until</Label>
                  <Input
                    placeholder="e.g. End of this month"
                    value={editingPromo.validUntil || ""}
                    onChange={(e) =>
                      setEditingPromo({ ...editingPromo, validUntil: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold">Description (English)</Label>
                  <Textarea
                    rows={2}
                    value={editingPromo.descriptionEn || ""}
                    onChange={(e) =>
                      setEditingPromo({ ...editingPromo, descriptionEn: e.target.value })
                    }
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold">Description (Khmer)</Label>
                  <Textarea
                    rows={2}
                    value={editingPromo.descriptionKm || ""}
                    onChange={(e) =>
                      setEditingPromo({ ...editingPromo, descriptionKm: e.target.value })
                    }
                    className="mt-1 text-xs font-khmer"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!editingPromo.isExpired}
                    onChange={(e) =>
                      setEditingPromo({ ...editingPromo, isExpired: e.target.checked })
                    }
                    className="rounded text-red-500 h-4 w-4"
                  />
                  <span className="font-bold text-slate-800">
                    Mark Promotion as Expired / Ended
                  </span>
                </label>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsPromoModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePromotionModal} className="font-bold">
              Update Promotion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
