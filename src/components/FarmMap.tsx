import React, { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { MapPin, Navigation, Phone, ExternalLink, ShieldCheck, Compass } from 'lucide-react';

const FARM_COORDINATES = {
  lat: 6.4532476,
  lng: -1.5838506,
};

const FARM_DIRECTIONS_URL =
  'https://www.google.com/maps/search/?api=1&query=Sanfo%2FAduam%2C+Behind+Manale+Rest+Stop%2C+Ghana';

const FarmMarkerWithInfoWindow: React.FC = () => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={FARM_COORDINATES}
        onClick={() => setInfoOpen(!infoOpen)}
        title="Adinkra Frontiers Ltd - Poultry Farm Facility"
      >
        <Pin
          background="#0738A6"
          borderColor="#082B66"
          glyphColor="#F5A300"
          scale={1.3}
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={320}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0738A6] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5A300]" />
              <span>Poultry Agribusiness Facility</span>
            </div>
            <h4 className="text-sm font-bold text-[#082B66] leading-snug">
              Adinkra Frontiers Ltd
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Sanfo/Aduam, Behind Manale Rest Stop, Ghana
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
              <a
                href="tel:+233244902287"
                className="font-bold text-[#0738A6] hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>+233 24 490 2287</span>
              </a>
              <a
                href={FARM_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white bg-[#0738A6] hover:bg-[#082B66] px-2.5 py-1 rounded-md text-[11px] flex items-center gap-1 shadow-xs"
              >
                <span>Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export const FarmMap: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
      {/* Map Header Bar */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0738A6] to-[#082B66] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#F5A300] shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span>Farm Location Map</span>
              <span className="text-[11px] font-semibold text-[#F5A300] bg-white/10 px-2 py-0.5 rounded">
                Sanfo/Aduam
              </span>
            </h4>
            <p className="text-xs text-[#FFF8ED]/85 mt-0.5">
              Behind Manale Rest Stop, Ghana · Direct farm pickups and logistics dispatch
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <a
            href={FARM_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#082B66] bg-[#F5A300] hover:bg-[#FFB300] active:scale-95 rounded-lg transition-all shadow-sm whitespace-nowrap"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>

      {/* Interactive Map Viewport */}
      <div className="relative w-full h-[380px] sm:h-[450px] bg-slate-100">
        {apiKey ? (
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={FARM_COORDINATES}
              defaultZoom={15}
              mapId="adinkra_farm_map"
              gestureHandling="cooperative"
              className="w-full h-full"
              internalUsageAttributionIds={['gmp_git_agentskills_v1']}
              fullscreenControl={true}
              streetViewControl={false}
              mapTypeControl={true}
            >
              <FarmMarkerWithInfoWindow />
            </Map>
          </APIProvider>
        ) : (
          /* Fallback view if API key is not yet set */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#FFF8ED]">
            <MapPin className="w-12 h-12 text-[#0738A6] mb-3 animate-bounce" />
            <h5 className="text-lg font-bold text-[#082B66]">Adinkra Frontiers Ltd Farm</h5>
            <p className="text-sm text-slate-600 max-w-md mt-1">
              Sanfo/Aduam, Behind Manale Rest Stop, Ghana
            </p>
            <a
              href={FARM_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0738A6] hover:bg-[#082B66] rounded-xl shadow-md"
            >
              <Navigation className="w-4 h-4" />
              <span>View Location in Google Maps</span>
            </a>
          </div>
        )}

        {/* Floating Location Badge */}
        <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-200 shadow-md text-xs">
          <MapPin className="w-4 h-4 text-[#0738A6]" />
          <span className="font-bold text-[#082B66]">Sanfo/Aduam Farm</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-600">GPS: 6.4532° N, 1.5839° W</span>
        </div>
      </div>

      {/* Map Footer Landmark Guidance */}
      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span>
            <strong>Landmark:</strong> Locate Manale Rest Stop along the main transit road, then proceed directly behind it to our farm gate.
          </span>
        </div>
        <div className="text-[#0738A6] font-semibold flex items-center gap-1 shrink-0">
          <span>Visitors by appointment &amp; standing orders</span>
        </div>
      </div>
    </div>
  );
};
