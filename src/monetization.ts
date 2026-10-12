import { Platform } from "react-native";
let Purchases: any;
type PurchasesPackage = any;

export type MembershipState = {
  ready: boolean;
  configured: boolean;
  plus: boolean;
  pro: boolean;
  prices: { plus?: string; pro?: string };
};

let initialized = false;
let cachedPackages: PurchasesPackage[] = [];

const apiKey = () => Platform.OS === "ios"
  ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY
  : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;
const productId = (plan: "plus" | "pro") => plan === "plus"
  ? process.env.EXPO_PUBLIC_REVENUECAT_PLUS_PRODUCT_ID
  : process.env.EXPO_PUBLIC_REVENUECAT_PRO_PRODUCT_ID;

async function configure(): Promise<boolean> {
  const key = apiKey();
  if (!key || Platform.OS === "web") return false;
  if (!initialized) {
    try {
      Purchases = require("react-native-purchases").default;
      Purchases.configure({ apiKey: key });
      initialized = true;
    } catch {
      return false;
    }
  }
  return true;
}

export async function getMembership(): Promise<MembershipState> {
  const available = await configure();
  if (!available) return { ready: true, configured: false, plus: false, pro: false, prices: {} };
  try {
    const [customer, offerings] = await Promise.all([Purchases.getCustomerInfo(), Purchases.getOfferings()]);
    cachedPackages = offerings.current?.availablePackages || [];
    const plusPackage = cachedPackages.find(p => p.product.identifier === productId("plus"));
    const proPackage = cachedPackages.find(p => p.product.identifier === productId("pro"));
    const pro = Boolean(customer.entitlements.active.ascend_pro);
    const plus = pro || Boolean(customer.entitlements.active.ascend_plus);
    return {
      ready: true,
      configured: Boolean(offerings.current && plusPackage && proPackage),
      plus,
      pro,
      prices: { plus: plusPackage?.product.priceString, pro: proPackage?.product.priceString }
    };
  } catch {
    return { ready: true, configured: false, plus: false, pro: false, prices: {} };
  }
}

export async function purchaseMembership(plan: "plus" | "pro"): Promise<MembershipState> {
  if (!await configure()) return getMembership();
  const id = productId(plan);
  const selected = cachedPackages.find(p => p.product.identifier === id);
  if (!id || !selected) return getMembership();
  await Purchases.purchasePackage(selected);
  return getMembership();
}

export async function restoreMembership(): Promise<MembershipState> {
  if (!await configure()) return getMembership();
  await Purchases.restorePurchases();
  return getMembership();
}
