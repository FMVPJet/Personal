export type DeviceModelType = "macbook-pro" | "keyboard" | "mouse" | "phone";
export type DeviceTileVariant = "full" | "half";

export interface DeviceItem {
  id: string;
  modelType: DeviceModelType;
  name: string;
  accessibleLabel: string;
  tileVariant: DeviceTileVariant;
}

export const devices: DeviceItem[] = [
  {
    id: "macbook-pro",
    modelType: "macbook-pro",
    name: 'MacBook Pro 14" M5',
    accessibleLabel: 'MacBook Pro 14" M5',
    tileVariant: "full",
  },
  {
    id: "phone",
    modelType: "phone",
    name: "iPhone 17 Pro",
    accessibleLabel: "iPhone 17 Pro",
    tileVariant: "half",
  },
  {
    id: "mouse",
    modelType: "mouse",
    name: "Logitech MX Master 2S",
    accessibleLabel: "Logitech MX Master 2S",
    tileVariant: "full",
  },
  {
    id: "keyboard",
    modelType: "keyboard",
    name: "Keychron K8",
    accessibleLabel: "Keychron K8",
    tileVariant: "half",
  },
];
