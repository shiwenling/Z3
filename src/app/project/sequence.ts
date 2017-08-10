/**
 * Created by TP on 2017/8/9.
 */
export class Sequence {
  id: number;
  sequenceName: string;
  lockState: string;
  minValue: number;
  maxValue: number;
  step: number;
  cacheValue: number;
  cicle: boolean;
  order: boolean;
  tableNumber: number;
  comments: string;
  gmtCreate: string;
}
