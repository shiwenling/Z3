/**
 * Created by TP on 2017/8/9.
 */
export class Sequence {
  sequenceId: number;
  sequenceName: string;
  lockState: string;
  minValue: number;
  maxValue: number;
  step: number;
  cacheValue: number;
  cycle: boolean;
  order: boolean;
  tableNumber: number;
  sequencecomments: string;
  gmtCreate: string;

  selfGrowValue: number;
}
