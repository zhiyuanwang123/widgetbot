import Unseen, { Charset } from 'unseen-data'

export const charset: Charset = ['\u200B', '\u200C', '\u200D', '\uFEFF']

export enum Pos {
  start = '\uFEFF\uFEFF\u200B',
  end = '\u200C\u200D\u200B'
}

export const unseen = new Unseen({ charset, compression: false })
