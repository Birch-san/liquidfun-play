import type { Demo } from '../../common/protocol'

export enum ExecutionStrategyType {
  OffloadToWorker = 'OffloadToWorker',
  RunOnMainThread = 'RunOnMainThread'
}

export type ChangeDemo = (demo: Demo) => void
export type ExecutionStrategyDestroy = () => void
export interface ExecutionStrategy {
  destroy: ExecutionStrategyDestroy
  changeDemo: ChangeDemo
}

export type SetFatalError = (message: string) => void
export interface ExecutionStrategyStartOptions {
  setFatalError: SetFatalError
  canvasElement: HTMLCanvasElement
  initialDemo: Demo
}
export type ExecutionStrategyStart = (options: ExecutionStrategyStartOptions) => ExecutionStrategy