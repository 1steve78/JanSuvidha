"use client";

import React, { useEffect, useState } from "react";
import MapGL, { Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { api } from "@/lib/api";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type ReportMapData = {
  id: string;
  lat: number;
  lng: number;
  status: string;
};

type DensityData = {
  state: string;
  application_count: number;
};

export default function PublicMap() {
  const [reports, setReports] = useState<ReportMapData[]>([]);
  const [mergedGeojson, setMergedGeojson] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [reportsData, densityDataRaw, geojsonRes] = await Promise.all([
          api.getPublicMapData(),
          api.getSchemeDensityData() as Promise<DensityData[]>,
          fetch("/data/india-states.geojson")
        ]);
        
        setReports(reportsData);
        
        if (geojsonRes.ok) {
          const geojson = await geojsonRes.json();
          // Merge application_count into GeoJSON features based on state name
          const densityMap = new Map(densityDataRaw.map(d => [d.state.toLowerCase(), d.application_count]));
          
          geojson.features = geojson.features.map((feature: any) => {
            const stateName = feature.properties.NAME_1?.toLowerCase();
            const count = stateName ? densityMap.get(stateName) || 0 : 0;
            return {
              ...feature,
              properties: {
                ...feature.properties,
                application_count: count
              }
            };
          });
          setMergedGeojson(geojson);
        }
      } catch (err) {
        console.error("Failed to load map data:", err);
      }
    }
    loadData();
  }, []);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-[500px] bg-slate-100 flex items-center justify-center rounded-xl border border-slate-200">
        <p className="text-slate-500 font-medium">Mapbox token is missing. Please add NEXT_PUBLIC_MAPBOX_TOKEN to your environment.</p>
      </div>
    );
  }

  // Convert reports into GeoJSON points
  const reportsGeojson = {
    type: "FeatureCollection",
    features: reports.map(r => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [r.lng, r.lat]
      },
      properties: {
        id: r.id,
        status: r.status
      }
    }))
  };

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-sm border border-slate-200 relative">
      <MapGL
        initialViewState={{
          longitude: 79.0, // Center of India
          latitude: 21.0,
          zoom: 3.5
        }}
        maxBounds={[
          [68.1, 6.7], // Southwest coordinates (approx)
          [97.4, 35.5] // Northeast coordinates (approx)
        ]}
        scrollZoom={false}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactive={true}
        onLoad={() => setMapLoaded(true)}
      >
        {/* Choropleth Layer: Scheme Density */}
        {mapLoaded && mergedGeojson && (
          <Source id="scheme-density" type="geojson" data={mergedGeojson}>
            <Layer
              id="scheme-density-fill"
              type="fill"
              paint={{
                "fill-color": [
                  "interpolate",
                  ["linear"],
                  ["get", "application_count"],
                  0, "#f8fafc",     // slate-50 for 0
                  1000, "#bae6fd",  // sky-200
                  3000, "#38bdf8",  // sky-400
                  6000, "#0284c7"   // sky-600
                ],
                "fill-opacity": 0.6
              }}
            />
            <Layer
              id="scheme-density-line"
              type="line"
              paint={{
                "line-color": "#e2e8f0",
                "line-width": 1
              }}
            />
          </Source>
        )}

        {/* Heatmap/Point Layer: Grievance Reports */}
        {mapLoaded && reportsGeojson && reportsGeojson.features.length > 0 && (
          <Source id="reports" type="geojson" data={reportsGeojson as any}>
            <Layer
              id="reports-point"
              type="circle"
              paint={{
                "circle-radius": 5,
                "circle-color": [
                  "match",
                  ["get", "status"],
                  "submitted", "#ef4444", // Red
                  "in_progress", "#eab308", // Yellow
                  "under_review", "#eab308", // Yellow
                  "resolved", "#22c55e", // Green
                  "#94a3b8" // Default Gray
                ],
                "circle-stroke-width": 1,
                "circle-stroke-color": "#ffffff"
              }}
            />
          </Source>
        )}
      </MapGL>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md border border-slate-200 text-sm z-10 pointer-events-none">
        <h4 className="font-bold text-slate-800 mb-2">Reports</h4>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-red-500 border border-white"></div>
          <span className="text-slate-600">Submitted</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500 border border-white"></div>
          <span className="text-slate-600">In Progress</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-green-500 border border-white"></div>
          <span className="text-slate-600">Resolved</span>
        </div>
        
        <h4 className="font-bold text-slate-800 mb-2">Scheme Density</h4>
        <div className="h-2 w-full bg-gradient-to-r from-slate-50 via-sky-300 to-sky-600 rounded-sm mb-1 border border-slate-200"></div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>0</span>
          <span>6000+</span>
        </div>
      </div>
    </div>
  );
}
