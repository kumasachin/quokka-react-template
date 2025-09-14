import { create } from "zustand";

interface FeatureFlags {
  enableNotifications: boolean;
  enableAdvancedReports: boolean;
  enableBetaFeatures: boolean;
  enableAutoUpdates: boolean;
}

interface FeatureFlagsState {
  flags: FeatureFlags;
  setFlag: (key: keyof FeatureFlags, value: boolean) => void;
  isEnabled: (key: keyof FeatureFlags) => boolean;
}

const defaultFlags: FeatureFlags = {
  enableNotifications: true,
  enableAdvancedReports: false,
  enableBetaFeatures: false,
  enableAutoUpdates: true,
};

export const useFeatureFlagsStore = create<FeatureFlagsState>((set, get) => ({
  flags: defaultFlags,

  setFlag: (key, value) =>
    set((state) => ({
      flags: { ...state.flags, [key]: value },
    })),

  isEnabled: (key) => get().flags[key],
}));
