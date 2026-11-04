"use client";

import EditorialFeaturesStandalone from "./EditorialFeaturesStandalone";

export default function EditorialFeaturesSection({ onGetDemo, hideIntro = false }) {
  return (
    <EditorialFeaturesStandalone
      audience="retail"
      defaultAudience="retail"
      showAudienceToggle={false}
      hideIntro={hideIntro}
      onGetDemo={onGetDemo}
    />
  );
}
