// @ts-nocheck
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LogLevel } from '@framework/live2dcubismframework';

/**
 * Sample Appで使用する定数
 */

// Canvas width and height pixel values, or dynamic screen size ('auto').
export const CanvasSize: { width: number; height: number } | 'auto' = 'auto';

// 画面
export const ViewScale = 1.0;
export const ViewMaxScale = 2.0;
export const ViewMinScale = 0.8;

export const ViewLogicalLeft = -1.0;
export const ViewLogicalRight = 1.0;
export const ViewLogicalBottom = -1.0;
export const ViewLogicalTop = 1.0;

export const ViewLogicalMaxLeft = -2.0;
export const ViewLogicalMaxRight = 2.0;
export const ViewLogicalMaxBottom = -2.0;
export const ViewLogicalMaxTop = 2.0;

// 相対パス
export const ResourcesPath = './Resources/';

// モデルの後ろにある背景の画像ファイル
// #TODO: default blank image
export let BackImage = "";
export let Model ="Hiyori";
export const ModelScale = 1.6;
export const ModelLeft = 0;
export const ModelTop = 0.7;

// 外部定義ファイル（json）と合わせる
export const MotionGroupIdle = 'Idle'; // アイドリング
export const MotionGroupTapBody = 'TapBody'; // 体をタップしたとき
export const MotionGroupNormal = 'Normal';
export const MotionGroupGood = 'Good';
export const MotionGroupBad = 'Bad';

export const getMotionGroup = (e: string) => {
  if(e) {
    if(e.includes('bad')) return MotionGroupBad;
    if(e.includes('normal')) return MotionGroupNormal;
    if(e.includes('good')) return MotionGroupGood;
  } else {
    return MotionGroupIdle;
  }
 
}

// 外部定義ファイル（json）と合わせる
export const HitAreaNameHead = 'Head';
export const HitAreaNameBody = 'Body';

// モーションの優先度定数
export const PriorityNone = 0;
export const PriorityIdle = 1;
export const PriorityNormal = 2;
export const PriorityForce = 3;

// デバッグ用ログの表示オプション
export const DebugLogEnable = false;
export const DebugTouchLogEnable = false;

// Frameworkから出力するログのレベル設定
export const CubismLoggingLevel: LogLevel = LogLevel.LogLevel_Verbose;

// live2d Model config setting; model, backround, motions, position, scale
export class lappdefineSet {
  public static setBackImage(image: string): void {
    BackImage = image ? image : '';
  }

  public static setModel(model: string): void {
    Model = model;
  }
}