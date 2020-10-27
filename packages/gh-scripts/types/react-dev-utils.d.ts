declare module 'react-dev-utils/FileSizeReporter' {
  export interface MeasureFileSizesBeforeBuildResult {
    root: string;
    sizes: Record<string, number>;
  }

  export function measureFileSizesBeforeBuild(
    buildFolder: string,
  ): Promise<MeasureFileSizesBeforeBuildResult>;
}
