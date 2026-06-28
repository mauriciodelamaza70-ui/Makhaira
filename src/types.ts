/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Track {
  id: string;
  title: string;
  duration: string;
  genre: string;
  description: string;
  tempo: number; // For the visualizer speed
  baseFrequency: number; // For procedural synthesizer notes
}

export interface Review {
  id: string;
  criticName: string;
  publication: string;
  rating: number;
  maxRating: number;
  text: string;
  date: string;
  featured: boolean;
}

export interface StreamingPlatform {
  id: string;
  name: string;
  url: string;
  logoType: 'netflix' | 'amazon' | 'apple' | 'mubi' | 'shudder';
  availabilityText: string;
  priceType: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  category: 'production' | 'behind-the-scenes' | 'concept';
  date: string;
}
