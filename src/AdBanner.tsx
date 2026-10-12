import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
const Constants = require("expo-constants").default;

type Props = { enabled: boolean };

export default function AdBanner({ enabled }: Props) {
  const [ads, setAds] = useState<any>(null);
  const unitId = Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_ADMOB_IOS_BANNER_ID
    : process.env.EXPO_PUBLIC_ADMOB_ANDROID_BANNER_ID;
  const appIdConfigured = Boolean(process.env.ADMOB_IOS_APP_ID && process.env.ADMOB_ANDROID_APP_ID);

  useEffect(() => {
    let active = true;
    if (!enabled || !unitId || !appIdConfigured || Constants.executionEnvironment === "storeClient" || Platform.OS === "web") return;
    (async () => {
      try {
        const sdk = require("react-native-google-mobile-ads");
        await sdk.AdsConsent.gatherConsent();
        const consent = await sdk.AdsConsent.getConsentInfo();
        if (!consent.canRequestAds) return;
        await sdk.default().initialize();
        if (active) setAds(sdk);
      } catch {
        if (active) setAds(null);
      }
    })();
    return () => { active = false; };
  }, [enabled, unitId, appIdConfigured]);

  if (!enabled || !unitId || !ads) return null;
  return <View style={{ alignItems: "center", minHeight: 50, paddingVertical: 4 }}>
    <ads.BannerAd unitId={unitId} size={ads.BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{ requestNonPersonalizedAdsOnly: true }} />
  </View>;
}
