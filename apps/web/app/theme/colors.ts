// src/constants/colors.ts

/**
 * Defines the color palette used throughout the application.
 * @typedef {Object} Colors
 * @property {'#FFFFFF'} white
 * @property {'#F9F9F9'} offWhite
 * @property {'#F7F7F7'} lightWhite
 * @property {'#F8F8F8'} paleWhite
 * @property {'#F0F0F0'} lightGray
 * @property {'#E1E1E1'} perlGray
 * @property {'#FFF9FF'} altLight
 * @property {'#CACACA'} silver
 * @property {'#989898'} disabledGray
 * @property {'#A1A1A1'} coolGray
 * @property {'#7B7B7B'} steelGray
 * @property {'#7C7C7C'} grey
 * @property {'#6D6D6D'} inactiveGray
 * @property {'#757575'} midGray
 * @property {'#0E0E0E'} darkGray
 * @property {'#454545'} slateGray
 * @property {'#000000'} black
 * @property {'#151515'} darkBg
 * @property {'#232323'} charcoal
 * @property {'#212121'} jetBlack
 * @property {'#FFF4FE'} pearlPink
 * @property {'#352B35'} deepPurple
 * @property {'#685469'} lavenderGray
 * @property {'#472644'} eggplant
 * @property {'#282828'} darkCharcoal
 * @property {'#282328'} altDark
 * @property {'#242424'} darkerBg
 * @property {'#1DBC1B'} green
 * @property {'#3AB73A'} brightGreen
 * @property {'#DCF9E5'} mintGreen
 * @property {'#FFE5EC'} redLight
 * @property {'#1E3425'} forestGreen
 * @property {'#CDCDCD'} cloudGray
 * @property {'#915588'} darkPurple
 * @property {'#A63BB4'} purple
 * @property {'#8C2F86'} violet
 * @property {'#821489'} deepViolet
 * @property {'#FF0000'} red
 * @property {'#EE7B28'} orange
 * @property {'#FFFFFF60'} whiteTrans60
 * @property {'#FFFFFF44'} whiteTrans44
 * @property {'#C9C9C91F'} whiteTrans12
 * @property {'#FFFFFF14'} whiteTrans8
 * @property {'#FFFFFF0A'} whiteTrans4
 * @property {'#F8F8F814'} whiteTrans8Alt
 * @property {'#FFFFFF0F'} whiteTrans6
 * @property {'#FFFFFF1F'} whiteTrans12Alt
 * @property {'#FFFFFF24'} whiteTrans14
 * @property {'#FFFFFF29'} whiteTrans16
 * @property {'#F6EAF63D'} whiteTrans24
 * @property {'#00000080'} blackTrans50
 * @property {'#00000070'} blackTrans44
 * @property {"#7C7C7C} gray
 * @property {"#989898"} disableGray
 * @property {'#2E222D'}  darkPush
 * @property {'#00000033'} overlay
 * @property {'rgba(255,255,255,0.788)'} whiteLightTransparent
 * @property {'rgba(36, 36, 36, 0.79)'} blackLightTransparent
 * @property {'#EE07FD} darkPrimary
 */

/** @type {Colors} */
export const colors = {
  white: '#FFFFFF',
  offWhite: '#F9F9F9',
  lightWhite: '#F7F7F7',
  paleWhite: '#F8F8F8',
  lightGray: '#F0F0F0',
  perlGray: '#E1E1E1',
  altLight: '#FFF9FF', // width: 115,

  silver: '#CACACA',
  disabledGray: '#989898',
  coolGray: '#A1A1A1',
  steelGray: '#959595',
  grey: '#7C7C7C',
  inactiveGray: '#6D6D6D',
  midGray: '#757575',
  darkGray: '#0E0E0E',
  slateGray: '#00000066',
  black: '#000000',
  darkBg: '#151515',
  charcoal: '#232323',
  jetBlack: '#212121',
  pearlPink: '#FFF4FE',
  deepPurple: '#352B35',
  lavenderGray: '#685469',
  eggplant: '#472644',
  darkCharcoal: '#282828',
  altDark: '#282328',
  darkerBg: '#242424',
  darkPuce: '#2E222D',
  green: '#1DBC1B',
  brightGreen: '#3AB73A',
  mintGreen: '#DCF9E5',
  forestGreen: '#1E3425',
  cloudGray: '#CDCDCD',
  darkPurple: '#915588',
  purple: '#A63BB4',
  violet: '#8C2F86',
  deepViolet: '#821489',
  darkSilverText: '#00000099',

  red: '#FF0000',
  redLight: '#FFE5EC',
  //orange: '#EE7B28',
  orange: '#CBAF4C',
  //gold: '#fa991a',
  gold: '#CBAF4C',
  whiteTrans60: '#FFFFFF60',
  whiteTrans44: '#FFFFFF44',
  whiteTrans12: '#C9C9C91F',
  whiteTrans8: '#FFFFFF14',
  whiteTrans4: '#FFFFFF0A',
  whiteTrans8Alt: '#F8F8F814',
  richBlack: '#131313',
  whiteTrans2Alt: '#FAFAFA05',
  whiteTrans6: '#FFFFFF0F',
  whiteTransMain: 'rgba(255, 255, 255, 0.12)',
  whiteTrans12Alt: '#FFFFFF1F',
  whiteTrans14: '#FFFFFF24',
  whiteTrans16: '#FFFFFF29',
  whiteTrans24: '#F6EAF63D',
  blackTrans50: '#00000080',
  blackTrans44: '#00000070',
  //johon
  gray: '#B0B0B0',
  disableGray: '#989898',
  darkPush: '#2E222D',
  overlay: '#00000033',
  darkPrimary: '#EE07FD',
  vaultShadow: '#F6A9FF80',
  //bersu
  whiteLightTransparent: 'rgba(255,255,255,0.788)',
  blackLightTransparent: 'rgba(36, 36, 36, 0.79)',
} as const;
