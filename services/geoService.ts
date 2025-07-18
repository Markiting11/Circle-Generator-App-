
import type { CoordinatePoint } from '../types';

const EARTH_RADIUS_MILES = 3958.8;

/**
 * Converts degrees to radians.
 * @param degrees - The angle in degrees.
 * @returns The angle in radians.
 */
const toRadians = (degrees: number): number => {
  return degrees * Math.PI / 180;
};

/**
 * Converts radians to degrees.
 * @param radians - The angle in radians.
 * @returns The angle in degrees.
 */
const toDegrees = (radians: number): number => {
  return radians * 180 / Math.PI;
};

/**
 * Generates 360 coordinate points forming a circle around a center point.
 * @param centerLat - The latitude of the center point.
 * @param centerLon - The longitude of the center point.
 * @param distanceInMiles - The radius of the circle in miles.
 * @returns An array of 360 CoordinatePoint objects.
 */
export const generateCirclePoints = (centerLat: number, centerLon: number, distanceInMiles: number): CoordinatePoint[] => {
  const points: CoordinatePoint[] = [];
  const lat1 = toRadians(centerLat);
  const lon1 = toRadians(centerLon);
  const d = distanceInMiles / EARTH_RADIUS_MILES; // Angular distance

  for (let angle = 0; angle < 360; angle++) {
    const bearing = toRadians(angle);

    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(bearing)
    );

    const lon2 = lon1 + Math.atan2(
      Math.sin(bearing) * Math.sin(d) * Math.cos(lat1),
      Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
    );

    points.push({
      distance: distanceInMiles,
      angle: angle,
      latitude: toDegrees(lat2),
      longitude: toDegrees(lon2),
    });
  }

  return points;
};
