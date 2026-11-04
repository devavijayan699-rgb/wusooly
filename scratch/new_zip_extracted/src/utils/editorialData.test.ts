import test from "node:test";
import assert from "node:assert/strict";
import {
  getIntroCopy,
  getTierSections,
  filterTierSections,
  validateDemoRequest,
  RETAIL_LIFETIME_FEATURES,
  RETAIL_CLOUD_FEATURES,
  CAFE_LIFETIME_FEATURES,
  CAFE_CLOUD_FEATURES,
} from "./editorialData";

test("getIntroCopy returns matching retail and cafe copy", () => {
  const retail = getIntroCopy("retail");
  assert.equal(retail.headline, "The essentials to run your store, connected.");
  assert.equal(retail.outroTitle, "Ready to see Wusooly in your store?");

  const cafe = getIntroCopy("cafe");
  assert.equal(cafe.headline, "Every order. One simple system.");
  assert.equal(cafe.outroTitle, "Ready to see Wusooly in your café?");
});

test("Retail and Cafe feature catalogs contain all required Lifetime and Cloud features", () => {
  assert.equal(RETAIL_LIFETIME_FEATURES.length, 12);
  assert.equal(RETAIL_CLOUD_FEATURES.length, 4);
  assert.equal(CAFE_LIFETIME_FEATURES.length, 14);
  assert.equal(CAFE_CLOUD_FEATURES.length, 6);

  const retailSections = getTierSections("retail");
  assert.equal(retailSections.length, 2);
  assert.equal(retailSections[0].id, "lifetime");
  assert.equal(retailSections[1].id, "cloud");

  const cafeCloudOnly = filterTierSections("cafe", "cloud");
  assert.equal(cafeCloudOnly.length, 1);
  assert.equal(cafeCloudOnly[0].id, "cloud");
  assert.ok(cafeCloudOnly[0].features.includes("Online ordering"));
  assert.ok(cafeCloudOnly[0].features.includes("QR digital menu"));
});

test("validateDemoRequest validates name and phone inputs", () => {
  assert.equal(validateDemoRequest({ fullName: "", phone: "9876543210" }).valid, false);
  assert.equal(validateDemoRequest({ fullName: "Aarav", phone: "123" }).valid, false);
  assert.equal(validateDemoRequest({ fullName: "Aarav Sharma", phone: "+91 98765 43210" }).valid, true);
});
