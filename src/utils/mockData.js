export const mockTransactions = [
  { id: "TXN-873204", amount: 1299.7, merchant: "NeoMart", location: "Mumbai", time: "09:12", status: "Safe", probability: 0.18 },
  { id: "TXN-873118", amount: 8420.0, merchant: "LuxVault", location: "Berlin", time: "08:49", status: "Fraud", probability: 0.89 },
  { id: "TXN-872984", amount: 242.18, merchant: "QuickFuel", location: "Pune", time: "08:31", status: "Safe", probability: 0.09 },
  { id: "TXN-872756", amount: 5070.99, merchant: "MetaPay", location: "Singapore", time: "07:55", status: "Fraud", probability: 0.76 },
  { id: "TXN-872441", amount: 873.55, merchant: "CloudCart", location: "Delhi", time: "07:18", status: "Safe", probability: 0.22 },
  { id: "TXN-872214", amount: 309.9, merchant: "SwiftCab", location: "Chennai", time: "06:47", status: "Safe", probability: 0.12 },
  { id: "TXN-871930", amount: 6350.25, merchant: "ByteGear", location: "Toronto", time: "06:08", status: "Fraud", probability: 0.82 },
  { id: "TXN-871712", amount: 74.5, merchant: "CafeLoop", location: "Hyderabad", time: "05:37", status: "Safe", probability: 0.07 },
  { id: "TXN-871489", amount: 1840.15, merchant: "StayEase", location: "Goa", time: "05:10", status: "Safe", probability: 0.31 },
  { id: "TXN-871202", amount: 9310.0, merchant: "LuxVault", location: "Dubai", time: "04:42", status: "Fraud", probability: 0.91 },
  { id: "TXN-870914", amount: 412.44, merchant: "BookBay", location: "Jaipur", time: "04:11", status: "Safe", probability: 0.14 },
  { id: "TXN-870661", amount: 2110.3, merchant: "PixelStore", location: "Bengaluru", time: "03:49", status: "Safe", probability: 0.37 }
];

export const initialNotifications = [
  { id: "N-1", merchant: "LuxVault", amount: 8420, time: "7 min ago", severity: "high" },
  { id: "N-2", merchant: "MetaPay", amount: 5070.99, time: "23 min ago", severity: "medium" },
  { id: "N-3", merchant: "ByteGear", amount: 6350.25, time: "42 min ago", severity: "high" }
];

export const trendData = [
  { name: "Mon", Fraud: 8, Safe: 132 },
  { name: "Tue", Fraud: 12, Safe: 148 },
  { name: "Wed", Fraud: 7, Safe: 151 },
  { name: "Thu", Fraud: 18, Safe: 166 },
  { name: "Fri", Fraud: 14, Safe: 172 },
  { name: "Sat", Fraud: 21, Safe: 139 },
  { name: "Sun", Fraud: 10, Safe: 128 }
];
