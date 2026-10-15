import { dsoPdfImages, type DsoPdfImage } from './dso-pdf-data';
import { dsoIdAssets } from './dso-id-data';

export type DsoIdImage = DsoPdfImage & { kind: 'Paper figure' | 'Object view' };

const sourceById = new Map(dsoPdfImages.map((image) => [image.id, image]));

/** Answer-hidden practice variants of figures from the supplied DSO packet. */
export const dsoIdImages: DsoIdImage[] = dsoIdAssets.flatMap((asset) => {
  const source = sourceById.get(asset.id);
  return source ? [{ ...source, image: asset.image, kind: asset.kind }] : [];
});
