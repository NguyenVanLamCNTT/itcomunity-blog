export interface BaseCommand<TInput, TResult> {
    execute(input: TInput): Promise<TResult>;
}
