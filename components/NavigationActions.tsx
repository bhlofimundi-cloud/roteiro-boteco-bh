// components/NavigationActions.tsx
"use client";

import { Boteco } from "@/data/botecos";
import { Car, Map, Navigation } from "lucide-react";

interface NavigationActionsProps {
  boteco: Boteco;
}

export default function NavigationActions({ boteco }: NavigationActionsProps) {
  const { latitude, longitude, name, address } = boteco;
  const encodedAddress = encodeURIComponent(`${name}, ${address}`);

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
  const uberUrl = `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${latitude}&dropoff[longitude]=${longitude}&dropoff[formatted_address]=${encodedAddress}`;

  const ActionButton = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center p-2 space-y-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-20"
    >
      {icon}
      <span>{label}</span>
    </a>
  );

  return (
    <div className="flex justify-around items-center pt-3 mt-3 border-t">
      <ActionButton href={googleMapsUrl} icon={<Map size={24} />} label="Google Maps" />
      <ActionButton href={wazeUrl} icon={<Navigation size={24} />} label="Waze" />
      <ActionButton href={uberUrl} icon={<Car size={24} />} label="Uber" />
    </div>
  );
}