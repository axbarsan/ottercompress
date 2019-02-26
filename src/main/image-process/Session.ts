import ProcessQueue from "./ProcessQueue";

export default class Session {
  public dateStarted: Date = new Date();
  public dateFinished: Date | null = null;
  public isFinished: boolean = false;

  public parentPath: string | null = null;
  public targetPath: string | null = null;

  public readonly queue: ProcessQueue = new ProcessQueue();
}
