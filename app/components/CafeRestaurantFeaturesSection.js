"use client";

import EditorialFeaturesStandalone from "./EditorialFeaturesStandalone";

export default function CafeRestaurantFeaturesSection({ onGetDemo, hideIntro = false }) {
  return (
    <EditorialFeaturesStandalone
      audience="cafe"
      defaultAudience="cafe"
      showAudienceToggle={false}
      hideIntro={hideIntro}
      onGetDemo={onGetDemo}
    />
  );
}
