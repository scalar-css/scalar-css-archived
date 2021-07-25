/**
 * margin-top 	margin-block-start
 * margin-left 	margin-inline-start
 * margin-right 	margin-inline-end
 * margin-bottom 	margin-block-end
 * m, mbs, mbe, mis, mie, mb, mi
 *
 * padding-top 	padding-block-start
 * padding-bottom 	padding-block-end
 * padding-left 	padding-inline-start
 * padding-right 	padding-inline-end
 * p, pt, pb, pl, pr, px, py
 * p, pbs, pbe, pis, pie, pb, pi
 * p, b-ps, b-pe, i-ps, i-pe, b-p, i-p
 *
 * top 	inset-block-start
 * left 	inset-inline-start
 * right 	inset-inline-end
 * bottom 	inset-block-end
 * inset, inset-bs, inset-is,
 *
 * i, b-is, b-ie, i-is, i-ie, b-i, i-i
 *
 * width/height logical properties depending on writing mode
 * inline-size
 * block-size
 * isize, bsize
 *
 * https://www.smashingmagazine.com/2019/08/writing-modes-layout/
 * https://24ways.org/2016/css-writing-modes/
 * https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values/
 *
 */
const properties = ['margin', 'padding', 'inset', 'border']

export function createBaseStyleRules() {}

export default function layout(config, postcss) {}
