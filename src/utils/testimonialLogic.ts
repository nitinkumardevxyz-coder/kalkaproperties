export function getTotalSlides(totalItems: number, itemsPerSlide: number): number {
  if (totalItems <= 0 || itemsPerSlide <= 0) return 0;
  return Math.ceil(totalItems / itemsPerSlide);
}

export function getNextSlideIndex(currentIndex: number, totalSlides: number): number {
  if (totalSlides <= 1) return 0;
  return (currentIndex + 1) % totalSlides;
}

export function getPrevSlideIndex(currentIndex: number, totalSlides: number): number {
  if (totalSlides <= 1) return 0;
  return (currentIndex - 1 + totalSlides) % totalSlides;
}

export function getSlideSlice<T>(
  items: T[],
  slideIndex: number,
  itemsPerSlide: number
): T[] {
  if (items.length === 0 || itemsPerSlide <= 0) return [];
  const totalSlides = getTotalSlides(items.length, itemsPerSlide);
  const safeSlide = ((slideIndex % totalSlides) + totalSlides) % totalSlides;
  const start = safeSlide * itemsPerSlide;
  return items.slice(start, start + itemsPerSlide);
}
