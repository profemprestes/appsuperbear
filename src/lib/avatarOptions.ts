export type FurColor = 'Marrón' | 'Polar' | 'Cósmico' | 'Arcoíris';
export type HeadItem = 'Ninguno' | 'Gorra' | 'Gafas' | 'Pastel' | 'VR';
export type TorsoItem = 'Ninguno' | 'Baloncesto' | 'Héroe' | 'Negocios';
export type Backpacker = 'Ninguno' | 'Shicka' | 'Larry' | 'Pingüino';

export interface AvatarConfig {
  furColor: FurColor;
  headItem: HeadItem;
  torsoItem: TorsoItem;
  backpacker: Backpacker;
}
