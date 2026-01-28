import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Settings,
  Bell,
  Droplets,
  Thermometer,
  Activity,
  Wind,
  Waves,
  Zap,
  MapPin,
  Download,
  ChevronRight,
  AlertTriangle,
  Info,
  LayoutGrid,
  BarChart2,
  TrendingUp,
  FileText,
  Plus,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// --- KOMPONEN NAVIGASI & HEADER (TIDAK BERUBAH) ---
const Navbar = () => {
  const location = useLocation();
  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Monitoring", path: "/monitoring" },
    { name: "Laporan", path: "/laporan" },
    { name: "Pengaturan", path: "/pengaturan" },
  ];

  return (
    <nav className="bg-white px-8 py-4 flex justify-between items-center border-b sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-blue-600 font-extrabold text-xl">AquaTrack</span>
      </div>
      <div className="flex gap-8 text-gray-500 font-medium">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${
              location.pathname === item.path
                ? "text-blue-600 border-b-2 border-blue-600"
                : "hover:text-blue-400"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-400" />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700 transition">
          <Settings size={16} /> Konfigurasi
        </button>
      </div>
    </nav>
  );
};

const HeaderBanner = () => (
  <div className="bg-blue-500 text-white py-10 pb-16 text-center shadow-inner">
    <h1 className="text-3xl font-bold mb-2">AquaTrack</h1>
    <p className="opacity-90 text-sm">
      Sistem Monitoring Kualitas Air Real-Time
    </p>
    <div className="flex justify-center gap-6 mt-4 text-xs opacity-80 font-medium">
      <span className="flex items-center gap-1">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>{" "}
        Status Online
      </span>
      <span>📍 12 Lokasi Monitoring</span>
      <span>🕒 Update Terakhir 12.47.40</span>
    </div>
  </div>
);

const FilterBar = () => (
  <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
    <div className="flex gap-4 items-center text-sm text-gray-600">
      <span>Periode:</span>
      <select className="border rounded-lg px-3 py-1.5 bg-white shadow-sm outline-none">
        <option>24 Jam Terakhir</option>
      </select>
      <span>Lokasi:</span>
      <select className="border rounded-lg px-3 py-1.5 bg-white shadow-sm outline-none">
        <option>Semua Lokasi</option>
      </select>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-sm font-bold text-green-500 flex items-center gap-1">
        ● Real-Time ON
      </span>
      <button
        onClick={() => alert("Exporting data...")}
        className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
      >
        <Download size={14} /> Export Data
      </button>
    </div>
  </div>
);

// --- SUB-KOMPONEN UNTUK HALAMAN LAPORAN BARU ---

// 1. Tab Overview (Gambar 6)
const TabOverview = () => {
  const pieData = [
    { name: "Baik", value: 130.5, color: "#8884d8" },
    { name: "Peringatan", value: 181.61, color: "#ff8042" },
    { name: "Normal", value: 180.83, color: "#00C49F" },
    { name: "Bahaya", value: 208.85, color: "#FFBB28" },
  ];
  const totalValue = pieData
    .reduce((acc, cur) => acc + cur.value, 0)
    .toFixed(2);

  const radarData = [
    { subject: "pH", A: 82.7, fullMark: 100 },
    { subject: "DO", A: 65, fullMark: 100 },
    { subject: "TDS", A: 39.13, fullMark: 100 },
    { subject: "Suhu", A: 67.2, fullMark: 100 },
    { subject: "Turbidity", A: 40.2, fullMark: 100 },
    { subject: "Conductivity", A: 35.7, fullMark: 100 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Donut Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border h-[400px] relative">
        <h3 className="font-bold text-gray-800 mb-4">
          Distribusi Kualitas Air
        </h3>
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-[55%] left-[42%] transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <p className="text-3xl font-extrabold text-gray-800">{totalValue}</p>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border h-[400px]">
        <h3 className="font-bold text-gray-800 mb-4">
          Skor Parameter (Rata-rata)
        </h3>
        <ResponsiveContainer width="100%" height="90%">
          <RadarChart outerRadius={120} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
            />
            <Radar
              name="Rata-rata"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.4}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// 2. Tab Perbandingan (Gambar 4)
const TabComparison = () => {
  // Data dummy lokasi (menggunakan nama yang lebih realistis)
  const comparisonData = [
    { name: "Parangtritis", value: 20 },
    { name: "Baron", value: 28 },
    { name: "Indrayanti", value: 35 },
    { name: "Glagah", value: 15 },
    { name: "Depok", value: 22 },
    { name: "Samas", value: 92 },
    { name: "Trisik", value: 58 },
    { name: "Congot", value: 38 },
    { name: "Sepanjang", value: 35 },
    { name: "Drini", value: 41 },
    { name: "Krakal", value: 48 },
    { name: "Sundak", value: 68 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h3 className="font-bold text-gray-800 mb-6">
        Perbandingan Antar Lokasi
      </h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={comparisonData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
            <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Bar
              dataKey="value"
              fill="#a78bfa"
              radius={[4, 4, 0, 0]}
              name="Skor Kualitas"
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-xs text-gray-500 mt-2">■ 2025</div>
    </div>
  );
};

// 3. Tab Tren (Gambar 7)
const TabTrend = () => {
  const trendData = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 65 },
    { name: "Mar", value: 95 },
    { name: "Apr", value: 55 },
    { name: "Mei", value: 98 },
    { name: "Juni", value: 70 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h3 className="font-bold text-gray-800 mb-6">
        Tren Kualitas Air (6 Bulan Terakhir)
      </h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={trendData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Bar
              dataKey="value"
              fill="#f472b6"
              radius={[4, 4, 0, 0]}
              name="Rata-rata Kualitas"
              barSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-xs text-gray-500 mt-2 text-pink-400">
        ■ 2025
      </div>
    </div>
  );
};

// 4. Tab Laporan List (Gambar 5)
const TabReportList = () => {
  const reports = [
    {
      id: "RPT-1",
      title: "Laporan Kualitas Air Bulanan - September 2025",
      desc: "Kualitas air secara keseluruhan menunjukkan peningkatan 5% dari bulan sebelumnya",
      date: "25/09/2025",
      type: "Bulanan",
      status: "Selesai",
    },
    {
      id: "RPT-2",
      title: "Analisis Pencemaran Pantai Parangtritis",
      desc: "Investigasi sumber pencemaran yang menyebabkan peningkatan TDS",
      date: "05/10/2025",
      type: "Insiden",
      status: "Proses",
    },
    {
      id: "RPT-3",
      title: "Laporan Kualitas Air Bulanan - Agustus 2025",
      desc: "Kualitas air stabil di sebagian besar titik pantau.",
      date: "25/08/2025",
      type: "Bulanan",
      status: "Selesai",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800">Laporan & Analisis</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={16} /> Buat Laporan
        </button>
      </div>
      <div className="space-y-4">
        {reports.map((rpt) => (
          <div
            key={rpt.id}
            className="border rounded-xl p-5 hover:shadow-md transition bg-white"
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-gray-800">{rpt.title}</h4>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  rpt.status === "Selesai"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {rpt.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{rpt.desc}</p>
            <div className="flex justify-between items-center text-[11px] text-gray-400 border-t pt-3">
              <div className="flex gap-4">
                <span>
                  ID:{" "}
                  <span className="font-medium text-gray-600">{rpt.id}</span>
                </span>
                <span>
                  Tanggal:{" "}
                  <span className="font-medium text-gray-600">{rpt.date}</span>
                </span>
                <span>
                  Tipe:{" "}
                  <span className="font-medium text-gray-600">{rpt.type}</span>
                </span>
              </div>
              <button className="text-blue-500 font-bold hover:underline">
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- HALAMAN UTAMA ---

// 1. Dashboard (Lama - Gambar 4 sebelumnya)
const DashboardPage = () => {
  // Simulasi data sensor yang berubah
  const [sensorData, setSensorData] = useState({
    ph: 7.2,
    do: 8.5,
    temp: 26.8,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData({
        ph: (7.0 + Math.random() * 0.5).toFixed(1),
        do: (8.0 + Math.random() * 1.0).toFixed(1),
        temp: (26.0 + Math.random() * 1.5).toFixed(1),
      });
    }, 3000); // Update tiap 3 detik
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "pH",
      sub: "Tingkat keasaman air",
      val: sensorData.ph,
      unit: "",
      status: "NORMAL",
      range: "6.5 - 8.5",
      trend: 0.1,
      icon: Activity,
      color: "text-green-500",
    },
    {
      title: "Dissolved Oxygen",
      sub: "Oksigen terlarut",
      val: sensorData.do,
      unit: "mg/L",
      status: "GOOD",
      range: "> 6.0",
      trend: 0.3,
      icon: Waves,
      color: "text-blue-400",
    },
    {
      title: "TDS",
      sub: "Total padatan terlarut",
      val: "245",
      unit: "ppm",
      status: "NORMAL",
      range: "< 500",
      trend: -12,
      icon: Droplets,
      color: "text-blue-600",
    },
    {
      title: "Suhu",
      sub: "Temperatur air",
      val: sensorData.temp,
      unit: "°C",
      status: "NORMAL",
      range: "20 - 30",
      trend: 1.2,
      icon: Thermometer,
      color: "text-orange-400",
    },
    {
      title: "Turbidity",
      sub: "Kekeruhan air",
      val: "2.1",
      unit: "NTU",
      status: "GOOD",
      range: "< 5.0",
      trend: -0.3,
      icon: Wind,
      color: "text-purple-400",
    },
    {
      title: "Conductivity",
      sub: "Konduktivitas listrik",
      val: "488",
      unit: "µS/cm",
      status: "NORMAL",
      range: "< 1000",
      trend: 0,
      icon: Zap,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 -mt-10 relative z-10">
      <FilterBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition cursor-default"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-gray-50 ${c.color}`}>
                <c.icon size={24} />
              </div>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  c.status === "NORMAL" || c.status === "GOOD"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {c.status}
              </span>
            </div>
            <h3 className="font-bold text-gray-800">{c.title}</h3>
            <p className="text-xs text-gray-400 mb-4">{c.sub}</p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold transition-all duration-500">
                {c.val}
              </span>
              <span className="text-gray-400 text-sm">{c.unit}</span>
              <span
                className={`text-[11px] font-medium flex items-center ${
                  c.trend >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {c.trend >= 0 ? "↗" : "↘"} {Math.abs(c.trend)} dari sebelumnya
              </span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mb-2">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 italic">
              <span>Rentang Normal:</span>
              <span>{c.range}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. Monitoring Page (Lama - Gambar 1 sebelumnya)
const MonitoringPage = () => {
  // 1. State untuk Wilayah yang dipilih
  const [selectedRegion, setSelectedRegion] = useState("Yogyakarta");

  // 2. Data Master Wilayah & Titik Sensor (Data IoT)
  const regionData = {
    Yogyakarta: {
      center: "YOGYAKARTA",
      mapUrl:
        "https://api.maptiler.com/maps/basic-v2/static/110.37, -7.95, 10/800x400.png?key=get_your_own_key",
      locations: [
        {
          id: 1,
          name: "Parangtritis - Bantul",
          ph: 7.2,
          do: 6.5,
          tds: 210,
          temp: 28,
          status: "online",
          top: "70%",
          left: "40%",
        },
        {
          id: 2,
          name: "Sleman - Kaliurang",
          ph: 6.8,
          do: 7.8,
          tds: 150,
          temp: 22,
          status: "online",
          top: "30%",
          left: "50%",
        },
        {
          id: 3,
          name: "Wates - Kulon Progo",
          ph: 7.5,
          do: 5.9,
          tds: 300,
          temp: 29,
          status: "warning",
          top: "60%",
          left: "25%",
        },
      ],
    },
    Jakarta: {
      center: "DKI JAKARTA",
      mapUrl:
        "https://api.maptiler.com/maps/basic-v2/static/106.84, -6.20, 10/800x400.png?key=get_your_own_key",
      locations: [
        {
          id: 4,
          name: "Ancol - Jakarta Utara",
          ph: 8.1,
          do: 4.2,
          tds: 800,
          temp: 31,
          status: "warning",
          top: "25%",
          left: "55%",
        },
        {
          id: 5,
          name: "Tanjung Priok",
          ph: 7.9,
          do: 3.5,
          tds: 950,
          temp: 32,
          status: "danger",
          top: "30%",
          left: "65%",
        },
      ],
    },
    Bali: {
      center: "BALI - DENPASAR",
      mapUrl:
        "https://api.maptiler.com/maps/basic-v2/static/115.18, -8.67, 10/800x400.png?key=get_your_own_key",
      locations: [
        {
          id: 6,
          name: "Pantai Kuta",
          ph: 8.2,
          do: 7.1,
          tds: 400,
          temp: 30,
          status: "online",
          top: "70%",
          left: "45%",
        },
        {
          id: 7,
          name: "Sanur - Denpasar",
          ph: 8.0,
          do: 6.8,
          tds: 420,
          temp: 29,
          status: "online",
          top: "65%",
          left: "60%",
        },
      ],
    },
  };

  const currentData = regionData[selectedRegion];

  return (
    <div className="max-w-7xl mx-auto p-8 -mt-10 relative z-10">
      {/* FILTER BAR AKTIF */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex gap-4 items-center text-sm text-gray-600">
          <span>Pilih Wilayah:</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border-2 border-blue-100 rounded-lg px-4 py-2 bg-white shadow-sm outline-none focus:border-blue-500 transition-all font-bold text-blue-600"
          >
            <option value="Yogyakarta">D.I. Yogyakarta</option>
            <option value="Jakarta">DKI Jakarta</option>
            <option value="Bali">Bali</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-green-500 flex items-center gap-1 animate-pulse">
            ● Monitoring Aktif
          </span>
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            <Download size={14} /> Export Laporan {selectedRegion}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AREA PETA */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="font-bold text-xl text-gray-800">
                Peta Sebaran Sensor
              </h2>
              <p className="text-sm text-gray-400">
                Wilayah:{" "}
                <span className="text-blue-500 font-semibold">
                  {selectedRegion}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <select className="text-[10px] border rounded-md px-2 py-1 bg-gray-50 outline-none">
                <option>Satelit</option>
                <option>Street</option>
              </select>
              <button className="text-[10px] bg-blue-100 text-blue-600 px-3 py-1 rounded-md font-bold">
                FullScreen
              </button>
            </div>
          </div>

          <div className="bg-slate-200 rounded-2xl h-[450px] flex items-center justify-center relative overflow-hidden border-4 border-white shadow-inner">
            {/* Background Peta yang berubah sesuai dropdown */}
            <img
              key={currentData.mapUrl}
              src={currentData.mapUrl}
              className="w-full h-full object-cover opacity-90 transition-opacity duration-1000"
              alt="map"
            />

            <div className="absolute inset-0 bg-blue-500 mix-blend-overlay opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-800 opacity-20 font-black text-4xl uppercase tracking-[15px] pointer-events-none select-none">
              {currentData.center}
            </div>

            {/* PIN SENSOR DINAMIS */}
            {currentData.locations.map((loc) => (
              <div
                key={loc.id}
                style={{ top: loc.top, left: loc.left }}
                className="absolute group cursor-pointer"
              >
                {/* Ping Effect untuk sensor yang online */}
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                    loc.status === "online"
                      ? "bg-green-400"
                      : loc.status === "warning"
                      ? "bg-orange-400"
                      : "bg-red-400"
                  } opacity-75`}
                ></span>

                <MapPin
                  size={32}
                  className={`${
                    loc.status === "online"
                      ? "text-green-500"
                      : loc.status === "warning"
                      ? "text-orange-500"
                      : "text-red-600"
                  } drop-shadow-lg group-hover:scale-125 transition-transform`}
                />

                {/* Tooltip Popup saat di hover */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg shadow-xl border w-32 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  <p className="text-[10px] font-bold border-b mb-1">
                    {loc.name}
                  </p>
                  <p className="text-[9px]">
                    pH: {loc.ph} | Suhu: {loc.temp}°C
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DAFTAR LOKASI DI SAMPING */}
        <div className="flex flex-col">
          <h2 className="font-bold text-lg mb-4 text-gray-700">
            Lokasi Aktif ({currentData.locations.length})
          </h2>
          <div className="space-y-4 overflow-y-auto max-h-[450px] pr-2 custom-scrollbar">
            {currentData.locations.map((loc) => (
              <div
                key={loc.id}
                className="group border-2 border-transparent hover:border-blue-400 bg-gray-50 p-4 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-sm text-gray-800 group-hover:text-blue-600">
                    {loc.name}
                  </span>
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      loc.status === "online"
                        ? "bg-green-500"
                        : loc.status === "warning"
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <p className="text-gray-400">pH Air</p>
                    <p className="font-bold text-blue-600">{loc.ph}</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <p className="text-gray-400">Suhu</p>
                    <p className="font-bold text-blue-600">{loc.temp}°C</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <p className="text-gray-400">TDS</p>
                    <p className="font-bold text-blue-600">{loc.tds} ppm</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <p className="text-gray-400">DO</p>
                    <p className="font-bold text-blue-600">{loc.do} mg/L</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-dashed flex justify-between items-center text-[10px] font-bold text-blue-500 uppercase">
                  <span>Lihat Detail Analisis</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. HALAMAN LAPORAN (BARU - INI YANG DIUPDATE PESAT)
const ReportPage = () => {
  // State untuk mengontrol tab yang aktif
  const [activeTab, setActiveTab] = useState("overview");

  // Daftar menu tab
  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "comparison", label: "Perbandingan", icon: BarChart2 },
    { id: "trend", label: "Tren", icon: TrendingUp },
    { id: "reportList", label: "Laporan", icon: FileText },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 -mt-10 relative z-10">
      {/* Filter Bar di atas */}
      <FilterBar />

      {/* Tab Navigation Bar */}
      <div className="bg-gray-100 p-1.5 rounded-xl inline-flex mb-8 w-full md:w-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area - Render berdasarkan tab aktif */}
      <div className="animate-fadeIn">
        {activeTab === "overview" && <TabOverview />}
        {activeTab === "comparison" && <TabComparison />}
        {activeTab === "trend" && <TabTrend />}
        {activeTab === "reportList" && <TabReportList />}
      </div>
    </div>
  );
};

// 4. Grafik & Pengaturan (Lama - Gambar 3 sebelumnya)
const GraphPage = () => {
  const data = [
    { name: "Gunung Kidul", 2020: 40, 2021: 55, 2022: 30 },
    { name: "Sleman", 2020: 50, 2021: 52, 2022: 55 },
    { name: "Kulon Progo", 2020: 35, 2021: 58, 2022: 18 },
    { name: "Banguntapan", 2020: 62, 2021: 42, 2022: 45 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-gray-800">
            Grafik Time-series Parameter
          </h2>
          <div className="flex gap-2 items-center text-xs">
            <select className="border rounded p-1 bg-white">
              <option>Semua Parameter</option>
            </select>
            <select className="border rounded p-1 bg-white">
              <option>Line Chart</option>
            </select>
          </div>
        </div>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  shadow: "md",
                }}
              />
              <Legend verticalAlign="top" height={36} />
              <Area
                type="monotone"
                dataKey="2020"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="2021"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="2022"
                stroke="#ffc658"
                fill="#ffc658"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border h-fit">
        <h2 className="font-bold mb-4 flex justify-between items-center">
          Panel Notifikasi{" "}
          <span className="text-blue-500 text-xs cursor-pointer font-medium hover:underline">
            Lihat Semua
          </span>
        </h2>
        <div className="flex gap-2 border-b mb-4">
          <button className="pb-2 border-b-2 border-blue-500 text-xs font-bold px-2 text-blue-600">
            Alert (3)
          </button>
          <button className="pb-2 text-xs text-gray-400 px-2 hover:text-gray-600 transition">
            Notifikasi (1)
          </button>
        </div>
        <div className="space-y-3">
          <div className="bg-orange-50 p-3 rounded-xl border border-orange-200 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-orange-400 before:rounded-full">
            <div className="flex justify-between font-bold text-sm mb-1 text-orange-800">
              <span>pH Melebihi Batas</span>{" "}
              <AlertTriangle size={14} className="text-orange-500" />
            </div>
            <p className="text-[11px] text-orange-700 opacity-80">
              Lokasi: Bantul | Nilai: 8.9 (Batas 8.5)
            </p>
            <div className="flex gap-2 mt-2">
              <button className="bg-orange-100 text-orange-700 px-3 py-1 rounded-md text-[10px] font-bold hover:bg-orange-200 transition">
                Tindak Lanjut
              </button>
            </div>
          </div>
          <div className="bg-red-50 p-3 rounded-xl border border-red-200 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-red-500 before:rounded-full">
            <div className="flex justify-between font-bold text-sm mb-1 text-red-800">
              <span>DO Dibawah Standar</span>{" "}
              <Info size={14} className="text-red-500" />
            </div>
            <p className="text-[11px] text-red-700 opacity-80">
              Lokasi: Sleman | Nilai: 4.2 (Batas 6)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- APP UTAMA ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-10">
        <Navbar />
        <HeaderBanner />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/laporan" element={<ReportPage />} />{" "}
          {/* Ini yang baru */}
          <Route path="/pengaturan" element={<GraphPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
